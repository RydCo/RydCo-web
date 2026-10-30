// Renders the site's motion graphics to video: `npm run motion` (all), `npm run motion -- two-rides` (one), and
// `--no-build` to reuse the last scene build. Each scene is a real page, built only for this (page.motion.tsx). Playwright
// steps its animations to the exact time of every frame and FFmpeg encodes the frames, so a video comes out identical
// each run, whatever the machine's speed. Setup and how to add a scene: docs/ARCHITECTURE.md.
import { spawn } from "node:child_process";
import { createReadStream, existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { createServer } from "node:http";
import path from "node:path";
import { chromium } from "playwright";

const scenes = [{ name: "two-rides", route: "/motion/two-rides/", width: 280, height: 592, scale: 2, fps: 30 }];

const root = process.cwd();
const buildDir = path.join(root, ".motion-build");
const outDir = path.join(root, "public", "motion");

const encodings = (file) => [
  ["-c:v", "libvpx-vp9", "-b:v", "0", "-crf", "36", "-row-mt", "1", "-pix_fmt", "yuv420p", "-an", `${file}.webm`],
  ["-c:v", "libx264", "-crf", "26", "-preset", "slow", "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-an", `${file}.mp4`],
];

function findFfmpeg() {
  const installedByWinget = process.env.LOCALAPPDATA && path.join(process.env.LOCALAPPDATA, "Microsoft", "WinGet", "Links", "ffmpeg.exe");
  return process.env.FFMPEG_PATH || (installedByWinget && existsSync(installedByWinget) ? installedByWinget : "ffmpeg");
}

function run(command, args, env = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: "inherit", env: { ...process.env, ...env } });
    child.on("error", reject);
    child.on("exit", (code) => (code === 0 ? resolve() : reject(new Error(`${path.basename(command)} exited with ${code}`))));
  });
}

// Next adds the separate build folder to tsconfig.json, which isn't wanted in the repo.
async function buildScenes() {
  const tsconfig = readFileSync("tsconfig.json");
  try {
    await run(process.execPath, ["node_modules/next/dist/bin/next", "build"], { MOTION_RENDER: "1" });
  } finally {
    writeFileSync("tsconfig.json", tsconfig);
  }
}

const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".woff2": "font/woff2", ".svg": "image/svg+xml", ".png": "image/png" };

function serve() {
  const server = createServer((req, res) => {
    const url = decodeURIComponent(new URL(req.url, "http://x").pathname);
    let file = path.join(buildDir, url);
    if (existsSync(file) && statSync(file).isDirectory()) file = path.join(file, "index.html");
    if (!file.startsWith(buildDir) || !existsSync(file)) {
      res.writeHead(404).end();
      return;
    }
    res.writeHead(200, { "content-type": types[path.extname(file)] || "application/octet-stream" });
    createReadStream(file).pipe(res);
  });
  return new Promise((resolve) => server.listen(0, "127.0.0.1", () => resolve(server)));
}

async function renderScene(browser, port, scene) {
  const file = path.join(outDir, scene.name);
  const context = await browser.newContext({ viewport: { width: scene.width, height: scene.height }, deviceScaleFactor: scene.scale, reducedMotion: "no-preference" });
  const page = await context.newPage();
  page.on("pageerror", (error) => {
    throw error;
  });
  await page.goto(`http://127.0.0.1:${port}${scene.route}`);
  await page.waitForFunction(() => window.__motion?.ready);
  const duration = await page.evaluate(() => window.__motion.capture());
  const frames = Math.round((duration / 1000) * scene.fps);

  const seek = (ms) =>
    page.evaluate((t) => {
      window.__motion.seek(t);
      return new Promise((done) => requestAnimationFrame(() => requestAnimationFrame(done)));
    }, ms);

  await seek(0);
  await page.screenshot({ path: `${file}-poster.jpg`, type: "jpeg", quality: 88 });

  const ffmpeg = spawn(findFfmpeg(), ["-y", "-hide_banner", "-loglevel", "error", "-f", "image2pipe", "-framerate", String(scene.fps), "-c:v", "png", "-i", "-", ...encodings(file).flat()], { stdio: ["pipe", "inherit", "inherit"] });
  const finished = new Promise((resolve, reject) => {
    ffmpeg.on("error", (error) => reject(error.code === "ENOENT" ? new Error("FFmpeg not found. Install it (winget install Gyan.FFmpeg) or set FFMPEG_PATH.") : error));
    ffmpeg.on("exit", (code) => (code === 0 ? resolve() : reject(new Error(`FFmpeg exited with ${code}`))));
  });

  const started = Date.now();
  for (let frame = 0; frame < frames; frame++) {
    await seek((frame * 1000) / scene.fps);
    const png = await page.screenshot({ type: "png" });
    if (!ffmpeg.stdin.write(png)) await new Promise((resume) => ffmpeg.stdin.once("drain", resume));
    if (frame % scene.fps === 0) process.stdout.write(`\r${scene.name}: frame ${frame} of ${frames}`);
  }
  ffmpeg.stdin.end();
  await finished;
  await context.close();

  const size = (ext) => `${(statSync(`${file}${ext}`).size / 1024).toFixed(0)} KB`;
  console.log(`\r${scene.name}: ${frames} frames in ${((Date.now() - started) / 1000).toFixed(0)}s, webm ${size(".webm")}, mp4 ${size(".mp4")}, poster ${size("-poster.jpg")}`);
}

const args = process.argv.slice(2);
const wanted = args.filter((a) => !a.startsWith("--"));
const chosen = wanted.length ? scenes.filter((s) => wanted.includes(s.name)) : scenes;
if (!chosen.length) throw new Error(`No scene called ${wanted.join(", ")}. There's: ${scenes.map((s) => s.name).join(", ")}`);

if (!args.includes("--no-build")) await buildScenes();
mkdirSync(outDir, { recursive: true });
const server = await serve();
const browser = await chromium.launch();
try {
  for (const scene of chosen) await renderScene(browser, server.address().port, scene);
} finally {
  await browser.close();
  server.close();
}

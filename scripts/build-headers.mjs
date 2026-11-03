// Writes the security headers from src/config/security.mjs into vercel.json. Vercel reads vercel.json before it
// builds, so the file has to be committed up to date: `pnpm dev` rewrites it, and `pnpm build` (with --check)
// stops if it is out of step with the config.
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { securityHeaders } from "../src/config/security.mjs";

const file = join(dirname(fileURLToPath(import.meta.url)), "..", "vercel.json");
const current = readFileSync(file, "utf8");
const config = JSON.parse(current);
config.headers = [{ source: "/(.*)", headers: securityHeaders() }];
const next = `${JSON.stringify(config, null, 2)}\n`;

if (next === current) console.log("Security headers up to date.");
else if (process.argv.includes("--check")) {
  console.error("vercel.json is out of step with src/config/security.mjs. Run `pnpm headers` and commit vercel.json.");
  // Where they part, quoted, so a failed build log shows what's different (a stray \r included).
  const have = current.split("\n");
  const want = next.split("\n");
  let line = 0;
  while (line < Math.max(have.length, want.length) && have[line] === want[line]) line++;
  console.error(`First difference, line ${line + 1}:\n  vercel.json: ${JSON.stringify(have[line])}\n  expected:    ${JSON.stringify(want[line])}`);
  process.exit(1);
} else {
  writeFileSync(file, next);
  console.log("Security headers written to vercel.json.");
}

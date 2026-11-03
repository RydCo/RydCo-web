"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { Car } from "@/components/brand/Car";
import { toneOn, type Tone } from "@/components/brand/tones";
import { Tick } from "@/components/ui/icons";
import { launchIsOff } from "@/lib/hero-launch";
import type { CarShow } from "./car3d";

// What happens on the first scroll down from the home hero, on every page load. It opens in the hero itself: the parked
// car grows into a 3D car, blinks its headlights twice and drives off the end of the route to the foot of the phone, the
// route line following it. The phone's screen goes dark with the wordmark on it, the headlights light it up, and threads
// of light stream from them into the screen until it's charged and flashes. Then, as before: the phone comes to the front
// as night blooms out from it, road lines and the things a ride is made of burst out, it drops away pulling the route line
// down the screen, and the next section rises to meet the car. About 3.6s. It's live rather than a video because it has to
// start at once, from wherever the phone is. The page holds still while it plays, and is moved to the next section once
// it's dark. Skipped with reduced motion, by a jump past the hero, and by the hero's button.
//
// The 3D car (./car3d, three.js) loads only once someone touches, scrolls, points or types, so a visit that never does
// isn't slowed by it. If it isn't ready in time, or the device can't draw 3D, the flat car drives the same way.

const soft = "cubic-bezier(0.22, 0.8, 0.26, 1)";
const rush = "cubic-bezier(0.45, 0, 0.8, 0.55)";

// When each part starts, in ms. Up to phoneIn it plays in the hero; from there on it's the launch as it was.
const at = { lights: 200, drive: 280, dark: 640, beam: 880, streams: 900, charge: 1400, phoneIn: 1460, bloom: 1620, burst: 1880, fly: 1940, phoneOut: 2460, route: 2480, reveal: 3020 };
const lasts = { grow: 280, drive: 640, dark: 320, phoneIn: 520, bloom: 520, phoneOut: 440, route: 860, reveal: 560 };
// How long a launch waits for the 3D car if it's still loading, before going with the flat one.
const waitFor3d = 400;

// Whether to fetch the 3D car at all: WebGL 2 on a real graphics chip (drawn in software it would stutter), enough
// memory, and not when the visitor has asked to save data.
function can3d() {
  const nav = navigator as Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };
  if (nav.connection?.saveData || (nav.deviceMemory ?? 8) < 4) return false;
  const gl = document.createElement("canvas").getContext("webgl2");
  if (!gl) return false;
  let chip = String(gl.getParameter(gl.RENDERER));
  // Chrome and Safari hide the chip's name behind a generic one; the debug extension says what it really is.
  if (/webkit webgl/i.test(chip)) {
    const info = gl.getExtension("WEBGL_debug_renderer_info");
    if (info) chip = String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL));
  }
  gl.getExtension("WEBGL_lose_context")?.loseContext();
  return !/swiftshader|llvmpipe|software|basic render/i.test(chip);
}

// Small, repeatable random numbers, so it looks the same each time.
function random(seed: number) {
  let s = seed;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const clamp01 = (t: number) => Math.min(1, Math.max(0, t));
const span = (t: number, from: number, length: number) => clamp01((t - from) / length);
const inOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
const out = (t: number) => 1 - (1 - t) ** 3;
// A light that blinks on and fades: peak at about 30ms, gone by about 300ms.
const blink = (t: number, from: number, peak: number) => (t < from ? 0 : peak * Math.exp(-(t - from) / 90) * Math.min(1, (t - from) / 30));

type Point = { x: number; y: number };

// The car's road from where it's parked to the phone: one curve, measured by distance, so it keeps an even pace.
function road(p0: Point, p1: Point, p2: Point, p3: Point) {
  const on = (u: number) => {
    const v = 1 - u;
    return { x: v * v * v * p0.x + 3 * v * v * u * p1.x + 3 * v * u * u * p2.x + u * u * u * p3.x, y: v * v * v * p0.y + 3 * v * v * u * p1.y + 3 * v * u * u * p2.y + u * u * u * p3.y };
  };
  const points = Array.from({ length: 81 }, (_, i) => on(i / 80));
  const lengths: number[] = new Array(points.length).fill(0);
  for (let i = 1; i < points.length; i++) lengths[i] = lengths[i - 1] + Math.hypot(points[i].x - points[i - 1].x, points[i].y - points[i - 1].y);
  const total = lengths[80] || 1;
  const along = (f: number) => {
    const d = clamp01(f) * total;
    let i = 1;
    while (i < 80 && lengths[i] < d) i++;
    const a = points[i - 1];
    const b = points[i];
    const k = (d - lengths[i - 1]) / (lengths[i] - lengths[i - 1] || 1);
    return { x: a.x + (b.x - a.x) * k, y: a.y + (b.y - a.y) * k, dx: b.x - a.x, dy: b.y - a.y };
  };
  return { along, total, d: `M${p0.x} ${p0.y} C${p1.x} ${p1.y} ${p2.x} ${p2.y} ${p3.x} ${p3.y}` };
}

const svg = <K extends keyof SVGElementTagNameMap>(name: K, attrs: Record<string, string | number>) => {
  const el = document.createElementNS("http://www.w3.org/2000/svg", name);
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, String(v));
  return el;
};

const lineColours = ["bg-surface", "bg-surface", "bg-surface", "bg-accent", "bg-brand"];

// Made 25 a frame, so building them doesn't hold up the car. They don't show until the phone comes forward.
function roadLines(stage: HTMLElement, x: number, y: number, reach: number, unit: number, made: Element[], start: number) {
  const r = random(7);
  let i = 0;
  const some = () => {
    for (const end = Math.min(150, i + 25); i < end; i++) line();
    if (i < 150) requestAnimationFrame(some);
  };
  requestAnimationFrame(some);
  const line = () => {
    const angle = r() * 360;
    const line = document.createElement("span");
    line.className = `absolute h-[4px] w-[90px] origin-left rounded-full ${lineColours[Math.floor(r() * lineColours.length)]}`;
    line.style.left = `${x}px`;
    line.style.top = `${y}px`;
    // In front of the night, behind the phone.
    stage.querySelector("[data-night]")?.after(line);
    made.push(line);
    const thick = (1 + r() * 0.9) * unit;
    const from = `rotate(${angle}deg) translateX(${(70 + r() * 90) * unit}px) scale(${0.25 * unit}, ${thick * 0.4})`;
    const to = `rotate(${angle}deg) translateX(${reach + r() * 100}px) scale(${(1 + r()) * unit}, ${thick})`;
    // Timed from the launch's start, since they're made a little after it.
    line.animate([{ opacity: 0, transform: from }, { opacity: 1, offset: 0.2 }, { opacity: 1, transform: to }], {
      delay: at.burst + r() * (at.route - at.burst + 180) - (performance.now() - start),
      duration: 420 + r() * 300,
      fill: "both",
      easing: rush,
    });
  };
}

function flyOut(stage: HTMLElement, unit: number) {
  stage.querySelectorAll<HTMLElement>("[data-fly]").forEach((el) => {
    const x = Number(el.dataset.x) * unit;
    const y = Number(el.dataset.y) * unit;
    const spin = Number(el.dataset.spin);
    const pose = (z: number, turn: number) => `translate3d(${x}px, ${y}px, ${z}px) rotate(${turn}deg)`;
    el.animate(
      [
        { opacity: 0, transform: pose(-1500, -spin) },
        { opacity: 1, offset: 0.15 },
        { opacity: 1, offset: 0.78 },
        { opacity: 0, offset: 0.9 },
        { opacity: 0, transform: pose(620, spin) },
      ],
      { delay: at.fly + Number(el.dataset.at), duration: 860, fill: "both", easing: rush },
    );
  });
}

// While the launch plays, the page holds still, so the car stays on its road. Scrolling already under way is stopped where
// it is, and wheel, touch and keyboard scrolling wait until the night starts lifting.
function holdStill() {
  window.scrollTo({ top: window.scrollY, behavior: "instant" });
  const stop = (e: Event) => e.preventDefault();
  const keys = (e: KeyboardEvent) => [" ", "PageDown", "PageUp", "ArrowDown", "ArrowUp", "Home", "End"].includes(e.key) && e.preventDefault();
  window.addEventListener("wheel", stop, { passive: false });
  window.addEventListener("touchmove", stop, { passive: false });
  window.addEventListener("keydown", keys);
  return () => {
    window.removeEventListener("wheel", stop);
    window.removeEventListener("touchmove", stop);
    window.removeEventListener("keydown", keys);
  };
}

function launch(stage: HTMLElement, hero: HTMLElement, phone: HTMLElement, show: CarShow | null) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const midX = vw / 2;
  // The middle of what the navbar leaves showing.
  const midY = vh / 2 + 30;
  const reach = Math.hypot(vw, vh) / 2 + 80;
  const start = performance.now();
  const unit = Math.min(vw, vh) / 800 + 0.35;
  const made: Element[] = [];
  const next = hero.nextElementSibling;
  const toNextSection = () => next?.scrollIntoView({ block: "start", behavior: "instant" });
  const release = holdStill();

  stage.hidden = false;
  stage.dataset.car = show ? "3d" : "flat";

  // The section underneath holds its own animations until the night starts lifting off it (styles/motion/reveal.css).
  const root = document.documentElement;
  root.classList.add("launching");
  const uncover = window.setTimeout(() => root.classList.remove("launching"), at.reveal + lasts.reveal * 0.4);

  // A copy of the phone, exactly where the real one is: the opening plays on it there, then it comes forward. It lives in
  // the overlay, so scrolling can't move it. The real one waits behind.
  const box = phone.getBoundingClientRect();
  const screen = phone.querySelector<HTMLElement>("[data-ui]")?.getBoundingClientRect() ?? box;
  const startX = box.left + box.width / 2;
  const startY = box.top + box.height / 2;
  const tilt = getComputedStyle(phone).transform;
  const copy = phone.cloneNode(true) as HTMLElement;
  const width = phone.offsetWidth;
  const height = phone.offsetHeight;
  Object.assign(copy.style, { position: "absolute", left: `${midX - width / 2}px`, top: `${midY - height / 2}px`, width: `${width}px`, margin: "0", animation: "none", zIndex: "2" });
  const realVideo = phone.querySelector("video");
  const copyVideo = copy.querySelector("video");
  if (realVideo && copyVideo) {
    copyVideo.muted = true;
    copyVideo.currentTime = realVideo.currentTime;
    copyVideo.play().catch(() => {});
  }
  stage.append(copy);
  made.push(copy);
  phone.style.visibility = "hidden";

  const fit = Math.min(1.2, (vh * 0.8) / height);
  const dx = startX - midX;
  const dy = startY - midY;
  copy.animate(
    [
      { transform: `translate(${dx}px, ${dy}px) ${tilt === "none" ? "" : tilt}` },
      { transform: `scale(${fit})` },
    ],
    { delay: at.phoneIn, duration: lasts.phoneIn, fill: "both", easing: soft },
  );
  const drop = copy.animate([{ translate: "0 0" }, { translate: `0 ${vh + height}px` }], { delay: at.phoneOut, duration: lasts.phoneOut, fill: "forwards", easing: "cubic-bezier(0.5, 0, 0.9, 0.6)" });

  // The page dims a little, so the light reads.
  stage.querySelector("[data-veil]")?.animate([{ opacity: 0 }, { opacity: 0.32 }], { duration: 320, fill: "both", easing: "ease-out" });

  // The phone's screen goes dark with the wordmark on it, waiting to be charged.
  const copyScreen = copy.querySelector<HTMLElement>("[data-ui]");
  const dark = document.createElement("div");
  dark.className = "absolute inset-0 z-30 grid place-items-center bg-ink-deep opacity-0";
  const word = document.createElement("span");
  word.className = "font-display text-[44px] font-extrabold tracking-tight text-surface opacity-0";
  word.textContent = "RydCo";
  const charge = document.createElement("div");
  charge.className = "absolute inset-0 z-40 opacity-0 mix-blend-plus-lighter";
  charge.style.background = "radial-gradient(circle at 50% 52%, var(--color-screen) 0%, var(--color-brand) 38%, transparent 75%)";
  dark.append(word);
  copyScreen?.append(dark, charge);
  dark.animate([{ opacity: 0 }, { opacity: 0.96 }], { delay: at.dark, duration: lasts.dark, fill: "both", easing: "ease-out" });
  const glow = (r: number) => `0 0 ${r}px var(--color-brand), 0 0 ${r * 2.4}px var(--color-accent)`;
  word.animate(
    [
      { opacity: 0, textShadow: glow(4), offset: 0 },
      { opacity: 0.7, textShadow: glow(8), offset: (at.dark + 200 - at.dark) / (at.charge + 60 - at.dark) },
      { opacity: 0.85, textShadow: glow(12), offset: (at.streams + 260 - at.dark) / (at.charge + 60 - at.dark) },
      { opacity: 1, textShadow: glow(26) },
    ],
    { delay: at.dark, duration: at.charge + 60 - at.dark, fill: "both", easing: "ease-in" },
  );
  charge.animate([{ opacity: 0 }, { opacity: 1, offset: 0.25 }, { opacity: 0.35 }], { delay: at.charge, duration: 300, fill: "both", easing: "ease-out" });

  // The car: from where it's parked, off the end of the route to the foot of the phone, then facing the screen.
  const parked = [...hero.querySelectorAll<SVGGElement>("[data-route-car]")].find((c) => c.getBoundingClientRect().width > 0);
  const c = parked?.getBoundingClientRect() ?? new DOMRect(midX - 30, vh + 40, 60, 30);
  const big = vw < 700 ? Math.min(vw * 0.32, 160) : Math.min(220, Math.max(140, vw * 0.13));
  // The route meets the car under its wheels, and the car's middle sits about a quarter of its width above that.
  const lift = (w: number) => w * 0.24;
  const p0 = { x: c.left + c.width / 2, y: Math.min(c.bottom - c.height * 0.1, vh + 40) };
  const left = (screen.left + screen.right) / 2 < p0.x;
  // Nose to the phone's foot, the car beside it; on a narrow screen it can't go past the edge, so it overlaps the corner.
  const beside = left ? screen.right + big * 0.4 : screen.left - big * 0.4;
  const p3 = { x: Math.min(vw - big * 0.52, Math.max(big * 0.52, beside)), y: Math.min(screen.bottom + big * 0.08, vh - big * 0.12) };
  const centre = { x: (screen.left + screen.right) / 2, y: screen.top + screen.height * 0.5 };
  const endX = centre.x - p3.x;
  const endY = (centre.y - p3.y) * 0.35;
  const endLength = Math.hypot(endX, endY) || 1;
  const dist = Math.hypot(p3.x - p0.x, p3.y - p0.y);
  // It sets off the way it's parked, facing right, and has room to turn if the phone is the other way.
  const room = Math.max(40, vw - p0.x - 24);
  const p1 = { x: p0.x + Math.min(dist * 0.45, room), y: p0.y };
  const p2 = { x: p3.x - (endX / endLength) * dist * 0.32, y: p3.y - (endY / endLength) * dist * 0.32 };
  const path = road(p0, p1, p2, p3);

  // The route line follows the car.
  const trail = stage.querySelector<SVGPathElement>("[data-trail]");
  trail?.setAttribute("d", path.d);
  trail?.setAttribute("stroke-width", String(vw < 768 ? 4 : 6));

  // Where its headlights end up: the light comes from there.
  const endYaw = Math.atan2(-endY, endX);
  const lamp = { x: p3.x + Math.cos(endYaw) * big * 0.46, y: p3.y - lift(big) + big * 0.03 - Math.sin(endYaw) * big * 0.12 };
  const lights = (t: number) =>
    Math.max(blink(t, at.lights, 1.3), blink(t, at.lights + 150, 2), span(t, at.lights + 150, 180) * 0.9) + span(t, at.streams - 100, 200) * 0.5 + blink(t, at.charge - 40, 1.2);
  const flare = (t: number) => Math.max(blink(t, at.lights, 1.3), blink(t, at.lights + 150, 2)) + blink(t, at.streams - 40, 1.2);

  const holder = stage.querySelector<HTMLElement>("[data-car3d]");
  const driver = stage.querySelector<HTMLElement>("[data-driver]");
  if (show && holder) holder.replaceChildren(show.canvas);
  // A moment's crossfade hides any difference between the flat car and its 3D twin.
  window.setTimeout(() => parked && (parked.style.visibility = "hidden"), show ? 120 : 0);
  const firstYaw = Math.atan2(-path.along(0.02).dy, path.along(0.02).dx);
  let yawBefore = 0;
  let raf = 0;
  const frame = () => {
    const t = performance.now() - start;
    const w = c.width + (big - c.width) * out(span(t, 0, lasts.grow));
    const u = inOut(span(t, at.drive, lasts.drive));
    const p = path.along(u);
    // Facing the way it drives: until it sets off, it turns from the parked car's way (right) to the road's.
    let yaw = t < at.drive ? firstYaw * inOut(span(t, 0, at.drive)) : u >= 1 ? endYaw : Math.atan2(-p.dy, p.dx);
    while (yaw - yawBefore > Math.PI) yaw -= Math.PI * 2;
    while (yaw - yawBefore < -Math.PI) yaw += Math.PI * 2;
    yawBefore = yaw;
    const x = p.x;
    const y = p.y - lift(w);
    const gone = 1 - span(t, at.phoneIn, 220);
    if (trail) trail.style.strokeDashoffset = String(1 - u);
    if (show && holder) {
      holder.style.transform = `translate(${x - show.size / 2}px, ${y - show.size / 2}px) scale(${w / show.carWidth})`;
      holder.style.opacity = String(Math.min(1, t / 120) * gone);
      show.render({
        yaw,
        rise: inOut(span(t, 0, 320)),
        roll: (u * path.total) / (w * 0.107),
        squat: 0.05 * Math.sin(Math.PI * span(t, at.drive, 280)) - 0.035 * Math.sin(Math.PI * span(t, at.drive + lasts.drive - 160, 260)),
        hop: 0.5 * Math.sin(Math.PI * span(t, 40, 260)),
        lights: lights(t),
        flash: flare(t),
      });
    } else if (driver) {
      // The flat car leans into the road's direction, and turns over if that's leftwards so it stays upright.
      const turn = Math.atan2(p.dy, p.dx);
      const flip = Math.cos(turn) < 0 ? -1 : 1;
      driver.style.width = `${w}px`;
      driver.style.height = `${w * 0.6}px`;
      driver.style.transform = `translate(${x - w / 2}px, ${y - w * 0.3}px) rotate(${t < at.drive ? 0 : turn}rad) scale(1, ${t < at.drive ? 1 : flip})`;
      driver.style.opacity = String(gone);
    }
    if (t < at.phoneIn + 240) raf = requestAnimationFrame(frame);
  };
  frame();

  // The headlights light the screen, and threads of light stream from them into it.
  const light = stage.querySelector<SVGSVGElement>("[data-light]");
  const beam = light?.querySelector<SVGPolygonElement>("[data-beam]");
  const gradient = light?.querySelector("#launch-beam");
  const near = left ? screen.right - screen.width * 0.06 : screen.left + screen.width * 0.06;
  const far = left ? screen.left + screen.width * 0.12 : screen.right - screen.width * 0.12;
  beam?.setAttribute(
    "points",
    `${lamp.x} ${lamp.y - big * 0.03} ${near} ${screen.top + screen.height * 0.38} ${far} ${screen.top + screen.height * 0.3} ${far} ${screen.bottom - screen.height * 0.08} ${lamp.x} ${lamp.y + big * 0.03}`,
  );
  for (const [k, v] of Object.entries({ x1: lamp.x, y1: lamp.y, x2: centre.x, y2: centre.y })) gradient?.setAttribute(k, String(v));
  beam?.animate(
    [{ opacity: 0 }, { opacity: 0.9, offset: 0.12 }, { opacity: 0.75, offset: 0.7 }, { opacity: 1, offset: 0.9 }, { opacity: 0 }],
    { delay: at.beam, duration: at.phoneIn + 160 - at.beam, fill: "both", easing: "ease-in-out" },
  );
  const threads = light?.querySelector("[data-threads]");
  const r = random(11);
  for (let i = 0; i < 14 && threads; i++) {
    const to = { x: screen.left + screen.width * (0.18 + r() * 0.64), y: screen.top + screen.height * (0.3 + r() * 0.32) };
    const d = Math.hypot(to.x - lamp.x, to.y - lamp.y);
    const c1 = { x: lamp.x + (centre.x - lamp.x) * 0.35 + (r() - 0.5) * d * 1.1, y: lamp.y + (r() - 0.7) * d * 0.5 };
    const c2 = { x: to.x + (r() - 0.5) * d * 1.2, y: to.y + d * (0.25 + r() * 0.4) };
    const line = `M${lamp.x + (r() - 0.5) * 8} ${lamp.y + (r() - 0.5) * 5} C${c1.x} ${c1.y} ${c2.x} ${c2.y} ${to.x} ${to.y}`;
    // A wide soft glow, a warm middle and a bright core, travelling together.
    for (const [colour, widthPx, opacity] of [
      ["stroke-accent", 16, 0.28],
      ["stroke-brand", 6, 0.8],
      ["stroke-screen", 2.4, 1],
    ] as const) {
      const strand = svg("path", { d: line, pathLength: 1, fill: "none", class: colour, "stroke-width": widthPx, "stroke-linecap": "round", "stroke-dasharray": "0.45 1.8", "stroke-dashoffset": 0.45, opacity });
      threads.append(strand);
      made.push(strand);
      strand.animate([{ strokeDashoffset: 0.45 }, { strokeDashoffset: -1.35 }], { delay: at.streams + i * 32, duration: 440, iterations: 3, fill: "both", easing: "cubic-bezier(0.4, 0, 0.6, 1)" });
    }
  }

  // Charged: light bursts out of the screen with a ring and rays, and the phone jolts.
  const flash = stage.querySelector<HTMLElement>("[data-flash]");
  const ring = stage.querySelector<HTMLElement>("[data-ring]");
  const rays = stage.querySelector<HTMLElement>("[data-rays]");
  const size = (el: HTMLElement | null, s: number) => el && Object.assign(el.style, { left: `${centre.x}px`, top: `${centre.y}px`, width: `${s}px`, height: `${s}px` });
  size(flash, screen.height * 1.5);
  size(ring, screen.width * 1.1);
  size(rays, screen.height * 2.2);
  flash?.animate(
    [
      { opacity: 0, transform: "translate(-50%, -50%) scale(0.2)" },
      { opacity: 1, transform: "translate(-50%, -50%) scale(0.8)", offset: 0.2 },
      { opacity: 0, transform: "translate(-50%, -50%) scale(1.4)" },
    ],
    { delay: at.charge, duration: 460, fill: "both", easing: "cubic-bezier(0.2, 0.7, 0.3, 1)" },
  );
  rays?.animate(
    [
      { opacity: 0, transform: "translate(-50%, -50%) scale(0.3) rotate(-8deg)" },
      { opacity: 0.8, transform: "translate(-50%, -50%) scale(0.85) rotate(0deg)", offset: 0.25 },
      { opacity: 0, transform: "translate(-50%, -50%) scale(1.3) rotate(6deg)" },
    ],
    { delay: at.charge, duration: 560, fill: "both", easing: "cubic-bezier(0.2, 0.7, 0.3, 1)" },
  );
  ring?.animate(
    [
      { opacity: 0, transform: "translate(-50%, -50%) scale(0.3)" },
      { opacity: 1, transform: "translate(-50%, -50%) scale(0.4)", offset: 0.06 },
      { opacity: 0, transform: "translate(-50%, -50%) scale(2.2)" },
    ],
    { delay: at.charge, duration: 560, fill: "both", easing: "cubic-bezier(0.15, 0.7, 0.3, 1)" },
  );
  copy.animate(
    [
      { scale: "1", rotate: "0deg" },
      { scale: "1.04", rotate: "-1.4deg", offset: 0.25 },
      { scale: "0.99", rotate: "0.7deg", offset: 0.6 },
      { scale: "1", rotate: "0deg" },
    ],
    { delay: at.charge, duration: 380, easing: "ease-out" },
  );
  light?.animate([{ opacity: 1 }, { opacity: 0 }], { delay: at.phoneIn, duration: 200, fill: "both" });
  trail?.animate([{ opacity: 1 }, { opacity: 0 }], { delay: at.phoneIn, duration: 220, fill: "both" });

  // Night blooms out from the phone as it comes forward, and once it's dark the page moves on underneath. It stays still
  // until the night lifts, so scrolling meanwhile can't carry it past the next section and snap it back.
  const night = stage.querySelector<HTMLElement>("[data-night]");
  const bloom = night?.animate([{ clipPath: `circle(0px at ${midX}px ${midY}px)` }, { clipPath: `circle(${reach * 1.2}px at ${midX}px ${midY}px)` }], {
    delay: at.bloom,
    duration: lasts.bloom,
    fill: "both",
    easing: "cubic-bezier(0.5, 0, 0.3, 1)",
  });
  bloom?.finished.then(toNextSection).catch(() => {});
  const free = window.setTimeout(release, at.reveal);

  roadLines(stage, midX, midY, reach, unit, made, start);
  flyOut(stage, unit);

  // The phone pulls the route line down the screen, with the car riding it, pointing at what's next.
  const route = `M${midX} ${midY} C${midX + vw * 0.08} ${midY + vh * 0.2} ${midX - vw * 0.08} ${midY + vh * 0.35} ${midX} ${vh + 60}`;
  const line = stage.querySelector<SVGPathElement>("[data-route]");
  const rider = stage.querySelector<SVGGElement>("[data-rider]");
  const draw = { delay: at.route, duration: lasts.route, fill: "both", easing: "cubic-bezier(0.4, 0, 0.25, 1)" } as const;
  line?.setAttribute("d", route);
  line?.animate([{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], draw);
  if (rider) {
    rider.style.offsetPath = `path("${route}")`;
    rider.animate([{ offsetDistance: "0%" }, { offsetDistance: "100%" }], draw);
    rider.animate([{ opacity: 0 }, { opacity: 1, offset: 0.08 }, { opacity: 1 }], draw);
  }

  // The next section rises to meet the car, taking the night away with it.
  const reveal = stage.animate([{ clipPath: "inset(0 0 0% 0 round 0 0 0 0)" }, { clipPath: "inset(0 0 8% 0 round 0 0 40px 40px)", offset: 0.25 }, { clipPath: "inset(0 0 100% 0 round 0 0 40px 40px)" }], {
    delay: at.reveal,
    duration: lasts.reveal,
    fill: "both",
    easing: "cubic-bezier(0.6, 0, 0.2, 1)",
  });
  reveal.finished
    .then(() => {
      cancelAnimationFrame(raf);
      show?.dispose();
      holder?.replaceChildren();
      // In case the night's move didn't happen; never back up past where someone has scrolled to since.
      if (next && next.getBoundingClientRect().top > 1) toNextSection();
      phone.style.visibility = "";
      if (parked) parked.style.visibility = "";
      stage.hidden = true;
      made.forEach((el) => el.remove());
      stage.getAnimations({ subtree: true }).forEach((a) => a.cancel());
      drop.cancel();
    })
    .catch(() => {})
    .finally(() => {
      window.clearTimeout(free);
      release();
      window.clearTimeout(uncover);
      root.classList.remove("launching");
    });
}

const bright: Tone = { ...toneOn.ink, body: "fill-accent", glass: "fill-surface" };
const pale: Tone = { ...toneOn.ink, body: "fill-brand", glass: "fill-ink" };

function Flying({ x, y, spin, delay, size = 110, shade, children }: { x: number; y: number; spin: number; delay: number; size?: number; shade: string; children: ReactNode }) {
  return (
    <div
      data-fly
      data-x={x}
      data-y={y}
      data-spin={spin}
      data-at={delay}
      className="absolute z-[3] opacity-0"
      style={{ left: `calc(50% - ${size / 2}px)`, top: `calc(50% - ${size / 2}px)`, width: size, height: size, filter: `drop-shadow(0 6px 0 var(--color-${shade}))` }}
    >
      {children}
    </div>
  );
}

function CarSticker({ tone }: { tone: Tone }) {
  return (
    <svg viewBox="-20 -20 40 24" className="h-full w-full overflow-visible" aria-hidden="true">
      <Car tone={tone} />
    </svg>
  );
}

const badge = "grid h-full w-full place-items-center font-display text-[36px] font-extrabold";

export function HeroLaunch() {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const hero = document.querySelector<HTMLElement>("section[aria-labelledby=hero-title]");
    const phone = hero?.querySelector<HTMLElement>(".hero-phone");
    if (!stage || !hero || !phone || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // The 3D car, made once three.js has loaded after the first interaction.
    let show: CarShow | null = null;
    let making: Promise<CarShow | null> | null = null;
    const signals = ["pointermove", "pointerdown", "touchstart", "wheel", "keydown", "scroll"] as const;
    const warm = () => {
      signals.forEach((s) => window.removeEventListener(s, warm));
      if (!can3d()) return;
      making ??= import("@/views/home/components/car3d")
        .then((m) => (show = m.makeCarShow()))
        .catch(() => null);
    };
    signals.forEach((s) => window.addEventListener(s, warm, { passive: true }));

    const startedAt = window.scrollY;
    const onScroll = () => {
      const stop = () => window.removeEventListener("scroll", onScroll);
      // Jumped past the hero, or tabbed out of it: leave them where they went.
      const focused = document.activeElement;
      const movedOn = hero.getBoundingClientRect().bottom < window.innerHeight * 0.3 || (focused && focused !== document.body && !hero.contains(focused));
      if (launchIsOff() || movedOn) return stop();
      if (window.scrollY - startedAt < 30) return;
      // Busy with an open dropdown, or on a phone, still on the way down to the phone mockup past the route check.
      if (document.querySelector('[aria-expanded="true"]')) return;
      const box = phone.getBoundingClientRect();
      if (box.top + box.height / 2 > window.innerHeight * 0.55) return;
      stop();
      if (show || !making) return launch(stage, hero, phone, show);
      // Still loading: give it a moment, then go with whichever car is ready.
      const late = new Promise<null>((done) => window.setTimeout(() => done(null), waitFor3d));
      Promise.race([making, late]).then(() => launch(stage, hero, phone, show));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      signals.forEach((s) => window.removeEventListener(s, warm));
      show?.dispose();
    };
  }, []);

  return (
    <div ref={stageRef} hidden aria-hidden="true" className="pointer-events-none fixed inset-0 z-30 overflow-hidden" style={{ perspective: "800px" }}>
      {/* The opening's light veil over the page, then the night. */}
      <div data-veil className="absolute inset-0 bg-surface opacity-0" />
      <div data-night className="absolute inset-0 bg-[color-mix(in_srgb,var(--color-ink-deep)_72%,black)]" />
      <svg className="absolute inset-0 z-[1] h-full w-full overflow-visible" aria-hidden="true">
        <path data-trail pathLength={1} strokeDasharray="1 1" strokeDashoffset={1} className="fill-none stroke-accent-strong" strokeLinecap="round" />
        <path data-route pathLength={1} strokeDasharray="1 1" strokeDashoffset={1} className="fill-none stroke-accent" strokeWidth="9" strokeLinecap="round" />
        <g data-rider className="opacity-0" style={{ offsetRotate: "auto" }}>
          <g transform="scale(2.6)">
            <Car tone={toneOn.ink} />
          </g>
        </g>
      </svg>

      <Flying x={-210} y={-120} spin={14} delay={0} size={160} shade="accent-deep">
        <CarSticker tone={bright} />
      </Flying>
      <Flying x={190} y={150} spin={-18} delay={110} size={120} shade="accent-deep">
        <svg viewBox="0 0 40 52" className="h-full w-full" aria-hidden="true">
          <path d="M20 51S3 34 3 20a17 17 0 0 1 34 0c0 14-17 31-17 31Z" className="fill-accent" />
          <circle cx="20" cy="20" r="7" className="fill-surface" />
        </svg>
      </Flying>
      <Flying x={-170} y={190} spin={20} delay={220} shade="ink">
        <span className={`${badge} rounded-full bg-brand text-ink`}>Rs</span>
      </Flying>
      <Flying x={220} y={-170} spin={-12} delay={320} shade="ink">
        <span className={`${badge} rounded-full bg-surface text-ink`}>AM</span>
      </Flying>
      <Flying x={-230} y={40} spin={-16} delay={420} shade="ink-deep">
        <span className="grid h-full w-full place-items-center rounded-[34px] bg-trust text-[56px] text-on-trust">
          <Tick />
        </span>
      </Flying>
      <Flying x={140} y={-210} spin={16} delay={520} size={160} shade="ink">
        <CarSticker tone={pale} />
      </Flying>
      <Flying x={230} y={70} spin={-20} delay={620} shade="accent-deep">
        <span className={`${badge} rounded-full bg-accent text-on-accent`}>HR</span>
      </Flying>

      {/* The headlights' beam on the screen and the threads of light, over the phone and under the car. */}
      <svg data-light className="absolute inset-0 z-[3] h-full w-full overflow-visible" aria-hidden="true">
        <defs>
          <linearGradient id="launch-beam" gradientUnits="userSpaceOnUse">
            <stop offset="0" style={{ stopColor: "var(--color-screen)", stopOpacity: 0.95 }} />
            <stop offset="0.5" style={{ stopColor: "var(--color-brand)", stopOpacity: 0.5 }} />
            <stop offset="1" style={{ stopColor: "var(--color-brand)", stopOpacity: 0 }} />
          </linearGradient>
          <filter id="launch-soft" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
        </defs>
        <polygon data-beam fill="url(#launch-beam)" filter="url(#launch-soft)" className="opacity-0 mix-blend-plus-lighter" />
        <g data-threads />
      </svg>
      <div data-driver className="absolute top-0 left-0 z-[4] opacity-0">
        <CarSticker tone={toneOn.brand} />
      </div>
      <div data-car3d className="absolute top-0 left-0 z-[4] origin-center opacity-0" />
      {/* The hit: headlight light, warm white at the middle, and a ring. */}
      {/* Light adds to what's under it (plus-lighter), so the phone and the night brighten rather than go grey. */}
      <div
        data-flash
        className="absolute z-[5] rounded-full opacity-0 mix-blend-plus-lighter"
        style={{ background: "radial-gradient(closest-side, var(--color-screen) 0%, var(--color-surface) 22%, var(--color-brand) 45%, transparent 100%)" }}
      />
      <div
        data-rays
        className="absolute z-[5] rounded-full opacity-0 mix-blend-plus-lighter"
        style={{
          background: "repeating-conic-gradient(from 0deg, var(--color-surface) 0deg 1.6deg, transparent 1.6deg 12deg)",
          maskImage: "radial-gradient(closest-side, black 8%, transparent 70%)",
        }}
      />
      <div data-ring className="absolute z-[5] rounded-full border-[6px] border-brand opacity-0" />
    </div>
  );
}

"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { Car } from "@/components/brand/Car";
import { toneOn, type Tone } from "@/components/brand/tones";
import { Tick } from "@/components/ui/icons";
import { launchIsOff } from "@/lib/hero-launch";
import type { CarShow } from "./car3d";

// What happens on the first scroll down from the home hero, on every page load. Night falls out from the parked car as it
// comes to life in 3D, its headlights blink twice and stay on, and it drives into the phone, which has come to the front.
// Light bursts out of the phone as it hits, road lines and the things a ride is made of burst out of it, then it drops
// away pulling the route line down the screen, and the next section rises to meet the car. About 3.2s. It's live rather
// than a video because it has to start at once, from wherever the phone is. It sits over the page and nothing is locked,
// and the page is moved to the next section while it's dark. Skipped with reduced motion, by a jump past the hero, and by
// the hero's button.
//
// The 3D car (./car3d, three.js) loads only once someone touches, scrolls, points or types, so a visit that never does
// isn't slowed by it. If it isn't ready in time, or the device can't draw 3D, the flat car drives the same route.

const soft = "cubic-bezier(0.22, 0.8, 0.26, 1)";
const rush = "cubic-bezier(0.45, 0, 0.8, 0.55)";

// When each part starts, in ms.
const at = { phoneIn: 0, bloom: 80, lights: 260, drive: 560, impact: 960, burst: 960, fly: 1020, phoneOut: 1840, route: 1860, reveal: 2600 };
const lasts = { phoneIn: 520, bloom: 560, flash: 520, phoneOut: 440, route: 860, reveal: 560 };
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

const lineColours = ["bg-surface", "bg-surface", "bg-surface", "bg-accent", "bg-brand"];

// Made 25 a frame, so building them doesn't hold up the car's first moves. They don't show until the hit.
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

  stage.hidden = false;
  stage.dataset.car = show ? "3d" : "flat";

  // The section underneath holds its own animations until the night starts lifting off it (styles/motion/reveal.css).
  const root = document.documentElement;
  root.classList.add("launching");
  const uncover = window.setTimeout(() => root.classList.remove("launching"), at.reveal + lasts.reveal * 0.4);

  // A copy of the phone comes forward. It lives in the overlay, so scrolling can't move it. The real one waits behind.
  const box = phone.getBoundingClientRect();
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
  const out = copy.animate([{ translate: "0 0" }, { translate: `0 ${vh + height}px` }], { delay: at.phoneOut, duration: lasts.phoneOut, fill: "both", easing: "cubic-bezier(0.5, 0, 0.9, 0.6)" });

  // The hero's car comes to life where it's parked, then drives into the phone. If it's off screen (on a phone, once
  // scrolled past it), it comes in from just below.
  const parked = [...hero.querySelectorAll<SVGGElement>("[data-route-car]")].find((c) => c.getBoundingClientRect().width > 0);
  const c = parked?.getBoundingClientRect() ?? new DOMRect(midX - 30, vh + 40, 60, 30);
  const carX = c.left + c.width / 2;
  const carY = Math.min(c.top + c.height / 2, vh + 40);
  const towards = (f: number) => [carX + (midX - carX) * f, carY + (midY - carY) * f] as const;
  // Where it swings up to for the headlights, kept well inside the screen.
  const [upX, upY] = towards(0.22);
  const up = [Math.min(vw * 0.78, Math.max(vw * 0.22, upX)), Math.min(vh * 0.78, Math.max(vh * 0.3, upY))] as const;
  const facing = midX < carX ? -1 : 1;
  const whole = at.impact;
  const k = (ms: number) => ms / whole;

  if (show) {
    // The 3D car's canvas takes over from the parked car, scaled so the two are the same size, and is carried across the
    // screen here while ./car3d turns it, spins its wheels and works its lights on the same clock.
    const holder = stage.querySelector<HTMLElement>("[data-car3d]")!;
    holder.replaceChildren(show.canvas);
    const s0 = c.width / show.carWidth;
    const pose = ([x, y]: readonly [number, number], s: number) => `translate(${x - show.size / 2}px, ${y - show.size / 2}px) scale(${s})`;
    // It swings up towards you as night falls, big enough for its shape and its headlights to show, then drives in.
    holder.animate(
      [
        { opacity: 0, transform: pose(towards(0), s0) },
        { opacity: 1, transform: pose(towards(0), s0), offset: k(140), easing: "cubic-bezier(0.3, 0, 0.2, 1)" },
        { opacity: 1, transform: pose(up, s0 * 3.4), offset: k(at.drive - 40), easing: "cubic-bezier(0.5, 0, 0.75, 0.3)" },
        { opacity: 1, transform: pose(towards(0.8), s0 * 3.7), offset: k(at.drive + (at.impact - at.drive) * 0.7), easing: "cubic-bezier(0.4, 0, 0.7, 1)" },
        // Solid right up to the hit, then gone inside the flash.
        { opacity: 1, transform: pose(towards(0.98), s0 * 1.9), offset: k(at.impact - 30) },
        { opacity: 0, transform: pose(towards(1), s0 * 1.6) },
      ],
      { duration: whole, fill: "both" },
    );
    show.play(start, { lights: at.lights, drive: at.drive, impact: at.impact, facing });
    // A moment's crossfade hides any difference between the flat car and its 3D twin.
    window.setTimeout(() => parked && (parked.style.visibility = "hidden"), 140);
  } else {
    const driver = stage.querySelector<HTMLElement>("[data-driver]");
    if (parked) parked.style.visibility = "hidden";
    if (driver) {
      driver.style.width = `${c.width}px`;
      driver.style.height = `${c.width * 0.6}px`;
      // It faces the way it drives, turning round as it sets off if the phone is to its left.
      const pose = ([x, y]: readonly [number, number], s: number, turn = 1) => `translate(${x - c.width / 2}px, ${y - (c.width * 0.6) / 2}px) scale(${s * turn}, ${s})`;
      driver.animate(
        [
          { opacity: 1, transform: pose(towards(0), 1) },
          { opacity: 1, transform: pose(towards(0), 1), offset: k(at.drive), easing: "ease-in" },
          { opacity: 1, transform: pose(towards(0.6), 1.6, facing), offset: k(at.drive + (at.impact - at.drive) * 0.6), easing: "ease-in" },
          { opacity: 0, transform: pose(towards(1), 0.3, facing) },
        ],
        { duration: whole, fill: "both" },
      );
    }
  }

  // Night falls out from the car, so its headlights come on in the dark. Once it's dark the page moves on underneath.
  const night = stage.querySelector<HTMLElement>("[data-night]");
  const dark = Math.hypot(Math.max(carX, vw - carX), Math.max(carY, vh - carY)) + 60;
  const bloom = night?.animate([{ clipPath: `circle(0px at ${carX}px ${carY}px)` }, { clipPath: `circle(${dark}px at ${carX}px ${carY}px)` }], {
    delay: at.bloom,
    duration: lasts.bloom,
    fill: "both",
    easing: "cubic-bezier(0.45, 0, 0.3, 1)",
  });
  bloom?.finished.then(toNextSection).catch(() => {});

  // The hit: headlight light bursts out of the phone with a ring, the whole screen flashes once, and the phone jolts.
  stage.querySelector<HTMLElement>("[data-bulb]")?.animate([{ opacity: 0 }, { opacity: 0.45, offset: 0.12 }, { opacity: 0 }], {
    delay: at.impact - 30,
    duration: 320,
    fill: "both",
    easing: "ease-out",
  });
  const flash = stage.querySelector<HTMLElement>("[data-flash]");
  const ring = stage.querySelector<HTMLElement>("[data-ring]");
  const rays = stage.querySelector<HTMLElement>("[data-rays]");
  rays?.animate(
    [
      { opacity: 0, transform: "translate(-50%, -50%) scale(0.3) rotate(-8deg)" },
      { opacity: 0.85, transform: "translate(-50%, -50%) scale(0.9) rotate(0deg)", offset: 0.2 },
      { opacity: 0, transform: "translate(-50%, -50%) scale(1.4) rotate(6deg)" },
    ],
    { delay: at.impact, duration: 700, fill: "both", easing: "cubic-bezier(0.2, 0.7, 0.3, 1)" },
  );
  for (const el of [flash, ring, rays]) {
    if (el) Object.assign(el.style, { left: `${midX}px`, top: `${midY}px` });
  }
  flash?.animate(
    [
      { opacity: 0, transform: "translate(-50%, -50%) scale(0.1)" },
      { opacity: 1, transform: "translate(-50%, -50%) scale(0.8)", offset: 0.14 },
      { opacity: 0.9, transform: "translate(-50%, -50%) scale(1.05)", offset: 0.4 },
      { opacity: 0, transform: "translate(-50%, -50%) scale(1.6)" },
    ],
    { delay: at.impact - 30, duration: lasts.flash, fill: "both", easing: "cubic-bezier(0.2, 0.7, 0.3, 1)" },
  );
  ring?.animate(
    [
      { opacity: 1, transform: "translate(-50%, -50%) scale(0.2)" },
      { opacity: 0, transform: "translate(-50%, -50%) scale(2.6)" },
    ],
    { delay: at.impact, duration: 620, fill: "both", easing: "cubic-bezier(0.15, 0.7, 0.3, 1)" },
  );
  copy.animate(
    [
      { scale: "1", rotate: "0deg" },
      { scale: "1.05", rotate: "-1.8deg", offset: 0.22 },
      { scale: "0.985", rotate: "0.9deg", offset: 0.58 },
      { scale: "1", rotate: "0deg" },
    ],
    { delay: at.impact, duration: 420, easing: "ease-out" },
  );

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
      show?.dispose();
      stage.querySelector("[data-car3d]")?.replaceChildren();
      toNextSection();
      phone.style.visibility = "";
      if (parked) parked.style.visibility = "";
      stage.hidden = true;
      made.forEach((el) => el.remove());
      stage.getAnimations({ subtree: true }).forEach((a) => a.cancel());
      out.cancel();
    })
    .catch(() => {})
    .finally(() => {
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
      <div data-night className="absolute inset-0 bg-[color-mix(in_srgb,var(--color-ink-deep)_72%,black)]" />
      <svg className="absolute inset-0 z-[1] h-full w-full overflow-visible" aria-hidden="true">
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

      <div data-driver className="absolute top-0 left-0 z-[4] opacity-0">
        <CarSticker tone={bright} />
      </div>
      <div data-car3d className="absolute top-0 left-0 z-[4] origin-center opacity-0" />
      {/* The hit: headlight light, warm white at the middle, and a ring. */}
      {/* Light adds to what's under it (plus-lighter), so the phone and the night brighten rather than go grey. */}
      <div
        data-flash
        className="absolute z-[5] h-[80vmax] w-[80vmax] rounded-full opacity-0 mix-blend-plus-lighter"
        style={{ background: "radial-gradient(closest-side, var(--color-screen) 0%, var(--color-surface) 22%, var(--color-brand) 45%, transparent 100%)" }}
      />
      <div
        data-rays
        className="absolute z-[5] h-[120vmax] w-[120vmax] rounded-full opacity-0 mix-blend-plus-lighter"
        style={{
          background: "repeating-conic-gradient(from 0deg, var(--color-surface) 0deg 1.6deg, transparent 1.6deg 12deg)",
          maskImage: "radial-gradient(closest-side, black 8%, transparent 70%)",
        }}
      />
      <div data-ring className="absolute z-[5] h-[46vmin] w-[46vmin] rounded-full border-[6px] border-brand opacity-0" />
      <div data-bulb className="absolute inset-0 z-[6] bg-screen opacity-0 mix-blend-plus-lighter" />
    </div>
  );
}

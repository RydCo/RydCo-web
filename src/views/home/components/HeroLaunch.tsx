"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { Car } from "@/components/brand/Car";
import { toneOn, type Tone } from "@/components/brand/tones";
import { Tick } from "@/components/ui/icons";
import { launchIsOff } from "@/lib/hero-launch";

// What happens on the first scroll down from the home hero, on every page load. The page darkens around the phone, the
// little car parked under the pilot label switches its headlights on and drives into the phone's screen. Then the phone
// comes to the front as night falls, road lines and the things a ride is made of burst out of it, it drops away pulling
// the route line down the screen with the car riding it, and the next section rises to meet the car. About 3.4s. It's live
// rather than a video because it has to start at once, from wherever the phone is. The page holds still while it plays,
// is moved to the next section once it's dark, and scrolls again as the night lifts. Skipped with reduced motion, by a
// jump past the hero, and by the hero's button.

const soft = "cubic-bezier(0.22, 0.8, 0.26, 1)";
const rush = "cubic-bezier(0.45, 0, 0.8, 0.55)";

// When each part starts, in ms.
const at = { lights: 220, drive: 160, enter: 760, phoneIn: 940, burst: 1360, fly: 1420, phoneOut: 2140, route: 2160, reveal: 2800 };
const lasts = { dim: 360, drive: 760, enter: 180, phoneIn: 520, dark: 300, phoneOut: 440, route: 860, reveal: 560 };

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
// An angle in degrees, brought into -180..180.
const wrap = (a: number) => ((((a + 180) % 360) + 360) % 360) - 180;

type Point = { x: number; y: number };

// The car's way from where it's parked into the phone's screen: one curve, measured by distance, so it keeps an even pace.
function road(p0: Point, p1: Point, p2: Point, p3: Point) {
  const on = (u: number) => {
    const v = 1 - u;
    return { x: v * v * v * p0.x + 3 * v * v * u * p1.x + 3 * v * u * u * p2.x + u * u * u * p3.x, y: v * v * v * p0.y + 3 * v * v * u * p1.y + 3 * v * u * u * p2.y + u * u * u * p3.y };
  };
  const points = Array.from({ length: 81 }, (_, i) => on(i / 80));
  const lengths: number[] = new Array(points.length).fill(0);
  for (let i = 1; i < points.length; i++) lengths[i] = lengths[i - 1] + Math.hypot(points[i].x - points[i - 1].x, points[i].y - points[i - 1].y);
  const total = lengths[80] || 1;
  return (f: number) => {
    const d = clamp01(f) * total;
    let i = 1;
    while (i < 80 && lengths[i] < d) i++;
    const a = points[i - 1];
    const b = points[i];
    const k = (d - lengths[i - 1]) / (lengths[i] - lengths[i - 1] || 1);
    return { x: a.x + (b.x - a.x) * k, y: a.y + (b.y - a.y) * k, angle: Math.atan2(b.y - a.y, b.x - a.x) };
  };
}

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

// While the launch plays, the page holds still, so the car stays on its way to the phone. Scrolling already under way is
// stopped where it is, and wheel, touch and keyboard scrolling wait until the night starts lifting.
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

function launch(stage: HTMLElement, hero: HTMLElement, phone: HTMLElement) {
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

  // The section underneath holds its own animations until the night starts lifting off it (styles/motion/reveal.css).
  const root = document.documentElement;
  root.classList.add("launching");
  const uncover = window.setTimeout(() => root.classList.remove("launching"), at.reveal + lasts.reveal * 0.4);

  // A copy of the phone, exactly where the real one is, above the dark: it stays lit while the car drives into it, then
  // comes forward. It lives in the overlay, so scrolling can't move it. The real one waits behind.
  const box = phone.getBoundingClientRect();
  const screen = phone.querySelector<HTMLElement>("[data-ui]")?.getBoundingClientRect() ?? box;
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
  const dx = box.left + box.width / 2 - midX;
  const dy = box.top + box.height / 2 - midY;
  copy.animate(
    [
      { transform: `translate(${dx}px, ${dy}px) ${tilt === "none" ? "" : tilt}` },
      { transform: `scale(${fit})` },
    ],
    { delay: at.phoneIn, duration: lasts.phoneIn, fill: "both", easing: soft },
  );
  const drop = copy.animate([{ translate: "0 0" }, { translate: `0 ${vh + height}px` }], { delay: at.phoneOut, duration: lasts.phoneOut, fill: "forwards", easing: "cubic-bezier(0.5, 0, 0.9, 0.6)" });

  // The page darkens around the phone, then goes fully dark as the phone comes forward. Once it's dark the page moves on
  // underneath, and it stays still until the night lifts.
  const night = stage.querySelector<HTMLElement>("[data-night]");
  const darkAt = at.phoneIn + lasts.dark;
  const dark = night?.animate(
    [
      { opacity: 0, easing: "ease-out" },
      { opacity: 0.8, offset: lasts.dim / darkAt },
      { opacity: 0.8, offset: at.phoneIn / darkAt, easing: "ease-in" },
      { opacity: 1 },
    ],
    { duration: darkAt, fill: "both" },
  );
  dark?.finished.then(toNextSection).catch(() => {});
  const free = window.setTimeout(release, at.reveal);

  // The little car: from where it's parked, in a smooth curve into the bottom of the phone's screen, its headlights on.
  // It's drawn in the car's own units (30 long), so it's exactly the parked car's size.
  const parked = [...hero.querySelectorAll<SVGGElement>("[data-route-car]")].find((c) => c.getBoundingClientRect().width > 0);
  const c = parked?.getBoundingClientRect() ?? new DOMRect(midX - 24, vh + 30, 48, 28);
  if (parked) parked.style.visibility = "hidden";
  const scale = c.width / 30;
  // Where the car meets the road: the bottom of its body, in the flat car's drawing.
  const p0 = { x: c.left + c.width / 2, y: Math.min(c.top + (c.height * 16) / 17.7, vh + 30) };
  const left = (screen.left + screen.right) / 2 < p0.x;
  const p3 = { x: left ? screen.right - screen.width * 0.24 : screen.left + screen.width * 0.24, y: screen.bottom - screen.height * 0.12 };
  const towards = { x: (screen.left + screen.right) / 2 - p3.x, y: (screen.top + screen.height * 0.45 - p3.y) * 0.2 };
  const towardsLength = Math.hypot(towards.x, towards.y) || 1;
  const dist = Math.hypot(p3.x - p0.x, p3.y - p0.y);
  // It sets off the way it's facing, then swings round into the screen.
  const facing = left ? -1 : 1;
  const p1 = { x: p0.x + facing * dist * 0.38, y: p0.y };
  const p2 = { x: p3.x - (towards.x / towardsLength) * dist * 0.36, y: p3.y - (towards.y / towardsLength) * dist * 0.36 };
  const way = road(p0, p1, p2, p3);

  // The car is one small layer, moved by CSS transform so the browser only slides it, never redraws it. Its drawing is
  // in the car's own units (30 long), sized here to the parked car.
  const car = stage.querySelector<HTMLElement>("[data-car]");
  const drawing = car?.querySelector<SVGSVGElement>("svg");
  if (drawing) Object.assign(drawing.style, { left: `${-16 * scale}px`, top: `${-21 * scale}px`, width: `${102 * scale}px`, height: `${29 * scale}px` });
  const day = stage.querySelector<SVGGElement>("[data-day]");
  const dusk = stage.querySelector<SVGGElement>("[data-dusk]");
  const beam = stage.querySelector<SVGPolygonElement>("[data-beam]");
  const lamp = stage.querySelector<SVGCircleElement>("[data-lamp]");
  // The headlights flick on twice, then stay on.
  const lights = (t: number) => (t < at.lights ? 0 : t < at.lights + 50 ? 1 : t < at.lights + 110 ? 0.25 : Math.min(1, 0.6 + (t - at.lights - 110) / 200));
  let raf = 0;
  const frame = () => {
    const t = performance.now() - start;
    const u = inOut(span(t, at.drive, lasts.drive));
    const p = way(u);
    const going = inOut(span(t, at.enter, lasts.enter));
    // It stays nearly level, leaning at most 20 degrees into a turn: a side-on car driving up the screen reads as driving
    // away into the scene. Driving left, it turns round as it sets off, drawn mirrored so it stays upright. It shrinks a
    // little as it goes into the screen.
    const angle = (p.angle * 180) / Math.PI;
    const lean = Math.max(-20, Math.min(20, wrap(left ? angle - 180 : angle)));
    const turning = left ? inOut(span(t, 0, at.drive + 120)) : 1;
    const flip = left ? Math.cos(Math.PI * turning) : 1;
    const shrink = 1 - 0.5 * going;
    if (car) {
      car.style.transform = `translate(${p.x}px, ${p.y}px) scale(${shrink}) rotate(${lean * turning}deg) scale(${flip}, 1)`;
      car.style.opacity = String(1 - going);
    }
    // Ink by day, cream once it's dark, like the logo on each.
    if (t < lasts.dim + 40) {
      const dim = span(t, 0, lasts.dim);
      if (day) day.style.opacity = String(1 - dim);
      if (dusk) dusk.style.opacity = String(dim);
    }
    if (t < at.lights + 360) {
      const on = lights(t);
      if (beam) beam.style.opacity = String(on * 0.85);
      if (lamp) lamp.style.opacity = String(on);
    }
    if (t < at.phoneIn + 40) raf = requestAnimationFrame(frame);
  };
  frame();

  // A soft light where it goes into the screen.
  const glow = stage.querySelector<HTMLElement>("[data-glow]");
  if (glow) Object.assign(glow.style, { left: `${p3.x}px`, top: `${p3.y}px`, width: `${screen.width * 0.7}px`, height: `${screen.width * 0.7}px` });
  glow?.animate(
    [
      { opacity: 0, transform: "translate(-50%, -50%) scale(0.3)" },
      { opacity: 0.9, transform: "translate(-50%, -50%) scale(0.8)", offset: 0.3 },
      { opacity: 0, transform: "translate(-50%, -50%) scale(1.2)" },
    ],
    { delay: at.enter + 60, duration: 420, fill: "both", easing: "cubic-bezier(0.2, 0.7, 0.3, 1)" },
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
      cancelAnimationFrame(raf);
      // In case the move in the dark didn't happen; never back up past where someone has scrolled to since.
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
      launch(stage, hero, phone);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={stageRef} hidden aria-hidden="true" className="pointer-events-none fixed inset-0 z-30 overflow-hidden" style={{ perspective: "800px" }}>
      <div data-night className="absolute inset-0 bg-[color-mix(in_srgb,var(--color-ink-deep)_72%,black)] opacity-0" />
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

      {/* The little car and its headlights, over the phone: one small layer placed at the car's road point. */}
      <div data-car className="absolute top-0 left-0 z-[4] h-0 w-0 origin-top-left will-change-transform">
        <svg viewBox="-16 -21 102 29" className="absolute overflow-visible" aria-hidden="true">
          <defs>
            {/* Brightest at the lamp, fading ahead and towards the beam's edges. */}
            <radialGradient id="launch-beam" cx="15" cy="-6.4" r="70" gradientUnits="userSpaceOnUse" gradientTransform="translate(15 -6.4) scale(1 0.32) translate(-15 6.4)">
              <stop offset="0" style={{ stopColor: "var(--color-screen)", stopOpacity: 0.9 }} />
              <stop offset="0.45" style={{ stopColor: "var(--color-brand)", stopOpacity: 0.32 }} />
              <stop offset="1" style={{ stopColor: "var(--color-brand)", stopOpacity: 0 }} />
            </radialGradient>
            <radialGradient id="launch-lamp">
              <stop offset="0" style={{ stopColor: "var(--color-screen)", stopOpacity: 1 }} />
              <stop offset="1" style={{ stopColor: "var(--color-screen)", stopOpacity: 0 }} />
            </radialGradient>
          </defs>
          <polygon data-beam points="15,-7.4 15,-5.4 84,7 84,-19.8" fill="url(#launch-beam)" style={{ opacity: 0 }} />
          <g data-day>
            <Car tone={toneOn.brand} />
          </g>
          <g data-dusk style={{ opacity: 0 }}>
            <Car tone={toneOn.ink} />
          </g>
          <circle data-lamp cx="15.4" cy="-6.4" r="2.6" fill="url(#launch-lamp)" style={{ opacity: 0 }} />
        </svg>
      </div>
      <div
        data-glow
        className="absolute z-[5] rounded-full opacity-0 mix-blend-plus-lighter"
        style={{ background: "radial-gradient(closest-side, var(--color-screen), var(--color-brand) 45%, transparent)" }}
      />
    </div>
  );
}

"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { Car } from "@/components/brand/Car";
import { toneOn, type Tone } from "@/components/brand/tones";
import { Tick } from "@/components/ui/icons";
import { launchIsOff } from "@/lib/hero-launch";

// What happens on the first scroll down from the home hero, on every page load. The parked car drives into the phone, the
// phone comes to the front as night blooms out from it, road lines and the things a ride is made of burst out of it, then
// it drops away pulling the route line down the screen, and the next section rises to meet the car. About 2.6s. It's live
// rather than a video because it has to start at once, from wherever the phone is. It sits over the page and nothing is
// locked, and the page is moved to the next section while it's dark. Skipped with reduced motion, by a jump past the hero,
// and by the hero's button.

const soft = "cubic-bezier(0.22, 0.8, 0.26, 1)";
const rush = "cubic-bezier(0.45, 0, 0.8, 0.55)";

// When each part starts, in ms.
const at = { carIn: 0, phoneIn: 0, bloom: 160, burst: 420, fly: 480, phoneOut: 1300, route: 1320, reveal: 2060 };
const lasts = { carIn: 460, phoneIn: 520, bloom: 520, phoneOut: 440, route: 860, reveal: 560 };

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

function roadLines(stage: HTMLElement, x: number, y: number, reach: number, unit: number, made: Element[]) {
  const r = random(7);
  for (let i = 0; i < 150; i++) {
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
    line.animate([{ opacity: 0, transform: from }, { opacity: 1, offset: 0.2 }, { opacity: 1, transform: to }], {
      delay: at.burst + r() * (at.route - at.burst + 180),
      duration: 420 + r() * 300,
      fill: "both",
      easing: rush,
    });
  }
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

function launch(stage: HTMLElement, hero: HTMLElement, phone: HTMLElement) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const midX = vw / 2;
  // The middle of what the navbar leaves showing.
  const midY = vh / 2 + 30;
  const reach = Math.hypot(vw, vh) / 2 + 80;
  const unit = Math.min(vw, vh) / 800 + 0.35;
  const made: Element[] = [];
  const next = hero.nextElementSibling;
  const toNextSection = () => next?.scrollIntoView({ block: "start", behavior: "instant" });

  stage.hidden = false;

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

  // The hero's car pulls off and drives into the phone.
  const parked = [...hero.querySelectorAll<SVGGElement>("[data-route-car]")].find((c) => c.getBoundingClientRect().width > 0);
  const driver = stage.querySelector<HTMLElement>("[data-driver]");
  if (parked && driver) {
    const c = parked.getBoundingClientRect();
    parked.style.visibility = "hidden";
    driver.style.width = `${c.width}px`;
    driver.style.height = `${c.width * 0.6}px`;
    const pose = (x: number, y: number, s: number) => `translate(${x - c.width / 2}px, ${y - (c.width * 0.6) / 2}px) scale(${s})`;
    driver.animate(
      [
        { opacity: 1, transform: pose(c.left + c.width / 2, c.top + c.height / 2, 1) },
        { opacity: 1, transform: pose((c.left + midX) / 2, midY + vh * 0.12, 1.5), offset: 0.55, easing: "ease-in" },
        { opacity: 0, transform: pose(midX, midY, 0.3) },
      ],
      { delay: at.carIn, duration: lasts.carIn, fill: "both", easing: "ease-in" },
    );
  }

  // Night blooms out from behind the phone as it arrives, and once it's dark the page moves on underneath.
  const night = stage.querySelector<HTMLElement>("[data-night]");
  const bloom = night?.animate([{ clipPath: `circle(0px at ${midX}px ${midY}px)` }, { clipPath: `circle(${reach * 1.2}px at ${midX}px ${midY}px)` }], {
    delay: at.bloom,
    duration: lasts.bloom,
    fill: "both",
    easing: "cubic-bezier(0.5, 0, 0.3, 1)",
  });
  bloom?.finished.then(toNextSection).catch(() => {});

  roadLines(stage, midX, midY, reach, unit, made);
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
      toNextSection();
      phone.style.visibility = "";
      if (parked) parked.style.visibility = "";
      stage.hidden = true;
      made.forEach((el) => el.remove());
      stage.getAnimations({ subtree: true }).forEach((a) => a.cancel());
      out.cancel();
    })
    .catch(() => {});
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
    </div>
  );
}

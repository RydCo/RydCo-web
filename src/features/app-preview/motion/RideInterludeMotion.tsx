"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { Car } from "@/components/brand/Car";
import { toneOn, type Tone } from "@/components/brand/tones";
import { Wordmark } from "@/components/brand/Wordmark";
import { Tick } from "@/components/ui/icons";
import { runClock } from "./clock";

// The moment between the home hero and the page, rendered to public/motion/ride-interlude by `npm run motion`. This never
// ships: the site only plays the video (views/home/components/RideInterlude). A night drive: road lines rush past with
// cars, riders and fuel shares among them, then the route line draws in under the logo. It's filmed square with the logo
// in the middle, so it can be cropped to any screen. The logo is narrow enough to survive a phone's crop.

const duration = 4300;
const lockupAt = 2500;

const route = "M1580 70 C1200 30 560 36 240 110 C40 150 -30 408 170 408 L780 408";

const bright: Tone = { ...toneOn.ink, body: "fill-accent", glass: "fill-surface" };
const pale: Tone = { ...toneOn.ink, body: "fill-brand", glass: "fill-ink" };

// Small, repeatable random numbers, so the same scene renders the same video.
function random(seed: number) {
  let s = seed;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function roadLines(stage: HTMLElement) {
  const r = random(7);
  for (let i = 0; i < 170; i++) {
    const angle = r() * 360;
    const line = document.createElement("span");
    const colour = r();
    line.className = `absolute top-1/2 left-1/2 h-[4px] w-[90px] origin-left rounded-full ${colour < 0.68 ? "bg-surface" : colour < 0.88 ? "bg-accent" : "bg-brand"}`;
    stage.prepend(line);
    const thick = 1 + r() * 0.9;
    const from = `rotate(${angle}deg) translateX(${44 + r() * 70}px) scale(0.2, ${thick * 0.35})`;
    const to = `rotate(${angle}deg) translateX(${620 + r() * 60}px) scale(${0.9 + r() * 0.9}, ${thick})`;
    line.animate([{ opacity: 0, transform: from }, { opacity: 1, offset: 0.22 }, { opacity: 1, transform: to }], {
      delay: r() * (lockupAt - 300),
      duration: 560 + r() * 380,
      fill: "both",
      easing: "cubic-bezier(0.4, 0, 0.8, 0.6)",
    });
  }
}

function flyPast(stage: HTMLElement) {
  stage.querySelectorAll<HTMLElement>("[data-fly]").forEach((el) => {
    const { x, y, spin, at } = el.dataset;
    const pose = (z: number, turn: number) => `translate3d(${x}px, ${y}px, ${z}px) rotate(${turn}deg)`;
    el.animate(
      [
        { opacity: 0, transform: pose(-1800, -Number(spin)) },
        { opacity: 1, offset: 0.2 },
        // Gone before its last rush towards the camera, where the blend would show it stepping.
        { opacity: 1, offset: 0.74 },
        { opacity: 0, offset: 0.86 },
        { opacity: 0, transform: pose(640, Number(spin)) },
      ],
      { delay: Number(at), duration: 1250, fill: "both", easing: "cubic-bezier(0.45, 0, 0.8, 0.55)" },
    );
  });
}

function logo(stage: HTMLElement) {
  const soft = "cubic-bezier(0.22, 0.8, 0.26, 1)";
  const draw = { delay: lockupAt, duration: 1150, fill: "both", easing: "cubic-bezier(0.45, 0, 0.2, 1)" } as const;
  stage.querySelector("[data-route]")?.animate([{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], draw);
  const car = stage.querySelector("[data-end-car]");
  car?.animate([{ offsetDistance: "0%" }, { offsetDistance: "100%" }], draw);
  car?.animate([{ opacity: 0 }, { opacity: 0, offset: 0.8 }, { opacity: 1, offset: 0.83 }, { opacity: 1 }], draw);
  stage.querySelector("[data-word]")?.animate([{ opacity: 0, transform: "scale(0.82)" }, { opacity: 1, transform: "none" }], { delay: lockupAt + 80, duration: 620, fill: "both", easing: soft });
  stage.querySelector("[data-line]")?.animate([{ opacity: 0, transform: "translateY(8px)" }, { opacity: 1, transform: "none" }], { delay: lockupAt + 950, duration: 420, fill: "both", easing: soft });
}

function Flying({ x, y, spin, at, size = 100, shade, children }: { x: number; y: number; spin: number; at: number; size?: number; shade: string; children: ReactNode }) {
  return (
    <div
      data-fly
      data-x={x}
      data-y={y}
      data-spin={spin}
      data-at={at}
      className="absolute opacity-0"
      style={{ left: `calc(50% - ${size / 2}px)`, top: `calc(50% - ${size / 2}px)`, width: size, height: size, filter: `drop-shadow(0 7px 0 var(--color-${shade}))` }}
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

export function RideInterludeMotion() {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    let stop = () => {};
    let gone = false;
    document.fonts.ready.then(() => {
      if (gone) return;
      roadLines(stage);
      flyPast(stage);
      logo(stage);
      stop = runClock(duration);
    });
    return () => {
      gone = true;
      stop();
    };
  }, []);

  return (
    <div
      ref={stageRef}
      className="fixed top-0 left-0 z-[100] h-[800px] w-[800px] overflow-hidden bg-[color-mix(in_srgb,var(--color-ink-deep)_72%,black)]"
      style={{ perspective: "800px" }}
    >
      <div
        className="absolute inset-0"
        style={{ backgroundImage: "radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--color-accent) 16%, transparent), transparent 42%)" }}
      />
      <Flying x={-210} y={-120} spin={14} at={200} size={170} shade="accent-deep">
        <CarSticker tone={bright} />
      </Flying>
      <Flying x={190} y={150} spin={-18} at={450} size={130} shade="accent-deep">
        <svg viewBox="0 0 40 52" className="h-full w-full" aria-hidden="true">
          <path d="M20 51S3 34 3 20a17 17 0 0 1 34 0c0 14-17 31-17 31Z" className="fill-accent" />
          <circle cx="20" cy="20" r="7" className="fill-surface" />
        </svg>
      </Flying>
      <Flying x={-170} y={190} spin={20} at={720} size={120} shade="ink">
        <span className="grid h-full w-full place-items-center rounded-full bg-brand font-display text-[40px] font-extrabold text-ink">Rs</span>
      </Flying>
      <Flying x={220} y={-170} spin={-12} at={920} size={120} shade="ink">
        <span className="grid h-full w-full place-items-center rounded-full bg-surface font-display text-[40px] font-extrabold text-ink">AM</span>
      </Flying>
      <Flying x={-230} y={40} spin={-16} at={1120} size={120} shade="ink-deep">
        <span className="grid h-full w-full place-items-center rounded-[38px] bg-trust text-[62px] text-on-trust">
          <Tick />
        </span>
      </Flying>
      <Flying x={140} y={-210} spin={16} at={1300} size={170} shade="ink">
        <CarSticker tone={pale} />
      </Flying>
      <Flying x={230} y={70} spin={-20} at={1450} size={120} shade="accent-deep">
        <span className="grid h-full w-full place-items-center rounded-full bg-accent font-display text-[40px] font-extrabold text-on-accent">HR</span>
      </Flying>

      {/* The route's tail runs off to the right, so the part that shows, loop to car, is what's centred. */}
      <div className="absolute top-1/2 left-1/2 w-[490px] -translate-x-1/3 -translate-y-[62%]">
        <svg viewBox="0 0 1200 440" className="block h-auto w-full overflow-visible" aria-hidden="true">
          <path data-route d={route} pathLength={1} strokeDasharray="1 1" className={`fill-none ${toneOn.ink.line}`} strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
          <g data-word style={{ transformOrigin: "475px 250px" }}>
            <Wordmark tone={toneOn.ink} x={170} y={320} size={200} length={590} />
          </g>
          <g data-end-car style={{ offsetPath: `path("${route}")`, offsetRotate: "auto" }}>
            <g transform="scale(3.4)">
              <Car tone={toneOn.ink} />
            </g>
          </g>
        </svg>
      </div>
      <p data-line className="absolute inset-x-0 top-[calc(50%+78px)] text-center font-display text-[17px] font-bold text-brand">
        Your commute, in good company.
      </p>
    </div>
  );
}

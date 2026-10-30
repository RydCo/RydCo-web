"use client";

import { useEffect, useRef } from "react";
import { StatusBar } from "@/features/app-preview/PhoneFrame";
import { MapBackdrop } from "@/features/app-preview/screens/journey/SkySheet";
import { twoRides } from "@/features/app-preview/screens/journey/journey";
import { runClock } from "./clock";

// The motion graphic in the home hero's phone, rendered to public/motion/two-rides by `npm run motion`. This never ships:
// the site only plays the video. The map holds still while each screen pushes in, its content rises, a finger taps
// what's next, and the car drives the route. The first screen stays at rest, so the end of the loop meets the start.

const hold = 2000;
const push = 200;
const duration = twoRides.length * hold;

const soft = "cubic-bezier(0.22, 0.8, 0.26, 1)";

const at = (el: Element, keyframes: Keyframe[], delay: number, length: number, options: KeyframeAnimationOptions = {}) =>
  el.animate(keyframes, { delay, duration: length, fill: "both", easing: soft, ...options });

// One animation for the whole loop: off to the right, in, at rest, off to the left.
function pushAcross(scene: Element, i: number) {
  const offset = (ms: number) => ms / duration;
  const pose = (x: string, ms: number) => ({ transform: `translateX(${x})`, offset: offset(ms), easing: soft });
  const end = (i + 1) * hold;
  const frames =
    i === 0
      ? [pose("0%", 0), pose("0%", end - push), pose("-100%", end), pose("-100%", duration - push), pose("100%", duration - push + 0.01), pose("0%", duration)]
      : [pose("100%", 0), pose("100%", i * hold - push), pose("0%", i * hold), pose("0%", end - push), pose("-100%", end), pose("-100%", duration)];
  scene.animate(frames, { duration, fill: "both" });
}

function riseIn(scene: Element, start: number) {
  scene.querySelectorAll("[data-sheet-body] > *, [data-sheet-foot] > *").forEach((el, k) => {
    at(el, [{ opacity: 0, transform: "translateY(10px)" }, { opacity: 1, transform: "none" }], start + 60 + k * 35, 280);
  });
}

function moments(scene: Element, start: number) {
  scene.querySelectorAll("[data-route]").forEach((el) => at(el, [{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], start + 120, 750));
  scene.querySelectorAll("[data-fade]").forEach((el) => at(el, [{ opacity: 0 }, { opacity: 1 }], start + 700, 200, { easing: "linear" }));
  scene.querySelectorAll("[data-note]").forEach((el) => at(el, [{ opacity: 0, transform: "translateY(-14px)" }, { opacity: 1, transform: "none" }], start + 800, 320));
  scene.querySelectorAll<HTMLElement>("[data-car]").forEach((el) => {
    at(el, [{ offsetDistance: `${el.dataset.from}%` }, { offsetDistance: `${el.dataset.to}%` }], start, hold + push, { easing: "linear" });
  });
}

// The finger: a dot presses down on the target, a ring spreads from it, and the target gives a little.
function tap(root: Element, target: HTMLElement, centre: { x: number; y: number }, start: number) {
  const mark = (className: string) => {
    const el = document.createElement("span");
    el.className = `pointer-events-none absolute z-20 rounded-full opacity-0 ${className}`;
    el.style.left = `${centre.x}px`;
    el.style.top = `${centre.y}px`;
    root.append(el);
    return el;
  };
  const place = "translate(-50%, -50%)";
  mark("h-9 w-9 bg-ink/30").animate(
    [
      { opacity: 0, transform: `${place} scale(1.3)` },
      { opacity: 1, transform: `${place} scale(1)`, offset: 0.3 },
      { opacity: 1, transform: `${place} scale(0.82)`, offset: 0.5 },
      { opacity: 0, transform: `${place} scale(1)` },
    ],
    { delay: start, duration: 440, easing: "ease-out" },
  );
  mark("h-9 w-9 border-2 border-ink/40").animate(
    [
      { opacity: 0, transform: `${place} scale(0.8)` },
      { opacity: 1, transform: `${place} scale(0.9)`, offset: 0.1 },
      { opacity: 0, transform: `${place} scale(2.2)` },
    ],
    { delay: start + 190, duration: 340, easing: "ease-out" },
  );
  target.animate([{ transform: "scale(1)" }, { transform: "scale(0.96)" }, { transform: "scale(1)" }], { delay: start + 130, duration: 260 });
}

function swap(scene: Element, start: number) {
  scene.querySelectorAll("[data-before]").forEach((el) => at(el, [{ opacity: 1 }, { opacity: 0 }], start, 160, { easing: "linear" }));
  scene.querySelectorAll("[data-after]").forEach((el) => at(el, [{ opacity: 0 }, { opacity: 1 }], start + 80, 180, { easing: "linear" }));
}

export function TwoRidesMotion() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let stop = () => {};
    let gone = false;
    // Where things sit has to be measured with the real fonts in, and before anything starts moving.
    document.fonts.ready.then(() => {
      if (gone) return;
      const box = root.getBoundingClientRect();
      const scenes = [...root.querySelectorAll("[data-scene]")];
      const targets = scenes.map((scene) => {
        const target = scene.querySelector<HTMLElement>("[data-tap]");
        if (!target) return null;
        const r = target.getBoundingClientRect();
        return { target, centre: { x: r.left + r.width / 2 - box.left, y: r.top + r.height / 2 - box.top } };
      });
      scenes.forEach((scene, i) => {
        const start = i * hold - push;
        pushAcross(scene, i);
        if (i > 0) {
          riseIn(scene, start);
          moments(scene, start);
        }
        const found = targets[i];
        if (found) {
          const early = found.target.dataset.tap === "early";
          const pressAt = early ? i * hold + 620 : (i + 1) * hold - push - 440;
          tap(root, found.target, found.centre, pressAt);
          if (early) swap(scene, pressAt + 260);
        }
      });
      stop = runClock(duration);
    });
    return () => {
      gone = true;
      stop();
    };
  }, []);

  return (
    <div ref={rootRef} data-ui className="fixed top-0 left-0 z-[100] flex h-[592px] w-[280px] flex-col overflow-hidden bg-surface text-[13px] leading-snug text-ink">
      <StatusBar />
      <div className="relative min-h-0 flex-1">
        <MapBackdrop />
        {twoRides.map((s) => (
          <div key={s.title} data-scene className="absolute inset-0 flex flex-col">
            {s.screen}
          </div>
        ))}
      </div>
    </div>
  );
}

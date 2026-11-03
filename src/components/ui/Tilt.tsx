"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Tilts what's inside towards the mouse in 3D, on a spring, and lifts it off the page while the mouse is over it. Only
// with a mouse or trackpad, and not with reduced motion; otherwise it's a plain box. The tilt and lift go to --rx, --ry
// and --lift (styles/motion/tilt.css), so a page can raise parts inside further than the box as it turns, or move a shadow.

const most = 8; // degrees of tilt at the edge
const stiffness = 170;
const damping = 18; // a little under critical, so it settles with one small overshoot

export function Tilt({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !matchMedia("(hover: hover) and (pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Measured on the box around it, which doesn't tilt, so the tilt can't feed back into where the mouse seems to be.
    const frame = el.parentElement ?? el;
    const keys = ["rx", "ry", "lift"] as const;
    const goal = { rx: 0, ry: 0, lift: 0 };
    const now = { rx: 0, ry: 0, lift: 0 };
    const speed = { rx: 0, ry: 0, lift: 0 };
    let raf = 0;
    let last = 0;

    const tick = (time: number) => {
      const dt = last ? Math.min(0.05, (time - last) / 1000) : 1 / 60;
      last = time;
      let moving = false;
      for (const k of keys) {
        speed[k] += ((goal[k] - now[k]) * stiffness - speed[k] * damping) * dt;
        now[k] += speed[k] * dt;
        if (Math.abs(goal[k] - now[k]) > 0.002 || Math.abs(speed[k]) > 0.002) moving = true;
        else now[k] = goal[k];
        el.style.setProperty(`--${k}`, now[k].toFixed(3));
      }
      raf = moving ? requestAnimationFrame(tick) : 0;
      if (!moving) last = 0;
    };
    const start = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const box = frame.getBoundingClientRect();
      const x = Math.max(-1, Math.min(1, ((e.clientX - box.left) / box.width) * 2 - 1));
      const y = Math.max(-1, Math.min(1, ((e.clientY - box.top) / box.height) * 2 - 1));
      // The side under the mouse dips away, as if pressed.
      goal.rx = -y * most;
      goal.ry = x * most;
      goal.lift = 1;
      start();
    };
    const leave = () => {
      goal.rx = 0;
      goal.ry = 0;
      goal.lift = 0;
      start();
    };

    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div ref={ref} className={`tilt ${className}`}>
      {children}
    </div>
  );
}

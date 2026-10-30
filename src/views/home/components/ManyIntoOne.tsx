import type { CSSProperties } from "react";

// How it works, drawn with the route motif: many solo commutes on the left pull into one shared line,
// which carries its riders in one car on the right.
//
// When half of it is on screen it plays once (about two seconds, CSS in styles/motion/many-into-one.css):
// the homes appear, each route draws to the meeting point, the shared line draws out, and the car drives off
// with its riders trailing behind. It ends on the still picture, which is all that shows with reduced motion.

function seeded(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Geo = { w: number; h: number; dots: number; spread: [number, number]; merge: number; end: number; riders: number[]; car: number; scale: number; line: number; thin: number; r: number };

const geo: Record<"wide" | "narrow", Geo> = {
  wide: { w: 1200, h: 260, dots: 18, spread: [30, 330], merge: 600, end: 1170, riders: [740, 800, 860], car: 1010, scale: 3.2, line: 14, thin: 3, r: 7 },
  narrow: { w: 600, h: 320, dots: 12, spread: [20, 170], merge: 300, end: 585, riders: [372, 412, 452], car: 524, scale: 2.4, line: 11, thin: 3, r: 7 },
};

// Per-element timing for the CSS: a start delay, and for the car and riders how far back along the line they start.
const at = (delay: number, from?: number) => ({ "--d": `${delay}ms`, ...(from ? { "--from": `${-from}px` } : {}) }) as CSSProperties;

function Diagram({ g, className }: { g: Geo; className: string }) {
  const rand = seeded(7);
  const mid = g.h / 2;
  const dots = Array.from({ length: g.dots }, () => ({
    x: g.spread[0] + rand() * (g.spread[1] - g.spread[0]),
    y: 24 + rand() * (g.h - 48),
  }));
  // The rider nearest the car leaves first, the others follow.
  const riders = [...g.riders].sort((a, b) => b - a);
  return (
    <svg viewBox={`0 0 ${g.w} ${g.h}`} className={`block h-auto w-full ${className}`} aria-hidden="true">
      {dots.map((d, i) => (
        <path
          key={i}
          d={`M${d.x.toFixed(1)} ${d.y.toFixed(1)} C${(d.x + g.w * 0.12).toFixed(1)} ${d.y.toFixed(1)} ${(g.merge - g.w * 0.1).toFixed(1)} ${(mid + (d.y - mid) * 0.2).toFixed(1)} ${g.merge} ${mid}`}
          pathLength={1}
          className="mio-route fill-none stroke-ink-soft"
          style={at(120 + i * 30)}
          strokeWidth={g.thin}
          strokeLinecap="round"
        />
      ))}
      {dots.map((d, i) => (
        <circle key={i} cx={d.x.toFixed(1)} cy={d.y.toFixed(1)} r={g.r} className="mio-home fill-ink-soft" style={at(i * 22)} />
      ))}
      <path d={`M${g.merge} ${mid} L${g.end} ${mid}`} pathLength={1} className="mio-shared stroke-ink" strokeWidth={g.line} strokeLinecap="round" />
      {riders.map((x, i) => (
        <circle key={x} cx={x} cy={mid} r={g.line * 0.95} className="mio-move fill-accent stroke-surface" style={at(1100 + i * 80, x - g.merge)} strokeWidth="4" />
      ))}
      <g className="mio-move" style={at(1000, g.car - g.merge)}>
        <g transform={`translate(${g.car} ${mid - g.line / 2}) scale(${g.scale})`}>
          <rect className="fill-ink" x="-15" y="-10" width="30" height="8" rx="3" />
          <path className="fill-ink" d="M-9 -10 L-5 -16 H6 L10 -10Z" />
          <rect className="fill-surface" x="-4" y="-14.5" width="8" height="3.5" rx="1" />
          <circle className="fill-ink" cx="-8.5" cy="-1.5" r="3.2" />
          <circle className="fill-ink" cx="8.5" cy="-1.5" r="3.2" />
        </g>
      </g>
    </svg>
  );
}

export function ManyIntoOne() {
  return (
    <div data-play="">
      <Diagram g={geo.wide} className="hidden md:block" />
      <Diagram g={geo.narrow} className="md:hidden" />
    </div>
  );
}

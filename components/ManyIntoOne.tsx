// How it works, drawn with the route motif: many solo commutes on the left pull into one shared line,
// which carries its riders in one car on the right.

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

function Diagram({ g, className }: { g: Geo; className: string }) {
  const rand = seeded(7);
  const mid = g.h / 2;
  const dots = Array.from({ length: g.dots }, () => ({
    x: g.spread[0] + rand() * (g.spread[1] - g.spread[0]),
    y: 24 + rand() * (g.h - 48),
  }));
  return (
    <svg viewBox={`0 0 ${g.w} ${g.h}`} className={`block h-auto w-full ${className}`} aria-hidden="true">
      {dots.map((d, i) => (
        <path
          key={i}
          d={`M${d.x.toFixed(1)} ${d.y.toFixed(1)} C${(d.x + g.w * 0.12).toFixed(1)} ${d.y.toFixed(1)} ${(g.merge - g.w * 0.1).toFixed(1)} ${(mid + (d.y - mid) * 0.2).toFixed(1)} ${g.merge} ${mid}`}
          className="fill-none stroke-cocoa-soft"
          strokeWidth={g.thin}
          strokeLinecap="round"
        />
      ))}
      {dots.map((d, i) => (
        <circle key={i} cx={d.x.toFixed(1)} cy={d.y.toFixed(1)} r={g.r} className="fill-cocoa-soft" />
      ))}
      <path d={`M${g.merge} ${mid} L${g.end} ${mid}`} className="stroke-cocoa" strokeWidth={g.line} strokeLinecap="round" />
      {g.riders.map((x) => (
        <circle key={x} cx={x} cy={mid} r={g.line * 0.95} className="fill-apricot stroke-cream" strokeWidth="4" />
      ))}
      <g transform={`translate(${g.car} ${mid - g.line / 2}) scale(${g.scale})`}>
        <rect className="fill-cocoa" x="-15" y="-10" width="30" height="8" rx="3" />
        <path className="fill-cocoa" d="M-9 -10 L-5 -16 H6 L10 -10Z" />
        <rect className="fill-cream" x="-4" y="-14.5" width="8" height="3.5" rx="1" />
        <circle className="fill-cocoa" cx="-8.5" cy="-1.5" r="3.2" />
        <circle className="fill-cocoa" cx="8.5" cy="-1.5" r="3.2" />
      </g>
    </svg>
  );
}

export function ManyIntoOne() {
  return (
    <>
      <Diagram g={geo.wide} className="hidden md:block" />
      <Diagram g={geo.narrow} className="md:hidden" />
    </>
  );
}

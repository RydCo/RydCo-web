import { Car } from "./Car";
import { toneOn } from "./tones";

// The signature line at hero scale. It runs in from the right, passes behind the phone, loops round the label and
// underlines it, the way the logo's line underlines the wordmark. The start sits far past the edge for wide screens.
const hero = {
  desktop: {
    viewBox: "0 0 1200 150",
    d: "M2300 14 C1400 -10 700 6 190 34 C40 44 -12 118 60 118 L410 118",
    stroke: 7,
    label: { x: 56, y: 98, size: 22 },
    car: { x: 410, y: 118, scale: 1.5 },
  },
  mobile: {
    viewBox: "0 0 360 110",
    d: "M700 10 C420 -6 200 4 90 16 C14 24 -6 84 40 84 L312 84",
    stroke: 5,
    label: { x: 28, y: 68, size: 17 },
    car: { x: 312, y: 84, scale: 1.1 },
  },
};

function HeroSvg({ g, label, className }: { g: (typeof hero)["desktop"]; label: string; className: string }) {
  const tone = toneOn.brand;
  return (
    <svg viewBox={g.viewBox} className={`block h-auto w-full overflow-visible ${className}`} aria-hidden="true" data-route-hero="">
      <path
        data-route-path=""
        suppressHydrationWarning
        pathLength={1}
        d={g.d}
        className={tone.line}
        fill="none"
        strokeWidth={g.stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text x={g.label.x} y={g.label.y} fontSize={g.label.size} className={`${tone.ink} font-semibold`}>
        {label}
      </text>
      <Car tone={tone} transform={`translate(${g.car.x} ${g.car.y}) scale(${g.car.scale})`} scale={g.car.scale} live />
    </svg>
  );
}

export function HeroRoute({ label }: { label: string }) {
  return (
    <>
      <p className="sr-only">{label}</p>
      <HeroSvg g={hero.desktop} label={label} className="hidden md:block" />
      <HeroSvg g={hero.mobile} label={label} className="md:hidden" />
    </>
  );
}

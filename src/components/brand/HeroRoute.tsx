import { Car } from "./Car";
import { toneOn } from "./tones";
import { Wordmark } from "./Wordmark";

const hero = {
  desktop: {
    viewBox: "0 0 1200 440",
    d: "M1580 70 C1200 30 560 36 240 110 C40 150 -30 408 170 408 L780 408",
    stroke: 16,
    word: { x: 170, y: 320, size: 200, length: 590 },
    car: { x: 780, y: 408, scale: 3.4 },
  },
  mobile: {
    viewBox: "0 0 360 260",
    d: "M470 40 C330 14 150 18 80 52 C18 82 -4 216 36 216 L316 216",
    stroke: 8,
    word: { x: 36, y: 176, size: 92, length: 272 },
    car: { x: 316, y: 216, scale: 1.6 },
  },
};

function HeroSvg({ g, className }: { g: (typeof hero)["desktop"]; className: string }) {
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
      <Wordmark tone={tone} {...g.word} />
      <Car tone={tone} transform={`translate(${g.car.x} ${g.car.y}) scale(${g.car.scale})`} scale={g.car.scale} live />
    </svg>
  );
}

export function HeroRoute() {
  return (
    <>
      <HeroSvg g={hero.desktop} className="hidden md:block" />
      <HeroSvg g={hero.mobile} className="md:hidden" />
    </>
  );
}

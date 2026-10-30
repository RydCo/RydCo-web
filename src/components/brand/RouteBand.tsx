import type { CSSProperties } from "react";
import { Car } from "./Car";
import { toneOn } from "./tones";

// One full-width crossing of the line, used once per page between its two halves. As the band scrolls past, the car
// drives along the line from left to right (CSS in styles/motion/route-band.css, which gets the path through
// --band-path); without scroll-driven animations, or with reduced motion, it stays parked in the middle.
const bandPath = "M-40 104 C260 26 460 70 720 70 S1180 116 1480 36";

export function RouteBand({ on = "brand" }: { on?: keyof typeof toneOn }) {
  const tone = toneOn[on];
  return (
    <div className="band overflow-hidden" aria-hidden="true" style={{ "--band-path": `path("${bandPath}")` } as CSSProperties}>
      <svg viewBox="0 0 1440 140" preserveAspectRatio="xMidYMid slice" className="block h-[96px] w-full md:h-[140px]">
        <path d={bandPath} className={tone.line} fill="none" strokeWidth="10" strokeLinecap="round" />
        <g className="band-car">
          <Car tone={tone} transform="translate(720 70) scale(2.4)" scale={2.4} />
        </g>
      </svg>
    </div>
  );
}

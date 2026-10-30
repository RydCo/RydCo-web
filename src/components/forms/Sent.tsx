import type { ReactNode } from "react";
import { Car } from "@/components/brand/Car";
import { toneOn } from "@/components/brand/tones";

// The thank-you after a form is sent. A short route draws from the dot and the car parks at its end, then the
// message rises in (CSS in styles/motion/sent.css); with reduced motion it all simply appears.
export function Sent({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div role="status" className="rounded-surface bg-surface p-7 md:p-9">
      <svg viewBox="0 0 220 40" aria-hidden="true" className="block h-auto w-[176px]">
        <circle cx="8" cy="30" r="7" className="fill-ink" />
        <path d="M8 30 H184" pathLength={1} className="sent-line fill-none stroke-accent-strong" strokeWidth="6" strokeLinecap="round" />
        <g className="sent-car">
          <Car tone={toneOn.surface} transform="translate(192 30) scale(1.7)" />
        </g>
      </svg>
      <div className="sent-text mt-5">
        <p className="font-display text-[clamp(26px,2.6vw,36px)] leading-tight font-extrabold tracking-tight">{title}</p>
        <div className="mt-3 max-w-[48ch]">{children}</div>
      </div>
    </div>
  );
}

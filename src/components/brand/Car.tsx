import type { Tone } from "./tones";

export function Car({ tone, transform, scale, live }: { tone: Tone; transform?: string; scale?: number; live?: boolean }) {
  return (
    <g
      transform={transform}
      {...(live ? { "data-route-car": "", "data-scale": scale, suppressHydrationWarning: true } : {})}
    >
      <rect className={tone.body} x="-15" y="-10" width="30" height="8" rx="3" />
      <path className={tone.body} d="M-9 -10 L-5 -16 H6 L10 -10Z" />
      <rect className={tone.glass} x="-4" y="-14.5" width="8" height="3.5" rx="1" />
      <circle className={tone.body} cx="-8.5" cy="-1.5" r="3.2" />
      <circle className={tone.body} cx="8.5" cy="-1.5" r="3.2" />
    </g>
  );
}

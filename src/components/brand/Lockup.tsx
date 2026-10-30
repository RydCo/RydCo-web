import { Car } from "./Car";
import { toneOn } from "./tones";
import { Wordmark } from "./Wordmark";

// The static logo: wordmark, underline and car, with the line's tail curling in from the left.
export function Lockup({ on = "surface", className = "", title }: { on?: keyof typeof toneOn; className?: string; title?: string }) {
  const tone = toneOn[on];
  return (
    <svg
      viewBox="0 0 580 232"
      className={`block h-auto overflow-visible ${className}`}
      {...(title ? { role: "img", "aria-label": title } : { "aria-hidden": true })}
    >
      <path
        d="M8 118 C8 190 30 216 60 216 L520 216"
        className={tone.line}
        fill="none"
        strokeWidth="13"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Wordmark tone={tone} x={60} y={150} size={150} length={440} />
      <Car tone={tone} transform="translate(520 216) scale(2.6)" scale={2.6} />
    </svg>
  );
}

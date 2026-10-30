import type { Tone } from "./tones";

export function Wordmark({ tone, x, y, size, length }: { tone: Tone; x: number; y: number; size: number; length: number }) {
  return (
    <text x={x} y={y} textLength={length} lengthAdjust="spacing" className={`${tone.ink} font-display`} style={{ fontSize: size, fontWeight: 800 }}>
      RydCo
    </text>
  );
}

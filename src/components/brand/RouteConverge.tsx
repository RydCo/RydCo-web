import { Car } from "./Car";
import { toneOn } from "./tones";

// Several homes, one workplace: routes from different areas join one line before they reach the office.
export function RouteConverge({ from, to, className = "" }: { from: string[]; to: string; className?: string }) {
  // Labels sit to the left of each start, so no line ever crosses one.
  const merge = { x: 400, y: 220 };
  const end = { x: 560, y: 220 };
  const starts = from.map((name, i) => ({ name, x: 190, y: 40 + i * (360 / Math.max(1, from.length - 1)) }));
  return (
    <svg viewBox="0 0 620 440" className={`block h-auto w-full overflow-visible ${className}`} role="img" aria-label={`Routes from ${from.join(", ")} joining into one shared ride to ${to}`}>
      {starts.map((s) => (
        <path
          key={s.name}
          d={`M${s.x} ${s.y} C${s.x + 130} ${s.y} 300 ${merge.y} ${merge.x} ${merge.y} L${end.x} ${end.y}`}
          className="fill-none stroke-brand"
          strokeWidth="9"
          strokeLinecap="round"
        />
      ))}
      {starts.map((s) => (
        <g key={s.name}>
          <circle cx={s.x} cy={s.y} r="10" className="fill-ink stroke-brand" strokeWidth="5" />
          <text x={s.x - 24} y={s.y + 8} textAnchor="end" className="fill-surface font-sans text-[22px] font-semibold">
            {s.name}
          </text>
        </g>
      ))}
      <Car tone={toneOn.ink} transform={`translate(482 ${merge.y - 4}) scale(2.6)`} />
      <circle cx={end.x} cy={end.y} r="18" className="fill-surface" />
      <circle cx={end.x} cy={end.y} r="7" className="fill-ink" />
      <text x={end.x} y={end.y + 56} textAnchor="middle" className="fill-surface font-display text-[26px] font-bold">
        {to}
      </text>
    </svg>
  );
}

import type { ReactNode } from "react";

// The app's Sky Sheet layout (app-mocks/index (1).html), scaled to fit PhoneFrame: the Lahore map fills the phone and
// each screen is a rounded sheet risen over it, with its back button and step label floating above.

const streets = [
  "M-10 40 L290 18",
  "M-10 104 L290 80",
  "M-10 168 L290 142",
  "M-10 234 L290 206",
  "M-10 300 L290 270",
  "M-10 366 L290 334",
  "M-10 432 L290 398",
  "M-10 498 L290 462",
  "M-10 564 L290 526",
  "M-10 630 L290 590",
  "M30 -10 L54 640",
  "M96 -10 L120 640",
  "M164 -10 L188 640",
  "M232 -10 L256 640",
];
const mainRoads = ["M-10 192 C70 170 190 240 290 214", "M124 -10 C118 100 88 210 66 640"];

// It starts behind the status bar, which PhoneFrame draws above the screen.
export function MapBackdrop() {
  return (
    <svg viewBox="0 0 280 640" aria-hidden="true" className="absolute inset-x-0 -top-[41px] h-auto w-full">
      {streets.map((d) => (
        <path key={d} d={d} className="fill-none stroke-line" strokeWidth="1" />
      ))}
      <path d="M290 40 C210 110 170 170 130 220 S40 310 -10 330" className="fill-none stroke-brand" strokeWidth="9" />
      {mainRoads.map((d) => (
        <path key={d} d={d} className="fill-none stroke-line" strokeWidth="2.5" />
      ))}
    </svg>
  );
}

export function SkySheet({ step, progress, foot, children }: { step?: string; progress?: number; foot?: ReactNode; children: ReactNode }) {
  return (
    <>
      <MapBackdrop />
      <div className="relative flex h-10 flex-none items-center gap-2 px-3 pb-1.5">
        <span aria-hidden="true" className="grid h-8 w-8 flex-none place-items-center rounded-full bg-screen">
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12.5 4.5 7 10l5.5 5.5" />
          </svg>
        </span>
        {step && <span className="rounded-full bg-screen px-2.5 py-1.5 text-[11px] leading-none font-semibold">{step}</span>}
        {progress !== undefined && (
          <span aria-hidden="true" className="absolute right-4 bottom-0.5 left-[52px] h-[3px] overflow-hidden rounded-full bg-line">
            <span className="block h-full rounded-full bg-accent-strong" style={{ width: `${progress}%` }} />
          </span>
        )}
      </div>
      <div className="relative flex min-h-0 flex-1 flex-col rounded-t-[26px] bg-surface/85 shadow-[0_-14px_28px_-22px_var(--color-ink-deep)]">
        <span aria-hidden="true" className="mx-auto mt-2 mb-1.5 h-1 w-9 flex-none rounded-full bg-line" />
        <div className="flex min-h-0 flex-1 flex-col gap-2.5 overflow-hidden px-3.5 pb-2">{children}</div>
        {foot && <div className="flex flex-none flex-col gap-1.5 px-3.5 pb-4">{foot}</div>}
      </div>
    </>
  );
}

export function Heading({ children, lead }: { children: ReactNode; lead?: ReactNode }) {
  return (
    <div>
      <p className="font-display text-[20px] leading-[1.1] font-extrabold tracking-tight text-balance">{children}</p>
      {lead && <p className="mt-1 text-[12px] leading-snug text-ink-soft">{lead}</p>}
    </div>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-[16px] bg-screen ${className}`}>{children}</div>;
}

export function Primary({ children }: { children: ReactNode }) {
  return <span className="grid h-10 flex-none place-items-center rounded-full action text-[13px] font-semibold">{children}</span>;
}

export function Secondary({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`grid h-9 flex-none place-items-center rounded-full bg-screen text-[12.5px] font-semibold ${className}`}>{children}</span>;
}

export function TextAction({ children }: { children: ReactNode }) {
  return <span className="py-0.5 text-center text-[12px] font-semibold text-accent-deep">{children}</span>;
}

export function Label({ children }: { children: ReactNode }) {
  return <p className="text-[11px] leading-tight font-semibold text-ink-soft">{children}</p>;
}

// A form field as it looks filled in.
export function Field({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="grid gap-1">
      <Label>{label}</Label>
      <span className={`flex h-8 items-center truncate rounded-[11px] bg-screen px-2.5 text-[12.5px] font-medium ${mono ? "tabular-nums" : ""}`}>{value}</span>
    </div>
  );
}

export function Segments({ options, chosen }: { options: string[]; chosen: string }) {
  return (
    <div className="grid auto-cols-fr grid-flow-col gap-0.5 rounded-full bg-panel p-0.5 text-center text-[11px] font-semibold">
      {options.map((o) => (
        <span key={o} className={`truncate rounded-full py-1.5 ${o === chosen ? "bg-screen" : "text-ink-soft"}`}>
          {o}
        </span>
      ))}
    </div>
  );
}

export function Days({ on = 5 }: { on?: number }) {
  return (
    <div className="grid grid-cols-7 gap-1">
      {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
        <span key={`${d}${i}`} className={`grid h-7 place-items-center rounded-full text-[11px] font-semibold ${i < on ? "bg-accent-strong text-on-accent" : "bg-panel text-ink-soft"}`}>
          {d}
        </span>
      ))}
    </div>
  );
}

// The start dot and pin at either end of a trip, one above the other.
export function Ends({ from, to, fromLabel, toLabel }: { from: string; to: string; fromLabel: string; toLabel: string }) {
  return (
    <Card className="relative grid gap-2 p-2.5">
      <span aria-hidden="true" className="absolute top-[26px] bottom-[26px] left-[15.5px] border-l-2 border-dotted border-line" />
      {[
        { label: fromLabel, value: from, mark: "rounded-full border-[3px] border-ink bg-screen" },
        { label: toLabel, value: to, mark: "rounded-[3px] bg-accent-strong" },
      ].map((e) => (
        <div key={e.label} className="flex items-center gap-2.5">
          <span aria-hidden="true" className={`h-3 w-3 flex-none ${e.mark}`} />
          <span className="min-w-0">
            <span className="block text-[10.5px] leading-tight font-semibold text-ink-soft">{e.label}</span>
            <span className="block truncate text-[13px] leading-tight font-bold">{e.value}</span>
          </span>
        </div>
      ))}
    </Card>
  );
}

export function Pin({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M0 0 C0 0 -13 -12 -13 -22 A13 13 0 0 1 13 -22 C13 -12 0 0 0 0Z" className="fill-accent-strong" />
      <circle cy="-22" r="5" className="fill-screen" />
    </g>
  );
}

export function MapLabel({ x, y, end = false, children }: { x: number; y: number; end?: boolean; children: string }) {
  return (
    <text x={x} y={y} textAnchor={end ? "end" : "start"} className="fill-ink stroke-screen text-[10px] font-semibold" strokeWidth="3" strokeLinejoin="round" style={{ paintOrder: "stroke" }}>
      {children}
    </text>
  );
}

// The commute on a small card of map. The route draws each time its screen comes up.
export function RouteCard({ height = 120, from = "DHA Phase 5", to = "Arfa Tower", car }: { height?: number; from?: string; to?: string; car?: ReactNode }) {
  const route = `M28 ${height - 22} C70 ${height - 22} 78 ${height / 2 + 6} 124 ${height / 2} S190 40 214 36`;
  return (
    <svg viewBox={`0 0 252 ${height}`} aria-hidden="true" className="block h-auto w-full flex-none overflow-hidden rounded-[16px] bg-screen">
      {[20, 72, 130, 190, 236].map((x) => (
        <path key={x} d={`M${x} -4 L${x + 10} ${height + 4}`} className="fill-none stroke-line" strokeWidth="1" />
      ))}
      {[24, 62, 100, 138].map((y) => (
        <path key={y} d={`M-4 ${y} L256 ${y - 10}`} className="fill-none stroke-line" strokeWidth="1" />
      ))}
      <path d={route} className="fill-none stroke-panel" strokeWidth="9" strokeLinecap="round" />
      <path d={route} pathLength={1} className="journey-draw fill-none stroke-accent-strong" strokeWidth="4" strokeLinecap="round" />
      <circle cx="28" cy={height - 22} r="5.5" className="fill-screen stroke-ink" strokeWidth="2.5" />
      <Pin x={214} y={38} />
      <MapLabel x={38} y={height - 8}>
        {from}
      </MapLabel>
      <MapLabel x={196} y={22} end>
        {to}
      </MapLabel>
      {car}
    </svg>
  );
}

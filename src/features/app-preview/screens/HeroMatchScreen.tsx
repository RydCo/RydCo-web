import { Car } from "@/components/brand/Car";
import { toneOn } from "@/components/brand/tones";
import { Badge } from "@/components/ui/Badge";
import { TripCard } from "@/features/trips/TripCard";
import { PrimaryButton } from "./parts";

// All of this has to sit in the map's visible part: between the notification and the top of the sheet.
const route = "M228 226 C228 204 200 206 176 198 C150 190 146 174 122 168 C96 162 72 170 62 142";

const streets = [
  "M-10 44 L290 20",
  "M-10 104 L290 78",
  "M-10 166 L290 138",
  "M-10 232 L290 200",
  "M-10 296 L290 262",
  "M30 -10 L50 340",
  "M96 -10 L116 340",
  "M164 -10 L184 340",
  "M232 -10 L252 340",
];
const mainRoads = ["M-10 192 C70 170 190 240 290 214", "M124 -10 C118 100 88 210 66 340"];

// The app's Sky Sheet layout (app-mocks/index (1).html): the Lahore map stays still and the screen is a sheet risen
// over it. Here, a ride that has just been accepted.
export function HeroMatchScreen() {
  return (
    <>
      <svg viewBox="0 0 280 340" aria-hidden="true" className="absolute inset-x-0 top-0 h-auto w-full">
        {streets.map((d) => (
          <path key={d} d={d} className="fill-none stroke-line" strokeWidth="1" />
        ))}
        <path d="M290 40 C210 110 170 170 130 220 S40 310 -10 330" className="fill-none stroke-brand" strokeWidth="9" />
        {mainRoads.map((d) => (
          <path key={d} d={d} className="fill-none stroke-line" strokeWidth="2.5" />
        ))}
        <path d={route} className="fill-none stroke-screen" strokeWidth="9" strokeLinecap="round" />
        <path d={route} pathLength={1} className="hero-map-route fill-none stroke-accent-strong" strokeWidth="4.5" strokeLinecap="round" />
        <circle cx="228" cy="226" r="6" className="fill-screen stroke-ink" strokeWidth="3" />
        <g className="hero-map-end">
          <path d="M62 142 C62 142 46 128 46 116 A16 16 0 0 1 78 116 C78 128 62 142 62 142Z" className="fill-accent-strong" />
          <circle cx="62" cy="116" r="6" className="fill-screen" />
        </g>
        <g className="hero-map-end">
          <Car tone={toneOn.brand} transform="translate(148 184) scale(0.9)" />
        </g>
        <text x="84" y="124" className="fill-ink stroke-surface text-[10px] font-semibold" strokeWidth="3" strokeLinejoin="round" style={{ paintOrder: "stroke" }}>
          Arfa Tower
        </text>
        <text x="216" y="230" textAnchor="end" className="fill-ink stroke-surface text-[10px] font-semibold" strokeWidth="3" strokeLinejoin="round" style={{ paintOrder: "stroke" }}>
          DHA Phase 5
        </text>
      </svg>

      <span aria-hidden="true" className="absolute top-[11px] left-1/2 z-10 h-[22px] w-[72px] -translate-x-1/2 rounded-full bg-ink-deep" />

      <div className="hero-note absolute inset-x-2.5 top-[44px] z-10 flex items-center gap-2.5 rounded-[18px] bg-screen p-2.5 shadow-[0_10px_24px_-14px_var(--color-ink-deep)]">
        <span aria-hidden="true" className="grid h-8 w-8 flex-none place-items-center rounded-[10px] action font-display text-[15px] font-extrabold">
          R
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex justify-between text-[11px] text-ink-soft">
            <b className="font-semibold text-ink">RydCo</b>
            now
          </span>
          <span className="block truncate text-[12.5px] font-semibold">Hamza accepted your request</span>
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2.5 rounded-t-[26px] bg-surface px-3 pt-2 pb-4 shadow-[0_-16px_30px_-22px_var(--color-ink-deep)]">
        <span aria-hidden="true" className="mx-auto h-1 w-9 rounded-full bg-line" />
        <div className="flex items-center justify-between gap-2 px-1">
          <span className="font-display text-[17px] leading-tight font-bold">Tomorrow&rsquo;s ride</span>
          <span className="rounded-full bg-panel px-2.5 py-1 text-[11px] font-semibold">Example</span>
        </div>
        <div className="px-1">
          <Badge>Confirmed</Badge>
        </div>
        <TripCard
          compact
          trip={{
            driver: "Hamza",
            car: "Toyota Corolla",
            from: "Khayaban-e-Jinnah stop",
            fromTime: "7:38",
            to: "Arfa Tower gate",
            toTime: "8:06",
            seatsLeft: 2,
            share: "Rs 245",
            shareNote: "Rs 180 if a 2nd rider joins",
            badges: [],
          }}
        />
        <PrimaryButton>View trip</PrimaryButton>
      </div>
    </>
  );
}

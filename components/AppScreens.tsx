import type { ReactNode } from "react";
import { Badge, Tick } from "./Badge";
import { TripCard } from "./TripCard";

// The app's real screens (from app-mocks/v8.html), rebuilt small enough to sit inside PhoneFrame.
// Names, places and amounts are the app's own examples.

function Header({ title, back = true }: { title: string; back?: boolean }) {
  return (
    <div className="flex flex-none items-center gap-2 px-4 pt-1 pb-3">
      {back && (
        <span aria-hidden="true" className="grid h-8 w-8 place-items-center rounded-full bg-white">
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12.5 4.5 7 10l5.5 5.5" />
          </svg>
        </span>
      )}
      <span className="font-display text-[16px] font-bold">{title}</span>
    </div>
  );
}

function Bot({ children, strong = false }: { children: ReactNode; strong?: boolean }) {
  return (
    <p className={`w-fit max-w-[92%] rounded-[18px] rounded-tl-[6px] bg-white px-3.5 py-2.5 ${strong ? "font-display text-[17px] leading-tight font-bold" : ""}`}>
      {children}
    </p>
  );
}

function Body({ children }: { children: ReactNode }) {
  return <div className="flex min-h-0 flex-1 flex-col gap-2.5 overflow-hidden px-4 pb-5">{children}</div>;
}

function PrimaryButton({ children }: { children: ReactNode }) {
  return <span className="mt-auto grid h-11 flex-none place-items-center rounded-full bg-apricot-deep font-semibold text-white">{children}</span>;
}

export function WelcomeScreen() {
  return (
    <>
      <div className="flex flex-none items-center justify-between px-4 pt-1 pb-3">
        <span className="font-display text-[18px] font-extrabold tracking-tight">RydCo</span>
        <span className="text-cocoa-soft">Lahore pilot</span>
      </div>
      <Body>
        <p className="self-center text-[11.5px] text-cocoa-soft">Today</p>
        <Bot>Assalam o alaikum. I&rsquo;m RydCo.</Bot>
        <Bot strong>How would you like to travel?</Bot>
        <div className="mt-1 grid gap-2">
          <RoleOption title="I want a ride" needs={["Phone number"]} />
          <RoleOption title="I'm offering a ride" needs={["CNIC", "Live selfie", "Licence", "Vehicle"]} note="Reviewed within 24 hours" />
        </div>
      </Body>
    </>
  );
}

function RoleOption({ title, needs, note }: { title: string; needs: string[]; note?: string }) {
  return (
    <div className="rounded-[20px] bg-apricot-tint p-3.5">
      <p className="font-display text-[15px] font-bold">{title}</p>
      <ul className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1">
        {needs.map((n) => (
          <li key={n} className="flex items-center gap-1 text-[12px]">
            <Tick className="text-apricot-deep" />
            {n}
          </li>
        ))}
      </ul>
      {note && <p className="mt-1.5 text-[12px] text-cocoa-soft">{note}</p>}
    </div>
  );
}

export function ResultsScreen() {
  return (
    <>
      <Header title="Find a ride" />
      <Body>
        <p className="w-fit rounded-full bg-apricot-tint px-3 py-1.5 text-[12px] font-semibold">Model Town → Arfa Tower · Mon 7:30</p>
        <Bot>
          <b>2 drivers match your route.</b>
        </Bot>
        <TripCard
          compact
          trip={{
            driver: "Hamza",
            car: "Honda City",
            from: "Akbar Chowk",
            fromTime: "7:40",
            to: "Arfa Tower gate",
            toTime: "8:20",
            seatsLeft: 2,
            share: "Rs 245",
            shareNote: "Rs 180 if a 2nd rider joins",
            badges: [],
          }}
        />
        <TripCard
          compact
          trip={{
            driver: "Bilal",
            car: "Toyota Corolla",
            from: "Model Town Link Rd",
            fromTime: "7:50",
            to: "Arfa Tower gate",
            toTime: "8:25",
            seatsLeft: 1,
            share: "Rs 230",
            badges: [],
          }}
        />
      </Body>
    </>
  );
}

export function SharesScreen() {
  return (
    <>
      <Header title="Offer a ride" />
      <Body>
        <Bot strong>Riders&rsquo; shares</Bot>
        <div className="rounded-[20px] bg-white p-4">
          <p className="text-cocoa-soft">Worked out for you, 10 km.</p>
          <p className="mt-2 font-display text-[30px] leading-none font-extrabold tracking-tight">Rs 245</p>
          <p className="mt-1">with one rider</p>
          <p className="mt-3 font-display text-[22px] leading-none font-extrabold tracking-tight">Rs 180 each</p>
          <p className="mt-1">with two riders</p>
          <p className="mt-3 text-[11.5px] text-cocoa-soft">Fuel price locked when you publish.</p>
        </div>
        <Bot strong>How should riders pay you?</Bot>
        <div className="flex flex-wrap gap-1.5">
          {["Cash", "JazzCash", "NayaPay", "Bank / Raast"].map((m, i) => (
            <span key={m} className={`rounded-full px-3 py-1.5 text-[12px] font-semibold ${i < 2 ? "bg-cocoa text-cream" : "bg-white"}`}>
              {m}
            </span>
          ))}
        </div>
        <p className="text-[12px] text-cocoa-soft">Riders pay you directly.</p>
        <PrimaryButton>Publish ride</PrimaryButton>
      </Body>
    </>
  );
}

export function StopsScreen() {
  const stops = [
    { place: "Model Town", time: "7:40", who: "Hamza starts" },
    { place: "Garden Town", time: "7:52", who: "Bilal gets in" },
    { place: "Faisal Town", time: "8:01", who: "Ayesha gets in" },
    { place: "Arfa Software Technology Park", time: "8:20", who: "Everyone arrives" },
  ];
  return (
    <>
      <Header title="Trip detail" />
      <Body>
        <div className="flex items-center gap-2">
          <Badge>Confirmed</Badge>
          <span className="font-semibold">Mon 2 Nov</span>
        </div>
        <ol className="relative mt-2 space-y-4 rounded-[20px] bg-white py-4 pr-4 pl-10 before:absolute before:top-[26px] before:bottom-[26px] before:left-[19px] before:w-[3px] before:bg-cocoa">
          {stops.map((s, i) => (
            <li key={s.place} className="relative">
              <span
                aria-hidden="true"
                className={`absolute top-[3px] -left-[27px] h-[13px] w-[13px] rounded-full ${i === stops.length - 1 ? "border-[3px] border-cocoa bg-white" : "bg-cocoa"}`}
              />
              <span className="flex justify-between gap-2">
                <b className="leading-tight">{s.place}</b>
                <span className="tabular-nums">{s.time}</span>
              </span>
              <span className="text-[12px] text-cocoa-soft">{s.who}</span>
            </li>
          ))}
        </ol>
        <p className="font-semibold">2 of 3 seats filled</p>
        <p className="text-[12px] text-cocoa-soft">Pickup order follows the road.</p>
        <PrimaryButton>Start trip</PrimaryButton>
      </Body>
    </>
  );
}

// Schematic of the pilot: homes on the edge, workplaces in the middle, covered routes drawn as route lines.
export function CoverageScreen() {
  const places: Record<string, [number, number]> = {
    "Mall Road": [116, 24],
    "Liberty Market": [168, 60],
    "Gulberg Blvd": [150, 84],
    "Arfa Tower": [110, 104],
    "Gulberg III": [196, 92],
    "DHA Phase 5": [228, 132],
    "Model Town": [160, 142],
    "Garden Town": [92, 132],
    "Faisal Town": [124, 160],
    "Johar Town": [56, 168],
    Township: [100, 200],
    "Bahria Town": [32, 214],
  };
  const covered: [string, string][] = [
    ["Johar Town", "Arfa Tower"],
    ["Garden Town", "Mall Road"],
    ["Faisal Town", "Arfa Tower"],
    ["Model Town", "Gulberg Blvd"],
    ["DHA Phase 5", "Liberty Market"],
    ["Gulberg III", "Liberty Market"],
  ];
  const soon: [string, string][] = [
    ["Bahria Town", "Johar Town"],
    ["Township", "Faisal Town"],
  ];
  const curve = (a: string, b: string) => {
    const [x1, y1] = places[a];
    const [x2, y2] = places[b];
    const mx = (x1 + x2) / 2 + (y2 - y1) * 0.25;
    const my = (y1 + y2) / 2 - (x2 - x1) * 0.25;
    return `M${x1} ${y1} Q${mx} ${my} ${x2} ${y2}`;
  };
  return (
    <>
      <Header title="Pilot coverage" />
      <Body>
        <Bot>Here&rsquo;s where the pilot runs.</Bot>
        <div className="rounded-[20px] bg-white p-2">
          <svg viewBox="0 0 260 232" className="block h-auto w-full" role="img" aria-label="Map of the Lahore pilot area with covered routes">
            {soon.map(([a, b]) => (
              <path key={a + b} d={curve(a, b)} className="fill-none stroke-cocoa-soft" strokeWidth="2.5" strokeDasharray="4 6" strokeLinecap="round" />
            ))}
            {covered.map(([a, b]) => (
              <path key={a + b} d={curve(a, b)} className="fill-none stroke-apricot" strokeWidth="4.5" strokeLinecap="round" />
            ))}
            {Object.entries(places).map(([name, [x, y]]) => {
              const isSoon = name === "Township" || name === "Bahria Town";
              return (
                <g key={name}>
                  <circle cx={x} cy={y} r="5" className={isSoon ? "fill-white stroke-cocoa-soft" : "fill-white stroke-cocoa"} strokeWidth="2.5" />
                  <text x={x + (x > 200 ? -8 : 8)} y={y - 7} textAnchor={x > 200 ? "end" : "start"} className="fill-cocoa text-[10px] font-semibold">
                    {name}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
        <div className="flex gap-4 text-[12px]">
          <span className="flex items-center gap-1.5">
            <span className="h-1 w-5 rounded-full bg-apricot" /> Covered
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1 w-5 rounded-full bg-cocoa-soft" /> Not yet
          </span>
        </div>
        <Bot>Check your commute?</Bot>
        <div className="flex items-center justify-between rounded-[18px] bg-apricot-tint px-3.5 py-2.5">
          <span className="font-semibold">Johar Town → Arfa Tower</span>
          <Badge>Covered</Badge>
        </div>
      </Body>
    </>
  );
}

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
  // [x, y, label side]: each label has its own clear spot so none overlap at phone size.
  const places: Record<string, [number, number, "left" | "right" | "below"]> = {
    "Mall Road": [120, 24, "right"],
    "Liberty Market": [206, 50, "left"],
    "Gulberg Blvd": [160, 82, "right"],
    "Arfa Tower": [96, 108, "left"],
    "Gulberg III": [234, 118, "left"],
    "DHA Phase 5": [226, 170, "left"],
    "Model Town": [170, 142, "right"],
    "Garden Town": [52, 140, "below"],
    "Faisal Town": [122, 194, "right"],
    "Johar Town": [40, 194, "right"],
    Township: [166, 218, "right"],
    "Bahria Town": [24, 222, "right"],
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
            {Object.entries(places).map(([name, [x, y, side]]) => {
              const isSoon = name === "Township" || name === "Bahria Town";
              const label =
                side === "left"
                  ? { x: x - 9, y: y + 3.5, anchor: "end" as const }
                  : side === "right"
                    ? { x: x + 9, y: y + 3.5, anchor: "start" as const }
                    : { x, y: y + 17, anchor: "middle" as const };
              return (
                <g key={name}>
                  <circle cx={x} cy={y} r="5" className={isSoon ? "fill-white stroke-cocoa-soft" : "fill-white stroke-cocoa"} strokeWidth="2.5" />
                  <text
                    x={label.x}
                    y={label.y}
                    textAnchor={label.anchor}
                    className="fill-cocoa stroke-white text-[10px] font-semibold"
                    strokeWidth="3.5"
                    strokeLinejoin="round"
                    style={{ paintOrder: "stroke" }}
                  >
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

export function DriverProfileScreen() {
  const checks = ["Phone verified", "CNIC reviewed", "Live selfie checked", "Licence checked", "Vehicle checked"];
  return (
    <>
      <Header title="Your driver" />
      <Body>
        <div className="flex flex-col items-center rounded-[20px] bg-white px-4 pt-5 pb-4 text-center">
          <span aria-hidden="true" className="grid h-16 w-16 place-items-center rounded-full bg-apricot font-display text-[26px] font-extrabold">
            H
          </span>
          <p className="mt-2 font-display text-[18px] font-bold">Hamza</p>
          <p className="text-cocoa-soft">Honda City · White</p>
          <p className="mt-1 rounded-full bg-apricot-tint px-3 py-1 text-[12px] font-semibold tabular-nums">LEB-21-4417</p>
        </div>
        <p className="mt-1 font-semibold">Checks</p>
        <ul className="grid gap-1.5">
          {checks.map((c) => (
            <li key={c} className="flex items-center justify-between rounded-[14px] bg-white px-3 py-2">
              <span>{c.replace(/ (verified|reviewed|checked)$/, "")}</span>
              <Badge>{c.replace(/^.* (\w)(\w+)$/, (_m, a: string, b: string) => a.toUpperCase() + b)}</Badge>
            </li>
          ))}
        </ul>
        <p className="mt-1 text-[12px] text-cocoa-soft">All approved before Hamza could publish rides.</p>
      </Body>
    </>
  );
}

export function TripLiveScreen() {
  return (
    <>
      <Header title="Trip in progress" back={false} />
      <Body>
        <div className="relative overflow-hidden rounded-[20px] bg-apricot-tint">
          <svg viewBox="0 0 260 150" className="block h-auto w-full" aria-hidden="true">
            <path d="M-10 120 C60 120 70 60 130 62 S210 30 270 34" className="fill-none stroke-white" strokeWidth="16" strokeLinecap="round" />
            <path d="M-10 120 C60 120 70 60 130 62 S210 30 270 34" className="fill-none stroke-apricot" strokeWidth="6" strokeLinecap="round" />
            <circle cx="214" cy="38" r="9" className="fill-white stroke-cocoa" strokeWidth="4" />
            <g transform="translate(118 60) scale(1.3)">
              <rect className="fill-cocoa" x="-15" y="-10" width="30" height="8" rx="3" />
              <path className="fill-cocoa" d="M-9 -10 L-5 -16 H6 L10 -10Z" />
              <rect className="fill-apricot-tint" x="-4" y="-14.5" width="8" height="3.5" rx="1" />
              <circle className="fill-cocoa" cx="-8.5" cy="-1.5" r="3.2" />
              <circle className="fill-cocoa" cx="8.5" cy="-1.5" r="3.2" />
            </g>
          </svg>
        </div>
        <div className="rounded-[18px] bg-white p-3.5">
          <p className="text-[12px] text-cocoa-soft">Next stop</p>
          <p className="flex justify-between font-semibold">
            <span>Arfa Tower gate</span>
            <span className="tabular-nums">8:20</span>
          </p>
          <p className="mt-2 w-fit rounded-full bg-apricot-tint px-2.5 py-1 text-[12px] font-semibold">Rs 180 · locked</p>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {["Share trip", "Chat"].map((a) => (
            <span key={a} className="grid h-14 place-items-center rounded-[16px] bg-white text-[12.5px] font-semibold">
              {a}
            </span>
          ))}
          <span className="grid h-14 place-items-center rounded-[16px] bg-cocoa font-display text-[15px] font-extrabold text-cream">SOS</span>
        </div>
        <p className="flex items-center gap-1.5 text-[12px]">
          <Tick className="text-trust" /> Sharing live with Ammi
        </p>
      </Body>
    </>
  );
}

export function PhoneScreen() {
  return (
    <>
      <Header title="Sign up" />
      <Body>
        <Bot strong>What&rsquo;s your mobile number?</Bot>
        <div className="mt-1 flex h-12 items-center gap-2 rounded-full bg-white px-4">
          <span className="font-semibold">+92</span>
          <span className="tabular-nums">300-1234567</span>
        </div>
        <p className="text-[12px] text-cocoa-soft">Never shown to other users.</p>
        <div className="mt-1 grid gap-2">
          {["I accept the Terms", "I’ve read the Privacy Policy"].map((c) => (
            <span key={c} className="flex items-center gap-2.5">
              <span className="h-5 w-5 flex-none rounded-[6px] border-2 border-cocoa bg-white" />
              {c}
            </span>
          ))}
        </div>
        <span className="mt-auto grid h-11 flex-none place-items-center rounded-full bg-apricot-tint font-semibold text-cocoa-soft">Continue</span>
        <p className="text-center text-[12px] text-cocoa-soft">Next: a 6-digit code by SMS</p>
      </Body>
    </>
  );
}

export function RequestScreen() {
  return (
    <>
      <Header title="Request a seat" />
      <Body>
        <div className="grid grid-cols-2 rounded-full bg-white p-1 text-center text-[12.5px] font-semibold">
          <span className="rounded-full py-2">This date</span>
          <span className="rounded-full bg-apricot py-2">Repeating</span>
        </div>
        <div className="flex gap-1.5">
          {["Mon", "Tue", "Wed", "Thu", "Fri"].map((d) => (
            <span key={d} className="grid h-9 flex-1 place-items-center rounded-full bg-cocoa text-[12px] font-semibold text-cream">
              {d}
            </span>
          ))}
        </div>
        <div className="rounded-[18px] bg-white p-3.5">
          <p className="font-semibold">Leave home by 7:36</p>
          <p className="text-cocoa-soft">Walk 4 min to Akbar Chowk</p>
          <p className="mt-2 font-semibold">Arrive ~8:20</p>
          <p className="text-[11.5px] text-cocoa-soft">Estimated from road routing</p>
        </div>
        <div className="rounded-[18px] bg-apricot-tint p-3.5">
          <p className="font-display text-[16px] font-bold">Request pending</p>
          <p>Hamza replies by 6:30 pm.</p>
          <p className="mt-1 text-[12px] text-cocoa-soft">No seat is held until confirmed.</p>
        </div>
      </Body>
    </>
  );
}

export function SettleScreen() {
  return (
    <>
      <Header title="Settle up" back={false} />
      <Body>
        <div className="rounded-[20px] bg-white p-4">
          <p className="font-display text-[16px] font-bold">Trip complete</p>
          <p className="text-[12px] text-cocoa-soft">Mon 2 Nov · Akbar Chowk → Arfa Tower gate</p>
          <p className="mt-3 text-[12px] text-cocoa-soft">Your final share</p>
          <p className="font-display text-[34px] leading-none font-extrabold tracking-tight">Rs 180</p>
        </div>
        <ul className="grid gap-1.5">
          {[
            ["JazzCash", "0300 1234567"],
            ["NayaPay", "0321 7654321"],
            ["Cash", "Pay Hamza in the car"],
          ].map(([m, v]) => (
            <li key={m} className="flex items-center justify-between rounded-[14px] bg-white px-3 py-2">
              <span>
                <b className="block leading-tight">{m}</b>
                <span className="text-[12px] text-cocoa-soft tabular-nums">{v}</span>
              </span>
              {m !== "Cash" && <span className="rounded-full bg-apricot-tint px-2.5 py-1 text-[12px] font-semibold">Copy</span>}
            </li>
          ))}
        </ul>
        <p className="text-[11.5px] text-cocoa-soft">RydCo suggests the share but doesn&rsquo;t process payments.</p>
        <PrimaryButton>I sent the payment</PrimaryButton>
      </Body>
    </>
  );
}

export function ChecklistScreen() {
  const steps: [string, "done" | "now" | "todo"][] = [
    ["Identity", "done"],
    ["Live selfie", "done"],
    ["Driving licence", "now"],
    ["Vehicle", "todo"],
    ["Submit", "todo"],
  ];
  return (
    <>
      <Header title="Become a driver" />
      <Body>
        <div className="rounded-[20px] bg-white p-4">
          <p className="flex justify-between font-semibold">
            <span>Your checks</span>
            <span className="tabular-nums">2 of 5</span>
          </p>
          <span className="mt-2 block h-2 overflow-hidden rounded-full bg-apricot-tint">
            <span className="block h-full w-2/5 rounded-full bg-apricot" />
          </span>
        </div>
        <ol className="grid gap-1.5">
          {steps.map(([s, state]) => (
            <li key={s} className={`flex items-center justify-between rounded-[14px] px-3 py-2.5 ${state === "now" ? "bg-apricot-tint" : "bg-white"}`}>
              <span className="font-semibold">{s}</span>
              {state === "done" ? <Badge>Done</Badge> : state === "now" ? <span className="text-[12px] font-semibold">Next</span> : null}
            </li>
          ))}
        </ol>
        <p className="text-[12px]">Prepare your commute while we review. Publish rides after approval.</p>
        <PrimaryButton>Continue</PrimaryButton>
      </Body>
    </>
  );
}

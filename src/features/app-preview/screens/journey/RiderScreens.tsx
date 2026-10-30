import { Car } from "@/components/brand/Car";
import { toneOn } from "@/components/brand/tones";
import { Badge } from "@/components/ui/Badge";
import { Tick } from "@/components/ui/icons";
import { Avatar, Card, Days, Ends, Heading, Label, LiveMap, MapLabel, Pin, Primary, RouteCard, SafetyActions, Secondary, Segments, SkySheet, Windows } from "./SkySheet";

// One ride as a rider, in the app's order: Ayesha finds a seat with Hamza, rides, and pays him. Text and example
// details are the app's own (app-mocks/index (1).html), leaving out its sample ratings and trip counts, which could be
// read as real figures.

export function FindRideScreen() {
  return (
    <SkySheet step="Trips · Find" foot={<Primary tap="late">Find rides</Primary>}>
      <Heading lead="Share a seat on someone's daily commute.">Find a ride</Heading>
      <Ends fromLabel="Pickup" from="DHA Phase 5" toLabel="Drop-off" to="Arfa Tech Park" />
      <Card className="grid gap-2 p-2.5">
        <Segments options={["One date", "Weekdays"]} chosen="Weekdays" />
        <Days />
        <Label>Pickup window</Label>
        <Windows />
      </Card>
      <Card className="flex items-center justify-between gap-2 p-2.5 text-[12.5px] font-semibold">
        Women-only rides
        <span aria-hidden="true" className="relative h-5 w-9 flex-none rounded-full bg-line">
          <i className="absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-screen" />
        </span>
      </Card>
    </SkySheet>
  );
}

function RideOption({ initials, name, share, meet, meetAt, walk, drop, dropAt, seats, tap }: { initials: string; name: string; share: string; meet: string; meetAt: string; walk: string; drop: string; dropAt: string; seats: string; tap?: "late" }) {
  return (
    <Card tap={tap} className="grid gap-2 p-2.5">
      <div className="flex items-center gap-2">
        <Avatar>{initials}</Avatar>
        <span className="min-w-0 flex-1 leading-tight">
          <b className="block font-display text-[13.5px]">{name}</b>
          <span className="text-[11px] text-ink-soft">{seats}</span>
        </span>
        <span className="text-right leading-tight">
          <b className="block font-display text-[15px] font-extrabold">{share}</b>
          <span className="text-[10.5px] text-ink-soft">now</span>
        </span>
      </div>
      <div className="grid gap-1 text-[11.5px] leading-tight">
        <p className="flex gap-2">
          <b className="w-8 flex-none tabular-nums">{meetAt}</b>
          <span className="min-w-0 flex-1">
            Meet · {meet} <span className="text-ink-soft">· {walk}</span>
          </span>
        </p>
        <p className="flex gap-2">
          <b className="w-8 flex-none tabular-nums">{dropAt}</b>
          <span className="min-w-0 flex-1">Drop · {drop}</span>
        </p>
      </div>
      <span className="text-[11px]">
        <Badge>Verified driver</Badge>
      </span>
    </Card>
  );
}

export function RideResultsScreen() {
  return (
    <SkySheet step="Trips · Results">
      <Card className="px-3 py-2 leading-tight">
        <b className="block text-[13px]">DHA Ph 5 → Arfa Tech Park</b>
        <span className="text-[11.5px] text-ink-soft">Weekdays · 7:30–7:50</span>
      </Card>
      <p className="flex items-baseline justify-between">
        <b className="font-display text-[15px]">3 rides</b>
        <span className="text-[11.5px] text-ink-soft">Sorted by pickup</span>
      </p>
      <RideOption tap="late" initials="HR" name="Hamza" seats="2 seats left" share="Rs 245" meetAt="07:38" meet="Khayaban-e-Jinnah stop" walk="4 min walk" dropAt="08:06" drop="Arfa Tower gate" />
      <RideOption initials="SI" name="Sana" seats="1 seat left" share="Rs 264" meetAt="07:44" meet="Model Town Link Rd" walk="6 min walk" dropAt="08:12" drop="Arfa Tower gate" />
    </SkySheet>
  );
}

const plan = [
  { at: "07:34", what: "Leave", where: "DHA Phase 5 · 4 min walk" },
  { at: "07:38", what: "Meet Hamza", where: "Khayaban-e-Jinnah stop" },
  { at: "08:06", what: "Drop-off", where: "Arfa Tower gate" },
  { at: "08:08", what: "Arrive", where: "Arfa Tech Park · 2 min walk" },
];

export function RideDetailScreen() {
  return (
    <SkySheet step="Trips · Ride" foot={<Primary tap="late">Request seat · Rs 245</Primary>}>
      <RouteCard height={92} from="Meet" to="Drop" />
      <div className="flex items-center gap-2">
        <Avatar>HR</Avatar>
        <span className="min-w-0 flex-1 text-[11px] leading-tight">
          <b className="block font-display text-[14px]">Hamza R.</b>
          <Badge>Verified driver</Badge>
        </span>
        <span className="text-right leading-tight">
          <b className="block font-display text-[16px] font-extrabold">Rs 245</b>
          <span className="text-[10.5px] text-ink-soft">Rs 180 if a 2nd rider joins</span>
        </span>
      </div>
      <Card className="p-2.5">
        <ol className="relative grid gap-2 before:absolute before:top-1.5 before:bottom-1.5 before:left-[45px] before:w-0.5 before:bg-line">
          {plan.map((s, i) => (
            <li key={s.what} className="relative grid grid-cols-[34px_12px_1fr] items-start gap-1.5 text-[11.5px] leading-tight">
              <b className="tabular-nums">{s.at}</b>
              <span aria-hidden="true" className={`mt-0.5 h-2.5 w-2.5 rounded-full border-2 border-accent-strong ${i === plan.length - 1 ? "bg-accent-strong" : "bg-screen"}`} />
              <span>
                <b className="block">{s.what}</b>
                <span className="text-ink-soft">{s.where}</span>
              </span>
            </li>
          ))}
        </ol>
      </Card>
    </SkySheet>
  );
}

// The map fills the top of this one, as when the app brings the good news.
export function RequestAcceptedScreen() {
  const route = "M228 226 C228 204 200 206 176 198 C150 190 146 174 122 168 C96 162 72 170 62 142";
  return (
    <>
      <svg viewBox="0 0 280 340" aria-hidden="true" className="absolute inset-x-0 -top-[41px] h-auto w-full">
        <path d={route} className="fill-none stroke-screen" strokeWidth="9" strokeLinecap="round" />
        <path data-route d={route} pathLength={1} strokeDasharray="1 1" className="fill-none stroke-accent-strong" strokeWidth="4.5" strokeLinecap="round" />
        <circle cx="228" cy="226" r="6" className="fill-screen stroke-ink" strokeWidth="3" />
        <g data-fade>
          <Pin x={62} y={142} />
          <Car tone={toneOn.brand} transform="translate(148 184) scale(0.9)" />
        </g>
        <MapLabel x={84} y={124}>
          Arfa Tower
        </MapLabel>
        <MapLabel x={216} y={230} end>
          DHA Phase 5
        </MapLabel>
      </svg>

      <div data-note className="absolute inset-x-2.5 top-[3px] z-10 flex items-center gap-2.5 rounded-[18px] bg-screen p-2.5 shadow-[0_10px_24px_-14px_var(--color-ink-deep)]">
        <span aria-hidden="true" className="grid h-8 w-8 flex-none place-items-center rounded-[10px] action font-display text-[15px] font-extrabold">
          R
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex justify-between text-[11px] text-ink-soft">
            <b className="font-semibold text-ink">RydCo</b>
            <span>now</span>
          </span>
          <span className="block truncate text-[12.5px] font-semibold">Hamza accepted your request</span>
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2.5 rounded-t-[26px] bg-surface px-3.5 pt-2 pb-4 shadow-[0_-16px_30px_-22px_var(--color-ink-deep)]">
        <span aria-hidden="true" className="mx-auto h-1 w-9 rounded-full bg-line" />
        <div className="flex items-center justify-between gap-2">
          <span className="font-display text-[17px] leading-tight font-bold">Your ride with Hamza</span>
          <span className="text-[11px]">
            <Badge>Confirmed</Badge>
          </span>
        </div>
        <Card className="grid gap-1.5 p-2.5 text-[12px] leading-tight">
          <p className="flex justify-between gap-2">
            <span>Meet · Khayaban-e-Jinnah stop</span>
            <b className="tabular-nums">07:38</b>
          </p>
          <p className="flex justify-between gap-2">
            <span>Drop · Arfa Tower gate</span>
            <b className="tabular-nums">08:06</b>
          </p>
          <p className="mt-1 text-ink-soft">Toyota Corolla · White · LEB-21-4417</p>
        </Card>
        <Primary tap="late">View trip</Primary>
      </div>
    </>
  );
}

function Plate() {
  return <span className="rounded-[5px] border-[1.5px] border-ink-soft bg-screen px-1.5 py-0.5 text-[10px] font-bold tracking-wide tabular-nums">LEB-21-4417</span>;
}

export function OnTheWayScreen() {
  return (
    <SkySheet step="Today · Start" foot={<Primary tap="late">Open live trip</Primary>}>
      <RouteCard height={112} from="Your meet point" drive={[10, 34]} />
      <Heading
        lead={
          <>
            <b className="font-semibold text-ink tabular-nums">6 min</b> to your meet point
          </>
        }
      >
        Hamza is on the way
      </Heading>
      <Card className="grid gap-2 p-2.5 text-[12px] leading-tight">
        <p className="flex items-start justify-between gap-2">
          <span>
            <b className="block">Khayaban-e-Jinnah stop</b>
            <span className="text-ink-soft">Meet point · 4 min walk</span>
          </span>
          <b className="tabular-nums">07:38</b>
        </p>
        <p className="flex items-center justify-between gap-2">
          <span>Toyota Corolla · White</span>
          <Plate />
        </p>
      </Card>
      <div className="grid grid-cols-2 gap-1.5">
        <Secondary>Chat</Secondary>
        <Secondary>Share trip</Secondary>
      </div>
    </SkySheet>
  );
}

export function LiveTripScreen() {
  return (
    <SkySheet step="Live trip" foot={<Secondary tap="late">Trip finished</Secondary>}>
      <LiveMap height={140} drive={[42, 74]} eta="ETA 08:06" />
      <Card className="p-2.5 text-[12px] leading-tight">
        <div className="flex items-start justify-between gap-2">
          <span>
            <span className="text-[11px] text-ink-soft tabular-nums">Your stop · 08:06</span>
            <b className="block font-display text-[14px]">Drop-off</b>
            <span className="text-ink-soft">Arfa Tower gate · 2 min walk</span>
          </span>
          <span className="flex-none rounded-full bg-panel px-2 py-1 text-[10.5px] font-semibold">Rs 180 · locked</span>
        </div>
      </Card>
      <p className="flex items-center gap-1.5 text-[12px]">
        <Tick className="text-trust" /> Picked up · sharing with your trusted contact
      </p>
      <SafetyActions />
    </SkySheet>
  );
}

const wallets = [
  { name: "JazzCash", value: "0300 1234567", copy: true },
  { name: "NayaPay", value: "0321 7654321", copy: true },
  { name: "Cash", value: "Pay at drop-off", copy: false },
];

export function SettleTripScreen() {
  return (
    <SkySheet
      step="Settle trip"
      foot={
        <>
          <Primary tap="late">I sent the payment</Primary>
          <Secondary>I paid cash</Secondary>
        </>
      }
    >
      <div>
        <Label>Trip complete · today</Label>
        <p className="mt-0.5 font-display text-[20px] leading-tight font-extrabold tracking-tight">Pay Hamza</p>
      </div>
      <Card className="p-3">
        <Label>Your final share</Label>
        <p className="mt-0.5 font-display text-[32px] leading-none font-extrabold tracking-tight tabular-nums">Rs 180</p>
        <p className="mt-1 text-[11px] text-ink-soft">Shared with 1 co-rider · fuel price locked</p>
      </Card>
      <Label>Hamza accepts</Label>
      <Card className="divide-y divide-line">
        {wallets.map((w) => (
          <div key={w.name} className="flex items-center justify-between gap-2 px-2.5 py-1.5 text-[12px] leading-tight">
            <span>
              <b className="block">{w.name}</b>
              <span className="text-[11px] text-ink-soft tabular-nums">{w.value}</span>
            </span>
            {w.copy && <span className="rounded-full bg-panel px-2.5 py-1 text-[11px] font-semibold">Copy</span>}
          </div>
        ))}
      </Card>
    </SkySheet>
  );
}

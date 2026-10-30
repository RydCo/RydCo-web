import type { ReactNode } from "react";
import { Badge } from "@/components/ui/Badge";
import { Avatar, Card, Days, Ends, Heading, Label, LiveMap, Primary, RouteCard, SafetyActions, Secondary, Segments, SkySheet, Windows } from "./SkySheet";

// The same ride from the driver's seat, in the app's order: Hamza publishes it, takes Ayesha and Bilal, drives, and
// confirms their payments. Text is the app's own (app-mocks/index (1).html), with its sample requests swapped for these
// two riders so it stays one trip, and its sample ratings and trip counts left out.

export function OfferRideScreen() {
  return (
    <SkySheet step="Trips · Offer" foot={<Primary>Publish ride</Primary>}>
      <Heading lead="Publish your commute and share the cost.">Offer a ride</Heading>
      <Ends fromLabel="Start" from="DHA Phase 5" toLabel="Drop-off" to="Arfa Tech Park" />
      <Card className="grid gap-2 p-2.5">
        <Segments options={["One date", "Weekdays"]} chosen="Weekdays" />
        <Days />
        <Label>Departure window</Label>
        <Windows />
      </Card>
      <Card className="flex items-center justify-between gap-2 p-2.5 text-[12.5px] font-semibold">
        Seats to offer
        <span aria-hidden="true" className="flex items-center gap-2.5 rounded-full bg-panel px-2.5 py-1 text-[13px] font-bold tabular-nums">
          <span>−</span>3<span>+</span>
        </span>
      </Card>
    </SkySheet>
  );
}

export function RidePublishedScreen() {
  return (
    <SkySheet step="Trips · Offer" foot={<Primary>View my trips</Primary>}>
      <RouteCard height={130} />
      <span className="text-[11px]">
        <Badge>Live</Badge>
      </span>
      <Heading>Ride published</Heading>
      <Card className="grid grid-cols-[52px_1fr] gap-x-2 gap-y-1.5 p-2.5 text-[12px] leading-tight">
        <Label>Route</Label>
        <span>DHA Phase 5 → Arfa Tech Park</span>
        <Label>Leaves</Label>
        <span className="tabular-nums">07:30 · Mon–Fri</span>
        <Label>Seats</Label>
        <span>3 seats</span>
      </Card>
      <p className="text-[12px] text-ink-soft">You accept or decline each request.</p>
    </SkySheet>
  );
}

function RiderRequest({ initials, name, adds, pickupAt, pickup, children }: { initials: string; name: string; adds: string; pickupAt: string; pickup: string; children: ReactNode }) {
  return (
    <Card className="grid gap-2 p-2.5">
      <div className="flex items-center gap-2">
        <Avatar>{initials}</Avatar>
        <span className="min-w-0 flex-1 text-[11px] leading-tight">
          <b className="block font-display text-[14px]">{name}</b>
          <Badge>Phone verified</Badge>
        </span>
        <span className="flex-none rounded-full bg-panel px-2 py-1 text-[10.5px] font-semibold">{adds} added</span>
      </div>
      <div className="grid grid-cols-[42px_1fr] gap-x-1.5 gap-y-1 text-[11.5px] leading-tight">
        <Label>Pickup</Label>
        <span>
          <b className="tabular-nums">{pickupAt}</b> · {pickup}
        </span>
        <Label>Drop</Label>
        <span>
          <b className="tabular-nums">08:06</b> · Arfa Tower gate
        </span>
      </div>
      {children}
    </Card>
  );
}

export function RideRequestsScreen() {
  return (
    <SkySheet step="Trips · Requests">
      <Heading lead="07:30–07:50 · DHA Ph 5 → Arfa · 2 of 3 seats left">Ride requests</Heading>
      <RiderRequest initials="AM" name="Ayesha" adds="+3 min" pickupAt="07:38" pickup="Khayaban-e-Jinnah stop">
        <p className="flex items-center gap-2 text-[11px]">
          <Badge>Confirmed</Badge>
          <span className="text-ink-soft">Added to your stops</span>
        </p>
      </RiderRequest>
      <RiderRequest initials="BA" name="Bilal" adds="+4 min" pickupAt="07:33" pickup="Sector FF gate">
        <div className="grid grid-cols-2 gap-1.5">
          <Secondary className="shadow-[inset_0_0_0_1.5px_var(--color-line)]">Decline</Secondary>
          <Primary>Accept</Primary>
        </div>
      </RiderRequest>
    </SkySheet>
  );
}

const riders = [
  { initials: "BA", name: "Bilal", stop: "Sector FF gate", at: "07:33" },
  { initials: "AM", name: "Ayesha", stop: "Khayaban-e-Jinnah stop", at: "07:38" },
];

export function TodaysRideScreen() {
  return (
    <SkySheet step="Today · Start" foot={<Primary>Start trip</Primary>}>
      <span className="text-[11px]">
        <Badge>Start window open</Badge>
      </span>
      <Heading lead="07:30–07:50 · DHA Ph 5 → Arfa Tech Park">Today&rsquo;s ride</Heading>
      <RouteCard height={110} to="Arfa Tech Park" />
      <Label>Riders</Label>
      <Card className="divide-y divide-line">
        {riders.map((r) => (
          <div key={r.name} className="flex items-center gap-2 p-2 text-[11.5px] leading-tight">
            <Avatar>{r.initials}</Avatar>
            <span className="min-w-0 flex-1">
              <b className="block text-[12.5px]">{r.name}</b>
              <span className="text-ink-soft">{r.stop}</span>
            </span>
            <b className="tabular-nums">{r.at}</b>
          </div>
        ))}
      </Card>
      <p className="text-[11.5px] leading-snug text-ink-soft">Shares lock when you start.</p>
    </SkySheet>
  );
}

export function DriverLiveTripScreen() {
  return (
    <SkySheet step="Live trip" foot={<Secondary>Complete trip</Secondary>}>
      <LiveMap height={118} carX={88} carY={72} eta="ETA 08:06" />
      <Card className="flex items-center justify-between gap-2 p-2.5 text-[12px] leading-tight">
        <span className="min-w-0">
          <span className="text-[11px] text-ink-soft tabular-nums">Next · 07:38</span>
          <b className="block font-display text-[14px]">Pick up Ayesha</b>
          <span className="text-ink-soft">Khayaban-e-Jinnah stop</span>
        </span>
        <span className="grid h-8 flex-none place-items-center rounded-full action px-3 text-[11.5px] font-semibold">Picked up</span>
      </Card>
      <Card className="divide-y divide-line">
        {[
          { initials: "BA", name: "Bilal", share: "Rs 154", state: "In car" },
          { initials: "AM", name: "Ayesha", share: "Rs 180", state: "Waiting" },
        ].map((r) => (
          <div key={r.name} className="flex items-center gap-2 p-2 text-[11.5px] leading-tight">
            <Avatar>{r.initials}</Avatar>
            <b className="min-w-0 flex-1 text-[12.5px]">{r.name}</b>
            <span className="text-right">
              <b className="block">{r.state}</b>
              <span className="text-[10.5px] text-ink-soft tabular-nums">{r.share} · locked</span>
            </span>
          </div>
        ))}
      </Card>
      <SafetyActions />
    </SkySheet>
  );
}

export function ConfirmPaymentsScreen() {
  return (
    <SkySheet step="Settle trip" foot={<Primary>Done</Primary>}>
      <div>
        <Label>Trip complete · today</Label>
        <p className="mt-0.5 font-display text-[20px] leading-tight font-extrabold tracking-tight">Confirm payments</p>
      </div>
      <Card className="grid gap-2 p-2.5 text-[12px] leading-tight">
        <div className="flex items-center gap-2">
          <Avatar>AM</Avatar>
          <span>
            <b className="block text-[13px]">Ayesha</b>
            <span className="text-[11px] text-ink-soft tabular-nums">Rs 180 · locked</span>
          </span>
        </div>
        <p>
          <b>Ayesha says she paid Rs 180</b> · JazzCash
        </p>
        <div className="grid grid-cols-2 gap-1.5">
          <Primary>I received it</Primary>
          <Secondary className="shadow-[inset_0_0_0_1.5px_var(--color-line)]">Not received</Secondary>
        </div>
      </Card>
      <Card className="grid gap-2 p-2.5 text-[12px] leading-tight">
        <div className="flex items-center gap-2">
          <Avatar>BA</Avatar>
          <span>
            <b className="block text-[13px]">Bilal</b>
            <span className="text-[11px] text-ink-soft tabular-nums">Rs 154 · locked</span>
          </span>
        </div>
        <p className="flex items-center gap-2 text-[11px]">
          <Badge>Settled</Badge>
          <span className="text-ink-soft">Received Rs 154 in cash</span>
        </p>
      </Card>
      <p className="text-[11.5px] leading-snug text-ink-soft">RydCo suggests the share but doesn&rsquo;t process payments.</p>
    </SkySheet>
  );
}

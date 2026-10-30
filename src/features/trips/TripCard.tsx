import { Badge } from "@/components/ui/Badge";
import { ExampleTag } from "@/components/ui/ExampleTag";

// The carpool trip pattern: who drives, pickup to drop-off on the route mark, seats left, share per seat.
export type Trip = {
  driver: string;
  car: string;
  from: string;
  fromTime: string;
  to: string;
  toTime: string;
  seatsLeft: number;
  share: string;
  shareNote?: string;
  days?: string;
  badges: string[];
};

export function TripCard({ trip, compact = false, label }: { trip: Trip; compact?: boolean; label?: string }) {
  const initials = trip.driver.slice(0, 1);
  return (
    <div data-ui className={`relative bg-screen text-ink ${compact ? "rounded-[18px] p-3 text-[12.5px]" : "rounded-surface p-6 text-[16px] md:p-8"}`}>
      {label && (
        <ExampleTag>{label}</ExampleTag>
      )}
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className={`grid flex-none place-items-center rounded-full bg-brand font-display font-extrabold text-ink ${compact ? "h-8 w-8 text-[14px]" : "h-12 w-12 text-[20px]"}`}
        >
          {initials}
        </span>
        <div className="min-w-0">
          <p className={`font-display font-bold leading-tight ${compact ? "text-[14px]" : "text-[20px]"}`}>{trip.driver}</p>
          <p className="text-ink-soft">{trip.car}</p>
        </div>
      </div>

      <ol
        className={`relative before:absolute before:bg-ink ${compact ? "mt-3 space-y-2 pl-5 before:top-[7px] before:bottom-[7px] before:left-[5px] before:w-[2px]" : "mt-6 space-y-4 pl-7 before:top-[9px] before:bottom-[9px] before:left-[7px] before:w-[3px]"}`}
      >
        <Stop place={trip.from} time={trip.fromTime} marker={`bg-ink ${compact ? "top-[3px] -left-5 h-3 w-3" : "top-[4px] -left-7 h-[17px] w-[17px]"}`} />
        <Stop place={trip.to} time={trip.toTime} marker={`border-ink bg-screen ${compact ? "top-[3px] -left-5 h-3 w-3 border-[3px]" : "top-[4px] -left-7 h-[17px] w-[17px] border-[4px]"}`} />
      </ol>

      <div className={`flex flex-wrap items-end justify-between gap-x-4 gap-y-2 ${compact ? "mt-3" : "mt-6"}`}>
        <p>
          <span className={`font-display font-extrabold tracking-tight ${compact ? "text-[22px]" : "text-[40px] leading-none"}`}>{trip.share}</span>
          <span className="text-ink-soft"> per seat</span>
        </p>
        <p className="font-semibold">
          {trip.seatsLeft} {trip.seatsLeft === 1 ? "seat" : "seats"} left
        </p>
      </div>
      {trip.shareNote && <p className={`text-ink-soft ${compact ? "mt-1" : "mt-2"}`}>{trip.shareNote}</p>}

      {!compact && (
        <div className="mt-6 flex flex-wrap gap-2">
          {trip.badges.map((b) => (
            <Badge key={b}>{b}</Badge>
          ))}
          {trip.days && <Badge tone="neutral">{trip.days}</Badge>}
        </div>
      )}
    </div>
  );
}

function Stop({ place, time, marker }: { place: string; time: string; marker: string }) {
  return (
    <li className="relative flex justify-between gap-3">
      <span aria-hidden="true" className={`absolute rounded-full ${marker}`} />
      <span className="font-semibold">{place}</span>
      <span className="tabular-nums">{time}</span>
    </li>
  );
}

// Example numbers from the app's worked example (10 km, Honda City). [FILL] Confirm before launch.
export const exampleTrip: Trip = {
  driver: "Hamza",
  car: "Honda City · Sedan",
  from: "Model Town, Akbar Chowk",
  fromTime: "7:40",
  to: "Arfa Software Technology Park",
  toTime: "8:20",
  seatsLeft: 2,
  share: "Rs 245",
  shareNote: "Rs 180 each if a second rider joins.",
  days: "Mon to Fri",
  badges: ["Phone verified", "CNIC reviewed", "Licence checked", "Vehicle checked"],
};

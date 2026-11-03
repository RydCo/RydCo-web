import { CarMark } from "./Car";
import { toneOn } from "./tones";

// The motif at text scale: a start dot, a short stretch of route, the car at the end. It leads a line of text the way
// the route leads to the wordmark, and matches the route check's own dot, line and car.
export function RouteMark() {
  return (
    <span aria-hidden="true" className="flex flex-none items-center">
      <span className="h-2.5 w-2.5 rounded-full bg-ink" />
      <span className="h-[3px] w-7 rounded-full bg-accent-strong" />
      <CarMark tone={toneOn.brand} className="-ml-0.5 h-[13px] w-[21px]" />
    </span>
  );
}

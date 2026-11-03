import type { Area } from "@/config/pilot";

type Point = [number, number];

// How far a pin may be from an area's middle and still count as in it, in kilometres.
const reach = 3;

// Distance in kilometres. Flat-earth maths is exact enough across one city.
function distance([lat1, lng1]: Point, [lat2, lng2]: Point) {
  const x = (lng2 - lng1) * Math.cos((((lat1 + lat2) / 2) * Math.PI) / 180) * 111.32;
  const y = (lat2 - lat1) * 110.57;
  return Math.hypot(x, y);
}

// The area whose middle is closest to the pin, or none when every area is out of reach.
export function nearestArea(places: Area[], pin: Point) {
  let best: Area | undefined;
  let bestDistance = reach;
  for (const place of places) {
    const d = distance(place.at, pin);
    if (d < bestDistance) [best, bestDistance] = [place, d];
  }
  return best;
}

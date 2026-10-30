import { pilot } from "@/config/pilot";

export function coverage(from: string, to: string) {
  const picked = Boolean(from && to);
  const covered = Boolean(pilot.starts.find((p) => p.name === from)?.covered && pilot.destinations.find((p) => p.name === to)?.covered);
  return { picked, covered };
}

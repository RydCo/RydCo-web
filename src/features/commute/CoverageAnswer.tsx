"use client";

import { Badge } from "@/components/ui/Badge";
import { useCommute } from "@/features/commute/commute-store";
import { coverage } from "@/features/commute/coverage";

function Answer({ from, to }: { from: string; to: string }) {
  const { picked, covered } = coverage(from, to);
  if (!picked) return null;
  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-2">
      <span className="text-[20px]">{covered ? <Badge>Covered</Badge> : <Badge tone="surface">Not covered yet</Badge>}</span>
      <span>{covered ? "RydCo runs on this route in the pilot." : "Join anyway and we’ll tell you when it opens."}</span>
    </p>
  );
}

// "Covered" or "Not covered yet" for the current route. Every picker shows it, but only the one the visitor just
// used puts it in its live region, so a screen reader hears it once.
export function CoverageAnswer({ me, className = "" }: { me: string; className?: string }) {
  const { from, to, by } = useCommute();
  const mine = by === me;
  return (
    <div className={className}>
      <div aria-live="polite">{mine && <Answer from={from} to={to} />}</div>
      {!mine && <Answer from={from} to={to} />}
    </div>
  );
}

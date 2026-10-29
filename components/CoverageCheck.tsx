"use client";

import { useId, useState } from "react";
import { pilot, riderCta } from "@/lib/site";
import { Badge } from "./Badge";
import { Button } from "./Button";

// The site's one live thing, from the app's "Check your commute?" step.
export function CoverageCheck() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const id = useId();

  const start = pilot.starts.find((p) => p.name === from);
  const dest = pilot.destinations.find((p) => p.name === to);
  const picked = Boolean(start && dest);
  const covered = Boolean(start?.covered && dest?.covered);
  const cta = riderCta(picked ? { from, to } : undefined);

  return (
    <div>
      <p className="mb-4 font-display text-[22px] font-bold">Is your commute covered?</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id={`${id}-from`} label="I start in" value={from} onChange={setFrom} options={pilot.starts.map((p) => p.name)} />
        <Field id={`${id}-to`} label="I'm headed to" value={to} onChange={setTo} options={pilot.destinations.map((p) => p.name)} />
      </div>

      <div aria-live="polite" className="mt-5 min-h-[56px]">
        {picked &&
          (covered ? (
            <p className="flex flex-wrap items-center gap-3 text-[18px]">
              <Badge className="text-[16px]">Covered</Badge>
              <span>RydCo runs on this route in the pilot.</span>
            </p>
          ) : (
            <p className="flex flex-wrap items-center gap-3 text-[18px]">
              <Badge tone="neutral" className="bg-cream text-[16px]">
                Not covered yet
              </Badge>
              <span>Join the waitlist and we&rsquo;ll tell you when it opens.</span>
            </p>
          ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
        <Button href={cta.href} external={cta.external}>
          {cta.label}
        </Button>
        <Button href="/drivers" variant="ghost">
          Offer a ride instead
        </Button>
      </div>
    </div>
  );
}

function Field({ id, label, value, onChange, options }: { id: string; label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <div>
      <label htmlFor={id} className="block font-semibold">
        {label}
      </label>
      <div className="relative mt-2">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-[56px] w-full cursor-pointer appearance-none rounded-full bg-cream pr-12 pl-5 text-[17px] text-cocoa"
        >
          <option value="">Choose an area</option>
          {options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
        <svg viewBox="0 0 20 20" aria-hidden="true" className="pointer-events-none absolute top-1/2 right-5 h-5 w-5 -translate-y-1/2" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m5 8 5 5 5-5" />
        </svg>
      </div>
    </div>
  );
}

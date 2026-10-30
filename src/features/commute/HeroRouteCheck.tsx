"use client";

import type { ReactNode } from "react";
import { Car } from "@/components/brand/Car";
import { toneOn } from "@/components/brand/tones";
import { Chevron } from "@/components/ui/icons";
import { riderCta } from "@/config/cta";
import { startAreas, destinationAreas } from "@/config/pilot";
import { setCommute, useCommute } from "@/features/commute/commute-store";
import { CoverageAnswer } from "./CoverageAnswer";

// The app's "Check your commute?" step as the hero's main action, the way Uber opens on its trip planner and
// Airbnb on its search bar. The choice is shared with the waitlist form further down the page.

const HERO = "hero";

// The motif's car, parked at the destination.
function CarMark() {
  return (
    <svg viewBox="-16 -17 32 20" aria-hidden="true" className="block h-[16px] w-[26px]">
      <Car tone={toneOn.surface} />
    </svg>
  );
}

// One end of the trip. The native select covers the whole segment, invisibly, so a tap anywhere opens the
// phone's own picker; the label and value underneath are what people see.
function Area({ name, label, value, areas, marker }: { name: "from" | "to"; label: string; value: string; areas: string[]; marker: ReactNode }) {
  return (
    <div className="relative flex min-h-[64px] min-w-0 flex-1 items-center gap-3.5 rounded-[22px] px-4 transition-colors duration-150 hover:bg-brand has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-ink md:rounded-full md:px-5">
      <span className="relative z-[2] grid w-[26px] flex-none place-items-center">{marker}</span>
      <span aria-hidden="true" className="min-w-0 flex-1 pr-7">
        <span className="block text-[14px] leading-tight font-semibold">{label}</span>
        <span className={`block truncate text-[17px] leading-snug ${value ? "font-semibold" : "text-ink-soft"}`}>{value || "Choose an area"}</span>
      </span>
      <Chevron className="pointer-events-none absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 md:right-5" />
      <select
        name={name}
        aria-label={label}
        value={value}
        onChange={(e) => setCommute({ [name]: e.target.value, by: HERO })}
        className="absolute inset-0 h-full w-full cursor-pointer appearance-none rounded-[inherit] opacity-0"
      >
        <option value="">Choose an area</option>
        {areas.map((a) => (
          <option key={a} value={a}>
            {a}
          </option>
        ))}
      </select>
    </div>
  );
}

// Without JavaScript the form still lands on the waitlist; with it, scroll there and put the cursor in the name field.
function goToWaitlist(e: { preventDefault(): void }) {
  const target = document.getElementById("waitlist");
  if (!target) return;
  e.preventDefault();
  const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: still ? "auto" : "smooth", block: "start" });
  target.querySelector<HTMLInputElement>("input[name=name]")?.focus({ preventScroll: true });
}

export function HeroRouteCheck({ aside }: { aside?: ReactNode }) {
  const { from, to } = useCommute();
  const cta = riderCta();

  const button =
    "inline-flex min-h-[56px] flex-none items-center justify-center rounded-full bg-accent px-7 text-[17px] font-semibold text-on-accent transition-[transform,background-color] duration-150 hover:bg-ink active:scale-[0.97] motion-reduce:transition-none md:ml-1";

  return (
    <div>
      <form action="/#waitlist" onSubmit={goToWaitlist} className="relative flex flex-col gap-1.5 rounded-surface bg-surface p-2 md:flex-row md:items-center md:gap-0 md:rounded-full">
        {/* On phones the route runs down the left, from the start dot to the car. */}
        <span aria-hidden="true" className="absolute top-[40px] left-[35px] z-[1] h-[70px] w-[4px] rounded-full bg-ink md:hidden" />
        <Area name="from" label="I start in" value={from} areas={startAreas} marker={<span className="block h-3.5 w-3.5 rounded-full bg-ink" />} />
        <span aria-hidden="true" className="hidden h-[4px] w-7 flex-none rounded-full bg-ink md:block" />
        <Area name="to" label="I’m headed to" value={to} areas={destinationAreas} marker={<CarMark />} />
        {cta.external ? (
          <a href={cta.href} target="_blank" rel="noopener" className={button}>
            {cta.label}
          </a>
        ) : (
          <button type="submit" className={button}>
            {cta.label}
          </button>
        )}
      </form>
      <div className="mt-4 flex min-h-[52px] flex-col items-start gap-2 md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-x-6">
        <CoverageAnswer me={HERO} />
        {aside}
      </div>
    </div>
  );
}

"use client";

import type { ReactNode } from "react";
import { Car } from "@/components/brand/Car";
import { toneOn } from "@/components/brand/tones";
import { Dropdown, type DropdownOption } from "@/components/forms/Dropdown";
import { buttonClasses } from "@/components/ui/button-styles";
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
      <Car tone={toneOn.screen} />
    </svg>
  );
}

// One end of the trip. A tap anywhere on the segment opens its list.
function Area({ name, label, value, areas, marker }: { name: "from" | "to"; label: string; value: string; areas: DropdownOption[]; marker: ReactNode }) {
  return (
    <Dropdown
      id={`${HERO}-${name}`}
      name={name}
      label={label}
      value={value}
      onChange={(v) => setCommute({ [name]: v, by: HERO })}
      options={areas}
      className="min-w-0 flex-1"
      panelClassName="@[700px]:min-w-[320px]"
      triggerClassName="flex min-h-[64px] w-full items-center gap-3.5 rounded-[22px] px-4 text-left transition-colors duration-150 hover:bg-brand aria-expanded:bg-brand @[700px]:rounded-full @[700px]:px-5"
    >
      <span className="relative z-[2] grid w-[26px] flex-none place-items-center">{marker}</span>
      <span className="min-w-0 flex-1">
        <span aria-hidden="true" className="block text-[14px] leading-tight font-semibold">
          {label}
        </span>
        <span className={`block truncate text-[17px] leading-snug ${value ? "font-semibold" : "text-ink-soft"}`}>{value || "Choose an area"}</span>
      </span>
      <Chevron className="h-5 w-5 flex-none transition-transform duration-150 group-aria-expanded:rotate-180" />
    </Dropdown>
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

  const button = `${buttonClasses("primary")} min-h-[56px] flex-none @[700px]:ml-1`;

  return (
    <div className="@container">
      <form action="/#waitlist" onSubmit={goToWaitlist} className="relative flex flex-col gap-1.5 rounded-surface bg-screen p-2 @[700px]:flex-row @[700px]:items-center @[700px]:gap-0 @[700px]:rounded-full">
        {/* The bar lays itself out by the room it has, not the screen. Stacked, the route runs down the left, from the start dot to the car. */}
        <span aria-hidden="true" className="absolute top-[40px] left-[35px] z-[1] h-[70px] w-[4px] rounded-full bg-accent-strong @[700px]:hidden" />
        <Area name="from" label="I start in" value={from} areas={startAreas} marker={<span className="block h-3.5 w-3.5 rounded-full bg-ink" />} />
        <span aria-hidden="true" className="hidden h-[4px] w-7 flex-none rounded-full bg-accent-strong @[700px]:block" />
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

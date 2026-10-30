import type { ReactNode } from "react";
import { Tick } from "@/components/ui/icons";
import { Section } from "@/components/ui/Section";
import { exampleTrip, TripCard } from "@/features/trips/TripCard";
import { reveal } from "@/lib/reveal";

export function WhatItIsSection() {
  return (
    <Section labelledBy="what-title">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
        <h2 id="what-title" className="t-h2 lg:col-span-5" {...reveal(0)}>
          A seat on your way to work.
        </h2>
        <p className="font-display text-[clamp(24px,2.5vw,34px)] leading-[1.28] font-bold lg:col-span-7" {...reveal(1)}>
          Someone near you already drives your route every morning. RydCo gives you their spare seat{" "}
          <Chip className="bg-panel">2 seats left</Chip>, a fair share of the fuel cost <Chip className="bg-ink text-surface">Rs 180</Chip>, and a
          driver we have checked{" "}
          <Chip className="gap-[0.35em] bg-trust text-on-trust">
            <Tick /> Licence checked
          </Chip>
          .
        </p>
      </div>

      <div className="mt-20 grid items-center gap-12 lg:mt-32 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6" {...reveal(2)}>
          <TripCard trip={exampleTrip} label="Example" />
        </div>
        <div className="lg:col-span-5 lg:col-start-8" {...reveal(3)}>
          <h3 className="t-h2">What does a seat cost?</h3>
          <div className="mt-6 grid gap-4">
            <p>
              You pay a share of the fuel, not a fare. RydCo works it out from the distance, the car and the fuel price, and locks it when the driver
              publishes the ride.
            </p>
            <p>When another rider joins, everyone&rsquo;s share goes down.</p>
            <p>Pay the driver directly by cash, JazzCash, NayaPay or bank transfer. RydCo never handles your money.</p>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Chip({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-full px-[0.75em] py-[0.35em] align-[0.2em] font-sans text-[0.5em] leading-none font-semibold whitespace-nowrap ${className}`}>
      {children}
    </span>
  );
}

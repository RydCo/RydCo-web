"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { buttonClasses } from "@/components/ui/button-styles";
import { riderCta } from "@/config/cta";
import { prefersReducedMotion } from "@/hooks/use-reduced-motion";
import { RoutePicker } from "./RoutePicker";

// The route picker as the hero's main action, the way Uber opens on its trip planner and Airbnb on its search bar.

const HERO = "hero";

// Without JavaScript the form still lands on the waitlist; with it, scroll there and put the cursor in the name field.
function goToWaitlist(e: { preventDefault(): void }) {
  const target = document.getElementById("waitlist");
  if (!target) return;
  e.preventDefault();
  const still = prefersReducedMotion();
  target.scrollIntoView({ behavior: still ? "auto" : "smooth", block: "start" });
  target.querySelector<HTMLInputElement>("input[name=name]")?.focus({ preventScroll: true });
}

export function HeroRouteCheck({ aside }: { aside?: ReactNode }) {
  const cta = riderCta();
  const place = "mt-1 w-full";

  return (
    <div>
      <form action="/#waitlist" onSubmit={goToWaitlist}>
        <RoutePicker
          me={HERO}
          action={
            cta.external ? (
              <Button href={cta.href} external size="lg" className={place}>
                {cta.label}
              </Button>
            ) : (
              <button type="submit" className={`${buttonClasses("primary", "lg")} ${place}`}>
                {cta.label}
              </button>
            )
          }
        />
      </form>
      {aside && <div className="mt-4">{aside}</div>}
    </div>
  );
}

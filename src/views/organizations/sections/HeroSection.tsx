import { RouteConverge } from "@/components/brand/RouteConverge";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { pilot } from "@/config/pilot";

// Four of the pilot's home areas, drawn joining one line to the office.
const homes = pilot.starts
  .filter((a) => a.covered)
  .slice(0, 4)
  .map((a) => a.name);

export function HeroSection() {
  return (
    <PageHero
      ground="ink"
      title={
        <>
          Better commutes, <span className="whitespace-nowrap">built together.</span>
        </>
      }
      lead="Companies can give their teams a cheaper, safer way to get to work. Sponsors and partners can help it reach more of Pakistan."
      actions={
        <>
          <Button href="#companies">For companies</Button>
          <Button href="#partners" variant="secondary">
            For sponsors and partners
          </Button>
        </>
      }
      aside={<RouteConverge from={homes} to="Your office" className="mx-auto max-w-[560px]" />}
    />
  );
}

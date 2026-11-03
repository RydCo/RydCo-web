import { PageHero } from "@/components/ui/PageHero";
import { site } from "@/config/site";

export function HeroSection() {
  return (
    <PageHero
      title={
        <>
          How Pakistan gets to work, <span className="whitespace-nowrap">greener.</span>
        </>
      }
      lead={`RydCo is carpooling for daily commuters. We match people already going the same way, so a seat that would go empty carries a neighbour, a colleague or a classmate instead. ${site.pilotLine}.`}
    />
  );
}

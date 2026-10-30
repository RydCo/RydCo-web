import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { riderCta } from "@/config/cta";
import { site } from "@/config/site";
import { AppTour } from "@/features/app-preview/AppTour";
import { RequestScreen } from "@/features/app-preview/screens/RequestScreen";
import { ResultsScreen } from "@/features/app-preview/screens/ResultsScreen";
import { SettleScreen } from "@/features/app-preview/screens/SettleScreen";
import { TripLiveScreen } from "@/features/app-preview/screens/TripLiveScreen";

// The hero's tour: the heart of the flow on one phone, before the step-by-step below.
const tour = [
  { title: "Find a ride", screen: <ResultsScreen /> },
  { title: "Request a seat", screen: <RequestScreen /> },
  { title: "Ride together", screen: <TripLiveScreen /> },
  { title: "Settle up", screen: <SettleScreen /> },
];

export function HeroSection() {
  // The waitlist form is at the bottom of this page, so the hero button scrolls to it rather than leaving.
  const cta = site.playStoreUrl ? riderCta() : { label: "Join the waitlist", href: "#check", external: false };
  return (
    <PageHero
      ground="surface"
      title={
        <>
          Your first ride, <span className="whitespace-nowrap">step by step.</span>
        </>
      }
      lead="Here's exactly what happens in the RydCo app, from the first screen to settling up with your driver."
      actions={
        <>
          <Button href={cta.href} external={cta.external}>
            {cta.label}
          </Button>
          <Button href="#questions" variant="secondary">
            Questions
          </Button>
        </>
      }
      // On phones each step below already has its screen, so the tour is for wider screens only.
      aside={<AppTour slides={tour} />}
      asideClassName="hidden lg:block"
    />
  );
}

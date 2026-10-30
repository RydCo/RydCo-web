import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { driverCta } from "@/config/cta";
import { PhoneFrame } from "@/features/app-preview/PhoneFrame";
import { SharesScreen } from "@/features/app-preview/screens/SharesScreen";

export function HeroSection() {
  const cta = driverCta();
  return (
    <PageHero
      title="Earn back your fuel cost."
      lead="You already drive to work. Offer your empty seats to people going the same way, and they share the cost of the fuel."
      actions={
        <>
          <Button href={cta.href} external={cta.external} variant="onBrand">
            {cta.label}
          </Button>
          <Button href="#share" variant="surface">
            How the share works
          </Button>
        </>
      }
      aside={
        <PhoneFrame label="Riders' shares worked out for a driver in the RydCo app: Rs 245 with one rider, Rs 180 each with two">
          <SharesScreen />
        </PhoneFrame>
      }
    />
  );
}

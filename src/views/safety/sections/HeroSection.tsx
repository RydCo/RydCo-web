import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { riderCta } from "@/config/cta";
import { PhoneFrame } from "@/features/app-preview/PhoneFrame";
import { DriverProfileScreen } from "@/features/app-preview/screens/DriverProfileScreen";

export function HeroSection() {
  const cta = riderCta();
  return (
    <PageHero
      title={
        <>
          Know who you&rsquo;re <span className="whitespace-nowrap">riding with.</span>
        </>
      }
      lead="Every driver is checked, and every trip has tools that keep your family in the loop."
      actions={
        <>
          <Button href={cta.href} external={cta.external}>
            {cta.label}
          </Button>
          <Button href="#checks" variant="secondary">
            See the checks
          </Button>
        </>
      }
      aside={
        <PhoneFrame label="A driver's profile in the RydCo app, showing phone, CNIC, live selfie, licence and vehicle checks">
          <DriverProfileScreen />
        </PhoneFrame>
      }
    />
  );
}

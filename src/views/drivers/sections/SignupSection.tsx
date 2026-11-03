import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { appLive, driverCta } from "@/config/cta";
import { WaitlistForm } from "@/features/waitlist/WaitlistForm";
import { reveal } from "@/lib/reveal";

export function SignupSection() {
  const cta = driverCta();
  return (
    <Section ground="brand" id="driver-signup" labelledBy="drive-cta-title">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionHeading id="drive-cta-title" title="Ready to offer a seat?" lead="Tell us your route and when you leave. We&rsquo;ll get you set up as one of the first drivers on the Lahore pilot." />
          <div className="mt-6 flex flex-wrap gap-2" {...reveal(2)}>
            <Badge tone="neutral">Review target: 24 hours</Badge>
          </div>
        </div>
        <div className="lg:col-span-7" {...reveal(2)}>
          {appLive ? (
            <Button href={cta.href} external={cta.external}>
              {cta.label}
            </Button>
          ) : (
            <Card>
              <WaitlistForm startAs="drive" />
            </Card>
          )}
        </div>
      </div>
    </Section>
  );
}

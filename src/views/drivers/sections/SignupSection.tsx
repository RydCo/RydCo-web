import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { driverCta } from "@/config/cta";
import { site } from "@/config/site";
import { DriverForm } from "@/features/driver-signup/DriverForm";
import { reveal } from "@/lib/reveal";

export function SignupSection() {
  const cta = driverCta();
  return (
    <Section ground="ink" id="driver-signup" labelledBy="drive-cta-title">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <h2 id="drive-cta-title" className="t-h2" {...reveal(0)}>
            Ready to offer a seat?
          </h2>
          <p className="mt-5 max-w-[40ch]" {...reveal(1)}>
            Tell us your route and when you leave. We&rsquo;ll get you set up as one of the first drivers on the Lahore pilot.
          </p>
          <div className="mt-6 flex flex-wrap gap-2" {...reveal(2)}>
            <Badge tone="neutral">Review target: 24 hours</Badge>
          </div>
        </div>
        <div className="lg:col-span-7" {...reveal(2)}>
          {site.playStoreUrl ? (
            <Button href={cta.href} external={cta.external} variant="brand">
              {cta.label}
            </Button>
          ) : (
            <div className="on-light rounded-surface bg-panel p-6 text-ink md:p-8">
              <DriverForm />
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}

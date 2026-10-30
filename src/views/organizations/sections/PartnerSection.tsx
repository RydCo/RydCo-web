import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { partnerEnquiry } from "@/config/contact";
import { site } from "@/config/site";
import { reveal } from "@/lib/reveal";

export function PartnerSection() {
  return (
    <Section ground="brand" labelledBy="partner-title">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <h2 id="partner-title" className="t-h2" {...reveal(0)}>
            Partner with us
          </h2>
          <p className="mt-6 max-w-[48ch] t-lead" {...reveal(1)}>
            We&rsquo;re looking for incubators, sponsors and employers who want better daily commutes in Pakistan, and want to help the Lahore pilot grow.
          </p>
        </div>
        <div className="flex flex-col items-start gap-4 lg:col-span-4 lg:items-end" {...reveal(2)}>
          <Button href={partnerEnquiry} variant="onBrand">
            Partner with us
          </Button>
          <a href={`mailto:${site.email}`} className="py-1 t-link">
            {site.email}
          </a>
        </div>
      </div>
    </Section>
  );
}

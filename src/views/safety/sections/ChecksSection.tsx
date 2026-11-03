import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { driverChecks } from "@/config/checks";
import { reveal } from "@/lib/reveal";

export function ChecksSection() {
  return (
    <Section id="checks" labelledBy="checks-title">
      <SectionHeading layout="split" id="checks-title" title="Before anyone drives" lead="Every check must pass before a driver can publish a ride." />
      <ul className="mt-14 grid gap-2">
        {driverChecks.map((c, i) => (
          <Card as="li" key={c.name} className="grid gap-4 md:grid-cols-12 md:gap-8" {...reveal(2 + i)}>
            <div className="md:col-span-3">
              <h3 className="t-title">{c.name}</h3>
              <p className="mt-3 text-[18px]">
                <Badge>{c.badge}</Badge>
              </p>
            </div>
            <div className="md:col-span-5">
              <p className="font-semibold">What we check</p>
              <p className="mt-1">{c.is}</p>
            </div>
            <div className="md:col-span-4">
              <p className="font-semibold">What it doesn&rsquo;t mean</p>
              <p className="mt-1">{c.isNot}</p>
            </div>
          </Card>
        ))}
      </ul>
    </Section>
  );
}

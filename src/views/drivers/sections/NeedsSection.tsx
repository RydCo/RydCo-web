import { BulletTitle } from "@/components/ui/BulletTitle";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { driverChecks } from "@/config/checks";
import { ChecklistScreen } from "@/features/app-preview/screens/ChecklistScreen";
import { StickyPhone } from "@/features/app-preview/StickyPhone";
import { reveal } from "@/lib/reveal";

export function NeedsSection() {
  return (
    <Section labelledBy="needs-title">
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <SectionHeading id="needs-title" title="What you need" lead="Four checks, done once, before you can publish a ride." />
          <ul className="mt-12 grid gap-10 sm:grid-cols-2 sm:gap-x-10">
            {driverChecks.map((c, i) => (
              <li key={c.name} {...reveal(2 + i)}>
                <BulletTitle>{c.name}</BulletTitle>
                <p className="mt-2 sm:pl-6">{c.need}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-4 lg:col-start-9" {...reveal(3)}>
          <StickyPhone label="The driver checklist in the RydCo app: identity, live selfie, driving licence, vehicle, submit">
            <ChecklistScreen />
          </StickyPhone>
        </div>
      </div>
    </Section>
  );
}

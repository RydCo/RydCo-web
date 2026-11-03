import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WaitlistForm } from "@/features/waitlist/WaitlistForm";
import { reveal } from "@/lib/reveal";

export function FirstRideSection() {
  return (
    <Section ground="brand" id="check" labelledBy="first-ride-title">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionHeading id="first-ride-title" title="Ready for your first ride?" lead="Check that your route is on the pilot, then get on the list." />
        </div>
        <Card className="lg:col-span-7" {...reveal(2)}>
          <WaitlistForm />
        </Card>
      </div>
    </Section>
  );
}

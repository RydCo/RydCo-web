import { Section } from "@/components/ui/Section";
import { WaitlistForm } from "@/features/waitlist/WaitlistForm";
import { reveal } from "@/lib/reveal";

export function FirstRideSection() {
  return (
    <Section ground="brand" id="check" labelledBy="first-ride-title">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <h2 id="first-ride-title" className="t-h2" {...reveal(0)}>
            Ready for your first ride?
          </h2>
          <p className="mt-5 max-w-[40ch]" {...reveal(1)}>
            Check that your route is on the pilot, then get on the list.
          </p>
        </div>
        <div className="rounded-surface bg-panel p-6 md:p-8 lg:col-span-7" {...reveal(2)}>
          <WaitlistForm />
        </div>
      </div>
    </Section>
  );
}

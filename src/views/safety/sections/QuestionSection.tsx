import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { safetyEnquiry } from "@/config/contact";
import { reveal } from "@/lib/reveal";

export function QuestionSection() {
  return (
    <Section ground="cocoa" labelledBy="safety-q-title">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <h2 id="safety-q-title" className="t-h2" {...reveal(0)}>
            A question about safety?
          </h2>
          <p className="mt-5 max-w-[48ch]" {...reveal(1)}>
            Write to us and a person will answer. During a trip, use SOS or Report in the app.
          </p>
        </div>
        <div className="lg:col-span-4 lg:justify-self-end" {...reveal(2)}>
          <Button href={safetyEnquiry} variant="apricot">
            Send us a message
          </Button>
        </div>
      </div>
    </Section>
  );
}

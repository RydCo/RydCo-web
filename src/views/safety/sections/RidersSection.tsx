import { Section } from "@/components/ui/Section";
import { reveal } from "@/lib/reveal";

export function RidersSection() {
  return (
    <Section ground="brand" labelledBy="riders-title">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
        <h2 id="riders-title" className="t-h2 lg:col-span-6" {...reveal(0)}>
          Every rider is phone verified
        </h2>
        <div className="grid gap-5 lg:col-span-5 lg:col-start-8" {...reveal(1)}>
          <p>Every account starts with a Pakistani mobile number, confirmed by a code sent by SMS. That&rsquo;s all &ldquo;Phone verified&rdquo; means.</p>
        </div>
      </div>
    </Section>
  );
}

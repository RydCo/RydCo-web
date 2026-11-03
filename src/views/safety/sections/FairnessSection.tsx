import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fairnessRules } from "@/config/rules";
import { reveal } from "@/lib/reveal";

export function FairnessSection() {
  return (
    <Section ground="panel" labelledBy="fair-title">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-10">
        <div>
          <SectionHeading id="fair-title" title="Fair for everyone" lead="A seat someone is counting on should be there. So cancelling late or not showing up has a cost, for riders and drivers alike." />
        </div>
        <ul className="grid gap-4 self-end" {...reveal(2)}>
          {fairnessRules.map((r) => (
            <Card as="li" key={r.when} tone="surface" pad="sm">
              <b>{r.when}:</b> {r.then}
            </Card>
          ))}
        </ul>
      </div>
    </Section>
  );
}

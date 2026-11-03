import { Section } from "@/components/ui/Section";
import { TickItem } from "@/components/ui/TickItem";
import { reveal } from "@/lib/reveal";

const yourRules = [
  "Pause new requests anytime. Confirmed riders keep their seat.",
  "Wait 3 minutes at a pickup, then mark a no-show. The rider owes their full share.",
  "Your number stays hidden, and only confirmed riders see your payment details.",
];

export function RulesSection() {
  return (
    <Section ground="panel" labelledBy="rules-title">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <h2 id="rules-title" className="t-h2" {...reveal(0)}>
            Your car, your rules
          </h2>
          <p className="mt-6 max-w-[40ch]" {...reveal(1)}>
            RydCo is cost-sharing, not a taxi service. You drive the commute you already make, on your terms.
          </p>
        </div>
        <ul className="grid gap-4 lg:col-span-6 lg:col-start-7" {...reveal(2)}>
          {yourRules.map((r) => (
            <TickItem key={r}>{r}</TickItem>
          ))}
        </ul>
      </div>
    </Section>
  );
}

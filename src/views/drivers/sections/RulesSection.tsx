import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TickItem } from "@/components/ui/TickItem";
import { pickupWaitRule } from "@/config/rules";
import { reveal } from "@/lib/reveal";

const yourRules = [
  "You choose the seats, the days and the departure window.",
  "Pause new requests anytime. Confirmed riders keep their seat.",
  pickupWaitRule,
  "A rider who doesn't show up owes their full share and gets a strike.",
  "Phone numbers stay hidden both ways. Chat happens in the app, and your payment details show only to confirmed riders.",
];

export function RulesSection() {
  return (
    <Section ground="panel" labelledBy="rules-title">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionHeading id="rules-title" title="Your car, your rules" lead="RydCo is cost-sharing, not a taxi service. You drive the commute you already make, on your terms." />
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

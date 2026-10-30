import { Section } from "@/components/ui/Section";
import { TickItem } from "@/components/ui/TickItem";
import { reveal } from "@/lib/reveal";

const yourRules = [
  "You choose the seats, the days and the departure window.",
  "Pause new requests anytime. Confirmed riders keep their seat.",
  "At each pickup, a 3-minute wait timer runs before you can mark a no-show.",
  "A rider who doesn't show up owes their full share and gets a strike.",
  "Phone numbers stay hidden both ways. Chat happens in the app, and your payment details show only to confirmed riders.",
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

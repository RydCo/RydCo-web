import { Section } from "@/components/ui/Section";
import { SafetyBoard } from "@/views/home/components/SafetyBoard";
import { SafetyDeck } from "@/views/home/components/SafetyDeck";

export function SafetySection() {
  return (
    <Section ground="ink" labelledBy="safety-title" className="[&>div]:max-w-none [&>div]:px-0">
      <SafetyDeck>
        <div className="wrap">
          <SafetyBoard />
        </div>
      </SafetyDeck>
    </Section>
  );
}

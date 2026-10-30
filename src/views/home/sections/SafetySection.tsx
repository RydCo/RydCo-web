import { Section } from "@/components/ui/Section";
import { SafetyBoard } from "@/views/home/components/SafetyBoard";

export function SafetySection() {
  return (
    <Section ground="ink" labelledBy="safety-title">
      <SafetyBoard />
    </Section>
  );
}

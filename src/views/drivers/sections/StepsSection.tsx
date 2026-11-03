import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StepTimeline } from "@/components/ui/StepTimeline";

const steps = [
  { title: "Get checked", text: "Send your documents in the app. We aim to review them within 24 hours." },
  { title: "Publish your commute", text: "Set your route, departure window, weekdays and seats." },
  { title: "Accept riders", text: "See the minutes each request adds, and choose who rides." },
  { title: "Drive and settle", text: "Pick everyone up, and riders pay you when you arrive." },
];

export function StepsSection() {
  return (
    <Section labelledBy="drive-steps-title">
      <SectionHeading id="drive-steps-title" title="How driving with RydCo works" />
      <StepTimeline steps={steps} />
    </Section>
  );
}

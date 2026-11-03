import { Section } from "@/components/ui/Section";
import { StepTimeline } from "@/components/ui/StepTimeline";
import { reveal } from "@/lib/reveal";

const steps = [
  { title: "Get checked", text: "Send your documents in the app. We aim to review them within 24 hours." },
  { title: "Publish your commute", text: "Set your route, departure window, weekdays and seats." },
  { title: "Accept riders", text: "See the minutes each request adds, and choose who rides." },
  { title: "Drive and settle", text: "Pick everyone up, and riders pay you when you arrive." },
];

export function StepsSection() {
  return (
    <Section labelledBy="drive-steps-title">
      <h2 id="drive-steps-title" className="t-h2" {...reveal(0)}>
        How driving with RydCo works
      </h2>
      <StepTimeline steps={steps} />
    </Section>
  );
}

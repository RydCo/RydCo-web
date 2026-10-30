import { Section } from "@/components/ui/Section";
import { StepTimeline } from "@/components/ui/StepTimeline";
import { reveal } from "@/lib/reveal";

const steps = [
  { title: "Get checked", text: "Send your documents in the app. We aim to review them within 24 hours, and you can ride as a rider while you wait." },
  { title: "Publish your commute", text: "Set your route, departure window, weekdays and how many seats you offer. You can use the car you've had approved." },
  { title: "Accept riders", text: "You see each request with the minutes it adds to your trip. Pickup order follows the road, and you choose who rides." },
  { title: "Drive and settle", text: "Start the trip, pick everyone up, and riders pay you their share when you arrive." },
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

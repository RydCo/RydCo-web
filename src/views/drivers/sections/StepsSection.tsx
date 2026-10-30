import { Section } from "@/components/ui/Section";
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
      <ol className="relative mt-14 grid gap-10 before:absolute before:top-[10px] before:bottom-[10px] before:left-[9px] before:w-[4px] before:rounded-full before:bg-cocoa md:grid-cols-4 md:gap-8 md:before:top-[9px] md:before:right-[calc(25%-35px)] md:before:bottom-auto md:before:left-[9px] md:before:h-[4px] md:before:w-auto">
        {steps.map((s, i) => (
          <li key={s.title} className="relative pl-12 md:pt-14 md:pl-0" {...reveal(1 + i)}>
            <span aria-hidden="true" className={`absolute top-0 left-0 h-[22px] w-[22px] rounded-full ${i === steps.length - 1 ? "border-[5px] border-cocoa bg-cream" : "bg-cocoa"}`} />
            <h3 className="t-title">{s.title}</h3>
            <p className="mt-2">{s.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

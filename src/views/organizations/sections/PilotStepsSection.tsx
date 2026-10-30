import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { pilotEnquiry } from "@/config/contact";
import { reveal } from "@/lib/reveal";

const pilotSteps = [
  { title: "Map your commute", text: "Tell us where your office is and which areas your team lives in. We check them against our coverage." },
  { title: "Your team joins", text: "People sign up with a phone number. Anyone who wants to drive completes the driver checks." },
  { title: "Ride together", text: "RydCo matches people heading to your office on the same route, on weekday commutes." },
  { title: "Review it together", text: "At the end of the pilot we sit down with you: what worked, what didn't, and what to change." },
];

export function PilotStepsSection() {
  return (
    <Section ground="panel" labelledBy="steps-title">
      <h2 id="steps-title" className="t-h2 max-w-[16em]" {...reveal(0)}>
        How a pilot with your company works
      </h2>
      <ol className="relative mt-14 grid gap-10 before:absolute before:top-[10px] before:bottom-[10px] before:left-[9px] before:w-[4px] before:rounded-full before:bg-ink md:grid-cols-4 md:gap-8 md:before:top-[9px] md:before:right-[calc(25%-35px)] md:before:bottom-auto md:before:left-[9px] md:before:h-[4px] md:before:w-auto">
        {pilotSteps.map((s, i) => (
          <li key={s.title} className="relative pl-12 md:pt-14 md:pl-0" {...reveal(1 + i)}>
            <span aria-hidden="true" className={`absolute top-0 left-0 h-[22px] w-[22px] rounded-full ${i === pilotSteps.length - 1 ? "border-[5px] border-ink bg-panel" : "bg-ink"}`} />
            <h3 className="t-title">{s.title}</h3>
            <p className="mt-2">{s.text}</p>
          </li>
        ))}
      </ol>
      <div className="mt-16 grid gap-8 rounded-surface bg-surface p-8 md:p-10 lg:grid-cols-12 lg:items-center" {...reveal(5)}>
        <div className="lg:col-span-8">
          <h3 className="t-title">What we need from you</h3>
          <p className="mt-2 max-w-[56ch]">An office address, one contact person on your side, and help letting your team know RydCo is there.</p>
        </div>
        <div className="lg:col-span-4 lg:justify-self-end">
          <Button href={pilotEnquiry}>Talk to us about a pilot</Button>
        </div>
      </div>
    </Section>
  );
}

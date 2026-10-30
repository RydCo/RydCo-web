import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { reveal } from "@/lib/reveal";
import { ManyIntoOne } from "@/views/home/components/ManyIntoOne";

export function HowItWorksSection() {
  return (
    <Section ground="panel" labelledBy="how-title">
      <div className="grid gap-6 lg:grid-cols-12">
        <h2 id="how-title" className="t-h2 lg:col-span-6" {...reveal(0)}>
          How RydCo works
        </h2>
        <p className="max-w-[40ch] lg:col-span-5 lg:col-start-8 lg:self-end" {...reveal(1)}>
          Three steps, all in the app. Nothing is booked until the driver says yes.
        </p>
      </div>
      <div className="mt-12 lg:mt-16" {...reveal(2)}>
        <ManyIntoOne />
      </div>
      <ol className="mt-10 grid gap-8 md:grid-cols-3 md:gap-10">
        {[
          ["Find", "Tell us where you start, where you’re headed and when. We show drivers already going that way."],
          ["Request", "Ask for a seat. The driver accepts or declines, and the seat is yours once they confirm."],
          ["Ride and split", "Meet at the pickup point, ride together, and pay your share to the driver directly."],
        ].map(([title, text], i) => (
          <li key={title} {...reveal(3 + i)}>
            <h3 className="t-title">{title}</h3>
            <p className="mt-2">{text}</p>
          </li>
        ))}
      </ol>
      <div className="mt-10" {...reveal(6)}>
        <Button href="/how-it-works/" variant="ghost">
          See every step in the app
        </Button>
      </div>
    </Section>
  );
}

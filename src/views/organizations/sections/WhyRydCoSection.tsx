import { Section } from "@/components/ui/Section";
import { reveal } from "@/lib/reveal";

export function WhyRydCoSection() {
  return (
    <Section id="partners" labelledBy="why-title">
      <h2 id="why-title" className="t-h2" {...reveal(0)}>
        Why we&rsquo;re building RydCo
      </h2>
      <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-10 lg:mt-16">
        <div {...reveal(1)}>
          <h3 className="t-title">The problem</h3>
          <p className="mt-3 max-w-[48ch]">
            Every morning, cars leave the same neighbourhoods for the same offices and campuses with seats empty. The people who could fill them have few ways to get
            to work that they can plan, afford and trust.
          </p>
        </div>
        <div {...reveal(2)}>
          <h3 className="t-title">What RydCo does</h3>
          <p className="mt-3 max-w-[48ch]">
            RydCo fills those seats. It matches commuters going the same way, checks every driver before they can offer a ride, and works out a fair share of the
            fuel. Drivers earn back their fuel cost, and riders pay less than going alone.
          </p>
        </div>
      </div>
    </Section>
  );
}

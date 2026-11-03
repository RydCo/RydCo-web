import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { paymentMethods } from "@/config/payments";
import { reveal } from "@/lib/reveal";

export function PaidSection() {
  return (
    <Section ground="brand" labelledBy="paid-title">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-6">
          <SectionHeading id="paid-title" title="Riders pay you directly" lead="RydCo never handles the money. Riders pay you after each trip, and you confirm you received it." />
        </div>
        <ul className="flex flex-wrap gap-3 lg:col-span-5 lg:col-start-8" {...reveal(2)}>
          {paymentMethods.map((m) => (
            <li key={m.name} className="rounded-full bg-surface px-6 py-4 font-display text-[22px] font-bold">
              {m.name}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

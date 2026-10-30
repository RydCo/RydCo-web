import { Section } from "@/components/ui/Section";
import { reveal } from "@/lib/reveal";

export function PaidSection() {
  return (
    <Section ground="apricot" labelledBy="paid-title">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-6">
          <h2 id="paid-title" className="t-h2" {...reveal(0)}>
            Riders pay you directly
          </h2>
          <p className="mt-6 max-w-[44ch]" {...reveal(1)}>
            RydCo suggests the share but never handles the money. After each trip the rider pays you and taps &ldquo;I sent the payment&rdquo;. You confirm you
            received it, and the trip is settled.
          </p>
        </div>
        <ul className="flex flex-wrap gap-3 lg:col-span-5 lg:col-start-8" {...reveal(2)}>
          {["Cash", "JazzCash", "NayaPay", "Bank / Raast"].map((m) => (
            <li key={m} className="rounded-full bg-cream px-6 py-4 font-display text-[22px] font-bold">
              {m}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

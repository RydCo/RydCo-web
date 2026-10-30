import { Section } from "@/components/ui/Section";
import { reveal } from "@/lib/reveal";

export function FairnessSection() {
  return (
    <Section ground="panel" labelledBy="fair-title">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-10">
        <div>
          <h2 id="fair-title" className="t-h2" {...reveal(0)}>
            Fair for everyone
          </h2>
          <p className="mt-6 max-w-[46ch]" {...reveal(1)}>
            A seat someone is counting on should be there. So cancelling late or not showing up has a cost, for riders and drivers alike.
          </p>
        </div>
        <ul className="grid gap-4 self-end" {...reveal(2)}>
          <li className="rounded-surface bg-surface p-6">
            <b>Cancel more than 60 minutes before:</b> free.
          </li>
          <li className="rounded-surface bg-surface p-6">
            <b>Cancel within 60 minutes:</b> free, but it adds a late-cancel strike.
          </li>
          <li className="rounded-surface bg-surface p-6">
            <b>Not at the pickup point:</b> the driver waits 3 minutes, then the rider owes their share and gets a strike.
          </li>
          <li className="rounded-surface bg-surface p-6">
            <b>Three strikes:</b> the account is paused while a person reviews it.
          </li>
        </ul>
      </div>
    </Section>
  );
}

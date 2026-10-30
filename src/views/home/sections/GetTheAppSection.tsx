import { Section } from "@/components/ui/Section";
import { pilot } from "@/config/pilot";
import { site } from "@/config/site";
import { PhoneFrame } from "@/features/app-preview/PhoneFrame";
import { WelcomeScreen } from "@/features/app-preview/screens/WelcomeScreen";
import { WaitlistForm } from "@/features/waitlist/WaitlistForm";
import { reveal } from "@/lib/reveal";

export function GetTheAppSection() {
  const live = Boolean(site.playStoreUrl);
  return (
    <Section ground="panel" id="waitlist" labelledBy="app-title">
      <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="order-2 lg:order-1 lg:col-span-5" {...reveal(2)}>
          <PhoneFrame label="The first screen of the RydCo app: Assalam o alaikum. I'm RydCo. How would you like to travel?">
            <WelcomeScreen />
          </PhoneFrame>
        </div>
        <div className="order-1 lg:order-2 lg:col-span-7">
          <h2 id="app-title" className="t-h2" {...reveal(0)}>
            Get the RydCo app.
          </h2>
          <p className="mt-5 max-w-[46ch]" {...reveal(1)}>
            {live
              ? "It runs on the Lahore pilot routes. Check that yours is covered, then download it and request your first seat."
              : "It opens first on the Lahore pilot routes. Check that yours is covered, then join the waitlist and we’ll message you when it’s ready to download."}
          </p>
          <div className="mt-8" {...reveal(2)}>
            <WaitlistForm />
          </div>
          <details className="group mt-8">
            <summary className="inline-flex cursor-pointer list-none items-center gap-2 py-2 font-semibold underline decoration-2 underline-offset-[6px]">
              See all pilot areas
            </summary>
            <div className="mt-4 grid gap-6 sm:grid-cols-2">
              <AreaList title="Where you start" areas={pilot.starts} />
              <AreaList title="Where you're headed" areas={pilot.destinations} />
            </div>
          </details>
        </div>
      </div>
    </Section>
  );
}

function AreaList({ title, areas }: { title: string; areas: { name: string; covered: boolean }[] }) {
  return (
    <div>
      <h3 className="font-semibold">{title}</h3>
      <ul className="mt-2 grid gap-1">
        {areas.map((a) => (
          <li key={a.name}>
            {a.name}
            {!a.covered && <span className="text-ink-soft"> (not covered yet)</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

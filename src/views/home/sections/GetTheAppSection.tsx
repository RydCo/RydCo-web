import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { appLive } from "@/config/cta";
import { pilot } from "@/config/pilot";
import { PhoneFrame } from "@/features/app-preview/PhoneFrame";
import { WelcomeScreen } from "@/features/app-preview/screens/WelcomeScreen";
import { WaitlistForm } from "@/features/waitlist/WaitlistForm";
import { reveal } from "@/lib/reveal";

export function GetTheAppSection() {
  return (
    <Section ground="panel" id="waitlist" labelledBy="app-title">
      <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="order-2 lg:order-1 lg:col-span-5" {...reveal(2)}>
          <PhoneFrame label="The first screen of the RydCo app: Assalam o alaikum. I'm RydCo. How would you like to travel?">
            <WelcomeScreen />
          </PhoneFrame>
        </div>
        <div className="order-1 lg:order-2 lg:col-span-7">
          <SectionHeading id="app-title" title="Get the RydCo app." lead={<>{appLive ? "It runs on the Lahore pilot routes. Check that yours is covered, then download it and request your first seat." : "It opens first on the Lahore pilot routes. Check that yours is covered, then join the waitlist and we’ll message you when it’s ready to download."}</>} />
          <div className="mt-8" {...reveal(2)}>
            <WaitlistForm />
          </div>
          <details className="group mt-8">
            <summary className="inline-flex cursor-pointer list-none items-center gap-2 py-2 t-link">
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
        {areas
          .filter((a) => a.covered)
          .map((a) => (
            <li key={a.name}>{a.name}</li>
          ))}
      </ul>
    </div>
  );
}

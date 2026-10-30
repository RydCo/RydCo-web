import { Section } from "@/components/ui/Section";
import { TickItem } from "@/components/ui/TickItem";
import { pilot } from "@/config/pilot";
import { site } from "@/config/site";
import { PhoneFrame } from "@/features/app-preview/PhoneFrame";
import { CoverageScreen } from "@/features/app-preview/screens/CoverageScreen";
import { reveal } from "@/lib/reveal";

const pilotFeatures = [
  "Sign up with a phone number",
  "Driver checks: CNIC, live selfie, licence and vehicle, reviewed within 24 hours",
  "Women-only rides",
  "Trip sharing with a trusted contact, and SOS on every trip",
  "Phone numbers stay hidden; chat opens once a seat is confirmed",
  "Fuel share worked out by the app, paid to the driver directly",
];

export function LahorePilotSection() {
  return (
    <Section labelledBy="pilot-title">
      <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="order-2 lg:order-1 lg:col-span-5" {...reveal(2)}>
          <PhoneFrame label="The Lahore pilot coverage map in the RydCo app">
            <CoverageScreen />
          </PhoneFrame>
        </div>
        <div className="order-1 lg:order-2 lg:col-span-7">
          <h2 id="pilot-title" className="t-h2" {...reveal(0)}>
            The Lahore pilot
          </h2>
          <p className="mt-6 max-w-[50ch]" {...reveal(1)}>
            RydCo starts with weekday commutes on a set of routes in {site.city}, so we can get matching and safety right before we grow.
          </p>
          <h3 className="t-title mt-10" {...reveal(2)}>
            In the app
          </h3>
          <ul className="mt-4 grid gap-3" {...reveal(3)}>
            {pilotFeatures.map((f) => (
              <TickItem key={f}>{f}</TickItem>
            ))}
          </ul>
          <h3 className="t-title mt-10" {...reveal(4)}>
            Where it runs
          </h3>
          <p className="mt-3 max-w-[56ch]" {...reveal(5)}>
            From {listOf(pilot.starts.filter((a) => a.covered).map((a) => a.name))} to {listOf(pilot.destinations.map((a) => a.name))}.
          </p>
        </div>
      </div>
    </Section>
  );
}

function listOf(items: string[]) {
  if (items.length < 2) return items.join("");
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

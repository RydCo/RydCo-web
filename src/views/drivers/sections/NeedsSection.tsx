import { BulletTitle } from "@/components/ui/BulletTitle";
import { Section } from "@/components/ui/Section";
import { ChecklistScreen } from "@/features/app-preview/screens/ChecklistScreen";
import { StickyPhone } from "@/features/app-preview/StickyPhone";
import { reveal } from "@/lib/reveal";

const needs = [
  { title: "CNIC", text: "Punjab-issued, with photos of the front and back." },
  { title: "Live selfie", text: "Taken in the app. Gallery photos can't be used." },
  { title: "Driving licence", text: "A current car licence. Learner permits aren't accepted." },
  { title: "Vehicle", text: "Registration and photos with the plate visible. Not the owner? Add the owner's permission." },
];

export function NeedsSection() {
  return (
    <Section labelledBy="needs-title">
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <h2 id="needs-title" className="t-h2" {...reveal(0)}>
            What you need
          </h2>
          <p className="mt-6 max-w-[46ch]" {...reveal(1)}>
            Four checks, done once. A reviewer looks at each one before you can publish a ride.
          </p>
          <ul className="mt-12 grid gap-10 sm:grid-cols-2 sm:gap-x-10">
            {needs.map((n, i) => (
              <li key={n.title} {...reveal(2 + i)}>
                <BulletTitle>{n.title}</BulletTitle>
                <p className="mt-2 sm:pl-6">{n.text}</p>
              </li>
            ))}
          </ul>
          <p className="mt-12 max-w-[52ch] rounded-surface bg-panel p-6" {...reveal(6)}>
            You can prepare your commute while we review, and save your progress to finish later. You can publish rides once every check is approved.
          </p>
        </div>
        <div className="lg:col-span-4 lg:col-start-9" {...reveal(3)}>
          <StickyPhone label="The driver checklist in the RydCo app: identity, live selfie, driving licence, vehicle, submit">
            <ChecklistScreen />
          </StickyPhone>
        </div>
      </div>
    </Section>
  );
}

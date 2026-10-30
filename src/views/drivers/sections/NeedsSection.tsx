import { Section } from "@/components/ui/Section";
import { PhoneFrame } from "@/features/app-preview/PhoneFrame";
import { ChecklistScreen } from "@/features/app-preview/screens/ChecklistScreen";
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
                <h3 className="t-title flex items-start gap-3">
                  <span aria-hidden="true" className="mt-[0.35em] h-3 w-3 flex-none rounded-full bg-apricot-deep" />
                  {n.title}
                </h3>
                <p className="mt-2 sm:pl-6">{n.text}</p>
              </li>
            ))}
          </ul>
          <p className="mt-12 max-w-[52ch] rounded-[28px] bg-apricot-tint p-6" {...reveal(6)}>
            You can prepare your commute while we review, and save your progress to finish later. You can publish rides once every check is approved.
          </p>
        </div>
        <div className="lg:col-span-4 lg:col-start-9" {...reveal(3)}>
          <div className="lg:sticky lg:top-32">
            <PhoneFrame label="The driver checklist in the RydCo app: identity, live selfie, driving licence, vehicle, submit">
              <ChecklistScreen />
            </PhoneFrame>
          </div>
        </div>
      </div>
    </Section>
  );
}

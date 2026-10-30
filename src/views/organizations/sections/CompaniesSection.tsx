import { BulletTitle } from "@/components/ui/BulletTitle";
import { Section } from "@/components/ui/Section";
import { StopsScreen } from "@/features/app-preview/screens/StopsScreen";
import { StickyPhone } from "@/features/app-preview/StickyPhone";
import { reveal } from "@/lib/reveal";

// What a company deals with, and what RydCo does about each. Only features shown in the app.
const problems = [
  {
    title: "Commute cost",
    text: "Fuel eats into salaries. Colleagues who share a car split the fuel, so each person pays a share instead of the whole tank.",
  },
  {
    title: "Parking",
    text: "When people going the same way ride together, fewer cars arrive at your gate every morning.",
  },
  {
    title: "Late arrivals",
    text: "Every ride is planned ahead, with a set departure window and an estimated arrival time worked out from the road before anyone leaves home.",
  },
  {
    title: "Employee safety",
    text: "Every driver's CNIC, live selfie, licence and car are reviewed before they can offer a ride. Women-only rides, trip sharing and SOS are on every trip.",
  },
];

export function CompaniesSection() {
  return (
    <Section id="companies" labelledBy="companies-title">
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <h2 id="companies-title" className="t-h2" {...reveal(0)}>
            A commute your team will actually use.
          </h2>
          <p className="mt-6 max-w-[46ch]" {...reveal(1)}>
            RydCo matches people who travel the same way to work, so they share the car and split the fuel. Here is what that changes for you.
          </p>
          <ul className="mt-14 grid gap-12">
            {problems.map((p, i) => (
              <li key={p.title} className="grid gap-2 sm:grid-cols-[200px_1fr] sm:gap-8" {...reveal(2 + i)}>
                <BulletTitle>{p.title}</BulletTitle>
                <p>{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-4 lg:col-start-9" {...reveal(3)}>
          <StickyPhone label="A confirmed trip in the RydCo app: one car picks up colleagues in Model Town, Garden Town and Faisal Town on the way to Arfa Software Technology Park">
            <StopsScreen />
          </StickyPhone>
        </div>
      </div>
    </Section>
  );
}

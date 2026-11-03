import { BulletTitle } from "@/components/ui/BulletTitle";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StopsScreen } from "@/features/app-preview/screens/StopsScreen";
import { StickyPhone } from "@/features/app-preview/StickyPhone";
import { reveal } from "@/lib/reveal";

// What a company deals with, and what RydCo does about each. Only features shown in the app.
const problems = [
  {
    title: "Commute cost",
    text: "Colleagues who share a car split the fuel instead of each paying for a full tank.",
  },
  {
    title: "Parking",
    text: "Fewer cars arrive at your gate every morning.",
  },
  {
    title: "Late arrivals",
    text: "Every ride is planned ahead, with a set departure window and an estimated arrival.",
  },
  {
    title: "Employee safety",
    text: "Every driver is checked first, and every trip has women-only rides, trip sharing and SOS.",
  },
];

export function CompaniesSection() {
  return (
    <Section id="companies" labelledBy="companies-title">
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <SectionHeading id="companies-title" title="A commute your team will actually use." />
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

import { Badge } from "@/components/ui/Badge";
import { Section } from "@/components/ui/Section";
import { reveal } from "@/lib/reveal";

// Shortened from the app's own "Why?" sheets: what each check is, and what it is not.
const driverChecks = [
  {
    name: "CNIC",
    badge: "CNIC reviewed",
    is: "A reviewer compares the driver's details with their CNIC.",
    isNot: "A document review, not a NADRA check.",
  },
  {
    name: "Live selfie",
    badge: "Live selfie checked",
    is: "Matched to the CNIC photo. Gallery photos can't be used.",
    isNot: "It doesn't replace the CNIC review.",
  },
  {
    name: "Driving licence",
    badge: "Licence checked",
    is: "Checked on Punjab DLIMS. Learner permits aren't accepted.",
    isNot: "A screenshot from the driver isn't enough.",
  },
  {
    name: "Vehicle",
    badge: "Vehicle checked",
    is: "Registration checked on Punjab MTMIS, and the plate must match.",
    isNot: "It doesn't cover the car's fitness or insurance.",
  },
];

export function ChecksSection() {
  return (
    <Section id="checks" labelledBy="checks-title">
      <div className="grid gap-6 lg:grid-cols-12">
        <h2 id="checks-title" className="t-h2 lg:col-span-6" {...reveal(0)}>
          Before anyone drives
        </h2>
        <p className="max-w-[44ch] lg:col-span-5 lg:col-start-8 lg:self-end" {...reveal(1)}>
          Every check must pass before a driver can publish a ride.
        </p>
      </div>
      <ul className="mt-14 grid gap-2">
        {driverChecks.map((c, i) => (
          <li key={c.name} className="grid gap-4 rounded-surface bg-panel p-6 md:grid-cols-12 md:gap-8 md:p-8" {...reveal(2 + i)}>
            <div className="md:col-span-3">
              <h3 className="t-title">{c.name}</h3>
              <p className="mt-3 text-[18px]">
                <Badge>{c.badge}</Badge>
              </p>
            </div>
            <div className="md:col-span-5">
              <p className="font-semibold">What we check</p>
              <p className="mt-1">{c.is}</p>
            </div>
            <div className="md:col-span-4">
              <p className="font-semibold">What it doesn&rsquo;t mean</p>
              <p className="mt-1">{c.isNot}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

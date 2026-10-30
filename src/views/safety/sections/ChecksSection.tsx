import { Badge } from "@/components/ui/Badge";
import { Section } from "@/components/ui/Section";
import { reveal } from "@/lib/reveal";

// Wording follows the app's own "Why?" sheets: what each check is, and what it is not.
const driverChecks = [
  {
    name: "CNIC",
    badge: "CNIC reviewed",
    is: "A reviewer compares the details a driver enters with their CNIC card. A protected key stops one person opening several accounts.",
    isNot: "It is a document review, not a NADRA check.",
  },
  {
    name: "Live selfie",
    badge: "Live selfie checked",
    is: "A vetted provider matches a live selfie to the CNIC photo, for this check only. Photos from the gallery can't be used. After three tries, a person helps.",
    isNot: "It doesn't replace the CNIC review. Both must pass.",
  },
  {
    name: "Driving licence",
    badge: "Licence checked",
    is: "A reviewer checks the licence on Punjab DLIMS. Learner permits are not accepted.",
    isNot: "A screenshot from the driver doesn't replace our check.",
  },
  {
    name: "Vehicle",
    badge: "Vehicle checked",
    is: "A reviewer checks the registration on Punjab MTMIS. Each car is approved on its own, and the plate must match the record.",
    isNot: "Approval doesn't cover the car's fitness or insurance.",
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
          Drivers need Punjab-issued documents, and every check must pass. Our target is to review an application within 24 hours. Until then, they can&rsquo;t
          publish a single ride.
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

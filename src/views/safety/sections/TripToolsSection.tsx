import { Section } from "@/components/ui/Section";
import { PhoneFrame } from "@/features/app-preview/PhoneFrame";
import { TripLiveScreen } from "@/features/app-preview/screens/TripLiveScreen";
import { reveal } from "@/lib/reveal";

const tripTools = [
  {
    title: "Share your trip",
    text: "Add a trusted contact, like a family member, and send them your live trip.",
  },
  {
    title: "SOS on every trip",
    text: "One button alerts your trusted contact by SMS with your live location and the vehicle. It is the only alert RydCo ever sends by SMS.",
  },
  {
    title: "Women-only rides",
    text: "Choose to ride only with women. It is based on how people describe themselves, and we never show it as verified.",
  },
  {
    title: "Numbers stay hidden",
    text: "Nobody sees your phone number. Chat in the app opens only once a seat is confirmed.",
  },
  {
    title: "Request, don't book",
    text: "Drivers accept or decline every request, and no seat is held until they confirm. You always know who is coming.",
  },
  {
    title: "Report anytime",
    text: "Every trip has a report button, and riders rate their driver after each ride.",
  },
];

export function TripToolsSection() {
  return (
    <Section labelledBy="trip-title">
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4" {...reveal(2)}>
          <div className="lg:sticky lg:top-32">
            <PhoneFrame label="A trip in progress in the RydCo app, with Share trip, Chat and SOS buttons">
              <TripLiveScreen />
            </PhoneFrame>
          </div>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <h2 id="trip-title" className="t-h2" {...reveal(0)}>
            On every trip
          </h2>
          <ul className="mt-12 grid gap-10 sm:grid-cols-2 sm:gap-x-10">
            {tripTools.map((t, i) => (
              <li key={t.title} {...reveal(1 + i)}>
                <h3 className="t-title flex items-start gap-3">
                  <span aria-hidden="true" className="mt-[0.35em] h-3 w-3 flex-none rounded-full bg-accent" />
                  {t.title}
                </h3>
                <p className="mt-2 sm:pl-6">{t.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

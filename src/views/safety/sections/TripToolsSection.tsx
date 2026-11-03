import { BulletTitle } from "@/components/ui/BulletTitle";
import { Section } from "@/components/ui/Section";
import { TripLiveScreen } from "@/features/app-preview/screens/TripLiveScreen";
import { StickyPhone } from "@/features/app-preview/StickyPhone";
import { reveal } from "@/lib/reveal";

const tripTools = [
  {
    title: "Share your trip",
    text: "Send your live trip to someone you trust.",
  },
  {
    title: "SOS on every trip",
    text: "One button sends your trusted contact your live location by SMS.",
  },
  {
    title: "Women-only rides",
    text: "Ride only with women. Based on how people describe themselves, never shown as verified.",
  },
  {
    title: "Numbers stay hidden",
    text: "Chat in the app opens only once a seat is confirmed.",
  },
  {
    title: "Report anytime",
    text: "Every trip has a report button.",
  },
  {
    title: "Rate every trip",
    text: "Riders rate their driver after each ride.",
  },
];

export function TripToolsSection() {
  return (
    <Section labelledBy="trip-title">
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4" {...reveal(2)}>
          <StickyPhone label="A trip in progress in the RydCo app, with Share trip, Chat and SOS buttons">
            <TripLiveScreen />
          </StickyPhone>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <h2 id="trip-title" className="t-h2" {...reveal(0)}>
            On every trip
          </h2>
          <ul className="mt-12 grid gap-10 sm:grid-cols-2 sm:gap-x-10">
            {tripTools.map((t, i) => (
              <li key={t.title} {...reveal(1 + i)}>
                <BulletTitle>{t.title}</BulletTitle>
                <p className="mt-2 sm:pl-6">{t.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

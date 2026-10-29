import type { Metadata } from "next";
import { ChecklistScreen, SharesScreen } from "@/components/AppScreens";
import { Badge, Tick } from "@/components/Badge";
import { Button } from "@/components/Button";
import { PageHero } from "@/components/PageHero";
import { PhoneFrame } from "@/components/PhoneFrame";
import { Section, reveal } from "@/components/Section";
import { driverCta } from "@/lib/site";

export const metadata: Metadata = {
  title: "Drive with RydCo",
  description:
    "Offer the empty seats on your daily commute in Lahore and earn back your fuel cost. RydCo works out each rider's share, and riders pay you directly.",
  alternates: { canonical: "/drivers/" },
};

const needs = [
  { title: "CNIC", text: "Punjab-issued, with photos of the front and back." },
  { title: "Live selfie", text: "Taken in the app. Gallery photos can't be used." },
  { title: "Driving licence", text: "A current car licence. Learner permits aren't accepted." },
  { title: "Vehicle", text: "Registration and photos with the plate visible. Not the owner? Add the owner's permission." },
];

const steps = [
  { title: "Get checked", text: "Send your documents in the app. We aim to review them within 24 hours, and you can ride as a rider while you wait." },
  { title: "Publish your commute", text: "Set your route, departure window, weekdays and how many seats you offer. You can use the car you've had approved." },
  { title: "Accept riders", text: "You see each request with the minutes it adds to your trip. Pickup order follows the road, and you choose who rides." },
  { title: "Drive and settle", text: "Start the trip, pick everyone up, and riders pay you their share when you arrive." },
];

const yourRules = [
  "You choose the seats, the days and the departure window.",
  "Pause new requests anytime. Confirmed riders keep their seat.",
  "At each pickup, a 3-minute wait timer runs before you can mark a no-show.",
  "A rider who doesn't show up owes their full share and gets a strike.",
  "Phone numbers stay hidden both ways. Chat happens in the app, and your payment details show only to confirmed riders.",
];

export default function Drivers() {
  const cta = driverCta();
  return (
    <>
      <PageHero
        title="Earn back your fuel cost."
        lead="You already drive to work. Offer your empty seats to people going the same way, and they share the cost of the fuel."
        actions={
          <>
            <Button href={cta.href} external={cta.external} variant="onApricot">
              {cta.label}
            </Button>
            <Button href="#share" variant="cream">
              How the share works
            </Button>
          </>
        }
        aside={
          <PhoneFrame label="Riders' shares worked out for a driver in the RydCo app: Rs 245 with one rider, Rs 180 each with two">
            <SharesScreen />
          </PhoneFrame>
        }
      />

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
                    <span aria-hidden="true" className="mt-[0.35em] h-3 w-3 flex-none rounded-full bg-apricot" />
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

      <Section ground="tint" id="share" labelledBy="share-title">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <h2 id="share-title" className="t-h2" {...reveal(0)}>
              How the share is worked out
            </h2>
            <div className="mt-8 grid gap-5" {...reveal(1)}>
              <p>
                RydCo works out a fair share of the fuel from the distance, your car&rsquo;s class and the fuel price. The fuel is split between everyone in the
                car, you included, plus a small pickup fee for each stop.
              </p>
              <p>The fuel price is locked when you publish, so later price changes don&rsquo;t touch rides you&rsquo;ve already offered.</p>
              <p>When a second rider joins, everyone&rsquo;s share goes down. It never goes above what a rider saw when they requested.</p>
            </div>
          </div>
          <div className="lg:col-span-5 lg:col-start-8" {...reveal(2)}>
            <div data-ui className="relative rounded-[28px] bg-white p-7 md:p-9">
              <span className="absolute top-0 right-0 rounded-tr-[28px] rounded-bl-[18px] bg-cocoa px-4 py-2 text-[14px] font-semibold text-cream">Example</span>
              <p className="font-semibold">Honda City, 10 km to work</p>
              <p className="mt-1 text-cocoa-soft">Rs 38.94 per km · Rs 50 pickup fee</p>
              <dl className="mt-7 grid gap-6">
                <div>
                  <dt>With one rider</dt>
                  <dd className="mt-1 font-display text-[44px] leading-none font-extrabold tracking-tight">Rs 245</dd>
                  <dd className="mt-2 text-[15px] text-cocoa-soft">Rs 50 + (10 km × Rs 38.94) ÷ 2 people</dd>
                </div>
                <div>
                  <dt>With two riders</dt>
                  <dd className="mt-1 font-display text-[44px] leading-none font-extrabold tracking-tight">Rs 180 each</dd>
                  <dd className="mt-2 text-[15px] text-cocoa-soft">Rs 50 + (10 km × Rs 38.94) ÷ 3 people</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </Section>

      <Section ground="apricot" labelledBy="paid-title">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <h2 id="paid-title" className="t-h2" {...reveal(0)}>
              Riders pay you directly
            </h2>
            <p className="mt-6 max-w-[44ch]" {...reveal(1)}>
              RydCo suggests the share but never handles the money. After each trip the rider pays you and taps &ldquo;I sent the payment&rdquo;. You confirm you
              received it, and the trip is settled.
            </p>
          </div>
          <ul className="flex flex-wrap gap-3 lg:col-span-5 lg:col-start-8" {...reveal(2)}>
            {["Cash", "JazzCash", "NayaPay", "Bank / Raast"].map((m) => (
              <li key={m} className="rounded-full bg-cream px-6 py-4 font-display text-[22px] font-bold">
                {m}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section labelledBy="drive-steps-title">
        <h2 id="drive-steps-title" className="t-h2" {...reveal(0)}>
          How driving with RydCo works
        </h2>
        <ol className="relative mt-14 grid gap-10 before:absolute before:top-[10px] before:bottom-[10px] before:left-[9px] before:w-[4px] before:rounded-full before:bg-cocoa md:grid-cols-4 md:gap-8 md:before:top-[9px] md:before:right-[calc(25%-35px)] md:before:bottom-auto md:before:left-[9px] md:before:h-[4px] md:before:w-auto">
          {steps.map((s, i) => (
            <li key={s.title} className="relative pl-12 md:pt-14 md:pl-0" {...reveal(1 + i)}>
              <span aria-hidden="true" className={`absolute top-0 left-0 h-[22px] w-[22px] rounded-full ${i === steps.length - 1 ? "border-[5px] border-cocoa bg-cream" : "bg-cocoa"}`} />
              <h3 className="t-title">{s.title}</h3>
              <p className="mt-2">{s.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section ground="tint" labelledBy="rules-title">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <h2 id="rules-title" className="t-h2" {...reveal(0)}>
              Your car, your rules
            </h2>
            <p className="mt-6 max-w-[40ch]" {...reveal(1)}>
              RydCo is cost-sharing, not a taxi service. You drive the commute you already make, on your terms.
            </p>
          </div>
          <ul className="grid gap-4 lg:col-span-6 lg:col-start-7" {...reveal(2)}>
            {yourRules.map((r) => (
              <li key={r} className="flex gap-3">
                <Tick className="mt-[0.3em] text-apricot-deep" />
                {r}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section ground="cocoa" labelledBy="drive-cta-title">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <h2 id="drive-cta-title" className="t-h2" {...reveal(0)}>
              Ready to offer a seat?
            </h2>
            <p className="mt-5 max-w-[48ch]" {...reveal(1)}>
              Tell us your route and when you leave. We&rsquo;ll get you set up as one of the first drivers on the Lahore pilot.
            </p>
            <div className="mt-6 flex flex-wrap gap-2" {...reveal(2)}>
              <Badge tone="neutral">Review target: 24 hours</Badge>
            </div>
          </div>
          <div className="lg:col-span-4 lg:justify-self-end" {...reveal(2)}>
            <Button href={cta.href} external={cta.external} variant="apricot">
              {cta.label}
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}

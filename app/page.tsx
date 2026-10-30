import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CoverageScreen, ResultsScreen, SharesScreen, StopsScreen, WelcomeScreen } from "@/components/AppScreens";
import { Tick } from "@/components/Badge";
import { Button } from "@/components/Button";
import { CoverageCheck } from "@/components/CoverageCheck";
import { ManyIntoOne } from "@/components/ManyIntoOne";
import { PhoneFrame } from "@/components/PhoneFrame";
import { HeroRoute, RouteBand } from "@/components/RouteLine";
import { SafetyBoard } from "@/components/SafetyBoard";
import { Section, reveal } from "@/components/Section";
import { exampleTrip, TripCard } from "@/components/TripCard";
import { WhoFor } from "@/components/WhoFor";
import { pilot, riderCta, site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "RydCo · Your commute, in good company" },
  description: site.description,
  alternates: { canonical: "/" },
};

const audiences = [
  { title: "Riders", line: "Get to work without driving yourself.", href: "/how-it-works/" },
  { title: "Drivers", line: "Earn back your fuel cost on the drive you already make.", href: "/drivers/" },
  { title: "Organizations", line: "Help your team get to work together.", href: "/organizations/" },
  { title: "Sponsors and partners", line: "Back a better daily commute in Pakistan.", href: "/organizations/#partners" },
];

export default function Home() {
  const cta = riderCta();
  const live = Boolean(site.playStoreUrl);

  return (
    <>
      <section aria-labelledby="hero-title" className="overflow-x-clip bg-apricot text-cocoa">
        <div className="wrap pt-12 pb-12 md:pt-16 lg:pt-20 lg:pb-16">
          <h1 id="hero-title" className="t-display">
            Your commute, <span className="whitespace-nowrap">in good company.</span>
          </h1>
          <div className="mt-7 grid gap-7 md:mt-9 md:grid-cols-12 md:items-end">
            <p className="max-w-[36ch] text-[19px] md:col-span-6 md:text-[21px]">
              RydCo matches you with people in Lahore who drive your way every day. Share the car and split the fuel cost.
            </p>
            <div className="flex flex-wrap gap-3 md:col-span-6 md:justify-end">
              <Button href={cta.href} external={cta.external} variant="onApricot">
                {cta.label}
              </Button>
              <Button href="/drivers/" variant="cream">
                Offer a ride
              </Button>
            </div>
          </div>
          <div className="relative mt-10 md:mt-8">
            <div className="md:max-w-[980px]">
              <HeroRoute />
            </div>
            <p className="mt-6 font-semibold lg:absolute lg:right-0 lg:bottom-[3%] lg:mt-0">Starting with a pilot in {site.city}</p>
          </div>
        </div>
      </section>

      <Section labelledBy="what-title">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <h2 id="what-title" className="t-h2 lg:col-span-5" {...reveal(0)}>
            A seat on your way to work.
          </h2>
          <p className="font-display text-[clamp(24px,2.5vw,34px)] leading-[1.28] font-bold lg:col-span-7" {...reveal(1)}>
            Someone near you already drives your route every morning. RydCo gives you their spare seat{" "}
            <Chip className="bg-apricot-tint">2 seats left</Chip>, a fair share of the fuel cost <Chip className="bg-cocoa text-cream">Rs 180</Chip>, and a
            driver we have checked{" "}
            <Chip className="gap-[0.35em] bg-trust text-white">
              <Tick /> Licence checked
            </Chip>
            .
          </p>
        </div>

        <div className="mt-20 grid items-center gap-12 lg:mt-32 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6" {...reveal(2)}>
            <TripCard trip={exampleTrip} label="Example" />
          </div>
          <div className="lg:col-span-5 lg:col-start-8" {...reveal(3)}>
            <h3 className="t-h2">What does a seat cost?</h3>
            <div className="mt-6 grid gap-4">
              <p>
                You pay a share of the fuel, not a fare. RydCo works it out from the distance, the car and the fuel price, and locks it when the driver
                publishes the ride.
              </p>
              <p>When another rider joins, everyone&rsquo;s share goes down.</p>
              <p>Pay the driver directly by cash, JazzCash, NayaPay or bank transfer. RydCo never handles your money.</p>
            </div>
          </div>
        </div>
      </Section>

      <Section ground="tint" labelledBy="how-title">
        <div className="grid gap-6 lg:grid-cols-12">
          <h2 id="how-title" className="t-h2 lg:col-span-6" {...reveal(0)}>
            How RydCo works
          </h2>
          <p className="max-w-[40ch] lg:col-span-5 lg:col-start-8 lg:self-end" {...reveal(1)}>
            Three steps, all in the app. Nothing is booked until the driver says yes.
          </p>
        </div>
        <div className="mt-12 lg:mt-16" {...reveal(2)}>
          <ManyIntoOne />
        </div>
        <ol className="mt-10 grid gap-8 md:grid-cols-3 md:gap-10">
          {[
            ["Find", "Tell us where you start, where you’re headed and when. We show drivers already going that way."],
            ["Request", "Ask for a seat. The driver accepts or declines, and the seat is yours once they confirm."],
            ["Ride and split", "Meet at the pickup point, ride together, and pay your share to the driver directly."],
          ].map(([title, text], i) => (
            <li key={title} {...reveal(3 + i)}>
              <h3 className="t-title">{title}</h3>
              <p className="mt-2">{text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10" {...reveal(6)}>
          <Button href="/how-it-works/" variant="ghost">
            See every step in the app
          </Button>
        </div>
      </Section>

      <Section ground="cocoa" labelledBy="safety-title">
        <SafetyBoard />
      </Section>

      <div className="bg-apricot">
        <RouteBand />
      </div>

      <Section labelledBy="who-title">
        <h2 id="who-title" className="t-h2" {...reveal(0)}>
          Who RydCo is for
        </h2>
        <p className="mt-4 max-w-[44ch]" {...reveal(1)}>
          One car and a few people going the same way. Here&rsquo;s where you fit.
        </p>
        <div className="mt-10 lg:mt-14" {...reveal(2)}>
          <WhoFor
            rows={audiences}
            previews={[
              <PhoneFrame key="r" label="Ride results in the RydCo app">
                <ResultsScreen />
              </PhoneFrame>,
              <PhoneFrame key="d" label="Riders' shares worked out for a driver">
                <SharesScreen />
              </PhoneFrame>,
              <PhoneFrame key="o" label="One car picking up colleagues on the way to the same workplace">
                <StopsScreen />
              </PhoneFrame>,
              <PhoneFrame key="p" label="The Lahore pilot coverage map">
                <CoverageScreen />
              </PhoneFrame>,
            ]}
          />
        </div>
      </Section>

      <Section ground="tint" id="get-the-app" labelledBy="app-title">
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="order-2 lg:order-1 lg:col-span-5" {...reveal(2)}>
            <PhoneFrame label="The first screen of the RydCo app: Assalam o alaikum. I'm RydCo. How would you like to travel?">
              <WelcomeScreen />
            </PhoneFrame>
          </div>
          <div className="order-1 lg:order-2 lg:col-span-7">
            <h2 id="app-title" className="t-h2" {...reveal(0)}>
              Get the RydCo app.
            </h2>
            <p className="mt-5 max-w-[46ch]" {...reveal(1)}>
              {live
                ? "It runs on the Lahore pilot routes. Check that yours is covered, then download it and request your first seat."
                : "It opens first on the Lahore pilot routes. Check that yours is covered, then join the waitlist and we’ll message you when it’s ready to download."}
            </p>
            <div className="mt-8" {...reveal(2)}>
              <CoverageCheck />
            </div>
            <details className="group mt-8">
              <summary className="inline-flex cursor-pointer list-none items-center gap-2 py-2 font-semibold underline decoration-2 underline-offset-[6px]">
                See all pilot areas
              </summary>
              <div className="mt-4 grid gap-6 sm:grid-cols-2">
                <AreaList title="Where you start" areas={pilot.starts} />
                <AreaList title="Where you're headed" areas={pilot.destinations} />
              </div>
            </details>
          </div>
        </div>
      </Section>
    </>
  );
}

function Chip({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-full px-[0.75em] py-[0.35em] align-[0.2em] font-sans text-[0.5em] leading-none font-semibold whitespace-nowrap ${className}`}>
      {children}
    </span>
  );
}

function AreaList({ title, areas }: { title: string; areas: { name: string; covered: boolean }[] }) {
  return (
    <div>
      <h3 className="font-semibold">{title}</h3>
      <ul className="mt-2 grid gap-1">
        {areas.map((a) => (
          <li key={a.name}>
            {a.name}
            {!a.covered && <span className="text-cocoa-soft"> (not covered yet)</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

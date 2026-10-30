import type { Metadata } from "next";
import { CoverageScreen, StopsScreen } from "@/components/AppScreens";
import { Tick } from "@/components/Badge";
import { Button } from "@/components/Button";
import { PhoneFrame } from "@/components/PhoneFrame";
import { RouteBand, RouteConverge } from "@/components/RouteLine";
import { Section, reveal } from "@/components/Section";
import { partnerEnquiry, pilot, pilotEnquiry, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "For organizations and partners",
  description:
    "Give your team a cheaper, safer way to get to work with RydCo carpooling, or partner with us to grow the Lahore pilot. Built for daily commuters in Pakistan.",
  alternates: { canonical: "/organizations/" },
};

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

const pilotSteps = [
  { title: "Map your commute", text: "Tell us where your office is and which areas your team lives in. We check them against our coverage." },
  { title: "Your team joins", text: "People sign up with a phone number. Anyone who wants to drive completes the driver checks." },
  { title: "Ride together", text: "RydCo matches people heading to your office on the same route, on weekday commutes." },
  { title: "Review it together", text: "At the end of the pilot we sit down with you: what worked, what didn't, and what to change." },
];

const pilotFeatures = [
  "Sign up with a phone number",
  "Driver checks: CNIC, live selfie, licence and vehicle, reviewed within 24 hours",
  "Women-only rides",
  "Trip sharing with a trusted contact, and SOS on every trip",
  "Phone numbers stay hidden; chat opens once a seat is confirmed",
  "Fuel share worked out by the app, paid to the driver directly",
];

export default function Organizations() {
  return (
    <>
      <section aria-labelledby="org-title" className="on-cocoa overflow-x-clip bg-cocoa text-cream">
        <div className="wrap pt-14 pb-20 md:pt-20 lg:pt-24 lg:pb-28">
          <h1 id="org-title" className="t-display">
            Better commutes, <span className="whitespace-nowrap">built together.</span>
          </h1>
          <div className="mt-10 grid items-center gap-14 lg:mt-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <p className="max-w-[40ch] text-[19px] md:text-[21px]">
              Companies can give their teams a cheaper, safer way to get to work. Sponsors and partners can help it reach more of Pakistan.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="#companies" variant="apricot">
                For companies
              </Button>
              <Button href="#partners" variant="cream">
                For sponsors and partners
              </Button>
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <RouteConverge from={["Johar Town", "Model Town", "Garden Town", "DHA Phase 5"]} to="Your office" className="mx-auto max-w-[560px]" />
          </div>
          </div>
        </div>
      </section>

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
                  <h3 className="t-title flex items-start gap-3">
                    <span aria-hidden="true" className="mt-[0.35em] h-3 w-3 flex-none rounded-full bg-apricot" />
                    {p.title}
                  </h3>
                  <p>{p.text}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-4 lg:col-start-9" {...reveal(3)}>
            <div className="lg:sticky lg:top-32">
              <PhoneFrame label="A confirmed trip in the RydCo app: one car picks up colleagues in Model Town, Garden Town and Faisal Town on the way to Arfa Software Technology Park">
                <StopsScreen />
              </PhoneFrame>
            </div>
          </div>
        </div>
      </Section>

      <Section ground="tint" labelledBy="steps-title">
        <h2 id="steps-title" className="t-h2 max-w-[16em]" {...reveal(0)}>
          How a pilot with your company works
        </h2>
        <ol className="relative mt-14 grid gap-10 before:absolute before:top-[10px] before:bottom-[10px] before:left-[9px] before:w-[4px] before:rounded-full before:bg-cocoa md:grid-cols-4 md:gap-8 md:before:top-[9px] md:before:right-[calc(25%-35px)] md:before:bottom-auto md:before:left-[9px] md:before:h-[4px] md:before:w-auto">
          {pilotSteps.map((s, i) => (
            <li key={s.title} className="relative pl-12 md:pt-14 md:pl-0" {...reveal(1 + i)}>
              <span aria-hidden="true" className={`absolute top-0 left-0 h-[22px] w-[22px] rounded-full ${i === pilotSteps.length - 1 ? "border-[5px] border-cocoa bg-apricot-tint" : "bg-cocoa"}`} />
              <h3 className="t-title">{s.title}</h3>
              <p className="mt-2">{s.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-16 grid gap-8 rounded-[28px] bg-cream p-8 md:p-10 lg:grid-cols-12 lg:items-center" {...reveal(5)}>
          <div className="lg:col-span-8">
            <h3 className="t-title">What we need from you</h3>
            <p className="mt-2 max-w-[56ch]">An office address, one contact person on your side, and help letting your team know RydCo is there.</p>
          </div>
          <div className="lg:col-span-4 lg:justify-self-end">
            <Button href={pilotEnquiry}>Talk to us about a pilot</Button>
          </div>
        </div>
      </Section>

      <div className="bg-apricot">
        <RouteBand />
      </div>

      <Section id="partners" labelledBy="why-title">
        <h2 id="why-title" className="t-h2" {...reveal(0)}>
          Why we&rsquo;re building RydCo
        </h2>
        <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-10 lg:mt-16">
          <div {...reveal(1)}>
            <h3 className="t-title">The problem</h3>
            <p className="mt-3 max-w-[48ch]">
              Every morning, cars leave the same neighbourhoods for the same offices and campuses with seats empty. The people who could fill them have few ways to get
              to work that they can plan, afford and trust.
            </p>
          </div>
          <div {...reveal(2)}>
            <h3 className="t-title">What RydCo does</h3>
            <p className="mt-3 max-w-[48ch]">
              RydCo fills those seats. It matches commuters going the same way, checks every driver before they can offer a ride, and works out a fair share of the
              fuel. Drivers earn back their fuel cost, and riders pay less than going alone.
            </p>
          </div>
        </div>
      </Section>

      <Section ground="apricot" labelledBy="proof-title">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="lg:col-span-6">
            <h2 id="proof-title" className="t-h2" {...reveal(0)}>
              Tested with real commuters
            </h2>
            <div className="mt-8 grid gap-5" {...reveal(1)}>
              <p>
                Before building the mobile app, we ran an early web version for FAST-NUCES students and faculty. Without a marketing push, commuters found it and
                started using it on their own.
              </p>
              <p>
                What they told us shaped RydCo: daily commuters aren&rsquo;t looking for another ride-hailing service. They want a trusted, community-run way to share
                rides and split the cost.
              </p>
            </div>
          </div>
          <figure className="lg:col-span-6 lg:col-start-7" {...reveal(2)}>
            <blockquote className="font-display text-[clamp(44px,5.4vw,78px)] leading-[0.95] font-extrabold tracking-[-0.035em]">
              <p className="whitespace-nowrap">&ldquo;A lifesaver.&rdquo;</p>
            </blockquote>
            <figcaption className="mt-6 max-w-[34ch] font-semibold">
              What several FAST-NUCES commuters called the early web app, for getting to campus and around the city.
            </figcaption>
          </figure>
        </div>
      </Section>

      <Section labelledBy="pilot-title">
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="order-2 lg:order-1 lg:col-span-5" {...reveal(2)}>
            <PhoneFrame label="The Lahore pilot coverage map in the RydCo app">
              <CoverageScreen />
            </PhoneFrame>
          </div>
          <div className="order-1 lg:order-2 lg:col-span-7">
            <h2 id="pilot-title" className="t-h2" {...reveal(0)}>
              The Lahore pilot
            </h2>
            <p className="mt-6 max-w-[50ch]" {...reveal(1)}>
              RydCo starts with weekday commutes on a set of routes in {site.city}, so we can get matching and safety right before we grow.
            </p>
            <h3 className="t-title mt-10" {...reveal(2)}>
              In the app
            </h3>
            <ul className="mt-4 grid gap-3" {...reveal(3)}>
              {pilotFeatures.map((f) => (
                <li key={f} className="flex gap-3">
                  <Tick className="mt-[0.3em] text-apricot-deep" />
                  {f}
                </li>
              ))}
            </ul>
            <h3 className="t-title mt-10" {...reveal(4)}>
              Where it runs
            </h3>
            <p className="mt-3 max-w-[56ch]" {...reveal(5)}>
              From {listOf(pilot.starts.filter((a) => a.covered).map((a) => a.name))} to {listOf(pilot.destinations.map((a) => a.name))}.
            </p>
          </div>
        </div>
      </Section>

      <Section ground="apricot" labelledBy="partner-title">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <h2 id="partner-title" className="t-h2" {...reveal(0)}>
              Partner with us
            </h2>
            <p className="mt-6 max-w-[48ch] text-[19px] md:text-[21px]" {...reveal(1)}>
              We&rsquo;re looking for incubators, sponsors and employers who want better daily commutes in Pakistan, and want to help the Lahore pilot grow.
            </p>
          </div>
          <div className="flex flex-col items-start gap-4 lg:col-span-4 lg:items-end" {...reveal(2)}>
            <Button href={partnerEnquiry} variant="onApricot">
              Partner with us
            </Button>
            <a href={`mailto:${site.email}`} className="py-1 font-semibold underline decoration-2 underline-offset-[6px]">
              {site.email}
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}

function listOf(items: string[]) {
  if (items.length < 2) return items.join("");
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  CoverageScreen,
  PhoneScreen,
  RequestScreen,
  ResultsScreen,
  SettleScreen,
  TripLiveScreen,
  WelcomeScreen,
} from "@/components/AppScreens";
import { Button } from "@/components/Button";
import { CoverageCheck } from "@/components/CoverageCheck";
import { PageHero } from "@/components/PageHero";
import { PhoneFrame } from "@/components/PhoneFrame";
import { Section, reveal } from "@/components/Section";
import { riderCta } from "@/lib/site";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "Your first RydCo ride, step by step: check your commute, sign up with your phone number, find a driver going your way, request a seat, ride together and pay your share directly.",
  alternates: { canonical: "/how-it-works/" },
};

// The real rider flow from the app, in order.
const steps: { title: string; text: string; screen: ReactNode; label: string }[] = [
  {
    title: "Choose how you travel",
    text: "Pick “I want a ride”. Riders only need a phone number. Choosing doesn't create an account, and you can add driving later.",
    screen: <WelcomeScreen />,
    label: "Choosing a role in the RydCo app",
  },
  {
    title: "Check your commute",
    text: "See where the pilot runs in Lahore and test your own route before you sign up.",
    screen: <CoverageScreen />,
    label: "The pilot coverage map in the RydCo app",
  },
  {
    title: "Sign up with your number",
    text: "Enter your mobile number, accept the Terms and Privacy Policy, and type the 6-digit code we send by SMS. Then add your name, a photo and the area you start from.",
    screen: <PhoneScreen />,
    label: "Signing up with a mobile number in the RydCo app",
  },
  {
    title: "Find a ride",
    text: "Enter where you start, where you're headed and when, for one date or your weekdays. Turn on women-only rides if you want. Each match shows the meeting point, the walk, pickup and drop-off times, seats left and your share.",
    screen: <ResultsScreen />,
    label: "Ride results in the RydCo app",
  },
  {
    title: "Request a seat",
    text: "Ask for one date or your repeating commute. You see when to leave home and when you'll arrive. The driver replies by a set time, and no seat is held until they confirm.",
    screen: <RequestScreen />,
    label: "A pending seat request in the RydCo app",
  },
  {
    title: "Ride together",
    text: "Walk to the meeting point and meet your driver. Share your live trip with family, and use SOS if you ever need it. Your share is locked once the trip starts.",
    screen: <TripLiveScreen />,
    label: "A trip in progress in the RydCo app",
  },
  {
    title: "Settle up",
    text: "Pay your share to the driver by cash, JazzCash, NayaPay or bank transfer, tap “I sent the payment”, and rate the trip. RydCo never handles the money.",
    screen: <SettleScreen />,
    label: "Settling up after a trip in the RydCo app",
  },
];

const questions = [
  {
    q: "Is RydCo a taxi?",
    a: "No. RydCo is cost-sharing. Drivers are commuters going your way anyway, and everyone in the car splits the fuel. Drivers earn back their fuel cost, not a fare.",
  },
  {
    q: "How much will I pay?",
    a: "The app shows your share before you request. It depends on the distance, the car and the fuel price, and it goes down if another rider joins.",
  },
  {
    q: "What if I need to cancel?",
    a: "More than 60 minutes before: free. Within 60 minutes: still free, but it adds a late-cancel strike. After the trip has started there is a cancel fee to the driver, and you can book again once it's paid.",
  },
  {
    q: "What if the driver cancels?",
    a: "You owe nothing, and you can find another ride straight away.",
  },
  {
    q: "Can I book my whole week?",
    a: "Yes. Request a repeating commute and the driver confirms the dates that work. You can skip a single date or cancel all future dates.",
  },
  {
    q: "Who can see my phone number?",
    a: "No one. You chat in the app once your seat is confirmed, and the driver's payment details appear only after that.",
  },
  {
    q: "Do I have to add a trusted contact?",
    a: "No, it's optional. You can add one later, and share any trip with them live.",
  },
  {
    q: "Where does RydCo work?",
    a: "On the pilot routes in Lahore for now. Check your route below.",
  },
];

export default function HowItWorks() {
  const cta = riderCta();
  return (
    <>
      <PageHero
        ground="cream"
        title={
          <>
            Your first ride, <span className="whitespace-nowrap">step by step.</span>
          </>
        }
        lead="Here's exactly what happens in the RydCo app, from the first screen to settling up with your driver."
        actions={
          <>
            <Button href={cta.href} external={cta.external}>
              {cta.label}
            </Button>
            <Button href="#questions" variant="secondary">
              Questions
            </Button>
          </>
        }
      />

      <section aria-label="The steps" className="bg-cream pb-24 lg:pb-40">
        <div className="wrap">
          <ol className="relative before:absolute before:top-3 before:bottom-3 before:left-[9px] before:w-[4px] before:rounded-full before:bg-cocoa">
            {steps.map((s, i) => (
              <li key={s.title} className="relative grid gap-10 pb-20 pl-12 last:pb-0 md:pl-16 lg:grid-cols-12 lg:items-center lg:gap-10 lg:pb-28">
                <div className="relative lg:col-span-6" {...reveal(0)}>
                  {/* The stop sits level with the step's heading, on the rail at the li's left edge. */}
                  <span
                    aria-hidden="true"
                    className={`absolute top-1 -left-12 h-[22px] w-[22px] rounded-full md:-left-16 md:top-2 lg:top-4 ${i === steps.length - 1 ? "border-[5px] border-cocoa bg-cream" : "bg-cocoa"}`}
                  />
                  <h2 className="t-h2">{s.title}</h2>
                  <p className="mt-5 max-w-[46ch]">{s.text}</p>
                </div>
                <div className="lg:col-span-5 lg:col-start-8" {...reveal(1)}>
                  <PhoneFrame label={s.label} className="max-w-[280px] lg:mx-0 lg:max-w-[300px]">
                    {s.screen}
                  </PhoneFrame>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Section ground="tint" id="questions" labelledBy="questions-title">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <h2 id="questions-title" className="t-h2 lg:col-span-4" {...reveal(0)}>
            Good to know
          </h2>
          <div className="grid gap-2 lg:col-span-8" {...reveal(1)}>
            {questions.map((item) => (
              <details key={item.q} className="group rounded-[28px] bg-cream px-6 py-5 md:px-8">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-[20px] font-bold md:text-[22px] [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span aria-hidden="true" className="grid h-10 w-10 flex-none place-items-center rounded-full bg-apricot-tint transition-transform duration-200 group-open:rotate-45">
                    <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                      <path d="M10 4v12M4 10h12" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-3 max-w-[60ch] pb-1">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </Section>

      <Section ground="apricot" id="check" labelledBy="first-ride-title">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <h2 id="first-ride-title" className="t-h2" {...reveal(0)}>
              Ready for your first ride?
            </h2>
            <p className="mt-5 max-w-[40ch]" {...reveal(1)}>
              Check that your route is on the pilot, then get on the list.
            </p>
          </div>
          <div className="rounded-[28px] bg-apricot-tint p-6 md:p-8 lg:col-span-7" {...reveal(2)}>
            <CoverageCheck />
          </div>
        </div>
      </Section>
    </>
  );
}

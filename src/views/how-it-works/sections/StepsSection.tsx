import type { ReactNode } from "react";
import { Section } from "@/components/ui/Section";
import { railStop } from "@/components/ui/StepTimeline";
import { paymentMethodsInWords } from "@/config/payments";
import { PhoneFrame } from "@/features/app-preview/PhoneFrame";
import { LahoreScreen } from "@/features/app-preview/screens/LahoreScreen";
import { PhoneScreen } from "@/features/app-preview/screens/PhoneScreen";
import { RequestScreen } from "@/features/app-preview/screens/RequestScreen";
import { ResultsScreen } from "@/features/app-preview/screens/ResultsScreen";
import { SettleScreen } from "@/features/app-preview/screens/SettleScreen";
import { TripLiveScreen } from "@/features/app-preview/screens/TripLiveScreen";
import { WelcomeScreen } from "@/features/app-preview/screens/WelcomeScreen";
import { reveal } from "@/lib/reveal";

// The real rider flow from the app, in order.
const steps: { title: string; text: string; screen: ReactNode; label: string }[] = [
  {
    title: "Choose how you travel",
    text: "Pick “I want a ride”. Riders only need a phone number. Choosing doesn't create an account, and you can add driving later.",
    screen: <WelcomeScreen />,
    label: "Choosing a role in the RydCo app",
  },
  {
    title: "Add your commute",
    text: "The pilot runs across all of Lahore. Tell the app where you start and where you're headed.",
    screen: <LahoreScreen />,
    label: "The RydCo app's map of commutes across Lahore",
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
    text: `Pay your share to the driver by ${paymentMethodsInWords}, tap “I sent the payment”, and rate the trip. RydCo never handles the money.`,
    screen: <SettleScreen />,
    label: "Settling up after a trip in the RydCo app",
  },
];

export function StepsSection() {
  return (
    <Section pad="bottom">
        <ol className="rail relative before:absolute before:top-3 before:bottom-3 before:left-[9px] before:w-[4px] before:rounded-full before:bg-accent-strong">
          {steps.map((s, i) => (
            <li key={s.title} className="relative grid gap-10 pb-20 pl-12 last:pb-0 md:pl-16 lg:grid-cols-12 lg:items-center lg:gap-10 lg:pb-28">
              <div className="relative lg:col-span-6" {...reveal(0)}>
                {/* The stop sits level with the step's heading, on the rail at the li's left edge. */}
                <span
                  aria-hidden="true"
                  className={`rail-stop absolute top-1 -left-12 h-[22px] w-[22px] border-[5px] md:-left-16 md:top-2 lg:top-4 ${railStop(i === steps.length - 1, "surface")}`}
                />
                <h2 className="t-h2">{s.title}</h2>
                <p className="mt-5 max-w-[46ch]">{s.text}</p>
              </div>
              <div className="lg:col-span-5 lg:col-start-8" {...reveal(1)}>
                {/* The cap sits on a wrapper: PhoneFrame's own max-w-full would win over a max-w passed to it. */}
                <div className="mx-auto max-w-[280px] lg:mx-0 lg:max-w-[300px]">
                  <PhoneFrame label={s.label}>{s.screen}</PhoneFrame>
                </div>
              </div>
            </li>
          ))}
        </ol>
    </Section>
  );
}

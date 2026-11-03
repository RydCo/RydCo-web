import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { appLive } from "@/config/cta";
import { PhoneFrame } from "@/features/app-preview/PhoneFrame";
import { WelcomeScreen } from "@/features/app-preview/screens/WelcomeScreen";
import { WaitlistForm } from "@/features/waitlist/WaitlistForm";
import { reveal } from "@/lib/reveal";

export function GetTheAppSection() {
  return (
    <Section ground="panel" id="waitlist" labelledBy="app-title">
      <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="order-2 lg:order-1 lg:col-span-5" {...reveal(2)}>
          <PhoneFrame label="The first screen of the RydCo app: Assalam o alaikum. I'm RydCo. How would you like to travel?">
            <WelcomeScreen />
          </PhoneFrame>
        </div>
        <div className="order-1 lg:order-2 lg:col-span-7">
          <SectionHeading id="app-title" title="Get the RydCo app." lead={<>{appLive ? "It runs across all of Lahore. Add your commute, then download it and request your first seat." : "It opens first across all of Lahore. Add your commute and join the waitlist, and we’ll message you when it’s ready to download."}</>} />
          <div className="mt-8" {...reveal(2)}>
            <WaitlistForm />
          </div>
        </div>
      </div>
    </Section>
  );
}

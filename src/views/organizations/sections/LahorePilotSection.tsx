import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/config/site";
import { PhoneFrame } from "@/features/app-preview/PhoneFrame";
import { LahoreScreen } from "@/features/app-preview/screens/LahoreScreen";
import { reveal } from "@/lib/reveal";

export function LahorePilotSection() {
  return (
    <Section id="partners" labelledBy="pilot-title">
      <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="order-2 lg:order-1 lg:col-span-5" {...reveal(2)}>
          <PhoneFrame label="The RydCo app's map of commutes across Lahore">
            <LahoreScreen />
          </PhoneFrame>
        </div>
        <div className="order-1 lg:order-2 lg:col-span-7">
          <SectionHeading id="pilot-title" title="The Lahore pilot" lead={<>RydCo starts with weekday commutes across {site.city}, so we can get matching and safety right before we grow.</>} />
        </div>
      </div>
    </Section>
  );
}

import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PhoneFrame } from "@/features/app-preview/PhoneFrame";
import { CoverageScreen } from "@/features/app-preview/screens/CoverageScreen";
import { ResultsScreen } from "@/features/app-preview/screens/ResultsScreen";
import { SharesScreen } from "@/features/app-preview/screens/SharesScreen";
import { StopsScreen } from "@/features/app-preview/screens/StopsScreen";
import { reveal } from "@/lib/reveal";
import { WhoFor } from "@/views/home/components/WhoFor";

const audiences = [
  { title: "Riders", line: "Get to work without driving yourself.", href: "/how-it-works/" },
  { title: "Drivers", line: "Earn back your fuel cost on the drive you already make.", href: "/drivers/" },
  { title: "Organizations", line: "Help your team get to work together.", href: "/organizations/" },
  { title: "Sponsors and partners", line: "Back a better daily commute in Pakistan.", href: "/organizations/#partners" },
];

export function WhoItsForSection() {
  return (
    <Section labelledBy="who-title">
      <SectionHeading id="who-title" title="Who RydCo is for" lead="One car and a few people going the same way. Here&rsquo;s where you fit." />
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
  );
}

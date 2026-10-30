import { Section } from "@/components/ui/Section";
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
  );
}

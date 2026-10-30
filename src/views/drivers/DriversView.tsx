import { HeroSection } from "./sections/HeroSection";
import { NeedsSection } from "./sections/NeedsSection";
import { PaidSection } from "./sections/PaidSection";
import { RulesSection } from "./sections/RulesSection";
import { ShareSection } from "./sections/ShareSection";
import { SignupSection } from "./sections/SignupSection";
import { StepsSection } from "./sections/StepsSection";

export function DriversView() {
  return (
    <>
      <HeroSection />
      <NeedsSection />
      <ShareSection />
      <PaidSection />
      <StepsSection />
      <RulesSection />
      <SignupSection />
    </>
  );
}

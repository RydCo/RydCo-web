import { HeroSection } from "./sections/HeroSection";
import { JoinSection } from "./sections/JoinSection";
import { ProofSection } from "./sections/ProofSection";
import { WhyRydCoSection } from "./sections/WhyRydCoSection";

export function AboutView() {
  return (
    <>
      <HeroSection />
      <WhyRydCoSection />
      <ProofSection />
      <JoinSection />
    </>
  );
}

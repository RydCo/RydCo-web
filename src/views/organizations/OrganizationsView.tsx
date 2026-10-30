import { CompaniesSection } from "./sections/CompaniesSection";
import { HeroSection } from "./sections/HeroSection";
import { LahorePilotSection } from "./sections/LahorePilotSection";
import { PartnerSection } from "./sections/PartnerSection";
import { PilotStepsSection } from "./sections/PilotStepsSection";
import { ProofSection } from "./sections/ProofSection";
import { RouteDividerSection } from "./sections/RouteDividerSection";
import { WhyRydCoSection } from "./sections/WhyRydCoSection";

export function OrganizationsView() {
  return (
    <>
      <HeroSection />
      <CompaniesSection />
      <PilotStepsSection />
      <RouteDividerSection />
      <WhyRydCoSection />
      <ProofSection />
      <LahorePilotSection />
      <PartnerSection />
    </>
  );
}

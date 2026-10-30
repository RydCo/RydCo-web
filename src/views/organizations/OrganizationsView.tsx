import { RouteDivider } from "@/components/brand/RouteDivider";
import { CompaniesSection } from "./sections/CompaniesSection";
import { HeroSection } from "./sections/HeroSection";
import { LahorePilotSection } from "./sections/LahorePilotSection";
import { PartnerSection } from "./sections/PartnerSection";
import { PilotStepsSection } from "./sections/PilotStepsSection";
import { ProofSection } from "./sections/ProofSection";
import { WhyRydCoSection } from "./sections/WhyRydCoSection";

export function OrganizationsView() {
  return (
    <>
      <HeroSection />
      <CompaniesSection />
      <PilotStepsSection />
      <RouteDivider />
      <WhyRydCoSection />
      <ProofSection />
      <LahorePilotSection />
      <PartnerSection />
    </>
  );
}

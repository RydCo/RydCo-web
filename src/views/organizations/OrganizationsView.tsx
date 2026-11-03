import { RouteDivider } from "@/components/brand/RouteDivider";
import { CompaniesSection } from "./sections/CompaniesSection";
import { HeroSection } from "./sections/HeroSection";
import { LahorePilotSection } from "./sections/LahorePilotSection";
import { PartnerSection } from "./sections/PartnerSection";
import { PilotStepsSection } from "./sections/PilotStepsSection";

export function OrganizationsView() {
  return (
    <>
      <HeroSection />
      <CompaniesSection />
      <PilotStepsSection />
      <RouteDivider />
      <LahorePilotSection />
      <PartnerSection />
    </>
  );
}

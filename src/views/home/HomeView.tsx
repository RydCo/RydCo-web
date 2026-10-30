import { RouteDivider } from "@/components/brand/RouteDivider";
import { GetTheAppSection } from "./sections/GetTheAppSection";
import { HeroSection } from "./sections/HeroSection";
import { HowItWorksSection } from "./sections/HowItWorksSection";
import { SafetySection } from "./sections/SafetySection";
import { WhatItIsSection } from "./sections/WhatItIsSection";
import { WhoItsForSection } from "./sections/WhoItsForSection";

export function HomeView() {
  return (
    <>
      <HeroSection />
      <WhatItIsSection />
      <HowItWorksSection />
      <SafetySection />
      <RouteDivider />
      <WhoItsForSection />
      <GetTheAppSection />
    </>
  );
}

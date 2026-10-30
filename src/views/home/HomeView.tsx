import { GetTheAppSection } from "./sections/GetTheAppSection";
import { HeroSection } from "./sections/HeroSection";
import { HowItWorksSection } from "./sections/HowItWorksSection";
import { RouteDividerSection } from "./sections/RouteDividerSection";
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
      <RouteDividerSection />
      <WhoItsForSection />
      <GetTheAppSection />
    </>
  );
}

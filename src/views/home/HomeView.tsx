import { RouteDivider } from "@/components/brand/RouteDivider";
import { RideInterlude } from "./components/RideInterlude";
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
      <RideInterlude />
      <WhatItIsSection />
      <HowItWorksSection />
      <SafetySection />
      <RouteDivider />
      <WhoItsForSection />
      <GetTheAppSection />
    </>
  );
}

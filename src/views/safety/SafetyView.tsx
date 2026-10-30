import { ChecksSection } from "./sections/ChecksSection";
import { DataSection } from "./sections/DataSection";
import { FairnessSection } from "./sections/FairnessSection";
import { HeroSection } from "./sections/HeroSection";
import { QuestionSection } from "./sections/QuestionSection";
import { RidersSection } from "./sections/RidersSection";
import { TripToolsSection } from "./sections/TripToolsSection";

export function SafetyView() {
  return (
    <>
      <HeroSection />
      <ChecksSection />
      <RidersSection />
      <TripToolsSection />
      <FairnessSection />
      <DataSection />
      <QuestionSection />
    </>
  );
}

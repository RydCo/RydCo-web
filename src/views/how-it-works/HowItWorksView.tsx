import { FirstRideSection } from "./sections/FirstRideSection";
import { HeroSection } from "./sections/HeroSection";
import { QuestionsSection } from "./sections/QuestionsSection";
import { StepsSection } from "./sections/StepsSection";

export function HowItWorksView() {
  return (
    <>
      <HeroSection />
      <StepsSection />
      <QuestionsSection />
      <FirstRideSection />
    </>
  );
}

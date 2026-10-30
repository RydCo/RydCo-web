import { TwoRidesMotion } from "@/features/app-preview/motion/TwoRidesMotion";

// A scene for `npm run motion` to film. The `.motion.tsx` ending keeps it out of the real site: Next only sees it in the
// motion build (next.config.ts).
export default function TwoRidesPage() {
  return <TwoRidesMotion />;
}

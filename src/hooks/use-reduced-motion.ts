import { useSyncExternalStore } from "react";

const reducedQuery = "(prefers-reduced-motion: reduce)";

// For one-off checks inside handlers and effects. Components that render differently use the hook below.
export const prefersReducedMotion = () => window.matchMedia(reducedQuery).matches;

function subscribeReduced(onChange: () => void) {
  const media = window.matchMedia(reducedQuery);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}
export function useReducedMotion() {
  return useSyncExternalStore(subscribeReduced, prefersReducedMotion, () => false);
}

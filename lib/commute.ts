import { useSyncExternalStore } from "react";

// The route a visitor has picked, shared by the hero's route check and the waitlist form, so nobody picks it twice.
// `by` names the picker that changed it last, so only that one announces the answer to screen readers.
export type Commute = { from: string; to: string; by: string | null };

const empty: Commute = { from: "", to: "", by: null };
let current = empty;
const listeners = new Set<() => void>();

export function setCommute(next: Partial<Commute>) {
  current = { ...current, ...next };
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useCommute() {
  return useSyncExternalStore(
    subscribe,
    () => current,
    () => empty,
  );
}

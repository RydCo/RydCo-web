import { useSyncExternalStore } from "react";

// The route a visitor has picked, shared by the hero's route check and the waitlist form, so nobody picks it twice.
type Commute = { from: string; to: string };

const empty: Commute = { from: "", to: "" };
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

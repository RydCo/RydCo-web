// Starts fetching the map's code and style before the dialog opens, so it is ready, or nearly, by the time anyone
// taps the map button. Safe to call any number of times.
import { loadStyle } from "./map-style";

let started = false;

export function preloadMap() {
  if (started) return;
  started = true;
  void import("./map-engine");
  void loadStyle().catch(() => {});
}

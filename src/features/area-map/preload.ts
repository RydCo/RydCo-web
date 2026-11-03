// Starts fetching the map's code and style before the dialog opens, so it is ready, or nearly, by the time anyone
// taps the map button. Safe to call any number of times. A failure here is ignored: the dialog loads them again.
import { loadStyle } from "./map-style";

let started = false;

export function preloadMap() {
  if (started) return;
  started = true;
  import("./map-engine").catch(() => {});
  loadStyle().catch(() => {});
}

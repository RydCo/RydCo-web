import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
// After MapLibre's own styles, so the site's look wins over them.
import "./area-map.css";
import type { Point } from "@/config/pilot";
import { loadStyle } from "./map-style";

// Lahore and its edges, as [west, south] and [east, north]: the map can't be dragged away from the city.
const lahore: [[number, number], [number, number]] = [
  [74.0, 31.2],
  [74.65, 31.75],
];

// The map the area picker draws its own controls over (zooming is by pinch, scroll or keys): the middle is where the
// pin stands. `moved` reports that middle whenever the map comes to rest; `moving` when it starts to move. Kept behind
// this small surface so the dialog never deals with the map library itself. It is ready as soon as its style is: the
// tiles fill in after that.
// `credit` is where the map's credit goes: the dialog's own row above its card, so nothing covers it.
export async function createMap(
  el: HTMLElement,
  credit: HTMLElement,
  at: Point,
  zoom: number,
  on: { ready: () => void; moving: () => void; moved: (at: Point) => void },
) {
  const map = new maplibregl.Map({
    container: el,
    style: await loadStyle(),
    center: [at[1], at[0]],
    zoom,
    minZoom: 10,
    maxZoom: 17,
    maxBounds: lahore,
    dragRotate: false,
    pitchWithRotate: false,
    touchPitch: false,
    attributionControl: false,
  });
  // The map's credit, which its licence requires, as an (i) button that opens it, as the OpenStreetMap attribution
  // guideline allows. MapLibre opens a compact credit the first time it fills in, from the style or from a source;
  // it is closed then, once, so it starts as just the button.
  map.addControl(new maplibregl.AttributionControl({ compact: true }), "bottom-left");
  const attribution = el.querySelector(".maplibregl-ctrl-attrib")!;
  credit.append(attribution);
  const startClosed = () => {
    if (!attribution.classList.contains("maplibregl-compact-show")) return;
    attribution.classList.remove("maplibregl-compact-show");
    map.off("styledata", startClosed).off("sourcedata", startClosed);
  };
  map.on("styledata", startClosed);
  map.on("sourcedata", startClosed);
  map.touchZoomRotate.disableRotation();
  map.keyboard.disableRotation();
  map.once("style.load", on.ready);
  map.on("movestart", on.moving);
  map.on("moveend", () => {
    const { lat, lng } = map.getCenter();
    on.moved([lat, lng]);
  });
  return {
    goTo: ([lat, lng]: Point, to: number) => map.flyTo({ center: [lng, lat], zoom: to, essential: false }),
    remove: () => map.remove(),
  };
}

export type AreaMapEngine = Awaited<ReturnType<typeof createMap>>;

import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
// After MapLibre's own styles, so the site's look wins over them.
import "./area-map.css";
import { loadStyle } from "./map-style";

type Point = [number, number];

// Lahore and its edges, as [west, south] and [east, north]: the map can't be dragged away from the city.
const lahore: [[number, number], [number, number]] = [
  [74.0, 31.2],
  [74.65, 31.75],
];

// The map the area picker draws its own controls over: the middle is where the pin stands. `moved` reports that
// middle, as [latitude, longitude], whenever the map comes to rest; `moving` when it starts to move. Kept behind this
// small surface so the dialog never deals with the map library itself. It is ready as soon as its style is: the
// tiles fill in after that.
export async function createMap(el: HTMLElement, at: Point, zoom: number, on: { ready: () => void; moving: () => void; moved: (at: Point) => void }) {
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
    attributionControl: { compact: false },
  });
  map.touchZoomRotate.disableRotation();
  map.keyboard.disableRotation();
  map.once("style.load", on.ready);
  map.on("movestart", on.moving);
  map.on("moveend", () => {
    const { lat, lng } = map.getCenter();
    on.moved([lat, lng]);
  });
  return {
    zoomIn: () => map.zoomIn(),
    zoomOut: () => map.zoomOut(),
    goTo: ([lat, lng]: Point, to: number) => map.flyTo({ center: [lng, lat], zoom: to, essential: false }),
    remove: () => map.remove(),
  };
}

export type AreaMapEngine = Awaited<ReturnType<typeof createMap>>;

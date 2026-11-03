import L from "leaflet";
import "leaflet/dist/leaflet.css";
// After Leaflet's own styles, so the site's look wins over them.
import "./area-map.css";

type Point = [number, number];

// Lahore and its edges: the map can't be dragged away from the city.
const lahore = L.latLngBounds([31.2, 74.0], [31.75, 74.65]);

// OpenStreetMap's own tiles, credited as its licence asks. Loaded only when someone opens the map.
const tiles = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const credit = '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>';

// A Leaflet map of Lahore with the controls the area map draws itself. `moved` reports the middle of the map whenever
// it comes to rest; `moving` when it starts to move.
export function createMap(el: HTMLElement, at: Point, zoom: number, on: { moving: () => void; moved: (at: Point) => void }) {
  const map = L.map(el, { center: at, zoom, minZoom: 11, maxZoom: 17, maxBounds: lahore, maxBoundsViscosity: 1, zoomControl: false });
  L.tileLayer(tiles, { attribution: credit, maxZoom: 19 }).addTo(map);
  map.attributionControl.setPrefix(false);
  map.on("movestart", on.moving);
  map.on("moveend", () => {
    const { lat, lng } = map.getCenter();
    on.moved([lat, lng]);
  });
  return map;
}

export type AreaLeafletMap = ReturnType<typeof createMap>;

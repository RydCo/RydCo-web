import type { StyleSpecification } from "maplibre-gl";
import { mapStyle } from "@/config/map.mjs";

// The map's style, fetched once and trimmed so the first view needs as little as possible: place names in English
// only (Latin, falling back to the local name where there's no Latin one) and one regular font. That skips the
// italic and bold fonts and the Urdu glyphs, most of what the map downloads before it can draw.
type Layer = { layout?: Record<string, unknown> };

const latinName = ["coalesce", ["get", "name:latin"], ["get", "name"]];

let style: Promise<StyleSpecification> | undefined;

export function loadStyle() {
  style ??= fetch(mapStyle)
    .then((r) => r.json() as Promise<StyleSpecification>)
    .then((spec) => {
      for (const { layout } of spec.layers as Layer[]) {
        if (!layout?.["text-field"]) continue;
        layout["text-font"] = ["Noto Sans Regular"];
        if (JSON.stringify(layout["text-field"]).includes("name:latin")) layout["text-field"] = latinName;
      }
      return spec;
    });
  return style;
}

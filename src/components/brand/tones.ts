// RydCo's one motif: the route line that ends under the wordmark, with the car parked at its end.
// Geometry follows the app's splash screen (app-mocks/v8.html).

export type Tone = { ink: string; line: string; glass: string };

export const toneOn = {
  brand: { ink: "fill-ink", line: "stroke-ink", glass: "fill-brand" },
  surface: { ink: "fill-ink", line: "stroke-ink", glass: "fill-surface" },
  panel: { ink: "fill-ink", line: "stroke-ink", glass: "fill-panel" },
  ink: { ink: "fill-surface", line: "stroke-brand", glass: "fill-ink" },
} satisfies Record<string, Tone>;

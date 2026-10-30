// RydCo's one motif: the route line that ends under the wordmark, with the car parked at its end.
// Geometry follows the app's splash screen (app-mocks/v8.html). As in the app, the line is orange and the car is ink.

export type Tone = { ink: string; line: string; body: string; glass: string };

export const toneOn = {
  brand: { ink: "fill-ink", line: "stroke-accent-strong", body: "fill-ink", glass: "fill-brand" },
  surface: { ink: "fill-ink", line: "stroke-accent-strong", body: "fill-ink", glass: "fill-surface" },
  screen: { ink: "fill-ink", line: "stroke-accent-strong", body: "fill-ink", glass: "fill-screen" },
  panel: { ink: "fill-ink", line: "stroke-accent-strong", body: "fill-ink", glass: "fill-panel" },
  ink: { ink: "fill-surface", line: "stroke-accent", body: "fill-surface", glass: "fill-ink" },
} satisfies Record<string, Tone>;

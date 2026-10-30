// RydCo's one motif: the route line that ends under the wordmark, with the car parked at its end.
// Geometry follows the app's splash screen (app-mocks/v8.html).

export type Tone = { ink: string; line: string; glass: string };

export const toneOn = {
  apricot: { ink: "fill-cocoa", line: "stroke-cocoa", glass: "fill-apricot" },
  cream: { ink: "fill-cocoa", line: "stroke-cocoa", glass: "fill-cream" },
  cocoa: { ink: "fill-cream", line: "stroke-apricot", glass: "fill-cocoa" },
} satisfies Record<string, Tone>;

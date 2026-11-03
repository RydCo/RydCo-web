import { Fragment, type ComponentProps, type CSSProperties } from "react";
import { Badge } from "@/components/ui/Badge";
import { Section } from "@/components/ui/Section";
import { Tilt } from "@/components/ui/Tilt";
import { paymentMethodsInWords } from "@/config/payments";
import { exampleTrip, TripCard } from "@/features/trips/TripCard";
import { playAt, reveal } from "@/lib/reveal";

// Each part acts itself out once, when half of it is on screen (styles/motion/what-it-is.css). The heading's words drop
// into place, an orange glint reads along the sentence, and each chip falls onto the page as the glint reaches it, with a
// ring as it lands. The example trip stands up in 3D, its route draws, the price drops in and its checks turn green, and
// the glint passes through the key phrases beside it one after another. With reduced motion, or before the page's script
// runs, it's all just there.
//
// With a mouse, each chip springs up when pointed at and points at its part of the card: "Rs 180" shows the card's price
// once a second rider joins, "2 seats left" its seats, "Licence checked" its licence check. The card tilts towards the
// mouse and lifts off the page, its checks rising above it.

const heading = "A seat on your way to work.";

// The chips are the site's badges at their inline size; `points` names the part of the card each points at, and the
// colour of the ring it lands with (styles/motion/what-it-is.css).
type Part = string | { chip: string; tone: ComponentProps<typeof Badge>["tone"]; points: "seats" | "price" | "licence" };
const sentence: Part[] = [
  "Someone near you already drives your route every morning. RydCo gives you their spare seat ",
  { chip: "2 seats left", tone: "neutral", points: "seats" },
  ", a fair share of the fuel cost ",
  { chip: "Rs 180", tone: "ink", points: "price" },
  ", and a driver we have checked ",
  { chip: "Licence checked", tone: "trust", points: "licence" },
  ".",
];

// When the glint starts reading, how long it takes per word, and how early a chip starts falling so it lands as the
// glint reaches it.
const readFrom = 420;
const perWord = 38;
const fallLead = 320;
// Beside the card, the glint takes each key phrase in turn, a little slower since the phrases are short.
const phraseWord = 70;

export function WhatItIsSection() {
  return (
    <Section labelledBy="what-title">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-10" data-play>
        <h2 id="what-title" className="t-h2 lg:col-span-5">
          {heading.split(" ").map((word, i) => (
            <Fragment key={i}>
              {i > 0 && " "}
              <span className="wi-fall" style={{ ...playAt(i * 60), "--tilt": `${i % 2 ? 7 : -7}deg` } as CSSProperties}>
                {word}
              </span>
            </Fragment>
          ))}
        </h2>
        <p className="font-display text-[clamp(24px,2.5vw,34px)] leading-[1.28] font-bold lg:col-span-7">
          <Sentence />
        </p>
      </div>

      <div className="mt-20 grid items-center gap-12 lg:mt-32 lg:grid-cols-12 lg:gap-10">
        <div className="wi-stage lg:col-span-6" data-play>
          <div className="wi-card">
            <Tilt className="rounded-surface">
              <TripCard trip={exampleTrip} label="Example" />
            </Tilt>
          </div>
        </div>
        <div className="lg:col-span-5 lg:col-start-8" {...reveal(1)} data-play>
          <h3 className="t-h2">What does a seat cost?</h3>
          <div className="mt-6 grid gap-4">
            <p>
              You pay <Glint from={250}>a share of the fuel, not a fare</Glint>. RydCo works it out from the distance, the car and the fuel price, and
              locks it when the driver publishes the ride.
            </p>
            <p>
              When another rider joins, <Glint from={900}>everyone’s share goes down</Glint>.
            </p>
            <p>
              Pay the driver directly by {paymentMethodsInWords}. RydCo <Glint from={1550}>never handles your money</Glint>.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

// The sentence word by word, so the glint can read along it. A chip lands where the glint reaches it, and the glint
// pauses there for two words' time.
function Sentence() {
  let word = 0;
  return sentence.flatMap((part, i) => {
    if (typeof part === "string") {
      return part.split(/(\s+)/).map((token, j) =>
        token.trim() ? (
          <span key={`${i}-${j}`} className="wi-word" style={playAt(readFrom + word++ * perWord)}>
            {token}
          </span>
        ) : (
          token
        ),
      );
    }
    const lands = readFrom + word * perWord;
    word += 2;
    return [
      <Badge key={i} tone={part.tone} size="inline" className={`wi-chip wi-points-${part.points} relative`} style={playAt(lands - fallLead)}>
        {part.chip}
      </Badge>,
    ];
  });
}

// A key phrase for the glint to pass through, word by word. Body text is small, so it glints in the deeper orange.
function Glint({ children, from }: { children: string; from: number }) {
  return (
    <span className="wi-glint-deep">
      {children.split(/(\s+)/).map((token, i) =>
        token.trim() ? (
          <span key={i} className="wi-word" style={playAt(from + (i / 2) * phraseWord)}>
            {token}
          </span>
        ) : (
          token
        ),
      )}
    </span>
  );
}

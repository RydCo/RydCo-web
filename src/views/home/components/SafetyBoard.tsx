import type { CSSProperties, ReactNode } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Arrow, Star } from "@/components/ui/icons";
import { driverChecks, phoneCheck } from "@/config/checks";
import { playAt, reveal } from "@/lib/reveal";

// A board of the app's real safety controls, each drawn large inside its tile, clear of the edges.
// Every item here is a feature shown in the app mocks; wording follows the app (never "NADRA verified").
//
// Tiles marked `play` act their feature out once (CSS in styles/motion/safety-board.css): the checks turn green one by one,
// the women-only switch flips on, the stars fill, and "Sharing live" pulses. They load, and stay with reduced motion, in
// their finished state. SafetyDeck turns this board into a deck of cards and plays each every time it arrives. Where it can't run,
// this is the layout, and each plays when half of it is on screen.

type TileProps = {
  ground: "surface" | "panel" | "brand";
  title: string;
  line: string;
  place: string;
  step: number;
  play?: boolean;
  /** How much to enlarge the picture when this tile is a card in the deck, where it has room. */
  big?: number;
  /** The same on phones, if it isn't a little more than `big`. */
  bigPhone?: number;
  children: ReactNode;
};

const grounds = { surface: "bg-surface", panel: "bg-panel", brand: "bg-brand" };

// The driver checks fan out down the tile, each pushed in by a different amount.
const checkStagger = ["", "mr-[1.2em]", "mr-[0.4em]", "mr-[1.6em]"];

function Tile({ ground, title, line, place, step, play, big = 1, bigPhone = big * 1.2, children }: TileProps) {
  return (
    <li data-deck-card {...reveal(step)} {...(play ? { "data-play": "" } : {})} className={`relative flex flex-col justify-end overflow-hidden rounded-surface p-5 text-ink ${grounds[ground]} ${place}`}>
      <div data-deck-picture aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ "--big": big, "--big-phone": bigPhone } as CSSProperties}>
        {children}
      </div>
      <div className="relative">
        <h3 className="font-display text-[18px] leading-tight font-bold">{title}</h3>
        <p className="mt-1 text-[15px] leading-snug">{line}</p>
      </div>
    </li>
  );
}

export function SafetyBoard() {
  return (
    <ul data-deck-board className="grid auto-rows-[28vw] grid-cols-2 gap-[6px] sm:auto-rows-[120px] lg:auto-rows-[104px] lg:grid-cols-12 lg:gap-2">
      <li data-deck-head {...reveal(0)} className="col-span-2 row-span-2 flex flex-col justify-between py-2 lg:col-span-6 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:pr-8">
        <h2 id="safety-title" className="t-h2">
          Safety on every trip.
        </h2>
        <div>
          <p>Checks before anyone drives, and tools on every ride.</p>
          <Button href="/safety/" variant="ghost" className="mt-1">
            How we keep trips safe <Arrow />
          </Button>
        </div>
      </li>

      <Tile ground="panel" step={1} play title="Every driver is checked" line="Reviewed before they can publish a ride." place="col-span-2 row-span-3 lg:col-span-6 lg:col-start-1 lg:row-span-4 lg:row-start-3">
        <div className="absolute top-5 right-5 grid justify-items-end gap-2.5 text-[18px] sm:top-6 sm:right-6 sm:gap-3 sm:text-[28px] lg:text-[32px]">
          {driverChecks.map((c, i) => (
            <Badge key={c.name} className={`sb-check ${checkStagger[i % checkStagger.length]}`} style={playAt(250 + i * 350)}>
              {c.badge}
            </Badge>
          ))}
        </div>
      </Tile>

      <Tile ground="brand" step={2} play big={1.25} title="Women-only rides" line="Choose to ride only with women." place="row-span-2 lg:col-span-3 lg:col-start-7 lg:row-span-4 lg:row-start-3">
        <div className="absolute top-5 right-5 flex items-center gap-3 rounded-full bg-surface py-2 pr-2 pl-4 text-[14px] font-semibold sm:py-2.5 sm:pl-5 sm:text-[22px] lg:top-8 lg:text-[24px]">
          <span className="whitespace-nowrap">Women-only</span>
          <span className="sb-track relative h-[1.5em] w-[2.6em] flex-none rounded-full bg-ink" style={playAt(450)}>
            <span className="sb-knob absolute top-[0.15em] right-[0.15em] h-[1.2em] w-[1.2em] rounded-full bg-brand" style={playAt(450)} />
          </span>
        </div>
      </Tile>

      <Tile ground="surface" step={3} play big={1.6} title="Every rider too" line="Each account starts with a verified phone number." place="row-span-2 lg:col-span-3 lg:col-start-7 lg:row-span-2 lg:row-start-1">
        <div className="absolute top-5 right-5 text-[16px] sm:text-[22px] lg:top-6 lg:text-[24px]">
          <Badge className="sb-check" style={playAt(350)}>
            {phoneCheck.badge}
          </Badge>
        </div>
      </Tile>

      <Tile ground="brand" step={4} big={1.6} title="Numbers stay hidden" line="Chat opens once a seat is confirmed." place="row-span-2 lg:col-span-3 lg:col-start-10 lg:row-span-2 lg:row-start-1">
        <div className="absolute top-4 right-4 grid justify-items-end gap-2 text-[13px] sm:text-[16px]">
          <p className="sb-bubble rounded-[22px] rounded-tr-[8px] bg-surface px-4 py-2.5 font-semibold whitespace-nowrap">I&rsquo;m at the gate</p>
          <p className="sb-bubble mr-6 rounded-full bg-ink px-4 py-1.5 text-[0.85em] whitespace-nowrap text-surface tabular-nums">0300 ••• ••••</p>
        </div>
      </Tile>

      <Tile ground="surface" step={5} big={2.1} title="Report anytime" line="Every trip has a report button." place="row-span-2 lg:col-span-3 lg:col-start-10 lg:row-span-2 lg:row-start-3">
        <span className="sb-report absolute top-5 right-5 rounded-full bg-ink px-5 py-2.5 text-[15px] font-semibold whitespace-nowrap text-surface sm:text-[20px]">Report</span>
      </Tile>

      <Tile ground="panel" step={6} big={1.9} title="SOS on every trip" line="Sends your trusted contact your live location by SMS." place="row-span-2 lg:col-span-3 lg:col-start-10 lg:row-span-2 lg:row-start-5">
        <span className="sb-sos absolute top-4 right-4 grid h-[72px] w-[72px] place-items-center rounded-full bg-sos font-display text-[18px] font-extrabold text-on-sos sm:h-[96px] sm:w-[96px] sm:text-[24px]">
          SOS
        </span>
      </Tile>

      <Tile ground="surface" step={7} play big={1.25} bigPhone={1.1} title="Rate every trip" line="Riders rate their driver after each ride." place="row-span-2 lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-7">
        <div className="absolute top-4 right-4 flex gap-0.5 text-accent lg:top-6 lg:right-6">
          {[0, 1, 2, 3, 4].map((i) => (
            <Star key={i} size="h-9 w-9 sm:h-11 sm:w-11 lg:h-12 lg:w-12" className="sb-star" style={playAt(250 + i * 130)} />
          ))}
        </div>
      </Tile>

      <Tile ground="brand" step={8} play big={1.2} bigPhone={0.9} title="Share your trip" line="Send your live trip to someone you trust." place="col-span-2 row-span-2 lg:col-span-6 lg:col-start-1 lg:row-span-2 lg:row-start-7">
        <div className="absolute top-5 right-5 flex items-center gap-3 rounded-full bg-surface py-2 pr-2 pl-2 text-[16px] whitespace-nowrap sm:text-[20px] lg:top-6">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-panel font-display font-extrabold">A</span>
          <span>
            <b className="block leading-tight">Ammi</b>
            <span className="text-[16px]">Trusted contact</span>
          </span>
          <Badge className="sb-pulse relative ml-1" style={playAt(500)}>
            Sharing live
          </Badge>
        </div>
      </Tile>
    </ul>
  );
}

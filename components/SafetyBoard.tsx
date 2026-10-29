import Link from "next/link";
import type { ReactNode } from "react";
import { Badge, Tick } from "./Badge";
import { Arrow } from "./Button";
import { reveal } from "./Section";

// A board of the app's real safety controls, each enlarged and cropped by its tile's edges.
// Every item here is a feature shown in the app mocks; wording follows the app (never "NADRA verified").

type TileProps = {
  ground: "cream" | "tint" | "apricot";
  title: string;
  line: string;
  place: string;
  step: number;
  children: ReactNode;
};

const grounds = { cream: "bg-cream", tint: "bg-apricot-tint", apricot: "bg-apricot" };

function Tile({ ground, title, line, place, step, children }: TileProps) {
  return (
    <li {...reveal(step)} className={`relative flex flex-col justify-end overflow-hidden rounded-[28px] p-5 text-cocoa ${grounds[ground]} ${place}`}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
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
    <ul className="grid auto-rows-[28vw] grid-cols-2 gap-[6px] sm:auto-rows-[120px] lg:auto-rows-[104px] lg:grid-cols-12 lg:gap-2">
      <li {...reveal(0)} className="col-span-2 row-span-2 flex flex-col justify-between py-2 lg:col-span-6 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:pr-8">
        <h2 id="safety-title" className="t-h2">
          Safety on every trip.
        </h2>
        <div>
          <p>Checks before anyone drives, and tools on every ride.</p>
          <Link href="/safety/" className="mt-3 inline-flex items-center gap-2 py-2 font-semibold text-apricot underline decoration-2 underline-offset-[6px]">
            How we keep trips safe <Arrow />
          </Link>
        </div>
      </li>

      <Tile ground="tint" step={1} title="Every driver is checked" line="CNIC, a live selfie, licence and car, all reviewed before they can publish a ride." place="col-span-2 row-span-3 lg:col-span-6 lg:col-start-1 lg:row-span-4 lg:row-start-3">
        <div className="absolute top-6 -right-6 grid justify-items-end gap-2.5 text-[20px] sm:-right-10 sm:gap-3 sm:text-[34px] lg:text-[40px]">
          <Badge className="pr-[1.6em]">CNIC reviewed</Badge>
          <Badge className="mr-[2.4em]">Live selfie checked</Badge>
          <Badge className="pr-[1.6em]">Licence checked</Badge>
          <Badge className="mr-[3.2em]">Vehicle checked</Badge>
        </div>
      </Tile>

      <Tile ground="apricot" step={2} title="Women-only rides" line="Choose to ride only with women." place="row-span-2 lg:col-span-3 lg:col-start-7 lg:row-span-4 lg:row-start-3">
        <div className="absolute top-5 -right-10 flex items-center gap-3 rounded-full bg-cream py-2.5 pr-12 pl-4 text-[14px] font-semibold sm:-right-12 sm:py-3 sm:pr-16 sm:pl-5 sm:text-[24px] lg:top-10 lg:text-[28px]">
          <span className="whitespace-nowrap">Women-only</span>
          <span className="relative h-[1.5em] w-[2.6em] flex-none rounded-full bg-cocoa">
            <span className="absolute top-[0.15em] right-[0.15em] h-[1.2em] w-[1.2em] rounded-full bg-apricot" />
          </span>
        </div>
      </Tile>

      <Tile ground="cream" step={3} title="Every rider too" line="Each account starts with a verified phone number." place="row-span-2 lg:col-span-3 lg:col-start-7 lg:row-span-2 lg:row-start-1">
        <div className="absolute top-5 -right-5 text-[16px] sm:-right-6 sm:text-[24px] lg:top-6 lg:text-[28px]">
          <Badge className="pr-[1.8em]">Phone verified</Badge>
        </div>
      </Tile>

      <Tile ground="apricot" step={4} title="Numbers stay hidden" line="Chat opens once a seat is confirmed." place="row-span-2 lg:col-span-3 lg:col-start-10 lg:row-span-2 lg:row-start-1">
        <div className="absolute top-4 -right-10 grid justify-items-end gap-2 text-[13px] sm:text-[18px]">
          <p className="rounded-[22px] rounded-tr-[8px] bg-cream py-2.5 pr-14 pl-4 font-semibold whitespace-nowrap sm:py-3 sm:pl-5">I&rsquo;m at the gate</p>
          <p className="mr-14 rounded-full bg-cocoa px-4 py-1.5 text-[0.85em] whitespace-nowrap text-cream tabular-nums">0300 ••• ••••</p>
        </div>
      </Tile>

      <Tile ground="cream" step={5} title="Report anytime" line="Every trip has a report button." place="row-span-2 lg:col-span-3 lg:col-start-10 lg:row-span-2 lg:row-start-3">
        <span className="absolute top-5 -right-10 rounded-full bg-cocoa py-2.5 pr-14 pl-5 text-[15px] font-semibold whitespace-nowrap text-cream sm:py-3 sm:pr-16 sm:pl-6 sm:text-[22px]">Report</span>
      </Tile>

      <Tile ground="tint" step={6} title="SOS on every trip" line="Sends your trusted contact your live location by SMS." place="row-span-2 lg:col-span-3 lg:col-start-10 lg:row-span-2 lg:row-start-5">
        <span className="absolute -top-6 -right-6 grid h-[100px] w-[100px] place-items-center rounded-full bg-cocoa font-display text-[22px] font-extrabold text-cream sm:-top-8 sm:-right-8 sm:h-[150px] sm:w-[150px] sm:text-[30px]">
          <span className="-translate-x-2 translate-y-1.5 sm:-translate-x-2.5 sm:translate-y-2">SOS</span>
        </span>
      </Tile>

      <Tile ground="cream" step={7} title="Rate every trip" line="Riders rate their driver after each ride." place="row-span-2 lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-7">
        <div className="absolute top-4 -right-8 flex gap-0.5 text-apricot lg:top-6 lg:right-8">
          {[0, 1, 2, 3, 4].map((i) => (
            <svg key={i} viewBox="0 0 24 24" className="h-10 w-10 fill-current sm:h-12 sm:w-12 lg:h-14 lg:w-14">
              <path d="M12 2.8l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 16.8l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" />
            </svg>
          ))}
        </div>
      </Tile>

      <Tile ground="apricot" step={8} title="Share your trip" line="Send your live trip to someone you trust." place="col-span-2 row-span-2 lg:col-span-6 lg:col-start-1 lg:row-span-2 lg:row-start-7">
        <div className="absolute top-5 -right-10 flex items-center gap-3 rounded-full bg-cream py-3 pr-14 pl-3 text-[18px] sm:text-[22px] lg:top-6">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-apricot-tint font-display font-extrabold">A</span>
          <span>
            <b className="block leading-tight">Ammi</b>
            <span className="text-[16px]">Trusted contact</span>
          </span>
          <span className="ml-3 flex items-center gap-1.5 rounded-full bg-trust px-3 py-1.5 text-[15px] font-semibold text-white">
            <Tick /> Sharing live
          </span>
        </div>
      </Tile>
    </ul>
  );
}

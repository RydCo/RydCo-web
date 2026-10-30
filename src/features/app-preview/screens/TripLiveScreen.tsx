import { Tick } from "@/components/ui/icons";
import { Header, Body } from "./parts";

export function TripLiveScreen() {
  return (
    <>
      <Header title="Trip in progress" back={false} />
      <Body>
        <div className="relative overflow-hidden rounded-[20px] bg-apricot-tint">
          <svg viewBox="0 0 260 150" className="block h-auto w-full" aria-hidden="true">
            <path d="M-10 120 C60 120 70 60 130 62 S210 30 270 34" className="fill-none stroke-white" strokeWidth="16" strokeLinecap="round" />
            <path d="M-10 120 C60 120 70 60 130 62 S210 30 270 34" className="fill-none stroke-apricot-deep" strokeWidth="6" strokeLinecap="round" />
            <circle cx="214" cy="38" r="9" className="fill-white stroke-cocoa" strokeWidth="4" />
            <g transform="translate(118 60) scale(1.3)">
              <rect className="fill-cocoa" x="-15" y="-10" width="30" height="8" rx="3" />
              <path className="fill-cocoa" d="M-9 -10 L-5 -16 H6 L10 -10Z" />
              <rect className="fill-apricot-tint" x="-4" y="-14.5" width="8" height="3.5" rx="1" />
              <circle className="fill-cocoa" cx="-8.5" cy="-1.5" r="3.2" />
              <circle className="fill-cocoa" cx="8.5" cy="-1.5" r="3.2" />
            </g>
          </svg>
        </div>
        <div className="rounded-[18px] bg-white p-3.5">
          <p className="text-[12px] text-cocoa-soft">Next stop</p>
          <p className="flex justify-between font-semibold">
            <span>Arfa Tower gate</span>
            <span className="tabular-nums">8:20</span>
          </p>
          <p className="mt-2 w-fit rounded-full bg-apricot-tint px-2.5 py-1 text-[12px] font-semibold">Rs 180 · locked</p>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {["Share trip", "Chat"].map((a) => (
            <span key={a} className="grid h-14 place-items-center rounded-[16px] bg-white text-[12.5px] font-semibold">
              {a}
            </span>
          ))}
          <span className="grid h-14 place-items-center rounded-[16px] bg-cocoa font-display text-[15px] font-extrabold text-cream">SOS</span>
        </div>
        <p className="flex items-center gap-1.5 text-[12px]">
          <Tick className="text-trust" /> Sharing live with Ammi
        </p>
      </Body>
    </>
  );
}

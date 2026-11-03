"use client";

import { useState, type ReactNode } from "react";
import { CarMark } from "@/components/brand/Car";
import { Dropdown } from "@/components/forms/Dropdown";
import { fieldFocus } from "@/components/forms/field-base";
import { Pin } from "@/components/ui/icons";
import { areaMap, areaPlaceholder, areaSearch, commuteEnds } from "@/config/pilot";
import { AreaMap } from "@/features/area-map/AreaMap";
import { preloadMap } from "@/features/area-map/preload";
import { setCommute, useCommute } from "@/features/commute/commute-store";

type End = keyof typeof commuteEnds;

// Each end's mark: on the route rail, and on the map's pin.
const marks: Record<End, ReactNode> = {
  from: <span className="block h-3.5 w-3.5 rounded-full bg-ink" />,
  to: <CarMark />,
};

// One end of the trip, read like a field (as in Uber's and Lyft's trip fields, with no chevron): a tap on the row opens
// its searchable list, and the quiet map icon at its end opens the map for finding the area by eye.
function Area({ me, end, value }: { me: string; end: End; value: string }) {
  const { label, areas } = commuteEnds[end];
  const [mapOpen, setMapOpen] = useState(false);
  const id = `${me}-${end}`;
  const pick = (area: string) => setCommute({ [end]: area });

  return (
    <div className="flex items-center gap-1">
      <Dropdown
        id={id}
        name={end}
        label={label}
        value={value}
        onChange={pick}
        options={areas}
        search={areaSearch}
        className="min-w-0 flex-1"
        triggerClassName={`${fieldFocus} flex min-h-[64px] w-full items-center gap-3.5 rounded-[22px] px-4 text-left hover:bg-surface`}
      >
        <span className="relative z-[2] grid w-[26px] flex-none place-items-center">{marks[end]}</span>
        <span className="min-w-0 flex-1">
          <span aria-hidden="true" className="block text-[14px] leading-tight font-semibold">
            {label}
          </span>
          <span className={`block truncate text-[17px] leading-snug ${value ? "font-semibold" : "text-ink-soft"}`}>{value || areaPlaceholder}</span>
        </span>
      </Dropdown>
      <button
        type="button"
        onClick={() => setMapOpen(true)}
        title={areaMap.open(label)}
        className={`${fieldFocus} grid h-11 w-11 flex-none place-items-center rounded-full text-ink-soft transition-colors duration-150 hover:bg-panel hover:text-accent-deep`}
      >
        <span className="sr-only">{areaMap.open(label)}</span>
        <Pin />
      </button>
      {mapOpen && <AreaMap id={`${id}-map`} end={end} value={value} marker={marks[end]} onPick={pick} onClose={() => setMapOpen(false)} />}
    </div>
  );
}

// The commute picker, the app's "Find a ride" card: where you start above where you're headed, joined by the route
// running down from the start dot to the car. The hero and the waitlist form both use it, and share the route chosen,
// so a choice in one shows in the other. `me` names this copy, for its ids; `action` runs full width under the two
// ends. Touching the card starts loading the map, so it opens quickly.
export function RoutePicker({ me, action }: { me: string; action?: ReactNode }) {
  const { from, to } = useCommute();
  return (
    <div onPointerEnter={preloadMap} onFocusCapture={preloadMap} className="relative grid gap-1.5 rounded-surface bg-screen p-2">
      <span aria-hidden="true" className="absolute top-[40px] left-[35px] z-[1] h-[70px] w-[4px] rounded-full bg-accent-strong" />
      <Area me={me} end="from" value={from} />
      <Area me={me} end="to" value={to} />
      {action}
    </div>
  );
}

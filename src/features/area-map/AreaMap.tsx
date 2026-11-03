"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Dropdown } from "@/components/forms/Dropdown";
import { fieldFocus } from "@/components/forms/field-base";
import { buttonClasses, iconButtonClasses } from "@/components/ui/button-styles";
import { Close, Locate, Minus, Plus, Search } from "@/components/ui/icons";
import { areaMap, commuteEnds } from "@/config/pilot";
import type { AreaMapEngine } from "./map-engine";
import { nearestArea } from "./nearest-area";

type Point = [number, number];

const lahoreMiddle: Point = [31.5, 74.33];
const cityZoom = 11;
const areaZoom = 13.5;

// "Find on the map": the map moves under a pin fixed in its middle, a search at the top jumps it to a named area, and
// the sheet at the bottom names the area the pin is in with one button to use it. Only that name leaves this
// dialog. The map's code and tiles load when the picker is first touched (preload.ts), never for people who don't
// use it. A native modal dialog: it holds focus, closes on Escape, and gives focus back to the button that opened it.
export function AreaMap({
  id,
  end,
  value,
  marker,
  onPick,
  onClose,
}: {
  id: string;
  end: keyof typeof commuteEnds;
  value: string;
  marker: ReactNode;
  onPick: (area: string) => void;
  onClose: () => void;
}) {
  const { places, areas, mapTitle } = commuteEnds[end];
  const dialog = useRef<HTMLDialogElement>(null);
  const holder = useRef<HTMLDivElement>(null);
  const map = useRef<AreaMapEngine | null>(null);
  // It opens on the area already chosen, or on the whole city.
  const [opening] = useState(() => places.find((p) => p.name === value)?.at);
  const [pin, setPin] = useState<Point>(opening ?? lahoreMiddle);
  const [moving, setMoving] = useState(false);
  const [ready, setReady] = useState(false);
  const [note, setNote] = useState("");
  const [found, setFound] = useState("");
  const area = nearestArea(places, pin);

  useEffect(() => {
    dialog.current?.showModal();
    let gone = false;
    import("./map-engine").then(async ({ createMap }) => {
      if (gone || !holder.current) return;
      const engine = await createMap(holder.current, opening ?? lahoreMiddle, opening ? areaZoom : cityZoom, {
        ready: () => setReady(true),
        moving: () => setMoving(true),
        moved: (at) => {
          setMoving(false);
          setPin(at);
        },
      });
      if (gone) engine.remove();
      else map.current = engine;
    });
    return () => {
      gone = true;
      map.current?.remove();
      map.current = null;
    };
  }, [opening]);

  const shut = () => dialog.current?.close();

  function jump(name: string) {
    setFound(name);
    const at = places.find((p) => p.name === name)?.at;
    if (at) map.current?.goTo(at, areaZoom);
  }

  // The position is used once, to move the map, and never kept.
  function locate() {
    setNote("");
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => map.current?.goTo([coords.latitude, coords.longitude], areaZoom),
      () => setNote(areaMap.locateFailed),
      { timeout: 10000, maximumAge: 60000 },
    );
  }

  function confirm() {
    onPick(area?.name ?? areaMap.other);
    shut();
  }

  const control = `${iconButtonClasses(true)} h-11 w-11`;

  return (
    <dialog
      ref={dialog}
      aria-labelledby={`${id}-title`}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && shut()}
      className="m-0 h-svh max-h-none w-full max-w-none overflow-hidden bg-screen p-0 text-ink backdrop:bg-scrim sm:m-auto sm:h-[min(720px,90svh)] sm:w-[min(760px,calc(100vw-48px))] sm:rounded-surface sm:shadow-float"
    >
      <div className="flex h-full flex-col">
        <div className="flex flex-none items-center gap-3 px-4 pt-4 pb-3 sm:px-6 sm:pt-5">
          <h2 id={`${id}-title`} className="min-w-0 flex-1 t-title">
            {mapTitle}
          </h2>
          <button type="button" onClick={shut} className={iconButtonClasses()}>
            <span className="sr-only">{areaMap.close}</span>
            <Close />
          </button>
        </div>
        <div className="flex-none px-4 pb-3 sm:px-6">
          <Dropdown
            id={`${id}-search`}
            name={`${id}-search`}
            label={areaMap.search.placeholder}
            value={found}
            onChange={jump}
            options={areas.filter((o) => o.value !== areaMap.other)}
            search={areaMap.search}
            triggerClassName={`${fieldFocus} flex h-12 w-full items-center gap-3 rounded-full bg-panel px-4 text-left text-[17px] text-ink-soft`}
          >
            <Search />
            <span className="truncate">{areaMap.search.placeholder}</span>
          </Dropdown>
        </div>

        <div className="area-map relative min-h-0 flex-1 bg-panel">
          {/* MapLibre makes its own container position: relative, so the map fills a wrapper rather than being placed itself. */}
          <div className="absolute inset-0 z-0">
            <div ref={holder} className="h-full w-full" />
          </div>
          {!ready && <p className="absolute inset-0 grid place-items-center text-ink-soft">{areaMap.loading}</p>}
          {/* The pin stands on the middle of the map and lifts while the map moves under it. */}
          <div aria-hidden="true" className="pointer-events-none absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-full">
            <div data-moving={moving || undefined} className="area-pin flex flex-col items-center">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-screen shadow-lift">{marker}</span>
              <span className="h-4 w-[3px] rounded-full bg-ink" />
            </div>
          </div>
          <span aria-hidden="true" className="pointer-events-none absolute top-1/2 left-1/2 z-10 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-strong" />
          <div className="absolute right-3 bottom-10 z-10 grid gap-2">
            <button type="button" onClick={locate} disabled={!ready} className={control}>
              <span className="sr-only">{areaMap.locate}</span>
              <Locate />
            </button>
            <button type="button" onClick={() => map.current?.zoomIn()} disabled={!ready} className={control}>
              <span className="sr-only">{areaMap.zoomIn}</span>
              <Plus />
            </button>
            <button type="button" onClick={() => map.current?.zoomOut()} disabled={!ready} className={control}>
              <span className="sr-only">{areaMap.zoomOut}</span>
              <Minus />
            </button>
          </div>
        </div>

        {/* The sheet: where the pin is, and one button to use it. */}
        <div className="relative z-10 -mt-5 flex-none rounded-t-surface bg-screen px-4 pt-5 pb-4 shadow-sheet sm:px-6 sm:pb-6">
          <div aria-live="polite" className="flex min-h-[56px] items-center gap-3.5">
            <span aria-hidden="true" className="grid h-12 w-12 flex-none place-items-center rounded-full bg-panel">
              {marker}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[14px] text-ink-soft">{area ? areaMap.nearest : areaMap.none}</span>
              <span className="block truncate text-[19px] leading-snug font-semibold">{area ? area.name : areaMap.other}</span>
              <span className="block text-[14px] text-ink-soft">{area ? area.zone : areaMap.noneHint}</span>
            </span>
          </div>
          {note && <p className="mt-2 text-[14px] text-accent-deep">{note}</p>}
          <p className="mt-1 text-[13px] text-ink-soft">{areaMap.help}</p>
          <button type="button" onClick={confirm} disabled={!ready} className={`${buttonClasses("primary")} mt-4 w-full`}>
            {area ? areaMap.use(area.name) : areaMap.useOther}
          </button>
        </div>
      </div>
    </dialog>
  );
}

"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Dropdown } from "@/components/forms/Dropdown";
import { fieldFocus } from "@/components/forms/field-base";
import { buttonClasses, iconButtonClasses } from "@/components/ui/button-styles";
import { Close, Locate, Search } from "@/components/ui/icons";
import { areaMap, commuteEnds, type Point } from "@/config/pilot";
import type { AreaMapEngine } from "./map-engine";
import { areaNamed, nearestArea } from "./nearest-area";

const lahoreMiddle: Point = [31.5, 74.33];
const cityZoom = 11;
const areaZoom = 13.5;

// The map-pin button's dialog: the map fills it and moves under a pin fixed in its middle. Floating over it are the
// search (which jumps to a named area) with the close button, a locate button, and a card naming the area the pin is
// in with one button to use it. Only that name leaves this dialog. The map's code and tiles load when the picker is
// first touched (preload.ts), never for people who don't use it. A native modal dialog: it holds focus, closes on
// Escape, and gives focus back to the button that opened it.
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
  const credit = useRef<HTMLDivElement>(null);
  const map = useRef<AreaMapEngine | null>(null);
  // It opens on the area already chosen, or on the whole city.
  const [opening] = useState(() => areaNamed(places, value)?.at);
  const [pin, setPin] = useState<Point>(opening ?? lahoreMiddle);
  const [moving, setMoving] = useState(false);
  const [state, setState] = useState<"loading" | "ready" | "failed">("loading");
  const ready = state === "ready";
  const [note, setNote] = useState("");
  const [found, setFound] = useState("");
  const area = nearestArea(places, pin);

  useEffect(() => {
    // Focus starts on the dialog itself, not on the search, so it opens on the map rather than a lit-up field.
    dialog.current?.showModal();
    dialog.current?.focus();
    let gone = false;
    import("./map-engine").then(async ({ createMap }) => {
      if (gone || !holder.current || !credit.current) return;
      const engine = await createMap(holder.current, credit.current, opening ?? lahoreMiddle, opening ? areaZoom : cityZoom, {
        ready: () => setState("ready"),
        moving: () => setMoving(true),
        moved: (at) => {
          setMoving(false);
          setPin(at);
        },
      });
      if (gone) engine.remove();
      else map.current = engine;
    }).catch(() => !gone && setState("failed"));
    return () => {
      gone = true;
      map.current?.remove();
      map.current = null;
    };
  }, [opening]);

  const shut = () => dialog.current?.close();

  function jump(name: string) {
    setFound(name);
    const at = areaNamed(places, name)?.at;
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

  return (
    <dialog
      ref={dialog}
      tabIndex={-1}
      aria-labelledby={`${id}-title`}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && shut()}
      className="m-0 h-svh max-h-none w-full max-w-none overflow-hidden bg-panel p-0 text-ink outline-none backdrop:bg-scrim sm:m-auto sm:h-[min(640px,88svh)] sm:w-[min(720px,calc(100vw-48px))] sm:rounded-surface sm:shadow-float"
    >
      <h2 id={`${id}-title`} className="sr-only">
        {mapTitle}
      </h2>
      <div className="area-map absolute inset-0">
        {/* MapLibre makes its own container position: relative, so the map fills a wrapper rather than being placed itself. */}
        <div ref={holder} className="h-full w-full" />
      </div>
      {!ready && <p className="absolute inset-0 grid place-items-center px-8 text-center text-ink-soft">{state === "failed" ? areaMap.failed : areaMap.loading}</p>}

      {/* The pin stands on the middle of the map and lifts while the map moves under it. */}
      <div aria-hidden="true" className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full">
        <div data-moving={moving || undefined} className="area-pin flex flex-col items-center">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-screen shadow-lift">{marker}</span>
          <span className="h-4 w-[3px] rounded-full bg-ink" />
        </div>
      </div>
      <span aria-hidden="true" className="pointer-events-none absolute top-1/2 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-strong" />

      <div className="absolute inset-x-0 top-0 flex items-center gap-2 p-3 sm:p-4">
        <Dropdown
          id={`${id}-search`}
          name={`${id}-search`}
          label={areaMap.search.placeholder}
          value={found}
          onChange={jump}
          options={areas.filter((o) => o.value !== areaMap.other)}
          search={areaMap.search}
          className="min-w-0 flex-1"
          triggerClassName={`${fieldFocus} flex h-12 w-full items-center gap-3 rounded-full bg-screen px-4 text-left text-[17px] font-semibold shadow-panel`}
        >
          <Search className="text-ink-soft" />
          <span className="truncate">{mapTitle}</span>
        </Dropdown>
        <button type="button" onClick={shut} className={iconButtonClasses(true)}>
          <span className="sr-only">{areaMap.close}</span>
          <Close />
        </button>
      </div>

      <div className="absolute inset-x-3 bottom-3 sm:inset-x-4 sm:bottom-4">
        <div className="mb-2 flex items-end justify-between gap-3">
          {/* The map's credit (map-engine.ts puts it here); MapLibre's styles for it expect this class. */}
          <div ref={credit} className="area-credit maplibregl-ctrl-bottom-left" />
          <button type="button" onClick={locate} disabled={!ready} className={iconButtonClasses(true)}>
            <span className="sr-only">{areaMap.locate}</span>
            <Locate />
          </button>
        </div>
        <div className="flex flex-col gap-3 rounded-[24px] bg-screen p-3 pl-5 shadow-float sm:flex-row sm:items-center sm:gap-4">
          <div aria-live="polite" className="min-w-0 flex-1">
            <p className="truncate text-[19px] leading-snug font-semibold">{area ? area.name : areaMap.other}</p>
            <p className="truncate text-[14px] text-ink-soft">{note || (area ? area.zone : areaMap.notListed)}</p>
          </div>
          <button type="button" onClick={confirm} disabled={!ready} className={`${buttonClasses("primary")} sm:flex-none`}>
            {areaMap.confirm}
          </button>
        </div>
      </div>
    </dialog>
  );
}

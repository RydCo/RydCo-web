"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Badge } from "@/components/ui/Badge";
import { buttonClasses, iconButtonClasses } from "@/components/ui/button-styles";
import { Close, Locate, Minus, Plus } from "@/components/ui/icons";
import { areaMap, commuteEnds, inPilot, notCovered } from "@/config/pilot";
import type { AreaLeafletMap } from "./leaflet-map";
import { nearestArea } from "./nearest-area";

type Point = [number, number];

const lahoreMiddle: Point = [31.5, 74.33];
const cityZoom = 12;
const areaZoom = 14;

// "Choose on map": the map moves under a pin fixed in its middle, and the panel below names the area the pin is in.
// Only that name leaves this dialog. The map itself (Leaflet and the OpenStreetMap tiles) loads when the dialog opens,
// so nobody who never opens it downloads it. A native modal dialog: it holds focus, closes on Escape, and gives
// focus back to the picker that opened it.
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
  const { places, mapTitle } = commuteEnds[end];
  const dialog = useRef<HTMLDialogElement>(null);
  const holder = useRef<HTMLDivElement>(null);
  const map = useRef<AreaLeafletMap | null>(null);
  // It opens on the area already chosen, or on the whole city.
  const [opening] = useState(() => places.find((p) => p.name === value)?.at);
  const [pin, setPin] = useState<Point>(opening ?? lahoreMiddle);
  const [moving, setMoving] = useState(false);
  const [ready, setReady] = useState(false);
  const [note, setNote] = useState("");
  const area = nearestArea(places, pin);

  useEffect(() => {
    dialog.current?.showModal();
    let gone = false;
    import("./leaflet-map").then(({ createMap }) => {
      if (gone || !holder.current) return;
      map.current = createMap(holder.current, opening ?? lahoreMiddle, opening ? areaZoom : cityZoom, {
        moving: () => setMoving(true),
        moved: (at) => {
          setMoving(false);
          setPin(at);
        },
      });
      setReady(true);
    });
    return () => {
      gone = true;
      map.current?.remove();
      map.current = null;
    };
  }, [opening]);

  const shut = () => dialog.current?.close();

  // The position is used once, to move the map, and never kept.
  function locate() {
    setNote("");
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => map.current?.setView([coords.latitude, coords.longitude], areaZoom),
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
      className="m-0 h-svh max-h-none w-full max-w-none bg-screen p-0 text-ink backdrop:bg-scrim sm:m-auto sm:h-[min(680px,90svh)] sm:w-[min(760px,calc(100vw-48px))] sm:rounded-surface sm:shadow-float"
    >
      <div className="flex h-full flex-col">
        <div className="flex flex-none items-start gap-3 p-4 pb-3 sm:px-6 sm:pt-5">
          <div className="min-w-0 flex-1">
            <h2 id={`${id}-title`} className="t-title">
              {mapTitle}
            </h2>
            <p className="mt-1 text-[15px] text-ink-soft">{areaMap.help}</p>
          </div>
          <button type="button" onClick={shut} className={iconButtonClasses()}>
            <span className="sr-only">{areaMap.close}</span>
            <Close />
          </button>
        </div>

        <div className="area-map relative min-h-0 flex-1 bg-panel">
          <div ref={holder} className="absolute inset-0 z-0" />
          {!ready && <p className="absolute inset-0 grid place-items-center text-ink-soft">{areaMap.loading}</p>}
          {/* The pin stands on the middle of the map and lifts while the map moves under it. */}
          <div aria-hidden="true" className="pointer-events-none absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-full">
            <div data-moving={moving || undefined} className="area-pin flex flex-col items-center">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-screen shadow-lift">{marker}</span>
              <span className="h-4 w-[3px] rounded-full bg-ink" />
            </div>
          </div>
          <span aria-hidden="true" className="pointer-events-none absolute top-1/2 left-1/2 z-10 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-strong" />
          <div className="absolute right-3 bottom-8 z-10 grid gap-2">
            {"geolocation" in navigator && (
              <button type="button" onClick={locate} disabled={!ready} className={control}>
                <span className="sr-only">{areaMap.locate}</span>
                <Locate />
              </button>
            )}
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

        <div className="flex flex-none flex-col gap-3 p-4 sm:flex-row sm:items-center sm:gap-6 sm:px-6 sm:pb-5">
          <div aria-live="polite" className="min-h-[52px] min-w-0 flex-1">
            {area ? (
              <>
                <p className="text-[14px] text-ink-soft">{areaMap.nearest}</p>
                <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[19px] leading-snug font-semibold">
                  {area.name}
                  <span className="text-[15px]">{area.covered ? <Badge>{inPilot}</Badge> : <Badge tone="neutral">{notCovered}</Badge>}</span>
                </p>
              </>
            ) : (
              <>
                <p className="text-[17px] font-semibold">{areaMap.none}</p>
                <p className="text-[14px] text-ink-soft">{areaMap.noneHint}</p>
              </>
            )}
            {note && <p className="mt-1 text-[14px] text-accent-deep">{note}</p>}
          </div>
          <button type="button" onClick={confirm} disabled={!ready} className={`${buttonClasses("primary")} sm:flex-none`}>
            {area ? areaMap.use(area.name) : areaMap.useOther}
          </button>
        </div>
      </div>
    </dialog>
  );
}

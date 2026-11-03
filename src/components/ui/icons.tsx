// Every UI icon on the site, from Phosphor (bold, to sit with Figtree's semibold labels). Import icons from here, never
// from Phosphor directly, so the weight and default sizes stay in one place. Brand drawings (the route, the car, maps)
// are not icons and live in components/brand.
import type { CSSProperties } from "react";
import {
  ArrowRight,
  CaretDown,
  CaretLeft,
  Check,
  Crosshair,
  EnvelopeSimple,
  InstagramLogo,
  List,
  MagnifyingGlass,
  MapPin,
  Pause as PauseIcon,
  Play as PlayIcon,
  Plus as PlusIcon,
  Star as StarIcon,
  X,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";

// `size` replaces an icon's default size classes rather than competing with them in `className`.
const make = (Glyph: Icon, defaultSize: string, weight: "bold" | "fill" = "bold") =>
  function UiIcon({ className = "", size = defaultSize, style }: { className?: string; size?: string; style?: CSSProperties }) {
    return <Glyph aria-hidden="true" weight={weight} style={style} className={`flex-none ${size} ${className}`} />;
  };

export const Arrow = make(ArrowRight, "h-5 w-5");
export const Tick = make(Check, "h-[1em] w-[1em]");
export const Chevron = make(CaretDown, "h-5 w-5");
export const Back = make(CaretLeft, "h-4 w-4");
export const Menu = make(List, "h-6 w-6");
export const Close = make(X, "h-6 w-6");
export const Pause = make(PauseIcon, "h-4 w-4", "fill");
export const Play = make(PlayIcon, "h-4 w-4", "fill");
export const Plus = make(PlusIcon, "h-5 w-5");
export const Pin = make(MapPin, "h-5 w-5");
export const Locate = make(Crosshair, "h-5 w-5");
export const Star = make(StarIcon, "", "fill");
export const Mail = make(EnvelopeSimple, "h-5 w-5");
export const Search = make(MagnifyingGlass, "h-5 w-5");
export const Instagram = make(InstagramLogo, "h-5 w-5");

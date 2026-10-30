import { RouteBand } from "./RouteBand";

// The route crossing the page on a brand-coloured strip, between two sections.
export function RouteDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-brand ${className}`}>
      <RouteBand />
    </div>
  );
}

import { RouteBand } from "./RouteBand";

// The route crossing the page on a brand-coloured strip, between two sections.
export function RouteDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`field-brand ${className}`}>
      <RouteBand />
    </div>
  );
}

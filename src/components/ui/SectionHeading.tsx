import type { ReactNode } from "react";
import { reveal } from "@/lib/reveal";

type Props = { id: string; title: ReactNode; lead?: ReactNode; layout?: "stack" | "split" };

// A section's heading and its opening line, rising in one after the other. `stack` puts the line under the heading;
// `split` sets them side by side on wide screens, the line bottom-aligned on the right. `id` is what the section's
// `labelledBy` points at.
export function SectionHeading({ id, title, lead, layout = "stack" }: Props) {
  const heading = (
    <h2 id={id} className={`t-h2 ${layout === "split" ? "lg:col-span-6" : ""}`} {...reveal(0)}>
      {title}
    </h2>
  );
  if (layout === "split") {
    return (
      <div className="grid gap-6 lg:grid-cols-12">
        {heading}
        {lead && (
          <p className="max-w-[44ch] lg:col-span-5 lg:col-start-8 lg:self-end" {...reveal(1)}>
            {lead}
          </p>
        )}
      </div>
    );
  }
  return (
    <>
      {heading}
      {lead && (
        <p className="mt-6 max-w-[46ch]" {...reveal(1)}>
          {lead}
        </p>
      )}
    </>
  );
}

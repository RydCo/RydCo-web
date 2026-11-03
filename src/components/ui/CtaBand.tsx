import type { ReactNode } from "react";
import { reveal } from "@/lib/reveal";
import { Section } from "./Section";
import { SectionHeading } from "./SectionHeading";

// A page's closing call to action, as its own section: the heading and its line on the left, the actions at the right
// edge on wide screens. It always sits on the warm brand ground, so it never runs into the ink footer below it.
export function CtaBand({ id, title, lead, actions }: { id: string; title: ReactNode; lead?: ReactNode; actions: ReactNode }) {
  return (
    <Section ground="brand" labelledBy={id}>
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <SectionHeading id={id} title={title} lead={lead} />
        </div>
        <div className="flex flex-col items-start gap-4 lg:col-span-4 lg:items-end" {...reveal(2)}>
          {actions}
        </div>
      </div>
    </Section>
  );
}

import type { ReactNode } from "react";
import { PageHero } from "@/components/ui/PageHero";

export type LegalSection = { id: string; title: string; body: ReactNode };

// Placeholder structure for the legal pages. Everything here is a draft until a lawyer has reviewed it.
export function LegalPage({ title, lead, sections }: { title: string; lead: string; sections: LegalSection[] }) {
  return (
    <>
      <PageHero ground="surface" title={title} lead={lead} />
      <div className="bg-surface pb-24 lg:pb-40">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-10">
          <aside className="lg:col-span-4">
            <div className="on-ink rounded-surface bg-ink p-7 text-surface lg:sticky lg:top-32">
              <p className="font-display text-[22px] leading-tight font-bold">Draft, to be reviewed by a lawyer</p>
              <p className="mt-3 text-[16px]">
                This page shows the structure we plan to use. It is not final and is not legal advice. Items marked [FILL] still need a decision.
              </p>
              <p className="mt-4 text-[16px]">Last updated: [FILL date]</p>
            </div>
            <nav aria-label="On this page" className="mt-8 hidden lg:block">
              <ol className="grid gap-1">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="inline-block py-1.5 text-[16px] underline-offset-4 hover:underline">
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>
          <div className="grid max-w-[68ch] gap-14 lg:col-span-7 lg:col-start-6">
            {sections.map((s) => (
              <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`}>
                <h2 id={`${s.id}-title`} className="font-display text-[clamp(26px,2.4vw,34px)] leading-tight font-extrabold tracking-tight">
                  {s.title}
                </h2>
                <div className="mt-4 grid gap-4 [&_li]:ml-5 [&_li]:list-disc [&_ul]:grid [&_ul]:gap-2">{s.body}</div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";

type LegalSection = { id: string; title: string; body: ReactNode };

// The legal pages. Everything here is a draft until a lawyer has reviewed it.
export function LegalPage({ title, lead, sections }: { title: string; lead: string; sections: LegalSection[] }) {
  return (
    <>
      <PageHero ground="surface" title={title} lead={lead} />
      <Section pad="bottom">
        {/* The draft notice reads once, across the top. Only the contents list follows you down the page, so nothing overlaps. */}
        <Card tone="ink" pad="md" className="flex flex-col gap-2 md:flex-row md:items-baseline md:gap-6">
          <p className="flex-none font-display text-[20px] leading-tight font-bold">Draft, to be reviewed by a lawyer</p>
          <p className="text-[16px]">
            A qualified lawyer in Pakistan hasn&rsquo;t reviewed this yet. It is not final and is not legal advice, and the time limits in it may change before the
            app opens. <span className="whitespace-nowrap">Draft 2, last updated 2 November 2026.</span>
          </p>
        </Card>
        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-10">
          <nav aria-labelledby="contents-title" className="hidden lg:col-span-4 lg:block">
            <div className="sticky top-28">
              <p id="contents-title" className="t-small text-ink-soft">
                On this page
              </p>
              <ol className="mt-3 grid gap-1">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="inline-block py-1.5 text-[16px] underline-offset-4 hover:underline">
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>
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
      </Section>
    </>
  );
}

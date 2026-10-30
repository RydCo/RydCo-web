import { ExampleTag } from "@/components/ui/ExampleTag";
import { Section } from "@/components/ui/Section";
import { reveal } from "@/lib/reveal";

export function ShareSection() {
  return (
    <Section ground="panel" id="share" labelledBy="share-title">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <h2 id="share-title" className="t-h2" {...reveal(0)}>
            How the share is worked out
          </h2>
          <div className="mt-8 grid gap-5" {...reveal(1)}>
            <p>
              RydCo works out a fair share of the fuel from the distance, your car&rsquo;s class and the fuel price. The fuel is split between everyone in the
              car, you included, plus a small pickup fee for each stop.
            </p>
            <p>The fuel price is locked when you publish, so later price changes don&rsquo;t touch rides you&rsquo;ve already offered.</p>
            <p>When a second rider joins, everyone&rsquo;s share goes down. It never goes above what a rider saw when they requested.</p>
          </div>
        </div>
        <div className="lg:col-span-5 lg:col-start-8" {...reveal(2)}>
          <div data-ui className="relative rounded-surface bg-screen p-7 md:p-9">
            <ExampleTag>Example</ExampleTag>
            <p className="font-semibold">Honda City, 10 km to work</p>
            <p className="mt-1 text-ink-soft">Rs 38.94 per km · Rs 50 pickup fee</p>
            <dl className="mt-7 grid gap-6">
              <div>
                <dt>With one rider</dt>
                <dd className="mt-1 font-display text-[44px] leading-none font-extrabold tracking-tight">Rs 245</dd>
                <dd className="mt-2 text-[15px] text-ink-soft">Rs 50 + (10 km × Rs 38.94) ÷ 2 people</dd>
              </div>
              <div>
                <dt>With two riders</dt>
                <dd className="mt-1 font-display text-[44px] leading-none font-extrabold tracking-tight">Rs 180 each</dd>
                <dd className="mt-2 text-[15px] text-ink-soft">Rs 50 + (10 km × Rs 38.94) ÷ 3 people</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </Section>
  );
}

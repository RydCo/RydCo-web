import { Section } from "@/components/ui/Section";
import { reveal } from "@/lib/reveal";

export function ProofSection() {
  return (
    <Section ground="apricot" labelledBy="proof-title">
      <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className="lg:col-span-6">
          <h2 id="proof-title" className="t-h2" {...reveal(0)}>
            Tested with real commuters
          </h2>
          <div className="mt-8 grid gap-5" {...reveal(1)}>
            <p>
              Before building the mobile app, we ran an early web version for FAST-NUCES students and faculty. Without a marketing push, commuters found it and
              started using it on their own.
            </p>
            <p>
              What they told us shaped RydCo: daily commuters aren&rsquo;t looking for another ride-hailing service. They want a trusted, community-run way to share
              rides and split the cost.
            </p>
          </div>
        </div>
        <figure className="lg:col-span-6 lg:col-start-7" {...reveal(2)}>
          <blockquote className="font-display text-[clamp(44px,5.4vw,78px)] leading-[0.95] font-extrabold tracking-[-0.035em]">
            <p className="whitespace-nowrap">&ldquo;A lifesaver.&rdquo;</p>
          </blockquote>
          <figcaption className="mt-6 max-w-[34ch] font-semibold">
            What several FAST-NUCES commuters called the early web app, for getting to campus and around the city.
          </figcaption>
        </figure>
      </div>
    </Section>
  );
}

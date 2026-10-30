import { RouteConverge } from "@/components/brand/RouteConverge";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  return (
    <section aria-labelledby="org-title" className="on-ink overflow-x-clip bg-ink text-surface">
      <div className="wrap pt-14 pb-20 md:pt-20 lg:pt-24 lg:pb-28">
        <h1 id="org-title" className="t-display">
          Better commutes, <span className="whitespace-nowrap">built together.</span>
        </h1>
        <div className="mt-10 grid items-center gap-14 lg:mt-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <p className="max-w-[40ch] t-lead">
            Companies can give their teams a cheaper, safer way to get to work. Sponsors and partners can help it reach more of Pakistan.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href="#companies" variant="brand">
              For companies
            </Button>
            <Button href="#partners" variant="surface">
              For sponsors and partners
            </Button>
          </div>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <RouteConverge from={["Johar Town", "Model Town", "Garden Town", "DHA Phase 5"]} to="Your office" className="mx-auto max-w-[560px]" />
        </div>
        </div>
      </div>
    </section>
  );
}

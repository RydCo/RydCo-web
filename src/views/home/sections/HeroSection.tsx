import { HeroRoute } from "@/components/brand/HeroRoute";
import { Button } from "@/components/ui/Button";
import { site } from "@/config/site";
import { HeroRouteCheck } from "@/features/commute/HeroRouteCheck";

export function HeroSection() {
  return (
    <section aria-labelledby="hero-title" className="overflow-x-clip bg-brand text-ink">
      <div className="wrap pt-12 pb-12 md:pt-16 lg:pt-14 lg:pb-16">
        <h1 id="hero-title" className="t-display">
          Your commute, <span className="whitespace-nowrap">in good company.</span>
        </h1>
        <div className="mt-7 grid gap-7 md:mt-9 lg:grid-cols-12 lg:items-start lg:gap-10">
          <p className="max-w-[36ch] text-[19px] md:text-[21px] lg:col-span-4 lg:pt-2">
            RydCo matches you with people in Lahore who drive your way every day. Share the car and split the fuel cost.
          </p>
          <div className="lg:col-span-8">
            <HeroRouteCheck
              aside={
                <Button href="/drivers/" variant="ghost">
                  Driving to work? Offer a ride
                </Button>
              }
            />
          </div>
        </div>
        <div className="relative mt-8 md:mt-6 lg:mt-2">
          <div className="md:max-w-[980px]">
            <HeroRoute />
          </div>
          <p className="mt-6 font-semibold lg:absolute lg:right-0 lg:bottom-[3%] lg:mt-0">Starting with a pilot in {site.city}</p>
        </div>
      </div>
    </section>
  );
}

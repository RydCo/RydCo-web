import { HeroRoute } from "@/components/brand/HeroRoute";
import { Button } from "@/components/ui/Button";
import { MotionVideo } from "@/components/ui/MotionVideo";
import { site } from "@/config/site";
import { PhoneFrame } from "@/features/app-preview/PhoneFrame";
import { HeroRouteCheck } from "@/features/commute/HeroRouteCheck";

export function HeroSection() {
  return (
    // It fills the first screen under the navbar, so the launch starts from a full hero.
    <section aria-labelledby="hero-title" className="overflow-x-clip field-hero text-ink lg:flex lg:min-h-[calc(100svh-84px)] lg:flex-col lg:justify-center">
      <div className="wrap pt-12 pb-10 md:pt-16 lg:pt-8">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start lg:gap-12">
          <div className="relative z-20 lg:pt-8 xl:pt-[72px]">
            <h1 id="hero-title" className="t-display lg:[--display-size:clamp(60px,6.6vw,96px)]">
              Your commute, <span className="whitespace-nowrap text-sun">in good company.</span>
            </h1>
            <p className="mt-6 max-w-[44ch] t-lead md:mt-7">RydCo matches you with people in Lahore who drive your way every day. Share the car and split the fuel cost.</p>
            <div className="mt-7 md:mt-9">
              <HeroRouteCheck
                aside={
                  <Button href="/drivers/" variant="ghost">
                    Driving to work? Offer a ride
                  </Button>
                }
              />
            </div>
          </div>
          <div className="hero-phone relative z-10">
            <PhoneFrame label="One ride in the RydCo app as a rider and then as its driver, with example names and prices">
              <MotionVideo name="two-rides" className="absolute inset-0 z-20 h-full w-full object-cover" />
            </PhoneFrame>
          </div>
        </div>
        {/* The line runs up behind the phone. */}
        <div className="mt-10 lg:-mt-[44px] xl:-mt-[84px]">
          <HeroRoute label={`Starting with a pilot in ${site.city}`} />
        </div>
      </div>
    </section>
  );
}

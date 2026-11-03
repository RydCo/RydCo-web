import { HeroRoute } from "@/components/brand/HeroRoute";
import { RouteMark } from "@/components/brand/RouteMark";
import { Button } from "@/components/ui/Button";
import { MotionVideo } from "@/components/ui/MotionVideo";
import { site } from "@/config/site";
import { PhoneFrame } from "@/features/app-preview/PhoneFrame";
import { HeroRouteCheck } from "@/features/commute/HeroRouteCheck";

export function HeroSection() {
  return (
    // It fills the first screen under the navbar.
    <section aria-labelledby="hero-title" className="overflow-x-clip field-hero text-ink lg:flex lg:min-h-[calc(100svh-var(--header-h))] lg:flex-col lg:justify-center">
      <div className="wrap pt-12 pb-10 md:pt-16 lg:pt-8">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start lg:gap-x-12 lg:gap-y-8">
          <div className="relative z-20 lg:col-start-1 lg:row-start-1 lg:pt-8 xl:pt-[72px]">
            <p className="mb-5 flex items-center gap-3 font-semibold md:mb-6">
              <RouteMark />
              {site.pilotLine}
            </p>
            <h1 id="hero-title" className="t-display lg:[--display-size:clamp(60px,6.6vw,96px)]">
              {site.tagline.lead} <span className="whitespace-nowrap text-sun">{site.tagline.rest}</span>
            </h1>
            <p className="mt-6 max-w-[44ch] t-lead md:mt-7">Carpooling for Lahore&rsquo;s daily commute. Share a verified commute already going your way, save on travel and help cut emissions.</p>
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
          <div className="hero-phone relative z-10 lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <PhoneFrame label="One ride in the RydCo app as a rider and then as its driver, with example names and prices">
              <MotionVideo name="two-rides" className="absolute inset-0 z-20 h-full w-full object-cover" />
            </PhoneFrame>
          </div>
          {/* The line's own row, starting under the text whatever its height. The phone spans this row too, so the
              line runs behind it, then curls under to where the car parks. */}
          <div className="-mt-4 lg:col-start-1 lg:col-end-3 lg:row-start-2 lg:mt-0">
            <HeroRoute />
          </div>
        </div>
      </div>
    </section>
  );
}

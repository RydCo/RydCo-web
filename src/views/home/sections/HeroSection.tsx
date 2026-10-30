import { HeroRoute } from "@/components/brand/HeroRoute";
import { Button } from "@/components/ui/Button";
import { site } from "@/config/site";
import { AppTour } from "@/features/app-preview/AppTour";
import { journey } from "@/features/app-preview/screens/journey/journey";
import { HeroRouteCheck } from "@/features/commute/HeroRouteCheck";

export function HeroSection() {
  return (
    <section aria-labelledby="hero-title" className="overflow-x-clip field-brand text-ink">
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
          <div className="relative z-10">
            <AppTour slides={journey} seconds={2.2} long note="Names and prices are examples" phoneClassName="hero-phone" />
          </div>
        </div>
        {/* The line runs up behind the phone, above the tour's controls. */}
        <div className="mt-10 lg:-mt-[136px] xl:-mt-[176px] [@media(min-width:80rem)_and_(max-height:860px)]:-mt-[106px]">
          <HeroRoute label={`Starting with a pilot in ${site.city}`} />
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import { RouteBand } from "@/components/brand/RouteBand";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <>
      <PageHero
        title="Wrong turn."
        lead="This page isn't on our route. Let's get you back on the road."
        actions={
          <>
            <Button href="/" variant="onBrand">
              Go to the home page
            </Button>
            <Button href="/how-it-works/" variant="surface">
              How RydCo works
            </Button>
          </>
        }
      />
      <div className="bg-brand pb-16">
        <RouteBand />
      </div>
    </>
  );
}

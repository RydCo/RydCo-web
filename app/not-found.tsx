import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { PageHero } from "@/components/PageHero";
import { RouteBand } from "@/components/RouteLine";

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
            <Button href="/" variant="onApricot">
              Go to the home page
            </Button>
            <Button href="/how-it-works/" variant="cream">
              How RydCo works
            </Button>
          </>
        }
      />
      <div className="bg-apricot pb-16">
        <RouteBand />
      </div>
    </>
  );
}

import type { Metadata } from "next";
import { RouteDivider } from "@/components/brand/RouteDivider";
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
            <Button href="/">
              Go to the home page
            </Button>
            <Button href="/how-it-works/" variant="secondary">
              How RydCo works
            </Button>
          </>
        }
      />
      <RouteDivider className="pb-16" />
    </>
  );
}

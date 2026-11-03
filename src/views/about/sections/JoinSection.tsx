import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
import { riderCta } from "@/config/cta";

export function JoinSection() {
  const cta = riderCta();
  return (
    <CtaBand
      id="join-title"
      title="Come along for the ride."
      lead="Ride or drive on the Lahore pilot, or tell us how RydCo could work for your campus or company."
      actions={
        <>
          <Button href={cta.href} external={cta.external}>
            {cta.label}
          </Button>
          <Button href="/contact/" variant="secondary">
            Contact us
          </Button>
        </>
      }
    />
  );
}

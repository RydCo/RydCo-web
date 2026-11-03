import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
import { partnerEnquiry } from "@/config/contact";
import { mailto } from "@/lib/mailto";

export function PartnerSection() {
  return (
    <CtaBand
      id="partner-title"
      title="Partner with us"
      lead={<>We&rsquo;re looking for incubators, sponsors and employers who want better daily commutes in Pakistan, and want to help the Lahore pilot grow.</>}
      actions={
        <>
          <Button href={partnerEnquiry}>Partner with us</Button>
          <Button href={mailto()} variant="ghost">
            Email us
          </Button>
        </>
      }
    />
  );
}

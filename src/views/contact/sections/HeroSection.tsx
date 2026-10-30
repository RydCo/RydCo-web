import { PageHero } from "@/components/ui/PageHero";

export function HeroSection() {
  return (
    <PageHero
      title={
        <>
          <span className="sm:whitespace-nowrap">Assalam o alaikum.</span> <span className="whitespace-nowrap">Let&rsquo;s talk.</span>
        </>
      }
      lead="Send us a message and someone on the team will reply. To join the waitlist or sign up to drive, the quickest way is the form on those pages."
    />
  );
}

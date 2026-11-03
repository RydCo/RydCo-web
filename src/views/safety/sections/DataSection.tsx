import { Button } from "@/components/ui/Button";
import { Arrow } from "@/components/ui/icons";
import { Section } from "@/components/ui/Section";
import { reveal } from "@/lib/reveal";

export function DataSection() {
  return (
    <Section labelledBy="data-title">
      <div className="grid gap-10 lg:grid-cols-12">
        <h2 id="data-title" className="t-h2 lg:col-span-5" {...reveal(0)}>
          Your data, kept close
        </h2>
        <div className="grid gap-5 lg:col-span-6 lg:col-start-7" {...reveal(1)}>
          <p>
            Your date of birth and exact saved places stay private, and drivers&rsquo; ID documents are used only for these checks. You can delete your account
            from the app at any time.
          </p>
          <Button href="/privacy/" variant="ghost" className="justify-self-start">
            Read the privacy policy <Arrow />
          </Button>
        </div>
      </div>
    </Section>
  );
}

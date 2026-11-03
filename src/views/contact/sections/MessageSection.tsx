import { Card } from "@/components/ui/Card";
import { ContactLinks } from "@/components/ui/ContactLinks";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/features/contact/ContactForm";
import { reveal } from "@/lib/reveal";

export function MessageSection() {
  return (
    <Section id="message" labelledBy="contact-title">
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <SectionHeading id="contact-title" title="What can we help with?" />
          <Card className="mt-10" {...reveal(1)}>
            <ContactForm />
          </Card>
        </div>

        <aside className="grid content-start gap-4 lg:col-span-4 lg:col-start-9" aria-label="Other ways to reach us" {...reveal(2)}>
          <Card pad="lg">
            <h3 className="t-title">Or reach us directly</h3>
            <ContactLinks look="rows" className="mt-4" />
          </Card>
          <Card tone="ink" pad="lg">
            <h3 className="t-title">On a trip right now?</h3>
            <p className="mt-2">Use SOS or Report in the app. They reach help faster than a message here.</p>
          </Card>
        </aside>
      </div>
    </Section>
  );
}

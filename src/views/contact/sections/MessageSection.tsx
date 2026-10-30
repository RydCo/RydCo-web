import { Section } from "@/components/ui/Section";
import { site } from "@/config/site";
import { ContactForm } from "@/features/contact/ContactForm";
import { reveal } from "@/lib/reveal";

export function MessageSection() {
  return (
    <Section id="message" labelledBy="contact-title">
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <h2 id="contact-title" className="t-h2" {...reveal(0)}>
            What can we help with?
          </h2>
          <div className="mt-10 rounded-[28px] bg-apricot-tint p-6 md:p-8" {...reveal(1)}>
            <ContactForm />
          </div>
        </div>

        <aside className="grid content-start gap-4 lg:col-span-4 lg:col-start-9" aria-label="Other ways to reach us" {...reveal(2)}>
          <div className="rounded-[28px] bg-apricot-tint p-7">
            <h3 className="t-title">Rather email?</h3>
            <a href={`mailto:${site.email}`} className="mt-2 inline-block py-1 font-semibold break-all underline decoration-2 underline-offset-[6px]">
              {site.email}
            </a>
          </div>
          <div className="rounded-[28px] bg-apricot-tint p-7">
            <h3 className="t-title">Instagram</h3>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener"
              className="mt-2 inline-block py-1 font-semibold underline decoration-2 underline-offset-[6px]"
            >
              {site.instagramHandle}
            </a>
          </div>
          <div className="on-cocoa rounded-[28px] bg-cocoa p-7 text-cream">
            <h3 className="t-title">On a trip right now?</h3>
            <p className="mt-2">Use SOS or Report in the app. They reach help faster than a message here.</p>
          </div>
        </aside>
      </div>
    </Section>
  );
}

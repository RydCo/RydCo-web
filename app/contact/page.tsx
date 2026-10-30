import type { Metadata } from "next";
import { Arrow } from "@/components/Button";
import { PageHero } from "@/components/PageHero";
import { Section, reveal } from "@/components/Section";
import { driverCta, helloEnquiry, partnerEnquiry, pilotEnquiry, riderCta, safetyEnquiry, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with RydCo: join the waitlist, sign up to drive, ask about a commute pilot for your company, or partner with us.",
  alternates: { canonical: "/contact/" },
};

export default function Contact() {
  // Each row opens an email with the right subject and a short template already written.
  const rows = [
    { title: "I want a ride", line: "Join the waitlist or ask about riding.", href: riderCta().href },
    { title: "I want to drive", line: "Offer the seats on your commute.", href: driverCta().href },
    { title: "We're a company", line: "Talk to us about a commute pilot for your team.", href: pilotEnquiry },
    { title: "We'd like to partner", line: "Incubators, sponsors and anyone who wants to help.", href: partnerEnquiry },
    { title: "A safety question", line: "About checks, trips or your data.", href: safetyEnquiry },
    { title: "Anything else", line: "Say hello.", href: helloEnquiry },
  ];

  return (
    <>
      <PageHero
        title={
          <>
            <span className="sm:whitespace-nowrap">Assalam o alaikum.</span> <span className="whitespace-nowrap">Let&rsquo;s talk.</span>
          </>
        }
        lead="Pick what fits and your email opens with the details ready. A person on the team reads every message."
      />

      <Section labelledBy="contact-title">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <h2 id="contact-title" className="t-h2" {...reveal(0)}>
              What can we help with?
            </h2>
            <ul className="mt-10">
              {rows.map((r, i) => (
                <li key={r.title} {...reveal(1 + i)}>
                  <a
                    href={r.href}
                    className="group grid grid-cols-[1fr_auto] items-center gap-x-6 rounded-[28px] py-5 transition-colors duration-150 lg:-mx-6 lg:px-6 lg:hover:bg-apricot-tint"
                  >
                    <span>
                      <span className="block font-display text-[clamp(26px,2.8vw,38px)] leading-[1.05] font-extrabold tracking-tight">{r.title}</span>
                      <span className="mt-1 block">{r.line}</span>
                    </span>
                    <Arrow className="h-7 w-7 transition-transform duration-150 group-hover:translate-x-1" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <aside className="grid content-start gap-4 lg:col-span-4 lg:col-start-9" aria-label="Contact details" {...reveal(2)}>
            <div className="rounded-[28px] bg-apricot-tint p-7">
              <h3 className="t-title">Email</h3>
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
              <p className="mt-2">Use SOS or Report in the app. They reach help faster than email.</p>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}

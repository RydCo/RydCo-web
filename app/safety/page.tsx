import type { Metadata } from "next";
import Link from "next/link";
import { DriverProfileScreen, TripLiveScreen } from "@/components/AppScreens";
import { Badge } from "@/components/Badge";
import { Arrow, Button } from "@/components/Button";
import { PageHero } from "@/components/PageHero";
import { PhoneFrame } from "@/components/PhoneFrame";
import { Section, reveal } from "@/components/Section";
import { riderCta, safetyEnquiry, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Safety",
  description:
    "How RydCo keeps carpools safe: CNIC review, live selfie, licence and vehicle checks for every driver, phone-verified riders, women-only rides, trip sharing and SOS on every trip.",
  alternates: { canonical: "/safety/" },
};

// Wording follows the app's own "Why?" sheets: what each check is, and what it is not.
const driverChecks = [
  {
    name: "CNIC",
    badge: "CNIC reviewed",
    is: "A reviewer compares the details a driver enters with their CNIC card. A protected key stops one person opening several accounts.",
    isNot: "It is a document review, not a NADRA check.",
  },
  {
    name: "Live selfie",
    badge: "Live selfie checked",
    is: "A vetted provider matches a live selfie to the CNIC photo, for this check only. Photos from the gallery can't be used. After three tries, a person helps.",
    isNot: "It doesn't replace the CNIC review. Both must pass.",
  },
  {
    name: "Driving licence",
    badge: "Licence checked",
    is: "A reviewer checks the licence on Punjab DLIMS. Learner permits are not accepted.",
    isNot: "A screenshot from the driver doesn't replace our check.",
  },
  {
    name: "Vehicle",
    badge: "Vehicle checked",
    is: "A reviewer checks the registration on Punjab MTMIS. Each car is approved on its own, and the plate must match the record.",
    isNot: "Approval doesn't cover the car's fitness or insurance.",
  },
];

const tripTools = [
  {
    title: "Share your trip",
    text: "Add a trusted contact, like a family member, and send them your live trip.",
  },
  {
    title: "SOS on every trip",
    text: "One button alerts your trusted contact by SMS with your live location and the vehicle. It is the only alert RydCo ever sends by SMS.",
  },
  {
    title: "Women-only rides",
    text: "Choose to ride only with women. It is based on how people describe themselves, and we never show it as verified.",
  },
  {
    title: "Numbers stay hidden",
    text: "Nobody sees your phone number. Chat in the app opens only once a seat is confirmed.",
  },
  {
    title: "Request, don't book",
    text: "Drivers accept or decline every request, and no seat is held until they confirm. You always know who is coming.",
  },
  {
    title: "Report anytime",
    text: "Every trip has a report button, and riders rate their driver after each ride.",
  },
];

export default function Safety() {
  const cta = riderCta();
  return (
    <>
      <PageHero
        ground="tint"
        title={
          <>
            Know who you&rsquo;re <span className="whitespace-nowrap">riding with.</span>
          </>
        }
        lead="Every driver is reviewed before they can offer a ride, and every trip comes with tools that keep you and your family in the loop."
        actions={
          <>
            <Button href={cta.href} external={cta.external}>
              {cta.label}
            </Button>
            <Button href="#checks" variant="cream">
              See the checks
            </Button>
          </>
        }
        aside={
          <PhoneFrame label="A driver's profile in the RydCo app, showing phone, CNIC, live selfie, licence and vehicle checks">
            <DriverProfileScreen />
          </PhoneFrame>
        }
      />

      <Section id="checks" labelledBy="checks-title">
        <div className="grid gap-6 lg:grid-cols-12">
          <h2 id="checks-title" className="t-h2 lg:col-span-6" {...reveal(0)}>
            Before anyone drives
          </h2>
          <p className="max-w-[44ch] lg:col-span-5 lg:col-start-8 lg:self-end" {...reveal(1)}>
            Drivers need Punjab-issued documents, and every check must pass. Our target is to review an application within 24 hours. Until then, they can&rsquo;t
            publish a single ride.
          </p>
        </div>
        <ul className="mt-14 grid gap-2">
          {driverChecks.map((c, i) => (
            <li key={c.name} className="grid gap-4 rounded-[28px] bg-apricot-tint p-6 md:grid-cols-12 md:gap-8 md:p-8" {...reveal(2 + i)}>
              <div className="md:col-span-3">
                <h3 className="t-title">{c.name}</h3>
                <p className="mt-3 text-[18px]">
                  <Badge>{c.badge}</Badge>
                </p>
              </div>
              <div className="md:col-span-5">
                <p className="font-semibold">What we check</p>
                <p className="mt-1">{c.is}</p>
              </div>
              <div className="md:col-span-4">
                <p className="font-semibold">What it doesn&rsquo;t mean</p>
                <p className="mt-1">{c.isNot}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section ground="apricot" labelledBy="riders-title">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <h2 id="riders-title" className="t-h2 lg:col-span-6" {...reveal(0)}>
            Every rider is phone verified
          </h2>
          <div className="grid gap-5 lg:col-span-5 lg:col-start-8" {...reveal(1)}>
            <p>
              Every account starts with a Pakistani mobile number and a code sent to it by SMS. We call it &ldquo;Phone verified&rdquo;, never &ldquo;identity
              verified&rdquo;, because that is all it confirms.
            </p>
            <p>Your number is never shown to other users. Others see only your first name and the area you start from, never your exact address.</p>
          </div>
        </div>
      </Section>

      <Section labelledBy="trip-title">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4" {...reveal(2)}>
            <div className="lg:sticky lg:top-32">
              <PhoneFrame label="A trip in progress in the RydCo app, with Share trip, Chat and SOS buttons">
                <TripLiveScreen />
              </PhoneFrame>
            </div>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <h2 id="trip-title" className="t-h2" {...reveal(0)}>
              On every trip
            </h2>
            <ul className="mt-12 grid gap-10 sm:grid-cols-2 sm:gap-x-10">
              {tripTools.map((t, i) => (
                <li key={t.title} {...reveal(1 + i)}>
                  <h3 className="t-title flex items-start gap-3">
                    <span aria-hidden="true" className="mt-[0.35em] h-3 w-3 flex-none rounded-full bg-apricot" />
                    {t.title}
                  </h3>
                  <p className="mt-2 sm:pl-6">{t.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section ground="tint" labelledBy="fair-title">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-10">
          <div>
            <h2 id="fair-title" className="t-h2" {...reveal(0)}>
              Fair for everyone
            </h2>
            <p className="mt-6 max-w-[46ch]" {...reveal(1)}>
              A seat someone is counting on should be there. So cancelling late or not showing up has a cost, for riders and drivers alike.
            </p>
          </div>
          <ul className="grid gap-4 self-end" {...reveal(2)}>
            <li className="rounded-[28px] bg-cream p-6">
              <b>Cancel more than 60 minutes before:</b> free.
            </li>
            <li className="rounded-[28px] bg-cream p-6">
              <b>Cancel within 60 minutes:</b> free, but it adds a late-cancel strike.
            </li>
            <li className="rounded-[28px] bg-cream p-6">
              <b>Not at the pickup point:</b> the driver waits 3 minutes, then the rider owes their share and gets a strike.
            </li>
            <li className="rounded-[28px] bg-cream p-6">
              <b>Three strikes:</b> the account is paused while a person reviews it.
            </li>
          </ul>
        </div>
      </Section>

      <Section labelledBy="data-title">
        <div className="grid gap-10 lg:grid-cols-12">
          <h2 id="data-title" className="t-h2 lg:col-span-5" {...reveal(0)}>
            Your data, kept close
          </h2>
          <div className="grid gap-5 lg:col-span-6 lg:col-start-7" {...reveal(1)}>
            <p>Your date of birth and exact saved places stay private. Drivers&rsquo; ID documents are used only for the checks above.</p>
            <p>Documents are kept and deleted under our retention policy, and you can deactivate or delete your account from the app at any time.</p>
            <Link href="/privacy/" className="inline-flex items-center gap-2 py-2 font-semibold underline decoration-2 underline-offset-[6px]">
              Read the privacy policy <Arrow />
            </Link>
          </div>
        </div>
      </Section>

      <Section ground="cocoa" labelledBy="safety-q-title">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <h2 id="safety-q-title" className="t-h2" {...reveal(0)}>
              A question about safety?
            </h2>
            <p className="mt-5 max-w-[48ch]" {...reveal(1)}>
              Write to us and a person will answer. During a trip, use SOS or Report in the app.
            </p>
          </div>
          <div className="lg:col-span-4 lg:justify-self-end" {...reveal(2)}>
            <Button href={safetyEnquiry} variant="apricot">
              Email {site.email}
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}

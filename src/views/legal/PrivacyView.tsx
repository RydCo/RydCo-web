import { site } from "@/config/site";
import { LegalPage } from "@/views/legal/LegalPage";

export function PrivacyView() {
  return (
    <LegalPage
      title="Privacy policy"
      lead="What RydCo collects, why we need it, who can see it and how long we keep it."
      sections={[
        {
          id: "who",
          title: "Who we are",
          body: (
            <p>
              RydCo ([FILL: registered company name and address]) runs the RydCo app and this website. You can reach us at{" "}
              <a href={`mailto:${site.email}`} className="font-semibold underline underline-offset-4">
                {site.email}
              </a>
              .
            </p>
          ),
        },
        {
          id: "collect",
          title: "What we collect",
          body: (
            <>
              <p>From every user:</p>
              <ul>
                <li>Your mobile number, which we confirm with a code sent by SMS.</li>
                <li>Your name, date of birth and profile photo.</li>
                <li>Your gender as you describe it. It is used only to offer women-only rides and is never shown as verified.</li>
                <li>The area you start from and your usual destination.</li>
                <li>A trusted contact, if you choose to add one.</li>
              </ul>
              <p>From drivers, as well:</p>
              <ul>
                <li>Legal name, CNIC number, expiry date and photos of the card.</li>
                <li>A live selfie, used only to confirm it matches the CNIC photo.</li>
                <li>Driving licence details and photos.</li>
                <li>Vehicle registration, photos of the car, and the owner&rsquo;s permission if you are not the owner.</li>
                <li>How you want to receive payments (for example a JazzCash, NayaPay or bank account number).</li>
              </ul>
              <p>From trips: routes, times, requests, chat messages, ratings, reports and payment confirmations. [FILL: location data collected during trips, and when]</p>
            </>
          ),
        },
        {
          id: "use",
          title: "How we use it",
          body: (
            <ul>
              <li>To match riders and drivers going the same way, and to work out each rider&rsquo;s share.</li>
              <li>To run driver checks and to stop one person opening several accounts.</li>
              <li>To share your live trip with your trusted contact when you ask, and to send an SMS alert when you use SOS.</li>
              <li>To look into reports, payment disputes and cancellations.</li>
              <li>To answer you when you contact support.</li>
            </ul>
          ),
        },
        {
          id: "see",
          title: "What other users can see",
          body: (
            <>
              <p>Other users see your first name, photo, the area names you start from and go to, your badges and your ratings.</p>
              <p>
                They never see your phone number, date of birth or exact saved places. A driver&rsquo;s payment details are shown only to riders whose seat is
                confirmed.
              </p>
            </>
          ),
        },
        {
          id: "share",
          title: "Who we share it with",
          body: (
            <ul>
              <li>A vetted provider that runs the live selfie check. [FILL: provider name]</li>
              <li>An SMS provider, for sign-in codes and SOS alerts. [FILL: provider name]</li>
              <li>Authorities, when the law requires it. [FILL: to be written by a lawyer]</li>
            </ul>
          ),
        },
        {
          id: "keep",
          title: "How long we keep it",
          body: (
            <>
              <p>We keep data only as long as our retention policy allows. [FILL: retention periods]</p>
              <p>If you delete your account, your public profile is removed and your future rides are cancelled. ID documents are deleted under the retention policy.</p>
              <p>
                Some records stay after deletion: shared trip history without details that identify you, the minimum evidence for an open dispute until it is
                resolved, and a protected record that stops banned accounts coming back.
              </p>
            </>
          ),
        },
        {
          id: "choices",
          title: "Your choices",
          body: (
            <ul>
              <li>Edit your profile, change your number and choose your notifications in the app.</li>
              <li>Deactivate your account to hide it from matching, or delete it.</li>
              <li>Ask us for a copy of your data, or to correct it. [FILL: how requests are handled]</li>
            </ul>
          ),
        },
        {
          id: "website",
          title: "This website's forms",
          body: (
            <>
              <p>
                When you join the waitlist, sign up to drive or send a message here, we receive what you type: your name, mobile number or email, the areas you
                choose, and your message.
              </p>
              <p>
                It is stored in a Google Sheet in RydCo&rsquo;s Google account and emailed to us. We use it only to reply to you and to tell you when RydCo opens
                on your route. Ask us at any time to delete it. [FILL: how long waitlist entries are kept]
              </p>
            </>
          ),
        },
        {
          id: "changes",
          title: "Changes to this policy",
          body: <p>When this policy changes, the app shows you what changed and asks you to accept the new version before you book new rides.</p>,
        },
      ]}
    />
  );
}

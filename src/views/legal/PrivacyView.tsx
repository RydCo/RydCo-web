import { site } from "@/config/site";
import { LegalPage } from "@/views/legal/LegalPage";

const mail = (
  <a href={`mailto:${site.email}`} className="font-semibold underline underline-offset-4">
    {site.email}
  </a>
);

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
            <>
              {/* [FILL] Registered company name and address, once RydCo is registered. */}
              <p>
                RydCo is a carpooling service for adult commuters, starting with a pilot in Lahore, Pakistan. In this policy, &ldquo;RydCo&rdquo;,
                &ldquo;we&rdquo; and &ldquo;us&rdquo; mean the business that runs the RydCo app and this website. Its registered name and address will be
                added here before the app opens.
              </p>
              <p>You can reach us about your data at {mail}.</p>
            </>
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
                <li>The area you start from, your usual destination, and any places and commute defaults you save.</li>
                <li>Your language and notification choices.</li>
                <li>A record of each policy version you accepted, when, and in which language.</li>
                <li>A trusted contact&rsquo;s name and mobile number, if you choose to add one. Please ask them first.</li>
              </ul>
              <p>From drivers, as well:</p>
              <ul>
                <li>Legal name, CNIC number, expiry date and photos of the card.</li>
                <li>A live selfie, used only to confirm it matches the CNIC photo.</li>
                <li>Driving licence details and photos.</li>
                <li>Vehicle registration, photos of the car, and the owner&rsquo;s permission if you are not the owner.</li>
                <li>How you want to receive payments (for example a JazzCash, NayaPay or bank account number).</li>
              </ul>
              <p>
                From trips: routes, times, requests, chat messages, ratings, reports and payment confirmations, including what other users say about a trip
                you were on.
              </p>
              <p>From your device: basic technical details such as device type, app version and connection logs, which we use to keep the service secure.</p>
            </>
          ),
        },
        {
          id: "location",
          title: "Location",
          body: (
            <ul>
              <li>Accepting this policy doesn&rsquo;t give us access to your location, camera or notifications. Your phone asks you for each one separately.</li>
              <li>You can always type or pick your places by hand, without sharing your location.</li>
              <li>
                If you allow it, we collect your device&rsquo;s location during a trip, from when the trip starts until it ends. We use it to show the trip&rsquo;s
                progress to the people on it, to share your trip when you ask, to include your location in an SOS alert, and to look into a report or dispute
                about that trip.
              </li>
              <li>We don&rsquo;t collect your location in the background when you aren&rsquo;t on a trip.</li>
              <li>If you turn location off, you can still use RydCo, but live trip sharing and the location in an SOS alert may not work.</li>
            </ul>
          ),
        },
        {
          id: "use",
          title: "How we use it",
          body: (
            <>
              <ul>
                <li>To match riders and drivers going the same way, and to work out each rider&rsquo;s share.</li>
                <li>To run driver checks and to stop one person opening several accounts.</li>
                <li>To share your live trip with your trusted contact when you ask, and to send an SMS alert when you use SOS.</li>
                <li>To look into reports, payment disputes and cancellations, and to apply our terms.</li>
                <li>To answer you when you contact support.</li>
                <li>To keep RydCo secure, to keep a record of what you accepted, and to meet our legal duties.</li>
              </ul>
              <p>We don&rsquo;t sell your data, we don&rsquo;t use it for advertising, and we don&rsquo;t send promotional notifications during this pilot.</p>
            </>
          ),
        },
        {
          id: "checks",
          title: "Driver checks and your face data",
          body: (
            <>
              <p>
                A CNIC and a live selfie are sensitive, so we ask for your consent separately before collecting them. That screen sets out what is collected,
                why, who handles it, how long it is kept and how to get help. You don&rsquo;t need to give this consent to ride.
              </p>
              <ul>
                <li>A vetted provider compares your live selfie with your CNIC photo, for this check only. It isn&rsquo;t used for anything else.</li>
                <li>After three failed tries, a person helps you, so the automated result is never the only word.</li>
                <li>Our reviewers read your CNIC, and check your licence and registration on the Punjab government&rsquo;s DLIMS and MTMIS systems.</li>
                <li>We turn your CNIC number into a protected key, so we can spot a second account without showing the number to other users.</li>
              </ul>
              <p>If you say no, or withdraw your consent, driver verification stops. You can still ride if you are otherwise eligible.</p>
            </>
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
              <p>
                If you share a trip or use SOS, your trusted contact receives your live location and the vehicle&rsquo;s details. That can also tell them who you are
                travelling with, so choose someone you trust.
              </p>
            </>
          ),
        },
        {
          id: "share",
          title: "Who we share it with",
          body: (
            <>
              <p>We share only what each one needs, and we require our providers to use it only to work for us:</p>
              <ul>
                {/* [FILL] The selfie provider's name, once chosen. */}
                <li>A vetted provider that runs the live selfie check. We will name it here and on the consent screen before driver checks open.</li>
                <li>An SMS provider, for sign-in codes and SOS alerts. We are trialling SendPK.</li>
                <li>Supabase, which handles sign-in.</li>
                <li>Hosting and storage providers, including Vercel for this website and Google for its forms.</li>
              </ul>
              <p>
                <strong>Authorities.</strong> We give data to police, investigators, courts or regulators only when the law requires it, such as a court warrant
                or a written notice under the Prevention of Electronic Crimes Act 2016. We check that the demand is valid, give only what it covers, and tell
                you unless the law or someone&rsquo;s safety prevents us.
              </p>
              <p>
                <strong>Emergencies.</strong> If we believe someone&rsquo;s life or safety is in immediate danger, we may give the police or rescue services what
                they need to help.
              </p>
              <p>
                <strong>Legal claims and business changes.</strong> We may use or share what is needed to bring or defend a legal claim. If RydCo is reorganised or
                sold, your data may pass to the new owner under this policy, and we will tell you first.
              </p>
            </>
          ),
        },
        {
          id: "abroad",
          title: "Data outside Pakistan",
          body: (
            <p>
              Some of our providers may store or process data on servers outside Pakistan, where the rules can differ. We send only what they need, and we will
              choose providers that commit to protecting it. Using RydCo means you understand this may happen.
            </p>
          ),
        },
        {
          id: "keep",
          title: "How long we keep it",
          body: (
            <>
              {/* [FILL] These periods need the team's approval, and a lawyer's, before the app opens. */}
              <p>These are the periods we propose for the pilot. We will confirm them before the app opens.</p>
              <ul>
                <li>
                  <strong>Live selfie and face match:</strong> deleted once the result is recorded, and within 30 days of the check at the latest. We keep only the
                  result and its date.
                </li>
                <li>
                  <strong>CNIC, licence and vehicle images:</strong> while you are an approved driver, then up to 90 days after your account closes or your
                  application is rejected.
                </li>
                <li>
                  <strong>Profile, saved places, payment details and trusted contact:</strong> until you delete your account or remove them, then up to 30 days.
                </li>
                <li>
                  <strong>Trip location and chat messages:</strong> 90 days after the trip.
                </li>
                <li>
                  <strong>Trip records, ratings, cancellations and payment confirmations:</strong> 3 years after the trip.
                </li>
                <li>
                  <strong>Reports, SOS alerts and dispute evidence:</strong> 3 years after the case closes.
                </li>
                <li>
                  <strong>Connection logs:</strong> 1 year.
                </li>
                <li>
                  <strong>Records of what you accepted:</strong> while you have an account, then 3 years.
                </li>
                <li>
                  <strong>Protected key from a banned account:</strong> for as long as the ban lasts.
                </li>
              </ul>
              <p>We keep something longer only if a court, a lawful order, or an open dispute or investigation requires it, and only for that purpose.</p>
              <p>If you delete your account, your public profile is removed and your future rides are cancelled. ID documents are deleted under the periods above.</p>
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
            <>
              <ul>
                <li>Edit your profile, change your number and choose your notifications in the app. Safety and SOS alerts stay on.</li>
                <li>
                  Remove a trusted contact, or turn off location, camera or notification access on your phone. Some features may stop working.
                </li>
                <li>Withdraw a consent you gave. This doesn&rsquo;t affect what we already did with it, and we may no longer be able to offer that feature.</li>
                <li>
                  Deactivate your account to hide it from matching, and come back later by signing in. Bookings that were cancelled don&rsquo;t return by
                  themselves.
                </li>
                <li>
                  Delete your account. We confirm it twice, then close your sessions, and signing in again doesn&rsquo;t undo it. If you are on a trip, your account
                  closes when the trip ends, and you keep your safety tools until then.
                </li>
                <li>Ask us for a copy of your data, or to correct or delete it.</li>
              </ul>
              <p>
                Send requests to {mail} from, or naming, the mobile number on your account. We may need to confirm it is you. Requests are free, and we aim to reply
                within 30 days. If we can&rsquo;t do what you ask, we will explain why. Date of birth and verified identity details are corrected through support,
                so they can&rsquo;t be changed to get round our checks.
              </p>
            </>
          ),
        },
        {
          id: "security",
          title: "Keeping it safe",
          body: (
            <p>
              We limit access to people who need it for their work, and we use technical and organisational safeguards to protect your data. No system is
              completely secure. If a breach is likely to harm you, we will tell you as soon as we reasonably can, and tell you what you can do.
            </p>
          ),
        },
        {
          id: "age",
          title: "Under 18s",
          body: <p>RydCo is only for people aged 18 or over. If we learn that an account belongs to someone younger, we will close it and delete their data, apart from anything we must keep under this policy.</p>,
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
                on your route. Ask us at any time to delete it. Otherwise we delete it 12 months after our last contact with you.
              </p>
              <p>This website doesn&rsquo;t use advertising or analytics cookies. Our host keeps basic technical logs so the site can run securely.</p>
            </>
          ),
        },
        {
          id: "complaints",
          title: "Questions and complaints",
          body: (
            <>
              <p>Please write to {mail} first, and we will try to put it right.</p>
              <p>
                Pakistan has not yet passed a general data protection law, and has no general data protection regulator. Your privacy is still protected by the
                Constitution of Pakistan and the Prevention of Electronic Crimes Act 2016, and by the promises in this policy. If you think someone has misused your
                identity information, you can complain to the National Cyber Crime Investigation Agency. We will update this policy if a new law applies.
              </p>
            </>
          ),
        },
        {
          id: "changes",
          title: "Changes to this policy",
          body: (
            <p>
              Each version has a date, and you can read the versions you accepted in the app. When we make an important change, the app shows you what changed and asks
              you to accept the new version before you book or publish new rides. If you don&rsquo;t accept, you can still read our policies, contact support, sign out or
              close your account. We never block the trip and safety tools you need on a trip already under way.
            </p>
          ),
        },
      ]}
    />
  );
}

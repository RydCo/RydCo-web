import Link from "next/link";
import { site } from "@/config/site";
import { LegalPage } from "@/views/legal/LegalPage";

const mail = (
  <a href={`mailto:${site.email}`} className="font-semibold underline underline-offset-4">
    {site.email}
  </a>
);

export function TermsView() {
  return (
    <LegalPage
      title="Terms of use"
      lead="The rules for using RydCo, in plain words."
      sections={[
        {
          id: "accept",
          title: "Accepting these terms",
          body: (
            <>
              <p>
                These terms are an agreement between you and RydCo. You accept them, and acknowledge our{" "}
                <Link href="/privacy/" className="font-semibold underline underline-offset-4">
                  privacy policy
                </Link>
                , by ticking the box before your account is created. We can&rsquo;t create an account without it, and we keep a record of the version you accepted.
              </p>
              <p>
                Accepting these terms doesn&rsquo;t give us access to your camera, location or notifications. Your phone asks you for each one separately. Driver
                checks need a separate consent too.
              </p>
            </>
          ),
        },
        {
          id: "what",
          title: "What RydCo is",
          body: (
            <>
              <p>RydCo is an app that matches commuters going the same way so they can share a car and split the fuel cost.</p>
              <p>
                RydCo is not a taxi or transport company, and drivers are not our employees. Drivers offer seats on trips they are already making. RydCo provides the
                technology that helps people find each other. It doesn&rsquo;t own or run vehicles and doesn&rsquo;t carry passengers.
              </p>
              <p>
                When a driver confirms a rider, the arrangement to share that trip is between the two of them. RydCo isn&rsquo;t a party to it, and drivers aren&rsquo;t
                our agents or partners.
              </p>
            </>
          ),
        },
        {
          id: "who",
          title: "Who can use RydCo",
          body: (
            <ul>
              <li>You must be 18 or older, and able to enter into a contract.</li>
              <li>Riders need a Pakistani mobile number and a profile. They don&rsquo;t need to submit documents.</li>
              <li>Drivers must be 18 or older, hold valid Punjab-issued documents, and pass every driver check before publishing a ride.</li>
              <li>One account per person. The details you give must be true and your own.</li>
              <li>During the pilot, trips must be within the supported areas in Lahore.</li>
            </ul>
          ),
        },
        {
          id: "money",
          title: "Cost sharing and payments",
          body: (
            <ul>
              <li>RydCo suggests each rider&rsquo;s share from the distance, the car&rsquo;s class and the fuel price, locked when the ride is published.</li>
              <li>A share is a contribution to the cost of a trip the driver is already making. It isn&rsquo;t a fare, and a driver must not use RydCo to make a profit.</li>
              <li>Drivers must not ask for more than the share shown in the app, or for payment outside what the app shows.</li>
              <li>Riders pay drivers directly. RydCo does not process or hold payments.</li>
              <li>
                Both sides confirm the payment after each trip. A confirmation records what the two of you tell us. RydCo doesn&rsquo;t check wallet or bank transfers
                itself.
              </li>
              <li>If they disagree, a RydCo reviewer looks at it. That decision affects how the trip shows in the app. It doesn&rsquo;t stop you using your legal rights.</li>
              <li>A rider with an unsettled trip can&rsquo;t book a new one until it&rsquo;s settled.</li>
            </ul>
          ),
        },
        {
          id: "bookings",
          title: "Requests and cancellations",
          body: (
            <ul>
              <li>A request is not a booking. A seat is yours once the driver confirms.</li>
              <li>Cancelling more than 60 minutes before departure is free.</li>
              <li>Cancelling within 60 minutes is free but adds a late-cancel strike.</li>
              <li>Cancelling after the trip has started means a cancel fee to the driver.</li>
              <li>A rider who doesn&rsquo;t show up after the 3-minute wait owes their full share and gets a strike.</li>
              <li>Drivers who cancel late or don&rsquo;t show up get strikes too. Riders owe nothing when a driver cancels.</li>
              <li>After three strikes, an account is suspended while it is reviewed.</li>
            </ul>
          ),
        },
        {
          id: "drivers",
          title: "If you drive",
          body: (
            <ul>
              <li>Keep your licence, registration and any insurance the law requires valid, and tell us when they change. Changes reopen the affected check.</li>
              <li>Use only a car approved on your account, and keep it safe and roadworthy.</li>
              <li>Follow traffic and transport law, including any licence, registration, insurance or permit that applies to you.</li>
              <li>Offer seats only on trips you are already making. Don&rsquo;t run a taxi or other commercial service through RydCo.</li>
              <li>
                RydCo doesn&rsquo;t provide insurance. A private policy may not cover carrying passengers or sharing costs, so please check with your insurer.
              </li>
            </ul>
          ),
        },
        {
          id: "riders",
          title: "If you ride",
          body: (
            <ul>
              <li>Be at the pickup point on time, and pay your share as shown in the app.</li>
              <li>Wear a seat belt, and treat the driver and their car with respect.</li>
              <li>Check that the driver and car match the app before you get in. If something seems wrong, don&rsquo;t get in, and report it.</li>
            </ul>
          ),
        },
        {
          id: "conduct",
          title: "How we expect you to behave",
          body: (
            <ul>
              <li>Be on time, be respectful, and keep to the agreed pickup and drop-off points.</li>
              <li>No harassment, discrimination or unsafe driving.</li>
              <li>Don&rsquo;t misuse women-only rides.</li>
              <li>Don&rsquo;t use false documents or someone else&rsquo;s identity, and don&rsquo;t share another user&rsquo;s details outside RydCo.</li>
              <li>Report anything that worries you using the report button on the trip.</li>
            </ul>
          ),
        },
        {
          id: "safety",
          title: "Safety",
          body: (
            <>
              <p>
                We review drivers&rsquo; documents before they can publish rides, but these checks have limits. A CNIC review is a document review, not a NADRA
                check, and vehicle approval doesn&rsquo;t cover the car&rsquo;s fitness or insurance. A badge shows that a check passed when it was done. It doesn&rsquo;t
                promise how anyone will behave, and it isn&rsquo;t a guarantee of safety.
              </p>
              <p>
                Gender on RydCo is what people say about themselves, and is never shown as verified. Please use your own judgement on every trip.
              </p>
              <p>
                SOS and trip sharing are there to help, but they don&rsquo;t replace emergency services. SOS alerts your trusted contact by SMS. It doesn&rsquo;t call the
                police or an ambulance, RydCo doesn&rsquo;t send help, and an alert can fail if your phone has no signal, battery or permission.
              </p>
              <p>If you are in danger, call for help directly:</p>
              <ul>
                <li>Police: 15</li>
                <li>Rescue and ambulance: 1122</li>
                <li>Punjab Women Helpline: 1043</li>
              </ul>
            </>
          ),
        },
        {
          id: "liability",
          title: "Liability",
          body: (
            <>
              <p>
                We provide RydCo as it is and as it is available. We work to keep it running and accurate, but we can&rsquo;t promise it will always work, that you will
                find a match, or that a share will match your actual costs.
              </p>
              <p>
                Drivers and riders are responsible for their own actions. So far as the law allows, RydCo isn&rsquo;t responsible for what a driver or rider does or fails
                to do, for an accident or loss during a shared trip, for a payment between users, or for loss that is indirect, such as lost earnings or a missed
                commitment.
              </p>
              <p>
                Nothing here limits liability that the law doesn&rsquo;t allow us to limit, including for fraud, or for death, injury or loss caused by RydCo&rsquo;s own
                negligence. Nothing here takes away your rights under the Punjab Consumer Protection Act 2005.
              </p>
              <p>
                If you break these terms or the law, for example by using false documents, you are responsible for the loss that causes, including a claim made against
                RydCo because of it.
              </p>
            </>
          ),
        },
        {
          id: "ending",
          title: "Ending your account",
          body: (
            <>
              <p>
                You can deactivate or delete your account in the app at any time. Future rides are cancelled and the people affected are told, so please also settle what
                you owe. If you are on a trip, your account closes when the trip ends.
              </p>
              <p>
                We may suspend or close accounts that break these terms. We tell you in the app what happened and why, and give you 7 days to respond before we close an
                account. We may act first and explain afterwards if we need to protect someone&rsquo;s safety, stop fraud or follow the law, and we keep some details private
                if sharing them would put someone at risk.
              </p>
              <p>
                You can appeal within 14 days by writing to {mail}. Someone who didn&rsquo;t make the first decision will look at it wherever possible, and we aim to give you
                their answer within 14 days. A suspended account keeps the safety tools for any trip under way.
              </p>
            </>
          ),
        },
        {
          id: "law",
          title: "Governing law",
          body: (
            <>
              <p>These terms are governed by the laws of Pakistan, as they apply in Punjab.</p>
              <p>
                If something goes wrong, please write to {mail} first, and we aim to reply within 15 days. Otherwise, disputes go to the courts at Lahore. You can still go
                to a Consumer Court where the law allows. Those time limits can be short, so don&rsquo;t wait for us if you plan to file a claim.
              </p>
            </>
          ),
        },
        {
          id: "changes",
          title: "Changes to these terms",
          body: (
            <p>
              Each version has a date, and you can read the versions you accepted in the app. When we make an important change, the app shows you what changed and asks you to
              accept the new version before you book or publish new rides. If you don&rsquo;t accept, you can still read our policies, contact support, sign out or close your
              account. We never block the trip and safety tools you need on a trip already under way.
            </p>
          ),
        },
        {
          id: "contact",
          title: "Contact",
          body: <p>Questions about these terms: {mail}</p>,
        },
      ]}
    />
  );
}

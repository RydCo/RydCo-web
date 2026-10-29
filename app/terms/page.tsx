import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms (draft)",
  description: "Draft terms of use for RydCo carpooling: who can use it, cost sharing, bookings and cancellations, conduct and safety. To be reviewed by a lawyer.",
  alternates: { canonical: "/terms/" },
};

export default function Terms() {
  return (
    <LegalPage
      title="Terms of use"
      lead="The rules for using RydCo, in plain words."
      sections={[
        {
          id: "what",
          title: "What RydCo is",
          body: (
            <>
              <p>RydCo is an app that matches commuters going the same way so they can share a car and split the fuel cost.</p>
              <p>
                RydCo is not a taxi or transport company, and drivers are not our employees. Drivers offer seats on trips they are already making. [FILL: legal
                wording on RydCo&rsquo;s role]
              </p>
            </>
          ),
        },
        {
          id: "who",
          title: "Who can use RydCo",
          body: (
            <ul>
              <li>Riders need a Pakistani mobile number. [FILL: minimum age for riders]</li>
              <li>Drivers must be 18 or older, hold valid Punjab-issued documents, and pass every driver check before publishing a ride.</li>
              <li>One account per person.</li>
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
              <li>Riders pay drivers directly. RydCo does not process or hold payments.</li>
              <li>Both sides confirm the payment after each trip. If they disagree, a RydCo reviewer looks at it.</li>
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
          id: "conduct",
          title: "How we expect you to behave",
          body: (
            <ul>
              <li>Be on time, be respectful, and keep to the agreed pickup and drop-off points.</li>
              <li>No harassment, discrimination or unsafe driving.</li>
              <li>Don&rsquo;t misuse women-only rides.</li>
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
                check, and vehicle approval doesn&rsquo;t cover the car&rsquo;s fitness or insurance.
              </p>
              <p>SOS and trip sharing are there to help, but they don&rsquo;t replace emergency services. [FILL: emergency numbers and guidance]</p>
            </>
          ),
        },
        {
          id: "liability",
          title: "Liability",
          body: <p>[FILL: to be written by a lawyer]</p>,
        },
        {
          id: "ending",
          title: "Ending your account",
          body: (
            <p>
              You can deactivate or delete your account in the app at any time. We may suspend or close accounts that break these terms. [FILL: notice and appeal
              process]
            </p>
          ),
        },
        {
          id: "law",
          title: "Governing law",
          body: <p>[FILL: governing law and courts, to be written by a lawyer]</p>,
        },
        {
          id: "contact",
          title: "Contact",
          body: (
            <p>
              Questions about these terms:{" "}
              <a href={`mailto:${site.email}`} className="font-semibold underline underline-offset-4">
                {site.email}
              </a>
            </p>
          ),
        },
      ]}
    />
  );
}

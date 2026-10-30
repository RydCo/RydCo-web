import type { Metadata } from "next";
import { TermsView } from "@/views/legal/TermsView";

export const metadata: Metadata = {
  title: "Terms (draft)",
  description: "Draft terms of use for RydCo carpooling: who can use it, cost sharing, bookings and cancellations, conduct and safety. To be reviewed by a lawyer.",
  alternates: { canonical: "/terms/" },
};

export default function Terms() {
  return <TermsView />;
}

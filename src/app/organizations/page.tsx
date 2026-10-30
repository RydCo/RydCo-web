import type { Metadata } from "next";
import { OrganizationsView } from "@/views/organizations/OrganizationsView";

export const metadata: Metadata = {
  title: "For organizations and partners",
  description:
    "Give your team a cheaper, safer way to get to work with RydCo carpooling, or partner with us to grow the Lahore pilot. Built for daily commuters in Pakistan.",
  alternates: { canonical: "/organizations/" },
};

export default function Organizations() {
  return <OrganizationsView />;
}

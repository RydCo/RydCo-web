import type { Metadata } from "next";
import { PrivacyView } from "@/views/legal/PrivacyView";

export const metadata: Metadata = {
  title: "Privacy policy (draft)",
  description: "Draft privacy policy for RydCo: what we collect, why, who sees it and how long we keep it. To be reviewed by a lawyer.",
  alternates: { canonical: "/privacy/" },
};

export default function Privacy() {
  return <PrivacyView />;
}

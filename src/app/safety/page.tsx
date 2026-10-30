import type { Metadata } from "next";
import { SafetyView } from "@/views/safety/SafetyView";

export const metadata: Metadata = {
  title: "Safety",
  description:
    "How RydCo keeps carpools safe: CNIC review, live selfie, licence and vehicle checks for every driver, phone-verified riders, women-only rides, trip sharing and SOS on every trip.",
  alternates: { canonical: "/safety/" },
};

export default function Safety() {
  return <SafetyView />;
}

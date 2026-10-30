import type { Metadata } from "next";
import { HowItWorksView } from "@/views/how-it-works/HowItWorksView";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "Your first RydCo ride, step by step: check your commute, sign up with your phone number, find a driver going your way, request a seat, ride together and pay your share directly.",
  alternates: { canonical: "/how-it-works/" },
};

export default function HowItWorks() {
  return <HowItWorksView />;
}

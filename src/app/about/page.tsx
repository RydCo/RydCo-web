import type { Metadata } from "next";
import { AboutView } from "@/views/about/AboutView";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why we're building RydCo: carpooling for Pakistan's daily commuters, tested first with FAST-NUCES students and starting with a pilot in Lahore.",
  alternates: { canonical: "/about/" },
};

export default function About() {
  return <AboutView />;
}

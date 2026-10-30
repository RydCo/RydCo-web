import type { Metadata } from "next";
import { ContactView } from "@/views/contact/ContactView";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with RydCo: ask about riding or driving, a commute pilot for your company, or partnering with us.",
  alternates: { canonical: "/contact/" },
};

export default function Contact() {
  return <ContactView />;
}

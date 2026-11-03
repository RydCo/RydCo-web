import type { Metadata } from "next";
import { site } from "@/config/site";
import { HomeView } from "@/views/home/HomeView";

export const metadata: Metadata = {
  title: { absolute: `RydCo · ${site.tagline.phrase}` },
  description: site.description,
  alternates: { canonical: "/" },
};

export default function Home() {
  return <HomeView />;
}

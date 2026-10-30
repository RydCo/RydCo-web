import type { Metadata } from "next";
import { site } from "@/config/site";
import { HomeView } from "@/views/home/HomeView";

export const metadata: Metadata = {
  title: { absolute: "RydCo · Your commute, in good company" },
  description: site.description,
  alternates: { canonical: "/" },
};

export default function Home() {
  return <HomeView />;
}

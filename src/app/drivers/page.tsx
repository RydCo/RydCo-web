import type { Metadata } from "next";
import { DriversView } from "@/views/drivers/DriversView";

export const metadata: Metadata = {
  title: "Drive with RydCo",
  description:
    "Offer the empty seats on your daily commute in Lahore and earn back your fuel cost. RydCo works out each rider's share, and riders pay you directly.",
  alternates: { canonical: "/drivers/" },
};

export default function Drivers() {
  return <DriversView />;
}

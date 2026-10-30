import { Figtree, Urbanist } from "next/font/google";

// The app's own faces, so the site and the app read as one product.
const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const fontVariables = `${urbanist.variable} ${figtree.variable}`;

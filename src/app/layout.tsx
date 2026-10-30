import type { Metadata, Viewport } from "next";
import { Figtree, Urbanist } from "next/font/google";
import { heroScript } from "@/components/brand/hero-script";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { RevealObserver } from "@/components/layout/RevealObserver";
import { site } from "@/config/site";
import { theme } from "@/config/theme.mjs";
import "@/styles/globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "RydCo · Carpooling for daily commuters in Lahore",
    template: "%s · RydCo",
  },
  description: site.description,
  applicationName: "RydCo",
  openGraph: {
    type: "website",
    siteName: "RydCo",
    locale: "en_PK",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "RydCo. Your commute, in good company." }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: theme.brand,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${urbanist.variable} ${figtree.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `document.documentElement.classList.add('js');${heroScript}` }} />
      </head>
      <body className="flex min-h-svh flex-col">
        <Navbar />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <RevealObserver />
      </body>
    </html>
  );
}

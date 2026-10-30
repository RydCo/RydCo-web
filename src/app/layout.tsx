import type { Metadata, Viewport } from "next";
import { heroScript } from "@/components/brand/hero-script";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { RevealObserver } from "@/components/layout/RevealObserver";
import { site } from "@/config/site";
import { theme } from "@/config/theme.mjs";
import { interludeHeadCheck } from "@/lib/interlude";
import { fontVariables } from "@/styles/fonts";
import "@/styles/globals.css";

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
  themeColor: theme.surface,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `document.documentElement.classList.add('js');${interludeHeadCheck}${heroScript}` }} />
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

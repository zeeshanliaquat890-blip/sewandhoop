import type { Metadata, Viewport } from "next";
import { Young_Serif, Figtree } from "next/font/google";
import { siteConfig } from "@/site.config";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AffiliateClickTracker } from "@/components/AffiliateClickTracker";
import "./globals.css";

const serif = Young_Serif({ subsets: ["latin"], weight: "400", variable: "--font-young-serif", display: "swap" });
const sans = Figtree({ subsets: ["latin"], weight: ["400", "600", "700"], style: ["normal", "italic"], variable: "--font-figtree", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: `${siteConfig.name} — ${siteConfig.tagline}`, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  openGraph: { siteName: siteConfig.name, locale: siteConfig.locale, type: "website" },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#fbf7f0",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-paper">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <AffiliateClickTracker endpoint={siteConfig.analytics.affiliateClickEndpoint || undefined} />
      </body>
    </html>
  );
}

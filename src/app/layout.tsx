import type { Metadata, Viewport } from "next";
import Script from "next/script";
import Providers from "@/components/Providers";
import "./globals.css";
import { OG_IMAGE_FALLBACK, SITE_NAME, SITE_URL } from "@/lib/seo";

import "@fontsource/syne/600.css";
import "@fontsource/syne/700.css";
import "@fontsource/syne/800.css";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";

export const metadataBase = new URL(SITE_URL);

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: `${SITE_NAME} - VPS, Game Servers & Anti-DDoS Hosting`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Fast VPS and game servers with DDoS protection included on every plan. EU nodes, modern hardware and always-on filtering.",
  applicationName: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    title: `${SITE_NAME} - VPS, Game Servers & Anti-DDoS Hosting`,
    description:
      "Fast VPS and game servers with DDoS protection included on every plan.",
    images: [
      {
        url: OG_IMAGE_FALLBACK,
        width: 512,
        height: 512,
        alt: `${SITE_NAME} - hosting with anti-DDoS on every plan`,
      },
    ],
  },
  twitter: {
    card: "summary",
    site: "@alfahost",
    title: `${SITE_NAME} - VPS, Game Servers & Anti-DDoS Hosting`,
    description:
      "Fast VPS and game servers with DDoS protection included on every plan.",
    images: [OG_IMAGE_FALLBACK],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  authors: [{ name: SITE_NAME }],
  category: "hosting",
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/site.webmanifest",
  keywords: [
    "VPS",
    "game server hosting",
    "anti-DDoS",
    "Minecraft hosting",
    "Rust hosting",
    "EU data center",
    "AlfaHost",
  ],
};

export const viewport: Viewport = {
  themeColor: "#eceef1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
        <Script
          id="website-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  name: SITE_NAME,
                  url: SITE_URL,
                  logo: `${SITE_URL}/icon-512.png`,
                  sameAs: ["https://www.trustpilot.com/review/alfahost.eu"],
                  contactPoint: {
                    "@type": "ContactPoint",
                    email: "support@alfahost.eu",
                    contactType: "customer support",
                    availableLanguage: ["en", "pl", "ru"],
                  },
                },
                {
                  "@type": "WebSite",
                  name: `${SITE_NAME} - VPS, Game Servers & Anti-DDoS`,
                  url: SITE_URL,
                  inLanguage: ["en", "pl", "ru"],
                  publisher: { "@type": "Organization", name: SITE_NAME },
                },
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}

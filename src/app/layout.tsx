import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { IBM_Plex_Sans, Oswald, Geist } from "next/font/google";
import Providers from "@/components/Providers";
import "./globals.css";
import { cn } from "@/lib/utils";
import { OG_IMAGE_FALLBACK, SITE_NAME, SITE_URL } from "@/lib/seo";

export const metadataBase = new URL(SITE_URL);

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const display = Oswald({
  variable: "--font-oswald",
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["500", "600", "700"],
});

const sans = IBM_Plex_Sans({
  variable: "--font-plex",
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: `${SITE_NAME} - VPS, Game Servers & Anti-DDoS Hosting`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Fast VPS, game servers and dedicated machines with DDoS protection included on every plan. EU nodes, modern hardware and always-on filtering.",
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
      "Fast VPS, game servers and dedicated machines with DDoS protection included on every plan.",
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
      "Fast VPS, game servers and dedicated machines with DDoS protection included on every plan.",
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
    "dedicated servers",
    "EU data center",
    "AlfaHost",
  ],
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(display.variable, sans.variable, "font-sans", geist.variable)}
      suppressHydrationWarning
    >
      <body className={sans.className}>
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
                  sameAs: [],
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

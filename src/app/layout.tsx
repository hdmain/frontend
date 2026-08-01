import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, Oswald } from "next/font/google";
import "./globals.css";

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
  title: "AlfaHost",
  description: "VPS, game servers and Anti-DDoS hosting.",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
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
      className={`${display.variable} ${sans.variable}`}
      suppressHydrationWarning
    >
      <body className={sans.className}>{children}</body>
    </html>
  );
}

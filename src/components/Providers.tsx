"use client";

import type { ReactNode } from "react";
import CookieConsent from "./CookieConsent";
import { CurrencyProvider } from "./CurrencyProvider";
import ThemeProvider from "./ThemeProvider";
import SmoothScroll from "./SmoothScroll";
import ScrollReveal from "./ScrollReveal";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <CurrencyProvider>
        <SmoothScroll />
        <ScrollReveal />
        {children}
        <CookieConsent />
      </CurrencyProvider>
    </ThemeProvider>
  );
}

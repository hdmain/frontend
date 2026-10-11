"use client";

import type { ReactNode } from "react";
import CookieConsent from "./CookieConsent";
import { CurrencyProvider } from "./CurrencyProvider";
import ThemeProvider from "./ThemeProvider";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <CurrencyProvider>
        {children}
        <CookieConsent />
      </CurrencyProvider>
    </ThemeProvider>
  );
}

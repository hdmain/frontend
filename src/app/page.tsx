"use client";

import { useEffect, useMemo, useState } from "react";
import {
  defaultLocale,
  detectBrowserLocale,
  localeHref,
  type Locale,
} from "@/i18n/config";

export default function RootPage() {
  const [locale, setLocale] = useState<Locale>(defaultLocale);

  useEffect(() => {
    const preferred = detectBrowserLocale(navigator.languages?.length
      ? navigator.languages
      : [navigator.language]);
    setLocale(preferred);
    window.location.replace(localeHref(preferred));
  }, []);

  const href = useMemo(() => localeHref(locale), [locale]);
  const label =
    locale === "pl" ? "PL" : locale === "ru" ? "RU" : "EN";

  return (
    <main style={{ minHeight: "100svh", display: "grid", placeItems: "center" }}>
      <a href={href}>AlfaHost → {label}</a>
    </main>
  );
}

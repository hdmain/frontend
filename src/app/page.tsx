"use client";

import { useEffect } from "react";
import { defaultLocale, localeHref } from "@/i18n/config";

export default function RootPage() {
  const href = localeHref(defaultLocale);

  useEffect(() => {
    window.location.replace(href);
  }, [href]);

  return (
    <main style={{ minHeight: "100svh", display: "grid", placeItems: "center" }}>
      <a href={href}>AlfaHost → EN</a>
    </main>
  );
}

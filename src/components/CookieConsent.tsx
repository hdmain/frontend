"use client";

import { useEffect, useState } from "react";
import { isLocale, localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { readConsent, storeConsent } from "@/lib/legal";
import styles from "./CookieConsent.module.css";

function localeFromPath(): Locale {
  if (typeof window === "undefined") return "en";
  const part = window.location.pathname.split("/").filter(Boolean)[0] ?? "";
  return isLocale(part) ? part : "en";
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    const current = localeFromPath();
    setLocale(current);
    if (!readConsent()) setVisible(true);
  }, []);

  if (!visible) return null;

  const t = getDictionary(locale).cookies;

  function accept() {
    storeConsent();
    setVisible(false);
  }

  return (
    <div className={styles.banner} role="dialog" aria-label={t.title}>
      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.title}>{t.title}</p>
          <p className={styles.body}>
            {t.body}{" "}
            <a href={localePath(locale, "cookies")}>{t.policyLink}</a>
            {" · "}
            <a href={localePath(locale, "privacy")}>{t.privacyLink}</a>
          </p>
        </div>
        <button type="button" className={`btn btnPrimary ${styles.btn}`} onClick={accept}>
          {t.accept}
        </button>
      </div>
    </div>
  );
}

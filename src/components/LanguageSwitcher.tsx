"use client";

import {
  localeHref,
  localeNames,
  locales,
  type Locale,
} from "@/i18n/config";
import styles from "./LanguageSwitcher.module.css";

type Props = {
  locale: Locale;
  label: string;
};

export default function LanguageSwitcher({ locale, label }: Props) {
  return (
    <nav className={styles.row} aria-label={label}>
      {locales.map((code, i) => (
        <span key={code} className={styles.item}>
          {i > 0 ? <span className={styles.sep} aria-hidden>|</span> : null}
          <a
            className={`${styles.link} ${code === locale ? styles.active : ""}`}
            href={localeHref(code)}
            hrefLang={code}
            aria-current={code === locale ? "page" : undefined}
          >
            {localeNames[code]}
          </a>
        </span>
      ))}
    </nav>
  );
}

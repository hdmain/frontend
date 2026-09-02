"use client";

import { comingSoonPath, isComingSoon, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { Icons } from "./Icons";
import styles from "./LaunchPromo.module.css";

type Props = {
  locale: Locale;
  t: Dictionary["launch"]["promo"];
};

export default function LaunchPromo({ locale, t }: Props) {
  if (!isComingSoon()) return null;

  return (
    <aside className={styles.promo} aria-label={t.title}>
      <span className={styles.badge}>{t.badge}</span>
      <p className={styles.title}>{t.title}</p>
      <p className={styles.body}>{t.body}</p>
      <a className={styles.cta} href={comingSoonPath(locale)}>
        {t.cta} {Icons.arrow}
      </a>
    </aside>
  );
}

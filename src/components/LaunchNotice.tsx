"use client";

import { comingSoonPath, isComingSoon, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import styles from "./LaunchNotice.module.css";

type Props = {
  locale: Locale;
  t: Dictionary["launch"];
};

export default function LaunchNotice({ locale, t }: Props) {
  if (!isComingSoon()) return null;

  return (
    <p className={styles.notice}>
      {t.notice}{" "}
      <a href={comingSoonPath(locale)}>{t.moreInfo}</a>
    </p>
  );
}

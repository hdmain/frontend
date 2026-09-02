import type { Dictionary } from "@/i18n/dictionaries";
import { comingSoonPath, isComingSoon, type Locale } from "@/i18n/config";
import { Icons } from "./Icons";
import styles from "./ComingSoonBanner.module.css";

type Props = {
  locale: Locale;
  t: Dictionary["banner"];
};

export default function ComingSoonBanner({ locale, t }: Props) {
  if (!isComingSoon()) return null;

  return (
    <div className={styles.banner} role="status">
      <div className={`container ${styles.inner}`}>
        <span className={styles.dot} aria-hidden />
        <p className={styles.message}>{t.message}</p>
        <a className={styles.link} href={comingSoonPath(locale)}>
          {t.link} {Icons.arrow}
        </a>
      </div>
    </div>
  );
}

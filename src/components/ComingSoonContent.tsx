import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import WaitlistForm from "./WaitlistForm";
import styles from "./ComingSoonContent.module.css";

type Props = {
  locale: Locale;
  t: Dictionary["comingSoon"];
};

export default function ComingSoonContent({ locale, t }: Props) {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <header className={styles.head}>
          <span className="eyebrow">{t.eyebrow}</span>
          <h1 className={styles.title}>{t.title}</h1>
        </header>

        <div className={styles.intro}>
          <p className={styles.lead}>{t.lead}</p>
          <p className={styles.body}>{t.body}</p>
        </div>

        <WaitlistForm locale={locale} t={t.waitlist} />
      </div>
    </section>
  );
}

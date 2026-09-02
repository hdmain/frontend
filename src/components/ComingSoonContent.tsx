import type { Dictionary } from "@/i18n/dictionaries";
import { localeHref, type Locale } from "@/i18n/config";
import { Icons } from "./Icons";
import styles from "./ComingSoonContent.module.css";

type Props = {
  locale: Locale;
  t: Dictionary["comingSoon"];
};

export default function ComingSoonContent({ locale, t }: Props) {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <span className="eyebrow">{t.eyebrow}</span>
        <h1 className={styles.title}>{t.title}</h1>
        <p className={styles.lead}>{t.lead}</p>
        <p className={styles.body}>{t.body}</p>

        <ul className={styles.points}>
          {t.points.map((point) => (
            <li key={point}>
              <span aria-hidden>{Icons.check}</span>
              {point}
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          <a className="btn btnPrimary" href="mailto:support@alfahost.eu">
            {t.contactLabel} {Icons.arrow}
          </a>
          <a className="btn btnGhost" href={localeHref(locale, "#offer")}>
            {t.viewOffer}
          </a>
          <a className={styles.back} href={localeHref(locale)}>
            ← {t.backHome}
          </a>
        </div>
      </div>
    </section>
  );
}

import type { Dictionary } from "@/i18n/dictionaries";
import { Icons } from "./Icons";
import Typewriter from "./Typewriter";
import styles from "./Hero.module.css";

type Props = { t: Dictionary["hero"] };

export default function Hero({ t }: Props) {
  return (
    <section className={styles.hero} id="top">
      <div className={`container ${styles.layout}`}>
        <div className={styles.copy}>
          <h1 className={styles.brand}>
            AlfaHost
            <span>.eu</span>
          </h1>
          <p className={styles.typed}>
            <Typewriter phrases={t.phrases} />
          </p>
          <p className={styles.lede}>{t.lede}</p>
          <div className={styles.actions}>
            <a className="btn btnPrimary" href="#offer">
              {t.ctaOffer} {Icons.arrow}
            </a>
            <a className="btn btnGhost" href="#contact">
              {t.ctaContact}
            </a>
          </div>
        </div>

        <aside className={styles.positives} aria-label={t.positivesLabel}>
          <p className={styles.positivesLabel}>{t.positivesLabel}</p>
          <ul className={styles.list}>
            {t.positives.map((item, i) => (
              <li key={item.title} className={styles.chip}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.copy}</p>
                </div>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}

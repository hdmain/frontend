import type { Dictionary } from "@/i18n/dictionaries";
import styles from "./Protection.module.css";

type Props = { t: Dictionary["protection"] };

export default function Protection({ t }: Props) {
  return (
    <section className={styles.section} id="protection">
      <div className={`container ${styles.wrap}`}>
        <header className={styles.head}>
          <span className="eyebrow">{t.eyebrow}</span>
          <h2 className="sectionTitle">{t.title}</h2>
          <p className="sectionLead">{t.lead}</p>
        </header>

        <div className={styles.panel}>
          <article className={styles.block}>
            <h3>{t.card1Title}</h3>
            <p>{t.card1Body}</p>
            <div className={styles.stats}>
              <div>
                <strong>{t.stat1Value}</strong>
                <span>{t.stat1Label}</span>
              </div>
              <div>
                <strong>{t.stat2Value}</strong>
                <span>{t.stat2Label}</span>
              </div>
            </div>
          </article>

          <article className={styles.block}>
            <h3>{t.card2Title}</h3>
            <ul>
              {t.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        </div>
      </div>
      <div className={styles.cut} aria-hidden />
    </section>
  );
}

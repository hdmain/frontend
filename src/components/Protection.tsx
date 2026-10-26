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

        <div className={styles.body}>
          <article className={styles.block}>
            <h3>{t.card1Title}</h3>
            <p>{t.card1Body}</p>
            <dl className={styles.stats}>
              <div>
                <dt>{t.stat1Label}</dt>
                <dd>{t.stat1Value}</dd>
              </div>
              <div>
                <dt>{t.stat2Label}</dt>
                <dd>{t.stat2Value}</dd>
              </div>
            </dl>
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
    </section>
  );
}

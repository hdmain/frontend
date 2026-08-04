"use client";

import type { Dictionary } from "@/i18n/dictionaries";
import CountUp from "./CountUp";
import DecryptedText from "./DecryptedText";
import FadeContent from "./FadeContent";
import styles from "./Protection.module.css";

type Props = { t: Dictionary["protection"] };

export default function Protection({ t }: Props) {
  return (
    <section className={styles.section} id="protection">
      <div className={`container ${styles.wrap}`}>
        <header className={styles.head}>
          <span className="eyebrow">
            <DecryptedText text={t.eyebrow} animateOn="view" sequential speed={32} />
          </span>
          <h2 className="sectionTitle">{t.title}</h2>
          <p className="sectionLead">{t.lead}</p>
        </header>

        <FadeContent duration={0.7}>
          <div className={styles.panel}>
            <article className={styles.block}>
              <h3>{t.card1Title}</h3>
              <p>{t.card1Body}</p>
              <div className={styles.stats}>
                <div>
                  <strong>
                    <CountUp to={10} duration={2} className={styles.count} />+ Tbps
                  </strong>
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
        </FadeContent>
      </div>
      <div className={styles.cut} aria-hidden />
    </section>
  );
}

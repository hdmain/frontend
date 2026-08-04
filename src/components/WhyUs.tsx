"use client";

import type { Dictionary } from "@/i18n/dictionaries";
import DecryptedText from "./DecryptedText";
import FadeContent from "./FadeContent";
import styles from "./WhyUs.module.css";

type Props = { t: Dictionary["why"] };

export default function WhyUs({ t }: Props) {
  return (
    <section className={styles.section} id="why">
      <div className={`container ${styles.layout}`}>
        <header className={styles.head}>
          <span className="eyebrow">
            <DecryptedText text={t.eyebrow} animateOn="view" sequential speed={35} />
          </span>
          <h2 className="sectionTitle">
            {t.titleBefore} <span>{t.titleBrand}</span>
          </h2>
          <p className="sectionLead">{t.lead}</p>
        </header>

        <ol className={styles.grid}>
          {t.items.map((item, i) => (
            <li key={item.value}>
              <FadeContent duration={0.55} delay={i * 0.05}>
                <div className={styles.card}>
                  <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
                  <p className={styles.value}>{item.value}</p>
                  <h3>{item.title}</h3>
                  <p className={styles.copy}>{item.copy}</p>
                </div>
              </FadeContent>
            </li>
          ))}
        </ol>
      </div>
      <div className={styles.cut} aria-hidden />
    </section>
  );
}

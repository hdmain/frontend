"use client";

import type { Dictionary } from "@/i18n/dictionaries";
import FadeContent from "./FadeContent";
import Magnet from "./Magnet";
import { Icons } from "./Icons";
import styles from "./Services.module.css";

type Props = { t: Dictionary["services"] };

export default function Services({ t }: Props) {
  return (
    <section className={styles.section} id="services">
      <div className="container">
        <div className={styles.head}>
          <span className="eyebrow">{t.eyebrow}</span>
          <h2 className="sectionTitle">{t.title}</h2>
          <p className="sectionLead">{t.lead}</p>
        </div>

        <div className={styles.stack}>
          {t.items.map((service, i) => (
            <FadeContent key={service.title} duration={0.55} delay={i * 0.06}>
              <article className={styles.row}>
                <div className={styles.meta}>
                  <span className={styles.index}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>
                </div>
                <ul className={styles.points}>
                  {service.points.map((point) => (
                    <li key={point}>
                      <span className={styles.tick}>{Icons.check}</span>
                      {point}
                    </li>
                  ))}
                </ul>
                <Magnet padding={28} magnetStrength={3.5}>
                  <a className="btn btnGhost" href="#offer">
                    {t.learnMore} {Icons.arrow}
                  </a>
                </Magnet>
              </article>
            </FadeContent>
          ))}
        </div>
      </div>
      <div className={styles.cut} aria-hidden />
    </section>
  );
}

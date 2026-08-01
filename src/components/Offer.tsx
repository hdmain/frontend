"use client";

import { useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import { Icons } from "./Icons";
import styles from "./Offer.module.css";

type Props = { t: Dictionary["offer"] };

export default function Offer({ t }: Props) {
  const [premium, setPremium] = useState(false);

  return (
    <section className={styles.section} id="offer">
      <div className="container">
        <div className={styles.head}>
          <div>
            <span className="eyebrow">{t.eyebrow}</span>
            <h2 className="sectionTitle">{t.title}</h2>
            <p className="sectionLead">{t.lead}</p>
          </div>

          <div className={styles.toggle} role="group" aria-label={t.toggleAria}>
            <button
              type="button"
              className={!premium ? styles.tabOn : styles.tab}
              onClick={() => setPremium(false)}
            >
              {t.standard}
            </button>
            <button
              type="button"
              className={premium ? styles.tabOn : styles.tab}
              onClick={() => setPremium(true)}
              aria-pressed={premium}
            >
              {t.premium}
            </button>
          </div>
        </div>

        <div className={styles.grid}>
          {t.plans.map((plan) => (
            <article key={plan.name} className={styles.card}>
              <header className={styles.cardHead}>
                <h3>{plan.name}</h3>
                <p className={styles.price}>
                  <span className={styles.from}>{t.from}</span>
                  {premium ? plan.premiumPrice : plan.price}
                  <span className={styles.period}>{t.perMonth}</span>
                </p>
              </header>
              <dl className={styles.specs}>
                <div>
                  <dt>{t.cpu}</dt>
                  <dd>{plan.cpu}</dd>
                </div>
                <div>
                  <dt>{t.ram}</dt>
                  <dd>{premium ? "DDR5" : plan.ram}</dd>
                </div>
                <div>
                  <dt>{t.disk}</dt>
                  <dd>{plan.disk}</dd>
                </div>
              </dl>
              <a
                className="btn btnPrimary"
                href={`mailto:hello@alfahost.eu?subject=${encodeURIComponent(
                  `${t.orderSubject} ${plan.name}${premium ? " Premium" : ""}`,
                )}`}
              >
                {t.goToOffer} {Icons.arrow}
              </a>
            </article>
          ))}
        </div>
      </div>
      <div className={styles.cut} aria-hidden />
    </section>
  );
}

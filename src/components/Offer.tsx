"use client";

import { useState } from "react";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { asset } from "@/lib/basePath";
import { Icons } from "./Icons";
import styles from "./Offer.module.css";

type Props = {
  locale: Locale;
  t: Dictionary["offer"];
};

export default function Offer({ locale, t }: Props) {
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
          {t.plans.map((plan) => {
            const href = localePath(locale, `offer/${plan.slug}`);
            return (
              <article
                key={plan.slug}
                className={styles.card}
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(7,7,7,0.55) 0%, rgba(7,7,7,0.82) 45%, rgba(7,7,7,0.96) 100%), url(${asset(`/offers/${plan.slug}.jpg`)})`,
                }}
              >
                <a href={href} className={styles.cardLink} aria-label={plan.name}>
                  <span className="sr-only">{plan.name}</span>
                </a>
                <header className={styles.cardHead}>
                  <div className={styles.titleRow}>
                    <span className={styles.tag}>{plan.tag}</span>
                    <h3>{plan.name}</h3>
                  </div>
                  <p className={styles.cardSummary}>{plan.summary}</p>
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
                </header>
                <div className={styles.cardFoot}>
                  <p className={styles.price}>
                    <span className={styles.from}>{t.from}</span>
                    <span className={styles.amount}>
                      {premium ? plan.premiumPrice : plan.price}
                    </span>
                    <span className={styles.period}>{t.perMonth}</span>
                  </p>
                  <a className={`btn btnPrimary ${styles.cta}`} href={href}>
                    {t.goToOffer} {Icons.arrow}
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
      <div className={styles.cut} aria-hidden />
    </section>
  );
}

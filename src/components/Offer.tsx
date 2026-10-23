"use client";

import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { asset } from "@/lib/basePath";
import { useOptionalCurrency } from "./CurrencyProvider";
import GlareHover from "./GlareHover";
import { Icons } from "./Icons";
import styles from "./Offer.module.css";

type Props = {
  locale: Locale;
  headingLevel?: "h1" | "h2";
  t: Dictionary["offer"];
};

export default function Offer({ locale, t, headingLevel: Heading = "h2" }: Props) {
  const currency = useOptionalCurrency();

  return (
    <section className={styles.section} id="offer">
      <div className="container">
        <div className={styles.head}>
          <div>
            <span className="eyebrow">{t.eyebrow}</span>
            <Heading className="sectionTitle">{t.title}</Heading>
            <p className="sectionLead">{t.lead}</p>
          </div>
        </div>

        <div className={styles.grid}>
          {t.plans.map((plan) => {
            const available =
              currency?.prices[plan.slug]?.available ?? plan.available ?? true;
            const href = localePath(locale, `offer/${plan.slug}`);
            const live = currency?.prices[plan.slug];
            const amount = live?.standard || plan.price;
            return (
              <GlareHover
                key={plan.slug}
                className={`${styles.card} ${!available ? styles.cardUnavailable : ""}`}
                width="100%"
                height="auto"
                background="var(--panel)"
                borderRadius="var(--radius)"
                glareColor="var(--red-glow)"
                glareOpacity={0.12}
                glareAngle={-40}
                glareSize={260}
                transitionDuration={700}
              >
                <div
                  className={styles.cardMedia}
                  style={{
                    backgroundImage: `url(${asset(`/offers/${plan.slug}.jpg`)})`,
                  }}
                  aria-hidden
                />
                <a href={href} className={styles.cardLink} aria-label={plan.name}>
                  <span className="sr-only">{plan.name}</span>
                </a>
                <div className={styles.cardBody}>
                  <div className={styles.titleRow}>
                    <h3>{plan.name}</h3>
                  </div>
                  <span className={available ? styles.available : styles.unavailable}>
                    {available ? t.available : t.unavailable}
                  </span>
                  <p className={styles.cardSummary}>{plan.summary}</p>
                  <dl className={styles.specs}>
                    {plan.cpu ? (
                      <div>
                        <dt>{t.cpu}</dt>
                        <dd>{plan.cpu}</dd>
                      </div>
                    ) : null}
                    <div>
                      <dt>{t.ram}</dt>
                      <dd>{plan.ram}</dd>
                    </div>
                    <div>
                      <dt>{t.disk}</dt>
                      <dd>{plan.disk}</dd>
                    </div>
                  </dl>
                </div>
                <div className={styles.cardFoot}>
                  <p className={styles.price}>
                    <span className={styles.from}>{t.from}</span>
                    <span className={styles.amount}>{amount}</span>
                    <span className={styles.period}>{t.perMonth}</span>
                  </p>
                  {available ? (
                    <a className={`btn btnPrimary ${styles.cta}`} href={href}>
                      {t.goToOffer} {Icons.arrow}
                    </a>
                  ) : (
                    <span className={`btn btnGhost ${styles.cta} ${styles.disabledCta}`}>
                      {t.unavailable}
                    </span>
                  )}
                </div>
              </GlareHover>
            );
          })}
        </div>
      </div>
      <div className={styles.cut} aria-hidden />
    </section>
  );
}

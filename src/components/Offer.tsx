"use client";

import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { asset } from "@/lib/basePath";
import { useOptionalCurrency } from "./CurrencyProvider";
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
        <header className={styles.head}>
          <span className="eyebrow">{t.eyebrow}</span>
          <Heading className="sectionTitle">{t.title}</Heading>
          <p className="sectionLead">{t.lead}</p>
        </header>

        <ul className={styles.list}>
          {t.plans.map((plan) => {
            const available = plan.available ?? true;
            const href = localePath(locale, `offer/${plan.slug}`);
            const live = currency?.prices[plan.slug];
            const amount = live?.standard || plan.price;
            return (
              <li key={plan.slug}>
                <a
                  href={href}
                  className={`${styles.row} ${!available ? styles.unavailableRow : ""}`}
                >
                  <span
                    className={styles.thumb}
                    style={{
                      backgroundImage: `url(${asset(`/offers/${plan.slug}.jpg`)})`,
                    }}
                    aria-hidden
                  />
                  <span className={styles.main}>
                    <span className={styles.titleLine}>
                      <strong>{plan.name}</strong>
                      <span
                        className={available ? styles.available : styles.unavailable}
                      >
                        {available ? t.available : t.unavailable}
                      </span>
                    </span>
                    <span className={styles.summary}>{plan.summary}</span>
                    <span className={styles.specs}>
                      <span>
                        {t.ram}: {plan.ram}
                      </span>
                      <span>
                        {t.disk}: {plan.disk}
                      </span>
                    </span>
                  </span>
                  <span className={styles.side}>
                    <span className={styles.price}>
                      <span className={styles.from}>{t.from}</span>
                      <span className={styles.amount}>{amount}</span>
                      <span className={styles.period}>{t.perMonth}</span>
                    </span>
                    <span className={styles.cta}>
                      {available ? t.goToOffer : t.unavailable} {Icons.arrow}
                    </span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

"use client";

import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { asset } from "@/lib/basePath";
import { offerImage, offerPagePath } from "@/lib/siteNavigation";
import { useOptionalCurrency } from "./CurrencyProvider";
import SpotlightCard from "./effects/SpotlightCard";
import { Icons } from "./Icons";
import styles from "./Offer.module.css";
import LocationFlags from "./LocationFlags";

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
          <Heading className="sectionTitle">{t.title}</Heading>
          <p className="sectionLead">{t.lead}</p>
        </header>

        <ul className={styles.grid}>
          {t.plans.map((plan) => {
            const href = localePath(locale, offerPagePath(plan.slug));
            const live = currency?.prices[plan.slug];
            const available = live?.available ?? plan.available ?? true;
            const amount = live?.standard || plan.price;
            return (
              <li key={plan.slug}>
                <SpotlightCard
                  href={href}
                  className={`${styles.card} ${!available ? styles.cardOff : ""}`}
                >
                  <span
                    className={styles.media}
                    style={{
                      backgroundImage: `url(${asset(offerImage(plan.slug))})`,
                    }}
                    aria-hidden
                  />
                  <span className={styles.body}>
                    <span className={styles.top}>
                      <strong><LocationFlags location={plan.slug} locale={locale} /> {plan.name}</strong>
                      <span className={available ? styles.on : styles.off}>
                        {available ? t.available : t.unavailable}
                      </span>
                    </span>
                    <span className={styles.summary}>{plan.summary}</span>
                    <span className={styles.meta}>
                      <span>
                        {t.ram} · {plan.ram}
                      </span>
                      <span>
                        {t.disk} · {plan.disk}
                      </span>
                    </span>
                    <span className={styles.foot}>
                      <span className={styles.price}>
                        <span className={styles.from}>{t.from}</span>
                        <span className={styles.amount}>{amount}</span>
                        <span className={styles.period}>{t.perMonth}</span>
                      </span>
                      <span className={styles.cta}>
                        {available ? t.goToOffer : t.unavailable} {Icons.arrow}
                      </span>
                    </span>
                  </span>
                </SpotlightCard>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

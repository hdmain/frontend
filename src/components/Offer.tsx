"use client";

import { useState } from "react";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { Icons } from "./Icons";
import styles from "./Offer.module.css";

type Props = {
  locale: Locale;
  t: Dictionary["offer"];
};

const FEATURED_SLUG = "minecraft";

/** Vibrant service/game marks keyed by offer slug. */
function ServiceMark({ slug }: { slug: string }) {
  switch (slug) {
    case "minecraft":
      return (
        <svg viewBox="0 0 32 32" className={styles.markSvg} aria-hidden>
          <path
            fill="#74c51d"
            d="M6 5h20l5 5v17H6L1 22V10z"
          />
          <path
            fill="#5b9c17"
            d="M11 10h10v5H16v5h-5zM21 10h5v10h-5v5h-10v-5h10v-5h-5z"
          />
          <path
            fill="#8fe03a"
            d="M11 10h5v5h-5zM21 15h5v5h-5zM16 15h5v5h-5zM16 20h5v5h-5z"
          />
          <path
            fill="#4a7e12"
            d="M6 20h5v5H6zM21 15h5v5h-5zM16 20h5v5h-5z"
          />
        </svg>
      );
    case "rust":
      return (
        <svg viewBox="0 0 32 32" className={styles.markSvg} aria-hidden>
          <circle cx="16" cy="16" r="13" fill="#f0a52b" />
          <circle cx="16" cy="16" r="8.5" fill="none" stroke="#7a3f00" strokeWidth="2" />
          <path
            fill="#7a3f00"
            d="M16 6l2.2 3.2h-4.4zM16 26l-2.2-3.2h4.4zM6 16l3.2-2.2v4.4zM26 16l-3.2 2.2v-4.4z"
          />
          <circle cx="16" cy="16" r="3.2" fill="#7a3f00" />
        </svg>
      );
    case "discord":
      return (
        <svg viewBox="0 0 32 32" className={styles.markSvg} aria-hidden>
          <path
            fill="#5865f2"
            d="M26.6 8.4a21.6 21.6 0 0 0-5.3-1.6 17.2 17.2 0 0 0-.8 1.6 20.2 20.2 0 0 0-6.1 0 17.2 17.2 0 0 0-.8-1.6A21.6 21.6 0 0 0 8.3 8.4a21.6 21.6 0 0 0-4.6 14.4 22 22 0 0 0 6.7 3.3 17.6 17.6 0 0 0 1.4-2.3 13.6 13.6 0 0 1-2.2-1.1l.5-.4a15.7 15.7 0 0 0 13.8 0l.5.4a13.6 13.6 0 0 1-2.2 1.1 17.6 17.6 0 0 0 1.4 2.3 22 22 0 0 0 6.7-3.3 21.6 21.6 0 0 0-3.9-14.4zM12.5 20c-1.1 0-2-1-2-2.2s.9-2.2 2-2.2 2 1 2 2.2-.9 2.2-2 2.2zm8.4 0c-1.1 0-2-1-2-2.2s.9-2.2 2-2.2 2 1 2 2.2-.9 2.2-2 2.2z"
          />
        </svg>
      );
    case "vps":
      return (
        <svg viewBox="0 0 32 32" className={styles.markSvg} aria-hidden>
          <path
            fill="#ef4444"
            d="M4 6a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"
          />
          <path
            fill="#dc2626"
            d="M4 17a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"
          />
          <path
            fill="#7f1d1d"
            d="M6 8h20v3H6zM6 19h20v3H6z"
          />
          <circle cx="11" cy="9.5" r="1.4" fill="#0a0a0c" />
          <circle cx="11" cy="20.5" r="1.4" fill="#0a0a0c" />
          <path fill="#0a0a0c" d="M14 27l4-6 4 6z" />
        </svg>
      );
    case "palworld":
      return (
        <svg viewBox="0 0 32 32" className={styles.markSvg} aria-hidden>
          <circle cx="16" cy="16" r="13" fill="#ef4444" />
          <circle cx="16" cy="16" r="13" fill="none" stroke="#7f1d1d" strokeWidth="1.5" />
          <path
            fill="#fff"
            d="M16 6a7.5 7.5 0 0 1 7.5 7.5c0 2.5-2 4.5-3.5 5.5l-1.5 1v2.5h-5v-2.5l-1.5-1c-1.5-1-3.5-3-3.5-5.5A7.5 7.5 0 0 1 16 6z"
          />
          <circle cx="13" cy="13" r="1.4" fill="#7f1d1d" />
          <circle cx="19" cy="13" r="1.4" fill="#7f1d1d" />
          <path
            fill="none"
            stroke="#7f1d1d"
            strokeWidth="1.6"
            strokeLinecap="round"
            d="M13.5 16.5c1.5 1.2 3.5 1.2 5 0"
          />
        </svg>
      );
    case "dedicated":
      return (
        <svg viewBox="0 0 32 32" className={styles.markSvg} aria-hidden>
          <path
            fill="#ef4444"
            d="M9 5h14a2 2 0 0 1 2 2v18a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z"
          />
          <path
            fill="#0a0a0c"
            d="M11 8h10v3H11zM11 13h10v3H11zM11 18h10v3H11zM11 23h10v2H11z"
          />
          <circle cx="23" cy="16" r="1.3" fill="#fca5a5" />
          <path fill="#7f1d1d" d="M16 12l-3 3h2v3h2v-3h2z" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 32 32" className={styles.markSvg} aria-hidden>
          <rect x="6" y="6" width="20" height="20" rx="3" fill="#ef4444" />
          <path fill="#0a0a0c" d="M11 11h4v4h-4zM17 11h4v4h-4zM11 17h4v4h-4zM17 17h4v4h-4z" />
        </svg>
      );
  }
}

export default function Offer({ locale, t }: Props) {
  const [premium, setPremium] = useState(false);

  return (
    <section className={styles.section} id="offer">
      <div className="container">
        <div className={styles.head}>
          <div>
            <h2 className={styles.title}>{t.title}</h2>
            <p className={styles.lead}>{t.lead}</p>
          </div>

          <div className={styles.toggle} role="group" aria-label={t.toggleAria}>
            <span
              className={styles.toggleGlow}
              style={{ transform: premium ? "translateX(100%)" : "translateX(0)" }}
              aria-hidden
            />
            <button
              type="button"
              className={`${styles.tab} ${!premium ? styles.tabOn : ""}`}
              onClick={() => setPremium(false)}
              aria-pressed={!premium}
            >
              {t.standard}
            </button>
            <button
              type="button"
              className={`${styles.tab} ${premium ? styles.tabOn : ""}`}
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
            const featured = plan.slug === FEATURED_SLUG;
            return (
              <article
                key={plan.slug}
                className={`${styles.card} ${featured ? styles.cardFeatured : ""}`}
              >
                {featured && (
                  <span className={styles.popularBadge}>
                    <span className={styles.popularDot} aria-hidden />
                    {t.popular}
                  </span>
                )}

                <header className={styles.cardHead}>
                  <div className={styles.titleRow}>
                    <span className={styles.mark} aria-hidden>
                      <ServiceMark slug={plan.slug} />
                    </span>
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

                <footer className={styles.cardFoot}>
                  <p className={styles.price}>
                    <span className={styles.amount}>
                      {premium ? plan.premiumPrice : plan.price}
                    </span>
                    <span className={styles.period}>{t.perMonth}</span>
                  </p>
                  <a className={styles.cta} href={href}>
                    <span>{t.goToOffer}</span>
                    {Icons.arrow}
                  </a>
                </footer>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
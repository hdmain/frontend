import type { Locale } from "@/i18n/config";
import { localeHref, localePath } from "@/i18n/config";
import type { Dictionary, OfferPlan } from "@/i18n/dictionaries";
import { asset } from "@/lib/basePath";
import { Icons } from "./Icons";
import styles from "./OfferDetail.module.css";

type Props = {
  locale: Locale;
  t: Dictionary["offer"];
  plan: OfferPlan;
  others: OfferPlan[];
};

export default function OfferDetail({ locale, t, plan, others }: Props) {
  const bg = asset(`/offers/${plan.slug}.jpg`);

  return (
    <section className={styles.section}>
      <div
        className={styles.hero}
        style={{
          backgroundImage: `linear-gradient(115deg, rgba(7,7,7,0.92) 0%, rgba(7,7,7,0.78) 45%, rgba(7,7,7,0.55) 100%), url(${bg})`,
        }}
      >
        <div className={`container ${styles.heroInner}`}>
          <a className={styles.back} href={localeHref(locale, "#offer")}>
            ← {t.backToOffer}
          </a>
          <div className={styles.titleRow}>
            <span className={styles.tag}>{plan.tag}</span>
            <h1>{plan.name}</h1>
          </div>
          <p className={styles.summary}>{plan.summary}</p>
          <div className={styles.priceRow}>
            <div>
              <span className={styles.from}>{t.from}</span>
              <p className={styles.price}>
                <span>{plan.price}</span>
                <small>
                  {t.standard} · {t.perMonth}
                </small>
              </p>
            </div>
            <div>
              <span className={styles.from}>{t.premium}</span>
              <p className={styles.price}>
                <span>{plan.premiumPrice}</span>
                <small>{t.perMonth}</small>
              </p>
            </div>
            <a
              className={`btn btnPrimary ${styles.order}`}
              href={`mailto:hello@alfahost.eu?subject=${encodeURIComponent(
                `${t.orderSubject} ${plan.name}`,
              )}`}
            >
              {t.orderNow} {Icons.arrow}
            </a>
          </div>
        </div>
      </div>

      <div className={`container ${styles.body}`}>
        <div className={styles.main}>
          <p className={styles.description}>{plan.description}</p>
          <p className={styles.ideal}>
            <strong>{t.idealForLabel}:</strong> {plan.idealFor}
          </p>

          <div className={styles.cols}>
            <div>
              <h2>{t.highlightsTitle}</h2>
              <ul>
                {plan.highlights.map((item) => (
                  <li key={item}>
                    <span aria-hidden>{Icons.check}</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2>{t.includesTitle}</h2>
              <ul>
                {plan.includes.map((item) => (
                  <li key={item}>
                    <span aria-hidden>{Icons.check}</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <aside className={styles.aside}>
          <h2>{t.hardwareTitle}</h2>
          <dl>
            <div>
              <dt>{t.cpu}</dt>
              <dd>{plan.cpu}</dd>
            </div>
            <div>
              <dt>{t.ram}</dt>
              <dd>
                {plan.ram} / DDR5 ({t.premium})
              </dd>
            </div>
            <div>
              <dt>{t.disk}</dt>
              <dd>{plan.disk}</dd>
            </div>
          </dl>
          <a
            className="btn btnGhost"
            href={`mailto:hello@alfahost.eu?subject=${encodeURIComponent(
              `${t.orderSubject} ${plan.name} Premium`,
            )}`}
          >
            {t.premium}: {plan.premiumPrice}
            {t.perMonth}
          </a>
        </aside>
      </div>

      {others.length > 0 ? (
        <div className={`container ${styles.others}`}>
          <h2>{t.otherOffers}</h2>
          <div className={styles.otherGrid}>
            {others.map((item) => (
              <a
                key={item.slug}
                className={styles.otherCard}
                href={localePath(locale, `offer/${item.slug}`)}
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(7,7,7,0.05), rgba(7,7,7,0.55)), url(${asset(`/offers/${item.slug}.jpg`)})`,
                }}
              >
                <span className={styles.tag}>{item.tag}</span>
                <strong>{item.name}</strong>
                <span>
                  {t.from} {item.price}
                  {t.perMonth}
                </span>
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}

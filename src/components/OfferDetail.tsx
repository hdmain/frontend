"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/i18n/config";
import { localeHref, localePath } from "@/i18n/config";
import type { Dictionary, OfferPlan } from "@/i18n/dictionaries";
import { asset } from "@/lib/basePath";
import { papiBaseUrl } from "@/lib/currency";
import { useOptionalCurrency } from "./CurrencyProvider";
import { Icons } from "./Icons";
import styles from "./OfferDetail.module.css";

type ApiPackage = {
  id: string;
  name: string;
  tagline: string;
  vcpu: string;
  ram_gb: number;
  disk_gb: number;
  backups: number;
  databases: number;
  ports: number;
  players: string;
  antiddos: boolean;
  price_formatted: string;
  premium_formatted: string;
};

type ApiOffer = {
  slug: string;
  tag: string;
  cpu: string;
  name: string;
  summary: string;
  description: string;
  packages: ApiPackage[];
};

type Props = {
  locale: Locale;
  t: Dictionary["offer"];
  plan: OfferPlan;
  others: OfferPlan[];
};

export default function OfferDetail({ locale, t, plan, others }: Props) {
  const bg = asset(`/offers/${plan.slug}.jpg`);
  const currencyCtx = useOptionalCurrency();
  const currency = currencyCtx?.currency ?? "PLN";
  const [premium, setPremium] = useState(false);
  const [offer, setOffer] = useState<ApiOffer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${papiBaseUrl()}/v1/offers/${plan.slug}?lang=${locale}&currency=${currency}`,
        );
        if (!res.ok) throw new Error(`papi ${res.status}`);
        const data = (await res.json()) as { offer: ApiOffer };
        if (!cancelled) setOffer(data.offer);
      } catch {
        if (!cancelled) setOffer(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    void load();
    return () => {
      cancelled = true;
    };
  }, [plan.slug, locale, currency]);

  const title = offer?.name || plan.name;
  const summary = offer?.summary || plan.summary;
  const description = offer?.description || plan.description;
  const cpu = offer?.cpu || plan.cpu;
  const packages = offer?.packages ?? [];

  return (
    <section className={styles.section}>
      <div className={styles.hero}>
        <div
          className={styles.heroMedia}
          style={{ backgroundImage: `url(${bg})` }}
          aria-hidden
        />
        <div className={`container ${styles.heroInner}`}>
          <a className={styles.back} href={localeHref(locale, "#offer")}>
            ← {t.backToOffer}
          </a>
          <div className={styles.titleRow}>
            <span className={styles.tag}>{plan.tag}</span>
            <h1>{title}</h1>
          </div>
          <p className={styles.summary}>{summary}</p>
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
      </div>

      <div className={`container ${styles.catalog}`}>
        {loading ? (
          <p className={styles.loading}>{t.loadingOffer}</p>
        ) : packages.length > 0 ? (
          <div className={styles.packageGrid}>
            {packages.map((pkg) => {
              const price = premium ? pkg.premium_formatted : pkg.price_formatted;
              const orderHref = `mailto:support@alfahost.eu?subject=${encodeURIComponent(
                `${t.orderSubject} ${title} ${pkg.name}${premium ? ` (${t.premium})` : ""}`,
              )}`;
              return (
                <article key={pkg.id} className={styles.packageCard}>
                  <div className={styles.packageHead}>
                    <h2>{pkg.name}</h2>
                    <p>{pkg.tagline}</p>
                  </div>
                  <p className={styles.packagePrice}>
                    <strong>{price}</strong>
                    <span>{t.perMonth}</span>
                  </p>
                  <ul className={styles.packageSpecs}>
                    <li>
                      <span>{t.cpu}</span>
                      <strong>
                        {pkg.vcpu} {cpu}
                      </strong>
                    </li>
                    <li>
                      <span>{t.ram}</span>
                      <strong>
                        {pkg.ram_gb} GB {premium ? "DDR5" : "DDR4"}
                      </strong>
                    </li>
                    <li>
                      <span>{t.disk}</span>
                      <strong>{pkg.disk_gb} GB NVMe</strong>
                    </li>
                    <li>
                      <span>{t.backups}</span>
                      <strong>{pkg.backups}</strong>
                    </li>
                    <li>
                      <span>{t.databases}</span>
                      <strong>{pkg.databases}</strong>
                    </li>
                    <li>
                      <span>{t.ports}</span>
                      <strong>{pkg.ports}</strong>
                    </li>
                    <li>
                      <span>{t.antiddos}</span>
                      <strong>✓</strong>
                    </li>
                    <li>
                      <span>{t.players}</span>
                      <strong>{pkg.players}</strong>
                    </li>
                  </ul>
                  <a className={`btn btnPrimary ${styles.buy}`} href={orderHref}>
                    {t.buyPackage} {Icons.arrow}
                  </a>
                </article>
              );
            })}
          </div>
        ) : (
          <div className={styles.fallback}>
            <p>{description}</p>
            <a
              className="btn btnPrimary"
              href={`mailto:support@alfahost.eu?subject=${encodeURIComponent(
                `${t.orderSubject} ${plan.name}`,
              )}`}
            >
              {t.orderNow} {Icons.arrow}
            </a>
          </div>
        )}
      </div>

      {others.length > 0 ? (
        <div className={`container ${styles.others}`}>
          <h2>{t.otherOffers}</h2>
          <div className={styles.otherGrid}>
            {others.map((item) => {
              const otherLive = currencyCtx?.prices[item.slug];
              const otherPrice = otherLive?.standard || item.price;
              return (
                <a
                  key={item.slug}
                  className={styles.otherCard}
                  href={localePath(locale, `offer/${item.slug}`)}
                >
                  <span
                    className={styles.otherMedia}
                    style={{
                      backgroundImage: `url(${asset(`/offers/${item.slug}.jpg`)})`,
                    }}
                    aria-hidden
                  />
                  <span className={styles.tag}>{item.tag}</span>
                  <strong>{item.name}</strong>
                  <span>
                    {t.from} {otherPrice}
                    {t.perMonth}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      ) : null}
    </section>
  );
}

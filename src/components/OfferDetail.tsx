"use client";

import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/config";
import type { Dictionary, OfferPlan } from "@/i18n/dictionaries";
import { asset } from "@/lib/basePath";
import { papiBaseUrl } from "@/lib/currency";
import { legalEntity } from "@/lib/legal";
import { offerImage, offerLocation, offerPagePath } from "@/lib/siteNavigation";
import { useOptionalCurrency } from "./CurrencyProvider";
import { Icons } from "./Icons";
import PaymentMethods from "./PaymentMethods";
import styles from "./OfferDetail.module.css";
import LocationFlags from "./LocationFlags";

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
  videoplayer?: boolean;
  in_stock?: boolean;
  sold_out?: boolean;
  price_sale_formatted?: string;
  discounted?: boolean;
  price_formatted: string;
};

type ApiOffer = {
  slug: string;
  available: boolean;
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
  showHero?: boolean;
};

export default function OfferDetail({ locale, t, plan, others, showHero = true }: Props) {
  const bg = asset(offerImage(plan.slug));
  const currencyCtx = useOptionalCurrency();
  const currency = currencyCtx?.currency ?? "PLN";
  const [offer, setOffer] = useState<ApiOffer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${papiBaseUrl()}/v1/offers/${plan.slug}?lang=${locale}&currency=${currency}`,
          { cache: "no-store" },
        );
        if (!res.ok) throw new Error(`papi ${res.status}`);
        const data = JSON.parse(await res.text(), (_key, value: unknown) =>
          typeof value === "string" ? value.replace(/\u2014/g, "-") : value,
        ) as { offer: ApiOffer };
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

  const title = plan.slug.startsWith("vps-kvm-") ? "VPS KVM" : offer?.name || plan.name;
  const summary = offer?.summary || plan.summary;
  const description = plan.slug.startsWith("vps-kvm-") ? plan.description : offer?.description || plan.description;
  const available = offer?.available ?? currencyCtx?.prices[plan.slug]?.available ?? plan.available ?? true;
  const packages = offer?.packages ?? [];
  const formatRam = (ramGB: number) => {
    if (plan.slug === "vps-nat") {
      return ramGB < 1 ? `${Math.round(ramGB * 1024)} MB` : `${ramGB} GB`;
    }
    return `${ramGB} GB`;
  };

  const contactOnly = plan.slug === "dedicated";
  const contactLabel = locale === "pl" ? "Skontaktuj się" : locale === "ru" ? "Связаться с нами" : "Contact us";
  const orderHref = contactOnly ? localePath(locale, "contact") : legalEntity.panel;
  const stockText = {
    pl: { sold: "Wyprzedane", available: "Dostępne" },
    en: { sold: "Sold out", available: "In stock" },
    ru: { sold: "Распродано", available: "В наличии" },
  }[locale];

  return (
    <section className={styles.section} id="offer">
      {showHero && <div className={styles.hero}>
        <div
          className={styles.heroMedia}
          style={{ backgroundImage: `url(${bg})` }}
          aria-hidden
        />
        <div className={`container ${styles.heroInner}`}>
          <a className={styles.back} href={localePath(locale, plan.slug.startsWith("vps-kvm-") ? "vps" : plan.slug === "vps-nat" ? "nat-vps" : ["dedicated", "torrent-box"].includes(plan.slug) ? "hosting" : "game-servers")}>
            ← {t.backToOffer}
          </a>
          <div className={styles.titleRow}>
            <h1>{title}</h1>
          </div>
          <p className={styles.summary}>{summary}</p>
          {offerLocation(locale, plan.slug) && <p className={styles.location}><LocationFlags location={plan.slug} locale={locale} /><MapPin size={16} aria-hidden="true" />{offerLocation(locale, plan.slug)}</p>}
        </div>
      </div>}

      <div className={`container ${styles.catalog}`}>
        {loading ? (
          <p className={styles.loading}>{t.loadingOffer}</p>
        ) : packages.length > 0 ? (
          <div className={styles.packageGrid}>
            {packages.map((pkg) => {
              const price = pkg.discounted && pkg.price_sale_formatted ? pkg.price_sale_formatted : pkg.price_formatted;
              const soldOut = pkg.sold_out === true || pkg.in_stock === false;
              const packageAvailable = available && !soldOut;
              const hasStockStatus = typeof pkg.in_stock === "boolean" || typeof pkg.sold_out === "boolean";
              return (
                <article key={pkg.id} className={styles.packageCard}>
                  <div className={styles.packageHead}>
                    <h2>{pkg.name}</h2>
                    {hasStockStatus && <span className={`${styles.stock} ${packageAvailable ? styles.inStock : styles.soldOut}`}>{packageAvailable ? stockText.available : soldOut ? stockText.sold : t.unavailable}</span>}
                    <p>{pkg.tagline}</p>
                  </div>
                  <p className={styles.packagePrice}>
                    <strong>{price}</strong>
                    <span>{t.perMonth}</span>
                  </p>
                  <ul className={styles.packageSpecs}>
                    {plan.slug === "torrent-box" && <li>
                      <span>{locale === "pl" ? "Odtwarzacz wideo" : locale === "ru" ? "Видеоплеер" : "Video player"}</span>
                      <strong>{(pkg.videoplayer ?? ["plus", "pro", "ultra"].includes(pkg.id)) ? "✓" : "-"}</strong>
                    </li>}
                    <li>
                      <span>{t.cpu}</span>
                      <strong>{pkg.vcpu}</strong>
                    </li>
                    <li>
                      <span>{t.ram}</span>
                      <strong>{formatRam(pkg.ram_gb)}</strong>
                    </li>
                    <li>
                      <span>{t.disk}</span>
                      <strong>
                        {pkg.disk_gb} GB{plan.slug.startsWith("vps-kvm-") ? " SSD" : ["minecraft", "rust", "palworld", "discord"].includes(plan.slug) ? " NVMe" : ""}
                      </strong>
                    </li>
                    {pkg.backups > 0 ? (
                      <li>
                        <span>{t.backups}</span>
                        <strong>{pkg.backups}</strong>
                      </li>
                    ) : null}
                    {pkg.databases > 0 ? (
                      <li>
                        <span>{t.databases}</span>
                        <strong>{pkg.databases}</strong>
                      </li>
                    ) : null}
                    {pkg.ports > 0 ? (
                      <li>
                        <span>{plan.slug.startsWith("vps-kvm-") ? "IPv4" : plan.slug === "vps-nat" ? t.publicPorts : t.ports}</span>
                        <strong>{plan.slug.startsWith("vps-kvm-") ? "✓" : pkg.ports}</strong>
                      </li>
                    ) : null}
                    <li>
                      <span>{t.antiddos}</span>
                      <strong>{pkg.antiddos ? "✓" : "-"}</strong>
                    </li>
                    {pkg.players && pkg.players !== "-" ? (
                      <li>
                        <span>{t.players}</span>
                        <strong>{pkg.players}</strong>
                      </li>
                    ) : null}
                  </ul>
                  {packageAvailable ? (
                    <a className={`btn btnPrimary ${styles.buy}`} href={orderHref}>
                      {contactOnly ? contactLabel : t.buyPackage} {Icons.arrow}
                    </a>
                  ) : (
                    <span className={`btn btnGhost ${styles.buy}`} aria-disabled="true">
                      {soldOut ? stockText.sold : t.unavailable}
                    </span>
                  )}
                </article>
              );
            })}
          </div>
        ) : (
          <div className={styles.fallback}>
            <p>{description}</p>
            {available ? (
              <a className="btn btnPrimary" href={orderHref}>
                {contactOnly ? contactLabel : t.orderNow} {Icons.arrow}
              </a>
            ) : (
              <span className="btn btnGhost" aria-disabled="true">
                {t.unavailable}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="container"><PaymentMethods locale={locale} /></div>

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
                  href={localePath(locale, offerPagePath(item.slug))}
                >
                  <span
                    className={styles.otherMedia}
                    style={{
                      backgroundImage: `url(${asset(offerImage(item.slug))})`,
                    }}
                    aria-hidden
                  />
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

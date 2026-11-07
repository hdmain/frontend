"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { localePath, type Locale } from "@/i18n/config";
import { papiBaseUrl } from "@/lib/currency";
import { offerPagePath } from "@/lib/siteNavigation";
import styles from "./SaleBanner.module.css";

type DiscountOffer = { slug: string; name: string };
type Package = { discounted?: boolean; price_sale?: number; price_list?: number; price?: number; in_stock?: boolean; sold_out?: boolean };
const copy = {
  pl: { title: "Oferta specjalna", description: "Wybrane pakiety w lepszej cenie.", link: "Sprawdź ofertę" },
  en: { title: "Special offers", description: "Selected packages at a better price.", link: "View offer" },
  ru: { title: "Специальное предложение", description: "Отдельные тарифы по выгодной цене.", link: "Смотреть предложение" },
};

export default function SaleBanner({ locale }: { locale: Locale }) {
  const [result, setResult] = useState<{ locale: Locale; offers: DiscountOffer[] } | null>(null);
  useEffect(() => {
    const controller = new AbortController();
    async function read(path: string) {
      const response = await fetch(`${papiBaseUrl()}${path}`, { cache: "no-store", signal: controller.signal });
      if (!response.ok) throw new Error(`PAPI ${response.status}`);
      return response.json();
    }
    async function load() {
      try {
        const catalogue = await read(`/v1/offers?lang=${locale}&currency=PLN`) as { offers: (DiscountOffer & { available: boolean })[] };
        const results = await Promise.allSettled(catalogue.offers.filter((offer) => offer.available).map(async (item) => {
          const data = await read(`/v1/offers/${encodeURIComponent(item.slug)}?lang=${locale}&currency=PLN`) as { offer: { available: boolean; packages: Package[] } };
          const discounted = data.offer.available && data.offer.packages.some((pkg) => pkg.sold_out !== true && pkg.in_stock !== false && pkg.discounted === true && typeof pkg.price_sale === "number" && pkg.price_sale > 0 && pkg.price_sale < (pkg.price_list ?? pkg.price ?? 0));
          return discounted ? { slug: item.slug, name: item.name.replace(/\u2014/g, "-") } : null;
        }));
        const offers = results.flatMap((entry) => entry.status === "fulfilled" && entry.value ? [entry.value] : []);
        if (!controller.signal.aborted) setResult({ locale, offers });
      } catch {
        if (!controller.signal.aborted) setResult({ locale, offers: [] });
      }
    }
    void load();
    return () => controller.abort();
  }, [locale]);

  if (result?.locale !== locale || !result.offers.length) return null;
  const t = copy[locale];
  return <aside className={styles.banner} aria-label={t.title}>
    <div className={`container ${styles.inner}`}>
      <div className={styles.copy}><span className={styles.badge}><Sparkles size={15} aria-hidden="true" />{t.title}</span><p>{t.description}</p></div>
      <div className={styles.links}>{result.offers.map((offer) => <a key={offer.slug} href={localePath(locale, offerPagePath(offer.slug))} aria-label={`${t.link}: ${offer.name}`}>{offer.name}<ArrowUpRight size={15} aria-hidden="true" /></a>)}</div>
    </div>
  </aside>;
}

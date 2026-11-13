"use client";

import type { Locale } from "@/i18n/config";
import offers from "@/i18n/papi-offers.json";
import { numericPrice } from "@/lib/prices";
import { useOptionalCurrency } from "./CurrencyProvider";
import styles from "./SiteHeader.module.css";

const slugsByPath: Record<string, string[]> = {
  "game-servers": ["minecraft", "rust", "palworld", "discord"],
  "nat-vps": ["vps-nat"],
  vps: ["vps-kvm-pl", "vps-kvm-de", "vps-kvm-nl"],
  "offer/vps-kvm-pl": ["vps-kvm-pl"],
  "offer/vps-kvm-de": ["vps-kvm-de"],
  "offer/vps-kvm-nl": ["vps-kvm-nl"],
  "offer/dedicated": ["dedicated"],
  "offer/torrent-box": ["torrent-box"],
};
const labels = {
  pl: { from: "Od", period: "/mies." },
  en: { from: "From", period: "/mo" },
  ru: { from: "От", period: "/мес." },
};

export default function MenuStartingPrice({ path, locale }: { path: string; locale: Locale }) {
  const currency = useOptionalCurrency();
  const slugs = slugsByPath[path];
  if (!slugs) return null;
  const hasLivePrices = !!currency && Object.keys(currency.prices).length > 0;
  // The snapshot contains PLN prices; don't show these under a different currency.
  if (!hasLivePrices && currency?.currency !== "PLN") return null;
  const prices = hasLivePrices
    ? slugs.flatMap((slug) => {
      const price = currency.prices[slug];
      return price?.available && price.standard ? [price.standard] : [];
    })
    : offers[locale].filter((offer) => slugs.includes(offer.slug) && offer.available).map((offer) => offer.from.standard_formatted);
  const amount = prices.reduce((lowest, price) => numericPrice(price) < numericPrice(lowest) ? price : lowest, "");
  if (!amount) return null;
  return <small className={styles.menuPrice}>{labels[locale].from} {amount}{labels[locale].period}</small>;
}

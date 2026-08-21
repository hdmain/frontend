"use client";

import { useRouter } from "next/navigation";
import {
  localeNames,
  localePath,
  locales,
  type Locale,
} from "@/i18n/config";
import { currencies, currencyLabels, type Currency } from "@/lib/currency";
import { useCurrency } from "./CurrencyProvider";
import styles from "./LocaleControls.module.css";

type Props = {
  locale: Locale;
  languageLabel: string;
  currencyLabel: string;
  path?: string;
};

export default function LocaleControls({
  locale,
  languageLabel,
  currencyLabel,
  path,
}: Props) {
  const router = useRouter();
  const { currency, setCurrency } = useCurrency();

  return (
    <div className={styles.row}>
      <label className={styles.field}>
        <span className="sr-only">{languageLabel}</span>
        <select
          className={styles.select}
          aria-label={languageLabel}
          value={locale}
          onChange={(e) => {
            const next = e.target.value as Locale;
            const href = path ? localePath(next, path) : localePath(next);
            router.push(href);
          }}
        >
          {locales.map((code) => (
            <option key={code} value={code}>
              {localeNames[code]}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.field}>
        <span className="sr-only">{currencyLabel}</span>
        <select
          className={styles.select}
          aria-label={currencyLabel}
          value={currency}
          onChange={(e) => setCurrency(e.target.value as Currency)}
        >
          {currencies.map((code) => (
            <option key={code} value={code}>
              {currencyLabels[code]}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

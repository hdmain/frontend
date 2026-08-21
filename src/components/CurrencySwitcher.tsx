"use client";

import { currencies, currencyLabels, type Currency } from "@/lib/currency";
import { useCurrency } from "./CurrencyProvider";
import styles from "./LanguageSwitcher.module.css";

type Props = {
  label?: string;
};

export default function CurrencySwitcher({ label = "Currency" }: Props) {
  const { currency, setCurrency } = useCurrency();

  return (
    <nav className={styles.row} aria-label={label}>
      {currencies.map((code, i) => (
        <span key={code} className={styles.item}>
          {i > 0 ? <span className={styles.sep} aria-hidden>
            |
          </span> : null}
          <button
            type="button"
            className={`${styles.link} ${code === currency ? styles.active : ""}`}
            aria-pressed={code === currency}
            onClick={() => setCurrency(code as Currency)}
          >
            {currencyLabels[code]}
          </button>
        </span>
      ))}
    </nav>
  );
}

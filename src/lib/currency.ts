import type { Locale } from "@/i18n/config";

export const currencies = ["PLN", "USD", "EUR", "RUB"] as const;
export type Currency = (typeof currencies)[number];
export const defaultCurrency: Currency = "PLN";

export const currencyLabels: Record<Currency, string> = {
  PLN: "PLN",
  USD: "USD",
  EUR: "EUR",
  RUB: "RUB",
};

const STORAGE_KEY = "alfahost-currency";
const STORAGE_LOCALE_KEY = "alfahost-currency-locale";

export function isCurrency(value: string): value is Currency {
  return currencies.includes(value as Currency);
}

/** PL → PLN, every other language → USD */
export function defaultCurrencyForLocale(locale: Locale): Currency {
  return locale === "pl" ? "PLN" : "USD";
}

export function readStoredCurrency(): Currency | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw && isCurrency(raw)) return raw;
  } catch {
    /* ignore */
  }
  return null;
}

export function readStoredCurrencyLocale(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(STORAGE_LOCALE_KEY);
  } catch {
    /* ignore */
  }
  return null;
}

export function storeCurrency(currency: Currency, locale?: Locale) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, currency);
    if (locale) {
      window.localStorage.setItem(STORAGE_LOCALE_KEY, locale);
    }
  } catch {
    /* ignore */
  }
}

export function resolveCurrency(locale: Locale): Currency {
  const stored = readStoredCurrency();
  const storedLocale = readStoredCurrencyLocale();
  if (stored && storedLocale === locale) return stored;
  return defaultCurrencyForLocale(locale);
}

export function papiBaseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_PAPI_URL?.replace(/\/$/, "") ||
    "https://papi.alfahostu.eu"
  );
}

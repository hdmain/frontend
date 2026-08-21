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

export function isCurrency(value: string): value is Currency {
  return currencies.includes(value as Currency);
}

export function readStoredCurrency(): Currency {
  if (typeof window === "undefined") return defaultCurrency;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw && isCurrency(raw)) return raw;
  } catch {
    /* ignore */
  }
  return defaultCurrency;
}

export function storeCurrency(currency: Currency) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, currency);
  } catch {
    /* ignore */
  }
}

export function papiBaseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_PAPI_URL?.replace(/\/$/, "") ||
    "https://papi.alfahostu.eu"
  );
}

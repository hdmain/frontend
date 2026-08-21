"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Locale } from "@/i18n/config";
import {
  defaultCurrency,
  defaultCurrencyForLocale,
  papiBaseUrl,
  resolveCurrency,
  storeCurrency,
  type Currency,
} from "@/lib/currency";

export type PlanPrices = {
  slug: string;
  standard: string;
  premium: string;
};

type CurrencyContextValue = {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  syncLocale: (locale: Locale) => void;
  prices: Record<string, PlanPrices>;
  ready: boolean;
};

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

type PricesResponse = {
  plans: Array<{
    slug: string;
    formatted: {
      standard: Record<string, string>;
      premium: Record<string, string>;
    };
  }>;
};

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>(defaultCurrency);
  const [locale, setLocale] = useState<Locale | null>(null);
  const [prices, setPrices] = useState<Record<string, PlanPrices>>({});
  const [ready, setReady] = useState(false);

  const syncLocale = useCallback((next: Locale) => {
    setLocale(next);
    setCurrencyState(resolveCurrency(next));
  }, []);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch(
          `${papiBaseUrl()}/v1/prices?currency=${currency}`,
        );
        if (!res.ok) throw new Error(`papi ${res.status}`);
        const data = (await res.json()) as PricesResponse;
        if (cancelled) return;
        const map: Record<string, PlanPrices> = {};
        for (const plan of data.plans ?? []) {
          map[plan.slug] = {
            slug: plan.slug,
            standard: plan.formatted.standard[currency] ?? "",
            premium: plan.formatted.premium[currency] ?? "",
          };
        }
        setPrices(map);
      } catch {
        if (!cancelled) setPrices({});
      } finally {
        if (!cancelled) setReady(true);
      }
    };
    void load();
    return () => {
      cancelled = true;
    };
  }, [currency]);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    storeCurrency(c, locale ?? undefined);
  };

  return (
    <CurrencyContext.Provider
      value={{ currency, setCurrency, syncLocale, prices, ready }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) {
    throw new Error("useCurrency must be used within CurrencyProvider");
  }
  return ctx;
}

export function useOptionalCurrency() {
  return useContext(CurrencyContext);
}

/** Keep currency defaults in sync with active page locale. */
export function useSyncCurrencyLocale(locale: Locale) {
  const syncLocale = useOptionalCurrency()?.syncLocale;
  useEffect(() => {
    syncLocale?.(locale);
  }, [locale, syncLocale]);
}

export { defaultCurrencyForLocale };

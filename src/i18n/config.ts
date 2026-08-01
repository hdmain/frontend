export const locales = ["en", "pl", "ru"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "EN",
  pl: "PL",
  ru: "RU",
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

/** Locale-aware path that respects GitHub Pages basePath. */
export function localeHref(locale: Locale, hash = ""): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") || "";
  const path = `${base}/${locale}/`;
  return hash ? `${path}${hash}` : path;
}

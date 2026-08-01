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

function basePrefix(): string {
  return process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") || "";
}

/** Locale-aware path that respects GitHub Pages basePath. */
export function localeHref(locale: Locale, hash = ""): string {
  const path = `${basePrefix()}/${locale}/`;
  return hash ? `${path}${hash}` : path;
}

/** Locale path with optional subpath, e.g. localePath('en', 'offer/minecraft'). */
export function localePath(locale: Locale, subpath = ""): string {
  const clean = subpath.replace(/^\/+|\/+$/g, "");
  if (!clean) return localeHref(locale);
  return `${basePrefix()}/${locale}/${clean}/`;
}

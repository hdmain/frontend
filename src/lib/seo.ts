import { locales, type Locale } from "@/i18n/config";

export const SITE_URL = "https://alfahost.eu";
export const SITE_NAME = "AlfaHost";

export const OG_IMAGE = `${SITE_URL}/og-image.jpg`;
export const OG_IMAGE_FALLBACK = `${SITE_URL}/icon-512.png`;

const ogLocaleMap: Record<Locale, string> = {
  en: "en_US",
  pl: "pl_PL",
  ru: "ru_RU",
};

const hreflangMap: Record<Locale, string> = {
  en: "en",
  pl: "pl",
  ru: "ru",
};

export function ogLocale(locale: Locale): string {
  return ogLocaleMap[locale];
}

export function hreflang(locale: Locale): string {
  return hreflangMap[locale];
}

export function canonicalForLocale(locale: Locale, subpath = ""): string {
  const clean = subpath.replace(/^\/+|\/+$/g, "");
  const suffix = clean ? `/${clean}/` : "/";
  return `${SITE_URL}/${locale}${suffix}`;
}

export function alternatesForLocale(
  locale: Locale,
  subpath = "",
): Record<string, string> {
  const entries: Record<string, string> = {};
  for (const l of locales) {
    entries[hreflang(l)] = canonicalForLocale(l as Locale, subpath);
  }
  entries["x-default"] = `${SITE_URL}/en/${subpath ? `${subpath.replace(/^\/+|\/+$/g, "")}/` : ""}`;
  return entries;
}

export function absoluteUrl(path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${clean}`;
}

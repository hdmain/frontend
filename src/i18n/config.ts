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

/** Map a BCP-47 tag (e.g. pl-PL, ru-RU, en-US) to a supported locale. */
export function localeFromTag(tag: string): Locale | null {
  const primary = tag.trim().toLowerCase().split("-")[0];
  if (primary === "pl") return "pl";
  if (primary === "ru") return "ru";
  if (primary === "en") return "en";
  return null;
}

/**
 * Pick locale from browser language preferences.
 * Works in the browser only — falls back to defaultLocale on server.
 */
export function detectBrowserLocale(
  languages: readonly string[] = [],
): Locale {
  for (const tag of languages) {
    const match = localeFromTag(tag);
    if (match) return match;
  }
  return defaultLocale;
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

export const comingSoonSubpath = "coming-soon";

export function comingSoonPath(locale: Locale): string {
  return localePath(locale, comingSoonSubpath);
}

/** When not `live`, show launch notice and route orders/panel to coming-soon. */
export function isComingSoon(): boolean {
  return (process.env.NEXT_PUBLIC_LAUNCH_MODE ?? "coming_soon") !== "live";
}

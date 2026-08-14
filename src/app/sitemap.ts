import type { MetadataRoute } from "next";
import { locales, type Locale } from "@/i18n/config";
import { planSlugs } from "@/i18n/dictionaries";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

const langs: Record<Locale, string> = {
  en: "en",
  pl: "pl",
  ru: "ru",
};

function langAlternates(subpath: string): Record<string, string> {
  const map: Record<string, string> = {};
  for (const l of locales) {
    map[langs[l as Locale]] = `${SITE_URL}/${l}/${subpath}`;
  }
  map["x-default"] = `${SITE_URL}/en/${subpath}`;
  return map;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const raw of locales) {
    const locale = raw as Locale;
    const subpath = "";
    entries.push({
      url: `${SITE_URL}/${locale}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: locale === "en" ? 1 : 0.9,
      alternates: { languages: langAlternates(subpath) },
    });

    for (const slug of planSlugs) {
      entries.push({
        url: `${SITE_URL}/${locale}/offer/${slug}/`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: { languages: langAlternates(`offer/${slug}`) },
      });
    }
  }

  return entries;
}

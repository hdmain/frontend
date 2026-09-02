import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ComingSoonContent from "@/components/ComingSoonContent";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { comingSoonSubpath, isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import {
  SITE_NAME,
  alternatesForLocale,
  canonicalForLocale,
  ogLocale,
} from "@/lib/seo";
import styles from "../../page.module.css";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const t = getDictionary(locale).comingSoon;
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: {
      canonical: canonicalForLocale(locale, comingSoonSubpath),
      languages: alternatesForLocale(locale, comingSoonSubpath),
    },
    openGraph: {
      type: "website",
      locale: ogLocale(locale),
      siteName: SITE_NAME,
      title: t.metaTitle,
      description: t.metaDescription,
    },
    robots: { index: false, follow: true },
  };
}

export default async function ComingSoonPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const t = getDictionary(locale);

  return (
    <div className={styles.page}>
      <SiteHeader
        locale={locale}
        t={t.nav}
        bannerT={t.banner}
        path={comingSoonSubpath}
      />
      <main>
        <ComingSoonContent locale={locale} t={t.comingSoon} />
      </main>
      <SiteFooter locale={locale} t={t.footer} />
    </div>
  );
}

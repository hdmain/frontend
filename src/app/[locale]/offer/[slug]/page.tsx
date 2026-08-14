import type { Metadata } from "next";
import { notFound } from "next/navigation";
import OfferDetail from "@/components/OfferDetail";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { isLocale, locales, type Locale } from "@/i18n/config";
import {
  getDictionary,
  getPlan,
  planSlugs,
} from "@/i18n/dictionaries";
import {
  SITE_NAME,
  SITE_URL,
  alternatesForLocale,
  canonicalForLocale,
  ogLocale,
} from "@/lib/seo";
import styles from "../../../page.module.css";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    planSlugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) return {};
  const plan = getPlan(raw, slug);
  if (!plan) return {};
  const locale = raw as Locale;
  const subpath = `offer/${slug}`;
  return {
    title: `${plan.name} hosting - AlfaHost`,
    description: plan.summary,
    alternates: {
      canonical: canonicalForLocale(locale, subpath),
      languages: alternatesForLocale(locale, subpath),
    },
    openGraph: {
      type: "website",
      locale: ogLocale(locale),
      siteName: SITE_NAME,
      title: `${plan.name} hosting - AlfaHost`,
      description: plan.summary,
      images: [`${SITE_URL}/icon-512.png`],
    },
  };
}

export default async function OfferPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const plan = getPlan(locale, slug);
  if (!plan) notFound();

  const t = getDictionary(locale);
  const others = t.offer.plans.filter((p) => p.slug !== plan.slug).slice(0, 3);

  return (
    <div className={styles.page}>
      <SiteHeader locale={locale} t={t.nav} path={`offer/${slug}`} />
      <main>
        <OfferDetail
          locale={locale}
          t={t.offer}
          plan={plan}
          others={others}
        />
      </main>
      <SiteFooter locale={locale} t={t.footer} />
    </div>
  );
}

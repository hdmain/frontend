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
  return {
    title: `${plan.name} — AlfaHost`,
    description: plan.summary,
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

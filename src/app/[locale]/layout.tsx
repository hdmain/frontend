import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HtmlLang from "@/components/HtmlLang";
import {
  defaultLocale,
  isLocale,
  locales,
  type Locale,
} from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import {
  SITE_NAME,
  SITE_URL,
  alternatesForLocale,
  canonicalForLocale,
  ogLocale,
} from "@/lib/seo";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : defaultLocale;
  const t = getDictionary(locale);
  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: canonicalForLocale(locale),
      languages: alternatesForLocale(locale),
    },
    openGraph: {
      type: "website",
      url: canonicalForLocale(locale),
      locale: ogLocale(locale),
      siteName: SITE_NAME,
      title: t.meta.title,
      description: t.meta.description,
      images: [`${SITE_URL}/icon-512.png`],
    },
    twitter: {
      card: "summary",
      title: t.meta.title,
      description: t.meta.description,
      images: [`${SITE_URL}/icon-512.png`],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  return (
    <>
      <HtmlLang locale={locale} />
      {children}
    </>
  );
}

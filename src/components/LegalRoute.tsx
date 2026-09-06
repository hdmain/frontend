import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LegalDocumentView from "@/components/LegalDocumentView";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getLegalDocument, type LegalDocId } from "@/lib/legal";
import {
  SITE_NAME,
  alternatesForLocale,
  canonicalForLocale,
  ogLocale,
} from "@/lib/seo";
import styles from "../app/page.module.css";

export async function legalMetadata(
  localeRaw: string,
  docId: LegalDocId,
): Promise<Metadata> {
  if (!isLocale(localeRaw)) return {};
  const locale = localeRaw as Locale;
  const doc = getLegalDocument(locale, docId);
  return {
    title: doc.metaTitle,
    description: doc.metaDescription,
    alternates: {
      canonical: canonicalForLocale(locale, docId),
      languages: alternatesForLocale(locale, docId),
    },
    openGraph: {
      type: "website",
      locale: ogLocale(locale),
      siteName: SITE_NAME,
      title: doc.metaTitle,
      description: doc.metaDescription,
    },
  };
}

export default async function LegalRoute({
  params,
  docId,
}: {
  params: Promise<{ locale: string }>;
  docId: LegalDocId;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const t = getDictionary(locale);
  const doc = getLegalDocument(locale, docId);

  return (
    <div className={styles.page}>
      <SiteHeader locale={locale} t={t.nav} path={docId} />
      <main className="container">
        <LegalDocumentView doc={doc} updatedLabel={t.legal.updated} />
      </main>
      <SiteFooter locale={locale} t={t.footer} launchT={t.launch} />
    </div>
  );
}

import type { Metadata } from "next";
import LegalRoute, { legalMetadata } from "@/components/LegalRoute";
import { locales } from "@/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return legalMetadata(locale, "terms");
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return <LegalRoute params={params} docId="terms" />;
}

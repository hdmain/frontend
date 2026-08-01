import { notFound } from "next/navigation";
import Faq from "@/components/Faq";
import Hero from "@/components/Hero";
import Offer from "@/components/Offer";
import Protection from "@/components/Protection";
import Services from "@/components/Services";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import WhyUs from "@/components/WhyUs";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import styles from "../page.module.css";

export default async function HomePage({
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
      <SiteHeader locale={locale} t={t.nav} />
      <main>
        <Hero t={t.hero} />
        <div className={styles.stack}>
          <WhyUs t={t.why} />
          <Services t={t.services} />
          <Offer t={t.offer} />
          <Protection t={t.protection} />
          <Faq t={t.faq} />
        </div>
      </main>
      <SiteFooter t={t.footer} />
    </div>
  );
}

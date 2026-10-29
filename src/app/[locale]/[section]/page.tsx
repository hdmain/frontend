import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageIntro from "@/components/PageIntro";
import Offer from "@/components/Offer";
import OfferDetail from "@/components/OfferDetail";
import WhyUs from "@/components/WhyUs";
import Protection from "@/components/Protection";
import Faq from "@/components/Faq";
import TechnologyMarquee from "@/components/TechnologyMarquee";
import InfrastructureGallery from "@/components/InfrastructureGallery";
import ContactChannels from "@/components/ContactChannels";
import { contactCopy } from "@/lib/contact";
import { isLocale, localeHref, localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { isSiteSection, navigationCopy, serviceNavigationCopy, serverLocationCopy, siteSections, type SiteSection } from "@/lib/siteNavigation";
import { alternatesForLocale, canonicalForLocale, ogLocale, SITE_NAME } from "@/lib/seo";
import styles from "../../page.module.css";

export const dynamicParams = false;
export function generateStaticParams() { return siteSections.map((section) => ({ section })); }

function pageContent(locale: Locale, section: SiteSection) {
  const t = getDictionary(locale);
  const n = navigationCopy[locale];
  if (section === "contact") return { title: contactCopy[locale].title, lead: contactCopy[locale].lead, image: "/media/hero-dc.jpg" };
  if (section === "hosting") return { title: serviceNavigationCopy[locale].catalog, lead: t.services.lead, image: "/media/hero-dc.jpg" };
  const plan = t.offer.plans.find((item) => item.slug === (section === "nat-vps" ? "vps-nat" : "vps"))!;
  if (section === "game-servers") return { title: n.games, lead: t.services.items[0].desc, image: "/offers/minecraft.jpg", points: t.services.items[0].points };
  if (section === "vps" || section === "nat-vps") return { title: plan.name, lead: plan.description, image: `/offers/${plan.slug}.jpg`, points: plan.highlights };
  if (section === "infrastructure") return { title: n.infrastructure, lead: t.why.lead, image: "/media/atman/waw1-181.jpg" };
  if (section === "ddos-protection") return { title: t.nav.antiddos, lead: t.protection.lead, image: "/media/hero-dc.jpg" };
  return { title: n.helpTitle, lead: t.faq.lead, image: "/media/hero-dc.jpg" };
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; section: string }> }): Promise<Metadata> {
  const { locale, section } = await params;
  if (!isLocale(locale) || !isSiteSection(section)) return {};
  const content = pageContent(locale, section);
  return { title: `${content.title} | ${SITE_NAME}`, description: content.lead, alternates: { canonical: canonicalForLocale(locale, section), languages: alternatesForLocale(locale, section) }, openGraph: { title: `${content.title} | ${SITE_NAME}`, description: content.lead, url: canonicalForLocale(locale, section), locale: ogLocale(locale), images: ["/icon-512.png"] } };
}

export default async function SectionPage({ params }: { params: Promise<{ locale: string; section: string }> }) {
  const { locale, section } = await params;
  if (!isLocale(locale) || !isSiteSection(section)) notFound();
  const t = getDictionary(locale);
  const n = navigationCopy[locale];
  const content = pageContent(locale, section);
  const plan = t.offer.plans.find((item) => item.slug === (section === "nat-vps" ? "vps-nat" : "vps"))!;
  const product = section === "hosting" || section === "game-servers" || section === "nat-vps" || section === "vps";
  const gameOffer = { ...t.offer, title: n.chooseGame, lead: n.gamesDesc, plans: t.offer.plans.filter((item) => ["minecraft", "rust", "palworld", "discord"].includes(item.slug)) };

  return (
    <div className={styles.page}>
      <SiteHeader locale={locale} t={t.nav} path={section} />
      <main>
        <PageIntro {...content} back={section === "game-servers" ? { href: localeHref(locale, "#services"), label: serviceNavigationCopy[locale].back } : undefined} location={product || section === "infrastructure" ? serverLocationCopy[locale] : undefined} status={section === "vps" && plan.available === false ? t.offer.unavailable : undefined} action={product ? { href: "#offer", label: section === "game-servers" ? n.chooseGame : section === "hosting" ? serviceNavigationCopy[locale].viewAll : n.configurations } : undefined} />
        {section === "hosting" && <Offer locale={locale} t={t.offer} />}
        {section === "contact" && <ContactChannels locale={locale} />}
        {section === "game-servers" && <Offer locale={locale} t={gameOffer} />}
        {(section === "nat-vps" || section === "vps") && <OfferDetail locale={locale} t={t.offer} plan={plan} others={[]} showHero={false} />}
        {(section === "nat-vps" || section === "vps") && <section className={`container ${styles.productDetails}`}><div><h2 className="sectionTitle">{t.offer.includesTitle}</h2><p className="sectionLead">{plan.idealFor}</p></div><ul>{plan.includes.map((item) => <li key={item}>{item}</li>)}</ul></section>}
        {section === "game-servers" && <Protection t={t.protection} />}
        {section === "infrastructure" && <><InfrastructureGallery locale={locale} /><WhyUs t={t.why} /><TechnologyMarquee locale={locale} /></>}
        {section === "ddos-protection" && <Protection t={t.protection} />}
        {(product || section === "faq") && <Faq t={t.faq} />}
        {section === "faq" && <div className={`container ${styles.pageActions}`}><a href="mailto:support@alfahost.eu" className="btn btnPrimary">{t.nav.contact}</a><a href="https://docs.alfahost.eu/" className="btn btnGhost">{t.footer.docs}</a></div>}
        {section === "infrastructure" && <div className={`container ${styles.pageActions}`}><a href={localePath(locale, "ddos-protection")} className="btn btnGhost">{t.nav.antiddos}</a></div>}
      </main>
      <SiteFooter locale={locale} t={t.footer} />
    </div>
  );
}

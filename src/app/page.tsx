import Script from "next/script";
import Faq from "@/components/Faq";
import Hero from "@/components/Hero";
import Offer from "@/components/Offer";
import Protection from "@/components/Protection";
import Services from "@/components/Services";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import WhyUs from "@/components/WhyUs";
import { localeHref } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { SITE_NAME, alternatesForLocale } from "@/lib/seo";
import styles from "./page.module.css";

export const dynamic = "force-static";

export const metadata = {
  title: `${SITE_NAME} — VPS, Game Servers & Anti-DDoS Hosting`,
  description:
    "Fast VPS, game servers and dedicated machines with DDoS protection included on every plan. EU nodes, modern hardware and always-on filtering.",
  alternates: {
    canonical: "/",
    languages: alternatesForLocale("en"),
  },
};

export default function RootPage() {
  const t = getDictionary("en");

  return (
    <div className={styles.page}>
      <SiteHeader locale="en" t={t.nav} />
      <main>
        <Hero t={t.hero} />
        <div className={styles.stack}>
          <WhyUs t={t.why} />
          <Services t={t.services} />
          <Offer locale="en" t={t.offer} />
          <Protection t={t.protection} />
          <Faq t={t.faq} />
        </div>
      </main>
      <SiteFooter locale="en" t={t.footer} />

      <Script
        id="faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: t.faq.items.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          }),
        }}
      />

      <Script
        id="locale-redirect"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(){
            try{
              var prefs=(navigator.languages&&navigator.languages.length)?navigator.languages:[navigator.language];
              for(var i=0;i<prefs.length;i++){
                var p=(prefs[i]||"").toLowerCase().split("-")[0];
                if(p==="pl"){location.replace("${localeHref("pl")}");return;}
                if(p==="ru"){location.replace("${localeHref("ru")}");return;}
                if(p==="en")return; // first preference is English -> stay on / (already English)
              }
            }catch(e){}
          })();`,
        }}
      />
    </div>
  );
}

import type { Metadata } from "next";
import Script from "next/script";
import { defaultLocale, localeHref, locales } from "@/i18n/config";
import { SITE_NAME, SITE_URL, alternatesForLocale } from "@/lib/seo";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: `${SITE_NAME} — VPS, Game Servers & Anti-DDoS Hosting`,
  description:
    "Fast VPS, game servers and dedicated machines with DDoS protection included on every plan. Choose your language: English, Polski, Русский.",
  alternates: {
    canonical: "/",
    languages: alternatesForLocale(defaultLocale),
  },
};

export function generateStaticParams() {
  return [];
}

const title = "AlfaHost.eu — VPS, Game Servers & Anti-DDoS hosting";

export default function RootPage() {
  return (
    <main
      style={{
        minHeight: "100svh",
        display: "grid",
        placeItems: "center",
        textAlign: "center",
        color: "var(--text)",
        background: "var(--void)",
        padding: "2rem",
      }}
    >
      <section aria-label="Language selection">
        <h1>{title}</h1>
        <p
          style={{
            color: "var(--muted)",
            margin: "1rem 0 2rem",
            maxWidth: "34rem",
          }}
        >
          Fast VPS, game servers and dedicated machines with DDoS protection on
          every plan. Select your language.
        </p>
        <nav aria-label="Choose language" style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          {locales.map((l) => (
            <a
              key={l}
              href={localeHref(l)}
              style={{
                display: "inline-block",
                padding: "0.6rem 1.2rem",
                border: "1px solid rgba(242,242,242,0.2)",
                color: "var(--text)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                fontWeight: 600,
              }}
            >
              {l === "pl" ? "Polski" : l === "ru" ? "Русский" : "English"}
            </a>
          ))}
        </nav>
      </section>

      <Script
        id="locale-redirect"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(){
            try{
              var prefs=(navigator.languages&&navigator.languages.length)?navigator.languages:[navigator.language];
              var target=null;
              for(var i=0;i<prefs.length;i++){
                var p=(prefs[i]||"").toLowerCase().split("-")[0];
                if(p==="pl"){target="${localeHref("pl")}";break;}
                if(p==="ru"){target="${localeHref("ru")}";break;}
                if(p==="en"){target="${localeHref("en")}";break;}
              }
              if(target)location.replace(target);
            }catch(e){}
          })();`,
        }}
      />
    </main>
  );
}

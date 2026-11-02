import type { Locale } from "@/i18n/config";
import styles from "./LocationFlags.module.css";

type Country = "pl" | "de" | "nl" | "eu";
const names: Record<Locale, Record<Country, string>> = {
  pl: { pl: "Polska", de: "Niemcy", nl: "Holandia", eu: "Unia Europejska" },
  en: { pl: "Poland", de: "Germany", nl: "The Netherlands", eu: "European Union" },
  ru: { pl: "Польша", de: "Германия", nl: "Нидерланды", eu: "Европейский союз" },
};

export default function LocationFlags({ location, locale }: { location: string; locale: Locale }) {
  const countries: Country[] = location === "vps" ? ["de", "nl"]
    : location === "vps-kvm-de" ? ["de"]
    : location === "vps-kvm-nl" ? ["nl"]
    : location === "dedicated" || location === "offer/dedicated" ? ["eu"] : ["pl"];

  return <span className={styles.flags}>{countries.map((country) => (
    <svg key={country} className={styles.flag} viewBox="0 0 30 20" role="img" aria-label={names[locale][country]}>
      <title>{names[locale][country]}</title>
      {country === "pl" ? <><path fill="#fff" d="M0 0h30v10H0z" /><path fill="#dc143c" d="M0 10h30v10H0z" /></>
        : country === "de" ? <><path fill="#171717" d="M0 0h30v7H0z" /><path fill="#d00" d="M0 7h30v6H0z" /><path fill="#ffce00" d="M0 13h30v7H0z" /></>
        : country === "nl" ? <><path fill="#ae1c28" d="M0 0h30v7H0z" /><path fill="#fff" d="M0 7h30v6H0z" /><path fill="#21468b" d="M0 13h30v7H0z" /></>
        : <><path fill="#003399" d="M0 0h30v20H0z" />{Array.from({ length: 12 }, (_, i) => {
          const angle = i * Math.PI / 6;
          return <path key={i} fill="#fc0" d="M0-1.2 .27-.37 1.14-.37 .44.14 .71.97 0 .46-.71.97-.44.14-1.14-.37-.27-.37Z" transform={`translate(${15 + 6 * Math.sin(angle)} ${10 - 6 * Math.cos(angle)})`} />;
        })}</>}
    </svg>
  ))}</span>;
}

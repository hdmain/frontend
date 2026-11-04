import Image from "next/image";
import type { Locale } from "@/i18n/config";
import { asset } from "@/lib/basePath";
import styles from "./BrandAssets.module.css";
import additionalAssets from "@/lib/brand-assets.json";

const categoryLabels = {
  pl: ["Hosted by", "Serwer działa na", "Materiały dla partnerów", "Grafiki ofertowe", "Szablony postów", "Discord", "Podgląd linku"],
  en: ["Hosted by", "Server runs on", "Partner graphics", "Offer graphics", "Post templates", "Discord", "Link preview"],
  ru: ["Hosted by", "Сервер работает на", "Материалы для партнёров", "Графика предложений", "Шаблоны публикаций", "Discord", "Превью ссылки"],
};

export const brandCopy = {
  pl: { title: "Materiały marki", lead: "Oficjalne oznaczenia AlfaHost do Twojej strony i projektów. Wybierz wariant lub pobierz całą paczkę.", download: "Pobierz całą paczkę ZIP" },
  en: { title: "Brand assets", lead: "Official AlfaHost badges for your website and projects. Choose a variant or download the complete pack.", download: "Download complete ZIP pack" },
  ru: { title: "Материалы бренда", lead: "Официальные обозначения AlfaHost для вашего сайта и проектов. Выберите вариант или скачайте весь набор.", download: "Скачать весь набор ZIP" },
};

export default function BrandAssets({ locale }: { locale: Locale }) {
  const t = brandCopy[locale];
  return <section className={`container ${styles.section}`}>
    <a className="btn btnPrimary" href={asset("/brand-assets/ALFAHOST-Brand-Assets.zip")} download>{t.download}</a>
    {Object.entries(additionalAssets).map(([group, items], index) => <div key={group} className={styles.group}>
      <h2>{categoryLabels[locale][index]}</h2>
      <div className={styles.grid}>{items.map(({ name, path }) => <article className={styles.card} key={path}>
        <div className={`${styles.preview} ${name.endsWith("light") || name.endsWith("black") ? styles.light : styles.dark}`}>
          <Image src={asset(`${path}.png`)} alt={`AlfaHost - ${name}`} width={600} height={600} className={styles.artwork} />
        </div>
        <div className={styles.caption}><h3>{name}</h3><div><a href={asset(`${path}.svg`)} download>SVG ↓</a><a href={asset(`${path}.png`)} download>PNG ↓</a></div></div>
      </article>)}</div>
    </div>)}
    {["powered-by", "power-by"].map((group) => <div key={group} className={styles.group}>
      <h2>{group === "powered-by" ? "Powered by AlfaHost" : "Power by AlfaHost"}</h2>
      <div className={styles.grid}>{["dark", "light", "transparent-black", "transparent-white"].map((variant) => {
        const path = `/brand-assets/${group}/alfahost-${variant}`;
        return <article className={styles.card} key={variant}>
          <div className={`${styles.preview} ${variant === "light" || variant === "transparent-black" ? styles.light : styles.dark}`}><Image src={asset(`${path}.png`)} alt={`${group} AlfaHost - ${variant}`} width={600} height={200} /></div>
          <div className={styles.caption}><h3>{variant}</h3><div><a href={asset(`${path}.svg`)} download>SVG ↓</a><a href={asset(`${path}.png`)} download>PNG ↓</a></div></div>
        </article>;
      })}</div>
    </div>)}
  </section>;
}

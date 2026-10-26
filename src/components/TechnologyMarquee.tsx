import Image from "next/image";
import type { Locale } from "@/i18n/config";
import { asset } from "@/lib/basePath";
import styles from "./TechnologyMarquee.module.css";

const copy = {
  en: { title: "Built with" },
  pl: { title: "Korzystamy z" },
  ru: { title: "Мы используем" },
};

// Hardware, protection and OS brands already documented in the hosting catalog.
const brands = [
  { name: "Intel", src: "/brands/intel.svg", wordmark: true },
  { name: "AMD", src: "/brands/amd.svg", wordmark: true },
  { name: "PletX", src: "/media/pletx-icon.png", wordmark: false },
  { name: "Docker", src: "/brands/docker.svg", wordmark: false },
  { name: "Node.js", src: "/brands/nodedotjs.svg", wordmark: false },
  { name: "Python", src: "/brands/python.svg", wordmark: false },
  { name: "Linux", src: "/brands/linux.svg", wordmark: false },
  { name: "Ubuntu", src: "/brands/ubuntu.svg", wordmark: false },
  { name: "Debian", src: "/brands/debian.svg", wordmark: false },
];

export default function TechnologyMarquee({ locale }: { locale: Locale }) {
  const t = copy[locale];

  return (
    <section className={styles.section} id="technologies" aria-labelledby="technology-title">
      <div className="container">
        <div className={styles.heading}>
          <h2 id="technology-title">{t.title}</h2>
        </div>
        <div className={styles.viewport} tabIndex={0} role="group" aria-labelledby="technology-title">
          <div id="technology-track" className={styles.track}>
            {[0, 1, 2].map((copyIndex) => (
              <ul key={copyIndex} className={styles.group} aria-hidden={copyIndex > 0 ? true : undefined}>
                {brands.map((brand) => (
                  <li key={brand.name} className={styles.brand}>
                    <Image src={asset(brand.src)} alt={brand.wordmark ? brand.name : ""} width={brand.wordmark ? 100 : 30} height={34} className={brand.wordmark ? styles.wordmark : `${styles.icon} ${brand.name === "PletX" ? styles.pletx : ""}`} />
                    {!brand.wordmark && <span>{brand.name}</span>}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

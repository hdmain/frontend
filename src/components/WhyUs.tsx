import type { Dictionary } from "@/i18n/dictionaries";
import styles from "./WhyUs.module.css";

type Props = { t: Dictionary["why"] };

export default function WhyUs({ t }: Props) {
  return (
    <section className={styles.section} id="why">
      <div className={`container ${styles.layout}`}>
        <header className={styles.head}>
          <span className="eyebrow">{t.eyebrow}</span>
          <h2 className="sectionTitle">
            {t.titleBefore} <span className={styles.brand}>{t.titleBrand}</span>
          </h2>
          <p className="sectionLead">{t.lead}</p>
        </header>

        <ol className={styles.list}>
          {t.items.map((item) => (
            <li key={item.value} className={styles.item}>
              <p className={styles.value}>{item.value}</p>
              <div>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

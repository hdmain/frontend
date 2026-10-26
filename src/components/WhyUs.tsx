import type { Dictionary } from "@/i18n/dictionaries";
import SpotlightCard from "./effects/SpotlightCard";
import styles from "./WhyUs.module.css";

type Props = { t: Dictionary["why"] };

export default function WhyUs({ t }: Props) {
  return (
    <section className={styles.section} id="why">
      <div className="container">
        <header className={styles.head}>
          <h2 className="sectionTitle">
            {t.titleBefore} <span className={styles.brand}>{t.titleBrand}</span>
          </h2>
          <p className="sectionLead">{t.lead}</p>
        </header>

        <ol className={styles.grid}>
          {t.items.map((item) => (
            <li key={item.value}>
              <SpotlightCard className={styles.item}>
                <p className={styles.value}>{item.value}</p>
                <h3>{item.title}</h3>
                <p className={styles.copy}>{item.copy}</p>
              </SpotlightCard>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

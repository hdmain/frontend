import type { Dictionary } from "@/i18n/dictionaries";
import { Gamepad2, Server } from "lucide-react";
import { asset } from "@/lib/basePath";
import SpotlightCard from "./effects/SpotlightCard";
import { Icons } from "./Icons";
import styles from "./Services.module.css";

type Props = { t: Dictionary["services"] };

export default function Services({ t }: Props) {
  return (
    <section className={styles.section} id="services">
      <div className="container">
        <header className={styles.head}>
          <h2 className="sectionTitle">{t.title}</h2>
          <p className="sectionLead">{t.lead}</p>
        </header>

        <div className={styles.stack}>
          {t.items.map((service, i) => (
            <SpotlightCard key={service.title} className={styles.card}>
              <div className={styles.visual} style={{ backgroundImage: `url(${asset(i === 0 ? "/offers/minecraft.jpg" : "/media/hero-dc.jpg")})` }} aria-hidden="true">
                {i === 0 ? <Gamepad2 size={32} strokeWidth={1.25} /> : <Server size={32} strokeWidth={1.25} />}
              </div>
              <div className={styles.meta}>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
              </div>
              <ul className={styles.points}>
                {service.points.map((point) => (
                  <li key={point}>
                    <span aria-hidden>{Icons.check}</span>
                    {point}
                  </li>
                ))}
              </ul>
              <a className="btn btnGhost" href="#offer">
                {t.learnMore} {Icons.arrow}
              </a>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}

import type { Dictionary } from "@/i18n/dictionaries";
import { getDictionary } from "@/i18n/dictionaries";
import { Gamepad2, Network, ArrowUpRight } from "lucide-react";
import { asset } from "@/lib/basePath";
import { localePath, type Locale } from "@/i18n/config";
import { serviceNavigationCopy } from "@/lib/siteNavigation";
import SpotlightCard from "./effects/SpotlightCard";
import ServicePrice from "./ServicePrice";
import { Icons } from "./Icons";
import styles from "./Services.module.css";

type Props = { t: Dictionary["services"]; locale?: Locale };

export default function Services({ t, locale = "en" }: Props) {
  const offer = getDictionary(locale).offer;
  const nat = offer.plans.find((plan) => plan.slug === "vps-nat")!;
  const games = offer.plans.filter((plan) => ["minecraft", "rust", "palworld", "discord"].includes(plan.slug) && (plan.available ?? true));
  const services = t.items.map((service, index) => index === 1 ? { ...service, title: nat.name, desc: nat.summary, points: nat.highlights.slice(0, 4) } : service);
  return (
    <section className={styles.section} id="services">
      <div className="container">
        <header className={styles.head}>
          <div><h2 className="sectionTitle">{t.title}</h2><p className="sectionLead">{t.lead}</p></div>
          <a className={`btn btnGhost ${styles.viewAll}`} href={localePath(locale, "hosting")}>{serviceNavigationCopy[locale].viewAll}<ArrowUpRight size={16} aria-hidden="true" /></a>
        </header>

        <div className={styles.stack}>
          {services.map((service, i) => (
            <SpotlightCard key={service.title} className={styles.card}>
              <ServicePrice plans={i === 0 ? games : [nat]} from={offer.from} period={offer.perMonth} />
              <div className={styles.visual} style={{ backgroundImage: `url(${asset(i === 0 ? "/offers/minecraft.jpg" : "/offers/vps-nat.jpg")})` }} aria-hidden="true">
                {i === 0 ? <Gamepad2 size={32} strokeWidth={1.25} /> : <Network size={32} strokeWidth={1.25} />}
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
              <a className="btn btnGhost" href={localePath(locale, i === 0 ? "game-servers" : "nat-vps")}>
                {t.learnMore} {Icons.arrow}
              </a>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}

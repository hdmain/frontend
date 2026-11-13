import type { Dictionary } from "@/i18n/dictionaries";
import { getDictionary } from "@/i18n/dictionaries";
import { Gamepad2, Network, Server, ArrowUpRight } from "lucide-react";
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
  const kvm = offer.plans.filter((plan) => plan.slug.startsWith("vps-kvm-") && (plan.available ?? true));
  const kvmCopy = {
    pl: { title: "VPS KVM", desc: "Serwery wirtualne w Polsce, Niemczech i Holandii. Dobierz zasoby oraz system do swoich aplikacji.", points: ["Wirtualizacja KVM", "Pełny dostęp administracyjny", "Publiczne IPv4", "Dyski SSD"] },
    en: { title: "KVM VPS", desc: "Virtual servers in Poland, Germany and the Netherlands. Choose resources and an operating system for your applications.", points: ["KVM virtualisation", "Full administrative access", "Public IPv4", "SSD storage"] },
    ru: { title: "KVM VPS", desc: "Виртуальные серверы в Польше, Германии и Нидерландах. Выберите ресурсы и систему для ваших приложений.", points: ["Виртуализация KVM", "Полный административный доступ", "Публичный IPv4", "SSD-диски"] },
  }[locale];
  const services = [
    { ...t.items[0], plans: games, image: "/offers/minecraft.jpg", path: "game-servers", icon: Gamepad2 },
    { title: nat.name, desc: nat.summary, points: nat.highlights.slice(0, 4), plans: [nat], image: "/offers/vps-nat.jpg", path: "nat-vps", icon: Network },
    { ...kvmCopy, plans: kvm, image: "/offers/vps.jpg", path: "vps", icon: Server },
  ];
  return (
    <section className={styles.section} id="services">
      <div className="container">
        <header className={styles.head}>
          <div><h2 className="sectionTitle">{t.title}</h2><p className="sectionLead">{t.lead}</p></div>
          <a className={`btn btnGhost ${styles.viewAll}`} href={localePath(locale, "hosting")}>{serviceNavigationCopy[locale].viewAll}<ArrowUpRight size={16} aria-hidden="true" /></a>
        </header>

        <div className={styles.stack}>
          {services.map((service) => (
            <SpotlightCard key={service.title} className={styles.card}>
              <ServicePrice plans={service.plans} from={offer.from} period={offer.perMonth} />
              <div className={styles.visual} style={{ backgroundImage: `url(${asset(service.image)})` }} aria-hidden="true">
                <service.icon size={32} strokeWidth={1.25} />
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
              <a className="btn btnGhost" href={localePath(locale, service.path)}>
                {t.learnMore} {Icons.arrow}
              </a>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}

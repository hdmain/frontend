import { ArrowUpRight, Mail, MessageCircle, Settings2 } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { contactCopy } from "@/lib/contact";
import styles from "./ContactChannels.module.css";

export default function ContactChannels({ locale }: { locale: Locale }) {
  const t = contactCopy[locale];
  const channels = [
    { title: t.support, description: t.supportDesc, label: "support@alfahost.eu", href: "mailto:support@alfahost.eu", icon: Mail },
    { title: t.admin, description: t.adminDesc, label: "admin@alfahost.eu", href: "mailto:admin@alfahost.eu", icon: Settings2 },
    { title: t.discord, description: t.discordDesc, label: t.join, href: "https://dc.alfahost.eu", icon: MessageCircle },
  ];
  return (
    <section className={`container ${styles.section}`} aria-label={t.title}>
      <div className={styles.grid}>
        {channels.map(({ title, description, label, href, icon: Icon }) => (
          <a key={href} href={href} className={styles.card} {...(href.startsWith("https:") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
            <Icon className={styles.icon} size={26} strokeWidth={1.5} aria-hidden="true" />
            <h2>{title}</h2>
            <p>{description}</p>
            <span>{label}<ArrowUpRight size={17} aria-hidden="true" /></span>
          </a>
        ))}
      </div>
      <div className={styles.resources}>
        <h2>{t.resources}</h2>
        <div>
          {[
            { label: t.docs, href: "https://docs.alfahost.eu/" },
            { label: t.status, href: "https://alfahosteu.instatus.com/" },
            { label: t.panel, href: "https://cp.alfahost.eu/" },
          ].map(({ label, href }) => <a key={href} href={href} target="_blank" rel="noopener noreferrer">{label}<ArrowUpRight size={16} aria-hidden="true" /></a>)}
        </div>
      </div>
    </section>
  );
}

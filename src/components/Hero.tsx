import Image from "next/image";
import { ArrowDown, ArrowUpRight, ShieldCheck, Zap, Activity } from "lucide-react";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { asset } from "@/lib/basePath";
import { Button } from "./ui/button";
import styles from "./Hero.module.css";

type Props = { t: Dictionary["hero"]; locale: Locale };

export default function Hero({ t, locale }: Props) {
  const words = t.phrases[0].split(" ");
  const last = words.pop();
  const icons = [Activity, ShieldCheck, Zap];
  return (
    <section className={styles.hero} id="top">
      <div className={styles.scene} aria-hidden="true">
        <Image src={asset("/media/hero-dc.jpg")} alt="" fill priority sizes="(max-width: 700px) 100vw, 75vw" className={styles.image} />
        <div className={styles.light} />
      </div>
      <div className={`container ${styles.stage}`}>
        <div className={styles.copy}>
          <h1 className={styles.headline}>{words.join(" ")} <span>{last}</span></h1>
          <p className={styles.lede}>{t.lede}</p>
          <div className={styles.actions}>
            <Button render={<a href="#services" />} nativeButton={false} role="link" size="lg">{t.ctaOffer}<ArrowUpRight size={18} aria-hidden="true" /></Button>
            <Button render={<a href={localePath(locale, "contact")} />} nativeButton={false} role="link" size="lg" variant="outline">{t.ctaContact}<ArrowUpRight size={18} aria-hidden="true" /></Button>
          </div>
        </div>
        <a href="#why" className={styles.scroll} aria-label={t.positivesLabel}><ArrowDown size={18} /></a>
      </div>
      <div className={styles.benefitBar}>
        <ul className={`container ${styles.positives}`} aria-label={t.positivesLabel}>
          {t.positives.map((item, i) => {
            const Icon = icons[i % icons.length];
            return <li key={item.title}><Icon size={22} strokeWidth={1.5} aria-hidden="true" /><div><strong>{item.title}</strong><span>{item.copy}</span></div></li>;
          })}
        </ul>
      </div>
    </section>
  );
}

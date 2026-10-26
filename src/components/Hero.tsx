import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { asset } from "@/lib/basePath";
import { Icons } from "./Icons";
import styles from "./Hero.module.css";

type Props = {
  t: Dictionary["hero"];
  locale: Locale;
};

export default function Hero({ t }: Props) {
  return (
    <section className={styles.hero} id="top">
      <div
        className={styles.media}
        style={{ backgroundImage: `url(${asset("/media/hero-dc.jpg")})` }}
        aria-hidden
      />
      <div className={styles.scrim} aria-hidden />
      <div className={`container ${styles.copy}`}>
        <p className={styles.brand}>
          AlfaHost<span>.eu</span>
        </p>
        <h1 className={styles.headline}>{t.phrases[0]}</h1>
        <p className={styles.lede}>{t.lede}</p>
        <div className={styles.actions}>
          <a className="btn btnPrimary" href="#offer">
            {t.ctaOffer} {Icons.arrow}
          </a>
          <a className={`btn ${styles.ctaGhost}`} href="#contact">
            {t.ctaContact}
          </a>
        </div>
      </div>
    </section>
  );
}

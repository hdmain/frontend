"use client";

import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import AnimatedContent from "./AnimatedContent";
import BlurText from "./BlurText";
import DecryptedText from "./DecryptedText";
import LaunchPromo from "./LaunchPromo";
import Magnet from "./Magnet";
import { Icons } from "./Icons";
import Typewriter from "./Typewriter";
import styles from "./Hero.module.css";

type Props = {
  t: Dictionary["hero"];
  locale: Locale;
  launchPromo: Dictionary["launch"]["promo"];
};

export default function Hero({ t, locale, launchPromo }: Props) {
  return (
    <section className={styles.hero} id="top">
      <div className={styles.auroraWrap} aria-hidden />
      <div className={`container ${styles.layout}`}>
        <AnimatedContent
          className={styles.copy}
          distance={40}
          direction="vertical"
          duration={0.6}
          ease="power3.out"
        >
          <h1 className={styles.brand}>
            <DecryptedText
              text="AlfaHost"
              animateOn="view"
              sequential
              speed={40}
              className={styles.brandText}
              parentClassName={styles.brandText}
            />
            <span className={styles.brandShine}>.eu</span>
          </h1>
          <BlurText
            text={t.phrases[0]}
            className={styles.typed}
            animateBy="words"
            direction="top"
            delay={110}
          />
          <p className={styles.typedSub}>
            <Typewriter phrases={t.phrases.slice(1)} />
          </p>
          <p className={styles.lede}>{t.lede}</p>
          <LaunchPromo locale={locale} t={launchPromo} />
          <div className={styles.actions}>
            <Magnet padding={32} magnetStrength={3.5}>
              <a className="btn btnPrimary" href="#offer">
                {t.ctaOffer} {Icons.arrow}
              </a>
            </Magnet>
            <Magnet padding={32} magnetStrength={3.5}>
              <a className="btn btnGhost" href="#contact">
                {t.ctaContact}
              </a>
            </Magnet>
          </div>
        </AnimatedContent>

        <AnimatedContent
          className={styles.positives}
          distance={50}
          direction="horizontal"
          reverse
          delay={0.06}
          duration={0.65}
        >
          <aside aria-label={t.positivesLabel}>
            <p className={styles.positivesLabel}>{t.positivesLabel}</p>
            <ul className={styles.list}>
              {t.positives.map((item, i) => (
                <li key={item.title} className={styles.chip}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.copy}</p>
                  </div>
                </li>
              ))}
            </ul>
          </aside>
        </AnimatedContent>
      </div>
    </section>
  );
}

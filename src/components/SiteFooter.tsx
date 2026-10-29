import { localeHref, localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import WolfMark from "./WolfMark";
import PaymentMethods from "./PaymentMethods";
import TrustpilotWidget from "./TrustpilotWidget";
import styles from "./SiteFooter.module.css";

const DISCORD_URL = "https://dc.alfahost.eu";

type Props = {
  locale: Locale;
  t: Dictionary["footer"];
};

export default function SiteFooter({ locale, t }: Props) {
  return (
    <footer className={styles.footer} id="contact">
      <div className={`container ${styles.inner}`}>
        <div className={styles.brandCol}>
          <a href={localeHref(locale)} className={styles.brand}>
            <WolfMark className={styles.mark} />
            <span className={styles.word}>
              AlfaHost<span>.eu</span>
            </span>
          </a>
          <a className={styles.mail} href="mailto:support@alfahost.eu">
            support@alfahost.eu
          </a>
          <iframe
            className={styles.status}
            src="https://alfahosteu.instatus.com/embed-status/969df8a0/dark-md"
            title={locale === "pl" ? "Status usług AlfaHost" : locale === "ru" ? "Статус сервисов AlfaHost" : "AlfaHost service status"}
            width="238"
            height="61"
            scrolling="no"
            loading="lazy"
          />
          <div className={styles.trustbox}>
            <TrustpilotWidget />
          </div>
        </div>

        <div className={styles.cols}>
          <div>
            <h2>{t.products}</h2>
            <ul>
              <li>
                <a href={localePath(locale, "game-servers")}>{t.gameServers}</a>
              </li>
              <li>
                <a href={localePath(locale, "vps")}>{t.vps}</a>
              </li>
              <li>
                <a href={localePath(locale, "nat-vps")}>VPS NAT</a>
              </li>
              <li>
                <a href={localePath(locale, "ddos-protection")}>{t.antiddos}</a>
              </li>
            </ul>
          </div>
          <div>
            <h2>{t.company}</h2>
            <ul>
              <li>
                <a href={localePath(locale, "infrastructure")}>{t.why}</a>
              </li>
              <li>
                <a href={localePath(locale, "faq")}>{t.faq}</a>
              </li>
              <li>
                <a href="https://docs.alfahost.eu/">{t.docs}</a>
              </li>
              <li>
                <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer">
                  {t.discord}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2>{t.legal}</h2>
            <ul>
              <li>
                <a href={localePath(locale, "privacy")}>{t.privacy}</a>
              </li>
              <li>
                <a href={localePath(locale, "terms")}>{t.terms}</a>
              </li>
              <li>
                <a href={localePath(locale, "cookies")}>{t.cookies}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className={`container ${styles.wordmark}`} aria-hidden="true" data-motion-reveal>ALFAHOST<span>.</span></div>
      <div className={`container ${styles.bottom}`}>
        <PaymentMethods locale={locale} compact />
        <p>
          © {new Date().getFullYear()} AlfaHost · {t.rights}
        </p>
      </div>
    </footer>
  );
}

import { localeHref, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { Icons } from "./Icons";
import LaunchNotice from "./LaunchNotice";
import WolfMark from "./WolfMark";
import styles from "./SiteFooter.module.css";

const DISCORD_URL = "https://dc.alfahost.eu";

type Props = {
  locale: Locale;
  t: Dictionary["footer"];
  launchT: Dictionary["launch"];
};

export default function SiteFooter({ locale, t, launchT }: Props) {
  return (
    <footer className={styles.footer} id="contact">
      <div className={`container ${styles.inner}`}>
        <div className={styles.brandCol}>
          <a href={localeHref(locale)} className={styles.brand}>
            <WolfMark className={styles.mark} />
            <span>
              AlfaHost<span>.eu</span>
            </span>
          </a>
          <p>{t.about}</p>
          <LaunchNotice locale={locale} t={launchT} />
          <div className={styles.contacts}>
            <a className={styles.mail} href="mailto:support@alfahost.eu">
              support@alfahost.eu
            </a>
            <a
              className={styles.discord}
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              {Icons.discord}
              <span>dc.alfahost.eu</span>
            </a>
          </div>
        </div>

        <div className={styles.cols}>
          <div>
            <h2>{t.products}</h2>
            <ul>
              <li>
                <a href={localeHref(locale, "#offer")}>{t.gameServers}</a>
              </li>
              <li>
                <a href={localeHref(locale, "#offer")}>{t.vps}</a>
              </li>
              <li>
                <a href={localeHref(locale, "#offer")}>{t.dedicated}</a>
              </li>
              <li>
                <a href={localeHref(locale, "#protection")}>{t.antiddos}</a>
              </li>
            </ul>
          </div>
          <div>
            <h2>{t.company}</h2>
            <ul>
              <li>
                <a href={localeHref(locale, "#why")}>{t.why}</a>
              </li>
              <li>
                <a href={localeHref(locale, "#faq")}>{t.faq}</a>
              </li>
              <li>
                <a href="mailto:support@alfahost.eu">{t.contact}</a>
              </li>
              <li>
                <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer">
                  {t.discord}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>
          © {new Date().getFullYear()} AlfaHost · {t.rights}
        </p>
      </div>
    </footer>
  );
}

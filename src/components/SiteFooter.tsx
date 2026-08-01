import type { Dictionary } from "@/i18n/dictionaries";
import WolfMark from "./WolfMark";
import styles from "./SiteFooter.module.css";

type Props = { t: Dictionary["footer"] };

export default function SiteFooter({ t }: Props) {
  return (
    <footer className={styles.footer} id="contact">
      <div className={`container ${styles.inner}`}>
        <div className={styles.brandCol}>
          <a href="#top" className={styles.brand}>
            <WolfMark className={styles.mark} />
            <span>
              AlfaHost<span>.eu</span>
            </span>
          </a>
          <p>{t.about}</p>
          <a className={styles.mail} href="mailto:hello@alfahost.eu">
            hello@alfahost.eu
          </a>
        </div>

        <div className={styles.cols}>
          <div>
            <h2>{t.products}</h2>
            <ul>
              <li>
                <a href="#offer">{t.gameServers}</a>
              </li>
              <li>
                <a href="#offer">{t.vps}</a>
              </li>
              <li>
                <a href="#offer">{t.dedicated}</a>
              </li>
              <li>
                <a href="#protection">{t.antiddos}</a>
              </li>
            </ul>
          </div>
          <div>
            <h2>{t.company}</h2>
            <ul>
              <li>
                <a href="#why">{t.why}</a>
              </li>
              <li>
                <a href="#faq">{t.faq}</a>
              </li>
              <li>
                <a href="mailto:hello@alfahost.eu">{t.contact}</a>
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

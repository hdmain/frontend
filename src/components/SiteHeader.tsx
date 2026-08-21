"use client";

import { useState } from "react";
import { localeHref, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import CurrencySwitcher from "./CurrencySwitcher";
import { Icons } from "./Icons";
import LanguageSwitcher from "./LanguageSwitcher";
import WolfMark from "./WolfMark";
import styles from "./SiteHeader.module.css";

type Props = {
  locale: Locale;
  t: Dictionary["nav"];
  /** Current subpath for language switch, e.g. offer/minecraft */
  path?: string;
};

export default function SiteHeader({ locale, t, path }: Props) {
  const [open, setOpen] = useState(false);
  const home = localeHref(locale);

  const links = [
    { href: localeHref(locale, "#top"), label: t.home },
    { href: localeHref(locale, "#why"), label: t.why },
    { href: localeHref(locale, "#services"), label: t.services },
    { href: localeHref(locale, "#offer"), label: t.offer },
    { href: localeHref(locale, "#protection"), label: t.antiddos },
    { href: localeHref(locale, "#faq"), label: t.faq },
    { href: localeHref(locale, "#contact"), label: t.contact },
  ];

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <a href={home} className={styles.brand} onClick={() => setOpen(false)}>
          <WolfMark className={styles.mark} />
          <span className={styles.word}>
            AlfaHost<span>.eu</span>
          </span>
        </a>

        <nav className={styles.desktop} aria-label="Primary">
          {links.map((link) => (
            <a key={link.href} href={link.href} className={styles.link}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <div className={styles.switchers}>
            <LanguageSwitcher locale={locale} label={t.language} path={path} />
            <span className={styles.switcherSep} aria-hidden>
              ·
            </span>
            <CurrencySwitcher label={t.currency} />
          </div>
          <a className={styles.panel} href="mailto:hello@alfahost.eu">
            {t.panel}
          </a>
          <button
            type="button"
            className={styles.burger}
            aria-label={open ? t.closeMenu : t.openMenu}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? Icons.close : Icons.menu}
          </button>
        </div>
      </div>

      {open ? (
        <div className={styles.mobile}>
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={styles.mobileLink}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className={styles.mobileMeta}>
            <div className={styles.switchers}>
              <LanguageSwitcher locale={locale} label={t.language} path={path} />
              <span className={styles.switcherSep} aria-hidden>
                ·
              </span>
              <CurrencySwitcher label={t.currency} />
            </div>
            <a
              className={styles.panel}
              href="mailto:hello@alfahost.eu"
              onClick={() => setOpen(false)}
            >
              {t.panel}
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}

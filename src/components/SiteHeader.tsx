"use client";

import { useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { Icons } from "./Icons";
import LanguageSwitcher from "./LanguageSwitcher";
import WolfMark from "./WolfMark";
import styles from "./SiteHeader.module.css";

type Props = {
  locale: Locale;
  t: Dictionary["nav"];
};

export default function SiteHeader({ locale, t }: Props) {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#top", label: t.home },
    { href: "#why", label: t.why },
    { href: "#services", label: t.services },
    { href: "#offer", label: t.offer },
    { href: "#protection", label: t.antiddos },
    { href: "#faq", label: t.faq },
    { href: "#contact", label: t.contact },
  ];

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <a href="#top" className={styles.brand} onClick={() => setOpen(false)}>
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
          <LanguageSwitcher locale={locale} label={t.language} />
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
            <LanguageSwitcher locale={locale} label={t.language} />
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

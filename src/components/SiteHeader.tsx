"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, Gamepad2, Server, Network, Building2, ShieldCheck, BookOpen, Mail, CircleHelp, FileText, LockKeyhole, Cookie, ArrowUpRight } from "lucide-react";
import { localeHref, localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { legalEntity } from "@/lib/legal";
import { navigationCopy } from "@/lib/siteNavigation";
import { useSyncCurrencyLocale } from "./CurrencyProvider";
import { Icons } from "./Icons";
import LocaleControls from "./LocaleControls";
import ThemeToggle from "./ThemeToggle";
import WolfMark from "./WolfMark";
import styles from "./SiteHeader.module.css";

type Props = { locale: Locale; t: Dictionary["nav"]; path?: string };

export default function SiteHeader({ locale, t, path }: Props) {
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const header = useRef<HTMLElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const burger = useRef<HTMLButtonElement>(null);
  const n = navigationCopy[locale];
  useSyncCurrencyLocale(locale);

  useEffect(() => {
    function outside(event: PointerEvent) {
      if (!header.current?.contains(event.target as Node)) { setActiveMenu(null); setOpen(false); }
    }
    function escape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      if (activeMenu) { setActiveMenu(null); trigger.current?.focus(); }
      else if (open) { setOpen(false); burger.current?.focus(); }
    }
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("pointerdown", outside); document.removeEventListener("keydown", escape); };
  }, [activeMenu, open]);

  const page = (subpath: string) => localePath(locale, subpath);
  const groups = [
    { id: "products", label: t.offer, sections: [
      { title: n.products, links: [
        { label: n.games, description: n.gamesDesc, href: page("game-servers"), path: "game-servers", icon: Gamepad2 },
        { label: n.nat, description: n.natDesc, href: page("nat-vps"), path: "nat-vps", icon: Network },
        { label: n.vps, description: n.vpsDesc, href: page("vps"), path: "vps", icon: Server },
      ] },
    ] },
    { id: "about", label: n.about, sections: [
      { title: n.infrastructure, links: [
        { label: n.infrastructure, description: n.infrastructureDesc, href: page("infrastructure"), path: "infrastructure", icon: Building2 },
        { label: t.antiddos, description: n.ddosDesc, href: page("ddos-protection"), path: "ddos-protection", icon: ShieldCheck },
      ] },
      { title: n.legal, links: [
        { label: locale === "pl" ? "Polityka prywatności" : locale === "ru" ? "Конфиденциальность" : "Privacy policy", description: "", href: page("privacy"), path: "privacy", icon: LockKeyhole },
        { label: locale === "pl" ? "Regulamin" : locale === "ru" ? "Условия использования" : "Terms of service", description: "", href: page("terms"), path: "terms", icon: FileText },
        { label: locale === "pl" ? "Polityka cookies" : locale === "ru" ? "Файлы cookie" : "Cookie policy", description: "", href: page("cookies"), path: "cookies", icon: Cookie },
      ] },
    ] },
    { id: "support", label: n.help, sections: [
      { title: n.help, links: [
        { label: t.faq, description: "", href: page("faq"), path: "faq", icon: CircleHelp },
        { label: locale === "pl" ? "Dokumentacja" : locale === "ru" ? "Документация" : "Documentation", description: "", href: "https://docs.alfahost.eu/", path: "", icon: BookOpen },
        { label: t.contact, description: "support@alfahost.eu · admin@alfahost.eu", href: page("contact"), path: "contact", icon: Mail },
      ] },
    ] },
  ];
  const close = () => { setActiveMenu(null); setOpen(false); };

  return (
    <header className={styles.header} ref={header}>
      <div className={`container ${styles.inner}`}>
        <Link href={localeHref(locale)} className={styles.brand} onClick={close}>
          <WolfMark className={styles.mark} /><span className={styles.word}>AlfaHost<span>.eu</span></span>
        </Link>
        <nav id="site-navigation" className={`${styles.navigation} ${open ? styles.navigationOpen : ""}`} aria-label={n.navigation}>
          <Link href={localeHref(locale)} className={styles.link} aria-current={!path ? "page" : undefined} onClick={close}>{t.home}</Link>
          {groups.map((group) => {
            const expanded = activeMenu === group.id;
            return (
              <div key={group.id} className={styles.dropdown} onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node) && activeMenu === group.id) setActiveMenu(null);
              }}>
                <button type="button" className={`${styles.trigger} ${expanded ? styles.triggerOpen : ""}`} aria-expanded={expanded} aria-controls={`navigation-${group.id}`} onClick={(event) => {
                  trigger.current = event.currentTarget;
                  setActiveMenu(expanded ? null : group.id);
                }} onKeyDown={(event) => {
                  if (event.key === "ArrowDown") {
                    event.preventDefault(); trigger.current = event.currentTarget; setActiveMenu(group.id);
                    requestAnimationFrame(() => document.getElementById(`navigation-${group.id}`)?.querySelector("a")?.focus());
                  }
                }}>{group.label}<ChevronDown size={13} aria-hidden="true" /></button>
                {expanded && <div className={styles.dropdownPanel} id={`navigation-${group.id}`}>
                  {group.sections.map((section) => (
                    <div className={styles.menuGroup} key={section.title}>
                      <p className={styles.groupTitle}>{section.title}</p>
                      <ul>{section.links.map((item) => {
                        const Icon = item.icon;
                        return <li key={item.href}><Link href={item.href} className={styles.menuLink} aria-current={item.path && path === item.path ? "page" : undefined} onClick={close}>
                          <Icon size={18} strokeWidth={1.5} aria-hidden="true" /><span><strong>{item.label}</strong>{item.description && <small>{item.description}</small>}</span><ArrowUpRight size={13} className={styles.menuArrow} aria-hidden="true" />
                        </Link></li>;
                      })}</ul>
                    </div>
                  ))}
                </div>}
              </div>
            );
          })}
          <div className={styles.mobileMeta}><LocaleControls locale={locale} languageLabel={t.language} currencyLabel={t.currency} path={path} /><a href={legalEntity.panel} className={styles.panel}>{t.panel}</a></div>
        </nav>
        <div className={styles.actions}>
          <div className={styles.desktopLocale}><LocaleControls locale={locale} languageLabel={t.language} currencyLabel={t.currency} path={path} /></div>
          <ThemeToggle locale={locale} />
          <a href={legalEntity.panel} className={styles.panel}>{t.panel}</a>
          <button ref={burger} type="button" className={styles.burger} aria-label={open ? t.closeMenu : t.openMenu} aria-expanded={open} aria-controls="site-navigation" onClick={() => { setOpen(!open); setActiveMenu(null); }}>{open ? Icons.close : Icons.menu}</button>
        </div>
      </div>
    </header>
  );
}

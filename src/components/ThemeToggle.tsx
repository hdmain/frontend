"use client";

import { Moon, Sun } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { useTheme } from "./ThemeProvider";
import styles from "./SiteHeader.module.css";

const labels: Record<Locale, { light: string; dark: string }> = {
  pl: { light: "Włącz jasny motyw", dark: "Włącz ciemny motyw" },
  en: { light: "Switch to light theme", dark: "Switch to dark theme" },
  ru: { light: "Включить светлую тему", dark: "Включить тёмную тему" },
};

export default function ThemeToggle({ locale }: { locale: Locale }) {
  const { theme, toggleTheme } = useTheme();
  const label = theme === "dark" ? labels[locale].light : labels[locale].dark;

  return (
    <button
      type="button"
      className={styles.themeToggle}
      onClick={toggleTheme}
      aria-label={label}
      title={label}
    >
      {theme === "dark" ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
    </button>
  );
}

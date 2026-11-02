"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import type { Locale } from "@/i18n/config";
import styles from "./CopyEmailButton.module.css";

const copy = {
  pl: { label: "Kopiuj adres", copied: "Skopiowano", error: "Nie udało się skopiować. Zaznacz i skopiuj adres ręcznie." },
  en: { label: "Copy email", copied: "Copied", error: "Could not copy. Select and copy the address manually." },
  ru: { label: "Копировать адрес", copied: "Скопировано", error: "Не удалось скопировать. Выделите и скопируйте адрес вручную." },
};

export default function CopyEmailButton({ email, locale }: { email: string; locale: Locale }) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const t = copy[locale];

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  async function copyEmail() {
    if (timer.current) clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(email);
      setStatus("copied");
      timer.current = setTimeout(() => setStatus("idle"), 2500);
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className={styles.wrapper}>
      <button type="button" className={styles.button} onClick={copyEmail} aria-label={`${t.label}: ${email}`} title={t.label}>
        {status === "copied" ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
      </button>
      <span className={styles.feedback} role="status">{status === "copied" ? t.copied : status === "error" ? t.error : ""}</span>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/i18n/config";
import styles from "./TrustpilotBadge.module.css";

export const TRUSTPILOT_URL = "https://www.trustpilot.com/review/alfahost.eu";
const BUSINESS_UNIT_ID = "6ad54f32dea7b17b7f05e359";
/** Mini — TrustScore + stars, refreshed by Trustpilot on every page visit */
const TEMPLATE_ID = "53aa8308bbc149bd5a000020";

const TP_LOCALES: Record<Locale, string> = {
  en: "en-US",
  pl: "pl-PL",
  ru: "ru-RU",
};

type Props = {
  locale: Locale;
  label: string;
};

export default function TrustpilotBadge({ locale, label }: Props) {
  const widgetRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    type TpWindow = Window & {
      Trustpilot?: { loadFromElement: (el: Element, force: boolean) => void };
    };
    const w = window as TpWindow;

    const mountWidget = () => {
      if (cancelled || !widgetRef.current || !w.Trustpilot) return;
      w.Trustpilot.loadFromElement(widgetRef.current, true);
      setReady(true);
    };

    if (w.Trustpilot) {
      mountWidget();
      return () => {
        cancelled = true;
      };
    }

    let script = document.querySelector<HTMLScriptElement>(
      "script[data-tp-bootstrap]",
    );
    if (!script) {
      script = document.createElement("script");
      script.src =
        "https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js";
      script.async = true;
      script.dataset.tpBootstrap = "1";
      document.body.appendChild(script);
    }
    script.addEventListener("load", mountWidget);
    return () => {
      cancelled = true;
      script?.removeEventListener("load", mountWidget);
    };
  }, [locale]);

  return (
    <div className={styles.badge}>
      <div className={styles.head}>
        <span className={styles.logo} aria-hidden>
          <svg viewBox="0 0 24 24" width="22" height="22">
            <rect width="24" height="24" rx="4" fill="#00b67a" />
            <path
              fill="#fff"
              d="M12 4.2l1.85 4.28 4.65.44-3.52 3.08 1.08 4.54L12 14.4l-3.06 2.14 1.08-4.54-3.52-3.08 4.65-.44L12 4.2z"
            />
          </svg>
        </span>
        <a
          className={styles.cta}
          href={TRUSTPILOT_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          {label}
        </a>
      </div>

      {!ready ? <p className={styles.loading}>Trustpilot…</p> : null}

      <div
        ref={widgetRef}
        className={`trustpilot-widget ${styles.widget}`}
        data-locale={TP_LOCALES[locale]}
        data-template-id={TEMPLATE_ID}
        data-businessunit-id={BUSINESS_UNIT_ID}
        data-style-height="52px"
        data-style-width="100%"
        data-theme="dark"
      >
        <a href={TRUSTPILOT_URL} target="_blank" rel="noopener noreferrer">
          Trustpilot
        </a>
      </div>
    </div>
  );
}

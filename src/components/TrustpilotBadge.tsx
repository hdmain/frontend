"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { Locale } from "@/i18n/config";
import styles from "./TrustpilotBadge.module.css";

export const TRUSTPILOT_URL = "https://www.trustpilot.com/review/alfahost.eu";
const BUSINESS_UNIT_ID = "6ad54f32dea7b17b7f05e359";
/** Micro Combo — stars + score + review count */
const TEMPLATE_ID = "5419b757fa034004e043e9af";

const TP_LOCALES: Record<Locale, string> = {
  en: "en-US",
  pl: "pl-PL",
  ru: "ru-RU",
};

type Props = {
  locale: Locale;
  label: string;
  reviewsLabel: (count: number) => string;
};

type TrustScore = {
  trustScore: number;
  stars: number;
  reviewCount: number;
};

function Stars({ score, gradId }: { score: number; gradId: string }) {
  return (
    <span className={styles.stars} aria-hidden>
      {Array.from({ length: 5 }, (_, i) => {
        const fill = Math.max(0, Math.min(1, score - i));
        const id = `${gradId}-${i}`;
        return (
          <svg key={i} viewBox="0 0 24 24" width="15" height="15" className={styles.star}>
            <defs>
              <linearGradient id={id} x1="0" x2="1" y1="0" y2="0">
                <stop offset={`${fill * 100}%`} stopColor="#00b67a" />
                <stop offset={`${fill * 100}%`} stopColor="#2a2a2a" />
              </linearGradient>
            </defs>
            <path
              fill={`url(#${id})`}
              d="M12 1.5l2.9 6.7 7.3.7-5.5 4.8 1.7 7.1L12 17.5 5.6 20.8l1.7-7.1L1.8 8.9l7.3-.7L12 1.5z"
            />
          </svg>
        );
      })}
    </span>
  );
}

export default function TrustpilotBadge({ locale, label, reviewsLabel }: Props) {
  const widgetRef = useRef<HTMLDivElement>(null);
  const gradId = useId().replace(/:/g, "");
  const [score, setScore] = useState<TrustScore | null>(null);

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      try {
        const res = await fetch("/trustpilot.json", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as TrustScore;
        if (
          !cancelled &&
          typeof data.trustScore === "number" &&
          typeof data.stars === "number" &&
          typeof data.reviewCount === "number"
        ) {
          setScore(data);
        }
      } catch {
        /* widget still provides live rating */
      }
    })();

    type TpWindow = Window & {
      Trustpilot?: { loadFromElement: (el: Element, force: boolean) => void };
    };
    const w = window as TpWindow;

    const mountWidget = () => {
      if (cancelled || !widgetRef.current || !w.Trustpilot) return;
      w.Trustpilot.loadFromElement(widgetRef.current, true);
    };

    if (w.Trustpilot) {
      mountWidget();
    } else {
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
    }

    return () => {
      cancelled = true;
    };
  }, [locale]);

  return (
    <div className={styles.badge}>
      <a
        className={styles.main}
        href={TRUSTPILOT_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className={styles.logo} aria-hidden>
          <svg viewBox="0 0 24 24" width="28" height="28">
            <rect width="24" height="24" rx="4" fill="#00b67a" />
            <path
              fill="#fff"
              d="M12 4.2l1.85 4.28 4.65.44-3.52 3.08 1.08 4.54L12 14.4l-3.06 2.14 1.08-4.54-3.52-3.08 4.65-.44L12 4.2z"
            />
          </svg>
        </span>

        <span className={styles.copy}>
          <span className={styles.top}>
            {score ? (
              <>
                <Stars score={score.stars} gradId={gradId} />
                <strong className={styles.score}>
                  {score.trustScore.toFixed(1)}
                </strong>
              </>
            ) : (
              <strong className={styles.scorePending}>Trustpilot</strong>
            )}
          </span>
          <span className={styles.bottom}>
            {score ? reviewsLabel(score.reviewCount) : label}
          </span>
        </span>
      </a>

      <div
        ref={widgetRef}
        className={`trustpilot-widget ${styles.widget}`}
        data-locale={TP_LOCALES[locale]}
        data-template-id={TEMPLATE_ID}
        data-businessunit-id={BUSINESS_UNIT_ID}
        data-style-height="24px"
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

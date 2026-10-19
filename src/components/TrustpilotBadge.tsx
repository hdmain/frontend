"use client";

import { useEffect, useId, useState } from "react";
import styles from "./TrustpilotBadge.module.css";

export const TRUSTPILOT_URL = "https://www.trustpilot.com/review/alfahost.eu";

type Props = {
  label: string;
  /** Template with `{count}`, e.g. "{count} reviews on Trustpilot" */
  reviewsTemplate: string;
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
          <svg key={i} viewBox="0 0 24 24" width="18" height="18" className={styles.star}>
            <defs>
              <linearGradient id={id} x1="0" x2="1" y1="0" y2="0">
                <stop offset={`${fill * 100}%`} stopColor="#00b67a" />
                <stop offset={`${fill * 100}%`} stopColor="#2f2f2f" />
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

async function loadScore(): Promise<TrustScore | null> {
  const res = await fetch(`/trustpilot.json?t=${Date.now()}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  const data = (await res.json()) as Partial<TrustScore>;
  if (
    typeof data.trustScore !== "number" ||
    typeof data.stars !== "number" ||
    typeof data.reviewCount !== "number"
  ) {
    return null;
  }
  return {
    trustScore: data.trustScore,
    stars: data.stars,
    reviewCount: data.reviewCount,
  };
}

export default function TrustpilotBadge({ label, reviewsTemplate }: Props) {
  const gradId = useId().replace(/:/g, "");
  const [score, setScore] = useState<TrustScore | null>(null);

  const reviewsText = (count: number) =>
    reviewsTemplate.replace("{count}", String(count));

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const data = await loadScore();
        if (!cancelled && data) setScore(data);
      } catch {
        /* keep empty state */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <a
      className={styles.badge}
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

      <span className={styles.body}>
        {score ? (
          <>
            <span className={styles.row}>
              <Stars score={score.stars} gradId={gradId} />
              <strong className={styles.score}>{score.trustScore.toFixed(1)}</strong>
            </span>
            <span className={styles.meta}>{reviewsText(score.reviewCount)}</span>
          </>
        ) : (
          <>
            <span className={styles.row}>
              <strong className={styles.scorePending}>Trustpilot</strong>
            </span>
            <span className={styles.meta}>{label}</span>
          </>
        )}
      </span>
    </a>
  );
}

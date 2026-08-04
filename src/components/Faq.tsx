"use client";

import { useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import FadeContent from "./FadeContent";
import styles from "./Faq.module.css";

type Props = { t: Dictionary["faq"] };

export default function Faq({ t }: Props) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className={styles.section} id="faq">
      <div className={`container ${styles.layout}`}>
        <header className={styles.head}>
          <span className="eyebrow">{t.eyebrow}</span>
          <h2 className="sectionTitle">
            {t.titleBefore}{" "}
            <span className={styles.accent}>{t.titleAccent}</span>
          </h2>
          <p className={styles.lead}>{t.lead}</p>
        </header>

        <div className={styles.list}>
          {t.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <FadeContent key={item.q} duration={0.45} delay={i * 0.04}>
                <div className={`${styles.item} ${isOpen ? styles.open : ""}`}>
                  <button
                    type="button"
                    className={styles.button}
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span className={styles.num}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={styles.q}>{item.q}</span>
                    <span className={styles.mark} aria-hidden>
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  {isOpen ? <p className={styles.answer}>{item.a}</p> : null}
                </div>
              </FadeContent>
            );
          })}
        </div>
      </div>
      <div className={styles.cut} aria-hidden />
    </section>
  );
}

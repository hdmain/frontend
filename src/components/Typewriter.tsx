"use client";

import { useEffect, useState } from "react";
import styles from "./Typewriter.module.css";

type Props = { phrases: string[] };

export default function Typewriter({ phrases }: Props) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setIndex(0);
    setText("");
    setDeleting(false);
  }, [phrases]);

  useEffect(() => {
    if (!phrases.length) return;
    const current = phrases[index % phrases.length];
    const speed = deleting ? 35 : 70;
    const pause =
      deleting && text === ""
        ? 400
        : !deleting && text === current
          ? 1600
          : speed;

    const id = window.setTimeout(() => {
      if (!deleting && text === current) {
        setDeleting(true);
        return;
      }
      if (deleting && text === "") {
        setDeleting(false);
        setIndex((i) => (i + 1) % phrases.length);
        return;
      }
      const next = deleting
        ? current.slice(0, text.length - 1)
        : current.slice(0, text.length + 1);
      setText(next);
    }, pause);

    return () => window.clearTimeout(id);
  }, [text, deleting, index, phrases]);

  return (
    <span className={styles.type}>
      {text}
      <span className={styles.cursor} aria-hidden>
        |
      </span>
    </span>
  );
}

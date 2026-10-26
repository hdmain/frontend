"use client";

import type { MouseEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";
import styles from "./SpotlightCard.module.css";

type Props = {
  className?: string;
  children: ReactNode;
  href?: string;
};

export default function SpotlightCard({ className, children, href }: Props) {
  function onMouseMove(event: MouseEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  }

  const classNames = cn(styles.spot, className);

  if (href) {
    return (
      <a href={href} className={classNames} onMouseMove={onMouseMove}>
        {children}
      </a>
    );
  }

  return (
    <div className={classNames} onMouseMove={onMouseMove}>
      {children}
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";

type TrustpilotWindow = Window & {
  Trustpilot?: { loadFromElement: (element: HTMLElement, forceReload: boolean) => void };
};

export default function TrustpilotWidget() {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bootstrap = document.getElementById("trustpilot-bootstrap");
    const initialize = () => {
      if (widgetRef.current) {
        (window as TrustpilotWindow).Trustpilot?.loadFromElement(widgetRef.current, true);
      }
    };

    initialize();
    bootstrap?.addEventListener("load", initialize);
    return () => bootstrap?.removeEventListener("load", initialize);
  }, []);

  return (
    <div
      ref={widgetRef}
      className="trustpilot-widget"
      data-locale="en-US"
      data-template-id="56278e9abfbbba0bdcd568bc"
      data-businessunit-id="6ad54f32dea7b17b7f05e359"
      data-style-height="52px"
      data-style-width="100%"
    >
      <a href="https://www.trustpilot.com/review/alfahost.eu" target="_blank" rel="noopener noreferrer">
        Trustpilot
      </a>
    </div>
  );
}

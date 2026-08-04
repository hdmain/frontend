"use client";

import ClickSpark from "./ClickSpark";

/** Light page-level interactions only — no continuous canvas overlays. */
export default function PageEffects({ children }: { children: React.ReactNode }) {
  return (
    <ClickSpark
      sparkColor="#e30928"
      sparkSize={10}
      sparkRadius={22}
      sparkCount={8}
      duration={380}
    >
      {children}
    </ClickSpark>
  );
}

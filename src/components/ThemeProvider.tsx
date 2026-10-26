"use client";

import { createContext, useContext, useEffect, useSyncExternalStore, type ReactNode } from "react";

type Theme = "dark" | "light";

const ThemeContext = createContext<{ theme: Theme; toggleTheme: () => void }>({
  theme: "dark",
  toggleTheme: () => {},
});

function getThemeSnapshot(): Theme {
  return window.localStorage.getItem("alfahost-theme") === "light" ? "light" : "dark";
}

function subscribeToTheme(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener("alfahost-theme-change", onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener("alfahost-theme-change", onChange);
  };
}

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, (): Theme => "dark");

  useEffect(() => {
    const preferredTheme = getThemeSnapshot();
    document.documentElement.dataset.theme = preferredTheme;
    document.documentElement.style.colorScheme = preferredTheme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", preferredTheme === "light" ? "#f6f7f9" : "#09090b");
  }, [theme]);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    window.localStorage.setItem("alfahost-theme", next);
    window.dispatchEvent(new Event("alfahost-theme-change"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

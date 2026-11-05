import { useEffect, useState, useCallback } from "react";

export type Theme = "dark" | "light";

const THEME_STORAGE_KEY = "sd-theme";

export function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    // Ignore storage read errors
  }
  return "dark";
}

export function applyTheme(theme: Theme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  const metaThemeColor = document.getElementById("theme-color-meta");
  if (theme === "dark") {
    root.classList.add("dark");
    root.classList.remove("light");
    root.style.colorScheme = "dark";
    if (metaThemeColor) metaThemeColor.setAttribute("content", "#131417");
  } else {
    root.classList.remove("dark");
    root.classList.add("light");
    root.style.colorScheme = "light";
    if (metaThemeColor) metaThemeColor.setAttribute("content", "#fbf9f4");
  }
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Ignore storage write errors
  }
  window.dispatchEvent(new CustomEvent("sd-theme-change", { detail: theme }));
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    // Sync initial DOM with current state
    const current = getInitialTheme();
    setThemeState(current);

    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<Theme>;
      if (customEvent.detail && (customEvent.detail === "dark" || customEvent.detail === "light")) {
        setThemeState(customEvent.detail);
      }
    };

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === THEME_STORAGE_KEY && (e.newValue === "dark" || e.newValue === "light")) {
        setThemeState(e.newValue);
        applyTheme(e.newValue);
      }
    };

    window.addEventListener("sd-theme-change", handleThemeChange);
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("sd-theme-change", handleThemeChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const setTheme = useCallback((nextTheme: Theme) => {
    setThemeState(nextTheme);
    applyTheme(nextTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      applyTheme(next);
      return next;
    });
  }, []);

  return { theme, setTheme, toggleTheme, isDark: theme === "dark" };
}

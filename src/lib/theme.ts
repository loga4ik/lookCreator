import { useEffect, useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";

const listeners = new Set<() => void>();

const getSystemTheme = (): Theme =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const getSnapshot = (): Theme => {
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  return stored === "light" || stored === "dark" ? stored : getSystemTheme();
};

const getServerSnapshot = (): Theme => "light";

const subscribe = (callback: () => void) => {
  listeners.add(callback);
  window.addEventListener("storage", callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
};

export const applyTheme = (theme: Theme): void => {
  window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  listeners.forEach((listener) => listener());
};

export const useTheme = (): Theme => {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return theme;
};

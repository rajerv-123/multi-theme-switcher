import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type ThemeName = "theme-1" | "theme-2" | "theme-3";

type ThemeContextType = {
  theme: ThemeName;
  setTheme: (t: ThemeName) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_KEY = "theme";

export const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeName>(() => {
    const saved = window.localStorage.getItem(THEME_KEY) as ThemeName | null;
    return saved ?? "theme-1";
  });

  useEffect(() => {
    window.localStorage.setItem(THEME_KEY, theme);
    const html = document.documentElement;
    html.classList.remove("theme-1", "theme-2", "theme-3");
    html.classList.add(theme);
  }, [theme]);

  const value = useMemo(() => ({ theme, setTheme }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextType => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};

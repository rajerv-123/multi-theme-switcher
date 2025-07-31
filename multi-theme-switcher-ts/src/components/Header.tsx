import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useTheme, ThemeName } from "../theme/ThemeContext";
import { AI_NAME } from "../config";

type Props = {
  onOpenPreview: () => void;
};

const Header: React.FC<Props> = ({ onOpenPreview }) => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="fixed top-0 inset-x-0 h-[var(--header-h)] bg-surface shadow-theme z-50">
      <div className="max-w-6xl mx-auto h-full px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div aria-hidden className="w-7 h-7 rounded-md bg-primary"></div>
          <Link to="/" className="font-bold">ThemePlay</Link>
          <span className="text-muted text-sm hidden sm:inline">by {AI_NAME}</span>
        </div>

        <nav className="hidden md:flex items-center gap-4">
          <NavLink to="/" className={({isActive}) => isActive ? "underline" : "hover:underline"}>Home</NavLink>
          <NavLink to="/about" className={({isActive}) => isActive ? "underline" : "hover:underline"}>About</NavLink>
          <NavLink to="/contact" className={({isActive}) => isActive ? "underline" : "hover:underline"}>Contact</NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <label htmlFor="theme" className="sr-only">Theme</label>
          <select
            id="theme"
            value={theme}
            onChange={(e) => setTheme(e.target.value as ThemeName)}
            aria-label="Switch theme"
            className="bg-bg text-fg border border-muted rounded-md px-2 py-2"
          >
            <option value="theme-1">Theme 1 — Minimal</option>
            <option value="theme-2">Theme 2 — Dark + Sidebar</option>
            <option value="theme-3">Theme 3 — Colorful Cards</option>
          </select>
        </div>
      </div>
    </header>
  );
};

export default Header;

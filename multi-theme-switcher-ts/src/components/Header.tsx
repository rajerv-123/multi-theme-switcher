import React, { useEffect, useId, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useTheme, ThemeName } from "../theme/ThemeContext";

type NavItem = { label: string; to: string };

type Props = {
  onOpenPreview?: () => void;
  navItems?: NavItem[];
  brandName?: string;
};

const DEFAULT_NAV: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const Header: React.FC<Props> = ({
  onOpenPreview,
  navItems = DEFAULT_NAV,
  brandName = "ThemePlay",
}) => {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const menuId = useId();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 2);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={[
        "fixed top-0 inset-x-0 z-50 h-[var(--header-h)] bg-surface",
        "transition-colors",
        scrolled
          ? "border-b border-black/10 dark:border-white/10 shadow-theme"
          : "",
      ].join(" ")}
    >
      <div className="max-w-6xl mx-auto h-full px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3">
            <span aria-hidden className="w-7 h-7 rounded-md bg-primary block" />
            <span className="font-bold">{brandName}</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-5">
          {navItems.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                [
                  "hover:underline underline-offset-4",
                  isActive ? "underline" : "",
                ].join(" ")
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <label htmlFor="theme" className="sr-only">
            Theme
          </label>
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

        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center border border-muted rounded-md px-2 py-2"
          aria-controls={menuId}
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
            {open ? (
              <path
                fill="currentColor"
                d="M18.3 5.71 12 12l6.3 6.29-1.41 1.42L10.59 13.4 4.3 19.71 2.89 18.3 9.17 12 2.89 5.71 4.3 4.29l6.29 6.3 6.29-6.3z"
              />
            ) : (
              <path
                fill="currentColor"
                d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z"
              />
            )}
          </svg>
        </button>
      </div>

      <div
        id={menuId}
        className={[
          "md:hidden bg-surface border-t border-black/10 dark:border-white/10",
          "overflow-hidden transition-[max-height,opacity] duration-200",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
      >
        <div className="px-4 py-3 space-y-4">
          <nav className="flex flex-col gap-3">
            {navItems.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                className={({ isActive }) =>
                  [
                    "px-2 py-2 rounded-md hover:bg-bg/60",
                    isActive ? "underline underline-offset-4" : "",
                  ].join(" ")
                }
              >
                {n.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <label htmlFor="theme-mobile" className="sr-only">
              Theme
            </label>
            <select
              id="theme-mobile"
              value={theme}
              onChange={(e) => setTheme(e.target.value as ThemeName)}
              aria-label="Switch theme"
              className="flex-1 bg-bg text-fg border border-muted rounded-md px-2 py-2"
            >
              <option value="theme-1">Theme 1 — Minimal</option>
              <option value="theme-2">Theme 2 — Dark + Sidebar</option>
              <option value="theme-3">Theme 3 — Colorful Cards</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

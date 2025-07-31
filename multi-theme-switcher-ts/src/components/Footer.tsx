import React from "react";

type FooterLink = { label: string; href: string };
type Social =
  | { name: "github"; href: string }
  | { name: "linkedin"; href: string }
  | { name: "x"; href: string };

type FooterProps = {
  author?: string;
  links?: FooterLink[];
  socials?: Social[];
  className?: string;
};

const socialIcon = (name: Social["name"]) => {
  switch (name) {
    case "github":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
          <path
            fill="currentColor"
            d="M12 2C6.48 2 2 6.62 2 12.26c0 4.5 2.87 8.31 6.85 9.65.5.09.68-.22.68-.49
               0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.46-1.2-1.12-1.52-1.12-1.52-.92-.64.07-.63.07-.63
               1.02.07 1.55 1.07 1.55 1.07 .9 1.57 2.37 1.12 2.95.86 .09-.67.35-1.12.64-1.38-2.22-.26-4.56-1.15-4.56-5.13
               0-1.13.39-2.06 1.03-2.79-.1-.26-.45-1.32.1-2.75 0 0 .85-.28 2.8 1.07 .81-.23 1.67-.35 2.54-.35 .86 0 1.73.12 2.54.35
               1.94-1.35 2.8-1.07 2.8-1.07 .55 1.43.2 2.49.1 2.75 .64.73 1.03 1.66 1.03 2.79 0 3.99-2.34 4.86-4.57 5.12
               .36.32.68.95.68 1.92 0 1.39-.01 2.51-.01 2.85 0 .27.18.59.69.49A10.07 10.07 0 0 0 22 12.26C22 6.62 17.52 2 12 2Z"
          />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
          <path
            fill="currentColor"
            d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2
               2 0 0 0-2-2ZM8.34 18.34H6.16V9.67h2.18v8.67ZM7.26 8.58a1.27 1.27 0 1 1 0-2.54 1.27 1.27 0 0 1 0 2.54Zm11.08 9.76h-2.18v-4.56c0-1.09-.02-2.49-1.52-2.49-1.53 0-1.76 1.19-1.76 2.41v4.64H10.7V9.67h2.09v1.18h.03c.29-.55 1-1.13 2.06-1.13 2.21 0 2.61 1.45 2.61 3.33v5.29Z"
          />
        </svg>
      );
    case "x":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
          <path
            fill="currentColor"
            d="M18.244 2H21l-6.52 7.45L22 22h-6.828l-4.8-6.22L4.8 22H2l7.07-8.07L2 2h6.828l4.46 5.77L18.244 2Zm-1.2 18.4h2.04L7.05 3.6H5.01l12.034 16.8Z"
          />
        </svg>
      );
  }
};

const Footer: React.FC<FooterProps> = ({
  author = "Rajeev",
  links = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  socials = [
    { name: "github", href: "https://github.com/" },
    { name: "linkedin", href: "https://www.linkedin.com/" },
    { name: "x", href: "https://x.com/" },
  ],
  className = "",
}) => {
  const year = new Date().getFullYear();

  const backToTop = () => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <footer
      className={`mt-10 pt-6 text-muted text-sm ${className}`}
      aria-label="Site footer"
    >
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent mb-6" />

      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className="inline-block w-6 h-6 rounded-md bg-primary"
            />
            <span className="font-medium">Built by {author}</span>
          </div>

          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap items-center gap-4">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="hover:underline underline-offset-4"
                    target={l.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      l.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            onClick={backToTop}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-black/10 dark:border-white/15 hover:opacity-80 transition"
            aria-label="Back to top"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
              <path
                fill="currentColor"
                d="M12 5l7 7-1.4 1.4L13 8.8V20h-2V8.8L6.4 13.4 5 12z"
              />
            </svg>
            Top
          </button>
        </div>

        <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                aria-label={s.name}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md border border-black/10 dark:border-white/15 hover:bg-[color-mix(in_oklab,var(--fg) 8%,transparent)] transition"
              >
                {socialIcon(s.name)}
              </a>
            ))}
          </div>

          <p className="opacity-80">
            © {year} {author}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

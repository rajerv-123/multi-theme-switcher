import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";

type FAQ = {
  q: string;
  a: string;
};

const faqs: FAQ[] = [
  {
    q: "What problem does this app solve?",
    a: "It shows how to structure multi-theme React apps where colors, fonts, spacing, and layout all change—without heavy UI libraries.",
  },
  {
    q: "How are themes applied?",
    a: "Through a context that toggles a class on <html> (theme-1 / theme-2 / theme-3). CSS variables drive tokens across the UI.",
  },
  {
    q: "Is it production-friendly?",
    a: "Yes. It uses TypeScript, React Router, Tailwind, and sensible security defaults like a CSP and safe fetch calls.",
  },
];

const Stat: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="rounded-theme bg-surface shadow-theme border border-black/10 dark:border-white/10 p-4 text-center transition">
    <div className="text-2xl font-bold">{value}</div>
    <div className="text-muted">{label}</div>
  </div>
);

const Badge: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-flex items-center rounded-full border border-black/10 dark:border-white/10 px-3 py-1 text-sm bg-bg">
    {children}
  </span>
);

const TimelineItem: React.FC<{ title: string; detail: string }> = ({ title, detail }) => (
  <div className="relative pl-6">
    <span
      aria-hidden
      className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-primary ring-4 ring-primary/15"
    />
    <div className="font-semibold">{title}</div>
    <div className="text-muted text-sm">{detail}</div>
  </div>
);

const FAQItem: React.FC<FAQ> = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-black/10 dark:border-white/10 rounded-theme">
      <button
        className="w-full text-left px-4 py-3 font-medium flex items-center justify-between"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={q.replace(/\s+/g, "-").toLowerCase()}
      >
        <span>{q}</span>
        <svg
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path fill="currentColor" d="M7 10l5 5 5-5H7z" />
        </svg>
      </button>
      <div
        id={q.replace(/\s+/g, "-").toLowerCase()}
        className={`px-4 pb-4 text-muted text-sm transition-[max-height,opacity] duration-200 ${
          open ? "max-h-40 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        {a}
      </div>
    </div>
  );
};

const About: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <header className="space-y-2">
        <span className="inline-flex items-center rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold">
          About this project
        </span>
        <h1 className="text-[var(--size-h1)] font-bold leading-tight">
          Built for <span className="bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-transparent">multi‑theme</span> apps
        </h1>
        <p className="text-muted max-w-2xl">
          A demonstration of how themes can alter not only colors but also fonts, spacing, and layout—while
          staying lightweight, accessible, and secure.
        </p>
      </header>

      {/* Mission & Values */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card title="Our Mission">
          We built this app to demonstrate a multi-theme architecture with clear structural and visual differences.
        </Card>

        <Card title="Core Values">
          <ul className="list-disc ml-5 space-y-1">
            <li>Clarity over complexity</li>
            <li>Performance without heavy UI libraries</li>
            <li>Accessibility and responsiveness by default</li>
            <li>Secure defaults and maintainable code</li>
          </ul>
        </Card>
      </div>

      {/* Tech */}
      <Card title="Tech Stack">
        <div className="flex flex-wrap gap-2">
          <Badge>React</Badge>
          <Badge>TypeScript</Badge>
          <Badge>Vite</Badge>
          <Badge>Tailwind</Badge>
          <Badge>React Router</Badge>
          <Badge>CSS Variables</Badge>
          <Badge>Context API</Badge>
        </div>
      </Card>

      {/* Stats */}
      <section aria-label="Quick stats" className="grid gap-4 sm:grid-cols-3">
        <Stat label="Themes" value="3" />
        <Stat label="Bundle UI libs" value="0" />
        <Stat label="Pages" value="3+" />
      </section>

      {/* Timeline */}
      <section className="grid gap-4 md:grid-cols-2">
        <Card title="Project Timeline">
          <div className="relative pl-3">
            <div aria-hidden className="absolute left-1.5 top-0 bottom-0 w-px bg-primary/25" />
            <div className="space-y-4">
              <TimelineItem title="Concept" detail="Define multi-theme goals and structure" />
              <TimelineItem title="Implementation" detail="Context + Tailwind tokens + Router" />
              <TimelineItem title="Polish" detail="Preview modal, animations, accessibility & CSP" />
            </div>
          </div>
        </Card>
        <Card title="What’s Next">
          <ul className="space-y-2">
            <li>• Add route transitions that respect reduced motion</li>
            <li>• Expand theme tokens (radius, shadows, spacing presets)</li>
            <li>• Self‑host fonts to further tighten CSP</li>
          </ul>
        </Card>
      </section>

      {/* FAQ */}
      <section>
        <h2 className="text-[var(--size-h2)] font-semibold mb-3">FAQ</h2>
        <div className="space-y-2">
          {faqs.map((f) => (
            <FAQItem key={f.q} {...f} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <Card title="Get Involved">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p className="text-muted">
            Want to see another theme or a different layout? Share your idea and we’ll add it.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-md bg-primary text-white px-4 py-2 hover:opacity-90 transition"
          >
            Suggest a Theme
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default About;

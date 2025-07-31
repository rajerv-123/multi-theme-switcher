/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        fg: "var(--fg)",
        muted: "var(--muted)",
        surface: "var(--surface)",
        primary: "var(--primary)",
      },
      borderRadius: {
        theme: "var(--radius)",
      },
      boxShadow: {
        theme: "var(--shadow)",
      },
    },
  },
  plugins: [],
};

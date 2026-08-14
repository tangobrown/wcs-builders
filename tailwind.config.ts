import type { Config } from "tailwindcss";

/**
 * Brand tokens for WCS Building Services.
 * Square corners are part of the brand — the default radius scale is left
 * untouched but virtually every surface uses `rounded-none`.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#0c1d3d",
        gold: "#bd8f13",
        "gold-dark": "#a67c0f",
        "gold-deep": "#8f6c0e",
        mist: "#eef3f7",
        body: "#43536e",
        muted: "#6b7a93",
        field: "#eef1f4",
        "field-border": "#d8dee6",
        hairline: "#e2e8ef",
        "img-placeholder": "#dde4ec",
      },
      fontFamily: {
        heading: ["var(--font-poppins)", "sans-serif"],
        body: ["var(--font-public-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        container: "1200px",
      },
      boxShadow: {
        frame: "0 18px 50px rgba(12,29,61,.13)",
        "frame-strong": "0 18px 50px rgba(12,29,61,.14)",
      },
      transitionTimingFunction: {
        carousel: "cubic-bezier(.4,0,.2,1)",
      },
    },
  },
  plugins: [],
};

export default config;

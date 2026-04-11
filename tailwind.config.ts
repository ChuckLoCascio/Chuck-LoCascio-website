import type { Config } from "tailwindcss";

/** Coinbase dark — docs/design-md/coinbase/DESIGN.md + preview-dark.html */
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        ch: {
          /** Near Black — canvas (#0a0b0d) */
          page: "#0a0b0d",
          black: "#0a0b0d",
          /** Primary light text (cool gray surface inverted) */
          white: "#eef0f3",
          /** Gray surface — secondary fills */
          "near-black": "#1a1c20",
          /** Dark card / elevated */
          ink: "#0a0b0d",
          charcoal: "#1a1c20",
          "deep-charcoal": "#282b31",
          "hover-gray": "#282b31",
          /** Coinbase Blue + Hover Blue */
          volt: "#0052ff",
          "volt-pale": "#578bfa",
          forest: "#166534",
          "forest-dark": "#14572f",
          olive: "rgba(91, 97, 110, 0.35)",
          "olive-dark": "#1a1c20",
          /** Muted text */
          silver: "#8a8f99",
          "button-hover": "#578bfa",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        "body-reading": [
          "1.125rem",
          { lineHeight: "1.56", fontWeight: "400" },
        ],
      },
      borderRadius: {
        /** Coinbase: 8px UI; 16px cards; 56px CTAs → use rounded-full for pills */
        ch: "0.5rem",
        "ch-card": "1rem",
      },
      boxShadow: {
        "ch-sm": "none",
        "ch-md": "none",
        "ch-inset": "none",
        "ch-neon": "0 0 0 1px #0052ff",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.4s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

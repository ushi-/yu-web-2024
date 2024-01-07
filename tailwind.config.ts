import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "375px",
      md: "576px",
      lg: "768px",
      xl: "1280px",
    },
    fontSize: {
      base: ["1rem", { lineHeight: "1.25" }],
      lg: ["1.25rem", { lineHeight: "1.25" }],
      xl: ["1.5rem", { lineHeight: "1.25" }],
      "2xl": ["2rem", { lineHeight: "1.25" }],
      "3xl": ["3rem", { lineHeight: "1.25" }],
      "base-ja": ["0.875rem", { lineHeight: "1.25rem" }],
      "lg-ja": ["1.09375rem", { lineHeight: "1.5625rem" }],
      "xl-ja": ["1.3125rem", { lineHeight: "1.875rem" }],
      "2xl-ja": ["1.75rem", { lineHeight: "2.1875rem" }],
      "3xl-ja": ["2.625rem", { lineHeight: "3.28125rem" }],
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-authentic)", "sans-serif"],
        condensed: ["var(--font-authentic-condensed)", "sans-serif"],
        ja: [
          "Hiragino Sans",
          "Hiragino Kaku Gothic Pro",
          "Yu Gothic",
          "YuGothic",
          "Meiryo",
          "sans-serif",
        ],
      },
      spacing: {
        "6.25": "1.5625rem",
        "7.5": "1.875rem",
      },
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
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;

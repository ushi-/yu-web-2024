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
      base: ["16px", { lineHeight: "24px" }],
      lg: ["20px", { lineHeight: "30px" }],
      xl: ["24px", { lineHeight: "36px" }],
      "2xl": ["32px", { lineHeight: "48px" }],
      "3xl": ["48px", { lineHeight: "72px" }],
      "base-ja": ["14px", { lineHeight: "22px" }],
      "lg-ja": ["17.5px", { lineHeight: "30px" }],
      "xl-ja": ["21px", { lineHeight: "36px" }],
      "2xl-ja": ["28px", { lineHeight: "48px" }],
      "3xl-ja": ["42px", { lineHeight: "72px" }],
    },
    container: {
      center: true,
      padding: "2rem",
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

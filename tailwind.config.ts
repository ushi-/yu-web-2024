import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontSize: {
      base: ["1rem", { lineHeight: "1.25" }],
      lg: ["1.5rem", { lineHeight: "1.25" }],
      xl: ["2rem", { lineHeight: "1.25" }],
      "2xl": ["3rem", { lineHeight: "1.25" }],
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-authentic)", "sans-serif"],
        condensed: ["var(--font-authentic-condensed)", "sans-serif"],
      },
      spacing: {
        "7.5": "1.875rem",
      },
      colors: {
        foreground: "rgb(var(--foreground))",
        background: "rgb(var(--background))",
        primary: "rgb(var(--primary))",
      },
    },
  },
  plugins: [],
};
export default config;

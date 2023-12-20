import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-authentic)", "sans-serif"],
        condensed: ["var(--font-authentic-condensed)", "sans-serif"],
      },
      spacing: {
        "7.5": "1.875rem",
      },
    },
  },
  plugins: [],
};
export default config;

import type { Metadata } from "next";
import localFont from "next/font/local";

import { cn } from "@/lib/utils";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/footer";

const authentic = localFont({
  src: [
    {
      path: "./fonts/AUTHENTICSans-90.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/AUTHENTICSans-130.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-authentic",
});
const authenticCondensed = localFont({
  src: [
    {
      path: "./fonts/AUTHENTICSans-Condensed-90.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/AUTHENTICSans-Condensed-130.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-authentic-condensed",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Yosuke Ushigome",
    default: "Yosuke Ushigome",
  },
  description:
    "I'm Yosuke Ushigome (yōs-ké • he/him), a London-based designer / technologist.",
  keywords: ["Design", "Technology", "Futures"],
  metadataBase: new URL("https://yu-web-2024.vercel.app"), // for development
  // metadataBase: new URL("https://yosukeushigo.me"),  // TODO: for production
  openGraph: {
    title: "Yosuke Ushigome",
    description:
      "I'm Yosuke Ushigome (yōs-ké • he/him), a London-based designer / technologist.",
    url: "https://www.yosukeushigo.me",
    locale: "en_GP",
    type: "website",
  },
  alternates: {
    types: {
      "application/rss+xml": "https://yosukeushigo.me/feed.xml",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen font-sans text-base flex flex-col max-w-screen-xl mx-auto",
          authentic.variable,
          authenticCondensed.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex-1 flex flex-col mb-10 lg:mb-20">{children}</div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

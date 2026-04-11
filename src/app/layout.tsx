import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { person } from "@/lib/portfolio-content";

/** CoinbaseSans / CoinbaseText stand-in — docs/design-md/coinbase/DESIGN.md + preview-dark.html */
const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: `${person.name} — ${person.title}`,
    template: `%s | ${person.name}`,
  },
  description: person.tagline,
  openGraph: {
    title: `${person.name} — ${person.title}`,
    description: person.tagline,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${fontSans.variable} font-sans min-h-screen flex flex-col bg-ch-page text-ch-white antialiased`}
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

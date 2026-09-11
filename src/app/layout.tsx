import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Magic Water — Ус бүрт ид шид",
  description:
    "Aqua 4 ус цэвэршүүлэгч, агшин зуурын ус халаагч. Хүргэлт, суурилуулалт үнэгүй.",
  robots: { index: false, follow: false },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="mn" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}

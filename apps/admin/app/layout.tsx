import type { Metadata } from "next";
import { Assistant, Cascadia_Mono, Karantina } from "next/font/google";
import "./globals.css";

const karantina = Karantina({
  variable: "--font-display",
  subsets: ["hebrew", "latin"],
  weight: ["700"],
  display: "swap",
});

const assistant = Assistant({
  variable: "--font-body",
  subsets: ["hebrew", "latin"],
  display: "swap",
});

const cascadiaMono = Cascadia_Mono({
  variable: "--font-ticket-mono",
  subsets: ["hebrew", "latin"],
  weight: ["500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ספורטיקט · ניהול",
  description: "דשבורד ניהול הפניות של ספורטיקט.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${karantina.variable} ${assistant.variable} ${cascadiaMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

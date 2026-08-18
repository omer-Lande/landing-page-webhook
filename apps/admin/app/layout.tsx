import type { Metadata } from "next";
import { Assistant, Karantina } from "next/font/google";
import localFont from "next/font/local";
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

const cascadiaMonoLatin = localFont({
  src: "./fonts/cascadia-mono-latin.woff2",
  weight: "500 600",
  variable: "--font-ticket-mono-latin",
  display: "swap",
});

const cascadiaMonoHebrew = localFont({
  src: "./fonts/cascadia-mono-hebrew.woff2",
  weight: "500 600",
  variable: "--font-ticket-mono-hebrew",
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
      className={`${karantina.variable} ${assistant.variable} ${cascadiaMonoLatin.variable} ${cascadiaMonoHebrew.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

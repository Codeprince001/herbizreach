import type { Metadata } from "next";
import "./globals.css";
import { displayFont, bodyFont } from "./fonts";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: "HerBizReach — Your business, seen by more",
  description: "AI-powered visibility for women-led SMEs across Africa.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body className="min-h-screen antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

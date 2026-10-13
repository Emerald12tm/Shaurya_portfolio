import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { site } from "@/content";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${site.name} — ${site.role}`,
  description: site.tagline,
  openGraph: {
    title: site.name,
    description: site.tagline,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#05070b",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <div className="backdrop" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}

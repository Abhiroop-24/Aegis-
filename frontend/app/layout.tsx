import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Aegis - AI-Powered Urban Safety Intelligence",
  description: "Navigate cities safely with AI-powered incident analysis, real-time safety scores, and intelligent route optimization. Aegis combines geospatial data, machine learning, and autonomous agents to provide actionable urban safety insights.",
  keywords: ["urban safety", "crime mapping", "safety intelligence", "route optimization", "AI safety", "geospatial analysis"],
  authors: [{ name: "Aegis Platform" }],
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  themeColor: "#06b6d4",
  openGraph: {
    title: "Aegis - AI-Powered Urban Safety Intelligence",
    description: "Navigate cities safely with AI-powered incident analysis and intelligent route optimization",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">{children}</body>
    </html>
  );
}

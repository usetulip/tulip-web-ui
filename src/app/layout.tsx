import type { Metadata } from "next";
import { Archivo, Geist_Mono, Newsreader } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { ApplyModalProvider } from "@/components/modals/ApplyModal";

// Newsreader (light, with italics) sets the display type, Archivo carries body copy,
// Geist Mono is reserved for spec callouts and token values.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tulipai.com"),
  title: "Tulip - The design layer for AI-driven software",
  description:
    "Stop letting AI hallucinate your UI. Tulip pairs strict Taste Governance with real-time Model Context Protocol (MCP) streaming, pushing human-approved design tokens and component blocks directly into your AI IDE.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/android-chrome-512x512.png",
      },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Tulip - The design layer for AI-driven software",
    description:
      "Stop letting AI hallucinate your UI. Tulip pairs strict Taste Governance with real-time Model Context Protocol (MCP) streaming, pushing human-approved design tokens and component blocks directly into your AI IDE.",
    images: ["/assets/q7TQ8E0Bc6qaCAnDrgp0wb3sTCg.png"],
    type: "website",
    siteName: "Tulip",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tulip - The design layer for AI-driven software",
    description:
      "Stop letting AI hallucinate your UI. Tulip pairs strict Taste Governance with real-time Model Context Protocol (MCP) streaming, pushing human-approved design tokens and component blocks directly into your AI IDE.",
    images: ["/assets/q7TQ8E0Bc6qaCAnDrgp0wb3sTCg.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivo.variable} ${newsreader.variable} ${geistMono.variable}`}>
      <body className="font-sans min-h-screen relative flex flex-col justify-between selection:bg-[#f97518] selection:text-[#1e0d01] antialiased">
        <SmoothScrollProvider>
          <ApplyModalProvider>
            <Header />
            <main className="flex-1 relative z-10">
              <div className="page-frame">{children}</div>
            </main>
            <Footer />
          </ApplyModalProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

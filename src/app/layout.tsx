import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DashedGuides } from "@/components/layout/DashedGuides";
import { AmbientBackground } from "@/components/layout/AmbientBackground";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tulipai.com"),
  title: "Tulip - The design layer for software that actually ships",
  description:
    "Tulip turns your product vision into a working system that powers everything from a Figma system and a production React repo, delivered in 48 hours.",
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
    title: "Tulip - The design layer for software that actually ships",
    description:
      "Tulip turns your product vision into a working system that powers everything from a Figma system and a production React repo, delivered in 48 hours.",
    images: ["/assets/q7TQ8E0Bc6qaCAnDrgp0wb3sTCg.png"],
    type: "website",
    siteName: "Tulip",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tulip - The design layer for software that actually ships",
    description:
      "Tulip turns your product vision into a working system that powers everything from a Figma system and a production React repo, delivered in 48 hours.",
    images: ["/assets/q7TQ8E0Bc6qaCAnDrgp0wb3sTCg.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans min-h-screen relative flex flex-col justify-between selection:bg-[#f97518]/20 selection:text-[#f97518] antialiased">
        <SmoothScrollProvider>
          <AmbientBackground />
          <DashedGuides />
          <Header />
          <main className="flex-1 relative z-10">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

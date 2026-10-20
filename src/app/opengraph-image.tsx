import { readFile } from "fs/promises";
import { join } from "path";
import type { CSSProperties } from "react";
import { ImageResponse } from "next/og";

// Social share card (LinkedIn, X, Slack, iMessage…), rendered once at build time.

export const alt = "Tulip: the design layer for AI-driven software";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#1e0d01";
const PAPER = "#f5f4f1";
const ORANGE = "#f97518";

// Google Fonts serves TTF when asked without a modern user agent, which is what the
// image renderer needs. Only the characters on the card are requested.
async function loadGoogleFont(family: string, axes: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${family}:${axes}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const src = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/);
  if (!src) throw new Error(`No TTF for ${family}`);
  return (await fetch(src[1])).arrayBuffer();
}

// The hero tulip as a shaded vector: two back petals, a front petal, stem and leaves.
const TULIP_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 520">
  <defs>
    <linearGradient id="front" x1="0.3" y1="0" x2="0.6" y2="1">
      <stop offset="0" stop-color="#ff9f5a"/><stop offset="0.45" stop-color="#f97518"/>
      <stop offset="0.8" stop-color="#e25a0c"/><stop offset="1" stop-color="#b4430b"/>
    </linearGradient>
    <linearGradient id="back" x1="0" y1="0" x2="0.4" y2="1">
      <stop offset="0" stop-color="#f58a3c"/><stop offset="0.6" stop-color="#d4560b"/><stop offset="1" stop-color="#9c3608"/>
    </linearGradient>
    <linearGradient id="leaf" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#a8ba80"/><stop offset="1" stop-color="#4e5e38"/>
    </linearGradient>
    <radialGradient id="halo" cx="0.5" cy="0.35" r="0.42">
      <stop offset="0" stop-color="#f97518" stop-opacity="0.18"/><stop offset="1" stop-color="#f97518" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="400" height="520" fill="url(#halo)"/>
  <path d="M200 250 C197 320 206 400 200 506" fill="none" stroke="#66784c" stroke-width="9" stroke-linecap="round"/>
  <path d="M199 478 C148 438 124 384 128 316 C160 356 188 404 199 456 Z" fill="url(#leaf)"/>
  <path d="M201 504 C254 458 280 404 272 344 C244 388 214 430 201 482 Z" fill="url(#leaf)"/>
  <path d="M200 254 C144 252 112 208 114 148 C115 114 126 90 140 76 C152 116 174 150 200 162 Z" fill="url(#back)"/>
  <path d="M200 254 C256 252 288 208 286 148 C285 114 274 90 260 76 C248 116 226 150 200 162 Z" fill="url(#back)"/>
  <path d="M200 260 C156 258 140 214 145 164 C149 126 170 96 200 66 C230 96 251 126 255 164 C260 214 244 258 200 260 Z" fill="url(#front)"/>
  <path d="M200 70 C200 120 199 190 200 258" fill="none" stroke="#4a1602" stroke-opacity="0.22" stroke-width="2"/>
</svg>`;

function Callout({ label, value, style }: { label: string; value: string; style: CSSProperties }) {
  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        background: "rgba(255,255,255,0.92)",
        border: `1.5px solid ${INK}`,
        borderRadius: 6,
        ...style,
      }}
    >
      <div style={{ display: "flex", padding: "6px 12px", fontSize: 15, color: "rgba(30,13,1,0.65)", borderBottom: "1px solid rgba(30,13,1,0.15)" }}>
        {label}
      </div>
      <div style={{ display: "flex", padding: "8px 12px", fontSize: 26, fontFamily: "Newsreader", color: INK }}>{value}</div>
    </div>
  );
}

export default async function OpengraphImage() {
  const headline = "The design layer for AI-driven software.";
  const body = "Taste Governance and live MCP sync for the UI your AI builds. usetulip.co Apply for private access";
  const calloutText = "color.primary #F97518 radius.lg 16px · synced tulip";

  const fonts: { name: string; data: ArrayBuffer; style: "normal" | "italic"; weight: 300 | 400 | 500 }[] = [];
  try {
    const [serif, serifItalic, sans, sansMedium] = await Promise.all([
      loadGoogleFont("Newsreader", "wght@300", headline + calloutText),
      loadGoogleFont("Newsreader", "ital,wght@1,300", "AI-driven"),
      loadGoogleFont("Archivo", "wght@400", body + calloutText),
      loadGoogleFont("Archivo", "wght@500", body),
    ]);
    fonts.push(
      { name: "Newsreader", data: serif, style: "normal", weight: 300 },
      { name: "Newsreader", data: serifItalic, style: "italic", weight: 300 },
      { name: "Archivo", data: sans, style: "normal", weight: 400 },
      { name: "Archivo", data: sansMedium, style: "normal", weight: 500 }
    );
  } catch {
    // Fall back to the renderer's built-in font rather than failing the build
  }

  const logo = await readFile(join(process.cwd(), "public/logo.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
  const tulipSrc = `data:image/svg+xml;base64,${Buffer.from(TULIP_SVG).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: PAPER,
          color: INK,
          fontFamily: "Archivo",
          position: "relative",
        }}
      >
        {/* Left: brand, headline, line, URL */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 700, padding: "64px 0 60px 72px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logoSrc} width={44} height={44} alt="" />
            <div style={{ display: "flex", fontFamily: "Newsreader", fontSize: 44, letterSpacing: -0.5 }}>tulip</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", flexDirection: "column", fontFamily: "Newsreader", fontWeight: 300, fontSize: 78, lineHeight: 1.02, letterSpacing: -2 }}>
              <span>The design layer for</span>
              <div style={{ display: "flex" }}>
                <span style={{ fontStyle: "italic" }}>AI-driven</span>
                <span>&nbsp;software.</span>
              </div>
            </div>
            <div style={{ display: "flex", marginTop: 26, fontSize: 27, lineHeight: 1.35, color: "rgba(30,13,1,0.68)", maxWidth: 560 }}>
              Taste Governance and live MCP sync for the UI your AI builds.
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ display: "flex", background: ORANGE, color: "#ffffff", fontSize: 22, fontWeight: 500, padding: "12px 26px", borderRadius: 999 }}>
              Apply for private access
            </div>
            <div style={{ display: "flex", fontSize: 22, color: "rgba(30,13,1,0.6)" }}>usetulip.co</div>
          </div>
        </div>

        {/* Right: the tulip with two spec callouts */}
        <div style={{ display: "flex", position: "relative", width: 500, height: 630 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={tulipSrc} width={420} height={546} alt="" style={{ position: "absolute", left: 50, top: 50 }} />
          <Callout label="color.primary" value="#F97518" style={{ left: 0, top: 110 }} />
          <Callout label="radius.lg" value="16px · synced" style={{ right: 36, top: 300 }} />
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}

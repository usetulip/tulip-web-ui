"use client";

import React, { useEffect, useState, useRef } from "react";
import homeData from "@/data/home.json";
import { SectionHead } from "@/components/layout/SectionHead";
import { Check, X, ShieldCheck, Figma, Database, Code2 } from "lucide-react";

const governanceChecks = [
  { label: "Contrast (WCAG AA)", detail: "4.8:1", passed: true },
  { label: "Optical spacing", detail: "8pt grid", passed: true },
  { label: "Token integrity", detail: "0 raw hex", passed: true },
  { label: "Drift check", detail: "3 values drifted", passed: false },
];

const mcpStream = [
  { kind: "token", name: "color.primary", value: "#f97518" },
  { kind: "token", name: "radius.lg", value: "1rem" },
  { kind: "block", name: "PricingCard", value: "approved" },
  { kind: "block", name: "HeroSplit", value: "approved" },
];

const alignmentNodes = [
  { icon: Figma, label: "Master Figma", detail: "Variables" },
  { icon: Database, label: "Drizzle / Supabase", detail: "Schema" },
  { icon: Code2, label: "Next.js repo", detail: "Tailwind tokens" },
];

const syncedTokens = ["color.primary", "spacing.4", "radius.lg", "font.heading"];

export function EngineSection() {
  const { engine } = homeData;
  const [inViewMap, setInViewMap] = useState<{ [key: string]: boolean }>({});
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -40px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("data-card-id");
          if (id) {
            setInViewMap((prev) => ({ ...prev, [id]: true }));
          }
        }
      });
    }, observerOptions);

    Object.values(cardRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const [governance, mcpSync, alignment] = engine.features;

  const revealProps = (id: string, extraClassName = "") => ({
    ref: (el: HTMLDivElement | null) => {
      cardRefs.current[id] = el;
    },
    "data-card-id": id,
    className: `rounded-[22px] bg-white p-6 sm:p-9 overflow-hidden ${extraClassName}`,
  });

  const featureCopy = (feature: { title: string; description: string }) => (
    <div>
      <h3 className="text-xl sm:text-2xl font-semibold tracking-[-0.02em] text-ink mb-2 leading-snug">
        {feature.title}
      </h3>
      <p className="text-sm sm:text-base text-[#1e0d01]/70 leading-relaxed">{feature.description}</p>
    </div>
  );

  return (
    <section id="engine" aria-label={engine.title}>
      <SectionHead title={engine.title} accent={engine.accent}>
        <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-ink/70">{engine.description}</p>
      </SectionHead>

          {/* Grid Layout: Row 1 (2 cells: 7/5 cols), Row 2 (1 wide cell) */}
          <div className="grid gap-4 px-5 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Pillar 1: Taste Governance Engine */}
              <div {...revealProps("card-0", "lg:col-span-7 flex flex-col justify-between")}>
                <div className="relative w-full rounded-2xl bg-paper p-5 sm:p-7 mb-8 overflow-hidden">
                  <div className="rounded-2xl bg-white p-4 sm:p-5 shadow-sm border border-neutral-200/60">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 text-sm font-semibold text-[#1e0d01]">
                        <ShieldCheck className="h-4 w-4 text-[#f97518]" />
                        <span>Pre-publish audit</span>
                      </div>
                      <span className="shrink-0 whitespace-nowrap rounded-full bg-[#fa8484]/15 px-2.5 py-0.5 text-[11px] font-bold text-[#d94f4f]">
                        Publish blocked
                      </span>
                    </div>

                    <ul className="space-y-2.5">
                      {governanceChecks.map((check) => (
                        <li key={check.label} className="flex items-center justify-between gap-3 text-xs sm:text-sm">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span
                              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                                check.passed ? "bg-[#a5ff00] text-[#1e0d01]" : "bg-[#fa8484] text-white"
                              }`}
                            >
                              {check.passed ? (
                                <Check className="h-3 w-3 stroke-[3]" />
                              ) : (
                                <X className="h-3 w-3 stroke-[3]" />
                              )}
                            </span>
                            <span className="truncate text-neutral-700">{check.label}</span>
                          </div>
                          <span
                            className={`shrink-0 font-mono text-[11px] ${
                              check.passed ? "text-neutral-400" : "text-[#d94f4f]"
                            }`}
                          >
                            {check.detail}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {featureCopy(governance)}
              </div>

              {/* Pillar 2: Real-Time MCP Sync */}
              <div {...revealProps("card-1", "lg:col-span-5 flex flex-col justify-between")}>
                <div className="relative w-full rounded-2xl bg-[#1e0d01] p-4 sm:p-5 mb-8 overflow-hidden font-mono">
                  <div className="flex items-center gap-1.5 mb-4">
                    <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
                    <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
                    <span className="h-2 w-2 rounded-full bg-[#28c840]" />
                    <span className="ml-2 text-[10px] text-white/40">mcp.usetulip.co</span>
                    <span className="ml-auto flex items-center gap-1.5 text-[10px] font-semibold text-[#a5ff00]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#a5ff00] animate-pulse" />
                      LIVE
                    </span>
                  </div>

                  <ul className="space-y-2 text-[11px] sm:text-xs">
                    {mcpStream.map((item, i) => (
                      <li
                        key={item.name}
                        className={`flex items-center justify-between gap-3 rounded-lg bg-white/[0.04] px-3 py-2 border border-white/5 transition-all duration-500 ${
                          inViewMap["card-1"] ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3"
                        }`}
                        style={{ transitionDelay: `${300 + i * 150}ms` }}
                      >
                        <span className="flex items-center gap-2 min-w-0">
                          <span className={item.kind === "token" ? "text-[#f97518]" : "text-[#eba100]"}>
                            {item.kind === "token" ? "token" : "block"}
                          </span>
                          <span className="truncate text-white/85">{item.name}</span>
                        </span>
                        <span className="shrink-0 text-white/40">{item.value}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-4 text-[10px] text-white/40">→ streaming to Cursor</p>
                </div>

                {featureCopy(mcpSync)}
              </div>
            </div>

            {/* Pillar 3: Production React & Figma Alignment */}
            <div {...revealProps("card-2", "grid grid-cols-1 lg:grid-cols-12 gap-8 items-center")}>
              <div className="lg:col-span-5 lg:order-1 order-2">{featureCopy(alignment)}</div>

              <div className="lg:col-span-7 lg:order-2 order-1 rounded-2xl bg-paper p-5 sm:p-7 overflow-hidden">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  {alignmentNodes.map(({ icon: Icon, label, detail }, i) => (
                    <React.Fragment key={label}>
                      <div className="flex-1 rounded-xl bg-white p-3.5 border border-neutral-200/60 shadow-2xs">
                        <div className="flex items-center gap-2">
                          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#f97518]/10 text-[#f97518]">
                            <Icon className="h-4 w-4" />
                          </span>
                          <div className="min-w-0">
                            <p className="truncate text-xs font-semibold text-[#1e0d01]">{label}</p>
                            <p className="text-[10px] text-neutral-400">{detail}</p>
                          </div>
                        </div>
                      </div>
                      {i < alignmentNodes.length - 1 && (
                        <span className="self-center font-mono text-xs font-bold text-[#f97518] rotate-90 sm:rotate-0">
                          ⇄
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                  {syncedTokens.map((token) => (
                    <span
                      key={token}
                      className="flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 font-mono text-[11px] text-neutral-600 border border-neutral-200/70 shadow-2xs"
                    >
                      <Check className="h-3 w-3 text-[#5c9900] stroke-[3]" />
                      {token}
                    </span>
                  ))}
                  <span className="rounded-full bg-[#a5ff00] px-3 py-1 text-[11px] font-bold text-[#1e0d01]">
                    1:1 in sync
                  </span>
                </div>
              </div>
            </div>
          </div>
    </section>
  );
}

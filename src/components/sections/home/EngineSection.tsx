"use client";

import React, { useEffect, useState, useRef } from "react";
import homeData from "@/data/home.json";
import { Container } from "@/components/layout/Container";
import { SectionFrame } from "@/components/layout/SectionFrame";
import { Zap, Sparkles, Image as ImageIcon, ChevronDown, Check, Settings, LayoutGrid } from "lucide-react";

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

  const features = engine.features;

  return (
    <section id="engine" className="relative overflow-hidden">
      <SectionFrame showTopBorder={true} showBottomBorder={false} showCorners={true}>
        <Container className="py-14 md:py-20">
          {/* Header */}
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14 md:mb-20">
            {/* Tag / Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(30,13,1,0.08)] bg-white px-3.5 py-1 shadow-sm mb-6">
              <Zap className="h-3.5 w-3.5 text-[#f97518] fill-[#f97518]" />
              <span className="text-xs sm:text-sm font-medium text-[#1e0d01]/80">
                {engine.badge}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1e0d01] font-heading mb-4 leading-tight">
              {engine.title}
            </h2>
            <p className="text-base sm:text-lg text-[#1e0d01]/70 leading-relaxed max-w-2xl">
              {engine.description}
            </p>
          </div>

          {/* Grid Layout: Row 1 (2 cards: 7/5 cols), Row 2 (3 equal cards) */}
          <div className="space-y-6 md:space-y-8">
            {/* ROW 1 (2 CARDS) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
              {/* Card 1: Figma Native Tokens */}
              <div
                ref={(el) => { cardRefs.current["card-0"] = el; }}
                data-card-id="card-0"
                className={`lg:col-span-7 rounded-[2rem] bg-[#fbfbfb] border border-[rgba(30,13,1,0.08)] p-6 sm:p-9 shadow-xs flex flex-col justify-between overflow-hidden transition-all duration-700 ease-out ${
                  inViewMap["card-0"]
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12 pointer-events-none"
                }`}
              >
                <div className="relative w-full rounded-2xl bg-neutral-100/60 p-5 sm:p-7 border border-neutral-200/50 mb-8 overflow-hidden">
                  <div className="rounded-2xl bg-white p-4 shadow-sm border border-neutral-200/60 mb-5">
                    <div className="text-sm font-medium text-neutral-400 mb-6 font-sans flex items-center">
                      <span className="text-neutral-700 mr-1 animate-pulse">|</span> Bulid your webiste ...
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 rounded-lg border border-neutral-200/80 bg-neutral-50 px-2.5 py-1 text-xs font-medium text-neutral-600">
                          <ImageIcon className="h-3.5 w-3.5 text-neutral-500" />
                          <span>Image</span>
                        </div>

                        <div className="flex items-center gap-1 rounded-lg border border-neutral-200/80 bg-neutral-50 px-2 py-1">
                          <span className="h-3.5 w-3.5 rounded-full bg-[#3b82f6]" />
                          <span className="h-3.5 w-3.5 rounded-full bg-[#a855f7]" />
                          <span className="h-3.5 w-3.5 rounded-full bg-[#fbbf24]" />
                          <span className="h-3.5 w-3.5 rounded-full bg-white border border-neutral-200" />
                          <ChevronDown className="h-3 w-3 text-neutral-400 ml-0.5" />
                        </div>
                      </div>

                      <button className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#ff6b00] to-[#f97518] px-4 py-1.5 text-xs font-bold text-white shadow-sm hover:brightness-105 transition-all">
                        <Sparkles className="h-3.5 w-3.5" />
                        <span>Genetrate</span>
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {["AI Components", "AI-Driven Layouts", "No-Code", "Visual Builder"].map((tag, i) => (
                      <span
                        key={i}
                        className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-medium text-neutral-600 border border-neutral-200/70 shadow-2xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#1e0d01] font-heading mb-2 leading-snug">
                    {features[0].title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#1e0d01]/70 leading-relaxed">
                    {features[0].description}
                  </p>
                </div>
              </div>

              {/* Card 2: Token Synchronizationfolio */}
              <div
                ref={(el) => { cardRefs.current["card-1"] = el; }}
                data-card-id="card-1"
                className={`lg:col-span-5 rounded-[2rem] bg-[#fbfbfb] border border-[rgba(30,13,1,0.08)] p-6 sm:p-9 shadow-xs flex flex-col justify-between overflow-hidden transition-all duration-700 ease-out delay-100 ${
                  inViewMap["card-1"]
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12 pointer-events-none"
                }`}
              >
                <div className="relative w-full aspect-[4/3] rounded-2xl bg-neutral-100/60 p-5 border border-neutral-200/50 mb-8 flex flex-col justify-between overflow-hidden">
                  <div className="flex items-center gap-1.5 mb-3">
                    <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
                    <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
                    <span className="h-2 w-2 rounded-full bg-[#28c840]" />
                    <div className="h-1.5 w-24 rounded-full bg-neutral-200/60 ml-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-3 flex-1">
                    <div className="rounded-xl bg-white p-3 border border-neutral-200/60 shadow-2xs flex flex-col justify-between">
                      <div className="h-2 w-12 rounded-full bg-neutral-200 mb-2" />
                      <div className="h-1.5 w-full rounded-full bg-neutral-100 mb-1" />
                      <div className="h-1.5 w-3/4 rounded-full bg-neutral-100" />
                      <div className="h-12 w-full rounded-lg bg-neutral-50 border border-neutral-100 mt-2" />
                    </div>

                    <div className="rounded-xl bg-white p-3 border border-neutral-200/60 shadow-2xs flex flex-col justify-between">
                      <div className="h-2 w-14 rounded-full bg-neutral-200 mb-2" />
                      <div className="h-1.5 w-full rounded-full bg-neutral-100 mb-1" />
                      <div className="h-1.5 w-2/3 rounded-full bg-neutral-100" />
                      <div className="h-12 w-full rounded-lg bg-neutral-50 border border-neutral-100 mt-2" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#1e0d01] font-heading mb-2 leading-snug">
                    {features[1].title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#1e0d01]/70 leading-relaxed">
                    {features[1].description}
                  </p>
                </div>
              </div>
            </div>

            {/* ROW 2 (3 EQUAL CARDS) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {/* Card 3: Developer Ready */}
              <div
                ref={(el) => { cardRefs.current["card-2"] = el; }}
                data-card-id="card-2"
                className={`rounded-[2rem] bg-[#fbfbfb] border border-[rgba(30,13,1,0.08)] p-6 sm:p-8 shadow-xs flex flex-col justify-between overflow-hidden transition-all duration-700 ease-out ${
                  inViewMap["card-2"]
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12 pointer-events-none"
                }`}
              >
                <div className="relative w-full aspect-[4/3] rounded-2xl bg-neutral-100/60 p-4 sm:p-5 border border-neutral-200/50 mb-7 flex flex-col justify-between overflow-hidden">
                  <div className="flex items-center gap-1.5 mb-3">
                    <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
                    <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
                    <span className="h-2 w-2 rounded-full bg-[#28c840]" />
                    <div className="h-2 w-28 rounded-full bg-neutral-200/60 ml-2" />
                  </div>

                  <div className="rounded-xl bg-white p-3.5 border border-neutral-200/60 shadow-2xs space-y-2.5">
                    {[
                      { checked1: true, checked2: false },
                      { checked1: true, checked2: true },
                      { checked1: false, checked2: false },
                      { checked1: true, checked2: false },
                    ].map((row, i) => (
                      <div key={i} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-neutral-200/70" />
                          <div className="h-1.5 w-16 rounded-full bg-neutral-200/50" />
                        </div>
                        <div className="flex items-center gap-3">
                          <div className={`h-3.5 w-3.5 rounded flex items-center justify-center ${row.checked1 ? "bg-blue-500 text-white" : "border border-neutral-200"}`}>
                            {row.checked1 && <Check className="h-2.5 w-2.5 stroke-[3]" />}
                          </div>
                          <div className={`h-3.5 w-3.5 rounded flex items-center justify-center ${row.checked2 ? "bg-blue-500 text-white" : "border border-neutral-200"}`}>
                            {row.checked2 && <Check className="h-2.5 w-2.5 stroke-[3]" />}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#1e0d01] font-heading mb-2 leading-snug">
                    {features[2].title}
                  </h3>
                  <p className="text-sm text-[#1e0d01]/70 leading-relaxed">
                    {features[2].description}
                  </p>
                </div>
              </div>

              {/* Card 4: Dark Mode Default */}
              <div
                ref={(el) => { cardRefs.current["card-3"] = el; }}
                data-card-id="card-3"
                className={`rounded-[2rem] bg-[#fbfbfb] border border-[rgba(30,13,1,0.08)] p-6 sm:p-8 shadow-xs flex flex-col justify-between overflow-hidden transition-all duration-700 ease-out delay-100 ${
                  inViewMap["card-3"]
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12 pointer-events-none"
                }`}
              >
                <div className="relative w-full aspect-[4/3] rounded-2xl bg-neutral-100/60 p-4 sm:p-5 border border-neutral-200/50 mb-7 flex flex-col items-center justify-center overflow-hidden">
                  <div className="absolute top-3 left-4 flex items-center gap-1 rounded-full bg-black px-2.5 py-0.5 text-[10px] font-bold text-white shadow-xs">
                    <span className="text-neutral-400">+</span>
                    <span>60% Convertion</span>
                  </div>

                  <div className="relative w-full h-24 flex items-center justify-center mt-3">
                    <svg className="absolute inset-0 h-full w-full stroke-neutral-300 stroke-dashed" strokeDasharray="3 3">
                      <line x1="20%" y1="70%" x2="50%" y2="50%" strokeWidth="1.5" />
                      <line x1="80%" y1="20%" x2="50%" y2="50%" strokeWidth="1.5" />
                      <line x1="30%" y1="20%" x2="50%" y2="50%" strokeWidth="1.5" />
                      <line x1="80%" y1="70%" x2="50%" y2="50%" strokeWidth="1.5" />
                      <line x1="50%" y1="50%" x2="50%" y2="85%" strokeWidth="1.5" />
                    </svg>

                    <span className="absolute left-[18%] bottom-[25%] h-2 w-2 rounded-full bg-blue-500" />
                    <span className="absolute left-[28%] top-[18%] h-2 w-2 rounded-full bg-blue-500" />
                    <span className="absolute right-[18%] top-[18%] h-2 w-2 rounded-full bg-blue-500" />
                    <span className="absolute right-[18%] bottom-[25%] h-2 w-2 rounded-full bg-blue-500" />
                    <span className="absolute left-1/2 -translate-x-1/2 bottom-[10%] h-2 w-2 rounded-full bg-blue-500" />

                    <div className="relative z-10 flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500 text-white shadow-md shadow-blue-500/30">
                      <Zap className="h-4 w-4 fill-white" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#1e0d01] font-heading mb-2 leading-snug">
                    {features[3].title}
                  </h3>
                  <p className="text-sm text-[#1e0d01]/70 leading-relaxed">
                    {features[3].description}
                  </p>
                </div>
              </div>

              {/* Card 5: Zero Lock-in */}
              <div
                ref={(el) => { cardRefs.current["card-4"] = el; }}
                data-card-id="card-4"
                className={`rounded-[2rem] bg-[#fbfbfb] border border-[rgba(30,13,1,0.08)] p-6 sm:p-8 shadow-xs flex flex-col justify-between overflow-hidden transition-all duration-700 ease-out delay-200 ${
                  inViewMap["card-4"]
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12 pointer-events-none"
                }`}
              >
                <div className="relative w-full aspect-[4/3] rounded-2xl bg-neutral-100/60 p-4 sm:p-5 border border-neutral-200/50 mb-7 flex items-center justify-center overflow-hidden">
                  <div className="w-full max-w-[200px] rounded-xl bg-white p-3.5 border border-neutral-200/60 shadow-sm space-y-3">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-5 w-5 items-center justify-center rounded-md bg-neutral-100 text-neutral-500">
                        <LayoutGrid className="h-3 w-3" />
                      </div>
                      <div className="h-1.5 w-20 rounded-full bg-neutral-200" />
                    </div>

                    <div className="flex items-center gap-2.5 bg-blue-50/70 p-1.5 rounded-lg border border-blue-100">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-white shadow-xs">
                        <Check className="h-3.5 w-3.5 stroke-[3]" />
                      </div>
                      <div className="h-1.5 w-16 rounded-full bg-blue-300" />
                    </div>

                    <div className="flex items-center gap-2.5">
                      <div className="flex h-5 w-5 items-center justify-center rounded-md bg-neutral-100 text-neutral-500">
                        <Settings className="h-3 w-3" />
                      </div>
                      <div className="h-1.5 w-14 rounded-full bg-neutral-200" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#1e0d01] font-heading mb-2 leading-snug">
                    {features[4].title}
                  </h3>
                  <p className="text-sm text-[#1e0d01]/70 leading-relaxed">
                    {features[4].description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </SectionFrame>
    </section>
  );
}

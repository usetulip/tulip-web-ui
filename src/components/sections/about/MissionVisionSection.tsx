"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import aboutData from "@/data/about.json";
import { Container } from "@/components/layout/Container";
import { SectionFrame } from "@/components/layout/SectionFrame";
import { Smile, Hexagon, CircleDashed } from "lucide-react";

export function MissionVisionSection() {
  const { missionVision } = aboutData;
  const cardRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative overflow-hidden">
      <SectionFrame showTopBorder={true} showBottomBorder={false} showCorners={true}>
        <Container className="py-14 md:py-20">
          {/* Header */}
          <div className="flex flex-col items-start text-left max-w-3xl mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(30,13,1,0.08)] bg-white px-3.5 py-1 shadow-sm mb-6">
              <Smile className="h-3.5 w-3.5 text-[#f97518]" />
              <span className="text-xs sm:text-sm font-medium text-[#1e0d01]/80">
                {missionVision.badge}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-[#1e0d01] font-heading mb-4 leading-tight">
              {missionVision.title}
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-[#1e0d01]/70 leading-relaxed max-w-2xl">
              {missionVision.description}
            </p>
          </div>

          {/* Main Visual Card with Appear-in Scroll Animation */}
          <div
            ref={cardRef}
            className={`relative rounded-[28px] md:rounded-[36px] overflow-hidden border border-[rgba(30,13,1,0.08)] shadow-lg min-h-[480px] sm:min-h-[540px] md:min-h-[580px] flex items-end p-4 sm:p-8 md:p-10 transition-all duration-700 ease-out ${
              isInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-14 pointer-events-none"
            }`}
          >
            {/* Background Office Image */}
            <div className="absolute inset-0 -z-10">
              <Image
                src={missionVision.image}
                alt="Tulip modern office architecture"
                fill
                priority
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-black/10" />
            </div>

            {/* Inner Floating White Cards Box */}
            <div className="relative z-10 w-full rounded-[22px] sm:rounded-[28px] bg-white p-6 sm:p-9 md:p-11 shadow-2xl border border-white/90">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                {/* Column 1: The Problem */}
                <div className="flex flex-col items-start">
                  <div className="h-11 w-11 rounded-xl bg-neutral-50 border border-neutral-200/70 flex items-center justify-center mb-5 text-neutral-800 shadow-2xs">
                    <Hexagon className="h-5 w-5 stroke-[1.8]" />
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-[#1e0d01] font-heading mb-3 leading-snug">
                    {missionVision.problem.title}
                  </h3>

                  <p className="text-sm sm:text-[15px] text-[#1e0d01]/70 leading-relaxed">
                    {missionVision.problem.description}
                  </p>
                </div>

                {/* Column 2: Our Solution */}
                <div className="flex flex-col items-start">
                  <div className="h-11 w-11 rounded-xl bg-neutral-50 border border-neutral-200/70 flex items-center justify-center mb-5 text-neutral-800 shadow-2xs">
                    <CircleDashed className="h-5 w-5 stroke-[1.8]" />
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-[#1e0d01] font-heading mb-3 leading-snug">
                    {missionVision.solution.title}
                  </h3>

                  <p className="text-sm sm:text-[15px] text-[#1e0d01]/70 leading-relaxed">
                    {missionVision.solution.description}
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

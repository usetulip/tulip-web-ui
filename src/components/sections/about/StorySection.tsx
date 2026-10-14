"use client";

import React, { useEffect, useState, useRef } from "react";
import aboutData from "@/data/about.json";
import { Container } from "@/components/layout/Container";
import { SectionFrame } from "@/components/layout/SectionFrame";
import { ScrollRevealText } from "@/components/shared/ScrollRevealText";
import { Counter } from "@/components/shared/Counter";
import { Users } from "lucide-react";

export function StorySection() {
  const { story } = aboutData;
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      <SectionFrame showTopBorder={true} showBottomBorder={false} showCorners={true}>
        <Container className="py-14 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            {/* Left Column: Badge */}
            <div className="lg:col-span-4 flex flex-col items-start lg:sticky lg:top-28">
              <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(30,13,1,0.08)] bg-white px-3.5 py-1 shadow-sm">
                <Users className="h-3.5 w-3.5 text-[#f97518]" />
                <span className="text-xs sm:text-sm font-medium text-[#1e0d01]/80">
                  {story.badge}
                </span>
              </div>
            </div>

            {/* Right Column: Scroll-revealing Headline, Description, and Counter Stats */}
            <div className="lg:col-span-8 flex flex-col">
              {/* Scroll-Driven Headline Opacity Reveal */}
              <ScrollRevealText
                text={story.headline}
                className="text-2xl sm:text-3xl md:text-[34px] font-medium leading-[1.32] tracking-[-0.02em] font-heading mb-8"
              />

              {/* Subheading / Description */}
              <p className="text-sm sm:text-base text-[#1e0d01]/70 leading-relaxed max-w-2xl mb-14">
                {story.description}
              </p>

              {/* Stat Counters Row */}
              <div className="grid grid-cols-3 gap-6 sm:gap-10 pt-2">
                {story.stats.map((stat, idx) => (
                  <div key={idx} className="flex flex-col">
                    <div className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-[#1e0d01] mb-2 tracking-tight">
                      <Counter
                        end={stat.number}
                        suffix={stat.suffix}
                        trigger={isInView}
                      />
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-[#1e0d01]/60">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </SectionFrame>
    </section>
  );
}

"use client";

import React from "react";
import Image from "next/image";
import homeData from "@/data/home.json";
import { SectionFrame } from "@/components/layout/SectionFrame";

export function LogoCloud() {
  const { logoCloud } = homeData;
  const logos = [...logoCloud.logos, ...logoCloud.logos, ...logoCloud.logos];

  return (
    <section className="relative overflow-hidden">
      <SectionFrame showTopBorder={true} showBottomBorder={false} showCorners={true}>
        <div className="py-12 md:py-16">
          <p className="text-center text-sm md:text-base font-medium text-[#1e0d01]/75 mb-10">
            {logoCloud.title}
          </p>

          {/* Marquee Wrapper with soft gradient fade masks on edges */}
          <div 
            className="relative w-full overflow-hidden flex items-center"
            style={{
              maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
            }}
          >
            <div className="flex w-max items-center gap-12 sm:gap-16 md:gap-24 animate-marquee hover:[animation-play-state:paused]">
              {logos.map((logo, idx) => (
                <div
                  key={`${logo.name}-${idx}`}
                  className="flex items-center justify-center shrink-0 h-12 w-40 sm:w-48 opacity-65 hover:opacity-100 transition-opacity"
                >
                  <div className="relative h-10 w-full">
                    <Image
                      src={logo.icon}
                      alt={logo.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionFrame>
    </section>
  );
}

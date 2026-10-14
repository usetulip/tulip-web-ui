"use client";

import React from "react";
import Image from "next/image";
import aboutData from "@/data/about.json";
import testimonialsData from "@/data/testimonials.json";
import { Container } from "@/components/layout/Container";
import { StorySection } from "@/components/sections/about/StorySection";
import { MissionVisionSection } from "@/components/sections/about/MissionVisionSection";
import { CoreTeamSection } from "@/components/sections/about/CoreTeamSection";
import { FaqSection } from "@/components/sections/common/FaqSection";
import { CtaBanner } from "@/components/sections/common/CtaBanner";
import { Star } from "lucide-react";

export default function AboutPage() {
  const { hero } = aboutData;

  // Latest testimonial from CMS
  const latestTestimonial = testimonialsData?.items?.[0] || {
    rating: 5.0,
    quote: hero.featuredQuote.text,
  };

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-10 sm:pt-14 pb-14 md:pb-20">
        <Container>
          {/* Header */}
          <div className="max-w-3xl text-left mb-12 sm:mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold tracking-tight text-[#1e0d01] font-heading mb-5 leading-[1.12]">
              {hero.title}
            </h1>
            <p className="text-base sm:text-lg text-[#1e0d01]/70 leading-relaxed max-w-2xl">
              {hero.description}
            </p>
          </div>

          {/* Media Grid: Left Large Photo, Right Stack (Photo + Latest Testimonial) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7 items-stretch">
            {/* Left Large Image */}
            <div className="lg:col-span-8 relative aspect-[16/10] sm:aspect-[16/11] lg:aspect-auto lg:h-full min-h-[340px] sm:min-h-[440px] rounded-[28px] overflow-hidden border border-[rgba(30,13,1,0.08)] shadow-sm bg-neutral-100">
              <Image
                src={hero.images.main}
                alt="Tulip Team collaborating"
                fill
                priority
                className="object-cover"
              />
            </div>

            {/* Right Column Stack */}
            <div className="lg:col-span-4 flex flex-col gap-6 lg:gap-7">
              {/* Top Photo */}
              <div className="relative aspect-[4/3] w-full rounded-[28px] overflow-hidden border border-[rgba(30,13,1,0.08)] shadow-sm bg-neutral-100 shrink-0">
                <Image
                  src={hero.images.secondary}
                  alt="Team building tools"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Bottom Dark Testimonial Card */}
              <div className="rounded-[28px] bg-[#180e05] text-white p-7 sm:p-8 flex flex-col justify-between shadow-xl flex-1 border border-neutral-800/60">
                {/* 5 Stars + 5.0 */}
                <div className="flex items-center gap-1.5 mb-6">
                  <div className="flex text-[#eba100]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-[#eba100] text-[#eba100]" />
                    ))}
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-white ml-1">
                    {latestTestimonial.rating.toFixed(1)}
                  </span>
                </div>

                {/* Testimonial Quote */}
                <p className="text-sm sm:text-base text-white/95 leading-relaxed font-normal">
                  {latestTestimonial.quote}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Our Story Section with Scroll Reveal & Animated Counters */}
      <StorySection />

      {/* Mission & Vision Section with Appear-in Animation */}
      <MissionVisionSection />

      {/* Core Team Section with Top-to-Bottom Hover Overlay, Social Scaling & Staggered Scroll Animation */}
      <CoreTeamSection />

      <FaqSection />
      <CtaBanner />
    </div>
  );
}

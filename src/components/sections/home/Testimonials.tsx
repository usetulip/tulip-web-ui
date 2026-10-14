"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import testimonialsData from "@/data/testimonials.json";
import { Container } from "@/components/layout/Container";
import { SectionFrame } from "@/components/layout/SectionFrame";
import { Smile, Star, ArrowLeft, ArrowRight } from "lucide-react";

export function Testimonials() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [inView, setInView] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const checkScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll, { passive: true });
      return () => el.removeEventListener("scroll", checkScroll);
    }
  }, []);

  // Smooth Autoscroll Effect
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      if (!scrollContainerRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;

      if (scrollLeft >= scrollWidth - clientWidth - 20) {
        scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollContainerRef.current.scrollBy({ left: 390, behavior: "smooth" });
      }
    }, 3800);

    return () => clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 390;
    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section ref={sectionRef} id="testimonials" className="relative overflow-hidden">
      <SectionFrame showTopBorder={true} showBottomBorder={false} showCorners={true}>
        <Container className="py-14 md:py-20">
          {/* Header with Navigation Arrows */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
            <div className="flex flex-col items-start max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(30,13,1,0.08)] bg-white px-3.5 py-1 shadow-sm mb-5">
                <Smile className="h-3.5 w-3.5 text-[#f97518]" />
                <span className="text-xs sm:text-sm font-medium text-[#1e0d01]/80">
                  {testimonialsData.badge}
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1e0d01] font-heading mb-3 leading-tight">
                {testimonialsData.title}
              </h2>
              <p className="text-base sm:text-lg text-[#1e0d01]/70 leading-relaxed">
                {testimonialsData.description}
              </p>
            </div>

            <div className="flex items-center gap-3 self-end md:self-auto">
              <button
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                aria-label="Previous Testimonial"
                className={`flex h-11 w-11 items-center justify-center rounded-xl bg-white border border-neutral-200/80 shadow-xs transition-all ${
                  canScrollLeft
                    ? "hover:bg-neutral-50 hover:border-neutral-300 text-[#f97518] cursor-pointer"
                    : "opacity-40 cursor-not-allowed text-neutral-400"
                }`}
              >
                <ArrowLeft className="h-4 w-4 stroke-[#f97518]" />
              </button>

              <button
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                aria-label="Next Testimonial"
                className={`flex h-11 w-11 items-center justify-center rounded-xl bg-white border border-neutral-200/80 shadow-xs transition-all ${
                  canScrollRight
                    ? "hover:bg-neutral-50 hover:border-neutral-300 text-[#f97518] cursor-pointer"
                    : "opacity-40 cursor-not-allowed text-neutral-400"
                }`}
              >
                <ArrowRight className="h-4 w-4 stroke-[#f97518]" />
              </button>
            </div>
          </div>

          {/* Autoscrolling Carousel Slider */}
          <div
            ref={scrollContainerRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
            className={`flex gap-6 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory transition-all duration-700 ease-out ${
              inView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12 pointer-events-none"
            }`}
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {testimonialsData.items.map((item) => (
              <div
                key={item.id}
                className="w-[320px] sm:w-[360px] md:w-[390px] shrink-0 snap-start rounded-[24px] bg-[#fbfbfb] p-7 sm:p-8 border border-[rgba(30,13,1,0.08)] shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3.5 mb-6">
                    <div className="relative h-11 w-11 rounded-full overflow-hidden shrink-0 border border-white shadow-xs">
                      <Image
                        src={item.avatar}
                        alt={item.author}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#1e0d01] leading-tight">
                        {item.author}
                      </h3>
                      <p className="text-xs text-[#1e0d01]/60 font-medium mt-0.5">
                        {item.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 mb-5">
                    <div className="flex text-[#f97518]">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-[#f97518] text-[#f97518]"
                        />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-[#1e0d01] ml-1">
                      {item.rating.toFixed(1)}
                    </span>
                  </div>

                  <p className="text-sm sm:text-base text-[#1e0d01]/85 leading-relaxed font-normal">
                    {item.quote}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </SectionFrame>
    </section>
  );
}

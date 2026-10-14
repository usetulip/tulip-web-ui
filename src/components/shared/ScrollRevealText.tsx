"use client";

import React, { useEffect, useState, useRef } from "react";

export interface ScrollRevealTextProps {
  text: string;
  className?: string;
  wordClassName?: string;
  baseOpacity?: number;
  activeOpacity?: number;
  highlightColor?: string;
}

export function ScrollRevealText({
  text,
  className = "",
  wordClassName = "",
  baseOpacity = 0.22,
  activeOpacity = 1.0,
  highlightColor = "#1e0d01",
}: ScrollRevealTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start reveal when entering lower 85% of screen, complete when reaching top 15%
      const start = windowHeight * 0.85;
      const end = windowHeight * 0.2;
      const current = rect.top;

      const progress = Math.min(
        Math.max((start - current) / (start - end), 0),
        1
      );

      setScrollProgress(progress);
    };

    const onScroll = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const words = text.split(" ");
  const totalWords = words.length;

  return (
    <p ref={containerRef} className={`select-none ${className}`}>
      {words.map((word, index) => {
        const wordThreshold = index / totalWords;
        const wordProgress = Math.min(
          Math.max((scrollProgress - wordThreshold) * totalWords * 1.5, 0),
          1
        );
        const opacity = baseOpacity + wordProgress * (activeOpacity - baseOpacity);

        return (
          <span
            key={index}
            style={{
              color: highlightColor,
              opacity: opacity,
              transition: "opacity 0.15s ease-out",
            }}
            className={`inline-block mr-[0.28em] ${wordClassName}`}
          >
            {word}
          </span>
        );
      })}
    </p>
  );
}

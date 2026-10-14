"use client";

import React, { useEffect, useRef } from "react";
import Lenis from "lenis";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Ultra-buttery weighted inertia scroll (Awwwards / Studio Freight signature feel)
    const lenis = new Lenis({
      lerp: 0.075, // Lower lerp gives that weighted, luxurious fluid momentum glide
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.8,
      infinite: false,
    });

    lenisRef.current = lenis;
    (window as any).__lenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Subtle parallax depth effect on ambient background glows
    const handleScroll = ({ scroll }: { scroll: number }) => {
      const pinkGlow = document.querySelector(".ambient-glow-pink") as HTMLElement;
      const coralGlow = document.querySelector(".ambient-glow-coral") as HTMLElement;
      if (pinkGlow) {
        pinkGlow.style.transform = `translate3d(0px, ${scroll * 0.18}px, 0px)`;
      }
      if (coralGlow) {
        coralGlow.style.transform = `translate3d(0px, ${-scroll * 0.12}px, 0px)`;
      }
    };

    lenis.on("scroll", handleScroll);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.off("scroll", handleScroll);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

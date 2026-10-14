"use client";

import React, { useEffect, useState } from "react";

export interface CounterProps {
  end: number;
  suffix?: string;
  duration?: number;
  trigger: boolean;
  className?: string;
}

export function Counter({
  end,
  suffix = "",
  duration = 1800,
  trigger,
  className = "",
}: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeOut * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [trigger, end, duration]);

  return (
    <span className={className}>
      {count}
      {suffix}
    </span>
  );
}

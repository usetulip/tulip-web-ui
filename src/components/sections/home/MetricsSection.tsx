'use client';

import React, { useEffect, useState, useRef } from 'react';
import homeData from '@/data/home.json';
import { Container } from '@/components/layout/Container';
import { SectionFrame } from '@/components/layout/SectionFrame';
import { Counter } from '@/components/shared/Counter';
import { ScrollRevealText } from '@/components/shared/ScrollRevealText';
import { Users } from 'lucide-react';

interface DraggableChipProps {
  label: string;
  className?: string;
  bgGradient?: string;
  shadowColor?: string;
  initialRotation?: number;
}

function parsePosition(className: string): React.CSSProperties {
  const style: React.CSSProperties = {};

  const topMatch = className.match(/\btop-\[([^\]]+)\]/);
  if (topMatch) style.top = topMatch[1];
  else {
    const topNum = className.match(/\btop-(\d+)\b/);
    if (topNum) style.top = `${parseInt(topNum[1], 10) * 0.25}rem`;
  }

  const bottomMatch = className.match(/\bbottom-\[([^\]]+)\]/);
  if (bottomMatch) style.bottom = bottomMatch[1];
  else {
    const bottomNum = className.match(/\bbottom-(\d+)\b/);
    if (bottomNum) style.bottom = `${parseInt(bottomNum[1], 10) * 0.25}rem`;
  }

  const leftMatch = className.match(/\bleft-\[([^\]]+)\]/);
  if (leftMatch) style.left = leftMatch[1];
  else {
    const leftNum = className.match(/\bleft-(\d+)\b/);
    if (leftNum) style.left = `${parseInt(leftNum[1], 10) * 0.25}rem`;
  }

  const rightMatch = className.match(/\bright-\[([^\]]+)\]/);
  if (rightMatch) style.right = rightMatch[1];
  else {
    const rightNum = className.match(/\bright-(\d+)\b/);
    if (rightNum) style.right = `${parseInt(rightNum[1], 10) * 0.25}rem`;
  }

  return style;
}

function parseGradientAndShadow(bgGradient?: string, shadowColor?: string): React.CSSProperties {
  const style: React.CSSProperties = {};

  if (bgGradient) {
    if (bgGradient.includes('linear-gradient') || bgGradient.startsWith('#') || bgGradient.startsWith('rgb')) {
      style.background = bgGradient;
    } else {
      const fromMatch = bgGradient.match(/from-\[#([0-9a-fA-F]{3,8})\]/);
      const toMatch = bgGradient.match(/to-\[#([0-9a-fA-F]{3,8})\]/);
      if (fromMatch && toMatch) {
        style.background = `linear-gradient(135deg, #${fromMatch[1]} 0%, #${toMatch[1]} 100%)`;
      }
    }
  }

  if (shadowColor) {
    const shadowMatch = shadowColor.match(/shadow-\[#([0-9a-fA-F]{3,8})\](?:\/(\d+))?/);
    if (shadowMatch) {
      const hex = shadowMatch[1];
      const alpha = shadowMatch[2] ? parseInt(shadowMatch[2], 10) / 100 : 0.35;
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      style.boxShadow = `0 10px 25px -4px rgba(${r}, ${g}, ${b}, ${alpha}), 0 6px 12px -4px rgba(${r}, ${g}, ${b}, ${alpha * 0.6})`;
    }
  }

  return style;
}

function DraggableChip({
  label,
  className = '',
  bgGradient = 'bg-gradient-to-r from-[#b57bff] to-[#8d47fe]',
  shadowColor = 'shadow-[#8d47fe]/30',
  initialRotation = 0,
}: DraggableChipProps) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const positionStyle = parsePosition(className);
  const chipStyle = parseGradientAndShadow(bgGradient, shadowColor);

  const handlePointerDown = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setOffset({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y,
    });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDragging) {
      e.currentTarget.releasePointerCapture(e.pointerId);
      setIsDragging(false);
      setOffset({ x: 0, y: 0 });
    }
  };

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={{
        ...positionStyle,
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0px) rotate(${
          initialRotation + (isDragging ? offset.x * 0.05 : 0)
        }deg) scale(${isDragging ? 1.08 : 1})`,
        transition: isDragging
          ? 'none'
          : 'transform 0.65s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
        touchAction: 'none',
      }}
      className={`absolute z-20 select-none ${className}`}
    >
      <span
        style={chipStyle}
        className={`inline-block rounded-full ${bgGradient} px-5 py-2.5 text-xs sm:text-sm font-semibold text-white ${shadowColor} transition-shadow hover:shadow-xl whitespace-nowrap`}
      >
        {label}
      </span>
    </div>
  );
}

export function MetricsSection() {
  const { metrics } = homeData;
  const items = metrics?.items || [];
  const chips = metrics?.chips || [];
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.15 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className='relative overflow-hidden'>
      <SectionFrame
        showTopBorder={true}
        showBottomBorder={false}
        showCorners={true}
      >
        <Container className='py-14 md:py-20'>
          <div className='grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center'>
            {/* Left Content */}
            <div className='lg:col-span-8 flex flex-col'>
              {/* Badge */}
              <div className='inline-flex items-center gap-2 rounded-full border border-[rgba(30,13,1,0.08)] bg-white/90 backdrop-blur-md px-3.5 py-1 shadow-sm mb-8 w-fit'>
                <Users className='h-3.5 w-3.5 text-[#f97518]' />
                <span className='text-xs sm:text-sm font-medium text-[#1e0d01]/80'>
                  {metrics.badge}
                </span>
              </div>

              {/* Scroll-Driven Text Reveal Manifesto */}
              {metrics.manifestoText && (
                <ScrollRevealText
                  text={metrics.manifestoText}
                  className='text-2xl sm:text-3xl md:text-[32px] font-medium leading-[1.38] tracking-[-0.02em] font-heading mb-14'
                />
              )}

              {/* Animated Counters */}
              <div className='grid grid-cols-3 gap-6 sm:gap-10 pt-4'>
                {items.map((item, idx) => (
                  <div key={item.id || idx}>
                    <div className='text-4xl sm:text-5xl md:text-6xl font-bold font-heading text-[#1e0d01] mb-2 tracking-tight'>
                      <Counter
                        end={item.number ?? 0}
                        suffix={item.suffix || ''}
                        trigger={isInView}
                      />
                    </div>
                    <p className='text-xs sm:text-sm font-medium text-[#1e0d01]/60'>
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop: Interactive Floating Draggable Canvas (lg and up) */}
            <div className='hidden lg:block lg:col-span-4 relative h-[380px] xl:h-[420px] w-full'>
              {chips.map((chip) => (
                <DraggableChip
                  key={chip.id}
                  label={chip.label}
                  className={chip.className}
                  bgGradient={chip.bgGradient}
                  shadowColor={chip.shadowColor}
                  initialRotation={chip.initialRotation}
                />
              ))}
            </div>

            {/* Mobile & Tablet: Clean Responsive Grid (< lg) */}
            <div className='lg:hidden col-span-1 pt-6 w-full'>
              <div className='grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 justify-items-center'>
                {chips.map((chip) => {
                  const chipStyle = parseGradientAndShadow(chip.bgGradient, chip.shadowColor);
                  return (
                    <div
                      key={`mob-${chip.id}`}
                      style={{
                        transform: `rotate(${chip.initialRotation * 0.4}deg)`,
                      }}
                      className='w-full max-w-[190px] flex items-center justify-center p-0.5 select-none transition-transform hover:scale-105 active:scale-95'
                    >
                      <span
                        style={chipStyle}
                        className='w-full text-center inline-block rounded-full px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-md hover:shadow-lg whitespace-nowrap overflow-hidden text-ellipsis'
                      >
                        {chip.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Container>
      </SectionFrame>
    </section>
  );
}

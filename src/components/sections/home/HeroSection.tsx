'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import homeData from '@/data/home.json';
import { Container } from '@/components/layout/Container';
import { CornerDot } from '@/components/layout/SectionFrame';
import { Button } from '@/components/ui/button';
import { ChevronRight, Star } from 'lucide-react';

export function HeroSection() {
  const { hero } = homeData;
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      if (!imageContainerRef.current) return;
      const rect = imageContainerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const start = windowHeight;
      const end = windowHeight * 0.15;
      const current = rect.top;

      const rawProgress = Math.min(
        Math.max((start - current) / (start - end), 0),
        1,
      );

      const easedProgress = 1 - Math.pow(1 - rawProgress, 2.5);
      setScrollProgress(easedProgress);
    };

    const onScroll = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const initialScale = 0.8677777;
  const scale = initialScale + scrollProgress * (1 - initialScale);
  const translateY = (1 - scrollProgress) * 30;

  return (
    <section className='relative overflow-hidden'>
      <div className='relative w-full max-w-[1240px] mx-auto'>
        {/* Top Horizontal Dashed Line with Corner Dots */}
        <div className='relative w-full'>
          <div className='w-full h-[1px] border-t border-dashed border-[rgba(30,13,1,0.14)]' />
          <CornerDot position='top-left' />
          <CornerDot position='top-right' />
        </div>

        {/* Hero Main Content */}
        <Container>
          <div className='flex flex-col items-center text-center max-w-4xl mx-auto pt-10 sm:pt-14 pb-8'>
            {/* Tag / Badge */}
            <div className='inline-flex items-center gap-2 rounded-full border border-[rgba(30,13,1,0.08)] bg-white/90 backdrop-blur-md pl-1 pr-3 py-1 shadow-sm mb-7'>
              <span className='flex items-center gap-1.5 rounded-full bg-[#f97518]/15 px-2.5 py-0.5 text-xs font-bold text-[#f97518]'>
                <span className='h-1.5 w-1.5 rounded-full bg-[#f97518]' />
                {hero.badge.tag}
              </span>
              <span className='text-xs sm:text-sm font-medium text-[#1e0d01]/80 pr-1'>
                {hero.badge.text}
              </span>
            </div>

            {/* Headline with dynamic highlight */}
            <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-bold tracking-tight text-[#1e0d01] font-heading leading-[1.12] mb-6 max-w-4xl'>
              {hero.title.split(/(design)/i).map((part, i) =>
                part.toLowerCase() === 'design' ? (
                  <span key={i} className='text-[#f97518]'>
                    {part}
                  </span>
                ) : (
                  part
                ),
              )}
            </h1>

            {/* Subheading */}
            <p className='text-sm sm:text-base md:text-lg text-[#1e0d01]/70 leading-relaxed max-w-2xl mx-auto mb-8 whitespace-pre-line'>
              {hero.description}
            </p>

            {/* CTA Button */}
            <div className='mb-4'>
              <Button
                variant='primary'
                size='lg'
                className='bg-[#f97518] hover:bg-[#e65f00] text-white shadow-lg shadow-[#f97518]/30 h-12 px-7 text-sm font-semibold rounded-full flex items-center gap-1'
                asChild
              >
                <Link href={hero.cta.href}>
                  <span>{hero.cta.label}</span>
                  <ChevronRight className='h-4 w-4 stroke-[2.5]' />
                </Link>
              </Button>
            </div>
          </div>
        </Container>

        {/* Middle Horizontal Dashed Line with Centered Reviews Pill */}
        <div className='relative w-full my-4 flex items-center justify-center'>
          <div className='absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] border-t border-dashed border-[rgba(30,13,1,0.14)]' />
          <CornerDot position='top-left' className='top-1/2 -translate-y-1/2' />
          <CornerDot
            position='top-right'
            className='top-1/2 -translate-y-1/2'
          />

          {/* TODO: bring it back later */}
          {/* Centered Reviews Floating Pill */}
          {/* <div className='relative z-10 inline-flex items-center gap-3 rounded-full border border-[rgba(30,13,1,0.08)] bg-white/95 backdrop-blur-md px-4 py-1.5 shadow-sm'>
            <div className='flex -space-x-2'>
              {hero.rating.avatars.map((avatar, idx) => (
                <div
                  key={idx}
                  className='relative h-6 w-6 sm:h-7 sm:w-7 rounded-full border border-white overflow-hidden shadow-sm'
                >
                  <Image
                    src={avatar}
                    alt='User review avatar'
                    fill
                    className='object-cover'
                  />
                </div>
              ))}
            </div>
            <span className='text-xs sm:text-sm font-medium text-[#1e0d01]'>
              {hero.rating.count}
            </span>
            <span className='text-[#1e0d01]/30 font-light'>|</span>
            <div className='flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#1e0d01]'>
              <span>{hero.rating.score}</span>
              <div className='flex text-[#eba100]'>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className='h-3 w-3 sm:h-3.5 sm:w-3.5 fill-[#eba100]'
                  />
                ))}
              </div>
            </div>
          </div> */}
        </div>

        {/* Expanding Hero Image on Scroll */}
        <Container>
          <div
            ref={imageContainerRef}
            className='w-full max-w-5xl mx-auto pt-6 pb-12 transition-transform duration-200 ease-out will-change-transform'
            style={{
              transform: `scale(${scale}) translateY(${translateY}px)`,
            }}
          >
            <div className='relative rounded-2xl sm:rounded-3xl md:rounded-[2rem] border border-[rgba(30,13,1,0.08)] bg-white/90 p-2 sm:p-3 shadow-2xl backdrop-blur-xl'>
              <div className='relative aspect-[16/10] md:aspect-[16/9] w-full overflow-hidden rounded-xl sm:rounded-2xl md:rounded-[1.5rem] bg-neutral-50'>
                <Image
                  src={hero.preview.thumbnail}
                  alt='Tulip System Dashboard Preview'
                  fill
                  priority
                  className='object-cover object-top'
                />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}

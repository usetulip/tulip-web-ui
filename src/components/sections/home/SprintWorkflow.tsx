'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import homeData from '@/data/home.json';
import { Container } from '@/components/layout/Container';
import { SectionFrame } from '@/components/layout/SectionFrame';
import { Zap, Layers, Palette, ChevronRight } from 'lucide-react';

export function SprintWorkflow() {
  const { sprintWorkflow } = homeData;
  const [card1InView, setCard1InView] = useState(false);
  const [card2InView, setCard2InView] = useState(false);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer1 = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setCard1InView(true);
      }
    }, observerOptions);

    const observer2 = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setCard2InView(true);
      }
    }, observerOptions);

    if (card1Ref.current) observer1.observe(card1Ref.current);
    if (card2Ref.current) observer2.observe(card2Ref.current);

    return () => {
      observer1.disconnect();
      observer2.disconnect();
    };
  }, []);

  const card1Data = sprintWorkflow.cards[0];
  const card2Data = sprintWorkflow.cards[1];

  return (
    <section className='relative overflow-hidden'>
      <SectionFrame
        showTopBorder={true}
        showBottomBorder={false}
        showCorners={true}
      >
        <Container className='py-14 md:py-20'>
          {/* Header */}
          <div className='flex flex-col items-center text-center max-w-3xl mx-auto mb-14 md:mb-20'>
            <div className='inline-flex items-center gap-2 rounded-full border border-[rgba(30,13,1,0.08)] bg-white px-3.5 py-1 shadow-sm mb-6'>
              <Zap className='h-3.5 w-3.5 text-[#f97518] fill-[#f97518]' />
              <span className='text-xs sm:text-sm font-medium text-[#1e0d01]/80'>
                {sprintWorkflow.badge}
              </span>
            </div>

            <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1e0d01] font-heading mb-4 leading-tight'>
              {sprintWorkflow.title}
            </h2>
            <p className='text-base sm:text-lg text-[#1e0d01]/70 leading-relaxed max-w-2xl'>
              {sprintWorkflow.description}
            </p>
          </div>

          {/* Cards Stack */}
          <div className='flex flex-col gap-8 md:gap-12'>
            {/* Card 1: Minute Zero */}
            <div
              ref={card1Ref}
              className={`rounded-[2rem] bg-[#edf2f8] p-6 sm:p-10 lg:p-14 border border-[#d8e4f1] transition-all duration-700 ease-out ${
                card1InView
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12 pointer-events-none'
              }`}
            >
              <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center'>
                {/* Left: Visual Asset */}
                <div className='lg:col-span-6 w-full flex items-center justify-center'>
                  <div className='relative w-full max-w-[440px] aspect-[4/3] rounded-2xl bg-white/90 shadow-sm border border-white/80 overflow-hidden flex items-center justify-center'>
                    <div className='relative w-full h-full'>
                      <Image
                        src={card1Data.image}
                        alt={card1Data.title}
                        fill
                        className='object-contain'
                        sizes='(max-width: 768px) 100vw, 440px'
                      />
                    </div>
                  </div>
                </div>

                {/* Right: Content & Action */}
                <div className='lg:col-span-6 flex flex-col items-start'>
                  <div className='inline-flex items-center gap-1.5 text-xs font-bold text-[#f97518] mb-4'>
                    <Layers className='h-4 w-4' />
                    <span>{card1Data.phase}</span>
                  </div>

                  <h3 className='text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#1e0d01] font-heading mb-4 leading-tight'>
                    {card1Data.title}
                  </h3>

                  <p className='text-sm sm:text-base text-[#1e0d01]/70 leading-relaxed mb-8'>
                    {card1Data.description}
                  </p>

                  <Link
                    href={card1Data.cta.href}
                    className='inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-xs sm:text-sm font-semibold text-[#1e0d01] shadow-sm hover:shadow-md transition-all border border-[rgba(30,13,1,0.06)]'
                  >
                    <span>{card1Data.cta.label}</span>
                    <ChevronRight className='h-4 w-4 text-neutral-600' />
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 2: HOUR 48 */}
            <div
              ref={card2Ref}
              className={`rounded-[2rem] bg-[#ebe8f7] p-6 sm:p-10 lg:p-14 border border-[#ddd9f2] transition-all duration-700 ease-out delay-100 ${
                card2InView
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12 pointer-events-none'
              }`}
            >
              <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center'>
                <div className='lg:col-span-6 flex flex-col items-start order-2 lg:order-1'>
                  <div className='inline-flex items-center gap-1.5 text-xs font-bold text-[#f97518] mb-4'>
                    <Palette className='h-4 w-4' />
                    <span>{card2Data.phase}</span>
                  </div>

                  <h3 className='text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#1e0d01] font-heading mb-4 leading-tight'>
                    {card2Data.title}
                  </h3>

                  <p className='text-sm sm:text-base text-[#1e0d01]/70 leading-relaxed mb-8'>
                    {card2Data.description}
                  </p>

                  <Link
                    href={card2Data.cta.href}
                    className='inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-xs sm:text-sm font-semibold text-[#1e0d01] shadow-sm hover:shadow-md transition-all border border-[rgba(30,13,1,0.06)]'
                  >
                    <span>{card2Data.cta.label}</span>
                    <ChevronRight className='h-4 w-4 text-neutral-600' />
                  </Link>
                </div>

                {/* Right: Visual Asset */}
                <div className='lg:col-span-6 w-full flex items-center justify-center order-1 lg:order-2'>
                  <div className='relative w-full max-w-[440px] aspect-[4/3] rounded-2xl bg-white/90 shadow-sm border border-white/80 overflow-hidden flex items-center justify-center'>
                    <div className='relative w-full h-full'>
                      <Image
                        src={card2Data.image}
                        alt={card2Data.title}
                        fill
                        className='object-contain'
                        sizes='(max-width: 768px) 100vw, 440px'
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </SectionFrame>
    </section>
  );
}

'use client';

import { Container } from '@/components/layout/Container';
import { SectionFrame } from '@/components/layout/SectionFrame';
import { Smile } from 'lucide-react';
import { BundleIcon } from '@/components/sections/home/BundleIcon';

import homeData from '@/data/home.json';

export function BundleSection() {
  const { bundle } = homeData;


  const cards = bundle.items;

  return (
    <section id='bundle' className='relative overflow-hidden'>
      {/* Blurred Radial Gradient Background */}
      <div
        className='absolute inset-0 pointer-events-none overflow-hidden -z-10'
        aria-hidden='true'
      >
        <div
          className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1300px] h-[750px] opacity-95'
          style={{
            background:
              'radial-gradient(ellipse 65% 55% at 50% 40%, rgba(249, 117, 24, 0.13) 0%, rgba(250, 132, 132, 0.12) 35%, rgba(254, 131, 241, 0.07) 65%, transparent 85%)',
          }}
        />
        <div className='absolute top-20 -right-20 w-[850px] h-[400px] ambient-glow-coral opacity-25 rotate-[34deg]' />
        <div className='absolute top-10 left-1/2 -translate-x-1/2 w-[650px] h-[420px] ambient-glow-white opacity-70' />
        <div className='absolute bottom-10 -left-20 w-[750px] h-[380px] ambient-glow-pink opacity-20' />
      </div>

      <SectionFrame
        showTopBorder={true}
        showBottomBorder={false}
        showCorners={true}
      >
        <Container className='py-14 md:py-20'>
          {/* Header */}
          <div className='flex flex-col items-center text-center max-w-3xl mx-auto mb-14 md:mb-18'>
            <div className='inline-flex items-center gap-2 rounded-full border border-[rgba(30,13,1,0.08)] bg-white px-3.5 py-1 shadow-sm mb-6'>
              <Smile className='h-3.5 w-3.5 text-[#f97518]' />
              <span className='text-xs sm:text-sm font-medium text-[#1e0d01]/80'>
                {bundle.badge}
              </span>
            </div>

            <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1e0d01] font-heading mb-4 leading-tight'>
              {bundle.title}
            </h2>
            <p className='text-base sm:text-lg text-[#1e0d01]/70 leading-relaxed max-w-2xl'>
              {bundle.description}
            </p>
          </div>

          {/* Cards Grid: 3 cards top, 2 cards bottom */}
          <div className='space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {cards.slice(0, 3).map((card, idx) => (
                <div
                  key={card.id || idx}
                  className='group bundle-card rounded-[22px] bg-white/90 p-7 sm:p-9 border border-[rgba(30,13,1,0.08)] shadow-xs flex flex-col justify-start'
                >
                  <BundleIcon name={card.icon} />

                  <h3 className='text-lg sm:text-xl font-bold text-[#1e0d01] font-heading mb-3 leading-snug'>
                    {card.title}
                  </h3>

                  <p className='text-sm text-[#1e0d01]/70 leading-relaxed'>
                    {card.description}
                  </p>
                </div>
              ))}
            </div>

            {cards.length > 3 && (
              <div className='grid grid-cols-1 md:grid-cols-12 gap-6'>
                {cards[3] && (
                  <div className='group bundle-card md:col-span-5 rounded-[22px] bg-white/90 p-7 sm:p-9 border border-[rgba(30,13,1,0.08)] shadow-xs flex flex-col justify-start'>
                    <BundleIcon name={cards[3].icon} />

                    <h3 className='text-lg sm:text-xl font-bold text-[#1e0d01] font-heading mb-3 leading-snug'>
                      {cards[3].title}
                    </h3>

                    <p className='text-sm text-[#1e0d01]/70 leading-relaxed'>
                      {cards[3].description}
                    </p>
                  </div>
                )}

                {cards[4] && (
                  <div className='group bundle-card md:col-span-7 rounded-[22px] bg-white/90 p-7 sm:p-9 border border-[rgba(30,13,1,0.08)] shadow-xs flex flex-col justify-start'>
                    <BundleIcon name={cards[4].icon} />

                    <h3 className='text-lg sm:text-xl font-bold text-[#1e0d01] font-heading mb-3 leading-snug'>
                      {cards[4].title}
                    </h3>

                    <p className='text-sm text-[#1e0d01]/70 leading-relaxed'>
                      {cards[4].description}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </Container>
      </SectionFrame>
    </section>
  );
}

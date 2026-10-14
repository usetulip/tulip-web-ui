'use client';

import React from 'react';
import Link from 'next/link';
import homeData from '@/data/home.json';
import { Container } from '@/components/layout/Container';
import { SectionFrame } from '@/components/layout/SectionFrame';
import { Sparkles, ChevronRight } from 'lucide-react';

export function CtaBanner() {
  const { ctaBanner } = homeData;

  const label =
    ctaBanner?.cta?.label ||
    ctaBanner?.buttonText ||
    'Start Your 48-Hour Sprint';
  const href = ctaBanner?.cta?.href || ctaBanner?.buttonHref || '/contact';
  const badge = ctaBanner?.badge || 'Start Now';
  const title = ctaBanner?.title || 'Ready to fix your frontend bottleneck?';
  const description =
    ctaBanner?.description ||
    'Stop wasting engineering cycles on padding and hex codes. Get back to finding product-market fit';

  return (
    <section className='relative overflow-hidden'>
      <SectionFrame
        showTopBorder={true}
        showBottomBorder={true}
        showCorners={true}
      >
        <Container className='py-16 md:py-24'>
          <div className='relative rounded-[2rem] bg-gradient-to-b from-white to-[#fff8f3] p-8 sm:p-12 md:p-16 border border-[#f97518]/30 shadow-xl overflow-hidden flex flex-col items-center text-center max-w-4xl mx-auto'>
            {/* Ambient Coral/Pink Glow */}
            <div
              className='absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none opacity-40'
              style={{
                background:
                  'radial-gradient(ellipse at center, #f97518 0%, #fe83f1 50%, transparent 80%)',
                filter: 'blur(70px)',
              }}
            />

            {/* Tag / Badge */}
            <div className='relative z-10 inline-flex items-center gap-1.5 rounded-full border border-[#f97518]/30 bg-white/90 px-3.5 py-1 text-xs font-bold text-[#f97518] shadow-sm mb-6'>
              <Sparkles className='h-3.5 w-3.5' />
              <span>{badge}</span>
            </div>

            <h2 className='relative z-10 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1e0d01] font-heading mb-4 max-w-2xl leading-tight'>
              {title}
            </h2>

            <p className='relative z-10 text-sm sm:text-base md:text-lg text-[#1e0d01]/70 leading-relaxed mb-8 max-w-xl'>
              {description}
            </p>

            <div className='relative z-10 flex flex-wrap items-center justify-center gap-4'>
              <Link
                href={href}
                className='inline-flex items-center gap-1.5 rounded-full bg-[#f97518] hover:bg-[#e65f00] text-white px-8 py-3.5 text-sm font-bold shadow-lg shadow-[#f97518]/30 hover:scale-[1.02] transition-all'
              >
                <span>{label}</span>
                <ChevronRight className='h-4 w-4 stroke-[2.5]' />
              </Link>
            </div>
          </div>
        </Container>
      </SectionFrame>
    </section>
  );
}

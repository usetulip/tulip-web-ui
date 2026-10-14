'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import faqsData from '@/data/faqs.json';
import { Container } from '@/components/layout/Container';
import { SectionFrame } from '@/components/layout/SectionFrame';
import { HelpCircle, ChevronDown, ChevronRight } from 'lucide-react';

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.15 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section ref={sectionRef} id='faqs' className='relative overflow-hidden'>
      {/* Background Glow */}
      <div
        className='absolute inset-0 pointer-events-none overflow-hidden -z-10'
        aria-hidden='true'
      >
        <div
          className='absolute top-1/2 -left-40 -translate-y-1/2 w-[700px] h-[500px] opacity-40'
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(249, 117, 24, 0.12) 0%, rgba(250, 132, 132, 0.1) 40%, transparent 80%)',
          }}
        />
      </div>

      <SectionFrame
        showTopBorder={true}
        showBottomBorder={false}
        showCorners={true}
      >
        <Container className='py-14 md:py-20'>
          <div
            className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start transition-all duration-700 ease-out ${
              inView
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-12 pointer-events-none'
            }`}
          >
            {/* Left Column: Title, Subtitle, CTA Button */}
            <div className='lg:col-span-5 flex flex-col items-start lg:sticky lg:top-28'>
              <div className='inline-flex items-center gap-2 rounded-full border border-[rgba(30,13,1,0.08)] bg-white px-3.5 py-1 shadow-sm mb-6'>
                <HelpCircle className='h-3.5 w-3.5 text-[#f97518]' />
                <span className='text-xs sm:text-sm font-medium text-[#1e0d01]/80'>
                  {faqsData.badge}
                </span>
              </div>

              <h2 className='text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-[#1e0d01] font-heading mb-4 leading-[1.15]'>
                {faqsData.title}
              </h2>

              <p className='text-sm sm:text-base text-[#1e0d01]/70 leading-relaxed mb-8 max-w-md'>
                {faqsData.description}
              </p>

              <Link
                href='/contact'
                className='inline-flex items-center gap-1.5 rounded-full bg-[#f97518] hover:bg-[#e65f00] text-white px-7 py-3 text-sm font-semibold shadow-md shadow-[#f97518]/25 transition-all'
              >
                <span>Get Started</span>
                <ChevronRight className='h-4 w-4 stroke-[2.5]' />
              </Link>
            </div>

            {/* Right Column: Accordion Items */}
            <div className='lg:col-span-7 flex flex-col gap-3.5 w-full'>
              {faqsData.items.map((item) => {
                const isOpen = openId === item.id;

                return (
                  <div
                    key={item.id}
                    className='rounded-2xl bg-white border border-[rgba(30,13,1,0.08)] shadow-2xs overflow-hidden transition-all duration-200'
                  >
                    <button
                      onClick={() => toggleItem(item.id)}
                      className='w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer select-none'
                      aria-expanded={isOpen}
                    >
                      <span className='text-base sm:text-lg font-bold text-[#1e0d01] font-heading leading-snug'>
                        {item.question}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 text-neutral-500 transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    <div
                      className={`grid transition-all duration-300 ease-in-out ${
                        isOpen
                          ? 'grid-rows-[1fr] opacity-100'
                          : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className='overflow-hidden'>
                        <p className='px-5 sm:px-6 pb-5 sm:pb-6 pt-0 text-sm sm:text-base text-[#1e0d01]/70 leading-relaxed'>
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </SectionFrame>
    </section>
  );
}

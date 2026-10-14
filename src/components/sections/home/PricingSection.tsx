'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import homeData from '@/data/home.json';
import { Container } from '@/components/layout/Container';
import { SectionFrame } from '@/components/layout/SectionFrame';
import { Flame, Check, Users, ChevronRight } from 'lucide-react';

export function PricingSection() {
  const { pricing } = homeData;
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

  return (
    <section ref={sectionRef} id='pricing' className='relative overflow-hidden'>
      <SectionFrame
        showTopBorder={true}
        showBottomBorder={false}
        showCorners={true}
      >
        <Container className='py-14 md:py-20'>
          {/* Header */}
          <div className='flex flex-col items-center text-center max-w-3xl mx-auto mb-14 md:mb-20'>
            <div className='inline-flex items-center gap-2 rounded-full border border-[rgba(30,13,1,0.08)] bg-white px-3.5 py-1 shadow-sm mb-6'>
              <Flame className='h-3.5 w-3.5 text-[#f97518] fill-[#f97518]' />
              <span className='text-xs sm:text-sm font-medium text-[#1e0d01]/80'>
                {pricing.badge}
              </span>
            </div>

            <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1e0d01] font-heading mb-3 leading-tight'>
              {pricing.title}
            </h2>
            <p className='text-base sm:text-lg text-[#1e0d01]/70 leading-relaxed'>
              {pricing.description}
            </p>
          </div>

          {/* 3 Pricing Cards Grid */}
          <div
            className={`grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch transition-all duration-700 ease-out ${
              inView
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-12 pointer-events-none'
            }`}
          >
            {pricing.plans.map((plan) => {
              const isPopular = plan.popular;

              return (
                <div
                  key={plan.id}
                  className={`rounded-[28px] bg-white p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ${
                    isPopular
                      ? 'border-2 border-[#f97518]/70 shadow-xl relative'
                      : 'border border-[rgba(30,13,1,0.08)] shadow-xs'
                  }`}
                >
                  <div>
                    {/* Top Header Card Box */}
                    <div
                      className={`rounded-2xl p-6 mb-8 border ${
                        isPopular
                          ? 'bg-[#fff8f3] border-[#f97518]/25'
                          : 'bg-neutral-50/80 border-neutral-200/50'
                      }`}
                    >
                      <div className='flex items-center justify-between gap-2 mb-2'>
                        <h3 className='text-lg font-bold text-[#1e0d01] font-heading'>
                          {plan.name}
                        </h3>
                        {plan.badge && (
                          <span className='rounded-full bg-white px-2.5 py-0.5 text-xs font-semibold text-neutral-700 border border-neutral-200 shadow-2xs'>
                            {plan.badge}
                          </span>
                        )}
                      </div>

                      <div className='flex items-baseline gap-1.5 mb-2'>
                        <span className='text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1e0d01] font-heading'>
                          {plan.price}
                        </span>
                        <span className='text-xs sm:text-sm font-normal text-neutral-500'>
                          {plan.period}
                        </span>
                      </div>

                      <p className='text-xs font-medium text-neutral-500 mb-6'>
                        {plan.description}
                      </p>

                      {isPopular ? (
                        <Link
                          href={plan.buttonHref}
                          className='flex items-center justify-center gap-1.5 w-full rounded-full bg-[#f97518] hover:bg-[#e65f00] text-white py-3 px-4 text-xs sm:text-sm font-bold shadow-md shadow-[#f97518]/25 transition-all'
                        >
                          <span>{plan.buttonText}</span>
                          <ChevronRight className='h-4 w-4 stroke-[2.5]' />
                        </Link>
                      ) : (
                        <Link
                          href={plan.buttonHref}
                          className='flex items-center justify-center gap-1.5 w-full rounded-full bg-white hover:bg-neutral-50 text-[#f97518] border border-[#f97518]/30 py-3 px-4 text-xs sm:text-sm font-bold shadow-2xs transition-all'
                        >
                          <span>{plan.buttonText}</span>
                          <Users className='h-3.5 w-3.5 stroke-[#f97518]' />
                        </Link>
                      )}
                    </div>

                    {/* What's Included Feature List */}
                    <div className='px-2'>
                      <p className='text-xs font-bold text-[#1e0d01] mb-3'>
                        What&apos;s Included:
                      </p>

                      <ul className='space-y-0 divide-y divide-neutral-100'>
                        {plan.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className='flex items-center gap-3 py-3 text-xs sm:text-sm text-[#1e0d01]/80 font-medium'
                          >
                            <Check className='h-4 w-4 text-neutral-600 shrink-0 stroke-[2]' />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </SectionFrame>
    </section>
  );
}

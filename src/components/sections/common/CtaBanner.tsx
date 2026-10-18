import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import homeData from '@/data/home.json';
import { withAccent } from '@/components/layout/SectionHead';

export function CtaBanner() {
  const { ctaBanner } = homeData;

  return (
    <section aria-labelledby='cta-title' className='px-5 sm:px-8 pt-28 md:pt-40 pb-16 text-center'>
      <h2
        id='cta-title'
        className='mx-auto max-w-4xl font-serif font-light text-[clamp(2.6rem,6.4vw,5.5rem)] leading-[0.98] tracking-[-0.025em] text-ink'
      >
        {withAccent(ctaBanner.title, ctaBanner.accent)}
      </h2>
      <p className='mx-auto mt-6 max-w-md text-[16px] leading-relaxed text-ink/70'>{ctaBanner.description}</p>
      <Link
        href={ctaBanner.cta.href}
        className='mt-9 inline-flex items-center gap-2 rounded-full bg-[#f97518] px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-[#e65f00]'
      >
        {ctaBanner.cta.label}
        <ArrowUpRight className='h-4 w-4' />
      </Link>
    </section>
  );
}

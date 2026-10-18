import React from 'react';
import homeData from '@/data/home.json';
import { SectionHead } from '@/components/layout/SectionHead';
import { TasteDashboardDemo } from '@/components/sections/home/TasteDashboardDemo';

export function DemoSection() {
  const { demo } = homeData;

  return (
    <section id='demo' aria-label={demo.title}>
      <SectionHead title={demo.title} accent={demo.accent}>
        <p className='mt-5 max-w-xl text-[15px] leading-relaxed text-ink/70'>{demo.description}</p>
      </SectionHead>
      <div className='px-5 sm:px-8'>
        <div className='rounded-[24px] bg-white p-2 sm:p-3'>
          <TasteDashboardDemo />
        </div>
      </div>
    </section>
  );
}

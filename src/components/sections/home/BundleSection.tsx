import React from 'react';
import homeData from '@/data/home.json';
import { SectionHead } from '@/components/layout/SectionHead';
import { BundleIcon } from '@/components/sections/home/BundleIcon';

// Each deliverable is shown as a specimen of the thing itself, drawn in code.

function FigmaSpecimen() {
  const rows = [
    { name: 'color/primary', value: '#F97518', swatch: '#f97518' },
    { name: 'color/ink', value: '#1E0D01', swatch: '#1e0d01' },
    { name: 'color/paper', value: '#EDECE7', swatch: '#edece7' },
    { name: 'radius/lg', value: '16' },
    { name: 'space/4', value: '16' },
  ];
  return (
    <div className='flex h-full items-center justify-center bg-paper-deep p-6 sm:p-10'>
      <div className='w-full max-w-sm rounded-xl bg-white text-[12px] shadow-[0_1px_0_rgba(30,13,1,0.06)]'>
        <div className='flex items-center justify-between border-b border-rule px-3 py-2 font-semibold text-ink'>
          Local variables <span className='font-mono text-[10px] font-normal text-ink/50'>Tulip / Light</span>
        </div>
        {rows.map((row) => (
          <div key={row.name} className='flex items-center justify-between border-b border-rule px-3 py-2 last:border-b-0'>
            <span className='font-mono text-ink/80'>{row.name}</span>
            <span className='flex items-center gap-2 font-mono text-ink/60'>
              {row.swatch && <span className='h-3 w-3 border border-rule' style={{ backgroundColor: row.swatch }} />}
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CodeSpecimen() {
  return (
    <div className='flex h-full items-center bg-ink p-6 sm:p-10'>
      <pre className='font-mono text-[12px] sm:text-[13px] leading-[1.9] text-paper/80 overflow-x-auto' data-lenis-prevent>
        <span className='text-paper/40'>{'// components/ui/pricing-card.tsx'}</span>
        {'\n'}
        <span className='text-[#f97518]'>export function</span> PricingCard() {'{'}
        {'\n  '}
        <span className='text-[#f97518]'>return</span> (
        {'\n    '}&lt;Card className=<span className='text-[#a5ff00]'>&quot;rounded-lg bg-card&quot;</span>&gt;
        {'\n      '}&lt;Badge&gt;Most popular&lt;/Badge&gt;
        {'\n      '}&lt;Button variant=<span className='text-[#a5ff00]'>&quot;primary&quot;</span>&gt;Get started&lt;/Button&gt;
        {'\n    '}&lt;/Card&gt;
        {'\n  '});{'\n'}
        {'}'}
      </pre>
    </div>
  );
}

function TypeSpecimen() {
  return (
    <div className='flex h-full items-end justify-between gap-6 bg-[#ffe7d2] p-6 sm:p-10 text-ink'>
      <span className='font-serif font-light text-[clamp(6rem,14vw,11rem)] leading-[0.8] tracking-[-0.03em]'>A<em className='italic'>a</em></span>
      <ul className='space-y-1 pb-2 text-right font-mono text-[11px] text-ink/80'>
        {['72 / display', '48 / h1', '32 / h2', '20 / lead', '15 / body', '11 / label'].map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ul>
    </div>
  );
}

function IconsSpecimen() {
  const glyphs = [
    <circle key='c' cx='12' cy='12' r='7' />,
    <rect key='r' x='5' y='5' width='14' height='14' />,
    <path key='t' d='M12 4l8 15H4z' />,
    <path key='p' d='M5 19V5h9a5 5 0 010 10H5' />,
    <path key='x' d='M5 5l14 14M19 5L5 19' />,
    <path key='a' d='M4 12h14M13 6l6 6-6 6' />,
    <path key='h' d='M5 19V9l7-5 7 5v10z' />,
    <path key='s' d='M12 3v18M3 12h18M6 6l12 12M18 6L6 18' />,
  ];
  return (
    <div className='grid h-full grid-cols-4 bg-white'>
      {glyphs.map((glyph, i) => (
        <div key={i} className='flex items-center justify-center border-b border-r border-rule [&:nth-child(4n)]:border-r-0'>
          <svg viewBox='0 0 24 24' className='h-8 w-8 sm:h-10 sm:w-10' fill='none' stroke='#1e0d01' strokeWidth='1.75' strokeLinejoin='round' strokeLinecap='square' aria-hidden='true'>
            {glyph}
          </svg>
        </div>
      ))}
    </div>
  );
}

function HandoffSpecimen() {
  return (
    <div className='flex h-full flex-col sm:flex-row items-start sm:items-end justify-between gap-6 bg-paper-deep p-6 sm:p-10 text-ink'>
      <pre className='font-mono text-[12px] sm:text-[13px] leading-[1.9] text-ink/75'>
        {'tulip-handoff/\n├─ figma/Master.fig\n├─ repo/            '}
        <span className='text-ink/45'>Next.js + Tailwind</span>
        {'\n├─ tokens.json\n└─ layouts/         '}
        <span className='text-ink/45'>4 pages</span>
      </pre>
      <p className='font-serif italic font-light text-[clamp(4rem,10vw,8rem)] leading-[0.8] text-[#d14f0a]'>48h</p>
    </div>
  );
}

const SPECIMENS: Record<string, () => React.JSX.Element> = {
  figma: FigmaSpecimen,
  code: CodeSpecimen,
  type: TypeSpecimen,
  icons: IconsSpecimen,
  handoff: HandoffSpecimen,
};

export function BundleSection() {
  const { bundle } = homeData;

  return (
    <section id='bundle' aria-label={bundle.title}>
      <SectionHead title={bundle.title} accent={bundle.accent}>
        <p className='mt-5 max-w-xl text-[15px] leading-relaxed text-ink/70'>{bundle.description}</p>
      </SectionHead>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 px-5 sm:px-8'>
        {bundle.items.map((item, i) => {
          const Specimen = SPECIMENS[item.specimen] ?? FigmaSpecimen;
          const isWide = i === bundle.items.length - 1 && bundle.items.length % 2 === 1;
          return (
            <article
              key={item.id}
              className={`group bundle-card flex flex-col overflow-hidden rounded-[22px] bg-white ${isWide ? 'md:col-span-2' : ''}`}
            >
              <div className={isWide ? 'aspect-[4/3] sm:aspect-[3/1]' : 'aspect-[4/3]'}>
                <Specimen />
              </div>
              <div className='flex items-start gap-4 px-6 sm:px-8 py-6'>
                <BundleIcon name={item.icon} />
                <div className='min-w-0 flex-1'>
                  <div className='flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1'>
                    <h3 className='text-lg font-semibold tracking-[-0.015em] text-ink'>{item.title}</h3>
                    <span className='text-xs text-ink/50'>{item.meta}</span>
                  </div>
                  <p className='mt-1.5 max-w-xl text-sm leading-relaxed text-ink/70'>{item.description}</p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

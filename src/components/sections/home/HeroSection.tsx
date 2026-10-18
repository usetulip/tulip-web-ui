import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import homeData from '@/data/home.json';
import { TulipAscii } from '@/components/sections/home/TulipAscii';

// Callout geometry on a 1080x600 stage. The tulip fills the stage height, centered.
// Anchors sit a little inside the petal and leaf edges so they stay on the flower as it turns.
// anchor: point on the flower; elbow: where the leader line turns; box: label's top-left.
const STAGE = { w: 1080, h: 600 };
const BOX_W = 214;
const GEOMETRY: Record<string, { anchor: [number, number]; elbow: [number, number]; box: [number, number]; side: 'left' | 'right' }> = {
  color: { anchor: [505, 160], elbow: [440, 118], box: [56, 96], side: 'left' },
  radius: { anchor: [494, 404], elbow: [430, 402], box: [56, 380], side: 'left' },
  contrast: { anchor: [612, 200], elbow: [700, 162], box: [810, 140], side: 'right' },
  mcp: { anchor: [586, 462], elbow: [690, 452], box: [810, 430], side: 'right' },
};

function Callout({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className='rounded-[4px] border border-ink/80 bg-white/85 backdrop-blur-sm text-left'>
      <p className='truncate border-b border-ink/15 px-3 py-1.5 font-mono text-[10.5px] text-ink/70'>{label}</p>
      <div className='px-3 py-2'>
        <p className='font-serif text-[1.05rem] sm:text-[1.35rem] leading-tight text-ink'>{value}</p>
        <p className='mt-0.5 hidden sm:block text-[11.5px] text-ink/60'>{note}</p>
      </div>
    </div>
  );
}

export function HeroSection() {
  const { hero } = homeData;
  const [before, after] = hero.title.split('AI-driven');

  return (
    <section aria-labelledby='hero-title' className='relative overflow-hidden px-5 sm:px-8 pt-10 md:pt-16 pb-10'>
      <div className='flex justify-center'>
        <Link
          href='/docs/architecture'
          className='group inline-flex items-center gap-2.5 rounded-full border border-rule bg-white/70 py-1 pl-1 pr-3.5 text-[13px] text-ink/75 backdrop-blur-sm transition-colors hover:border-ink/30 hover:text-ink'
        >
          <span className='rounded-full bg-[#ffe7d2] px-2 py-0.5 text-[12px] font-medium text-ink'>{hero.badge.tag}</span>
          {hero.badge.text}
          <ArrowUpRight className='h-3.5 w-3.5 text-ink/45 transition-colors group-hover:text-ink' aria-hidden='true' />
        </Link>
      </div>

      <h1
        id='hero-title'
        className='mx-auto mt-7 max-w-5xl text-center font-serif font-light text-[clamp(2.9rem,7.4vw,6.75rem)] leading-[0.96] tracking-[-0.025em] text-ink'
      >
        {before}
        <em className='italic whitespace-nowrap'>AI-driven</em>
        {after}
      </h1>

      <div className='mx-auto mt-7 max-w-xl text-center'>
        <p className='text-[16px] leading-relaxed text-ink/70'>{hero.description}</p>
        <div className='mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3'>
          <Link
            href={hero.cta.href}
            className='inline-flex items-center gap-2 rounded-full bg-[#f97518] px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-[#e65f00]'
          >
            {hero.cta.label}
            <ArrowUpRight className='h-4 w-4' />
          </Link>
          <Link
            href='/docs'
            className='font-serif italic text-lg text-ink underline decoration-ink/25 underline-offset-[6px] hover:decoration-ink'
          >
            Read the docs
          </Link>
        </div>
      </div>

      {/* Desktop: annotated specimen */}
      <div className='relative mx-auto mt-14 hidden lg:block max-w-[1080px] aspect-[1080/600]'>
        {/* Centering lives on the wrapper so the load animation's transform can't override it */}
        <div className='absolute inset-y-0 left-1/2 -translate-x-1/2'>
          <TulipAscii className='animate-tulip h-full aspect-[400/520]' />
        </div>

        <svg
          viewBox={`0 0 ${STAGE.w} ${STAGE.h}`}
          className='pointer-events-none absolute inset-0 h-full w-full'
          aria-hidden='true'
        >
          {hero.callouts.map((c, i) => {
            const g = GEOMETRY[c.id];
            const end = g.side === 'left' ? g.box[0] + BOX_W : g.box[0];
            const y = g.box[1] + 22;
            return (
              <g key={c.id}>
                <polyline
                  points={`${g.anchor.join(',')} ${g.elbow[0]},${y} ${end},${y}`}
                  fill='none'
                  stroke='#1e0d01'
                  strokeOpacity='0.55'
                  strokeWidth='1'
                  vectorEffect='non-scaling-stroke'
                  pathLength={1}
                  className='animate-callout-line'
                  style={{ animationDelay: `${700 + i * 140}ms` }}
                />
                <rect
                  x={g.anchor[0] - 4}
                  y={g.anchor[1] - 4}
                  width='8'
                  height='8'
                  fill='#fff'
                  stroke='#1e0d01'
                  strokeWidth='1.25'
                  vectorEffect='non-scaling-stroke'
                />
              </g>
            );
          })}
        </svg>

        {hero.callouts.map((c, i) => {
          const g = GEOMETRY[c.id];
          return (
            <div
              key={c.id}
              className='animate-callout absolute'
              style={{
                left: `${(g.box[0] / STAGE.w) * 100}%`,
                top: `${(g.box[1] / STAGE.h) * 100}%`,
                width: `${(BOX_W / STAGE.w) * 100}%`,
                animationDelay: `${1100 + i * 140}ms`,
              }}
            >
              <Callout label={c.label} value={c.value} note={c.note} />
            </div>
          );
        })}
      </div>

      {/* Phones and tablets: flower, then the specs as a grid */}
      <div className='lg:hidden mt-12'>
        <TulipAscii className='animate-tulip mx-auto h-[300px] sm:h-[380px] aspect-[400/520]' />
        <div className='mx-auto mt-6 grid max-w-xl grid-cols-2 gap-2.5 sm:gap-3'>
          {hero.callouts.map((c) => (
            <Callout key={c.id} label={c.label} value={c.value} note={c.note} />
          ))}
        </div>
      </div>

    </section>
  );
}

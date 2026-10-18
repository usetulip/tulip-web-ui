'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Minus, Plus } from 'lucide-react';
import faqsData from '@/data/faqs.json';
import { SectionLabel, withAccent } from '@/components/layout/SectionHead';

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(faqsData.items[0]?.id ?? null);

  return (
    <section id='faqs' aria-labelledby='faq-title' className='px-5 sm:px-8 pt-24 md:pt-32'>
      <SectionLabel>FAQ</SectionLabel>
      <div className='mt-10 md:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-10'>
        <div className='lg:col-span-5 lg:sticky lg:top-24 lg:self-start'>
          <h2
            id='faq-title'
            className='font-serif font-light text-[clamp(2.4rem,5vw,4.25rem)] leading-[1.02] tracking-[-0.02em] text-ink'
          >
            {withAccent(faqsData.title, faqsData.accent)}
          </h2>
          <p className='mt-5 max-w-sm text-[15px] leading-relaxed text-ink/70'>{faqsData.description}</p>
          <Link
            href='/contact'
            className='mt-6 inline-block font-serif italic text-lg text-ink underline decoration-ink/25 underline-offset-[6px] hover:decoration-ink'
          >
            Ask us directly
          </Link>
        </div>

        <ul className='lg:col-span-7 border-t border-rule'>
          {faqsData.items.map((item) => {
            const isOpen = openId === item.id;
            const panelId = `${item.id}-panel`;
            return (
              <li key={item.id} className='border-b border-rule'>
                <h3>
                  <button
                    type='button'
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className='flex w-full items-center gap-6 py-5 text-left'
                  >
                    <span className='flex-1 text-base sm:text-[17px] font-medium text-ink'>{item.question}</span>
                    <span className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-rule text-ink' aria-hidden='true'>
                      {isOpen ? <Minus className='h-3.5 w-3.5' /> : <Plus className='h-3.5 w-3.5' />}
                    </span>
                  </button>
                </h3>
                <div id={panelId} hidden={!isOpen} className='pb-6 pr-14'>
                  <p className='max-w-xl text-[15px] leading-relaxed text-ink/70'>{item.answer}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

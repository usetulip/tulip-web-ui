import React from 'react';
import homeData from '@/data/home.json';
import { SectionHead, ACCENT_TEXT } from '@/components/layout/SectionHead';
import { BriefIllustration, AuditIllustration } from '@/components/sections/home/SprintIllustrations';

const visuals: Record<string, () => React.JSX.Element> = {
  brief: BriefIllustration,
  audit: AuditIllustration,
};

export function ProcessSection() {
  const { process, sprintWorkflow } = homeData;

  return (
    <section id='process' aria-label={process.title}>
      <SectionHead title={process.title} accent={process.accent}>
        <p className='mt-5 max-w-xl text-[15px] leading-relaxed text-ink/70'>{sprintWorkflow.description}</p>
      </SectionHead>

      <ol className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12 px-5 sm:px-8'>
        {process.steps.map((step, i) => (
          <li
            key={step.title}
            className='flex flex-col border-t border-ink/80 pt-5'
          >
            <div className='flex-1'>
              <span className={`font-serif italic font-light text-[3.25rem] leading-none ${ACCENT_TEXT}`}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className='mt-5 text-lg font-semibold tracking-[-0.015em] text-ink'>{step.title}</h3>
              <p className='mt-2 text-sm leading-relaxed text-ink/70'>{step.body}</p>
            </div>
            <p className='mt-5 flex justify-between text-xs text-ink/50'>
              <span>{step.meta}</span>
              <span>{step.owner}</span>
            </p>
          </li>
        ))}
      </ol>

      <div className='mt-16 grid grid-cols-1 md:grid-cols-2 gap-4 px-5 sm:px-8'>
        {sprintWorkflow.cards.map((card) => {
          const Visual = visuals[card.visual];
          return (
            <figure key={card.phase} className='overflow-hidden rounded-[22px] bg-white'>
              <div className='bg-paper-deep p-6 sm:p-10'>
                <div className='mx-auto max-w-[440px] aspect-[4/3] overflow-hidden rounded-xl bg-white'>
                  <Visual />
                </div>
              </div>
              <figcaption className='flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-6 sm:px-8 py-5'>
                <span className='text-base font-semibold tracking-[-0.01em] text-ink'>{card.title}</span>
                <span className='text-xs text-ink/50'>{card.phase}</span>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
}

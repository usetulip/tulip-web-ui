import React from 'react';
import { ArrowUpRight, Plus } from 'lucide-react';
import homeData from '@/data/home.json';
import { SectionHead } from '@/components/layout/SectionHead';
import { ApplyButton } from '@/components/modals/ApplyModal';
import { FeatureInfo } from '@/components/sections/home/FeatureInfo';

type Feature = string | { text: string; info: { title: string; items: string[] } };

export function PricingSection() {
  const { pricing } = homeData;
  const { oneOff } = pricing;

  return (
    <section id='pricing' aria-label={pricing.title}>
      <SectionHead label='Pricing' title={pricing.title} accent={pricing.accent}>
        <p className='mt-5 max-w-xl text-[15px] leading-relaxed text-ink/70'>{pricing.description}</p>
      </SectionHead>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 px-5 sm:px-8'>
        {pricing.plans.map((plan) => (
          <article
            key={plan.id}
            className={`relative flex flex-col rounded-[22px] bg-white ${plan.popular ? 'ring-1 ring-ink' : ''}`}
          >
            <div className='flex items-baseline justify-between gap-4 px-6 sm:px-8 pt-7'>
              <h3 className='text-lg font-semibold tracking-[-0.015em] text-ink'>{plan.name}</h3>
              {plan.badge && (
                <span className='rounded-full bg-[#ffe7d2] px-2.5 py-0.5 text-xs font-medium text-ink'>{plan.badge}</span>
              )}
            </div>
            <p className='px-6 sm:px-8 mt-1 text-sm text-ink/60'>{plan.description}</p>

            <p className='px-6 sm:px-8 mt-8 flex items-baseline gap-2 text-ink'>
              <span className='font-serif font-light text-[clamp(3rem,4.6vw,4rem)] leading-none tracking-[-0.02em]'>{plan.price}</span>
              <span className='text-sm text-ink/60'>{plan.period}</span>
            </p>
            <p className='px-6 sm:px-8 mt-2 text-xs text-ink/55'>{plan.setup}</p>

            <ul className='mt-8 flex-1 space-y-2.5 px-6 sm:px-8'>
              {(plan.features as Feature[]).map((feature) => {
                const text = typeof feature === 'string' ? feature : feature.text;
                return (
                  <li key={text} className='relative flex items-start gap-3 text-sm leading-snug text-ink/75'>
                    <Plus className='mt-[3px] h-3.5 w-3.5 shrink-0 text-ink/45' aria-hidden='true' />
                    <span className='inline-flex items-start'>
                      {typeof feature === 'string' ? (
                        text
                      ) : (
                        <>
                          <span className='font-medium text-ink'>{text}</span>
                          <FeatureInfo label={text} title={feature.info.title} items={feature.info.items} />
                        </>
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>

            <div className='px-6 sm:px-8 pt-8 pb-7'>
              <ApplyButton
                tier={plan.name}
                className={`flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold transition-colors cursor-pointer ${
                  plan.popular
                    ? 'bg-[#f97518] text-white hover:bg-[#e65f00]'
                    : 'border border-rule text-ink hover:border-ink'
                }`}
              >
                {plan.buttonText}
                <ArrowUpRight className='h-4 w-4' />
              </ApplyButton>
            </div>
          </article>
        ))}
      </div>

      <div className='mt-4 px-5 sm:px-8'>
        <div className='flex flex-col gap-5 rounded-[22px] border border-rule px-6 sm:px-8 py-6 md:flex-row md:items-center md:justify-between'>
          <div className='max-w-2xl'>
            <p className='flex flex-wrap items-baseline gap-x-3 gap-y-1 text-ink'>
              <span className='text-lg font-semibold tracking-[-0.015em]'>{oneOff.name}</span>
              <span className='font-serif text-2xl font-light tracking-[-0.02em]'>{oneOff.price}</span>
              <span className='text-sm text-ink/60'>{oneOff.period}</span>
            </p>
            <p className='mt-1.5 text-sm leading-relaxed text-ink/65'>{oneOff.description}</p>
          </div>
          <ApplyButton
            tier={oneOff.name}
            className='flex shrink-0 items-center justify-center gap-2 rounded-full border border-rule px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink cursor-pointer'
          >
            {oneOff.buttonText}
            <ArrowUpRight className='h-4 w-4' />
          </ApplyButton>
        </div>
      </div>
    </section>
  );
}

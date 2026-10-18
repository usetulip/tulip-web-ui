import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Plus } from 'lucide-react';
import homeData from '@/data/home.json';
import { SectionHead } from '@/components/layout/SectionHead';

export function PricingSection() {
  const { pricing } = homeData;

  return (
    <section id='pricing' aria-label={pricing.title}>
      <SectionHead title={pricing.title} accent={pricing.accent}>
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

            <ul className='mt-8 flex-1 space-y-2.5 px-6 sm:px-8'>
              {plan.features.map((feature) => (
                <li key={feature} className='flex items-center gap-3 text-sm text-ink/75'>
                  <Plus className='h-3.5 w-3.5 shrink-0 text-ink/45' aria-hidden='true' />
                  {feature}
                </li>
              ))}
            </ul>

            <div className='px-6 sm:px-8 pt-8 pb-7'>
              <Link
                href={plan.buttonHref}
                className={`flex items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold transition-colors ${
                  plan.popular
                    ? 'bg-[#f97518] text-ink hover:bg-[#e65f00]'
                    : 'border border-rule text-ink hover:border-ink'
                }`}
              >
                {plan.buttonText}
                <ArrowUpRight className='h-4 w-4' />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

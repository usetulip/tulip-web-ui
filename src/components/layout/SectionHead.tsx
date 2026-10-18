import React from 'react';
import { cn } from '@/lib/utils';

interface SectionHeadProps {
  /** Short name for the section, shown above the rule, e.g. "Live demo". */
  label?: string;
  title: string;
  /** Part of the title to set in italic. */
  accent?: string;
  className?: string;
  children?: React.ReactNode;
}

// Accent text for numerals and small emphasis on paper: #d14f0a passes 3:1 for large text.
export const ACCENT_TEXT = 'text-[#d14f0a]';

export function withAccent(title: string, accent?: string) {
  if (!accent || !title.includes(accent)) return title;
  const [before, after] = title.split(accent);
  return (
    <>
      {before}
      <em className='italic'>{accent}</em>
      {after}
    </>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className='flex items-center gap-2 border-t border-rule pt-4 text-[13px] text-ink/55'>
      <span className='h-1.5 w-1.5 rounded-full bg-[#f97518]' aria-hidden='true' />
      {children}
    </p>
  );
}

export function SectionHead({ label, title, accent, className, children }: SectionHeadProps) {
  return (
    <div className={cn('px-5 sm:px-8 pt-24 md:pt-32 pb-12 md:pb-16', className)}>
      {label && <SectionLabel>{label}</SectionLabel>}
      <h2 className={cn('max-w-4xl font-serif font-light text-[clamp(2.4rem,5vw,4.25rem)] leading-[1.02] tracking-[-0.02em] text-ink', label && 'mt-10 md:mt-12')}>
        {withAccent(title, accent)}
      </h2>
      <div className='max-w-4xl'>{children}</div>
    </div>
  );
}

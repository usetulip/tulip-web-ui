import React from 'react';
import { cn } from '@/lib/utils';

interface SectionHeadProps {
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

export function SectionHead({ title, accent, className, children }: SectionHeadProps) {
  return (
    <div className={cn('px-5 sm:px-8 pt-24 md:pt-32 pb-12 md:pb-16 max-w-4xl', className)}>
      <h2 className='font-serif font-light text-[clamp(2.4rem,5vw,4.25rem)] leading-[1.02] tracking-[-0.02em] text-ink'>
        {withAccent(title, accent)}
      </h2>
      {children}
    </div>
  );
}

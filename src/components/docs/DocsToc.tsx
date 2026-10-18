'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import type { DocHeading } from '@/lib/docs';

interface DocsTocProps {
  headings: DocHeading[];
}

const SCROLL_OFFSET = 32;

function scrollToHeading(id: string) {
  const target = document.getElementById(id);
  if (!target) return;

  const lenis = (window as unknown as { __lenis?: { scrollTo: (t: HTMLElement, o?: object) => void } }).__lenis;
  if (lenis) {
    lenis.scrollTo(target, { duration: 1, offset: -SCROLL_OFFSET });
  } else {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  window.history.replaceState(null, '', `#${id}`);
}

export function DocsToc({ headings }: DocsTocProps) {
  const [activeId, setActiveId] = useState<string | null>(headings[0]?.id ?? null);

  useEffect(() => {
    setActiveId(headings[0]?.id ?? null);
    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: '0px 0px -70% 0px' }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <aside className='hidden xl:block w-52 shrink-0'>
      <div className='sticky top-8'>
        <p className='mb-3 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground'>
          On this page
        </p>
        <ul className='space-y-1 border-l border-border'>
          {headings.map((heading) => (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                onClick={(event) => {
                  event.preventDefault();
                  scrollToHeading(heading.id);
                }}
                className={cn(
                  '-ml-px block border-l py-1 text-[13px] leading-snug transition-colors',
                  heading.level === 3 ? 'pl-6' : 'pl-3',
                  activeId === heading.id
                    ? 'border-primary text-foreground font-medium'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                )}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

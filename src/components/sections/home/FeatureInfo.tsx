'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import { Info } from 'lucide-react';

type FeatureInfoProps = {
  label: string;
  title: string;
  items: string[];
};

// Info icon beside a pricing feature. Hovering previews the details on desktop;
// a click or tap pins them open. Escape or a click outside closes.
export function FeatureInfo({ label, title, items }: FeatureInfoProps) {
  const [hovered, setHovered] = useState(false);
  const [pinned, setPinned] = useState(false);
  const open = hovered || pinned;
  const panelId = useId();
  const rootRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setPinned(false);
        setHovered(false);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setPinned(false);
        setHovered(false);
      }
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <span
      ref={rootRef}
      className='static inline-flex'
      onMouseEnter={() => {
        if (matchMedia('(hover: hover)').matches) setHovered(true);
      }}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        type='button'
        aria-label={`What's included: ${label}`}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setPinned((value) => !value)}
        className='ml-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full text-ink/45 transition-colors hover:text-ink focus-visible:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f97518] cursor-pointer'
      >
        <Info className='h-3.5 w-3.5' aria-hidden='true' />
      </button>
      <span
        id={panelId}
        role='region'
        aria-label={title}
        hidden={!open}
        className='absolute left-0 right-0 top-full z-20 mt-2 rounded-2xl border border-rule bg-white p-4 text-left shadow-[0_12px_32px_rgba(30,13,1,0.12)]'
      >
        <span className='block text-[13px] font-semibold text-ink'>{title}</span>
        <ul className='mt-2.5 space-y-2'>
          {items.map((item) => (
            <li key={item} className='flex gap-2 text-[13px] leading-snug text-ink/75'>
              <span className='mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[#f97518]' aria-hidden='true' />
              {item}
            </li>
          ))}
        </ul>
      </span>
    </span>
  );
}

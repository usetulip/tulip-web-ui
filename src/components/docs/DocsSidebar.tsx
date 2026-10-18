'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { DocNavGroup } from '@/lib/docs';

interface DocsSidebarProps {
  groups: DocNavGroup[];
}

export function DocsSidebar({ groups }: DocsSidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const activeItem = groups
    .flatMap((group) => group.items)
    .find((item) => pathname === `/docs/${item.slug}`);

  // Close the mobile menu after navigating to a new page
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const nav = (
    <nav aria-label='Documentation' className='space-y-7'>
      {groups.map((group) => (
        <div key={group.title}>
          <p className='px-3 mb-2 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground'>
            {group.title}
          </p>
          <ul className='space-y-0.5'>
            {group.items.map((item) => {
              const href = `/docs/${item.slug}`;
              const isActive = pathname === href;

              return (
                <li key={item.slug}>
                  <Link
                    href={href}
                    aria-current={isActive ? 'page' : undefined}
                    className={cn(
                      'block rounded-lg px-3 py-2 text-sm transition-colors',
                      isActive
                        ? 'bg-card font-semibold text-foreground shadow-[0_1px_2px_rgba(30,13,1,0.06)] border border-border'
                        : 'border border-transparent text-muted-foreground hover:text-foreground hover:bg-card/60'
                    )}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );

  return (
    <>
      {/* Mobile: collapsible menu above the content */}
      <div className='lg:hidden mb-8'>
        <button
          type='button'
          onClick={() => setMobileOpen((open) => !open)}
          aria-expanded={mobileOpen}
          className='flex w-full items-center justify-between rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground'
        >
          <span className='flex items-center gap-2'>
            <BookOpen className='h-4 w-4 text-primary' />
            {activeItem?.title ?? 'Documentation'}
          </span>
          <ChevronDown
            className={cn('h-4 w-4 transition-transform', mobileOpen && 'rotate-180')}
          />
        </button>
        {mobileOpen && (
          <div className='mt-2 rounded-xl border border-border bg-card p-3'>{nav}</div>
        )}
      </div>

      {/* Desktop: sticky sidebar */}
      <aside className='hidden lg:block w-60 shrink-0'>
        <div
          data-lenis-prevent
          className='sticky top-8 max-h-[calc(100vh-4rem)] overflow-y-auto pb-8 pr-2'
        >
          {nav}
        </div>
      </aside>
    </>
  );
}

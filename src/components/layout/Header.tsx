'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import navigationData from '@/data/navigation.json';
import { Container } from '@/components/layout/Container';
import { ChevronRight, Menu, X } from 'lucide-react';

function scrollToTarget(target: string | number) {
  const lenis = (window as unknown as { __lenis?: { scrollTo: (t: string | number, o?: object) => void } }).__lenis;
  if (lenis) {
    lenis.scrollTo(target, { duration: 1.4, offset: 0 });
    return;
  }
  if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: 'smooth' });
    return;
  }
  document.querySelector(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const links = navigationData?.links || [];

  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    setMobileMenuOpen(false);

    const hashIndex = href.indexOf('#');
    const isOnHome = pathname === '/';

    if (href === '/' && isOnHome) {
      event.preventDefault();
      scrollToTarget(0);
      window.history.pushState(null, '', '/');
      return;
    }

    if (hashIndex !== -1 && isOnHome) {
      const hash = href.slice(hashIndex);
      if (hash.length > 1) {
        event.preventDefault();
        scrollToTarget(hash);
        window.history.pushState(null, '', hash);
      }
    }
  };

  return (
    <header className='relative z-50 w-full bg-transparent'>
      <div className='py-4 sm:py-5'>
        <Container>
          <div className='grid grid-cols-[1fr_auto_1fr] items-center gap-4'>
            {/* Logo */}
            <Link
              href='/'
              onClick={(e) => handleNavClick(e, '/')}
              className='flex items-center gap-2 group justify-self-start shrink-0'
            >
              <div className='relative h-6 w-6 sm:h-7 sm:w-7 shrink-0'>
                <Image
                  src='/logo.png'
                  alt='Tulip Logo'
                  fill
                  className='object-contain'
                  priority
                />
              </div>
              <span className='text-xl sm:text-2xl font-bold tracking-tight text-[#1e0d01] font-heading'>
                Tulip
              </span>
            </Link>

            {/* Desktop Navigation — centered */}
            <nav className='hidden md:flex items-center gap-5 lg:gap-8'>
              {links.map((link, idx) => {
                const label =
                  'label' in link ? link.label : (link as any).title;
                const href = link.href;

                return (
                  <Link
                    key={idx}
                    href={href}
                    onClick={(e) => handleNavClick(e, href)}
                    className='text-xs lg:text-sm font-medium text-[#1e0d01]/80 hover:text-[#1e0d01] transition-colors py-2'
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop CTA + Mobile toggle */}
            <div className='justify-self-end flex items-center shrink-0'>
              <Link
                href='/contact'
                className='hidden md:flex items-center gap-1.5 rounded-full bg-white hover:bg-white/90 px-4 lg:px-4.5 py-2 text-xs lg:text-sm font-semibold text-[#1e0d01] shadow-xs border border-[rgba(30,13,1,0.06)] hover:shadow-sm transition-all whitespace-nowrap'
              >
                <span>Start a Sprint</span>
                <ChevronRight className='h-3.5 w-3.5 stroke-[2.5]' />
              </Link>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className='md:hidden flex h-10 w-10 items-center justify-center rounded-xl bg-white/80 border border-neutral-200 text-[#1e0d01] shrink-0'
                aria-label='Toggle navigation menu'
              >
                {mobileMenuOpen ? (
                  <X className='h-5 w-5' />
                ) : (
                  <Menu className='h-5 w-5' />
                )}
              </button>
            </div>
          </div>
        </Container>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className='md:hidden border-b border-neutral-200/80 bg-white/95 backdrop-blur-md px-6 py-6 space-y-4 shadow-xl'>
          <nav className='flex flex-col space-y-3.5'>
            {links.map((link, idx) => {
              const label = 'label' in link ? link.label : (link as any).title;
              const href = link.href;

              return (
                <Link
                  key={idx}
                  href={href}
                  onClick={(e) => handleNavClick(e, href)}
                  className='text-sm font-semibold text-[#1e0d01] hover:text-[#f97518] py-1 transition-colors'
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className='pt-4 border-t border-neutral-100 flex flex-col gap-2.5'>
            <Link
              href='/contact'
              onClick={() => setMobileMenuOpen(false)}
              className='flex items-center justify-center gap-1.5 rounded-full bg-white py-2.5 text-xs font-bold text-[#1e0d01] shadow-xs border border-neutral-200'
            >
              <span>Start a Sprint</span>
              <ChevronRight className='h-3.5 w-3.5 stroke-[2.5]' />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

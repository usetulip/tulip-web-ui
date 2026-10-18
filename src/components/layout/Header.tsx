'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import navigationData from '@/data/navigation.json';
import { ArrowUpRight, Menu, X } from 'lucide-react';

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
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Once the page moves, the header picks up a blurred paper backing and a hairline
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
    <header
      className={`sticky top-0 z-50 w-full border-b transition-colors duration-300 ${
        scrolled || mobileMenuOpen ? 'border-rule bg-paper/80 backdrop-blur-md' : 'border-transparent bg-transparent'
      }`}
    >
      <div className='mx-auto max-w-[1280px]'>
        <div className='grid grid-cols-[1fr_auto] md:grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 sm:px-8 h-16'>
          {/* Logo */}
          <Link
            href='/'
            onClick={(e) => handleNavClick(e, '/')}
            className='flex items-center gap-2 justify-self-start'
          >
            <span className='relative h-5 w-5 shrink-0'>
              <Image src='/logo.png' alt='' fill className='object-contain' priority />
            </span>
            <span className='font-serif text-[1.4rem] leading-none tracking-[-0.01em] text-ink'>tulip</span>
          </Link>

          {/* Desktop navigation */}
          <nav aria-label='Main' className='hidden md:flex items-center gap-6 lg:gap-8'>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className='text-sm text-ink/70 hover:text-ink transition-colors'
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + mobile toggle */}
          <div className='justify-self-end flex items-center gap-2'>
            <Link
              href='/contact'
              className='hidden sm:inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper hover:bg-ink/85 transition-colors'
            >
              Start a sprint
              <ArrowUpRight className='h-3.5 w-3.5' />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className='md:hidden flex h-9 w-9 items-center justify-center rounded-full border border-rule text-ink'
              aria-label='Toggle navigation menu'
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className='h-4 w-4' /> : <Menu className='h-4 w-4' />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {mobileMenuOpen && (
          <nav aria-label='Main' className='md:hidden border-t border-rule px-5 py-4'>
            <ul className='divide-y divide-rule'>
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className='block py-3 font-serif text-2xl text-ink'
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href='/contact'
              onClick={() => setMobileMenuOpen(false)}
              className='mt-3 flex items-center justify-center gap-1.5 rounded-full bg-ink py-3 text-sm font-medium text-paper'
            >
              Start your 48-hour sprint
              <ArrowUpRight className='h-4 w-4' />
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}

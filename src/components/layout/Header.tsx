'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import navigationData from '@/data/navigation.json';
import { Container } from '@/components/layout/Container';
import { ChevronDown, ChevronRight, Menu, X, Users } from 'lucide-react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const links = navigationData?.links || [];

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setProductDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setProductDropdownOpen(false);
    }, 150);
  };

  return (
    <header className='relative z-50 w-full bg-transparent'>
      <div className='py-4 sm:py-5'>
        <Container>
          <div className='flex items-center justify-between gap-4'>
            {/* Logo */}
            <Link href='/' className='flex items-center gap-2 group shrink-0'>
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

            {/* Desktop Navigation */}
            <nav className='hidden md:flex items-center gap-5 lg:gap-8 shrink-0'>
              {links.map((link, idx) => {
                const label =
                  'label' in link ? link.label : (link as any).title;
                const href = link.href;

                return (
                  <Link
                    key={idx}
                    href={href}
                    className='text-xs lg:text-sm font-medium text-[#1e0d01]/80 hover:text-[#1e0d01] transition-colors py-2'
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Actions */}
            <div className='hidden md:flex items-center gap-2.5 lg:gap-3 shrink-0'>
              {/* Client Login Pill */}
              <Link
                href='https://tulipai.onrender.com/'
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-1.5 rounded-full border border-[rgba(30,13,1,0.12)] bg-transparent hover:bg-white/60 px-3.5 lg:px-4 py-2 text-xs lg:text-sm font-semibold text-[#f97518] transition-all shrink-0'
              >
                <span>Sign In</span>
                <Users className='h-3.5 w-3.5 stroke-[#f97518]' />
              </Link>

              {/* Start a Sprint Solid Button */}
              <Link
                href='/contact'
                className='flex items-center gap-1.5 rounded-full bg-white hover:bg-white/90 px-4 lg:px-4.5 py-2 text-xs lg:text-sm font-semibold text-[#1e0d01] shadow-xs border border-[rgba(30,13,1,0.06)] hover:shadow-sm transition-all shrink-0 whitespace-nowrap'
              >
                <span>Start a Sprint</span>
                <ChevronRight className='h-3.5 w-3.5 stroke-[2.5]' />
              </Link>
            </div>

            {/* Mobile Menu Button */}
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
                  onClick={() => setMobileMenuOpen(false)}
                  className='text-sm font-semibold text-[#1e0d01] hover:text-[#f97518] py-1 transition-colors'
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className='pt-4 border-t border-neutral-100 flex flex-col gap-2.5'>
            <Link
              href='https://tulipai.framer.website/'
              target='_blank'
              rel='noopener noreferrer'
              onClick={() => setMobileMenuOpen(false)}
              className='flex items-center justify-center gap-1.5 rounded-full border border-[#f97518]/30 bg-transparent py-2.5 text-xs font-bold text-[#f97518]'
            >
              <span>Client Login</span>
              <Users className='h-3.5 w-3.5 stroke-[#f97518]' />
            </Link>

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

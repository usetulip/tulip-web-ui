'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import footerData from '@/data/footer.json';
import { Container } from '@/components/layout/Container';
import {
  ChevronRight,
  Check,
  Linkedin,
  Instagram,
  Send,
  Facebook,
} from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  const getSocialIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'facebook':
        return <Facebook className='h-4 w-4 fill-current stroke-none' />;
      case 'linkedin':
        return <Linkedin className='h-4 w-4 stroke-[2]' />;
      case 'instagram':
        return <Instagram className='h-4 w-4 stroke-[2]' />;
      case 'telegram':
      default:
        return (
          <Send className='h-4 w-4 stroke-[2] -rotate-12 translate-x-[-1px] translate-y-[1px]' />
        );
    }
  };

  return (
    <footer className='w-full pt-16 pb-12 bg-transparent relative overflow-hidden'>
      <Container>
        {/* Main Footer Grid */}
        <div className='grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 pb-14'>
          {/* Brand & Description & Socials (4 columns) */}
          <div className='md:col-span-4 flex flex-col justify-between'>
            <div>
              {/* Logo */}
              <Link href='/' className='flex items-center gap-2 mb-4 group'>
                <div className='relative h-6 w-6 sm:h-7 sm:w-7 shrink-0'>
                  <Image
                    src='/logo.png'
                    alt='Tulip Logo'
                    fill
                    className='object-contain'
                  />
                </div>
                <span className='text-xl sm:text-2xl font-bold tracking-tight text-[#1e0d01] font-heading'>
                  {footerData.brand.name}
                </span>
              </Link>

              <p className='text-sm text-[#1e0d01]/70 max-w-sm leading-relaxed mb-6'>
                {footerData.brand.description}
              </p>
            </div>

            {/* Social Links */}
            <div className='flex items-center gap-2.5'>
              {footerData.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex h-9 w-9 items-center justify-center rounded-full bg-white/90 border border-[rgba(30,13,1,0.08)] text-neutral-600 hover:text-[#f97518] hover:border-[#f97518]/40 hover:bg-white transition-all shadow-2xs shrink-0'
                  aria-label={social.name}
                >
                  {getSocialIcon(social.icon || social.name)}
                </a>
              ))}
            </div>
          </div>

          {/* Company Column (2 columns) */}
          <div className='md:col-span-2 flex flex-col space-y-3.5'>
            <h4 className='text-base font-bold text-[#1e0d01] font-heading tracking-tight'>
              {footerData.columns[0]?.title || 'Company'}
            </h4>
            <ul className='space-y-2.5 text-sm text-[#1e0d01]/70'>
              {footerData.columns[0]?.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className='hover:text-[#f97518] transition-colors'
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Column (2 columns) */}
          <div className='md:col-span-2 flex flex-col space-y-3.5'>
            <h4 className='text-base font-bold text-[#1e0d01] font-heading tracking-tight'>
              {footerData.columns[1]?.title || 'Product'}
            </h4>
            <ul className='space-y-2.5 text-sm text-[#1e0d01]/70'>
              {footerData.columns[1]?.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className='hover:text-[#f97518] transition-colors'
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Form (4 columns) */}
          <div className='md:col-span-4 flex flex-col space-y-3 min-w-0'>
            <h4 className='text-base font-bold text-[#1e0d01] font-heading tracking-tight'>
              {footerData.newsletter.title}
            </h4>
            <p className='text-sm text-[#1e0d01]/70 leading-relaxed max-w-sm'>
              {footerData.newsletter.description}
            </p>

            {/* Pill Search / Subscribe Input */}
            <form onSubmit={handleSubmit} className='pt-2 w-full'>
              <div className='w-full rounded-full bg-white/90 border border-[rgba(30,13,1,0.08)] p-1.5 pl-4 flex items-center justify-between shadow-2xs focus-within:border-[#f97518]/40 transition-all box-border overflow-hidden'>
                <input
                  type='email'
                  required
                  placeholder={footerData.newsletter.placeholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='min-w-0 flex-1 bg-transparent text-xs sm:text-sm text-[#1e0d01] placeholder:text-neutral-400 outline-none pr-2'
                />
                <button
                  type='submit'
                  className='rounded-full bg-[#f97518] hover:bg-[#e65f00] text-white px-4 py-2 text-xs font-bold shadow-xs flex items-center gap-1 shrink-0 transition-all cursor-pointer whitespace-nowrap'
                >
                  <span>
                    {subscribed
                      ? 'Subscribed'
                      : footerData.newsletter.buttonText}
                  </span>
                  {subscribed ? (
                    <Check className='h-3.5 w-3.5 stroke-[2.5]' />
                  ) : (
                    <ChevronRight className='h-3.5 w-3.5 stroke-[2.5]' />
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Credits & Copyright Card */}
        <div className='rounded-2xl bg-white/80 backdrop-blur-sm px-6 py-4 border border-[rgba(30,13,1,0.06)] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-neutral-500 shadow-2xs'>
          <p>{footerData.brand.copyright}</p>
        </div>
      </Container>
    </footer>
  );
}

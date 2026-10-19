import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import footerData from '@/data/footer.json';
import { FooterLandscape } from '@/components/layout/FooterLandscape';
import { docsLinkProps } from '@/lib/links';
import { Linkedin } from 'lucide-react';

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox='0 0 24 24' className={className} fill='currentColor' aria-hidden='true'>
      <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
    </svg>
  );
}

export function Footer() {
  const getSocialIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'linkedin':
        return <Linkedin className='h-4 w-4 stroke-[2]' />;
      case 'x':
      default:
        return <XIcon className='h-3.5 w-3.5' />;
    }
  };

  return (
    <footer className='relative w-full overflow-hidden'>
      <FooterLandscape className='absolute inset-x-0 bottom-0 h-[clamp(360px,42vw,600px)] w-full' />

      <div className='relative mx-auto max-w-[1200px] px-4 sm:px-6 pt-4 pb-[clamp(200px,24vw,340px)]'>
        <div className='rounded-[22px] bg-white/95 backdrop-blur-sm px-6 sm:px-10 pt-10 pb-6 text-ink'>
          <div className='grid grid-cols-12 gap-x-6 gap-y-10'>
            {/* Brand */}
            <div className='col-span-12 lg:col-span-6'>
              <Link href='/' className='inline-flex items-center gap-2.5'>
                <span className='relative h-9 w-9 shrink-0'>
                  <Image src='/logo.png' alt='' fill sizes='36px' className='object-contain' />
                </span>
                <span className='font-serif text-[2.4rem] leading-none tracking-[-0.02em] text-ink'>tulip</span>
              </Link>
              <p className='mt-4 max-w-sm text-sm leading-relaxed text-ink/65'>{footerData.brand.description}</p>
              <div className='mt-6 flex items-center gap-2'>
                {footerData.socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label={social.name}
                    className='flex h-9 w-9 items-center justify-center rounded-full border border-rule text-ink/75 hover:border-ink hover:text-ink transition-colors'
                  >
                    {getSocialIcon(social.icon || social.name)}
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {footerData.columns.map((column, i) => (
              <nav
                key={column.title}
                aria-label={column.title}
                className={`col-span-6 lg:col-span-2 ${i === 0 ? 'lg:col-start-9' : ''}`}
              >
                <h4 className='text-sm font-semibold text-ink'>{column.title}</h4>
                <ul className='mt-4 space-y-2.5'>
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} {...docsLinkProps(link.href)} className='text-sm text-ink/65 hover:text-ink transition-colors'>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          {/* Bottom bar */}
          <div className='mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-rule pt-5 text-[13px] text-ink/55'>
            <p>{footerData.brand.copyright}</p>
            <nav aria-label='Legal' className='flex items-center gap-5'>
              {footerData.legal.map((link) => (
                <Link key={link.href} href={link.href} className='hover:text-ink transition-colors'>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}

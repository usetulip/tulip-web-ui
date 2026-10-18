import React from 'react';
import Link from 'next/link';
import ReactMarkdown, { type Components } from 'react-markdown';
import { slugifyHeading } from '@/lib/docs';

function textContent(node: React.ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(textContent).join('');
  if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
    return textContent(node.props.children);
  }
  return '';
}

const components: Components = {
  h2: ({ children }) => (
    <h2
      id={slugifyHeading(textContent(children))}
      className='mt-12 mb-4 scroll-mt-8 border-t border-border pt-10 text-2xl font-semibold tracking-tight text-foreground first:mt-0 first:border-t-0 first:pt-0'
    >
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3
      id={slugifyHeading(textContent(children))}
      className='mt-8 mb-3 scroll-mt-8 text-lg font-semibold tracking-tight text-foreground'
    >
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className='my-4 text-[15px] leading-7 text-foreground/75'>{children}</p>
  ),
  a: ({ href = '', children }) => {
    const className =
      'font-medium text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:text-primary-hover hover:decoration-primary';
    return href.startsWith('/') || href.startsWith('#') ? (
      <Link href={href} className={className}>
        {children}
      </Link>
    ) : (
      <a href={href} className={className} target='_blank' rel='noopener noreferrer'>
        {children}
      </a>
    );
  },
  strong: ({ children }) => (
    <strong className='font-semibold text-foreground'>{children}</strong>
  ),
  ul: ({ children }) => (
    <ul className='my-4 space-y-2 pl-5 list-disc marker:text-primary/70 text-[15px] leading-7 text-foreground/75'>
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className='my-4 space-y-2 pl-5 list-decimal marker:text-muted-foreground text-[15px] leading-7 text-foreground/75'>
      {children}
    </ol>
  ),
  li: ({ children }) => <li className='pl-1'>{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className='my-6 rounded-xl border border-primary/20 bg-primary/[0.06] px-5 py-1 [&_p]:text-foreground/80 [&_p]:text-sm [&_p]:leading-6'>
      {children}
    </blockquote>
  ),
  pre: ({ children }) => (
    <pre
      data-lenis-prevent
      className='my-5 overflow-x-auto rounded-xl border border-white/5 bg-brand-dark p-4 font-mono text-[13px] leading-6 text-brand-light [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-inherit [&_code]:border-0'
    >
      {children}
    </pre>
  ),
  code: ({ children }) => (
    <code className='rounded-md border border-border bg-card px-1.5 py-0.5 font-mono text-[0.85em] text-foreground'>
      {children}
    </code>
  ),
  hr: () => <hr className='my-10 border-border' />,
};

export function DocsMarkdown({ content }: { content: string }) {
  return <ReactMarkdown components={components}>{content}</ReactMarkdown>;
}

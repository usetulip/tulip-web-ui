'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Check, X, ShieldCheck, Radio, Sparkles, Wand2 } from 'lucide-react';

// Interactive hero demo: edit brand tokens, watch the governance audit react,
// then approve and "stream" the tokens to an AI IDE over MCP.

const SWATCHES = [
  { name: 'Tulip', hex: '#f97518' },
  { name: 'Violet', hex: '#7c3aed' },
  { name: 'Ocean', hex: '#0ea5e9' },
  { name: 'Lime', hex: '#a5ff00' },
  { name: 'Ink', hex: '#1e0d01' },
];

const RADII = [
  { label: 'Sharp', value: 4 },
  { label: 'Soft', value: 12 },
  { label: 'Round', value: 24 },
];

const LABEL_COLORS = {
  light: '#ffffff',
  dark: '#1e0d01',
} as const;

type LabelTone = keyof typeof LABEL_COLORS;

interface Tokens {
  primary: string;
  radius: number;
  label: LabelTone;
}

interface LogLine {
  id: number;
  text: string;
  tone: 'muted' | 'token' | 'ok';
}

const AA_MIN = 4.5;

function luminance(hex: string) {
  const channels = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const [r, g, b] = channels.map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

function bestLabelFor(primary: string): LabelTone {
  return contrast(primary, LABEL_COLORS.light) >= contrast(primary, LABEL_COLORS.dark) ? 'light' : 'dark';
}

function timestamp() {
  return new Date().toLocaleTimeString('en-GB', { hour12: false });
}

const INITIAL_TOKENS: Tokens = { primary: '#f97518', radius: 12, label: 'dark' };

export function TasteDashboardDemo() {
  const [tokens, setTokens] = useState<Tokens>(INITIAL_TOKENS);
  const [pushed, setPushed] = useState<Tokens>(INITIAL_TOKENS);
  const [pushing, setPushing] = useState(false);
  const [log, setLog] = useState<LogLine[]>([
    { id: 0, text: 'Connected to mcp.usetulip.co', tone: 'ok' },
    { id: 1, text: 'Cursor subscribed to tokens/*', tone: 'muted' },
  ]);
  const nextId = useRef(2);
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);

  // Multiplayer-style "You" cursor for mouse users; the native cursor is hidden while it shows
  const rootRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorPressed, setCursorPressed] = useState(false);

  const moveCursor = (e: React.PointerEvent<HTMLDivElement>) => {
    const root = rootRef.current;
    if (e.pointerType !== 'mouse' || !root || !cursorRef.current) return;
    const rect = root.getBoundingClientRect();
    // The hero scales this card on scroll, so convert screen pixels back to local pixels
    const scale = rect.width / root.offsetWidth || 1;
    const x = (e.clientX - rect.left) / scale;
    const y = (e.clientY - rect.top) / scale;
    cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    if (!cursorVisible) setCursorVisible(true);
  };

  const hideCursor = () => {
    setCursorVisible(false);
    setCursorPressed(false);
  };

  const labelHex = LABEL_COLORS[tokens.label];
  // Accent text (badge, checkmarks) falls back to ink when the primary is too light to read on white
  const accentText = contrast(tokens.primary, '#ffffff') >= 3 ? tokens.primary : '#1e0d01';
  const ratio = contrast(tokens.primary, labelHex);
  const contrastPasses = ratio >= AA_MIN;
  const isDirty =
    tokens.primary !== pushed.primary || tokens.radius !== pushed.radius || tokens.label !== pushed.label;

  const update = (patch: Partial<Tokens>) => setTokens((prev) => ({ ...prev, ...patch }));

  const applyFix = () => update({ label: bestLabelFor(tokens.primary) });

  const push = () => {
    if (!contrastPasses || !isDirty || pushing) return;
    setPushing(true);
    const snapshot = tokens;
    const lines: Omit<LogLine, 'id'>[] = [
      { text: `${timestamp()} Approved by operator`, tone: 'muted' },
      { text: `→ color.primary ${snapshot.primary.toUpperCase()}`, tone: 'token' },
      { text: `→ radius.lg ${snapshot.radius}px`, tone: 'token' },
      { text: `→ color.on-primary ${LABEL_COLORS[snapshot.label].toUpperCase()}`, tone: 'token' },
      { text: '✓ Streamed to Cursor · 0 drift', tone: 'ok' },
    ];

    lines.forEach((line, i) => {
      timers.current.push(
        window.setTimeout(() => {
          setLog((prev) => [...prev, { ...line, id: nextId.current++ }].slice(-6));
          if (i === lines.length - 1) {
            setPushed(snapshot);
            setPushing(false);
          }
        }, 280 * (i + 1)),
      );
    });
  };

  const checks = [
    {
      label: 'Button contrast (WCAG AA)',
      detail: `${ratio.toFixed(1)}:1`,
      state: contrastPasses ? 'pass' : 'fail',
    },
    { label: 'Token integrity', detail: '0 raw values', state: 'pass' },
    { label: 'Radius on scale', detail: `${tokens.radius}px`, state: 'pass' },
    {
      label: 'Figma ↔ repo sync',
      detail: isDirty ? 'pending push' : 'in sync',
      state: isDirty ? 'pending' : 'pass',
    },
  ] as const;

  return (
    <div
      ref={rootRef}
      onPointerMove={moveCursor}
      onPointerLeave={hideCursor}
      onPointerDown={(e) => e.pointerType === 'mouse' && setCursorPressed(true)}
      onPointerUp={() => setCursorPressed(false)}
      className={`relative w-full rounded-xl sm:rounded-2xl md:rounded-[1.5rem] bg-[#fafafa] border border-[rgba(30,13,1,0.06)] text-left overflow-hidden ${
        cursorVisible ? 'cursor-none [&_*]:cursor-none' : ''
      }`}
    >
      {/* Window bar */}
      <div className='flex items-center gap-3 border-b border-[rgba(30,13,1,0.06)] bg-white px-4 py-3'>
        <div className='flex items-center gap-1.5'>
          <span className='h-2.5 w-2.5 rounded-full bg-[#ff5f57]' />
          <span className='h-2.5 w-2.5 rounded-full bg-[#febc2e]' />
          <span className='h-2.5 w-2.5 rounded-full bg-[#28c840]' />
        </div>
        <p className='text-xs sm:text-sm font-semibold text-[#1e0d01] truncate'>Operator Taste Dashboard</p>
        <span className='ml-auto hidden sm:flex items-center gap-1.5 rounded-full bg-[#a5ff00]/25 px-2.5 py-1 text-[11px] font-semibold text-[#1e0d01]'>
          <span className='h-1.5 w-1.5 rounded-full bg-[#5c9900] animate-pulse' />
          MCP connected
        </span>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-12 gap-3 p-3 sm:p-4'>
        {/* Tokens panel */}
        <section aria-label='Brand tokens' className='lg:col-span-3 rounded-xl bg-white border border-[rgba(30,13,1,0.06)] p-4 space-y-5'>
          <div>
            <p className='mb-2.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#1e0d01]/50'>Primary color</p>
            <div className='flex flex-wrap items-center gap-2'>
              {SWATCHES.map((swatch) => {
                const active = tokens.primary === swatch.hex;
                return (
                  <button
                    key={swatch.hex}
                    type='button'
                    onClick={() => update({ primary: swatch.hex })}
                    aria-label={`${swatch.name} ${swatch.hex}`}
                    aria-pressed={active}
                    className={`h-6 w-6 rounded-full border transition-all cursor-pointer ${
                      active
                        ? 'ring-2 ring-offset-2 ring-[#1e0d01]/70 border-transparent scale-105'
                        : 'border-[rgba(30,13,1,0.12)] hover:scale-110'
                    }`}
                    style={{ backgroundColor: swatch.hex }}
                  />
                );
              })}
              <label
                className='relative h-6 w-6 rounded-full border border-dashed border-[rgba(30,13,1,0.25)] cursor-pointer flex items-center justify-center text-[#1e0d01]/50 hover:text-[#1e0d01] overflow-hidden'
                title='Custom color'
              >
                <span className='text-sm leading-none'>+</span>
                <input
                  type='color'
                  value={tokens.primary}
                  onChange={(e) => update({ primary: e.target.value })}
                  className='absolute inset-0 opacity-0 cursor-pointer'
                  aria-label='Custom primary color'
                />
              </label>
            </div>
            <p className='mt-2 font-mono text-[11px] text-[#1e0d01]/50'>{tokens.primary.toUpperCase()}</p>
          </div>

          <div>
            <p className='mb-2.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#1e0d01]/50'>Corner radius</p>
            <div className='grid grid-cols-3 gap-1 rounded-lg bg-[#f5f5f5] p-1'>
              {RADII.map((r) => (
                <button
                  key={r.value}
                  type='button'
                  onClick={() => update({ radius: r.value })}
                  aria-pressed={tokens.radius === r.value}
                  className={`rounded-md py-1.5 text-xs font-medium transition-all cursor-pointer ${
                    tokens.radius === r.value ? 'bg-white text-[#1e0d01] shadow-xs' : 'text-[#1e0d01]/55 hover:text-[#1e0d01]'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className='mb-2.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#1e0d01]/50'>Button label</p>
            <div className='grid grid-cols-2 gap-1 rounded-lg bg-[#f5f5f5] p-1'>
              {(Object.keys(LABEL_COLORS) as LabelTone[]).map((tone) => (
                <button
                  key={tone}
                  type='button'
                  onClick={() => update({ label: tone })}
                  aria-pressed={tokens.label === tone}
                  className={`flex items-center justify-center gap-1.5 rounded-md py-1.5 text-xs font-medium capitalize transition-all cursor-pointer ${
                    tokens.label === tone ? 'bg-white text-[#1e0d01] shadow-xs' : 'text-[#1e0d01]/55 hover:text-[#1e0d01]'
                  }`}
                >
                  <span
                    className='h-2.5 w-2.5 rounded-full border border-[rgba(30,13,1,0.2)]'
                    style={{ backgroundColor: LABEL_COLORS[tone] }}
                  />
                  {tone}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Live preview */}
        <section aria-label='Live component preview' className='lg:col-span-5 rounded-xl bg-white border border-[rgba(30,13,1,0.06)] p-4 flex flex-col'>
          <div className='flex items-center justify-between mb-4'>
            <p className='text-[11px] font-semibold uppercase tracking-[0.1em] text-[#1e0d01]/50'>Live preview</p>
            <span className='font-mono text-[11px] text-[#1e0d01]/40'>&lt;PricingCard /&gt;</span>
          </div>

          <div className='flex-1 flex items-center justify-center rounded-lg bg-[#f7f7f7] p-4 sm:p-6'>
            <div
              className='w-full max-w-[280px] bg-white border border-[rgba(30,13,1,0.08)] p-5 shadow-sm transition-all duration-300'
              style={{ borderRadius: tokens.radius + 4 }}
            >
              <span
                className='inline-block px-2.5 py-0.5 text-[11px] font-bold transition-all duration-300'
                style={{
                  borderRadius: tokens.radius,
                  backgroundColor: `${tokens.primary}1f`,
                  color: accentText,
                }}
              >
                Most popular
              </span>
              <p className='mt-3 text-sm font-semibold text-[#1e0d01]'>The Infrastructure</p>
              <p className='mt-1 text-2xl font-bold text-[#1e0d01]'>
                $1,499<span className='text-sm font-medium text-[#1e0d01]/50'> / month</span>
              </p>
              <ul className='mt-3 space-y-1.5 text-xs text-[#1e0d01]/70'>
                {['1:1 React & Next.js repo', 'Operator Taste Dashboard', 'Live MCP token streaming'].map((item) => (
                  <li key={item} className='flex items-center gap-2'>
                    <Check className='h-3.5 w-3.5 shrink-0 transition-colors duration-300' style={{ color: accentText }} />
                    {item}
                  </li>
                ))}
              </ul>
              <button
                type='button'
                tabIndex={-1}
                className='mt-4 w-full py-2.5 text-sm font-semibold transition-all duration-300'
                style={{ borderRadius: tokens.radius, backgroundColor: tokens.primary, color: labelHex }}
              >
                Get started
              </button>
            </div>
          </div>
        </section>

        {/* Governance + MCP */}
        <section aria-label='Governance audit and MCP stream' className='lg:col-span-4 flex flex-col gap-3'>
          <div className='rounded-xl bg-white border border-[rgba(30,13,1,0.06)] p-4'>
            <div className='flex items-center justify-between mb-3'>
              <p className='flex items-center gap-1.5 text-sm font-semibold text-[#1e0d01]'>
                <ShieldCheck className='h-4 w-4 text-[#f97518]' />
                Taste audit
              </p>
              <span
                className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold whitespace-nowrap ${
                  contrastPasses ? 'bg-[#a5ff00]/30 text-[#2f5200]' : 'bg-[#fa8484]/20 text-[#c43c3c]'
                }`}
              >
                {contrastPasses ? 'Ready to publish' : 'Publish blocked'}
              </span>
            </div>

            <ul className='space-y-2' aria-live='polite'>
              {checks.map((check) => (
                <li key={check.label} className='flex items-center justify-between gap-2 text-xs'>
                  <span className='flex items-center gap-2 min-w-0'>
                    <span
                      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                        check.state === 'pass'
                          ? 'bg-[#a5ff00] text-[#1e0d01]'
                          : check.state === 'fail'
                            ? 'bg-[#fa8484] text-white'
                            : 'bg-[#eba100]/25 text-[#a06d00]'
                      }`}
                    >
                      {check.state === 'pass' && <Check className='h-2.5 w-2.5 stroke-[3]' />}
                      {check.state === 'fail' && <X className='h-2.5 w-2.5 stroke-[3]' />}
                      {check.state === 'pending' && <span className='h-1.5 w-1.5 rounded-full bg-current' />}
                    </span>
                    <span className='truncate text-[#1e0d01]/75'>{check.label}</span>
                  </span>
                  <span className={`shrink-0 font-mono text-[11px] ${check.state === 'fail' ? 'text-[#c43c3c]' : 'text-[#1e0d01]/45'}`}>
                    {check.detail}
                  </span>
                </li>
              ))}
            </ul>

            {contrastPasses ? (
              <button
                type='button'
                onClick={push}
                disabled={!isDirty || pushing}
                className='mt-4 flex w-full items-center justify-center gap-1.5 rounded-full bg-[#1e0d01] py-2.5 text-xs font-bold text-white transition-all hover:bg-[#3a2410] disabled:cursor-default disabled:bg-[#1e0d01]/10 disabled:text-[#1e0d01]/45 cursor-pointer'
              >
                <Radio className='h-3.5 w-3.5' />
                {pushing ? 'Streaming…' : isDirty ? 'Approve & push via MCP' : 'All tokens live'}
              </button>
            ) : (
              <button
                type='button'
                onClick={applyFix}
                className='mt-4 flex w-full items-center justify-center gap-1.5 rounded-full border border-[#fa8484]/50 bg-[#fa8484]/10 py-2.5 text-xs font-bold text-[#c43c3c] transition-all hover:bg-[#fa8484]/20 cursor-pointer'
              >
                <Wand2 className='h-3.5 w-3.5' />
                Apply fix: {bestLabelFor(tokens.primary)} label (
                {contrast(tokens.primary, LABEL_COLORS[bestLabelFor(tokens.primary)]).toFixed(1)}:1)
              </button>
            )}
          </div>

          {/* MCP stream */}
          <div className='flex-1 rounded-xl bg-[#1e0d01] p-4 font-mono text-[11px] leading-relaxed min-h-[148px]'>
            <div className='mb-2 flex items-center justify-between text-white/40'>
              <span>mcp.usetulip.co</span>
              <span className='flex items-center gap-1 text-[#a5ff00]'>
                <Sparkles className='h-3 w-3' />
                Cursor
              </span>
            </div>
            <ul className='space-y-1' aria-live='polite'>
              {log.map((line) => (
                <li
                  key={line.id}
                  className={`truncate animate-[demo-fade-in_0.3s_ease-out] ${
                    line.tone === 'ok' ? 'text-[#a5ff00]' : line.tone === 'token' ? 'text-[#ffb37a]' : 'text-white/55'
                  }`}
                >
                  {line.text}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      {/* Live cursor */}
      <div
        ref={cursorRef}
        aria-hidden='true'
        className={`pointer-events-none absolute left-0 top-0 z-50 transition-opacity duration-150 ${
          cursorVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div
          className={`origin-top-left transition-transform duration-100 ${cursorPressed ? 'scale-90' : 'scale-100'}`}
        >
          <svg
            width='18'
            height='20'
            viewBox='0 0 18 20'
            className='-ml-[2px] -mt-[2px] drop-shadow-[0_1px_2px_rgba(30,13,1,0.3)]'
          >
            <path
              d='M2.5 2v15.2l4.3-4 2.9 6.3 2.6-1.2-2.8-6.2 5.9-.3L2.5 2z'
              fill='#f97518'
              stroke='#ffffff'
              strokeWidth='1.5'
              strokeLinejoin='round'
            />
          </svg>
          <span className='absolute left-3.5 top-[17px] whitespace-nowrap rounded-full rounded-tl-[4px] bg-[#f97518] px-2 py-0.5 text-[11px] font-semibold text-[#1e0d01] shadow-[0_2px_6px_rgba(30,13,1,0.18)]'>
            You
          </span>
        </div>
      </div>
    </div>
  );
}

import React from 'react';

// Rolling orange hills with a field of small tulips and film grain, after a warm dusk.
// Drawn on a 1440x560 canvas and cropped from the bottom so the hills always touch the edge.

const FIELD: [number, number, number][] = [
  // x, y (base of stem), scale
  [120, 455, 0.8], [210, 448, 0.6], [330, 470, 1], [455, 462, 0.7], [590, 476, 0.9],
  [720, 470, 0.65], [860, 462, 1], [990, 450, 0.75], [1110, 444, 0.9], [1240, 448, 0.6],
  [1350, 452, 0.85], [60, 520, 1.2], [270, 530, 1.4], [520, 540, 1.1], [800, 528, 1.5],
  [1050, 520, 1.2], [1300, 530, 1.4], [400, 380, 0.45], [640, 372, 0.5], [940, 360, 0.45], [1180, 372, 0.5],
];

function SmallTulip({ x, y, s, cup }: { x: number; y: number; s: number; cup: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d='M0 0 C-1 -8 1 -16 0 -24' stroke='#6e7d55' strokeWidth='1.6' fill='none' />
      <path d='M0 -22 C-7 -22 -9 -30 -8 -37 C-5 -34 -2 -34 0 -38 C2 -34 5 -34 8 -37 C9 -30 7 -22 0 -22 Z' fill={cup} />
    </g>
  );
}

export function FooterLandscape({ className }: { className?: string }) {
  const id = React.useId().replace(/:/g, '');

  return (
    <svg viewBox='0 0 1440 560' preserveAspectRatio='xMidYMax slice' className={className} aria-hidden='true'>
      <defs>
        <linearGradient id={`${id}-sky`} x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0' stopColor='#f5f4f1' />
          <stop offset='0.55' stopColor='#ffe7d2' />
          <stop offset='1' stopColor='#ffc79a' />
        </linearGradient>
        <linearGradient id={`${id}-far`} x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0' stopColor='#ffcfa3' />
          <stop offset='1' stopColor='#ffb077' />
        </linearGradient>
        <linearGradient id={`${id}-mid`} x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0' stopColor='#ffa261' />
          <stop offset='1' stopColor='#f97518' />
        </linearGradient>
        <linearGradient id={`${id}-near`} x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0' stopColor='#f2731a' />
          <stop offset='1' stopColor='#b9450c' />
        </linearGradient>
        <filter id={`${id}-grain`} x='0' y='0' width='100%' height='100%'>
          <feTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='2' stitchTiles='stitch' result='noise' />
          <feColorMatrix in='noise' type='saturate' values='0' result='mono' />
          <feComponentTransfer in='mono' result='speckle'>
            <feFuncA type='linear' slope='0.5' />
          </feComponentTransfer>
          <feComposite in='speckle' in2='SourceGraphic' operator='in' result='grain' />
          <feBlend in='SourceGraphic' in2='grain' mode='multiply' />
        </filter>
      </defs>

      {/* Sky stays grain-free so it melts into the page background */}
      <rect width='1440' height='560' fill={`url(#${id}-sky)`} />
      <circle cx='1060' cy='250' r='70' fill='#fff3e6' opacity='0.8' />
      <g filter={`url(#${id}-grain)`}>
        <path d='M0 300 C240 230 420 250 620 285 C820 320 1000 240 1200 255 C1320 265 1400 290 1440 300 V560 H0Z' fill={`url(#${id}-far)`} />
        <path d='M0 385 C180 335 360 335 560 365 C760 396 900 334 1100 340 C1260 345 1380 372 1440 384 V560 H0Z' fill={`url(#${id}-mid)`} />
        <path d='M0 470 C220 420 420 430 640 455 C860 480 1080 420 1300 430 C1380 434 1420 445 1440 450 V560 H0Z' fill={`url(#${id}-near)`} />
        {FIELD.map(([x, y, s], i) => (
          <SmallTulip key={i} x={x} y={y} s={s} cup={i % 3 === 0 ? '#ffe3c9' : i % 3 === 1 ? '#ffb27a' : '#fff1e3'} />
        ))}
      </g>
    </svg>
  );
}

import React from 'react';

// Animated line icons for the bundle cards. Motion is driven by CSS in
// globals.css ("Bundle card icons") and plays while the parent `.bundle-card`
// is hovered or focused. Shapes follow the Lucide 24px grid.

const svgProps = {
  viewBox: '0 0 24 24',
  width: 16,
  height: 16,
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

type SpreadStyle = React.CSSProperties & { '--dx': string; '--dy': string };
const spread = (dx: number, dy: number): SpreadStyle => ({ '--dx': `${dx}px`, '--dy': `${dy}px` });

function FigmaIcon() {
  return (
    <svg {...svgProps} fill='currentColor' stroke='none' className='bundle-icon-figma'>
      <path className='piece' style={spread(-1.5, -1.5)} d='M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z' />
      <path className='piece' style={spread(1.5, -1.5)} d='M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z' />
      <path className='piece piece-dot' style={spread(2.5, 0)} d='M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z' />
      <path className='piece' style={spread(-2, 0)} d='M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z' />
      <path className='piece' style={spread(-1.5, 1.5)} d='M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z' />
    </svg>
  );
}

function TerminalIcon() {
  return (
    <svg {...svgProps} className='bundle-icon-terminal'>
      <rect width='18' height='18' x='3' y='3' rx='2' />
      <path className='prompt' d='m7 11 2-2-2-2' />
      <path className='cursor' d='M11 13h4' />
    </svg>
  );
}

function TypeIcon() {
  return (
    <svg {...svgProps} className='bundle-icon-type'>
      <path className='bar' d='M4 7V4h16v3' />
      <path className='stem' pathLength={1} d='M12 4v16' />
      <path className='base' d='M9 20h6' />
    </svg>
  );
}

function ImageIcon() {
  return (
    <svg {...svgProps} className='bundle-icon-image'>
      <rect width='18' height='18' x='3' y='3' rx='2' />
      <circle className='sun' cx='9' cy='9' r='2' />
      <path className='ridge' d='m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21' />
    </svg>
  );
}

function ZapIcon() {
  return (
    <svg {...svgProps} className='bundle-icon-zap'>
      <path
        className='bolt'
        pathLength={1}
        d='M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z'
      />
    </svg>
  );
}

const icons: Record<string, () => React.JSX.Element> = {
  figma: FigmaIcon,
  terminal: TerminalIcon,
  type: TypeIcon,
  image: ImageIcon,
  zap: ZapIcon,
};

export function BundleIcon({ name }: { name: string }) {
  const Icon = icons[name.toLowerCase()] ?? ImageIcon;

  return (
    <div className='bundle-icon h-11 w-11 rounded-xl bg-gradient-to-br from-[#f8f8f8] to-white border border-[rgba(30,13,1,0.12)] flex items-center justify-center mb-6 shrink-0 shadow-xs text-[#1e0d01] transition-all duration-300 ease-out group-hover:-translate-y-0.5 group-hover:border-[#f97518]/40 group-hover:text-[#f97518] group-hover:shadow-md group-hover:shadow-[#f97518]/15'>
      <Icon />
    </div>
  );
}

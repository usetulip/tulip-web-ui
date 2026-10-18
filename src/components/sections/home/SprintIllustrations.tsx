import React from 'react';

// Vector illustrations for the two sprint cards. Drawn on a 400x300 canvas so
// they scale crisply inside the 4:3 frame at any width.

const INK = '#1e0d01';
const ORANGE = '#f97518';
const LIME = '#a5ff00';
const LINE = 'rgba(30,13,1,0.1)';
const MUTED = 'rgba(30,13,1,0.5)';

function Canvas({ label, children }: { label: string; children: React.ReactNode }) {
  const patternId = React.useId();

  return (
    <svg
      viewBox='0 0 400 300'
      role='img'
      aria-label={label}
      className='h-full w-full font-sans'
      xmlns='http://www.w3.org/2000/svg'
    >
      <defs>
        <pattern id={patternId} width='20' height='20' patternUnits='userSpaceOnUse'>
          <path d='M20 0H0V20' fill='none' stroke={INK} strokeOpacity='0.05' />
        </pattern>
      </defs>
      <rect width='400' height='300' fill='#fafafa' />
      <rect width='400' height='300' fill={`url(#${patternId})`} />

      {/* App window */}
      <rect x='20' y='20' width='360' height='260' rx='16' fill='#fff' stroke={LINE} />
      <circle cx='40' cy='40' r='4' fill='#ff5f57' />
      <circle cx='54' cy='40' r='4' fill='#febc2e' />
      <circle cx='68' cy='40' r='4' fill='#28c840' />

      {children}
    </svg>
  );
}

function Chip({ x, label, checked }: { x: number; label: string; checked: boolean }) {
  const width = label.length * 6.2 + (checked ? 34 : 22);
  return (
    <g>
      <rect
        x={x}
        y='214'
        width={width}
        height='24'
        rx='12'
        fill={checked ? 'rgba(249,117,24,0.1)' : '#fff'}
        stroke={checked ? 'rgba(249,117,24,0.45)' : LINE}
      />
      {checked && (
        <path
          d={`M${x + 11} 226l3 3 6-6`}
          fill='none'
          stroke={ORANGE}
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      )}
      <text
        x={x + (checked ? 25 : 11)}
        y='230'
        fontSize='11'
        fontWeight={checked ? 600 : 500}
        fill={checked ? '#c2540a' : MUTED}
      >
        {label}
      </text>
    </g>
  );
}

export function BriefIllustration() {
  const archetypes = ['Marketing', 'Dashboard', 'App shell'];

  return (
    <Canvas label='Brief Wizard with brand colors, layout archetype and feature checklist'>
      <text x='86' y='44' fontSize='11' fontWeight='600' fill={INK}>
        Brief Wizard
      </text>
      <rect x='294' y='31' width='66' height='18' rx='9' fill='#f5f5f5' />
      <text x='327' y='44' fontSize='9.5' fontWeight='600' fill={MUTED} textAnchor='middle'>
        Step 2 of 3
      </text>

      {/* Progress */}
      <rect x='40' y='60' width='320' height='4' rx='2' fill='#f1f1f1' />
      <rect x='40' y='60' width='213' height='4' rx='2' fill={ORANGE} />

      {/* Brand colors */}
      <text x='40' y='88' fontSize='10' fontWeight='600' fill={MUTED}>
        Brand colors
      </text>
      {[
        { x: 40, hex: '#F97518', fill: ORANGE },
        { x: 208, hex: '#1E0D01', fill: INK },
      ].map(({ x, hex, fill }) => (
        <g key={hex}>
          <rect x={x} y='95' width='152' height='34' rx='8' fill='#fff' stroke={LINE} />
          <text x={x + 12} y='116' fontSize='12' className='font-mono' fill={INK}>
            {hex}
          </text>
          <rect x={x + 122} y='103' width='18' height='18' rx='5' fill={fill} />
        </g>
      ))}

      {/* Layout archetype */}
      <text x='40' y='150' fontSize='10' fontWeight='600' fill={MUTED}>
        Layout archetype
      </text>
      <rect x='40' y='157' width='320' height='32' rx='9' fill='#f5f5f5' />
      <rect x='147' y='160' width='106' height='26' rx='7' fill='#fff' stroke={LINE} />
      {archetypes.map((name, i) => (
        <text
          key={name}
          x={93 + i * 107}
          y='177'
          fontSize='11'
          fontWeight={i === 1 ? 700 : 500}
          fill={i === 1 ? ORANGE : MUTED}
          textAnchor='middle'
        >
          {name}
        </text>
      ))}

      {/* Feature checklist */}
      <text x='40' y='207' fontSize='10' fontWeight='600' fill={MUTED}>
        Features
      </text>
      <Chip x={40} label='Auth screens' checked />
      <Chip x={154} label='Pricing' checked />
      <Chip x={236} label='Settings' checked={false} />

      {/* Footer */}
      <text x='40' y='262' fontSize='10' fill={MUTED}>
        5-minute intake
      </text>
      <rect x='262' y='247' width='98' height='24' rx='12' fill={ORANGE} />
      <text x='311' y='263' fontSize='11' fontWeight='700' fill={INK} textAnchor='middle'>
        Submit brief →
      </text>
    </Canvas>
  );
}

export function AuditIllustration() {
  const rows = [
    { token: 'color.primary', value: '#F97518', swatch: ORANGE },
    { token: 'color.foreground', value: '#1E0D01', swatch: INK },
    { token: 'radius.lg', value: '16px' },
    { token: 'spacing.4', value: '16px' },
  ];

  return (
    <Canvas label='Handoff audit showing Figma variables matching repository tokens, a WCAG pass and ready-for-handoff status'>
      <text x='86' y='44' fontSize='11' fontWeight='600' fill={INK}>
        Handoff audit
      </text>
      <rect x='296' y='31' width='64' height='18' rx='9' fill='rgba(249,117,24,0.12)' />
      <text x='328' y='44' fontSize='9.5' fontWeight='700' fill={ORANGE} textAnchor='middle'>
        Audit agent
      </text>

      {/* Column headers */}
      {[
        { x: 40, label: 'TOKEN' },
        { x: 176, label: 'FIGMA' },
        { x: 262, label: 'REPO' },
      ].map(({ x, label }) => (
        <text key={label} x={x} y='72' fontSize='9' fontWeight='600' letterSpacing='1' fill={MUTED}>
          {label}
        </text>
      ))}

      {/* Token rows: Figma and repo values match */}
      {rows.map((row, i) => {
        const y = 80 + i * 28;
        return (
          <g key={row.token}>
            <rect x='32' y={y} width='336' height='24' rx='6' fill={i % 2 === 0 ? '#fafafa' : '#fff'} />
            <text x='40' y={y + 16} fontSize='10.5' className='font-mono' fill={INK}>
              {row.token}
            </text>
            {[176, 262].map((x) => (
              <g key={x}>
                {row.swatch && <rect x={x} y={y + 7} width='10' height='10' rx='3' fill={row.swatch} />}
                <text x={row.swatch ? x + 15 : x} y={y + 16} fontSize='10.5' className='font-mono' fill={MUTED}>
                  {row.value}
                </text>
              </g>
            ))}
            <circle cx='352' cy={y + 12} r='7' fill={LIME} />
            <path
              d={`M348.5 ${y + 12}l2.5 2.5 4.5-4.5`}
              fill='none'
              stroke={INK}
              strokeWidth='1.8'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </g>
        );
      })}

      {/* Checks */}
      <rect x='40' y='204' width='112' height='22' rx='11' fill='rgba(165,255,0,0.35)' />
      <text x='96' y='219' fontSize='10' fontWeight='700' fill={INK} textAnchor='middle'>
        WCAG AA · 4.8:1
      </text>
      <rect x='160' y='204' width='86' height='22' rx='11' fill='#f5f5f5' />
      <text x='203' y='219' fontSize='10' fontWeight='600' fill={MUTED} textAnchor='middle'>
        0 drift found
      </text>

      {/* Status bar */}
      <rect x='40' y='236' width='320' height='32' rx='10' fill={INK} />
      <circle cx='58' cy='252' r='4' fill={LIME} />
      <text x='70' y='256' fontSize='11' fontWeight='700' fill='#fff'>
        Ready for handoff
      </text>
      <text x='346' y='256' fontSize='11' fontWeight='600' className='font-mono' fill={LIME} textAnchor='end'>
        HOUR 48
      </text>
    </Canvas>
  );
}

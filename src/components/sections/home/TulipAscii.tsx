'use client';

import React, { useEffect, useRef } from 'react';

// The hero tulip, grown from code characters. Each frame the flower is drawn into a tiny
// offscreen canvas (one pixel per character cell); every cell's color and coverage picks a
// glyph on the front canvas, while a blurred copy of the same pixels glows underneath.

const W = 400;
const H = 520;

const SHAPES = {
  stem: 'M200 250 C197 320 206 400 200 506',
  leafLeft: 'M199 478 C148 438 124 384 128 316 C160 356 188 404 199 456 Z',
  leafRight: 'M201 504 C254 458 280 404 272 344 C244 388 214 430 201 482 Z',
  backLeft: 'M200 254 C144 252 112 208 114 148 C115 114 126 90 140 76 C152 116 174 150 200 162 Z',
  backRight: 'M200 254 C256 252 288 208 286 148 C285 114 274 90 260 76 C248 116 226 150 200 162 Z',
  front: 'M200 260 C156 258 140 214 145 164 C149 126 170 96 200 66 C230 96 251 126 255 164 C260 214 244 258 200 260 Z',
};

const PETAL_GLYPHS = ['{', '}', '<', '>', '/', '#', '*', '+', 'T'];
const LEAF_GLYPHS = ['/', '\\', '|', '=', '~', 'l'];
// Rows of glyphs across the flower's height; columns follow from the glyph aspect ratio
const TARGET_ROWS = 40;
const GLYPH_ASPECT = 0.62;
const FRAME_MS = 33;
const POINTER_RADIUS = 70;

export function TulipAscii({ className = '' }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const glow = glowRef.current;
    const text = textRef.current;
    if (!wrap || !glow || !text) return;

    const off = document.createElement('canvas');
    const octx = off.getContext('2d', { willReadFrequently: true });
    const gctx = glow.getContext('2d');
    const tctx = text.getContext('2d');
    if (!octx || !gctx || !tctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const paths = Object.fromEntries(Object.entries(SHAPES).map(([k, d]) => [k, new Path2D(d)])) as Record<
      keyof typeof SHAPES,
      Path2D
    >;

    // Gradients use flower coordinates; the canvas transform maps them onto the grid at paint time.
    const front = octx.createLinearGradient(170, 66, 232, 262);
    // Mid-tone oranges so the light glyphs stay readable on top
    front.addColorStop(0, '#ff9f5a');
    front.addColorStop(0.45, '#f97518');
    front.addColorStop(0.8, '#e25a0c');
    front.addColorStop(1, '#b4430b');
    const back = octx.createLinearGradient(114, 76, 200, 254);
    back.addColorStop(0, '#f58a3c');
    back.addColorStop(0.6, '#d4560b');
    back.addColorStop(1, '#9c3608');
    const leaf = octx.createLinearGradient(128, 316, 272, 504);
    leaf.addColorStop(0, '#8c9c6c');
    leaf.addColorStop(1, '#4e5e38');

    const monoFamily =
      getComputedStyle(document.documentElement).getPropertyValue('--font-geist-mono').trim() || 'monospace';

    let cols = 0;
    let rows = 0;
    let cell = 0;
    let cellW = 0;
    let dpr = 1;
    let seeds = new Float32Array(0);
    let pointer: { x: number; y: number } | null = null;
    let raf = 0;
    let last = 0;
    let running = false;

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      cell = Math.max(8, rect.height / TARGET_ROWS);
      cellW = cell * GLYPH_ASPECT;
      cols = Math.floor(rect.width / cellW);
      rows = Math.floor(rect.height / cell);
      off.width = cols;
      off.height = rows;
      for (const canvas of [glow, text]) {
        canvas.width = Math.round(rect.width * dpr);
        canvas.height = Math.round(rect.height * dpr);
      }
      glow.style.filter = `blur(${Math.max(2, Math.round(cell * 0.25))}px)`;
      seeds = Float32Array.from({ length: cols * rows }, () => Math.random());
    };

    const drawFlower = (t: number) => {
      octx.setTransform(1, 0, 0, 1, 0, 0);
      octx.clearRect(0, 0, cols, rows);
      octx.scale(cols / W, rows / H);

      // A slow turn (horizontal squash) and a sway from the base of the stem
      const turn = reduceMotion ? 1 : 0.84 + 0.16 * Math.cos(t * 0.0006);
      const sway = reduceMotion ? 0 : Math.sin(t * 0.0009) * 0.035;
      octx.translate(200, 506);
      octx.rotate(sway);
      octx.scale(turn, 1);
      octx.translate(-200, -506);

      octx.strokeStyle = '#66784c';
      octx.lineWidth = 15;
      octx.lineCap = 'round';
      octx.stroke(paths.stem);
      octx.fillStyle = leaf;
      octx.fill(paths.leafLeft);
      octx.fill(paths.leafRight);

      // The head nods a little on its own
      octx.save();
      octx.translate(200, 256);
      octx.rotate(reduceMotion ? 0 : Math.sin(t * 0.0013 + 1) * 0.03);
      octx.translate(-200, -256);
      octx.fillStyle = back;
      octx.fill(paths.backLeft);
      octx.fill(paths.backRight);
      octx.fillStyle = front;
      octx.fill(paths.front);
      octx.restore();
    };

    const render = (t: number) => {
      if (!cols || !rows) return;
      drawFlower(t);
      const pixels = octx.getImageData(0, 0, cols, rows).data;

      // Glow: the same pixels scaled up and blurred by CSS
      gctx.setTransform(1, 0, 0, 1, 0, 0);
      gctx.clearRect(0, 0, glow.width, glow.height);
      gctx.imageSmoothingEnabled = true;
      gctx.drawImage(off, 0, 0, glow.width, glow.height);

      // Glyphs
      tctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      tctx.clearRect(0, 0, text.width, text.height);
      tctx.font = `600 ${cell * 0.9}px ${monoFamily}`;
      tctx.textAlign = 'center';
      tctx.textBaseline = 'middle';
      tctx.fillStyle = '#fffaf4';

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c;
          const alpha = pixels[i * 4 + 3] / 255;
          if (alpha < 0.3) continue;

          const isGreen = pixels[i * 4 + 1] > pixels[i * 4];
          const glyphs = isGreen ? LEAF_GLYPHS : PETAL_GLYPHS;
          const speed = reduceMotion ? 0 : (0.4 + seeds[i] * 1.6) * 0.0012;
          const glyph = glyphs[Math.floor(seeds[i] * glyphs.length + t * speed) % glyphs.length];

          let x = c * cellW + cellW / 2;
          let y = r * cell + cell / 2;
          if (pointer) {
            const dx = x - pointer.x;
            const dy = y - pointer.y;
            const d = Math.hypot(dx, dy);
            if (d < POINTER_RADIUS && d > 0.01) {
              const push = (1 - d / POINTER_RADIUS) ** 2 * cell * 1.8;
              x += (dx / d) * push;
              y += (dy / d) * push;
            }
          }

          tctx.globalAlpha = Math.min(1, alpha * 1.05);
          tctx.fillText(glyph, x, y);
        }
      }
      tctx.globalAlpha = 1;
    };

    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      if (t - last < FRAME_MS) return;
      last = t;
      render(t);
    };

    const start = () => {
      if (running || reduceMotion) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const rect = wrap.getBoundingClientRect();
      // Undo any CSS scaling on ancestors so the push lines up with the cursor
      const scale = rect.width / wrap.offsetWidth || 1;
      pointer = { x: (e.clientX - rect.left) / scale, y: (e.clientY - rect.top) / scale };
      if (reduceMotion) render(0);
    };
    const onLeave = () => {
      pointer = null;
      if (reduceMotion) render(0);
    };

    resize();
    render(performance.now());

    const resizeObserver = new ResizeObserver(() => {
      resize();
      render(performance.now());
    });
    resizeObserver.observe(wrap);

    const visibility = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()));
    visibility.observe(wrap);

    wrap.addEventListener('pointermove', onMove);
    wrap.addEventListener('pointerleave', onLeave);

    // Re-render once the mono font arrives so glyph metrics are right
    document.fonts?.ready.then(() => render(performance.now()));

    return () => {
      stop();
      resizeObserver.disconnect();
      visibility.disconnect();
      wrap.removeEventListener('pointermove', onMove);
      wrap.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <div ref={wrapRef} role='img' aria-label='An orange tulip drawn from code characters' className={`relative ${className}`}>
      <canvas ref={glowRef} aria-hidden='true' className='absolute inset-0 h-full w-full opacity-90' />
      <canvas ref={textRef} aria-hidden='true' className='absolute inset-0 h-full w-full' />
    </div>
  );
}

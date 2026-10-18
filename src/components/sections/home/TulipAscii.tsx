'use client';

import React, { useEffect, useRef } from 'react';

// The hero tulip, grown from characters.
//
// Each frame a shaded, pseudo-3D tulip (six petals arranged around the stem, depth-sorted
// and lit by how much they face the viewer) is painted twice: once at full resolution as a
// softly blurred color underlay, and once into a tiny offscreen canvas with one pixel per
// character cell. Every cell's coverage, brightness and position on the silhouette picks
// its glyph: triangles trace edges, C fills lit areas, Z fills shadow, stars and O mark
// highlights. Glyphs are then tinted with the color beneath them.

const W = 400;
const H = 520;
const BASE = { x: 200, y: 506 }; // where the stem meets the ground
const CUP = { x: 200, y: 262 }; // where the petals meet the stem

const GLYPH_ASPECT = 0.62;
const TARGET_ROWS = 44;
const FRAME_MS = 33;
const POINTER_RADIUS = 70;

// Six tepals in two whorls: outer three at 0/120/240°, inner three offset by 60° and a bit smaller
const PETALS = [0, 120, 240, 60, 180, 300].map((deg, i) => ({
  angle: (deg * Math.PI) / 180,
  inner: i >= 3,
}));

type RGB = [number, number, number];
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const mix = (a: RGB, b: RGB, t: number): RGB => [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
const css = ([r, g, b]: RGB, alpha = 1) => `rgba(${r | 0},${g | 0},${b | 0},${alpha})`;

// Mid-tone oranges: deep enough that the light glyphs on top stay readable
const TIP: RGB = [252, 152, 82];
const BODY: RGB = [236, 98, 18];
const BASE_TONE: RGB = [172, 54, 8];
const SHADOW: RGB = [74, 22, 2];
const LEAF_LIGHT: RGB = [168, 186, 128];
const LEAF_DARK: RGB = [70, 92, 48];

interface Shapes {
  petal: Path2D;
  petalMidrib: Path2D;
  petalVeins: Path2D;
  stem: Path2D;
  leaf: Path2D;
  leafMidrib: Path2D;
}

// Path2D only exists in the browser, so shapes are built inside the effect
function createShapes(): Shapes {
  return {
    // One petal in local coordinates: base at (0, 0), tip at (0, -196)
    petal: new Path2D(
      'M0 6 C-34 4 -60 -40 -60 -105 C-60 -150 -36 -182 0 -196 C36 -182 60 -150 60 -105 C60 -40 34 4 0 6 Z'
    ),
    petalMidrib: new Path2D('M0 -6 C-3 -60 -2 -130 0 -186'),
    // Faint veins fanning out from the base give the shading (and so the glyphs) some grain
    petalVeins: new Path2D(
      'M-6 -4 C-20 -50 -34 -110 -30 -170 M6 -4 C20 -50 34 -110 30 -170 M-10 -2 C-36 -40 -50 -90 -48 -140 M10 -2 C36 -40 50 -90 48 -140'
    ),
    stem: new Path2D('M200 258 C197 330 206 410 200 506'),
    // Grows up and to the left from its base at (0, 0)
    leaf: new Path2D('M0 0 C-48 -30 -76 -92 -72 -170 C-44 -126 -16 -78 0 -26 Z'),
    leafMidrib: new Path2D('M-4 -8 C-26 -50 -48 -100 -62 -150'),
  };
}

// theta: how far the flower has turned; sway: lean from the base
function paintFlower(
  ctx: CanvasRenderingContext2D,
  shapes: Shapes,
  scaleX: number,
  scaleY: number,
  theta: number,
  sway: number
) {
  ctx.save();
  ctx.setTransform(scaleX, 0, 0, scaleY, 0, 0);
  ctx.translate(BASE.x, BASE.y);
  ctx.rotate(sway);
  ctx.translate(-BASE.x, -BASE.y);

  // Stem: a rounded stroke with a lit center
  const stemGrad = ctx.createLinearGradient(193, 0, 207, 0);
  stemGrad.addColorStop(0, css(LEAF_DARK));
  stemGrad.addColorStop(0.45, css(LEAF_LIGHT));
  stemGrad.addColorStop(1, css(LEAF_DARK));
  ctx.strokeStyle = stemGrad;
  ctx.lineCap = 'round';
  ctx.lineWidth = 8;
  ctx.stroke(shapes.stem);

  // Leaves turn with the flower: each narrows as it swings away from the viewer
  const leaves = [
    { x: 199, y: 478, flip: 1, facing: Math.cos(theta + 0.5) },
    { x: 201, y: 500, flip: -1, facing: Math.cos(theta - 0.5) },
  ];
  for (const leaf of leaves) {
    const width = 0.35 + 0.65 * Math.abs(leaf.facing);
    const light = 0.55 + 0.45 * Math.max(0, leaf.facing);
    ctx.save();
    ctx.translate(leaf.x, leaf.y);
    ctx.scale(leaf.flip * width, leaf.flip === 1 ? 1 : 0.92);
    const g = ctx.createLinearGradient(0, 0, -70, -170);
    g.addColorStop(0, css(mix(LEAF_DARK, LEAF_LIGHT, light * 0.5)));
    g.addColorStop(1, css(mix(LEAF_DARK, LEAF_LIGHT, light)));
    ctx.fillStyle = g;
    ctx.fill(shapes.leaf);
    ctx.strokeStyle = css(LEAF_DARK, 0.55);
    ctx.lineWidth = 2.5;
    ctx.stroke(shapes.leafMidrib);
    ctx.restore();
  }

  // Petals, painted back to front
  const placed = PETALS.map((p) => {
    const a = p.angle + theta;
    return { ...p, x: Math.sin(a), z: Math.cos(a) };
  }).sort((a, b) => a.z - b.z);

  for (const p of placed) {
    const radius = p.inner ? 24 : 36;
    const facing = (p.z + 1) / 2; // 0 = facing away, 1 = facing the viewer
    // Petals facing away show their darker inner face
    const light = p.z < 0 ? 0.35 + 0.35 * facing : 0.6 + 0.4 * facing;
    const width = (p.inner ? 0.7 : 0.78) * (0.38 + 0.62 * Math.abs(p.z));

    ctx.save();
    ctx.translate(CUP.x + p.x * radius, CUP.y);
    ctx.rotate(p.x * 0.22); // petals splay outward toward the sides
    ctx.scale(width, p.inner ? 0.9 : 1);

    const g = ctx.createLinearGradient(0, -196, 0, 6);
    g.addColorStop(0, css(mix(SHADOW, TIP, light)));
    g.addColorStop(0.45, css(mix(SHADOW, BODY, light)));
    g.addColorStop(1, css(mix(SHADOW, BASE_TONE, light * 0.9)));
    ctx.fillStyle = g;
    ctx.fill(shapes.petal);

    // Seam where this petal overlaps the ones behind it, then a crease down the middle
    ctx.strokeStyle = css(SHADOW, 0.32);
    ctx.lineWidth = 3 / width;
    ctx.stroke(shapes.petal);
    ctx.save();
    ctx.clip(shapes.petal);
    ctx.strokeStyle = css(SHADOW, 0.14 + 0.1 * facing);
    ctx.lineWidth = 4;
    ctx.stroke(shapes.petalVeins);
    ctx.restore();
    ctx.strokeStyle = css(SHADOW, 0.22 + 0.2 * facing);
    ctx.lineWidth = 3.5;
    ctx.stroke(shapes.petalMidrib);
    if (p.z > 0.2) {
      // Rim light just inside the seam
      ctx.save();
      ctx.clip(shapes.petal);
      ctx.strokeStyle = css(TIP, 0.45 * p.z);
      ctx.lineWidth = 10 / width;
      ctx.stroke(shapes.petal);
      ctx.restore();
    }
    ctx.restore();
  }

  ctx.restore();
}

export function TulipAscii({ className = '' }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const glow = glowRef.current;
    const text = textRef.current;
    if (!wrap || !glow || !text) return;

    const grid = document.createElement('canvas');
    const gridCtx = grid.getContext('2d', { willReadFrequently: true });
    const glowCtx = glow.getContext('2d');
    const textCtx = text.getContext('2d');
    if (!gridCtx || !glowCtx || !textCtx) return;

    const shapes = createShapes();
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const monoFamily =
      getComputedStyle(document.documentElement).getPropertyValue('--font-geist-mono').trim() || 'monospace';
    const font = (size: number) => `600 ${size}px ${monoFamily}, "Apple Symbols", "Segoe UI Symbol", monospace`;

    let cols = 0;
    let rows = 0;
    let cell = 0;
    let cellW = 0;
    let dpr = 1;
    let cssW = 0;
    let cssH = 0;
    let seeds = new Float32Array(0);
    let pointer: { x: number; y: number } | null = null;
    let raf = 0;
    let last = 0;
    let running = false;

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      cssW = rect.width;
      cssH = rect.height;
      cell = Math.max(8, cssH / TARGET_ROWS);
      cellW = cell * GLYPH_ASPECT;
      cols = Math.floor(cssW / cellW);
      rows = Math.floor(cssH / cell);
      grid.width = cols;
      grid.height = rows;
      for (const canvas of [glow, text]) {
        canvas.width = Math.round(cssW * dpr);
        canvas.height = Math.round(cssH * dpr);
      }
      glow.style.filter = `blur(${Math.max(2, Math.round(cell * 0.22))}px) saturate(1.1)`;
      seeds = Float32Array.from({ length: cols * rows }, () => Math.random());
    };

    const render = (t: number) => {
      if (!cols || !rows) return;
      // A slow turn back and forth, plus a gentle lean
      const theta = reduceMotion ? 0.3 : 0.3 + Math.sin(t * 0.00042) * 0.55;
      const sway = reduceMotion ? 0 : Math.sin(t * 0.0009) * 0.03;

      // Color underlay at full resolution, with a faint warm halo for depth
      glowCtx.setTransform(1, 0, 0, 1, 0, 0);
      glowCtx.clearRect(0, 0, glow.width, glow.height);
      const halo = glowCtx.createRadialGradient(
        glow.width * 0.5,
        glow.height * 0.3,
        0,
        glow.width * 0.5,
        glow.height * 0.3,
        glow.width * 0.55
      );
      halo.addColorStop(0, 'rgba(249,117,24,0.16)');
      halo.addColorStop(1, 'rgba(249,117,24,0)');
      glowCtx.fillStyle = halo;
      glowCtx.fillRect(0, 0, glow.width, glow.height);
      paintFlower(glowCtx, shapes, glow.width / W, glow.height / H, theta, sway);

      // The same flower at one pixel per character cell
      gridCtx.setTransform(1, 0, 0, 1, 0, 0);
      gridCtx.clearRect(0, 0, cols, rows);
      paintFlower(gridCtx, shapes, cols / W, rows / H, theta, sway);
      const px = gridCtx.getImageData(0, 0, cols, rows).data;
      const alphaAt = (c: number, r: number) =>
        c < 0 || r < 0 || c >= cols || r >= rows ? 0 : px[(r * cols + c) * 4 + 3] / 255;
      const lumAt = (c: number, r: number) => {
        if (c < 0 || r < 0 || c >= cols || r >= rows) return 0;
        const j = (r * cols + c) * 4;
        return (0.299 * px[j] + 0.587 * px[j + 1] + 0.114 * px[j + 2]) / 255;
      };

      textCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      textCtx.clearRect(0, 0, cssW, cssH);
      textCtx.globalCompositeOperation = 'source-over';
      textCtx.font = font(cell * 0.86);
      textCtx.textAlign = 'center';
      textCtx.textBaseline = 'middle';
      textCtx.fillStyle = '#ffffff';

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c;
          const alpha = px[i * 4 + 3] / 255;
          if (alpha < 0.35) continue;

          const R = px[i * 4];
          const G = px[i * 4 + 1];
          const B = px[i * 4 + 2];
          const lum = (0.299 * R + 0.587 * G + 0.114 * B) / 255;
          const green = G > R;
          const edge =
            alphaAt(c - 1, r) < 0.35 || alphaAt(c + 1, r) < 0.35 || alphaAt(c, r - 1) < 0.35 || alphaAt(c, r + 1) < 0.35;
          // Seams and folds inside the flower: a sharp step in brightness to a neighbour
          const fold = !edge && Math.abs(lumAt(c + 1, r) - lumAt(c - 1, r)) > 0.16;

          // Dither the thresholds a little per cell so tones interleave instead of banding
          const tone = lum + (seeds[i] - 0.5) * 0.09;

          // The stem is only a cell or two wide; fill it with letters rather than edge marks
          const thinStem = green && alphaAt(c - 1, r) < 0.35 && alphaAt(c + 1, r) < 0.35;

          let glyph: string;
          if (thinStem) glyph = r % 3 === 0 ? 'C' : 'Z';
          else if (edge || fold) glyph = (r + c) % 2 === 0 ? '△' : '▽';
          else if (!green && tone > 0.6) glyph = seeds[i] < 0.5 ? '☆' : 'O';
          else if (tone < 0.44) glyph = 'Z';
          else {
            // Leave the odd cell empty so the surface reads as texture, not a solid fill
            if (seeds[i] < 0.06) continue;
            glyph = 'C';
          }

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

          textCtx.globalAlpha = Math.min(1, alpha * 1.1) * (edge ? 0.85 : 0.95);
          textCtx.fillText(glyph, x, y);
        }
      }

      // Tint each glyph toward the color underneath it
      textCtx.globalAlpha = 0.2;
      textCtx.globalCompositeOperation = 'source-atop';
      textCtx.imageSmoothingEnabled = false;
      textCtx.drawImage(grid, 0, 0, cols * cellW, rows * cell);
      textCtx.globalCompositeOperation = 'source-over';
      textCtx.globalAlpha = 1;
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
      <canvas ref={glowRef} aria-hidden='true' className='absolute inset-0 h-full w-full opacity-95' />
      <canvas
        ref={textRef}
        aria-hidden='true'
        className='absolute inset-0 h-full w-full [filter:drop-shadow(0_0_1.5px_rgba(255,244,232,0.85))]'
      />
    </div>
  );
}

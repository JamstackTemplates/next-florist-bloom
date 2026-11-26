// Shared botanical drawing kit. Style: flat layered fills with a 1.5px moss-ink outline printed slightly
// off-register (fill shifted, outline true), fine hatching for petal folds and leaf midribs.
// Colours come from CSS variables so the same art re-colours in dark mode; bloom tones are fixed paper inks.
import type { ReactNode } from 'react';
import type { BloomTone, FlowerKind, FoliageKind } from '../../content/arrangements';

export const TONES: Record<BloomTone, [string, string, string]> = {
  coral: ['#F6B39A', '#EA8A70', '#CF624E'],
  pink: ['#F8CAD7', '#EE9DB8', '#D6708F'],
  cream: ['#FCF0DE', '#F1DAB6', '#D9BB8C'],
  red: ['#DE5A6B', '#B52F48', '#831C33'],
  white: ['#FFFDF8', '#F0ECE2', '#D6D1C2'],
  butter: ['#FCE6A6', '#F3CB6B', '#D9A740'],
  lilac: ['#E0D0EE', '#C1A6DD', '#9478BF'],
  magenta: ['#E8709F', '#C63D7B', '#97205B'],
  apricot: ['#FBD2AE', '#F3AC78', '#DD8550'],
};

const INK = 'var(--ink-line)';
const OFFSET = 'translate(1.6 1.3)';

/** Deterministic pseudo-random numbers so server and client draw the same art. */
export function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const f = (n: number) => Math.round(n * 10) / 10;

/** Closed scalloped outline: `n` bumps around an ellipse. */
export function scallop(cx: number, cy: number, rx: number, ry: number, n: number, bulge: number, seed: number, rotate = 0): string {
  const rand = rng(seed);
  const pts: [number, number, number][] = [];
  for (let i = 0; i < n; i++) {
    const a = rotate + (i / n) * Math.PI * 2 + (rand() - .5) * (Math.PI / n) * .5;
    const k = 1 + (rand() - .5) * .14;
    pts.push([a, rx * k, ry * k]);
  }
  let d = '';
  pts.forEach(([a, px, py], i) => {
    const [b, qx, qy] = pts[(i + 1) % n];
    const end = b < a ? b + Math.PI * 2 : b;
    const mid = (a + end) / 2;
    const swell = 1 + bulge * (.8 + rand() * .4);
    const x0 = cx + Math.cos(a) * px, y0 = cy + Math.sin(a) * py;
    const x1 = cx + Math.cos(b) * qx, y1 = cy + Math.sin(b) * qy;
    const mx = cx + Math.cos(mid) * ((px + qx) / 2) * swell, my = cy + Math.sin(mid) * ((py + qy) / 2) * swell;
    d += `${i === 0 ? `M${f(x0)} ${f(y0)}` : ''}Q${f(mx)} ${f(my)} ${f(x1)} ${f(y1)}`;
  });
  return `${d}Z`;
}

/** A filled shape printed off-register: shifted fill, true outline. */
export function Inked({ d, fill, stroke = INK, width = 1.5, opacity }: { d: string; fill: string; stroke?: string; width?: number; opacity?: number }) {
  return <>
    <path d={d} fill={fill} transform={OFFSET} opacity={opacity} />
    <path d={d} fill="none" stroke={stroke} strokeWidth={width} strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
  </>;
}

/** Unfilled line in ink (hatching, stems, midribs). */
export function Line({ d, width = 1.2, stroke = INK, opacity = 1 }: { d: string; width?: number; stroke?: string; opacity?: number }) {
  return <path d={d} fill="none" stroke={stroke} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" opacity={opacity} vectorEffect="non-scaling-stroke" />;
}

type Placed = { x: number; y: number; r: number; rot?: number; seed?: number };
type Toned = Placed & { tone: BloomTone };
const place = ({ x, y, rot = 0 }: Placed, children: ReactNode) => <g transform={`translate(${f(x)} ${f(y)}) rotate(${f(rot)})`}>{children}</g>;

/** Peony: ruffled outer petals, a darker cup and a crumpled crown. */
export function Peony(p: Toned) {
  const [c1, c2, c3] = TONES[p.tone];
  const s = p.seed ?? 7, r = p.r;
  const folds = Array.from({ length: 9 }, (_, i) => {
    const a = (i / 9) * Math.PI * 2 + .3;
    const r0 = r * .58, r1 = r * .86;
    return `M${f(Math.cos(a) * r0)} ${f(Math.sin(a) * r0 * .9)}Q${f(Math.cos(a + .12) * (r0 + r1) / 2)} ${f(Math.sin(a + .12) * (r0 + r1) / 2 * .9)} ${f(Math.cos(a + .05) * r1)} ${f(Math.sin(a + .05) * r1 * .9)}`;
  }).join('');
  const guards = Array.from({ length: 5 }, (_, i) => {
    const a = (i / 5) * Math.PI * 2 + (s % 5) * .3;
    const gx = Math.cos(a) * r * .62, gy = Math.sin(a) * r * .56;
    return <g key={i} transform={`translate(${f(gx)} ${f(gy)}) rotate(${f((a * 180) / Math.PI + 90)})`}>
      <Inked d={scallop(0, -r * .1, r * .44, r * .5, 5, .3, s + 10 + i)} fill={c3} />
    </g>;
  });
  return place(p, <>
    {guards}
    <Inked d={scallop(0, 0, r * .96, r * .86, 11, .3, s)} fill={c2} />
    <Line d={folds} width={.9} opacity={.55} />
    <Inked d={scallop(0, -r * .07, r * .74, r * .62, 8, .26, s + 1, .4)} fill={c1} />
    <Inked d={scallop(0, -r * .12, r * .5, r * .4, 7, .3, s + 2, .2)} fill={c3} />
    <Inked d={scallop(0, -r * .17, r * .3, r * .23, 6, .34, s + 3)} fill={c1} />
    <Line d={`M${f(-r * .12)} ${f(-r * .16)}q${f(r * .1)} ${f(-r * .08)} ${f(r * .22)} 0M${f(-r * .3)} ${f(r * .05)}q${f(r * .25)} ${f(r * .12)} ${f(r * .55)} ${f(-r * .04)}`} width={.9} opacity={.6} />
  </>);
}

/** Garden rose: five outer petals and an inked spiral heart. */
export function Rose(p: Toned) {
  const [c1, c2, c3] = TONES[p.tone];
  const r = p.r;
  const spiral: string[] = [];
  for (let i = 0; i <= 30; i++) {
    const t = (i / 30) * Math.PI * 3.4;
    const rad = r * (.06 + .52 * (i / 30));
    spiral.push(`${i ? 'L' : 'M'}${f(Math.cos(t) * rad)} ${f(Math.sin(t) * rad * .86 - r * .05)}`);
  }
  return place(p, <>
    <Inked d={scallop(0, 0, r, r * .92, 5, .34, p.seed ?? 3)} fill={c2} />
    <Inked d={scallop(0, -r * .04, r * .7, r * .62, 5, .3, (p.seed ?? 3) + 4, .6)} fill={c1} />
    <circle cx={0} cy={-r * .05} r={r * .34} fill={c3} opacity={.55} transform={OFFSET} />
    <Line d={spiral.join('')} width={1.1} />
  </>);
}

/** Ranunculus: tight concentric cups with a green eye. */
export function Ranunculus(p: Toned) {
  const [c1, c2, c3] = TONES[p.tone];
  const r = p.r, s = p.seed ?? 11;
  return place(p, <>
    <Inked d={scallop(0, 0, r, r * .94, 12, .08, s)} fill={c2} />
    <Inked d={scallop(0, -r * .06, r * .78, r * .72, 11, .08, s + 1)} fill={c1} />
    <Inked d={scallop(0, -r * .1, r * .56, r * .5, 10, .08, s + 2)} fill={c3} />
    <Inked d={scallop(0, -r * .14, r * .36, r * .32, 8, .1, s + 3)} fill={c1} />
    <circle cx={0} cy={-r * .15} r={r * .12} fill="var(--leaf-1)" stroke={INK} strokeWidth={1} vectorEffect="non-scaling-stroke" />
  </>);
}

function petal(len: number, w: number) {
  return `M0 0Q${f(w)} ${f(-len * .5)} 0 ${f(-len)}Q${f(-w)} ${f(-len * .5)} 0 0Z`;
}

/** Dahlia: three rings of pointed petals. */
export function Dahlia(p: Toned) {
  const [c1, c2, c3] = TONES[p.tone];
  const r = p.r;
  const ring = (n: number, len: number, w: number, fill: string, turn: number) =>
    Array.from({ length: n }, (_, i) => <g key={i} transform={`rotate(${f((i / n) * 360 + turn)})`}><Inked d={petal(len, w)} fill={fill} width={1.1} /></g>);
  return place(p, <>
    {ring(14, r, r * .24, c2, 0)}
    {ring(11, r * .72, r * .2, c1, 12)}
    {ring(8, r * .45, r * .16, c3, 5)}
    <circle r={r * .16} fill={c3} stroke={INK} strokeWidth={1} vectorEffect="non-scaling-stroke" />
  </>);
}

/** Cosmos / chamomile: rounded petals around a butter disc. */
export function Daisy(p: Toned) {
  const [c1] = TONES[p.tone];
  const r = p.r;
  return place(p, <>
    {Array.from({ length: 10 }, (_, i) => <g key={i} transform={`rotate(${i * 36})`}>
      <Inked d={`M0 ${f(-r * .2)}C${f(r * .32)} ${f(-r * .45)} ${f(r * .24)} ${f(-r)} 0 ${f(-r)}C${f(-r * .24)} ${f(-r)} ${f(-r * .32)} ${f(-r * .45)} 0 ${f(-r * .2)}Z`} fill={c1} width={1.1} />
    </g>)}
    <Inked d={scallop(0, 0, r * .3, r * .3, 8, .1, 5)} fill={TONES.butter[2]} />
    {[[-.08, -.08], [.1, -.02], [-.02, .1], [.06, .12], [-.12, .06]].map(([dx, dy], i) => <circle key={i} cx={dx * r} cy={dy * r} r={Math.max(.8, r * .03)} fill={INK} opacity={.6} />)}
  </>);
}

/** Hellebore: five broad nodding petals with a stamen ring. */
export function Hellebore(p: Toned) {
  const [c1, c2] = TONES[p.tone];
  const r = p.r;
  return place(p, <>
    <Inked d={scallop(0, 0, r, r * .94, 5, .5, p.seed ?? 21, -.3)} fill={c1} />
    <Line d={Array.from({ length: 5 }, (_, i) => { const a = (i / 5) * Math.PI * 2 - .3 + .63; return `M0 0L${f(Math.cos(a) * r * .75)} ${f(Math.sin(a) * r * .7)}`; }).join('')} width={.8} opacity={.4} />
    <circle r={r * .3} fill={c2} transform={OFFSET} />
    {Array.from({ length: 10 }, (_, i) => { const a = (i / 10) * Math.PI * 2; return <circle key={i} cx={Math.cos(a) * r * .26} cy={Math.sin(a) * r * .26} r={Math.max(1, r * .05)} fill={TONES.butter[1]} stroke={INK} strokeWidth={.6} vectorEffect="non-scaling-stroke" />; })}
    <circle r={r * .12} fill="var(--leaf-1)" stroke={INK} strokeWidth={1} vectorEffect="non-scaling-stroke" />
  </>);
}

/** Sweet pea: a ruffled bonnet with a curling tendril. */
export function SweetPea(p: Toned) {
  const [c1, c2, c3] = TONES[p.tone];
  const r = p.r, s = p.seed ?? 31;
  return place(p, <>
    <Line d={`M${f(r * .1)} ${f(r * .6)}c${f(r * .5)} ${f(r * .3)} ${f(r * .9)} ${f(r * .1)} ${f(r * .8)} ${f(-r * .3)}c${f(-r * .1)} ${f(-r * .3)} ${f(-r * .45)} ${f(-r * .15)} ${f(-r * .3)} ${f(r * .05)}`} width={1} stroke="var(--leaf-2)" />
    <Inked d={scallop(0, 0, r, r * .8, 7, .3, s)} fill={c2} />
    <Inked d={scallop(-r * .18, r * .2, r * .55, r * .45, 6, .3, s + 1)} fill={c1} />
    <Inked d={`M${f(-r * .3)} ${f(r * .45)}q${f(r * .1)} ${f(r * .3)} ${f(r * .35)} ${f(r * .1)}`} fill={c3} />
  </>);
}

/** Bud: a closed teardrop with sepals. */
export function Bud(p: Toned) {
  const [, c2] = TONES[p.tone];
  const r = p.r;
  return place(p, <>
    <Line d={`M0 ${f(r * .6)}L0 ${f(r * 2.4)}`} width={1.2} stroke="var(--leaf-3)" />
    <Inked d={`M0 ${f(r * .7)}C${f(r * .8)} ${f(r * .4)} ${f(r * .7)} ${f(-r * .6)} 0 ${f(-r)}C${f(-r * .7)} ${f(-r * .6)} ${f(-r * .8)} ${f(r * .4)} 0 ${f(r * .7)}Z`} fill={c2} />
    <Inked d={`M0 ${f(r * .75)}L${f(-r * .55)} ${f(r * .1)}L${f(-r * .1)} ${f(r * .45)}L0 ${f(-r * .1)}L${f(r * .1)} ${f(r * .45)}L${f(r * .55)} ${f(r * .1)}Z`} fill="var(--leaf-1)" width={1} />
  </>);
}

/** Astilbe plume: a feathery cone of dots. */
export function Astilbe({ x, y, h, tone, seed = 41, rot = 0 }: { x: number; y: number; h: number; tone: BloomTone; seed?: number; rot?: number }) {
  const rand = rng(seed);
  const [c1, c2] = TONES[tone];
  const dots = Array.from({ length: 34 }, (_, i) => {
    const t = i / 34;
    const w = h * .22 * (1 - t);
    return { cx: (rand() - .5) * 2 * w, cy: -t * h, r: Math.max(1.2, h * .03 * (1.2 - t)), fill: rand() > .5 ? c1 : c2 };
  });
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <Line d={`M0 ${f(h * .15)}L0 ${f(-h)}`} width={1} stroke="var(--leaf-3)" />
    {dots.map((d, i) => <circle key={i} {...d} stroke={INK} strokeWidth={.5} vectorEffect="non-scaling-stroke" />)}
  </g>;
}

/** Foxglove spire: speckled bells shrinking toward the tip. */
export function Foxglove({ x, y, h, tone = 'magenta', rot = 0 }: { x: number; y: number; h: number; tone?: BloomTone; rot?: number }) {
  const [c1, c2, c3] = TONES[tone];
  const bells = Array.from({ length: 9 }, (_, i) => {
    const t = i / 9, s = h * .085 * (1 - t * .65), side = i % 2 ? 1 : -1;
    return { y: -h * .12 - t * h * .82, s, side };
  });
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <Line d={`M0 0Q${f(h * .04)} ${f(-h * .5)} 0 ${f(-h)}`} width={1.3} stroke="var(--leaf-3)" />
    {bells.map((b, i) => <g key={i} transform={`translate(${f(b.side * b.s * .5)} ${f(b.y)}) rotate(${b.side * 22})`}>
      <Inked d={`M0 ${f(-b.s)}C${f(b.s * .9)} ${f(-b.s)} ${f(b.s)} ${f(b.s * .6)} ${f(b.s * .7)} ${f(b.s)}L${f(-b.s * .7)} ${f(b.s)}C${f(-b.s)} ${f(b.s * .6)} ${f(-b.s * .9)} ${f(-b.s)} 0 ${f(-b.s)}Z`} fill={i % 3 === 0 ? c1 : c2} width={1} />
      <ellipse cx={0} cy={f(b.s * .85)} rx={f(b.s * .55)} ry={f(b.s * .2)} fill={c3} />
      <circle cx={f(-b.s * .2)} cy={f(b.s * .4)} r={Math.max(.8, b.s * .1)} fill={INK} opacity={.55} />
      <circle cx={f(b.s * .25)} cy={f(b.s * .55)} r={Math.max(.8, b.s * .08)} fill={INK} opacity={.55} />
    </g>)}
  </g>;
}

/** Pointed leaf with a midrib, tip at (0,-len). */
export function Leaf({ x, y, len, w, rot = 0, fill = 'var(--leaf-2)' }: { x: number; y: number; len: number; w: number; rot?: number; fill?: string }) {
  return <g transform={`translate(${f(x)} ${f(y)}) rotate(${f(rot)})`}>
    <Inked d={`M0 0C${f(w)} ${f(-len * .25)} ${f(w * .8)} ${f(-len * .75)} 0 ${f(-len)}C${f(-w * .8)} ${f(-len * .75)} ${f(-w)} ${f(-len * .25)} 0 0Z`} fill={fill} />
    <Line d={`M0 ${f(-len * .05)}Q${f(w * .12)} ${f(-len * .5)} 0 ${f(-len * .92)}`} width={.9} opacity={.6} />
  </g>;
}

/** A stem from (x,y) curving by `bend` over `len`, angled `rot` degrees from vertical. Returns point at t. */
function stemPoint(len: number, bend: number, t: number): [number, number] {
  // Quadratic from (0,0) via (bend, -len/2) to (bend*.6, -len).
  const x = 2 * (1 - t) * t * bend + t * t * bend * .6;
  const y = -len * t;
  return [x, y];
}

/** Silver-dollar eucalyptus: round leaves alternating up a curving stem. */
export function Eucalyptus({ x, y, len, rot = 0, bend = 20, seed = 51 }: { x: number; y: number; len: number; rot?: number; bend?: number; seed?: number }) {
  const rand = rng(seed);
  const n = Math.max(5, Math.round(len / 26));
  return <g transform={`translate(${f(x)} ${f(y)}) rotate(${f(rot)})`}>
    <Line d={`M0 0Q${f(bend)} ${f(-len / 2)} ${f(bend * .6)} ${f(-len)}`} width={1.3} stroke="var(--euc-2)" />
    {Array.from({ length: n }, (_, i) => {
      const t = .12 + (i / n) * .9;
      const [px, py] = stemPoint(len, bend, t);
      const side = i % 2 ? 1 : -1;
      const r = (len * .1) * (1.15 - t * .6) * (.9 + rand() * .2);
      return <g key={i} transform={`translate(${f(px + side * r * .75)} ${f(py)})`}>
        <Inked d={`M${f(-r)} 0a${f(r)} ${f(r * .92)} 0 1 0 ${f(r * 2)} 0a${f(r)} ${f(r * .92)} 0 1 0 ${f(-r * 2)} 0Z`} fill={i % 3 ? 'var(--euc-1)' : 'var(--euc-2)'} width={1.1} />
        <Line d={`M${f(-side * r * .7)} 0L${f(side * r * .5)} ${f(-r * .1)}`} width={.7} opacity={.45} />
      </g>;
    })}
  </g>;
}

/** Fern frond: paired leaflets shrinking to the tip. */
export function Fern({ x, y, len, rot = 0, bend = 26 }: { x: number; y: number; len: number; rot?: number; bend?: number }) {
  const n = 11;
  return <g transform={`translate(${f(x)} ${f(y)}) rotate(${f(rot)})`}>
    <Line d={`M0 0Q${f(bend)} ${f(-len / 2)} ${f(bend * .6)} ${f(-len)}`} width={1.3} stroke="var(--leaf-3)" />
    {Array.from({ length: n }, (_, i) => {
      const t = .1 + (i / n) * .88;
      const [px, py] = stemPoint(len, bend, t);
      const l = len * .2 * (1.05 - t * .8);
      return <g key={i}>
        <Leaf x={px} y={py} len={l} w={l * .26} rot={-62 + t * 20} fill={i % 2 ? 'var(--leaf-1)' : 'var(--leaf-2)'} />
        <Leaf x={px} y={py} len={l} w={l * .26} rot={62 - t * 20} fill={i % 2 ? 'var(--leaf-2)' : 'var(--leaf-1)'} />
      </g>;
    })}
  </g>;
}

/** Olive branch: narrow silvery leaves. */
export function Olive({ x, y, len, rot = 0, bend = 14 }: { x: number; y: number; len: number; rot?: number; bend?: number }) {
  const n = Math.max(5, Math.round(len / 22));
  return <g transform={`translate(${f(x)} ${f(y)}) rotate(${f(rot)})`}>
    <Line d={`M0 0Q${f(bend)} ${f(-len / 2)} ${f(bend * .6)} ${f(-len)}`} width={1.2} stroke="var(--olive-2)" />
    {Array.from({ length: n }, (_, i) => {
      const t = .12 + (i / n) * .88;
      const [px, py] = stemPoint(len, bend, t);
      const side = i % 2 ? 1 : -1;
      return <Leaf key={i} x={px} y={py} len={len * .2} w={len * .035} rot={side * (48 - t * 18)} fill={i % 3 ? 'var(--olive-1)' : 'var(--olive-2)'} />;
    })}
  </g>;
}

export function Foliage({ kind, ...props }: { kind: FoliageKind; x: number; y: number; len: number; rot?: number; bend?: number; seed?: number }) {
  if (kind === 'fern') return <Fern {...props} />;
  if (kind === 'olive') return <Olive {...props} />;
  return <Eucalyptus {...props} />;
}

export function Flower({ kind, ...p }: Toned & { kind: FlowerKind }) {
  switch (kind) {
    case 'peony': return <Peony {...p} />;
    case 'rose': return <Rose {...p} />;
    case 'ranunculus': return <Ranunculus {...p} />;
    case 'dahlia': return <Dahlia {...p} />;
    case 'daisy': return <Daisy {...p} />;
    case 'hellebore': return <Hellebore {...p} />;
    case 'sweet-pea': return <SweetPea {...p} />;
  }
}

/** Scattered fallen petals. */
export function Petals({ seed = 61, count = 9, w, h, tones = ['pink', 'coral', 'magenta'] as BloomTone[] }: { seed?: number; count?: number; w: number; h: number; tones?: BloomTone[] }) {
  const rand = rng(seed);
  return <>{Array.from({ length: count }, (_, i) => {
    const s = 7 + rand() * 9;
    return <g key={i} transform={`translate(${f(rand() * w)} ${f(rand() * h)}) rotate(${f(rand() * 360)})`}>
      <Inked d={`M0 0C${f(s)} ${f(-s * .3)} ${f(s * .9)} ${f(-s * 1.3)} 0 ${f(-s * 1.4)}C${f(-s * .7)} ${f(-s * 1.2)} ${f(-s * .9)} ${f(-s * .3)} 0 0Z`} fill={TONES[tones[i % tones.length]][i % 2]} width={1} />
    </g>;
  })}</>;
}

/** Shared SVG props for decorative art. */
export const decorative = { 'aria-hidden': true, focusable: false, 'data-art': '' } as const;

// Logo, dividers, icons and the delivery bloom map.
import type { DeliveryZone } from '../../content/delivery';
import { Bud, Eucalyptus, Inked, Leaf, Line, Peony, Petals, decorative, scallop } from './botanical';

/** Peony-bud monogram used in the wordmark and app/icon.svg. */
export function PeonyBud({ className = '' }: { className?: string }) {
  return <svg viewBox="0 0 64 64" className={className} {...decorative}>
    <path d="M32 60 Q30 48 33 38" fill="none" stroke="var(--foliage)" strokeWidth={3} strokeLinecap="round" />
    <path d="M33 46 q-12 -2 -16 6 q10 2 16 -6Z" fill="var(--leaf-2)" stroke="var(--ink-line)" strokeWidth={1.4} />
    <path d="M32 40 C48 36 50 16 32 6 C14 16 16 36 32 40Z" fill="var(--primary)" transform="translate(1.5 1.2)" />
    <path d="M32 40 C48 36 50 16 32 6 C14 16 16 36 32 40Z" fill="none" stroke="var(--ink-line)" strokeWidth={1.6} />
    <path d="M32 40 C26 30 26 18 32 8 M32 40 C40 32 42 22 38 14" fill="none" stroke="#F8CAD7" strokeWidth={1.4} strokeLinecap="round" />
    <path d="M32 41 L22 30 L30 34 L32 26 L34 34 L42 30Z" fill="var(--leaf-1)" stroke="var(--ink-line)" strokeWidth={1.2} strokeLinejoin="round" />
  </svg>;
}

/** Eucalyptus sprig curling under the header wordmark. */
export function HeaderSprig({ className = '' }: { className?: string }) {
  return <svg viewBox="0 0 220 40" className={className} {...decorative}>
    <path d="M4 10 C60 34 140 34 214 14" fill="none" stroke="var(--euc-2)" strokeWidth={1.4} />
    {[18, 44, 70, 98, 126, 154, 182, 204].map((x, i) => {
      const y = 10 + Math.sin((x / 214) * Math.PI) * 18 + (i % 2 ? 7 : -7);
      const r = 5.5 - i * .3;
      return <g key={x}><circle cx={x} cy={y} r={r} fill={i % 2 ? 'var(--euc-1)' : 'var(--euc-2)'} transform="translate(1 1)" /><circle cx={x} cy={y} r={r} fill="none" stroke="var(--ink-line)" strokeWidth={1} /></g>;
    })}
  </svg>;
}

/** Wide trailing eucalyptus vine. */
export function VineDivider({ className = '' }: { className?: string }) {
  return <svg viewBox="0 0 1200 90" preserveAspectRatio="xMidYMid meet" className={className} {...decorative}>
    <Line d="M0 50 C200 10 400 90 600 50 S1000 10 1200 50" width={1.4} stroke="var(--euc-2)" />
    {Array.from({ length: 30 }, (_, i) => {
      const x = 20 + i * 40;
      const y = 50 + Math.sin((x / 1200) * Math.PI * 2 + Math.PI) * 22 * (x < 600 ? 1 : 1);
      const r = 8 + ((i * 7) % 5);
      return <g key={i} transform={`translate(${x} ${y + (i % 2 ? 12 : -12)})`}>
        <Inked d={`M${-r} 0a${r} ${r * .9} 0 1 0 ${r * 2} 0a${r} ${r * .9} 0 1 0 ${-r * 2} 0Z`} fill={i % 3 ? 'var(--euc-1)' : 'var(--euc-2)'} width={1.1} />
      </g>;
    })}
    <g transform="translate(600 46)"><Peony x={0} y={0} r={26} tone="pink" seed={5} /></g>
  </svg>;
}

/** A scatter of fallen petals. */
export function PetalDivider({ className = '' }: { className?: string }) {
  return <svg viewBox="0 0 1200 80" preserveAspectRatio="xMidYMid meet" className={className} {...decorative}>
    <Petals w={1180} h={60} count={22} seed={12} tones={['pink', 'coral', 'magenta', 'cream']} />
  </svg>;
}

/** Twine line with tiny clothes-peg tags. */
export function TwineDivider({ className = '' }: { className?: string }) {
  return <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className={className} {...decorative}>
    <path d="M0 14 Q600 38 1200 14" fill="none" stroke="var(--twine)" strokeWidth={2} vectorEffect="non-scaling-stroke" />
    {[120, 300, 480, 660, 840, 1020].map((x, i) => {
      const y = 14 + Math.sin((x / 1200) * Math.PI) * 24;
      return <g key={x} transform={`translate(${x} ${y}) rotate(${(i % 2 ? 4 : -5)})`}>
        <rect x={-3} y={-8} width={6} height={16} fill="var(--kraft-edge)" />
        <rect x={-12} y={6} width={24} height={16} fill="var(--kraft-paper)" stroke="var(--ink-line)" strokeWidth={1} vectorEffect="non-scaling-stroke" />
      </g>;
    })}
  </svg>;
}

type IconName = 'bicycle' | 'secateurs' | 'ribbon' | 'clock' | 'vase' | 'rings' | 'pin' | 'notice';

/** Small inked icons, drawn in the same style. Decorative unless given a title. */
export function Icon({ name, className = 'size-10', title }: { name: IconName; className?: string; title?: string }) {
  const ink = { fill: 'none', stroke: 'var(--ink-line)', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  const body = {
    bicycle: <>
      <circle cx={13} cy={34} r={9} fill="var(--zinc-1)" transform="translate(1 1)" /><circle cx={13} cy={34} r={9} {...ink} />
      <circle cx={37} cy={34} r={9} fill="var(--zinc-1)" transform="translate(1 1)" /><circle cx={37} cy={34} r={9} {...ink} />
      <path d="M13 34 L21 20 L33 20 L37 34 M21 20 L26 34 L33 20 M19 15 h6 M33 20 L35 13 h5" {...ink} />
      <rect x={36} y={6} width={11} height={8} fill="var(--kraft-paper)" stroke="var(--ink-line)" strokeWidth={1.4} />
      <circle cx={40} cy={4} r={3.2} fill="#EE9DB8" stroke="var(--ink-line)" strokeWidth={1.1} /><circle cx={45} cy={3.5} r={2.6} fill="#F6B39A" stroke="var(--ink-line)" strokeWidth={1.1} />
    </>,
    secateurs: <>
      <path d="M24 26 L12 8 Q18 6 26 20Z" fill="var(--zinc-1)" stroke="var(--ink-line)" strokeWidth={1.4} />
      <path d="M24 26 L36 8 Q30 6 22 20Z" fill="var(--zinc-2)" stroke="var(--ink-line)" strokeWidth={1.4} />
      <path d="M24 26 L14 44 M24 26 L34 44" stroke="var(--primary)" strokeWidth={5} strokeLinecap="round" />
      <path d="M24 26 L14 44 M24 26 L34 44" {...ink} strokeWidth={1.1} /><circle cx={24} cy={26} r={2.4} fill="var(--ink-line)" />
    </>,
    ribbon: <>
      <path d="M24 22 C12 8 4 18 24 22 C44 18 36 8 24 22Z" fill="#EE9DB8" stroke="var(--ink-line)" strokeWidth={1.4} />
      <path d="M24 22 L14 42 M24 22 L34 42" stroke="#C63D7B" strokeWidth={5} strokeLinecap="round" /><path d="M24 22 L14 42 M24 22 L34 42" {...ink} strokeWidth={1} />
      <circle cx={24} cy={22} r={3.5} fill="#C63D7B" stroke="var(--ink-line)" strokeWidth={1.2} />
    </>,
    clock: <>
      <path d={scallop(24, 24, 19, 19, 10, .22, 2)} fill="#F8CAD7" transform="translate(1 1)" /><path d={scallop(24, 24, 19, 19, 10, .22, 2)} {...ink} />
      <circle cx={24} cy={24} r={12} fill="#FFFDF8" stroke="var(--ink-line)" strokeWidth={1.3} /><path d="M24 16 V24 L30 27" {...ink} />
    </>,
    vase: <>
      <path d="M17 18 Q12 30 16 44 H32 Q36 30 31 18Z" fill="var(--euc-1)" transform="translate(1 1)" /><path d="M17 18 Q12 30 16 44 H32 Q36 30 31 18Z" {...ink} />
      <path d="M24 18 V6 M24 12 q-7 -3 -9 -8 M24 10 q6 -2 8 -7" {...ink} stroke="var(--leaf-3)" />
      <circle cx={24} cy={6} r={4} fill="#EE9DB8" stroke="var(--ink-line)" strokeWidth={1.1} />
    </>,
    rings: <>
      <circle cx={19} cy={28} r={10} fill="none" stroke="#D9A740" strokeWidth={3.4} /><circle cx={30} cy={28} r={10} fill="none" stroke="#F3CB6B" strokeWidth={3.4} />
      <circle cx={19} cy={28} r={10} {...ink} strokeWidth={.9} /><circle cx={30} cy={28} r={10} {...ink} strokeWidth={.9} />
      <path d={scallop(24, 12, 7, 6, 7, .3, 1)} fill="#F8CAD7" stroke="var(--ink-line)" strokeWidth={1.1} />
    </>,
    pin: <>
      <path d="M24 46 C14 32 10 26 10 19 a14 14 0 0 1 28 0 C38 26 34 32 24 46Z" fill="var(--primary)" transform="translate(1 1)" /><path d="M24 46 C14 32 10 26 10 19 a14 14 0 0 1 28 0 C38 26 34 32 24 46Z" {...ink} />
      <path d={scallop(24, 19, 6.5, 6.5, 6, .35, 3)} fill="#F8CAD7" stroke="var(--ink-line)" strokeWidth={1} />
    </>,
    notice: <>
      <rect x={8} y={10} width={32} height={30} rx={3} fill="var(--kraft-paper)" transform="translate(1 1)" /><rect x={8} y={10} width={32} height={30} rx={3} {...ink} />
      <path d="M8 18 H40 M16 6 V14 M32 6 V14" {...ink} /><path d="M17 28 L22 33 L31 23" {...ink} stroke="var(--primary)" strokeWidth={2.2} />
    </>,
  }[name];
  return <svg viewBox="0 0 48 48" className={className} role={title ? 'img' : undefined} aria-hidden={title ? undefined : true} aria-label={title} data-art="">
    {body}
  </svg>;
}

/** Delivery zones as concentric petal rings around the market roof; suburbs are seed dots. */
export function BloomMap({ zones, className = '', labels = true }: { zones: readonly DeliveryZone[]; className?: string; labels?: boolean }) {
  const radii = [[0, 150], [150, 250], [250, 340]];
  const fills = ['var(--petal)', 'var(--petal)', 'var(--petal)'];
  const alpha = [.5, .3, .16];
  return <svg viewBox="-50 -10 860 780" className={className} role="img" aria-label={`Delivery map: ${zones.map(z => `${z.name}, ${z.suburbs.length} suburbs`).join('; ')}`}>
    <g transform="translate(380 380)">
      {[...zones].reverse().map((zone, ri) => {
        const i = zones.length - 1 - ri;
        const [, outer] = radii[Math.min(i, radii.length - 1)];
        return <g key={zone.id}>
          <path d={scallop(0, 0, outer, outer * .96, 14 - i * 3, .1, 20 + i)} fill={fills[i]} opacity={alpha[i]} transform="translate(3 3)" />
          <path d={scallop(0, 0, outer, outer * .96, 14 - i * 3, .1, 20 + i)} fill="none" stroke="var(--ink-line)" strokeWidth={1.4} strokeDasharray={i === 2 ? '6 6' : undefined} />
        </g>;
      })}
      {zones.map((zone, i) => {
        const [inner, outer] = radii[Math.min(i, radii.length - 1)];
        const mid = inner === 0 ? 100 : (inner + outer) / 2;
        return zone.suburbs.map((suburb, j) => {
          const a = (j / zone.suburbs.length) * Math.PI * 2 - Math.PI / 2 + i * .32;
          const x = Math.cos(a) * mid, y = Math.sin(a) * mid * .96;
          const right = Math.cos(a) >= 0;
          return <g key={suburb.id}>
            <circle cx={x} cy={y} r={6} fill="var(--primary)" stroke="var(--ink-line)" strokeWidth={1.2} />
            {labels && <text x={x + (right ? 11 : -11)} y={y + 5} textAnchor={right ? 'start' : 'end'} fontSize={15} fontWeight={600} fill="var(--text)" className="map-label" style={{ fontStretch: '85%' }}>{suburb.name}</text>}
          </g>;
        });
      })}
      {/* Market roof at the centre. */}
      <g transform="translate(0 -4)">
        <path d="M-34 10 L-34 -6 L-20 -20 L-6 -6 L8 -20 L22 -6 L34 -18 L34 10Z" fill="var(--kraft-paper)" stroke="var(--ink-line)" strokeWidth={1.6} strokeLinejoin="round" />
        <rect x={-10} y={-2} width={20} height={12} fill="var(--primary)" stroke="var(--ink-line)" strokeWidth={1.2} />
      </g>
      <text y={34} textAnchor="middle" fontSize={13} fontWeight={700} letterSpacing={2} fill="var(--text)">STUDIO</text>
    </g>
  </svg>;
}

export { Bud, Eucalyptus, Leaf, Peony };

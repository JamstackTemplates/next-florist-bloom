// Stall objects: bucket bloom clusters, envelopes, cones, pressed stems, seasons, footer silhouettes.
import type { Arrangement, BloomTone } from '../../content/arrangements';
import type { EnvelopeColour, SealMotif } from '../../content/occasions';
import { Astilbe, Bud, Daisy, Dahlia, Eucalyptus, Fern, Flower, Foliage, Hellebore, Inked, Leaf, Line, Olive, Peony, Petals, Ranunculus, Rose, SweetPea, TONES, decorative, rng, scallop } from './botanical';

type Art = Arrangement['art'];

/** The bunch that stands in a bucket (drawn in a 240×220 box, stems meeting at 120,215). */
export function BloomCluster({ art, wreath = false, seed = 1 }: { art: Art; wreath?: boolean; seed?: number }) {
  const [t0, t1, t2] = art.tones;
  if (wreath) {
    const ring = Array.from({ length: 12 }, (_, i) => {
      const a = (i / 12) * Math.PI * 2;
      return <Foliage key={i} kind={art.foliage} x={120 + Math.cos(a) * 66} y={122 + Math.sin(a) * 66} len={60} rot={(a * 180) / Math.PI + 180} bend={10} seed={seed + i} />;
    });
    return <g className="bloom">
      <circle cx={120} cy={122} r={66} fill="none" stroke="var(--olive-2)" strokeWidth={10} opacity={.5} />
      {ring}
      <Flower kind={art.main} x={78} y={168} r={24} tone={t0} seed={seed + 3} />
      <Flower kind={art.accent} x={108} y={186} r={18} tone={t1} seed={seed + 4} />
      <Flower kind={art.main} x={56} y={140} r={17} tone={t2} seed={seed + 5} />
      <Line d="M120 56 L120 30" width={2} stroke="var(--twine)" />
    </g>;
  }
  return <g className="bloom">
    <Foliage kind={art.foliage} x={120} y={215} len={170} rot={-48} bend={18} seed={seed} />
    <Foliage kind={art.foliage} x={120} y={215} len={180} rot={44} bend={-16} seed={seed + 1} />
    <Foliage kind={art.foliage} x={120} y={215} len={190} rot={-8} bend={22} seed={seed + 2} />
    <Leaf x={58} y={176} len={56} w={16} rot={-62} />
    <Leaf x={186} y={170} len={52} w={15} rot={60} fill="var(--leaf-1)" />
    <Bud x={96} y={48} r={11} tone={t1} rot={-12} />
    <Flower kind={art.accent} x={52} y={128} r={23} tone={t2} seed={seed + 3} />
    <Flower kind={art.accent} x={190} y={112} r={22} tone={t2} seed={seed + 4} />
    <Flower kind={art.accent} x={150} y={58} r={19} tone={t1} seed={seed + 5} />
    <Flower kind={art.main} x={124} y={98} r={37} tone={t2 === t0 ? t1 : t0} seed={seed + 6} />
    <Flower kind={art.main} x={84} y={150} r={41} tone={t0} seed={seed + 7} />
    <Flower kind={art.main} x={160} y={150} r={43} tone={t1} seed={seed + 8} />
  </g>;
}

/** Galvanised florist's bucket with a chalk label (drawn in a 240×130 box). */
export function ZincBucket({ label }: { label: string }) {
  return <g>
    <Inked d="M44 6 L196 6 L182 124 L58 124Z" fill="var(--zinc-1)" />
    <path d="M60 20 L70 118 M178 20 L170 118" stroke="var(--zinc-3)" strokeWidth={6} opacity={.25} />
    <Line d="M48 40 L192 40 M54 96 L186 96" width={1.2} opacity={.6} />
    <path d="M48 44 L192 44" stroke="var(--zinc-2)" strokeWidth={3} />
    <path d="M54 100 L186 100" stroke="var(--zinc-2)" strokeWidth={3} />
    <Inked d="M38 0 Q120 -10 202 0 L200 12 Q120 2 40 12Z" fill="var(--zinc-2)" />
    <Inked d="M34 14 q-12 6 -2 18 M206 14 q12 6 2 18" fill="none" />
    <rect x={88} y={56} width={64} height={30} rx={3} fill="#2E3631" stroke="var(--ink-line)" strokeWidth={1.2} transform="rotate(-3 120 70)" />
    <text x={120} y={77} textAnchor="middle" fontSize={17} fill="#F3EFE6" transform="rotate(-3 120 70)" style={{ fontFamily: 'var(--font-hand)' }}>{label}</text>
  </g>;
}

/** Bloom cluster standing in a bucket. Resting arrangements are drawn faded. */
export function BucketArt({ art, label, wreath, resting, seed = 1, className = '' }: { art: Art; label: string; wreath?: boolean; resting?: boolean; seed?: number; className?: string }) {
  return <svg viewBox="0 0 240 340" className={className} {...decorative}>
    <g style={resting ? { filter: 'grayscale(.9)', opacity: .55 } : undefined}>
      <BloomCluster art={art} wreath={wreath} seed={seed} />
    </g>
    <g transform="translate(0 210)"><ZincBucket label={label} /></g>
  </svg>;
}

export const ENVELOPES: Record<EnvelopeColour, [string, string]> = {
  blush: ['#F7D9D3', '#E9BDB4'],
  petal: ['#F5BFD0', '#E39AB3'],
  sage: ['#D2DEC4', '#B3C4A1'],
  cream: ['#F8EEDA', '#E6D6B6'],
  kraft: ['#DDBC93', '#C49E72'],
  butter: ['#F7E4A6', '#E5C877'],
};

function Seal({ motif }: { motif: SealMotif }) {
  const glyph: Record<SealMotif, string> = {
    candle: 'M0 -9 q3 3 0 6 q-3 -3 0 -6 M-3 -1 h6 v10 h-6z',
    heart: 'M0 7 C-10 0 -8 -8 -3 -8 C-1 -8 0 -6 0 -5 C0 -6 1 -8 3 -8 C8 -8 10 0 0 7Z',
    dove: 'M-9 2 q6 -2 9 -8 q2 4 0 7 q5 -1 9 -4 q-2 8 -10 9 q-5 0 -8 -4z',
    rattle: 'M-4 -4 m-4 0 a4 4 0 1 0 8 0 a4 4 0 1 0 -8 0 M-1 -1 L7 7',
    ribbon: 'M0 0 C-6 -8 -10 -2 0 0 C10 -2 6 -8 0 0 M0 0 L-5 8 M0 0 L5 8',
    sprig: 'M0 9 L0 -8 M0 -2 q-6 -2 -7 -7 q6 0 7 5 M0 3 q6 -2 7 -7 q-6 0 -7 5',
  };
  return <g>
    <path d={scallop(0, 0, 15, 15, 10, .12, 3)} fill="#9E1F5C" transform="translate(1.2 1)" />
    <path d={scallop(0, 0, 15, 15, 10, .12, 3)} fill="none" stroke="var(--ink-line)" strokeWidth={1.2} vectorEffect="non-scaling-stroke" />
    <circle r={10} fill="none" stroke="#C94D82" strokeWidth={1.4} />
    <path d={glyph[motif]} fill="none" stroke="#FBD3E0" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
  </g>;
}

/** Envelope with a wax seal; the flap opens on hover (CSS .envelope .flap). */
export function EnvelopeArt({ colour, motif, className = '' }: { colour: EnvelopeColour; motif: SealMotif; className?: string }) {
  const [paper, shade] = ENVELOPES[colour];
  return <svg viewBox="0 0 200 150" className={className} {...decorative}>
    <rect x={20} y={40} width={160} height={100} fill={shade} opacity={.6} />
    <g className="card-peek"><Inked d="M34 30 h132 v80 h-132z" fill="#FFFDF7" /><Line d="M50 52 h80 M50 64 h96 M50 76 h60" width={1} opacity={.35} /></g>
    <Inked d="M20 40 L100 98 L180 40 L180 140 L20 140Z" fill={paper} />
    <Line d="M20 140 L88 88 M180 140 L112 88" width={1.2} opacity={.5} />
    <g className="flap"><Inked d="M20 40 L100 96 L180 40Z" fill={shade} /></g>
    <g transform="translate(100 94)"><Seal motif={motif} /></g>
  </svg>;
}

/** Kraft-and-tissue cone holding a bunch, drawn at one of three scales (How sizes work). */
export function ConeArt({ scale, className = '' }: { scale: 'petite' | 'classic' | 'lush'; className?: string }) {
  const n = scale === 'petite' ? 3 : scale === 'classic' ? 5 : 8;
  const spots: [number, number, number, BloomTone][] = [
    [120, 120, 34, 'pink'], [86, 140, 28, 'coral'], [156, 142, 28, 'cream'], [104, 96, 24, 'cream'],
    [142, 94, 26, 'coral'], [64, 116, 22, 'pink'], [178, 116, 22, 'magenta'], [122, 64, 22, 'pink'],
  ];
  return <svg viewBox="0 0 240 300" className={className} {...decorative}>
    <Eucalyptus x={120} y={190} len={scale === 'lush' ? 180 : 130} rot={-40} bend={20} seed={n} />
    <Eucalyptus x={120} y={190} len={scale === 'lush' ? 170 : 120} rot={38} bend={-16} seed={n + 1} />
    {scale !== 'petite' && <Olive x={120} y={190} len={150} rot={-6} />}
    <Inked d="M40 168 L70 130 L98 160 L130 120 L160 156 L200 124 L206 180 Q120 210 40 168Z" fill="var(--tissue-2)" />
    {spots.slice(0, n).map(([x, y, r, tone], i) => i % 3 === 1 ? <Ranunculus key={i} x={x} y={y} r={r * .8} tone={tone} seed={i + 5} /> : <Peony key={i} x={x} y={y} r={r} tone={tone} seed={i + 2} />)}
    <Inked d="M34 172 Q120 214 208 172 L140 296 L104 296Z" fill="var(--kraft-paper)" />
    <Inked d="M34 172 Q90 200 124 204 L118 296 L104 296Z" fill="var(--kraft-edge)" opacity={.85} />
    <Line d="M100 236 Q122 228 146 236" width={2.5} stroke="var(--twine)" />
  </svg>;
}

/** A pressed, flattened stem for herbarium sheets. */
export function PressedStem({ kind = 'peony', className = '' }: { kind?: 'peony' | 'sweet-pea' | 'rose' | 'eucalyptus'; className?: string }) {
  return <svg viewBox="0 0 160 300" className={className} {...decorative}>
    <g style={{ filter: 'saturate(.7)' }}>
      <Line d="M80 290 Q70 200 84 110" width={1.6} stroke="var(--leaf-3)" />
      <Leaf x={76} y={250} len={70} w={18} rot={-48} fill="#8FA36E" />
      <Leaf x={78} y={210} len={62} w={16} rot={52} fill="#7C9460" />
      <Leaf x={80} y={170} len={52} w={14} rot={-40} fill="#8FA36E" />
      {kind === 'peony' && <><Peony x={84} y={92} r={46} tone="pink" seed={77} /><Bud x={118} y={150} r={10} tone="pink" rot={30} /></>}
      {kind === 'rose' && <Rose x={84} y={96} r={42} tone="cream" seed={78} />}
      {kind === 'sweet-pea' && <><SweetPea x={84} y={100} r={26} tone="lilac" /><SweetPea x={60} y={140} r={20} tone="magenta" seed={36} /><SweetPea x={104} y={70} r={18} tone="pink" seed={37} /></>}
      {kind === 'eucalyptus' && <Eucalyptus x={80} y={180} len={150} rot={4} bend={10} seed={88} />}
    </g>
  </svg>;
}

/** One small bloom cluster per season (Weddings). */
export function SeasonSprig({ season, className = '' }: { season: 'spring' | 'summer' | 'autumn' | 'winter'; className?: string }) {
  return <svg viewBox="0 0 160 140" className={className} {...decorative}>
    <Leaf x={70} y={132} len={60} w={16} rot={-50} />
    <Leaf x={92} y={132} len={56} w={15} rot={46} fill="var(--leaf-1)" />
    {season === 'spring' && <><Peony x={80} y={70} r={40} tone="pink" seed={91} /><Bud x={124} y={46} r={10} tone="coral" rot={20} /></>}
    {season === 'summer' && <><Dahlia x={78} y={70} r={42} tone="apricot" /><Daisy x={128} y={44} r={16} tone="white" /></>}
    {season === 'autumn' && <>
      <Line d="M40 130 Q70 70 130 30" width={1.6} stroke="var(--leaf-3)" />
      {[[60, 96], [76, 80], [92, 66], [108, 50], [124, 38], [86, 92], [104, 72]].map(([x, y], i) => <g key={i}><Inked d={`M${x} ${y - 9}a7 9 0 1 0 .1 0Z`} fill={i % 2 ? '#C2412F' : '#D9653A'} /></g>)}
      <Leaf x={70} y={90} len={36} w={10} rot={-80} fill="#B5863B" />
    </>}
    {season === 'winter' && <><Hellebore x={74} y={74} r={36} tone="cream" seed={95} /><Hellebore x={124} y={50} r={20} tone="lilac" seed={96} /></>}
  </svg>;
}

/** Row of bucket silhouettes sitting on the footer band. */
export function BucketSilhouettes({ className = '' }: { className?: string }) {
  const rand = rng(5);
  const items = Array.from({ length: 16 }, (_, i) => ({ x: 20 + i * 76 + rand() * 14, h: 20 + rand() * 18, kind: i % 3 }));
  return <svg viewBox="0 0 1240 86" preserveAspectRatio="xMidYMax slice" className={className} {...decorative}>
    <g fill="var(--deep)">
      {items.map((b, i) => <g key={i} transform={`translate(${b.x} 0)`}>
        {b.kind === 0 && <path d={`${scallop(24, 86 - 30 - b.h, 18, 16, 9, .3, i)}`} />}
        {b.kind === 1 && <><circle cx={14} cy={86 - 34 - b.h} r={11} /><circle cx={30} cy={86 - 40 - b.h} r={13} /><circle cx={40} cy={86 - 30 - b.h} r={9} /></>}
        {b.kind === 2 && <path d={`M24 ${86 - 28}L24 ${86 - 36 - b.h - 24}M24 ${86 - 40 - b.h}l-8 -6M24 ${86 - 48 - b.h}l8 -6`} stroke="var(--deep)" strokeWidth={4} strokeLinecap="round" />}
        <path d={`M10 ${86 - 30 - b.h * .3} L18 ${86 - 32 - b.h} L30 ${86 - 32 - b.h} L38 ${86 - 30 - b.h * .3}Z`} />
        <path d="M4 56 L44 56 L40 86 L8 86Z" />
      </g>)}
    </g>
  </svg>;
}

/** Wedding page head: a round bridal posy with ribbon tails. */
export function BridalPosy({ className = '' }: { className?: string }) {
  return <svg viewBox="0 0 300 300" className={className} {...decorative}>
    <Olive x={150} y={180} len={150} rot={-60} />
    <Olive x={150} y={180} len={150} rot={60} />
    <Eucalyptus x={150} y={180} len={140} rot={-100} seed={61} />
    <Eucalyptus x={150} y={180} len={140} rot={100} seed={62} />
    <Line d="M140 190 Q120 250 96 290 M160 190 Q178 250 210 286" width={7} stroke="var(--petal)" opacity={.75} />
    <Line d="M140 190 Q120 250 96 290 M160 190 Q178 250 210 286" width={1.2} />
    <Rose x={110} y={116} r={34} tone="white" seed={64} />
    <Hellebore x={196} y={112} r={28} tone="cream" seed={65} />
    <Peony x={150} y={140} r={50} tone="cream" seed={66} />
    <Ranunculus x={110} y={170} r={26} tone="pink" seed={67} />
    <Rose x={194} y={168} r={30} tone="pink" seed={68} />
    <Peony x={154} y={82} r={34} tone="pink" seed={69} />
    <Astilbe x={70} y={140} h={60} tone="white" rot={-50} />
  </svg>;
}

/** Perforated postage-stamp outline: a rectangle edged with small half-round bites. */
function perforated(w: number, h: number, step = 6): string {
  const r = step / 2 - .6;
  const nx = Math.round(w / step), ny = Math.round(h / step);
  const sx = w / nx, sy = h / ny;
  let d = 'M0 0';
  for (let i = 0; i < nx; i++) d += `L${i * sx + sx / 2 - r} 0A${r} ${r} 0 0 0 ${i * sx + sx / 2 + r} 0`;
  d += `L${w} 0`;
  for (let i = 0; i < ny; i++) d += `L${w} ${i * sy + sy / 2 - r}A${r} ${r} 0 0 0 ${w} ${i * sy + sy / 2 + r}`;
  d += `L${w} ${h}`;
  for (let i = nx - 1; i >= 0; i--) d += `L${i * sx + sx / 2 + r} ${h}A${r} ${r} 0 0 0 ${i * sx + sx / 2 - r} ${h}`;
  d += `L0 ${h}`;
  for (let i = ny - 1; i >= 0; i--) d += `L0 ${i * sy + sy / 2 + r}A${r} ${r} 0 0 0 0 ${i * sy + sy / 2 - r}`;
  return `${d}Z`;
}

/** Contact page head: a kraft envelope burst open by a bouquet, tied with a ribbon bow and a sealed gift card. */
export function BloomEnvelope({ className = '' }: { className?: string }) {
  const [rib1, rib2, rib3] = TONES.magenta;
  return <svg viewBox="0 0 360 320" className={className} {...decorative}>
    <g transform="translate(14 4)"><Petals w={60} h={70} count={3} seed={23} /></g>
    <g transform="translate(300 18)"><Petals w={50} h={70} count={3} seed={29} tones={['pink', 'cream']} /></g>
    <g transform="translate(200 176) rotate(-7)">
      {/* Inside of the envelope, lined with blush tissue. */}
      <Inked d="M-116 -58 H116 V82 H-116Z" fill="var(--kraft-edge)" />
      <path d="M-108 -50 H108 V-36 L0 22 L-108 -36Z" fill="var(--tissue-2)" opacity={.7} />
      {/* The bouquet spilling out. */}
      <g className="bloom">
        <Fern x={-30} y={30} len={170} rot={-62} bend={22} />
        <Eucalyptus x={-10} y={30} len={180} rot={-28} bend={20} seed={72} />
        <Eucalyptus x={20} y={30} len={170} rot={38} bend={-18} seed={73} />
        <Olive x={10} y={30} len={190} rot={6} bend={16} />
        <Astilbe x={88} y={-40} h={78} tone="white" rot={28} seed={44} />
        <Astilbe x={-96} y={-30} h={64} tone="pink" rot={-34} seed={45} />
        <Leaf x={-60} y={-20} len={64} w={18} rot={-58} />
        <Leaf x={70} y={-18} len={60} w={17} rot={54} fill="var(--leaf-1)" />
        <Bud x={100} y={-128} r={10} tone="pink" rot={22} />
        <SweetPea x={-62} y={-122} r={21} tone="lilac" rot={-18} seed={33} />
        <Hellebore x={30} y={-128} r={24} tone="cream" seed={74} />
        <Ranunculus x={-80} y={-62} r={30} tone="coral" seed={75} />
        <Rose x={64} y={-78} r={36} tone="cream" seed={76} />
        <SweetPea x={104} y={-86} r={16} tone="magenta" rot={24} seed={34} />
        <Peony x={-14} y={-78} r={54} tone="pink" seed={71} />
        <Ranunculus x={34} y={-28} r={22} tone="magenta" seed={77} />
        <Bud x={-36} y={-150} r={9} tone="coral" rot={-20} />
      </g>
      {/* Front pocket: side flaps meeting a bottom flap. */}
      <Inked d="M-116 -40 L0 24 L116 -40 V82 H-116Z" fill="var(--kraft-paper)" />
      <path d="M-116 -40 L-8 20 L-116 82Z" fill="var(--kraft-edge)" opacity={.35} />
      <Line d="M-116 82 L-14 16 M116 82 L14 16" width={1.1} opacity={.45} />
      {/* Stamp and postmark. */}
      <g transform="translate(64 2) rotate(4)">
        <path d={perforated(40, 48)} fill="var(--ink-line)" opacity={.2} transform="translate(2 2)" />
        <path d={perforated(40, 48)} fill="var(--paper)" stroke="var(--ink-line)" strokeWidth={1} vectorEffect="non-scaling-stroke" />
        <rect x={5} y={5} width={30} height={38} fill="var(--tissue-1)" stroke="var(--ink-line)" strokeWidth={.8} vectorEffect="non-scaling-stroke" />
        <Peony x={20} y={20} r={10} tone="magenta" seed={78} />
        <Line d="M20 30 V40" width={1} stroke="var(--leaf-3)" />
      </g>
      <g opacity={.5}>
        <circle cx={60} cy={44} r={15} fill="none" stroke="var(--ink-line)" strokeWidth={1.2} vectorEffect="non-scaling-stroke" />
        <circle cx={60} cy={44} r={10} fill="none" stroke="var(--ink-line)" strokeWidth={.8} vectorEffect="non-scaling-stroke" />
        <Line d="M74 52 q6 -4 12 0 t12 0 t12 0 M72 60 q6 -4 12 0 t12 0 t12 0" width={1} />
      </g>
      {/* Handwritten address. */}
      <text x={-36} y={62} fontSize={15} fill="var(--kraft-ink)" transform="rotate(-2 -36 62)" style={{ fontFamily: 'var(--font-hand)' }}>to the studio</text>
      <Line d="M-38 68 H50 M-30 77 H40" width={1} stroke="var(--kraft-ink)" opacity={.4} />
      {/* Ribbon band and bow. */}
      <path d="M-74 -16 L-60 -8 L-60 82 L-74 82Z" fill={rib2} transform="translate(1.4 1)" />
      <Line d="M-74 -16 L-74 82 M-60 -8 L-60 82" width={1.2} />
      <Line d="M-67 -10 V80" width={.8} stroke={rib1} opacity={.8} />
      <g transform="translate(-67 30)">
        <Inked d="M-4 4 C-20 26 -26 50 -40 70 L-28 74 C-18 54 -8 30 4 6Z" fill={rib3} />
        <Inked d="M4 4 C14 30 10 54 22 76 L34 70 C20 50 22 26 6 2Z" fill={rib2} />
        <Inked d="M0 0 C-14 -26 -48 -30 -50 -10 C-52 8 -22 10 0 0Z" fill={rib2} />
        <Line d="M-8 -4 C-22 -16 -38 -16 -42 -8" width={.9} opacity={.5} />
        <Inked d="M0 0 C16 -28 50 -26 50 -6 C50 12 20 10 0 0Z" fill={rib2} />
        <Line d="M8 -4 C22 -16 38 -14 42 -6" width={.9} opacity={.5} />
        <Inked d="M-8 -7 Q0 -10 8 -7 Q10 0 8 7 Q0 10 -8 7 Q-10 0 -8 -7Z" fill={rib1} />
      </g>
      {/* Gift card on twine, sealed. */}
      <Line d="M-67 30 C-86 34 -100 26 -112 16" width={2} stroke="var(--twine)" />
      <g transform="translate(-166 12) rotate(-14)">
        <path d="M0 0 H64 V44 H0Z" fill="var(--ink-line)" opacity={.2} transform="translate(3 3)" />
        <Inked d="M0 0 H64 V44 H0Z" fill="var(--paper)" />
        <text x={32} y={27} textAnchor="middle" fontSize={15} fill="var(--paper-ink)" style={{ fontFamily: 'var(--font-hand)' }}>for you</text>
        <g transform="translate(58 6) scale(.62)"><Seal motif="heart" /></g>
      </g>
    </g>
  </svg>;
}

/** Arrangements page head: a spray of peonies and roses spilling in from the right. */
export function PeonySpray({ className = '', tones = ['coral', 'pink', 'cream'] as [BloomTone, BloomTone, BloomTone] }: { className?: string; tones?: [BloomTone, BloomTone, BloomTone] }) {
  return <svg viewBox="0 0 340 300" className={className} {...decorative}>
    <Eucalyptus x={300} y={290} len={260} rot={-50} bend={30} seed={81} />
    <Eucalyptus x={300} y={290} len={220} rot={-80} bend={24} seed={82} />
    <Fernish />
    <Peony x={200} y={150} r={70} tone={tones[1]} seed={83} />
    <Peony x={110} y={210} r={54} tone={tones[0]} seed={84} />
    <Rose x={268} y={92} r={40} tone={tones[2]} seed={85} />
    <Ranunculus x={150} y={64} r={30} tone={tones[0]} seed={86} />
    <SweetPea x={60} y={150} r={22} tone="lilac" rot={-30} />
    <Bud x={300} y={190} r={14} tone="pink" rot={30} />
  </svg>;
}
function Fernish() { return <><Leaf x={240} y={250} len={110} w={28} rot={-60} /><Leaf x={260} y={260} len={90} w={24} rot={-20} fill="var(--leaf-1)" /></>; }

/** 404: a single peony stem fallen out of a tipped bucket, petals scattered. */
export function FallenStem({ className = '' }: { className?: string }) {
  return <svg viewBox="0 0 640 360" className={className} {...decorative}>
    <path d="M20 330 H620" stroke="var(--line)" strokeWidth={3} />
    <g transform="translate(470 210) rotate(-78)">
      <Inked d="M-76 0 L76 0 L62 118 L-62 118Z" fill="var(--zinc-1)" />
      <Inked d="M-82 -6 Q0 -16 82 -6 L80 6 Q0 -4 -80 6Z" fill="var(--zinc-2)" />
      <Line d="M-72 34 H72 M-66 90 H66" width={1.2} opacity={.6} />
    </g>
    <path d="M440 300 Q520 336 600 320" fill="none" stroke="var(--zinc-3)" strokeWidth={10} opacity={.15} strokeLinecap="round" />
    <Line d="M400 264 Q300 300 170 268" width={2} stroke="var(--leaf-3)" />
    <Leaf x={300} y={286} len={70} w={18} rot={-112} />
    <Leaf x={250} y={280} len={60} w={16} rot={-60} fill="var(--leaf-1)" />
    <Peony x={150} y={250} r={64} tone="pink" rot={-24} seed={99} />
    <g transform="translate(60 150)"><Petals w={540} h={170} count={14} seed={7} /></g>
    <g transform="translate(380 252) rotate(8)">
      <path d="M0 0 C-10 -30 -40 -40 -60 -36" fill="none" stroke="var(--twine)" strokeWidth={2.5} />
      <g transform="translate(-60 -36) rotate(-14)">
        <path d="M0 0 L16 -14 H92 V18 H16Z" fill="var(--kraft-paper)" transform="translate(1.5 1.5)" />
        <path d="M0 0 L16 -14 H92 V18 H16Z" fill="none" stroke="var(--ink-line)" strokeWidth={1.4} />
        <circle cx={13} cy={2} r={4} fill="none" stroke="var(--kraft-edge)" strokeWidth={2} />
        <text x={54} y={8} textAnchor="middle" fontSize={17} fill="var(--kraft-ink)" style={{ fontFamily: 'var(--font-hand)' }}>lost stem</text>
      </g>
    </g>
  </svg>;
}

/** Herbarium-free motifs re-exported for convenience. */
export { Peony, Rose, Ranunculus, SweetPea, TONES };

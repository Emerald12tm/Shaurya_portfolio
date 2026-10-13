import Image from "next/image";

export const LANGUAGE_COLORS: Record<string, string> = {
  Java: "#e0a050",
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#4b8bbe",
  HTML: "#e34c26",
  CSS: "#7b5cc4",
  Lua: "#6b7cff",
};

export function languageColor(language: string | null | undefined) {
  return (language && LANGUAGE_COLORS[language]) || "#8b95a7";
}

// Small deterministic PRNG so each repo always gets the same artwork.
function seeded(seed: string) {
  let h = 2166136261;
  for (const ch of seed) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

/** Catmull-Rom spline through the points, expressed as SVG cubic Béziers. */
function smoothPath(pts: [number, number][]) {
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const [p0, p1, p2, p3] = [pts[i - 1] ?? pts[i], pts[i], pts[i + 1], pts[i + 2] ?? pts[i + 1]];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C ${c1[0].toFixed(1)} ${c1[1].toFixed(1)}, ${c2[0].toFixed(1)} ${c2[1].toFixed(1)}, ${p2[0]} ${p2[1]}`;
  }
  return d;
}

const W = 400;
const H = 225;

/**
 * Cover art for a project: its screenshot if one is set in content.ts,
 * otherwise a generated "planned path" schematic unique to the repo.
 */
export default function ProjectVisual({
  name,
  title,
  language,
  image,
  priority = false,
}: {
  name: string;
  title: string;
  language: string | null;
  image?: string;
  priority?: boolean;
}) {
  if (image) {
    return (
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={image}
          alt={`${title} preview`}
          fill
          sizes="(min-width: 1024px) 560px, 100vw"
          className="object-cover object-left transition-transform duration-700 group-hover:scale-[1.03]"
          priority={priority}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
      </div>
    );
  }

  const rand = seeded(name);
  const count = 5;
  const points: [number, number][] = Array.from({ length: count }, (_, i) => [
    Math.round(40 + (i * (W - 80)) / (count - 1)),
    Math.round(45 + rand() * (H - 90)),
  ]);
  const path = smoothPath(points);
  const id = `pv-${name.replace(/[^a-z0-9]/gi, "")}`;
  const color = languageColor(language);

  return (
    <div className="relative aspect-video overflow-hidden bg-[#070a10]">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="absolute inset-0 size-full transition-transform duration-700 group-hover:scale-[1.03]"
        aria-hidden="true"
      >
        <defs>
          <pattern id={`${id}-grid`} width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.8" fill="rgb(255 255 255 / 0.12)" />
          </pattern>
          <linearGradient id={`${id}-stroke`} x1="0" x2="1">
            <stop offset="0" stopColor="var(--accent-2)" />
            <stop offset="1" stopColor="var(--accent)" />
          </linearGradient>
          <radialGradient id={`${id}-glow`} cx="0.5" cy="0.4" r="0.7">
            <stop offset="0" stopColor="rgb(94 234 212 / 0.10)" />
            <stop offset="1" stopColor="transparent" />
          </radialGradient>
        </defs>

        <rect width={W} height={H} fill={`url(#${id}-glow)`} />
        <rect width={W} height={H} fill={`url(#${id}-grid)`} />

        {/* field boundary */}
        <rect x="20" y="20" width={W - 40} height={H - 40} rx="6" fill="none" stroke="rgb(255 255 255 / 0.08)" strokeDasharray="3 5" />

        <path d={path} fill="none" stroke={`url(#${id}-stroke)`} strokeWidth="6" opacity="0.18" strokeLinecap="round" />
        <path d={path} fill="none" stroke={`url(#${id}-stroke)`} strokeWidth="1.6" strokeLinecap="round" />

        {points.map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="7" fill="none" stroke="rgb(255 255 255 / 0.18)" />
            <circle cx={x} cy={y} r="2.5" fill={i === count - 1 ? "var(--accent)" : "#e6ebf2"} />
            <text x={x + 10} y={y - 9} fill="rgb(255 255 255 / 0.35)" fontSize="8" fontFamily="var(--font-geist-mono)">
              {`P${i}`}
            </text>
          </g>
        ))}
      </svg>

      <div className="absolute top-3 left-4 flex items-center gap-2 font-mono text-[10px] tracking-widest text-white/45 uppercase">
        <span className="size-1.5 rounded-full" style={{ background: color }} />
        {name}
      </div>
    </div>
  );
}

export type Hub = {
  name: string;
  region: string;
  status: string;
  dotClass: string;
  x: number;
  y: number;
  reports: number;
};

// Simplified Uganda silhouette (stylised outline, viewBox 0 0 100 100)
const UGANDA_PATH =
  "M22,18 L34,12 L48,14 L60,10 L72,16 L82,22 L86,34 L82,46 L88,58 L84,72 L78,84 L66,90 L52,92 L40,90 L28,86 L18,76 L14,62 L12,48 L16,34 Z";

export function UgandaMap({
  hubs,
  activeIdx,
  onSelect,
}: {
  hubs: Hub[];
  activeIdx: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden frosted">
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <radialGradient id="ug-fill" cx="50%" cy="40%" r="70%">
            <stop offset="0%" stopColor="oklch(0.32 0.06 152 / 0.55)" />
            <stop offset="100%" stopColor="oklch(0.18 0.02 160 / 0.2)" />
          </radialGradient>
          <pattern id="ug-grid" width="6" height="6" patternUnits="userSpaceOnUse">
            <path d="M 6 0 L 0 0 0 6" fill="none" stroke="oklch(0.83 0.19 152 / 0.08)" strokeWidth="0.2" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#ug-grid)" />
        <path d={UGANDA_PATH} fill="url(#ug-fill)" stroke="oklch(0.83 0.19 152 / 0.55)" strokeWidth="0.5" />
        {hubs.map((h, i) =>
          hubs.slice(i + 1).map((h2) => (
            <line
              key={`${h.name}-${h2.name}`}
              x1={h.x} y1={h.y} x2={h2.x} y2={h2.y}
              stroke="oklch(0.83 0.19 152 / 0.15)" strokeWidth="0.2" strokeDasharray="0.8 0.8"
            />
          ))
        )}
        {hubs.map((h, i) => {
          const isActive = i === activeIdx;
          return (
            <g key={h.name} className="cursor-pointer" onClick={() => onSelect(i)}>
              <circle cx={h.x} cy={h.y} r={isActive ? 5 : 3.5} fill="oklch(0.83 0.19 152 / 0.18)">
                <animate attributeName="r" values={`${isActive ? 4 : 2.6};${isActive ? 6.5 : 4.5};${isActive ? 4 : 2.6}`} dur="2.4s" repeatCount="indefinite" />
              </circle>
              <circle cx={h.x} cy={h.y} r={isActive ? 1.6 : 1.1} fill="oklch(0.83 0.19 152)" />
              <text
                x={h.x + 2.2} y={h.y - 1.6}
                fontSize={isActive ? 2.6 : 2.1}
                fill={isActive ? "oklch(0.94 0.13 152)" : "oklch(0.94 0.012 150 / 0.7)"}
                fontFamily="var(--font-mono)"
                style={{ pointerEvents: "none", letterSpacing: "0.12em", textTransform: "uppercase" }}
              >
                {h.name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

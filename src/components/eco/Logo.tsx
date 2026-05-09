export function Logo({ size = 32, animate = false }: { size?: number; animate?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-label="EcoGuard">
      <path
        d="M32 4 L56 14 V32 C56 46 45 56 32 60 C19 56 8 46 8 32 V14 Z"
        stroke="var(--phosphor)"
        strokeWidth="2"
        fill="none"
        strokeDasharray={animate ? 220 : undefined}
        strokeDashoffset={animate ? 220 : undefined}
        style={animate ? { animation: "draw 1.2s ease-out 0.2s forwards" } : undefined}
      />
      <path
        d="M32 18 C24 26 22 36 32 48 C42 36 40 26 32 18 Z M32 22 V46"
        stroke="var(--glow)"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeDasharray={animate ? 120 : undefined}
        strokeDashoffset={animate ? 120 : undefined}
        style={animate ? { animation: "draw 1s ease-out 0.8s forwards" } : undefined}
      />
    </svg>
  );
}

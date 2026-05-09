import { useEffect, useRef, useState } from "react";

export function StatCounter({
  to, suffix = "", prefix = "", decimals = 0, label, duration = 1800,
}: { to: number; suffix?: string; prefix?: string; decimals?: number; label: string; duration?: number }) {
  const [v, setV] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (t: number) => {
            const p = Math.min(1, (t - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setV(to * eased);
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.4 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [to, duration]);

  return (
    <div ref={ref} className="num-glow">
      <div className="font-mono text-5xl md:text-7xl text-glow font-medium" style={{ color: "var(--glow)" }}>
        {prefix}{v.toFixed(decimals)}{suffix}
      </div>
      <div className="mt-3 font-mono text-[11px] tracking-[0.25em] uppercase text-muted-foreground">{label}</div>
    </div>
  );
}

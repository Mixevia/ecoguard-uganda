import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export function ChapterHeading({
  number,
  lines,
  accentLine = 1,
}: {
  number: string;
  lines: string[];
  accentLine?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.to(ref.current!.querySelectorAll(".cw-inner"), {
        y: "0%",
        stagger: 0.12,
        duration: 0.95,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 78%", toggleActions: "play none none reverse" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="relative">
      <div className="font-mono text-[11px] tracking-[0.4em] text-muted-foreground uppercase mb-8">
        / Chapter {number}
      </div>
      <div className="flex flex-col">
        {lines.map((w, i) => (
          <div
            key={i}
            className={`chapter-word stack-heading ${i === accentLine ? "text-phosphor text-glow self-end pr-[2vw]" : ""}`}
          >
            <span className="cw-inner">{w}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

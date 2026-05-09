import { useEffect, useState } from "react";

export const CHAPTERS = [
  { id: "crisis",   n: "01", t: "The Crisis" },
  { id: "how",      n: "02", t: "How It Works" },
  { id: "evidence", n: "03", t: "Evidence" },
  { id: "join",     n: "04", t: "Join" },
];

export function ChapterNav() {
  const [active, setActive] = useState("crisis");

  useEffect(() => {
    const els = CHAPTERS
      .map((c) => document.getElementById(c.id))
      .filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="sticky top-0 z-50 frosted-nav border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 md:px-8 h-14 flex items-center justify-between gap-4 overflow-x-auto">
        <a href="#top" className="font-mono text-[11px] tracking-[0.3em] uppercase text-phosphor shrink-0">
          EcoGuard
        </a>
        <ul className="flex items-center gap-3 md:gap-6 font-mono text-[10px] md:text-[11px] tracking-[0.2em] uppercase">
          {CHAPTERS.map((c) => {
            const isActive = active === c.id;
            return (
              <li key={c.id}>
                <a
                  href={`#${c.id}`}
                  className={`flex items-center gap-1 py-2 border-b-2 transition-colors duration-200 ${
                    isActive ? "text-phosphor border-phosphor" : "text-foreground/55 border-transparent hover:text-foreground"
                  }`}
                >
                  <span>{c.n}</span>
                  <span className="hidden md:inline">.{c.t}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

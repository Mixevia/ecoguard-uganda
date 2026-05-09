const ITEMS = [
  "Wetland Protection",
  "Deforestation Alerts",
  "Lake Victoria",
  "Waste Mapping",
  "Reforestation",
  "Citizen Reports",
  "Wildlife Corridors",
  "Climate Resilience",
];

function Dot() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" className="shrink-0 mx-8 text-phosphor" fill="none">
      <path d="M7 1 C9 5 9 9 7 13 C5 9 5 5 7 1Z" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function Ticker() {
  const loop = [...ITEMS, ...ITEMS];
  return (
    <div className="relative overflow-hidden border-y border-border" style={{ background: "var(--layer)" }}>
      <div className="ticker-track py-5">
        {loop.map((it, i) => (
          <div key={i} className="flex items-center shrink-0">
            <span className="font-display italic text-2xl md:text-3xl text-foreground/85 whitespace-nowrap">{it}</span>
            <Dot />
          </div>
        ))}
      </div>
    </div>
  );
}

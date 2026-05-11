import { useEffect, useRef } from "react";

export type Hub = {
  name: string;
  region: string;
  status: string;
  dotClass: string;
  lat: number;
  lng: number;
  reports: number;
};

export function UgandaMap({
  hubs,
  activeIdx,
  onSelect,
}: {
  hubs: Hub[];
  activeIdx: number;
  onSelect: (i: number) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const LRef = useRef<any>(null);

  // Mount Leaflet (client-only)
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const L = (await import("leaflet")).default;
      // @ts-ignore – inject CSS once
      if (!document.getElementById("leaflet-css")) {
        const link = document.createElement("link");
        link.id = "leaflet-css";
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        document.head.appendChild(link);
      }
      if (cancelled || !containerRef.current || mapRef.current) return;
      LRef.current = L;

      const map = L.map(containerRef.current, {
        center: [1.3733, 32.2903],
        zoom: 7,
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: false,
      });
      mapRef.current = map;

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        { maxZoom: 18 }
      ).addTo(map);

      L.control.attribution({ prefix: false })
        .addAttribution("&copy; OpenStreetMap &copy; CARTO")
        .addTo(map);
    })();
    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Sync markers with hubs / activeIdx
  useEffect(() => {
    const L = LRef.current;
    const map = mapRef.current;
    if (!L || !map) return;

    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    hubs.forEach((h, i) => {
      const isActive = i === activeIdx;
      const size = isActive ? 22 : 14;
      const icon = L.divIcon({
        className: "ecoguard-pin",
        html: `
          <div style="position:relative;width:${size}px;height:${size}px;">
            <div style="position:absolute;inset:0;border-radius:9999px;background:oklch(0.83 0.19 152 / 0.25);animation:breathe 2.4s ease-in-out infinite;"></div>
            <div style="position:absolute;inset:25%;border-radius:9999px;background:oklch(0.83 0.19 152);box-shadow:0 0 12px oklch(0.83 0.19 152 / 0.8);"></div>
          </div>`,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
      });

      const marker = L.marker([h.lat, h.lng], { icon })
        .addTo(map)
        .bindTooltip(
          `<span style="font-family:var(--font-mono);font-size:10px;letter-spacing:0.2em;text-transform:uppercase;">${h.name}</span>`,
          {
            permanent: true,
            direction: "right",
            offset: [10, 0],
            className: "ecoguard-tip",
          }
        )
        .on("click", () => onSelect(i));

      markersRef.current.push(marker);
    });
  }, [hubs, activeIdx, onSelect]);

  return (
    <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden frosted">
      <div ref={containerRef} className="absolute inset-0" />
      <style>{`
        .ecoguard-tip {
          background: oklch(0.16 0.012 160 / 0.85) !important;
          color: oklch(0.94 0.012 150) !important;
          border: 1px solid oklch(0.83 0.19 152 / 0.3) !important;
          box-shadow: none !important;
          padding: 2px 6px !important;
        }
        .ecoguard-tip::before { display: none !important; }
        .leaflet-container { background: oklch(0.16 0.012 160) !important; }
        .leaflet-control-attribution {
          background: oklch(0.16 0.012 160 / 0.7) !important;
          color: oklch(0.6 0.012 150) !important;
          font-size: 9px !important;
        }
        .leaflet-control-attribution a { color: oklch(0.83 0.19 152) !important; }
      `}</style>
    </div>
  );
}

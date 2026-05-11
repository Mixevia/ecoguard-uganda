import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Logo } from "@/components/eco/Logo";
import { Preloader } from "@/components/eco/Preloader";
import { Ticker } from "@/components/eco/Ticker";
import { ChapterNav } from "@/components/eco/ChapterNav";
import { ChapterHeading } from "@/components/eco/ChapterHeading";
import { StatCounter } from "@/components/eco/StatCounter";
import { UgandaMap, type Hub } from "@/components/eco/UgandaMap";

import heroImg from "@/assets/eco-hero.jpg";
import crisisImg from "@/assets/eco-crisis.jpg";
import fieldImg from "@/assets/eco-field.jpg";
import goldenImg from "@/assets/eco-golden.jpg";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/")({
  component: Index,
});

/* ─────────── PHOTO SLOTS ───────────
 * Drop real Uganda photographs here once sourced (Wikimedia / Unsplash / FAO).
 * If a value is set, it takes priority over the CSS gradient placeholder.
 */
const PHOTOS = {
  hero: heroImg,
  crisis: crisisImg,
  field: fieldImg,
  golden: goldenImg,
};

/* ─────────── CH 00 — HERO ─────────── */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      const preloaded = typeof sessionStorage !== "undefined" && sessionStorage.getItem("eco_preloaded");
      gsap.to(ref.current!.querySelectorAll(".hero-line"), {
        y: "0%", stagger: 0.18, duration: 1.0, ease: "power3.out",
        delay: preloaded ? 0.2 : 1.6,
      });
      gsap.to(ref.current!.querySelectorAll(".hero-fade"), {
        opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: "power2.out",
        delay: preloaded ? 0.8 : 2.2,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="top"
      className="relative min-h-screen flex flex-col overflow-hidden"
    >
      {/* Full-screen background image */}
      <div className="absolute inset-0 -z-20">
        {PHOTOS.hero ? (
          <img
            src={PHOTOS.hero}
            alt="Ugandan wetland under threat from encroachment"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full photo-hero" aria-hidden="true" />
        )}
      </div>
      {/* Single bottom gradient for legibility */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.16 0.012 160 / 0.55) 0%, oklch(0.16 0.012 160 / 0.15) 35%, oklch(0.16 0.012 160 / 0.75) 75%, oklch(0.16 0.012 160) 100%)",
        }}
      />

      <header className="relative max-w-7xl w-full mx-auto flex items-center justify-between px-6 md:px-12 pt-8">
        <div className="flex items-center gap-3">
          <Logo size={32} />
          <span className="font-display text-xl tracking-tight">EcoGuard</span>
          <span className="hidden md:inline font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase ml-2">
            / Uganda
          </span>
        </div>
        <a
          href="#crisis"
          className="hidden md:inline-flex font-mono text-[10px] tracking-[0.3em] uppercase text-foreground/60 hover:text-phosphor transition-colors"
        >
          ↓ Begin
        </a>
      </header>

      <div className="relative flex-1 flex flex-col justify-end max-w-7xl w-full mx-auto px-6 md:px-12 pb-20 md:pb-28">
        <div
          className="font-mono text-[11px] tracking-[0.4em] uppercase text-phosphor mb-8 hero-fade"
          style={{ opacity: 0, transform: "translateY(10px)" }}
        >
          / Field Edition · Chapter 00
        </div>

        <div className="hero-stack text-center md:text-left">
          <div className="chapter-word"><span className="hero-line">EcoGuard</span></div>
          <div className="chapter-word text-phosphor text-glow block md:inline-block md:ml-[6vw]">
            <span className="hero-line italic">Uganda.</span>
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-10 items-end">
          <p
            className="hero-fade text-foreground/85 text-lg md:text-xl max-w-md leading-relaxed"
            style={{ opacity: 0, transform: "translateY(10px)" }}
          >
            A threatened wetland. A forest edge in retreat. The damage is
            specific, local, and unfolding now — and so is the response.
          </p>
          <div
            className="hero-fade flex md:justify-end"
            style={{ opacity: 0, transform: "translateY(10px)" }}
          >
            <a
              href="#join"
              className="btn-sweep px-8 py-4 rounded-full text-[11px] tracking-[0.25em] uppercase font-mono"
            >
              Report an Incident →
            </a>
          </div>
        </div>
      </div>

      <Ticker />
    </section>
  );
}

/* ─────────── CH 01 — THE CRISIS ─────────── */
function Crisis() {
  return (
    <section
      id="crisis"
      data-chapter
      className="relative py-32 md:py-40 px-6 md:px-12"
      style={{ scrollMarginTop: 60 }}
    >
      <div className="max-w-7xl mx-auto">
        <ChapterHeading number="01" lines={["The", "Crisis"]} accentLine={1} />

        <div className="mt-24 grid md:grid-cols-3 gap-12 md:gap-8 max-w-5xl">
          <StatCounter to={78} suffix="%" label="Wetlands degraded since 1990 — NEMA Uganda, 2021" />
          <StatCounter to={3.2} suffix="M ha" decimals={1} label="Forest cover lost in 20 years — FAO" />
          <StatCounter to={2} suffix=" min" label="To file a verified report with EcoGuard" />
        </div>

        <div className="mt-24 grid lg:grid-cols-5 gap-8 items-center">
          <div className="lg:col-span-3 relative aspect-[16/10] rounded-2xl overflow-hidden frosted">
            {PHOTOS.crisis ? (
              <img
                src={PHOTOS.crisis}
                alt="Before-and-after of a degraded Ugandan wetland"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 photo-crisis" aria-hidden="true" />
            )}
            {/* Before / After divider treatment */}
            <div className="absolute inset-y-0 left-1/2 w-px bg-phosphor/60" />
            <div className="absolute top-4 left-4 font-mono text-[10px] tracking-[0.3em] uppercase text-foreground/80 bg-background/60 px-2 py-1 rounded">
              Before · 2005
            </div>
            <div className="absolute top-4 right-4 font-mono text-[10px] tracking-[0.3em] uppercase text-phosphor bg-background/60 px-2 py-1 rounded">
              After · 2024
            </div>
            <div className="absolute bottom-4 left-4 right-4 font-mono text-[10px] tracking-[0.25em] uppercase text-foreground/60">
              Lubigi Wetland · Kampala periphery
            </div>
          </div>

          <div className="lg:col-span-2">
            <p className="text-foreground/85 text-lg leading-relaxed">
              The headlines have moved on. The pollinators have not returned.
              Watersheds collapse quietly; the ground itself forgets its forests.
            </p>
            <p className="mt-6 text-foreground/65 leading-relaxed">
              Conservation can no longer rely on goodwill alone — it requires the
              same precision and discipline as any frontier science.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────── CH 02 — HOW IT WORKS ─────────── */
const PHASES = [
  {
    id: "02/A", t: "Report",
    d: "Citizens upload geo-tagged photos and short notes from anywhere in Uganda — even offline, syncing when signal returns.",
    detail: "An offline-first PWA captures incident type, GPS coordinates, time, and up to four photos. Reports queue locally and sync over any signal — 2G included. No app store, no friction.",
    metric: "< 30s avg. capture time",
  },
  {
    id: "02/B", t: "Verify",
    d: "Trained field agents validate every report. Satellite imagery cross-checks claims within minutes, not weeks.",
    detail: "Each submission is triaged against Sentinel-2 and Planet imagery, then routed to the nearest trained guardian for ground-truthing. Duplicates collapse automatically.",
    metric: "94% verification accuracy",
  },
  {
    id: "02/C", t: "Respond",
    d: "Verified threats route to district authorities and ranger units. Action logs are public and immutable.",
    detail: "Verified incidents fan out to NEMA officers, district environment officers, and partner ranger units. Every action — dispatch, intervention, citation — is logged on a public ledger.",
    metric: "Avg. response: 36 hours",
  },
  {
    id: "02/D", t: "Track",
    d: "Every intervention enters an open impact timeline — what was reported, what was done, what changed.",
    detail: "Resolved cases enter a permanent timeline with before/after geotagged imagery, restoration metrics, and partner attribution. Open data, exportable as CSV or GeoJSON.",
    metric: "1,200+ closed cases",
  },
];

function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const [activePhase, setActivePhase] = useState(0);
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current!.querySelectorAll(".feature-card"),
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: ref.current!.querySelector(".card-grid"), start: "top 90%", once: true },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="how"
      data-chapter
      className="relative py-32 md:py-40 px-6 md:px-12"
      style={{
        scrollMarginTop: 60,
        background: "linear-gradient(180deg, transparent, oklch(0.20 0.018 160 / 0.4), transparent)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <ChapterHeading number="02" lines={["How it", "works"]} accentLine={1} />

        <div className="mt-24 grid lg:grid-cols-12 gap-10">
          {/* Field photo column */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden frosted sticky top-20">
              {PHOTOS.field ? (
                <img
                  src={PHOTOS.field}
                  alt="A guardian in Uganda holding a phone, looking out at green space"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 photo-field" aria-hidden="true" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-phosphor mb-2">
                  / Field Guardian
                </div>
                <div className="font-display text-xl text-foreground">
                  One phone. One report. One restored hectare.
                </div>
              </div>
            </div>
          </div>

          {/* Phases column — interactive tabs */}
          <div className="lg:col-span-7">
            <div role="tablist" aria-label="Method phases" className="flex flex-wrap gap-2 mb-6">
              {PHASES.map((p, i) => {
                const isActive = i === activePhase;
                return (
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    key={p.id}
                    onClick={() => setActivePhase(i)}
                    className={`px-5 py-3 rounded-full font-mono text-[10px] tracking-[0.3em] uppercase border transition-all duration-300 ${
                      isActive
                        ? "border-phosphor/60 bg-phosphor/10 text-phosphor shadow-[0_0_0_1px_oklch(0.83_0.19_152/0.4)]"
                        : "border-border text-foreground/60 hover:border-phosphor/30 hover:text-foreground"
                    }`}
                  >
                    <span className="mr-2 opacity-70">{p.id}</span>
                    {p.t}
                  </button>
                );
              })}
            </div>

            <div className="card-grid grid sm:grid-cols-2 gap-6">
              {PHASES.map((p, i) => {
                const isActive = i === activePhase;
                return (
                  <article
                    key={p.id}
                    onClick={() => setActivePhase(i)}
                    className={`feature-card cursor-pointer frosted rounded-2xl p-8 transition-all duration-300 ${
                      isActive
                        ? "border border-phosphor/50 -translate-y-1 shadow-[0_24px_48px_rgba(61,219,133,0.15)]"
                        : "border border-transparent hover:-translate-y-1 hover:border-phosphor/20"
                    }`}
                  >
                    <div className="flex items-baseline justify-between">
                      <span className="font-mono text-[11px] tracking-[0.3em] text-phosphor">{p.id}</span>
                      <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">phase</span>
                    </div>
                    <h3 className="font-display text-3xl md:text-4xl mt-6">{p.t}</h3>
                    <p className="mt-4 text-foreground/70 leading-relaxed">{p.d}</p>
                  </article>
                );
              })}
            </div>

            <div
              role="tabpanel"
              key={PHASES[activePhase].id}
              className="mt-6 frosted rounded-2xl p-8 border border-phosphor/30"
            >
              <div className="flex items-baseline justify-between mb-4">
                <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-phosphor">
                  / Detail · {PHASES[activePhase].id}
                </div>
                <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-foreground/70">
                  {PHASES[activePhase].metric}
                </div>
              </div>
              <p className="text-foreground/85 leading-relaxed text-lg">
                {PHASES[activePhase].detail}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────── CH 03 — THE EVIDENCE ─────────── */
const HUBS: Hub[] = [
  { name: "Kampala", region: "Central",  status: "Critical", dotClass: "bg-destructive", lat:  0.3476, lng: 32.5825, reports: 1284 },
  { name: "Wakiso",  region: "Central",  status: "Active",   dotClass: "bg-orange-400",  lat:  0.4044, lng: 32.4594, reports: 612 },
  { name: "Mbarara", region: "Western",  status: "Active",   dotClass: "bg-orange-400",  lat: -0.6072, lng: 30.6545, reports: 247 },
  { name: "Gulu",    region: "Northern", status: "Optimal",  dotClass: "bg-phosphor",    lat:  2.7747, lng: 32.2990, reports: 188 },
  { name: "Mbale",   region: "Eastern",  status: "Active",   dotClass: "bg-orange-400",  lat:  1.0820, lng: 34.1750, reports: 154 },
  { name: "Lira",    region: "Northern", status: "Optimal",  dotClass: "bg-phosphor",    lat:  2.2491, lng: 32.8997, reports: 132 },
];

function Evidence() {
  const ref = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current!.querySelectorAll(".hub-card"),
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.08, duration: 0.7, ease: "power2.out",
          scrollTrigger: { trigger: ref.current!.querySelector(".hub-grid"), start: "top 90%", once: true },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  const active = HUBS[activeIdx];

  return (
    <section
      ref={ref}
      id="evidence"
      data-chapter
      className="relative py-32 md:py-40 px-6 md:px-12"
      style={{ scrollMarginTop: 60 }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 mb-20">
          <ChapterHeading number="03" lines={["The", "Evidence"]} accentLine={1} />
          <p className="max-w-md text-foreground/65 text-base leading-relaxed">
            Verified incident reports across six launch districts. Every dot is a
            field-confirmed event with a public action log.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          <div className="lg:col-span-3">
            <UgandaMap hubs={HUBS} activeIdx={activeIdx} onSelect={setActiveIdx} />
            <div className="mt-4 flex items-center justify-between font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
              <span>Uganda · Coverage Grid</span>
              <span className="text-phosphor">● {HUBS.length} Districts Live</span>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-3 hub-grid">
            {HUBS.map((h, i) => {
              const isActive = i === activeIdx;
              return (
                <button
                  type="button"
                  key={h.name}
                  onClick={() => setActiveIdx(i)}
                  className={`hub-card w-full text-left rounded-xl p-5 border transition-all duration-300 ${
                    isActive
                      ? "border-phosphor/60 bg-phosphor/[0.06] shadow-[0_0_0_1px_oklch(0.83_0.19_152/0.4),0_18px_36px_oklch(0.83_0.19_152/0.10)]"
                      : "border-border bg-[oklch(0.20_0.018_160/0.5)] hover:border-phosphor/30"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-2 h-2 rounded-full ${h.dotClass}`}
                        style={{ animation: "breathe 2.4s ease-in-out infinite" }}
                      />
                      <span className="font-display text-xl">{h.name}</span>
                    </div>
                    <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-muted-foreground">
                      {h.region}
                    </span>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-3 font-mono text-[10px] tracking-[0.15em] uppercase">
                    <div>
                      <div className="text-muted-foreground">Status</div>
                      <div className="text-foreground/85 mt-1">{h.status}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Reports</div>
                      <div className="text-phosphor mt-1">{h.reports}</div>
                    </div>
                  </div>
                </button>
              );
            })}
            <div className="rounded-xl border border-border p-5 bg-[oklch(0.20_0.018_160/0.3)]">
              <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                Selected District
              </div>
              <div className="font-display text-2xl mt-1 text-phosphor">{active.name}</div>
              <p className="mt-2 text-sm text-foreground/65 leading-relaxed">
                {active.region} region · {active.reports} verified reports filed in
                the last 12 months.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────── CH 04 — JOIN ─────────── */
function Join() {
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [email, setEmail] = useState("");
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setState("loading");
    setTimeout(() => setState("done"), 1100);
  };

  return (
    <section
      id="join"
      data-chapter
      className="relative min-h-screen flex items-center px-6 md:px-12 overflow-hidden"
      style={{ scrollMarginTop: 60 }}
    >
      {/* Golden-hour background */}
      <div className="absolute inset-0 -z-20">
        {PHOTOS.golden ? (
          <img
            src={PHOTOS.golden}
            alt="Golden-hour Ugandan landscape"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full photo-golden" aria-hidden="true" />
        )}
      </div>
      <div className="absolute inset-0 -z-10 bg-background/45" />

      <div className="relative max-w-4xl mx-auto w-full text-center py-32">
        <div className="font-mono text-[11px] tracking-[0.4em] uppercase text-phosphor mb-10">
          / Chapter 04
        </div>
        <h2
          className="font-display font-extrabold leading-[0.9] tracking-[-0.04em]"
          style={{ fontSize: "clamp(3rem, 10vw, 9rem)" }}
        >
          Join the <span className="italic text-phosphor text-glow-strong">mission</span>.
        </h2>
        <p className="mt-10 text-foreground/85 text-lg max-w-xl mx-auto">
          Quarterly field dispatches — raw data, ranger stories, and the science
          behind it. Read by guardians worldwide.
        </p>

        <form onSubmit={submit} className="mt-14 max-w-md mx-auto">
          <div className="relative text-left">
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=" "
              className="peer w-full bg-transparent border-b border-foreground/30 focus:border-phosphor outline-none py-3 text-foreground placeholder-transparent transition-colors"
            />
            <label
              htmlFor="email"
              className="absolute left-0 top-3 text-foreground/60 transition-all duration-200 origin-left pointer-events-none
                peer-focus:-translate-y-5 peer-focus:scale-[0.85] peer-focus:text-phosphor
                peer-[&:not(:placeholder-shown)]:-translate-y-5 peer-[&:not(:placeholder-shown)]:scale-[0.85]"
            >
              Your email
            </label>
          </div>
          <button
            type="submit"
            disabled={state !== "idle"}
            className="btn-sweep mt-10 px-10 py-4 rounded-full text-[11px] tracking-[0.3em] uppercase font-mono min-w-[220px]"
          >
            {state === "idle" && "Become a Guardian"}
            {state === "loading" && (
              <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin align-middle" />
            )}
            {state === "done" && (
              <span className="inline-flex items-center gap-2 justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16">
                  <path
                    d="M3 8 L7 12 L13 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="20"
                    strokeDashoffset="20"
                    style={{ animation: "draw 0.5s ease-out forwards" }}
                  />
                </svg>
                Welcome
              </span>
            )}
          </button>
        </form>
        <p className="mt-16 font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
          Built in Uganda · For the planet
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-border px-6 md:px-12 py-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 justify-between items-start md:items-center">
        <div className="flex items-center gap-3">
          <Logo size={26} />
          <span className="font-display text-lg">EcoGuard</span>
          <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase ml-1">
            / Uganda
          </span>
        </div>
        <nav className="flex flex-wrap gap-x-8 gap-y-3 text-[12px] text-foreground/60 font-mono tracking-wider uppercase">
          <a className="link-sweep" href="#crisis">Crisis</a>
          <a className="link-sweep" href="#how">Method</a>
          <a className="link-sweep" href="#evidence">Evidence</a>
          <a className="link-sweep" href="#join">Join</a>
        </nav>
      </div>
      <div className="max-w-7xl mx-auto mt-10 flex flex-col md:flex-row justify-between gap-2 font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
        <span>© {new Date().getFullYear()} EcoGuard Foundation</span>
        <span>Kampala · Wakiso · Mbarara · Gulu · Mbale · Lira</span>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <>
      <Preloader />
      <main className="min-h-screen">
        <Hero />
        <ChapterNav />
        <Crisis />
        <HowItWorks />
        <Evidence />
        <Join />
        <Footer />
      </main>
    </>
  );
}

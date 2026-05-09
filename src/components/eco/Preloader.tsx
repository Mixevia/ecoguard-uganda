import { useEffect, useState } from "react";
import { Logo } from "./Logo";

export function Preloader() {
  const [show, setShow] = useState(() => {
    if (typeof window === "undefined") return false;
    return !sessionStorage.getItem("eco_preloaded");
  });
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    if (!show) return;
    const t1 = setTimeout(() => setHiding(true), 1400);
    const t2 = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem("eco_preloaded", "1");
    }, 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [show]);

  if (!show) return null;
  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-background"
      style={{
        transition: "transform 0.8s cubic-bezier(0.7,0,0.2,1), opacity 0.6s ease",
        transform: hiding ? "translateY(-100vh)" : "translateY(0)",
      }}
    >
      <div className="flex flex-col items-center gap-6">
        <Logo size={88} animate />
        <div
          className="font-mono text-[10px] tracking-[0.4em] text-phosphor uppercase"
          style={{ opacity: hiding ? 0 : 1, transition: "opacity 0.4s" }}
        >
          EcoGuard · Uganda
        </div>
      </div>
    </div>
  );
}

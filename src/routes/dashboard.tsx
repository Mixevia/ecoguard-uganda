import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState } from "react";

const DashApp = lazy(() => import("../dash/DashApp"));

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "EcoGuard Dashboard — Live Environmental Intelligence" },
      {
        name: "description",
        content:
          "Live alerts, citizen reports, hot-zone maps, and community action for Uganda's wetlands and forests.",
      },
      { property: "og:title", content: "EcoGuard Dashboard" },
      {
        property: "og:description",
        content: "Real-time environmental intelligence for Uganda.",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap",
      },
    ],
  }),
  component: DashboardRoute,
});

function DashboardRoute() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="bg-[#0a0e0d] min-h-screen">
      {mounted ? (
        <Suspense fallback={<div className="min-h-screen" />}>
          <DashApp />
        </Suspense>
      ) : (
        <div className="min-h-screen" />
      )}
    </div>
  );
}

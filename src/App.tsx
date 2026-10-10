import { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import Home from "@/pages/Home";
import Docs from "@/pages/Docs";

/** Cross-route hash links (e.g. /#architecture) land before the target mounts, so scroll after paint. */
function HashScroll() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const frame = requestAnimationFrame(() => {
      document.querySelector(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
}

function App() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      <HashScroll />
      {/* Blueprint grid, fixed behind everything. */}
      <div
        aria-hidden="true"
        className="bp-grid pointer-events-none fixed inset-0 -z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[420px]"
        style={{
          background:
            "radial-gradient(ellipse 60% 100% at 50% 0%, hsl(76 88% 62% / 0.07), transparent 70%)",
        }}
      />

      <Nav />

      <main className="flex-1 pt-14">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;

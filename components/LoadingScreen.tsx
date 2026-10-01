"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { site } from "@/data/site";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduced) {
      setDone(true);
      return;
    }

    if (sessionStorage.getItem("intro-shown") === "true") {
      setDone(true);
      return;
    }

    const start = Date.now();
    const duration = 1200;

    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (pct >= 100) {
        clearInterval(interval);
        sessionStorage.setItem("intro-shown", "true");
        setTimeout(() => setDone(true), 250);
      }
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[var(--bg)]"
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-2xl uppercase tracking-widest text-[var(--text)]"
          >
            {site.name}
          </motion.p>
          <p className="mt-4 font-sans text-xs tracking-widest2 text-[var(--text-muted)]">
            {String(1).padStart(2, "0")} — {progress}%
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

type CursorState = "default" | "view" | "drag" | "open";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState<CursorState>("default");
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    setEnabled(fine && !reduced);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    function handleMove(e: MouseEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);

      const target = e.target as HTMLElement;
      const cursorTarget = target.closest("[data-cursor]") as HTMLElement | null;
      setState((cursorTarget?.dataset.cursor as CursorState) || "default");
    }

    function handleLeave() {
      setVisible(false);
    }

    document.documentElement.classList.add("cursor-none-desktop");
    window.addEventListener("mousemove", handleMove);
    document.documentElement.addEventListener("mouseleave", handleLeave);

    return () => {
      document.documentElement.classList.remove("cursor-none-desktop");
      window.removeEventListener("mousemove", handleMove);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const labels: Record<CursorState, string> = {
    default: "",
    view: "VIEW",
    drag: "DRAG",
    open: "OPEN",
  };

  const sizes: Record<CursorState, number> = {
    default: 10,
    view: 72,
    drag: 72,
    open: 72,
  };

  return (
    <motion.div
      aria-hidden
      style={{ x: springX, y: springY }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ opacity: { duration: 0.2 } }}
      className="pointer-events-none fixed left-0 top-0 z-[999] hidden md:block"
    >
      <motion.div
        animate={{
          width: sizes[state],
          height: sizes[state],
          marginLeft: -sizes[state] / 2,
          marginTop: -sizes[state] / 2,
        }}
        transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
        className="flex items-center justify-center rounded-full border border-[var(--text)] bg-[var(--bg)]/70 backdrop-blur-[2px]"
      >
        {labels[state] && (
          <span className="font-sans text-[10px] uppercase tracking-widest2 text-[var(--text)]">
            {labels[state]}
          </span>
        )}
      </motion.div>
    </motion.div>
  );
}

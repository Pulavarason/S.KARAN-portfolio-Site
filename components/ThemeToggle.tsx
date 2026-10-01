"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      aria-pressed={isDark}
      className={`relative flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] transition-colors duration-500 hover:border-[var(--text)] ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "moon" : "sun"}
          initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
          transition={{ duration: 0.35, ease: [0.65, 0, 0.35, 1] }}
          className="flex items-center justify-center"
        >
          {isDark ? (
            <Moon size={16} strokeWidth={1.5} />
          ) : (
            <Sun size={16} strokeWidth={1.5} />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

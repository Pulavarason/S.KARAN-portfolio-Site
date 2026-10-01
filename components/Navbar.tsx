"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Clapperboard,
  Instagram,
  Linkedin,
  Menu,
  Palette,
  X,
} from "lucide-react";
import { site } from "@/data/site";
import ThemeToggle from "./ThemeToggle";

const ease = [0.65, 0, 0.35, 1] as const;

const socials = [
  { label: "Instagram", href: site.social.instagram, Icon: Instagram },
  { label: "LinkedIn", href: site.social.linkedin, Icon: Linkedin },
  { label: "Vimeo", href: site.social.vimeo, Icon: Clapperboard },
  { label: "Behance", href: site.social.behance, Icon: Palette },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Over the full-bleed hero image the bar must stay light in BOTH themes.
  // Once the page scrolls (or on inner pages) it uses the theme colours.
  const overHero = pathname === "/" && !scrolled && !open;
  const tone = overHero ? "text-bone" : "text-[var(--text)]";
  const toneMuted = overHero
    ? "text-bone/70 hover:text-bone"
    : "text-[var(--text-muted)] hover:text-[var(--text)]";

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${
          scrolled
            ? "border-[var(--line)] bg-[color-mix(in_srgb,var(--bg)_78%,transparent)] backdrop-blur-md"
            : "border-transparent bg-gradient-to-b from-black/40 to-transparent md:from-black/25"
        } ${!scrolled && pathname !== "/" ? "!bg-none" : ""}`}
      >
        <nav className="section-pad flex h-20 items-center justify-between">
          <Link
            href="/"
            className={`font-display text-lg uppercase tracking-widest transition-colors duration-300 ${tone}`}
          >
            {site.name}
          </Link>

          <ul className="hidden items-center gap-10 md:flex">
            {site.nav.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href} className="relative">
                  <Link
                    href={item.href}
                    data-cursor="view"
                    className={`font-sans text-[11px] uppercase tracking-widest2 transition-colors duration-300 ${
                      active ? tone : toneMuted
                    }`}
                  >
                    {item.label}
                  </Link>
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className={`absolute -bottom-2 left-0 h-px w-full ${
                        overHero ? "bg-bone" : "bg-[var(--text)]"
                      }`}
                      transition={{ duration: 0.4, ease }}
                    />
                  )}
                </li>
              );
            })}
          </ul>

          <div className={`flex items-center gap-3 ${tone}`}>
            <ThemeToggle />
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-sidebar"
              onClick={() => setOpen(true)}
              className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors duration-300 md:hidden ${
                overHero ? "border-bone/40" : "border-[var(--line)]"
              }`}
            >
              <Menu size={16} strokeWidth={1.5} />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <>
            {/* Dimmed backdrop, tap to close */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[55] bg-black/60 backdrop-blur-sm md:hidden"
              aria-hidden
            />

            {/* Sidebar */}
            <motion.aside
              key="sidebar"
              id="mobile-sidebar"
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.55, ease }}
              className="fixed inset-y-0 right-0 z-[60] flex w-[82vw] max-w-[340px] flex-col border-l border-[var(--line)] bg-[var(--bg)] text-[var(--text)] shadow-2xl md:hidden"
            >
              {/* Top bar */}
              <div className="flex h-20 items-center justify-between px-6">
                <span className="font-display text-sm uppercase tracking-widest">
                  {site.name}
                </span>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] transition-transform duration-500 hover:rotate-90"
                >
                  <X size={16} strokeWidth={1.5} />
                </button>
              </div>

              {/* Links */}
              <ul className="mt-4 flex flex-col px-6">
                {site.nav.map((item, i) => {
                  const active = pathname === item.href;
                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.2 + 0.06 * i,
                        ease,
                      }}
                      className="border-b border-[var(--line)]"
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={`block py-4 font-sans text-sm uppercase tracking-widest2 transition-all duration-300 hover:translate-x-1 ${
                          active
                            ? "text-[var(--text)]"
                            : "text-[var(--text-muted)] hover:text-[var(--text)]"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              {/* Follow + social icons */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5, ease }}
                className="mt-auto border-t border-[var(--line)] px-6 pb-8 pt-6"
              >
                <p className="font-sans text-[10px] uppercase tracking-widest2 text-[var(--text-muted)]">
                  Follow
                </p>
                <ul className="mt-4 flex gap-3">
                  {socials.map(({ label, href, Icon }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        title={label}
                        className="flex h-10 w-10 items-center justify-center rounded-sm border border-[var(--line)] text-[var(--text-muted)] transition-all duration-300 hover:border-[var(--text)] hover:bg-[var(--text)] hover:text-[var(--bg)]"
                      >
                        <Icon size={16} strokeWidth={1.5} />
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
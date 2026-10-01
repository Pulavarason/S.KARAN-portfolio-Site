"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useRef, useState } from "react";
import type { Project } from "@/data/projects";
import MagneticButton from "./MagneticButton";
import Reveal from "./Reveal";

const ease = [0.65, 0, 0.35, 1] as const;
// very soft ease-out for the panels opening
const smooth = [0.22, 1, 0.36, 1] as const;

export default function FeaturedWork({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Small hover-intent delay so quickly sweeping across panels doesn't jerk them
  function hoverTo(i: number) {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setActive(i), 90);
  }
  function leave() {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setActive(0), 250);
  }

  return (
    <section className="border-t border-[var(--line)] py-14 md:py-20">
      <div className="section-pad">
        {/* Compact header */}
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <Reveal>
              <p className="font-sans text-sm text-[var(--text-muted)]">
                Selected projects
              </p>
            </Reveal>
            <Reveal delay={0.08} className="mt-2">
              <h2
                className="font-display leading-none text-[var(--text)]"
                style={{ fontSize: "clamp(1.75rem, 3.4vw, 2.6rem)" }}
              >
                Featured Work
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <MagneticButton href="/portfolio" variant="outline">
              View Full Portfolio
            </MagneticButton>
          </Reveal>
        </div>

        {/* ───────── Desktop: cinematic expanding panels ───────── */}
        <motion.div
          initial={{ clipPath: "inset(0% 100% 0% 0%)" }}
          whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1.2, ease }}
          className="mt-10 hidden h-[21rem] gap-2 md:flex lg:h-[23rem]"
          onMouseLeave={leave}
        >
          {projects.map((project, i) => {
            const isActive = active === i;
            return (
              <motion.div
                key={project.slug}
                initial={false}
                animate={{ flexGrow: isActive ? 3.6 : 1 }}
                transition={{ duration: 1.2, ease: smooth }}
                style={{ flexBasis: 0 }}
                onMouseEnter={() => hoverTo(i)}
                className="relative min-w-0 overflow-hidden bg-[var(--line)]"
              >
                <Link
                  href={`/portfolio/${project.slug}`}
                  data-cursor="view"
                  onFocus={() => hoverTo(i)}
                  aria-label={project.title}
                  className="group absolute inset-0 block"
                >
                  <Image
                    src={project.heroImage}
                    alt={project.title}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className={`object-cover transition-all duration-[1800ms] ease-out ${
                      isActive ? "scale-100 grayscale-0" : "scale-110 grayscale"
                    }`}
                  />

                  {/* indigo wash that lifts on the active panel */}
                  <div
                    className={`absolute inset-0 transition-opacity duration-[1200ms] ${
                      isActive ? "opacity-70" : "opacity-90"
                    }`}
                    style={{
                      background:
                        "linear-gradient(to top, #1a1530 0%, rgba(26,21,48,0.35) 55%, rgba(42,31,74,0.25) 100%)",
                    }}
                  />

                  {/* number */}
                  <span className="absolute left-5 top-5 font-sans text-xs text-bone/80">
                    {project.number}
                  </span>

                  {/* Collapsed: vertical title (fades out first, back in last) */}
                  <span
                    className={`absolute bottom-5 left-5 rotate-180 font-display text-lg text-bone/90 transition-opacity [writing-mode:vertical-rl] ${
                      isActive
                        ? "opacity-0 duration-500"
                        : "opacity-100 delay-[700ms] duration-700"
                    }`}
                  >
                    {project.title}
                  </span>

                  {/* Expanded: details fade and slide up once the panel has opened */}
                  <div
                    className={`absolute inset-x-0 bottom-0 p-6 transition-all ease-out ${
                      isActive
                        ? "translate-y-0 opacity-100 delay-[500ms] duration-[1000ms]"
                        : "pointer-events-none translate-y-5 opacity-0 duration-500"
                    }`}
                  >
                    <h3
                      className="font-display leading-[1.05] text-bone"
                      style={{ fontSize: "clamp(1.5rem, 2.4vw, 2.1rem)" }}
                    >
                      {project.title}
                    </h3>
                    <div className="mt-3 flex items-center justify-between gap-4">
                      <p className="font-sans text-xs text-bone/75">
                        {project.year} &middot; {project.role} &middot;{" "}
                        {project.category}
                      </p>
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-bone/40 text-bone transition-colors duration-300 group-hover:bg-bone group-hover:text-[#1a1530]">
                        <ArrowUpRight size={16} strokeWidth={1.5} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ───────── Mobile: slim rows ───────── */}
        <div className="mt-8 divide-y divide-[var(--line)] border-y border-[var(--line)] md:hidden">
          {projects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-5% 0px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease }}
            >
              <Link
                href={`/portfolio/${project.slug}`}
                className="flex items-center gap-4 py-4"
              >
                <div className="relative h-16 w-24 shrink-0 overflow-hidden bg-[var(--line)]">
                  <Image
                    src={project.heroImage}
                    alt={project.title}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-sans text-xs text-[var(--text-muted)]">
                    {project.number} &middot; {project.year}
                  </p>
                  <h3 className="truncate font-display text-lg text-[var(--text)]">
                    {project.title}
                  </h3>
                </div>
                <ArrowUpRight
                  size={18}
                  strokeWidth={1.5}
                  className="shrink-0 text-[var(--text-muted)]"
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
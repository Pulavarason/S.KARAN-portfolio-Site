"use client";

import { useMemo, useState } from "react";
import ProjectCard from "./ProjectCard";
import type { Project } from "@/data/projects";

export default function PortfolioGrid({ projects }: { projects: Project[] }) {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.category)))],
    [projects]
  );
  const [active, setActive] = useState("All");

  const visible =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <>
      {/* Filter tabs */}
      <div className="border-y border-[var(--line)]">
        <div className="section-pad flex flex-wrap gap-x-8 gap-y-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setActive(c)}
              aria-pressed={active === c}
              className={`relative py-5 font-sans text-[11px] uppercase tracking-widest2 transition-colors duration-300 ${
                active === c
                  ? "text-[var(--text)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text)]"
              }`}
            >
              {c}
              <span
                className={`absolute bottom-3 left-0 h-px bg-[var(--text)] transition-all duration-300 ${
                  active === c ? "w-full" : "w-0"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Grid (key re-runs the scroll animation when the filter changes) */}
      <div
        key={active}
        className="section-pad grid grid-cols-1 gap-6 py-12 sm:grid-cols-2 lg:grid-cols-4 md:py-16"
      >
        {visible.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>
    </>
  );
}
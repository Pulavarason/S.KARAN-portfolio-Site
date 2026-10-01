"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
  index?: number;
};

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{
        duration: 0.7,
        delay: (index % 4) * 0.1,
        ease: [0.65, 0, 0.35, 1],
      }}
    >
      <Link
        href={`/portfolio/${project.slug}`}
        data-cursor="view"
        className="group block overflow-hidden rounded-md border border-[var(--line)] bg-[var(--bg)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(10,8,25,0.45)]"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--bg-soft)]">
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/30" />

          <span className="absolute left-3 top-3 rounded-sm bg-black/60 px-2 py-1 font-sans text-[9px] uppercase tracking-widest2 text-white backdrop-blur-sm">
            {project.category}
          </span>

          <span className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--text)] text-[var(--bg)] transition-transform duration-500 group-hover:scale-125">
            <Play size={12} fill="currentColor" strokeWidth={0} className="ml-0.5" />
          </span>
        </div>

        <div className="px-4 py-4">
          <h3 className="font-display text-base italic leading-snug text-[var(--text)] transition-transform duration-500 group-hover:translate-x-1">
            {project.title}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
}
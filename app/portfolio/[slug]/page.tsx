import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import ImageReveal from "@/components/ImageReveal";
import { getAdjacentProjects, getProjectBySlug, projects } from "@/data/projects";
import { site } from "@/data/site";

type Props = {
  params: { slug: string };
};

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: `${project.title} — ${site.name}`,
      description: project.description,
      images: [{ url: project.heroImage }],
    },
  };
}

export default function ProjectPage({ params }: Props) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const { prev, next } = getAdjacentProjects(project.slug);

  const meta = [
    ["Year", project.year],
    ["Role", project.role],
    ["Client", project.client],
    ["Category", project.category],
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Cinematic hero */}
      <section className="relative flex h-[85svh] w-full items-end overflow-hidden bg-ink">
        <Image
          src={project.heroImage}
          alt={project.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/40" />
        <div className="section-pad relative z-10 flex w-full flex-col gap-5 pb-16 md:pb-20">
          <span className="inline-flex w-fit items-center gap-3 font-sans text-xs uppercase tracking-widest2 text-bone/80">
            <span className="h-px w-8 bg-bone/60" />
            {project.number} — {project.category}
          </span>
          <h1
            className="font-display leading-[0.95] text-bone"
            style={{ fontSize: "clamp(2.5rem, 8vw, 6.5rem)" }}
          >
            {project.title}
          </h1>
        </div>
      </section>

      {/* Meta strip */}
      <section className="section-pad border-b border-[var(--line)]">
        <div className="grid grid-cols-2 md:grid-cols-4 md:divide-x md:divide-[var(--line)]">
          {meta.map(([label, value], i) => (
            <div key={label} className={`py-8 md:px-8 ${i === 0 ? "md:pl-0" : ""}`}>
              <p className="font-sans text-[11px] uppercase tracking-widest2 text-[var(--text-muted)]">
                {label}
              </p>
              <p className="mt-2 font-display text-lg text-[var(--text)] md:text-xl">
                {value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Description */}
      <section className="section-pad relative py-16 md:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute right-[-10%] top-0 h-[24rem] w-[24rem] rounded-full bg-[var(--text)]/[0.05] blur-[120px]"
        />
        <Reveal>
          <p className="mb-6 font-sans text-[11px] uppercase tracking-widest2 text-[var(--text-muted)]">
            About the project
          </p>
          <p
            className="relative max-w-4xl font-display text-balance leading-snug text-[var(--text)]"
            style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)" }}
          >
            {project.description}
          </p>
        </Reveal>
      </section>

      {/* Supporting images */}
      <section className="section-pad flex flex-col gap-6 pb-16 md:gap-8 md:pb-24">
        {project.images.map((img, i) => (
          <div
            key={img}
            className="shadow-[0_30px_60px_-20px_rgba(10,8,25,0.55)]"
          >
            <ImageReveal
              src={img}
              alt={`${project.title} — image ${i + 1}`}
              wrapperClassName={
                i % 2 === 0
                  ? "aspect-[16/9]"
                  : "aspect-[4/3] md:mx-auto md:w-2/3"
              }
              sizes="100vw"
            />
          </div>
        ))}
      </section>

      {/* Credits */}
      <section className="section-pad border-t border-[var(--line)] py-16 md:py-20">
        <p className="mb-8 font-sans text-[11px] uppercase tracking-widest2 text-[var(--text-muted)]">
          Credits
        </p>
        <ul className="flex flex-col divide-y divide-[var(--line)] border-y border-[var(--line)]">
          {project.credits.map((c) => (
            <li
              key={c.label}
              className="flex items-baseline justify-between gap-6 py-4 font-sans text-sm text-[var(--text)] transition-colors duration-300 hover:bg-[var(--bg-soft)] md:px-4 md:text-base"
            >
              <span className="text-[var(--text-muted)]">{c.label}</span>
              <span className="text-right">{c.name}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Prev / Next */}
      <section className="section-pad grid grid-cols-1 divide-y divide-[var(--line)] border-t border-[var(--line)] md:grid-cols-2 md:divide-x md:divide-y-0">
        <Link
          href={`/portfolio/${prev.slug}`}
          data-cursor="view"
          className="group flex items-center gap-4 py-10 pr-6 transition-colors duration-300 hover:bg-[var(--bg-soft)]"
        >
          <ArrowLeft
            className="transition-transform duration-500 group-hover:-translate-x-1"
            size={18}
            strokeWidth={1.5}
          />
          <div>
            <p className="font-sans text-[11px] uppercase tracking-widest2 text-[var(--text-muted)]">
              Previous
            </p>
            <p className="font-display text-xl text-[var(--text)]">{prev.title}</p>
          </div>
        </Link>
        <Link
          href={`/portfolio/${next.slug}`}
          data-cursor="view"
          className="group flex items-center justify-end gap-4 py-10 pl-6 text-right transition-colors duration-300 hover:bg-[var(--bg-soft)]"
        >
          <div>
            <p className="font-sans text-[11px] uppercase tracking-widest2 text-[var(--text-muted)]">
              Next
            </p>
            <p className="font-display text-xl text-[var(--text)]">{next.title}</p>
          </div>
          <ArrowRight
            className="transition-transform duration-500 group-hover:translate-x-1"
            size={18}
            strokeWidth={1.5}
          />
        </Link>
      </section>
    </div>
  );
}
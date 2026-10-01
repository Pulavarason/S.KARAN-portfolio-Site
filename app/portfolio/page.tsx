import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import PortfolioGrid from "@/components/PortfolioGrid";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Portfolio",
  description: site.seo.description,
};

export default function PortfolioPage() {
  return (
    <div className="relative overflow-hidden pt-32">
      {/* soft neutral glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-[-10%] h-[28rem] w-[28rem] rounded-full bg-[var(--text)]/[0.06] blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-[-15%] top-[45rem] h-[24rem] w-[24rem] rounded-full bg-[var(--text)]/[0.04] blur-[120px]"
      />

      {/* Heading */}
      <div className="section-pad relative">
        <SectionHeading eyebrow="Major Projects" title="Portfolio" />
        <Reveal delay={0.1}>
          <p className="mt-4 flex items-center gap-3 font-sans text-[11px] uppercase tracking-widest2 text-[var(--text-muted)]">
            <span className="h-px w-8 bg-[var(--text-muted)]" />
            {projects.length} selected projects
          </p>
        </Reveal>
      </div>

      {/* Filter tabs + project grid */}
      <div className="relative mt-12 md:mt-16">
        <PortfolioGrid projects={projects} />
      </div>

      {/* Closing CTA */}
      <section className="section-pad relative border-t border-[var(--line)] py-20 text-center md:py-28">
        <Reveal>
          <p className="font-sans text-[11px] uppercase tracking-widest2 text-[var(--text-muted)]">
            Let&apos;s create something
          </p>
          <p
            className="mt-4 font-display text-balance text-[var(--text)]"
            style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
          >
            Have a project in mind?
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-[var(--text)] bg-[var(--text)] px-8 py-3 font-sans text-xs uppercase tracking-widest2 text-[var(--bg)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-transparent hover:text-[var(--text)]"
          >
            Get in touch
          </a>
        </Reveal>
      </section>
    </div>
  );
}
import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description: site.seo.description,
};

export default function AboutPage() {
  const { about } = site;
  const [lead, ...restBio] = about.bio;

  const stats = [
    { value: about.achievements.length, label: "Achievements" },
    { value: about.disciplines.length, label: "Disciplines" },
    { value: about.collaborations.length, label: "Collaborations" },
  ];

  return (
    <div className="relative overflow-hidden pt-32">
      {/* soft neutral glows (theme colour, no accent) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-[-10%] h-[28rem] w-[28rem] rounded-full bg-[var(--text)]/[0.06] blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-[-15%] top-[40rem] h-[24rem] w-[24rem] rounded-full bg-[var(--text)]/[0.04] blur-[120px]"
      />

      {/* Heading */}
      <div className="section-pad relative">
        <SectionHeading eyebrow="About" title={site.fullName} />
        <Reveal delay={0.1}>
          <p className="mt-4 font-sans text-[11px] uppercase tracking-widest2 text-[var(--text-muted)]">
            {site.role}
          </p>
        </Reveal>
      </div>

      {/* Portrait + bio */}
      <section className="section-pad relative grid grid-cols-1 gap-12 py-16 md:grid-cols-12 md:gap-10 md:py-24">
        <Reveal className="md:col-span-5">
          <div className="group relative">
            {/* offset frame */}
            <div
              aria-hidden
              className="absolute -bottom-4 -right-4 h-full w-full border border-[var(--line)] transition-all duration-500 group-hover:translate-x-1 group-hover:translate-y-1 group-hover:border-[var(--text)]/50"
            />
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--bg-soft)] shadow-[0_30px_60px_-20px_rgba(10,8,25,0.55)]">
              <Image
                src={about.portrait}
                alt={`Portrait of ${site.fullName}`}
                fill
                priority
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
              />
            </div>
          </div>
        </Reveal>

        <div className="flex flex-col gap-6 md:col-span-6 md:col-start-7">
          <Reveal>
            <p className="font-display text-2xl leading-snug text-[var(--text)] md:text-3xl">
              {lead}
            </p>
          </Reveal>

          {restBio.map((paragraph, i) => (
            <Reveal key={i} delay={(i + 1) * 0.1}>
              <p className="font-sans text-sm leading-relaxed text-[var(--text-muted)] md:text-base">
                {paragraph}
              </p>
            </Reveal>
          ))}

          <Reveal delay={0.3}>
            <blockquote className="mt-4 border-l-2 border-[var(--text)] pl-6">
              <p className="font-display text-xl leading-snug text-[var(--text)] md:text-2xl">
                {about.philosophy}
              </p>
            </blockquote>
          </Reveal>

          {/* Stats */}
<Reveal delay={0.4}>
  <div className="mt-6 grid grid-cols-3 divide-x divide-[var(--line)] overflow-hidden border border-[var(--line)] bg-[var(--bg-soft)]">
    {stats.map((s) => (
      <div
        key={s.label}
        className="min-w-0 px-2 py-6 text-center sm:px-4 md:py-8"
      >
        <p className="font-display text-2xl text-[var(--text)] sm:text-3xl md:text-4xl">
          {s.value}+
        </p>
        <p className="mt-2 break-words font-sans text-[8px] uppercase tracking-[0.12em] text-[var(--text-muted)] sm:text-[10px] sm:tracking-widest2">
          {s.label}
        </p>
      </div>
    ))}
  </div>
</Reveal>
        </div>
      </section>

      {/* Disciplines */}
      <section className="section-pad relative border-t border-[var(--line)] py-16 md:py-20">
        <Reveal>
          <p className="mb-8 font-sans text-[11px] uppercase tracking-widest2 text-[var(--text-muted)]">
            Disciplines
          </p>
        </Reveal>
        <div className="flex flex-wrap gap-3">
          {about.disciplines.map((d, i) => (
            <Reveal key={d} delay={i * 0.06}>
              <span className="inline-flex items-center gap-3 rounded-full border border-[var(--line)] px-5 py-2.5 font-sans text-xs uppercase tracking-widest2 text-[var(--text)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--text)] hover:bg-[var(--text)] hover:text-[var(--bg)]">
                <span className="text-[10px] opacity-50">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {d}
              </span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Achievements timeline */}
      <section className="section-pad relative border-t border-[var(--line)] py-16 md:py-20">
        <Reveal>
          <p className="mb-10 font-sans text-[11px] uppercase tracking-widest2 text-[var(--text-muted)]">
            Selected Achievements
          </p>
        </Reveal>
        <div className="relative ml-2 border-l border-[var(--line)] pl-8 md:ml-4 md:pl-12">
          {about.achievements.map((a, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <div className="group relative pb-10 last:pb-0">
                {/* timeline dot */}
                <span
                  aria-hidden
                  className="absolute -left-[37px] top-2 h-2.5 w-2.5 rounded-full border border-[var(--text)] bg-[var(--bg)] transition-all duration-300 group-hover:scale-150 group-hover:bg-[var(--text)] md:-left-[53px]"
                />
                <p className="font-display text-2xl text-[var(--text)] md:text-3xl">
                  {a.year}
                </p>
                <p className="mt-2 max-w-2xl font-sans text-sm leading-relaxed text-[var(--text-muted)] md:text-base">
                  {a.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="section-pad relative border-t border-[var(--line)] py-20 text-center md:py-24">
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
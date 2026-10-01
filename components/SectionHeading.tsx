import Reveal from "./Reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  align?: "left" | "center";
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`${align === "center" ? "text-center" : "text-left"} ${className}`}>
      {eyebrow && (
        <Reveal>
          <p className="mb-4 font-sans text-[11px] uppercase tracking-widest2 text-[var(--text-muted)]">
            {eyebrow}
          </p>
        </Reveal>
      )}
      <Reveal delay={0.08}>
        <h2 className="font-display text-balance leading-[0.98] text-[var(--text)]"
          style={{ fontSize: "clamp(2.25rem, 6vw, 5.5rem)" }}
        >
          {title}
        </h2>
      </Reveal>
    </div>
  );
}

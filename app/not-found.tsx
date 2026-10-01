import Link from "next/link";

export default function NotFound() {
  return (
    <div className="section-pad flex min-h-[70vh] flex-col items-center justify-center pt-32 text-center">
      <p className="font-sans text-xs uppercase tracking-widest2 text-[var(--text-muted)]">
        404
      </p>
      <h1
        className="mt-4 font-display leading-none text-[var(--text)]"
        style={{ fontSize: "clamp(3rem, 10vw, 7rem)" }}
      >
        Page Not Found
      </h1>
      <p className="mt-6 max-w-sm font-sans text-sm text-[var(--text-muted)]">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Link
        href="/"
        className="mt-10 rounded-full border border-[var(--line)] px-8 py-4 font-sans text-xs uppercase tracking-widest2 text-[var(--text)] transition-colors hover:border-[var(--text)]"
      >
        Return Home
      </Link>
    </div>
  );
}

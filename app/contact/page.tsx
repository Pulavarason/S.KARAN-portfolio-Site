import type { Metadata } from "next";
import { Instagram, Linkedin } from "lucide-react";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: site.seo.description,
};

export default function ContactPage() {
  return (
    <div className="pt-32">
      <div className="section-pad">
        <Reveal>
          <p className="flex items-center gap-3 font-sans text-[11px] uppercase tracking-widest2 text-[var(--text-muted)]">
            <span className="h-px w-8 bg-[var(--text-muted)]" />
            Contact
          </p>
          <h1
            className="mt-5 max-w-2xl font-display text-balance leading-[1.1] text-[var(--text)]"
            style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
          >
            Let&apos;s create something timeless.
          </h1>
          <p className="mt-4 max-w-md font-sans text-sm leading-relaxed text-[var(--text-muted)]">
            Have a role, project or collaboration in mind? Send a message and a
            reply will follow soon.
          </p>
        </Reveal>
      </div>

      <div className="section-pad grid grid-cols-1 gap-16 py-16 md:grid-cols-12 md:py-24">
        <div className="flex flex-col gap-10 md:col-span-4">
          <div>
            <p className="font-sans text-[11px] uppercase tracking-widest2 text-[var(--text-muted)]">
              Email
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-1 block break-all font-display text-xl text-[var(--text)] hover:underline"
            >
              {site.email}
            </a>
          </div>
          <div>
            <p className="font-sans text-[11px] uppercase tracking-widest2 text-[var(--text-muted)]">
              Phone
            </p>
            <a
              href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}
              className="mt-1 block font-display text-xl text-[var(--text)] hover:underline"
            >
              {site.phone}
            </a>
          </div>
          <div>
            <p className="font-sans text-[11px] uppercase tracking-widest2 text-[var(--text-muted)]">
              Location
            </p>
            <p className="mt-1 font-display text-xl text-[var(--text)]">
              {site.location}
            </p>
          </div>
          <div className="flex gap-4 pt-2">
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] transition-colors hover:border-[var(--text)]"
            >
              <Instagram size={16} strokeWidth={1.5} />
            </a>
            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] transition-colors hover:border-[var(--text)]"
            >
              <Linkedin size={16} strokeWidth={1.5} />
            </a>
            <a
              href={site.social.vimeo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 items-center justify-center rounded-full border border-[var(--line)] px-4 font-sans text-xs uppercase tracking-widest2 transition-colors hover:border-[var(--text)]"
            >
              Vimeo
            </a>
            <a
              href={site.social.behance}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 items-center justify-center rounded-full border border-[var(--line)] px-4 font-sans text-xs uppercase tracking-widest2 transition-colors hover:border-[var(--text)]"
            >
              Behance
            </a>
          </div>
        </div>

        <div className="md:col-span-7 md:col-start-6">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
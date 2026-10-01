"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowUp,
  Clapperboard,
  Instagram,
  Linkedin,
  Mail,
  Palette,
} from "lucide-react";
import { site } from "@/data/site";

export default function Footer() {
  const year = new Date().getFullYear();
  // 👉 Put your photo at /public/images/developer.jpg (shows "P" until it exists)
  const [devImgFailed, setDevImgFailed] = useState(false);

  const socials = [
    { label: "Instagram", href: site.social.instagram, Icon: Instagram },
    { label: "LinkedIn", href: site.social.linkedin, Icon: Linkedin },
    { label: "Vimeo", href: site.social.vimeo, Icon: Clapperboard },
    { label: "Behance", href: site.social.behance, Icon: Palette },
  ];

  return (
    <footer className="relative border-t border-[var(--line)]">
      {/* fine accent line across the top edge */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#6b58b8]/60 to-transparent"
      />

      <div className="section-pad grid gap-12 py-14 md:grid-cols-12 md:gap-8 md:py-16">
        {/* Left: identity + social icons */}
        <div className="md:col-span-5">
          <p className="font-display text-2xl uppercase tracking-widest text-[var(--text)]">
            {site.name}
          </p>
          <p className="mt-2 font-sans text-[11px] uppercase tracking-widest2 text-[var(--text-muted)]">
            {site.role}
          </p>
          <p className="mt-5 max-w-xs font-sans text-sm leading-relaxed text-[var(--text-muted)]">
            {site.tagline}
          </p>

          <ul className="mt-6 flex gap-3">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] text-[var(--text)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--text)] hover:bg-[var(--text)] hover:text-[var(--bg)]"
                >
                  <Icon size={16} strokeWidth={1.5} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Middle: navigation */}
        <nav aria-label="Footer" className="md:col-span-3">
          <p className="mb-4 font-sans text-sm text-[var(--text)]">Explore</p>
          <ul className="flex flex-col gap-3">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group inline-flex items-center gap-2 font-sans text-sm text-[var(--text-muted)] transition-colors duration-300 hover:text-[var(--text)]"
                >
                  <span className="h-px w-0 bg-[var(--text)] transition-all duration-300 group-hover:w-3" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right: contact + back to top */}
        <div className="flex flex-col items-start gap-5 md:col-span-4 md:items-end md:text-right">
          <p className="font-sans text-sm text-[var(--text)] md:text-right">
            Get in touch
          </p>
          <a
            href={`mailto:${site.email}`}
            className="group inline-flex items-center gap-2 font-sans text-sm text-[var(--text-muted)] transition-colors duration-300 hover:text-[var(--text)]"
          >
            <Mail size={15} strokeWidth={1.5} />
            {site.email}
          </a>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="mt-2 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--text)]"
          >
            <ArrowUp size={16} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div className="section-pad flex flex-col gap-2 border-t border-[var(--line)] py-5 font-sans text-xs text-[var(--text-muted)] md:flex-row md:items-center md:justify-between">
        <p>
          &copy; {year} {site.fullName}. All rights reserved.
        </p>
        <a
          href="https://pulavarason-portfolio.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Developed by PULAVARASON – view portfolio"
          className="group flex items-center gap-2 transition-colors duration-300 hover:text-[var(--text)]"
        >
          Developed by
          <span className="relative flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[var(--line)] bg-[var(--bg-soft)] text-[10px] font-medium text-[var(--text)]">
            {devImgFailed ? (
              "P"
            ) : (
              <Image
                src="/images/developer.jpg"
                alt="PULAVARASON"
                fill
                sizes="24px"
                className="object-cover"
                onError={() => setDevImgFailed(true)}
              />
            )}
          </span>
          <span className="font-medium text-[var(--text)] underline-offset-4 group-hover:underline">
            PULAVARASON
          </span>
        </a>
      </div>
    </footer>
  );
}
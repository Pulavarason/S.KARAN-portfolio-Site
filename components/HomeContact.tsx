"use client";

import { motion } from "framer-motion";
import { Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "./ContactForm";
import Reveal from "./Reveal";
import { site } from "@/data/site";

const ease = [0.65, 0, 0.35, 1] as const;

const pill =
  "flex h-9 items-center justify-center rounded-full border border-[var(--line)] px-4 font-sans text-xs text-[var(--text)] transition-colors duration-300 hover:border-[var(--text)]";
const round =
  "flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] text-[var(--text)] transition-colors duration-300 hover:border-[var(--text)]";

export default function HomeContact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-[var(--line)] py-16 md:py-24"
    >
      {/* soft indigo glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 bottom-0 h-[28rem] w-[28rem] rounded-full opacity-25 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at center, #3a2c6b 0%, #1a1530 45%, transparent 70%)",
        }}
      />

      <div className="section-pad relative grid gap-12 md:grid-cols-12 md:gap-10">
        {/* Left: heading + details */}
        <div className="md:col-span-5">
          <Reveal>
            <p className="font-sans text-sm text-[var(--text-muted)]">
              Contact
            </p>
          </Reveal>

          <Reveal delay={0.08} className="mt-2">
            <h2
              className="font-display leading-[1.05] text-[var(--text)]"
              style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)" }}
            >
              Let&apos;s create something timeless.
            </h2>
          </Reveal>

          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.15, ease }}
            className="mt-6 block h-px w-16 origin-left bg-[var(--text)]/40"
          />

          <ul className="mt-8 space-y-5">
            {[
              {
                icon: Mail,
                label: site.email,
                href: `mailto:${site.email}`,
              },
              {
                icon: Phone,
                label: site.phone,
                href: `tel:${site.phone.replace(/[^+\d]/g, "")}`,
              },
              { icon: MapPin, label: site.location, href: undefined },
            ].map(({ icon: Icon, label, href }, i) => (
              <motion.li
                key={label}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-5% 0px" }}
                transition={{ duration: 0.7, delay: 0.1 * i, ease }}
                className="flex items-center gap-4"
              >
                <span className={round}>
                  <Icon size={15} strokeWidth={1.5} />
                </span>
                {href ? (
                  <a
                    href={href}
                    className="font-sans text-sm text-[var(--text)] hover:underline md:text-base"
                  >
                    {label}
                  </a>
                ) : (
                  <span className="font-sans text-sm text-[var(--text)] md:text-base">
                    {label}
                  </span>
                )}
              </motion.li>
            ))}
          </ul>

          <Reveal delay={0.3} className="mt-8 flex flex-wrap gap-3">
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className={round}
            >
              <Instagram size={15} strokeWidth={1.5} />
            </a>
            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className={round}
            >
              <Linkedin size={15} strokeWidth={1.5} />
            </a>
            <a
              href={site.social.vimeo}
              target="_blank"
              rel="noopener noreferrer"
              className={pill}
            >
              Vimeo
            </a>
            <a
              href={site.social.behance}
              target="_blank"
              rel="noopener noreferrer"
              className={pill}
            >
              Behance
            </a>
          </Reveal>
        </div>

        {/* Right: your existing form */}
        <Reveal delay={0.15} y={40} className="md:col-span-7 md:pl-8">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
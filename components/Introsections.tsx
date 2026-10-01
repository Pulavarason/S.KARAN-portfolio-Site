"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { site } from "@/data/site";
import MagneticButton from "./MagneticButton";
import Reveal from "./Reveal";

const ease = [0.65, 0, 0.35, 1] as const;

const QUOTE = "I look for the quiet moment just before the light changes, and I wait there.";

export default function IntroSections() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // Scroll-linked motion for the image (parallax + gentle zoom)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-8%", "8%"]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], reduce ? [1, 1, 1] : [1.25, 1.1, 1.25]);
  const frameY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [24, -24]);

  return (
    <section ref={ref} className="section-pad overflow-hidden py-20 md:py-28">
      <div className="grid items-start gap-12 md:grid-cols-12 md:gap-16">
        {/* ───────── Left: image + extra text ───────── */}
        <div className="md:col-span-5">
          <div className="mx-auto w-full max-w-[20rem] md:mx-0 md:max-w-[24rem]">
            <div className="relative">
              {/* offset frame that drifts against the scroll */}
              <motion.div
                aria-hidden
                style={{ y: frameY }}
                className="absolute -bottom-3 -right-3 h-full w-full border border-[var(--line)]"
              />
              <motion.div
                initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
                whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 1.2, ease }}
                className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--line)]"
              >
                <motion.div
                  style={{ y: imgY, scale: imgScale }}
                  className="absolute inset-0"
                >
                  {/* 👉 Replace with your own photo, e.g. /images/about/saravanan.jpg */}
                  <Image
                    src={site.about.portrait}
                    alt={`${site.fullName} — portrait`}
                    fill
                    sizes="(min-width: 768px) 25vw, 80vw"
                    className="object-cover"
                  />
                </motion.div>
              </motion.div>
            </div>

            {/* Extra text under the image */}
            <div className="mt-10">
              <Reveal delay={0.1}>
                <p className="font-sans text-sm leading-relaxed text-[var(--text-muted)]">
                  Working between cinema, photography and installation — based
                  in {site.location}.
                </p>
              </Reveal>

            </div>
          </div>
        </div>

        {/* ───────── Right: details ───────── */}
        <div className="md:col-span-7 md:pt-6">
          <Reveal y={40}>
            <h2
              className="font-display leading-tight text-[var(--text)]"
              style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)" }}
            >
              {site.fullName}
            </h2>
            <p className="mt-2 font-sans text-sm text-[var(--text-muted)]">
              {site.role}
            </p>
          </Reveal>

          {/* Small quote above the line */}
          <Reveal delay={0.1} y={30} className="mt-5 max-w-md">
            <p className="font-sans text-sm leading-relaxed text-[var(--text)]/80">
              &ldquo;{QUOTE}&rdquo;
            </p>
          </Reveal>

          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.15, ease }}
            className="mt-6 block h-px w-16 origin-left bg-[var(--text)]/40"
          />

          <Reveal delay={0.15} y={40} className="mt-6 max-w-xl">
            <p className="font-sans text-sm leading-relaxed text-[var(--text-muted)] md:text-base">
              {site.about.bio[0]}
            </p>
          </Reveal>

          <Reveal delay={0.25} y={40} className="mt-4 max-w-xl">
            <p className="font-sans text-sm leading-relaxed text-[var(--text-muted)] md:text-base">
              {site.about.bio[1]}
            </p>
          </Reveal>

          <Reveal delay={0.35} y={30} className="mt-8">
            <MagneticButton href="/about" variant="solid">
              See more
            </MagneticButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
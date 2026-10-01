"use client";

import { motion, useReducedMotion, type PanInfo } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { galleryImages } from "@/data/gallery";
import MagneticButton from "./MagneticButton";
import Reveal from "./Reveal";

const ease = [0.65, 0, 0.35, 1] as const;
const MAX_IMAGES = 8; // how many images rotate on the home page
const AUTO_MS = 3000;

/** Position/appearance of a card by its distance from the centre card. */
function slot(diff: number) {
  const a = Math.abs(diff);
  if (a > 2) {
    return { x: "0%", scale: 0.5, rotateY: 0, opacity: 0, filter: "blur(12px)" };
  }
  return {
    x: `${diff * 68}%`,
    scale: 1 - a * 0.18,
    rotateY: -diff * 38,
    opacity: a === 0 ? 1 : a === 1 ? 0.85 : 0.35,
    filter: `blur(${a === 0 ? 0 : a === 1 ? 5 : 9}px)`,
  };
}

export default function HomeGallery() {
  const images = galleryImages.slice(0, MAX_IMAGES);
  const n = images.length;
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setIndex((i) => (i + 1) % n), [n]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + n) % n), [n]);

  // Auto-advance every 3s. Stops only while the mouse is on an image.
  // Depends on `index` so a manual click restarts the 3s timer.
  useEffect(() => {
    if (paused || n < 2) return;
    const id = setTimeout(next, AUTO_MS);
    return () => clearTimeout(id);
  }, [index, paused, next, n]);

  function onPanEnd(_: unknown, info: PanInfo) {
    if (info.offset.x < -60) next();
    else if (info.offset.x > 60) prev();
  }

  if (n === 0) return null;

  return (
    <section className="relative overflow-hidden border-t border-[var(--line)] py-14 md:py-20">
      {/* soft indigo glow behind the stage */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[44rem] max-w-full -translate-x-1/2 -translate-y-1/3 rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at center, #3a2c6b 0%, #1a1530 45%, transparent 70%)",
        }}
      />

      <div className="section-pad relative">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <Reveal>
              <p className="font-sans text-sm text-[var(--text-muted)]">
                Selected images
              </p>
            </Reveal>
            <Reveal delay={0.08} className="mt-2">
              <h2
                className="font-display leading-none text-[var(--text)]"
                style={{ fontSize: "clamp(1.75rem, 3.4vw, 2.6rem)" }}
              >
                Gallery
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <MagneticButton href="/gallery" variant="text">
              See all
            </MagneticButton>
          </Reveal>
        </div>

        {/* 3D coverflow stage */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1, ease }}
          onPanEnd={onPanEnd}
          className="relative mt-10 flex h-[23rem] touch-pan-y items-center justify-center md:h-[28rem]"
          style={{ perspective: 1400 }}
        >
          {images.map((img, i) => {
            let diff = i - index;
            if (diff > n / 2) diff -= n;
            if (diff < -n / 2) diff += n;
            const a = Math.abs(diff);
            const isCenter = diff === 0;

            return (
              <motion.button
                key={img.id}
                type="button"
                aria-label={isCenter ? img.title : `Show ${img.title}`}
                tabIndex={a > 1 ? -1 : 0}
                onClick={() => !isCenter && setIndex(i)}
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
                onFocus={() => setPaused(true)}
                onBlur={() => setPaused(false)}
                initial={false}
                animate={reduce ? { ...slot(diff), rotateY: 0, filter: "blur(0px)" } : slot(diff)}
                transition={{ duration: 0.9, ease }}
                style={{ zIndex: 10 - a, pointerEvents: a > 2 ? "none" : "auto" }}
                className={`absolute w-[13.5rem] md:w-[17rem] ${
                  isCenter ? "cursor-default" : "cursor-pointer"
                }`}
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[var(--line)] shadow-[0_30px_60px_-20px_rgba(10,8,25,0.55)]">
                  <Image
                    src={img.src}
                    alt={img.title}
                    fill
                    sizes="(min-width: 768px) 272px, 216px"
                    className="object-cover"
                    priority={i === 0}
                  />
                  {/* category tag on the clear (centre) card */}
                  <div
                    className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-left transition-opacity duration-700 ${
                      isCenter ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <p className="font-sans text-[10px] uppercase tracking-widest2 text-white/90">
                      {img.category}
                    </p>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Controls */}
        <div className="mt-8 flex items-center justify-center gap-5">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous image"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] text-[var(--text)] transition-colors hover:border-[var(--text)]"
          >
            <ChevronLeft size={16} strokeWidth={1.5} />
          </button>

          <div className="flex items-center gap-2">
            {images.map((img, i) => (
              <button
                key={img.id}
                type="button"
                aria-label={`Go to image ${i + 1}`}
                aria-current={i === index}
                onClick={() => setIndex(i)}
                className="group flex h-5 items-center"
              >
                <span
                  className={`block h-[2px] transition-all duration-500 ${
                    i === index
                      ? "w-8 bg-[var(--text)]"
                      : "w-3 bg-[var(--text)]/25 group-hover:bg-[var(--text)]/60"
                  }`}
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={next}
            aria-label="Next image"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] text-[var(--text)] transition-colors hover:border-[var(--text)]"
          >
            <ChevronRight size={16} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </section>
  );
}
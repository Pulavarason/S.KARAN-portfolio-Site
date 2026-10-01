"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { site } from "@/data/site";
import MagneticButton from "./MagneticButton";

const NAME = site.fullName;
const ROLE = site.role;

// 👉 Put your three images in /public/images/hero/ and update these paths.
const SLIDES = [
  { src: "/images/hero/hero-01.svg", alt: `${NAME} ` },
  { src: "/images/hero/hero-02.svg", alt: `${NAME} ` },
  { src: "/images/hero/hero-03.svg", alt: `${NAME} ` },
];

const SLIDE_MS = 5000;
const ease = [0.65, 0, 0.35, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  // Auto-advance every 5s. Depends on `index` so clicking a bar restarts the timer.
  useEffect(() => {
    const id = setTimeout(
      () => setIndex((i) => (i + 1) % SLIDES.length),
      SLIDE_MS
    );
    return () => clearTimeout(id);
  }, [index]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.12, 0.5]);

  return (
    <section
      ref={ref}
      className="relative flex h-[100svh] w-full items-center overflow-hidden bg-[#1a1530] md:items-end"
    >
      {/* Background slideshow (scroll parallax on the wrapper) */}
      <motion.div
        style={{ scale: imageScale, y: imageY }}
        className="absolute inset-0"
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{
              clipPath: reduce ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)",
              opacity: reduce ? 0 : 1,
            }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
            exit={{ opacity: 1, transition: { duration: 1.4 } }}
            transition={{ duration: 1.3, ease }}
          >
            {/* Ken Burns: slow zoom-out while the slide is on screen */}
            <motion.div
              className="absolute inset-0"
              initial={{ scale: reduce ? 1 : 1.18 }}
              animate={{ scale: 1 }}
              transition={{ duration: (SLIDE_MS + 1500) / 1000, ease: "linear" }}
            >
              <Image
                src={SLIDES[index].src}
                alt={SLIDES[index].alt}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Readability layers */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-[#1a1530]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1530]/80 via-transparent to-[#2a1f4a]/25" />
      </motion.div>

      {/* Content: centered on mobile, bottom-left on desktop */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="section-pad relative z-10 flex w-full flex-col gap-4 pb-24 pt-24 md:gap-6 md:pb-36 md:pt-56"
      >
        {/* Role */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2, ease }}
          className="flex items-center gap-3"
        >
          <span className="h-px w-8 bg-bone/60 md:w-14" />
          <span className="font-sans text-xs font-medium tracking-wide text-bone/90 md:text-base">
            {ROLE}
          </span>
        </motion.div>

        {/* Name: rises out of a mask */}
        <h1
          className="font-display leading-[0.95] text-bone"
          style={{ fontSize: "clamp(2.75rem, 11vw, 9rem)" }}
        >
          <span className="block overflow-hidden pb-[0.1em]">
            <motion.span
              className="block"
              initial={{ y: "110%", rotate: 3 }}
              animate={{ y: "0%", rotate: 0 }}
              transition={{ duration: 1.1, delay: 0.35, ease }}
            >
              {NAME}
            </motion.span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8, ease }}
          className="max-w-xs font-sans text-[13px] leading-relaxed text-bone/75 md:max-w-md md:text-sm"
        >
          {site.tagline}
        </motion.p>

        {/* Buttons: side by side and compact on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.95, ease }}
          className="flex flex-row flex-wrap items-center gap-3 pt-2 md:gap-4 md:pt-3"
        >
          <MagneticButton
            href="/portfolio"
            variant="solid"
            className="!px-5 !py-3 !text-[10px] md:!px-8 md:!py-4 md:!text-xs"
          >
            Explore Work
          </MagneticButton>
          <MagneticButton
            href="/gallery"
            variant="outline"
            className="!border-bone/30 !px-5 !py-3 !text-[10px] !text-bone hover:!border-bone md:!px-8 md:!py-4 md:!text-xs"
          >
            View Gallery
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Slide counter + progress bars + scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="section-pad absolute inset-x-0 bottom-6 z-10 flex items-center justify-between md:bottom-8"
      >
        <div className="flex items-center gap-4">
          <span className="font-sans text-[11px] tabular-nums tracking-widest2 text-bone/80">
            {String(index + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
          </span>
          <div className="flex items-center gap-2">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Show image ${i + 1}`}
                aria-current={i === index}
                onClick={() => setIndex(i)}
                className="group relative h-5 w-8 md:w-14"
              >
                <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-bone/25 transition-all group-hover:h-[2px]" />
                {i === index && (
                  <motion.span
                    key={`fill-${index}`}
                    className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 origin-left bg-bone"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: SLIDE_MS / 1000, ease: "linear" }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="text-bone/60" size={22} strokeWidth={1} />
        </motion.div>
      </motion.div>
    </section>
  );
}
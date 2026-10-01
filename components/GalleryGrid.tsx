"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { Maximize2 } from "lucide-react";
import Image from "next/image";
import { useMemo, useState, type MouseEvent, type ReactNode } from "react";
import {
  galleryCategories,
  galleryImages,
  type GalleryCategory,
} from "@/data/gallery";
import GalleryLightbox from "./GalleryLightbox";

const ease = [0.65, 0, 0.35, 1] as const;

type Filter = GalleryCategory | "All";

/** Gentle 3D tilt that follows the cursor (disabled for reduced motion). */
function Tilt({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateY = useSpring(x, { stiffness: 160, damping: 18 });
  const rotateX = useSpring(y, { stiffness: 160, damping: 18 });

  function onMove(e: MouseEvent<HTMLDivElement>) {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    x.set(px * 9);
    y.set(-py * 9);
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
    >
      {children}
    </motion.div>
  );
}

export default function GalleryGrid() {
  const [active, setActive] = useState<Filter>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const cats = useMemo(
    () =>
      [
        "All",
        ...(galleryCategories as readonly string[]).filter((c) => c !== "All"),
      ] as Filter[],
    []
  );

  const count = (cat: Filter) =>
    cat === "All"
      ? galleryImages.length
      : galleryImages.filter((img) => img.category === cat).length;

  const filtered = useMemo(
    () =>
      active === "All"
        ? galleryImages
        : galleryImages.filter((img) => img.category === active),
    [active]
  );

  return (
    <div>
      {/* Sticky filter bar */}
      <div className="sticky top-20 z-30 border-y border-[var(--line)] bg-[color-mix(in_srgb,var(--bg)_80%,transparent)] backdrop-blur-md">
        <div className="section-pad flex items-center gap-4 py-3">
          <div className="flex flex-1 gap-1.5 overflow-x-auto [scrollbar-width:none]">
            {cats.map((cat) => {
              const isActive = active === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActive(cat)}
                  className={`relative shrink-0 rounded-full px-4 py-1.5 font-sans text-sm transition-colors duration-300 ${
                    isActive
                      ? "text-[var(--bg)]"
                      : "text-[var(--text-muted)] hover:text-[var(--text)]"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="gallery-pill"
                      className="absolute inset-0 rounded-full bg-[var(--text)]"
                      transition={{ duration: 0.5, ease }}
                    />
                  )}
                  <span className="relative flex items-center gap-1.5">
                    {cat}
                    <span className="text-[10px] tabular-nums opacity-60">
                      {String(count(cat)).padStart(2, "0")}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <p className="hidden shrink-0 font-sans text-xs tabular-nums text-[var(--text-muted)] sm:block">
            Showing {filtered.length} of {galleryImages.length}
          </p>
        </div>
      </div>

      {/* Compact masonry: more columns, smaller cards. Hovering one dims the rest. */}
      <div
        key={active}
        className="section-pad mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      >
        {filtered.map((img, i) => {
          const globalIndex = galleryImages.findIndex((g) => g.id === img.id);
          return (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-4% 0px" }}
              transition={{ duration: 0.9, delay: (i % 5) * 0.07, ease }}
            >
              <Tilt>
                <button
                  type="button"
                  onClick={() => setLightboxIndex(globalIndex)}
                  data-cursor="open"
                  aria-label={`Open ${img.title}`}
                  className="group relative block w-full overflow-hidden bg-[var(--bg-soft)] text-left transition-[transform,box-shadow] duration-500 hover:-translate-y-1.5 hover:shadow-[0_22px_40px_-18px_rgba(26,21,48,0.6)]"
                >
                  <div className="relative aspect-[4/5] w-full">
                    <Image
                      src={img.src}
                      alt={img.title}
                      fill
                      sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                      className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.08]"
                    />

                    {/* indigo wash */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1530]/90 via-[#1a1530]/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    {/* viewfinder frame */}
                    <div className="absolute inset-2 border border-white/0 transition-all duration-500 group-hover:inset-3 group-hover:border-white/35" />

                    <span className="absolute left-4 top-4 font-sans text-[10px] tabular-nums text-white/0 transition-colors duration-500 group-hover:text-white/80">
                      {String(globalIndex + 1).padStart(2, "0")}
                    </span>

                    <span className="absolute right-4 top-4 flex h-7 w-7 translate-y-1 items-center justify-center rounded-full border border-white/40 text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <Maximize2 size={12} strokeWidth={1.5} />
                    </span>

                    <div className="absolute inset-x-0 bottom-0 translate-y-2 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <p className="font-display text-base leading-tight text-white">
                        {img.title}
                      </p>
                      <p className="mt-0.5 font-sans text-[11px] text-white/70">
                        {img.category} &middot; {img.year}
                      </p>
                    </div>
                  </div>
                </button>
              </Tilt>
            </motion.div>
          );
        })}
      </div>

      {lightboxIndex !== null && (
        <GalleryLightbox
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onChangeIndex={setLightboxIndex}
        />
      )}
    </div>
  );
}
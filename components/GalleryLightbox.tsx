"use client";

import { AnimatePresence, motion, PanInfo } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { galleryImages } from "@/data/gallery";

type GalleryLightboxProps = {
  index: number;
  onClose: () => void;
  onChangeIndex: (i: number) => void;
};

export default function GalleryLightbox({
  index,
  onClose,
  onChangeIndex,
}: GalleryLightboxProps) {
  const total = galleryImages.length;
  const image = galleryImages[index];

  const goNext = useCallback(() => {
    onChangeIndex((index + 1) % total);
  }, [index, total, onChangeIndex]);

  const goPrev = useCallback(() => {
    onChangeIndex((index - 1 + total) % total);
  }, [index, total, onChangeIndex]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    }
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, goNext, goPrev]);

  function handleDragEnd(_: unknown, info: PanInfo) {
    if (info.offset.x < -80) goNext();
    else if (info.offset.x > 80) goPrev();
  }

  return (
    <AnimatePresence>
      <motion.div
        key="lightbox"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        role="dialog"
        aria-modal="true"
        aria-label={`${image.title} — image viewer`}
        className="fixed inset-0 z-[100] flex flex-col bg-black/95"
      >
        <div className="flex items-center justify-between p-5 md:p-8">
          <p className="font-sans text-xs uppercase tracking-widest2 text-white/70">
            {index + 1} / {total}
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close viewer"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-white"
          >
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>

        <div className="relative flex flex-1 items-center justify-center overflow-hidden px-4 pb-4">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/20 p-3 text-white transition-colors hover:border-white md:flex"
          >
            <ChevronLeft size={20} strokeWidth={1.5} />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={image.id}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.6}
              onDragEnd={handleDragEnd}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
              className="relative h-full w-full max-w-5xl touch-pan-y"
            >
              <div className="relative mx-auto h-[60vh] w-full md:h-[70vh]">
                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            type="button"
            onClick={goNext}
            aria-label="Next image"
            className="absolute right-3 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/20 p-3 text-white transition-colors hover:border-white md:flex"
          >
            <ChevronRight size={20} strokeWidth={1.5} />
          </button>
        </div>

        <div className="section-pad flex flex-col gap-2 pb-8 text-center md:text-left">
          <p className="font-display text-2xl text-white">{image.title}</p>
          <p className="font-sans text-xs uppercase tracking-widest2 text-white/60">
            {image.category} — {image.year}
          </p>
          <p className="max-w-lg font-sans text-sm text-white/70 md:mx-0 mx-auto">
            {image.description}
          </p>
        </div>

        <div className="flex justify-center gap-3 pb-6 md:hidden">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous image"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white"
          >
            <ChevronLeft size={18} strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next image"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white"
          >
            <ChevronRight size={18} strokeWidth={1.5} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

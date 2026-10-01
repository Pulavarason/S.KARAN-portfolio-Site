import type { Metadata } from "next";
import GalleryGrid from "@/components/GalleryGrid";
import Reveal from "@/components/Reveal";
import { galleryImages } from "@/data/gallery";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Gallery",
  description: site.seo.description,
};

export default function GalleryPage() {
  return (
    <div className="relative overflow-x-clip pt-32">
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-10 h-[30rem] w-[30rem] rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at center, #3a2c6b 0%, #1a1530 45%, transparent 70%)",
        }}
      />

      <header className="section-pad relative mb-12 md:mb-16">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal>
              <h1
                className="font-display leading-none text-[var(--text)]"
                style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
              >
                Gallery
              </h1>
            </Reveal>
            <Reveal delay={0.1} className="mt-4 max-w-md">
              <p className="font-sans text-sm leading-relaxed text-[var(--text-muted)]">
                A selection of frames. Choose a category, or open any image to
                view it full screen.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <p className="font-display text-2xl text-[var(--text)]">
              {String(galleryImages.length).padStart(2, "0")}
              <span className="ml-2 font-sans text-sm text-[var(--text-muted)]">
                images
              </span>
            </p>
          </Reveal>
        </div>
      </header>

      <GalleryGrid />
      <div className="h-20" />
    </div>
  );
}
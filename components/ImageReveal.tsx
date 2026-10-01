"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type ImageRevealProps = {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  zoom?: boolean;
  className?: string;
  wrapperClassName?: string;
};

export default function ImageReveal({
  src,
  alt,
  sizes = "100vw",
  priority = false,
  zoom = true,
  className = "",
  wrapperClassName = "",
}: ImageRevealProps) {
  return (
    <motion.div
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "-5% 0px -5% 0px" }}
      transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
      className={`group relative overflow-hidden bg-[var(--bg-soft)] ${wrapperClassName}`}
    >
      <motion.div
        initial={{ scale: 1.15 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
        className="h-full w-full"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`object-cover transition-transform duration-[1200ms] ease-cinematic ${
            zoom ? "group-hover:scale-[1.06]" : ""
          } ${className}`}
        />
      </motion.div>
    </motion.div>
  );
}

"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MouseEvent, useRef } from "react";

type MagneticButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline" | "text";
  className?: string;
};

export default function MagneticButton({
  href,
  children,
  variant = "outline",
  className = "",
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.2 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.2 });

  function handleMouseMove(e: MouseEvent<HTMLAnchorElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set(relX * 0.35);
    y.set(relY * 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const base =
    "group inline-flex items-center gap-3 font-sans text-xs uppercase tracking-widest2 transition-colors duration-500";

  const variants: Record<string, string> = {
    solid:
      "rounded-full bg-[var(--text)] px-8 py-4 text-[var(--bg)] hover:opacity-85",
    outline:
      "rounded-full border border-[var(--line)] px-8 py-4 text-[var(--text)] hover:border-[var(--text)]",
    text: "text-[var(--text)] hover:text-[var(--text-muted)]",
  };

  return (
    <motion.span
      style={{ x: springX, y: springY }}
      className="inline-block"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        ref={ref}
        href={href}
        data-cursor="view"
        className={`${base} ${variants[variant]} ${className}`}
      >
        {children}
        <ArrowRight
          size={14}
          strokeWidth={1.5}
          className="transition-transform duration-500 group-hover:translate-x-1"
        />
      </Link>
    </motion.span>
  );
}

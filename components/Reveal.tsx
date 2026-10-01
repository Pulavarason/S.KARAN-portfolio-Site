"use client";

import { motion } from "framer-motion";

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "span";
  once?: boolean;
};

export default function Reveal({
  children,
  delay = 0,
  y = 24,
  className = "",
  once = true,
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.65, 0, 0.35, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

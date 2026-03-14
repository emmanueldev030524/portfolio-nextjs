"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

interface ScrollParallaxProps {
  children: React.ReactNode;
  className?: string;
}

export function ScrollParallax({ children, className }: ScrollParallaxProps) {
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 80]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.95]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.6]);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div style={{ y, scale, opacity }} className={className}>
      {children}
    </motion.div>
  );
}

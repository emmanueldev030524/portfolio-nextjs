"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface AnimatedGradientTextProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}

export function AnimatedGradientText({
  children,
  className,
  animate = true,
}: AnimatedGradientTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = animate && !prefersReducedMotion;

  return (
    <motion.span
      className={cn(
        "bg-gradient-to-r from-cyan-600 via-cyan-500 to-cyan-600 bg-clip-text text-transparent dark:from-cyan-400 dark:via-white dark:to-cyan-400",
        className
      )}
      style={{
        backgroundSize: "200% 100%",
      }}
      animate={
        shouldAnimate
          ? { backgroundPosition: ["200% 0%", "0% 0%"] }
          : undefined
      }
      transition={
        shouldAnimate
          ? { duration: 3, repeat: Infinity, ease: "linear" }
          : undefined
      }
    >
      {children}
    </motion.span>
  );
}

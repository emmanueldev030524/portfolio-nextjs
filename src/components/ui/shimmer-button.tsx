"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface ShimmerButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
}

export function ShimmerButton({
  children,
  className,
  onClick,
  href,
}: ShimmerButtonProps) {
  const prefersReducedMotion = useReducedMotion();

  const content = (
    <motion.span
      className={cn(
        "relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-300 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_20px_-5px_rgba(34,211,238,0.3)] dark:shadow-[0_0_20px_-5px_rgba(34,211,238,0.4)] cursor-pointer",
        className
      )}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 0 30px -5px rgba(34,211,238,0.5)",
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Shimmer sweep */}
      {!prefersReducedMotion && (
        <motion.span
          className="pointer-events-none absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent"
          style={{ width: "50%" }}
          animate={{ x: ["-150%", "350%"] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeInOut",
          }}
        />
      )}
      <span className="relative z-10 flex items-center gap-2">
        {children}
        <ArrowRight className="size-4" />
      </span>
    </motion.span>
  );

  if (href) {
    return (
      <a href={href} onClick={onClick}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick}>
      {content}
    </button>
  );
}

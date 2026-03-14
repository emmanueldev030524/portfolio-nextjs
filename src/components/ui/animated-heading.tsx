"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface AnimatedHeadingProps {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
}

export function AnimatedHeading({
  children,
  className,
  as: Tag = "h2",
}: AnimatedHeadingProps) {
  const prefersReducedMotion = useReducedMotion();
  const MotionTag = motion.create(Tag);

  if (prefersReducedMotion) {
    return <Tag className={cn("text-2xl font-bold font-heading", className)}>{children}</Tag>;
  }

  return (
    <MotionTag
      initial={{ opacity: 0, x: -20, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn("text-2xl font-bold font-heading", className)}
    >
      {children}
    </MotionTag>
  );
}

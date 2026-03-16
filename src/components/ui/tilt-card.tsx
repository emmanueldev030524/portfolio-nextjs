"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  tiltDegree?: number;
  perspective?: number;
}

export function TiltCard({
  children,
  className,
  tiltDegree = 6,
  perspective = 800,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { stiffness: 200, damping: 20 };
  const rotateX = useSpring(
    useTransform(mouseY, [0, 1], [tiltDegree, -tiltDegree]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(mouseX, [0, 1], [-tiltDegree, tiltDegree]),
    springConfig
  );

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  function handleMouseMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }

  function handleMouseLeave() {
    mouseX.set(0.5);
    mouseY.set(0.5);
    setIsHovered(false);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ translateY: -4 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className={cn("relative", className)}
    >
      {/* Gradient border overlay */}
      <div
        className={cn(
          "pointer-events-none absolute -inset-[1px] rounded-xl bg-gradient-to-br from-cyan-400/0 via-transparent to-cyan-200/0 dark:to-white/0 opacity-0 transition-opacity duration-300",
          isHovered && "from-cyan-400/40 to-cyan-200/30 dark:to-white/30 opacity-100"
        )}
        style={{ zIndex: 0 }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

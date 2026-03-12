/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useSyncExternalStore } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
} from "motion/react";
import { cn } from "@/lib/utils";

function useReducedMotion() {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

export function FlippingImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const progress = useMotionValue(0);
  const rotation = useMotionValue(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const controls = animate(progress, [0, 1, 1, 0], {
      duration: 4,
      ease: "easeInOut",
      repeat: Infinity,
      times: [0, 0.35, 0.5, 0.85],
    });
    const spin = animate(rotation, 360, {
      duration: 20,
      ease: "linear",
      repeat: Infinity,
    });
    return () => { controls.stop(); spin.stop(); };
  }, [progress, rotation, reducedMotion]);

  const barLeft = useTransform(progress, (v) => `${v * 100}%`);
  const clipPath = useTransform(progress, (v) => {
    if (progress.getVelocity() >= 0) {
      return `inset(0 ${(1 - v) * 100}% 0 0)`;
    }
    return `inset(0 0 0 ${(1 - v) * 100}%)`;
  });

  return (
    <div className={cn("relative aspect-square", className)}>
      {/* Subtle rotating dashed ring */}
      <div className="absolute -inset-4 rounded-full bg-muted-foreground/5" />
      <motion.div
        className="absolute -inset-4 border border-dashed border-muted-foreground/20 rounded-full"
        style={{ rotate: rotation }}
      />

      {/* Image container */}
      <div className="relative size-full overflow-hidden rounded-full shadow-2xl ring-4 ring-muted">
        {/* Base: grayscale image */}
        <img
          src={src}
          alt={alt}
          className="block w-full h-full object-cover grayscale"
        />

        {/* Overlay: color image — clip derived from same motion value as bar */}
        <motion.div className="absolute inset-0" style={{ clipPath }}>
          <img
            src={src}
            alt=""
            className="block w-full h-full object-cover"
            aria-hidden
          />
        </motion.div>

        {/* Sweeping bar line — position derived from same motion value */}
        <motion.div
          className="absolute top-0 bottom-0 w-0.5 bg-cyan-400 shadow-[0_0_8px_2px_rgba(34,211,238,0.4)]"
          style={{ left: barLeft }}
        />
      </div>
    </div>
  );
}

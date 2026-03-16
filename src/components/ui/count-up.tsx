"use client";

import { useEffect, useRef, useState } from "react";
import {
  useInView,
  useMotionValue,
  useReducedMotion,
  animate,
} from "motion/react";

interface CountUpProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export function CountUp({
  target,
  suffix = "",
  prefix = "",
  duration = 2,
  className,
}: CountUpProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const prefersReducedMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(target);
  const hasAnimated = useRef(false);
  const motionValue = useMotionValue(0);

  useEffect(() => {
    if (!isInView || prefersReducedMotion || hasAnimated.current) return;
    hasAnimated.current = true;

    setDisplayValue(0);

    const unsubscribe = motionValue.on("change", (v) => {
      setDisplayValue(Math.round(v));
    });

    const controls = animate(motionValue, target, {
      duration,
      ease: "easeOut",
    });

    return () => {
      unsubscribe();
      controls.stop();
    };
  }, [isInView, target, duration, prefersReducedMotion, motionValue]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}

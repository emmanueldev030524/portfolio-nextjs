"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { ChevronDown } from "lucide-react";

export function ScrollIndicator({ targetId }: { targetId: string }) {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);

  return (
    <motion.button
      onClick={() =>
        document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" })
      }
      className="flex flex-col items-center gap-1 text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors cursor-pointer"
      style={{ opacity }}
      aria-label="Scroll to content"
    >
      <span className="text-[10px] font-mono tracking-[0.2em] uppercase">
        Scroll
      </span>
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="size-4" />
      </motion.div>
    </motion.button>
  );
}

"use client";

import { useState } from "react";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "motion/react";
import { ArrowUp } from "lucide-react";

const SCROLL_THRESHOLD = 300;

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > SCROLL_THRESHOLD);
  });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-20 right-4 z-30 flex size-10 items-center justify-center rounded-full border border-border bg-card shadow-[0_0_10px_3px] shadow-primary/5 backdrop-blur-xl transition-colors hover:bg-accent/50"
          aria-label="Scroll to top"
        >
          <ArrowUp className="size-4 text-foreground/70" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

const NAME = "EMMANUEL";
const LETTERS = NAME.split("");

export function SplashScreen() {
  const prefersReducedMotion = useReducedMotion();
  const [show, setShow] = useState<boolean | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) {
      setShow(false);
      return;
    }
    const alreadyShown = sessionStorage.getItem("splashShown");
    if (alreadyShown) {
      setShow(false);
    } else {
      setShow(true);
      sessionStorage.setItem("splashShown", "1");
    }
  }, [prefersReducedMotion]);

  // Don't render anything until we know whether to show
  if (show === null) {
    return (
      <div className="fixed inset-0 z-[200] bg-background" />
    );
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[200] bg-background flex items-center justify-center overflow-hidden"
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          onAnimationComplete={(definition) => {
            if (definition === "exit") setShow(false);
          }}
        >
          <div className="relative">
            {/* Base text layer (foreground color) */}
            <div className="flex" aria-hidden="true">
              {LETTERS.map((letter, i) => (
                <motion.span
                  key={i}
                  className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter font-heading text-foreground inline-block"
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.06,
                    ease: [0.21, 0.47, 0.32, 0.98],
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Cyan overlay text (clip-path reveal) */}
            <motion.div
              className="absolute inset-0 flex"
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{
                duration: 0.8,
                delay: 0.6,
                ease: [0.76, 0, 0.24, 1],
              }}
              onAnimationComplete={() => {
                setTimeout(() => setShow(false), 400);
              }}
            >
              {LETTERS.map((letter, i) => (
                <span
                  key={i}
                  className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter font-heading text-cyan-500 dark:text-cyan-400 inline-block"
                >
                  {letter}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useMotionValue,
  useTransform,
  animate,
} from "motion/react";

const NAME = "Emmanuel Jumel Gallardo";
const LETTERS = NAME.split("");

const EASE_OUT_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1];
const EASE_EXIT: [number, number, number, number] = [0.76, 0, 0.24, 1];

const TOTAL_SEGMENTS = 20;

export function SplashScreen() {
  const prefersReducedMotion = useReducedMotion();
  const [show, setShow] = useState<boolean | null>(null);
  const [displayPercent, setDisplayPercent] = useState(0);
  const [filled, setFilled] = useState(0);
  const [flickerMap, setFlickerMap] = useState<boolean[]>(
    () => Array(TOTAL_SEGMENTS).fill(false)
  );

  const progress = useMotionValue(0);

  const maskImage = useTransform(progress, (v: number) => {
    const soft = 3;
    return `linear-gradient(to right, white ${Math.max(0, v - soft)}%, white ${v}%, transparent ${Math.min(100, v + soft)}%, transparent 100%)`;
  });

  const scanPos = useTransform(progress, [0, 100], [0, 100]);
  const scanGradient = useTransform(scanPos, (v: number) => {
    return `linear-gradient(to right, transparent ${Math.max(0, v - 8)}%, oklch(0.75 0.15 195 / 0.4) ${Math.max(0, v - 3)}%, oklch(0.85 0.18 195 / 0.7) ${v}%, oklch(0.75 0.15 195 / 0.4) ${Math.min(100, v + 3)}%, transparent ${Math.min(100, v + 8)}%)`;
  });

  const [statusBlink, setStatusBlink] = useState(true);

  const animRef = useRef<ReturnType<typeof animate> | null>(null);
  const flickerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const blinkRef = useRef<ReturnType<typeof setInterval> | null>(null);

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

  const filledRef = useRef(0);

  const startFlicker = useCallback((currentFilled: number) => {
    if (flickerRef.current) clearInterval(flickerRef.current);

    flickerRef.current = setInterval(() => {
      setFlickerMap(() => {
        const next = Array(TOTAL_SEGMENTS).fill(false);
        for (let i = 0; i < TOTAL_SEGMENTS; i++) {
          if (i < currentFilled) {
            // Filled segments stay bright, only the leading one glitches
            next[i] = i === currentFilled - 1 ? Math.random() > 0.3 : true;
          } else if (i === currentFilled && currentFilled < TOTAL_SEGMENTS) {
            next[i] = Math.random() > 0.5;
          }
        }
        return next;
      });
    }, 60);
  }, []);

  useEffect(() => {
    if (show !== true) return;

    const unsubscribe = progress.on("change", (v) => {
      const pct = Math.round(v);
      setDisplayPercent(pct);
      const newFilled = Math.round((v / 100) * TOTAL_SEGMENTS);
      if (newFilled !== filledRef.current) {
        filledRef.current = newFilled;
        setFilled(newFilled);
        startFlicker(newFilled);
      }
    });

    blinkRef.current = setInterval(() => {
      setStatusBlink((prev) => !prev);
    }, 500);

    animRef.current = animate(progress, 100, {
      duration: 1.8,
      delay: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
      onComplete: () => {
        if (flickerRef.current) clearInterval(flickerRef.current);
        if (blinkRef.current) clearInterval(blinkRef.current);
        setFlickerMap(Array(TOTAL_SEGMENTS).fill(true));
        setStatusBlink(true);
        setTimeout(() => setShow(false), 300);
      },
    });

    return () => {
      unsubscribe();
      animRef.current?.stop();
      if (flickerRef.current) clearInterval(flickerRef.current);
      if (blinkRef.current) clearInterval(blinkRef.current);
    };
  }, [show, progress, startFlicker]);

  if (show === null) {
    return <div className="fixed inset-0 z-[200] bg-background" />;
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[200] bg-background flex flex-col items-center justify-center overflow-hidden"
          exit={{
            y: "-100%",
            opacity: 0,
            scale: 0.97,
            filter: "blur(6px)",
          }}
          transition={{ duration: 0.5, ease: EASE_EXIT }}
        >
          {/* Center content */}
          <div className="flex flex-col items-center gap-6">
            {/* Top divider */}
            <motion.div
              className="h-px w-[70%] max-w-xl bg-border/40"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.3, ease: EASE_OUT_EXPO }}
              style={{ transformOrigin: "center" }}
            />

            {/* Name container */}
            <div className="relative select-none" aria-label="Emmanuel Jumel Gallardo">
              {/* Layer 1: Dim text — letter stagger */}
              <span className="block splash-name-size font-bold tracking-tighter font-heading whitespace-nowrap">
                {LETTERS.map((letter, i) => (
                  <motion.span
                    key={i}
                    className="inline-block text-muted-foreground/20"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.25,
                      delay: 0.1 + i * 0.025,
                      ease: "easeOut",
                    }}
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </motion.span>
                ))}
              </span>

              {/* Layer 2: Cyan text with soft gradient mask */}
              <motion.span
                className="absolute inset-0 block splash-name-size font-bold tracking-tighter font-heading text-cyan-500 dark:text-cyan-400 whitespace-nowrap"
                style={{
                  WebkitMaskImage: maskImage,
                  maskImage: maskImage,
                }}
                aria-hidden="true"
              >
                {NAME}
              </motion.span>
            </div>

            {/* Bottom divider */}
            <motion.div
              className="h-px w-[70%] max-w-xl bg-border/40"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.4, ease: EASE_OUT_EXPO }}
              style={{ transformOrigin: "center" }}
            />

            {/* Tagline */}
            <motion.p
              className="text-xs sm:text-sm font-sans tracking-[0.3em] uppercase text-muted-foreground/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.6, ease: "easeOut" }}
            >
              Web Development &amp; Automation
            </motion.p>
          </div>

          {/* Progress section — HUD gauge */}
          <div className="absolute bottom-12 sm:bottom-16 flex flex-col items-center w-full px-8">
            <div className="relative w-full max-w-md">
              {/* Outer frame with crosshatch grid background */}
              <div
                className="relative border border-cyan-500/20 dark:border-cyan-400/20 px-4 py-3"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, oklch(0.75 0.15 195 / 0.04) 1px, transparent 1px),
                    linear-gradient(to bottom, oklch(0.75 0.15 195 / 0.04) 1px, transparent 1px)
                  `,
                  backgroundSize: "8px 8px",
                }}
              >
                {/* Corner brackets — larger L-shapes */}
                {/* Top-left */}
                <div className="absolute -top-px -left-px w-6 h-px bg-cyan-500 dark:bg-cyan-400" />
                <div className="absolute -top-px -left-px w-px h-6 bg-cyan-500 dark:bg-cyan-400" />
                {/* Top-right */}
                <div className="absolute -top-px -right-px w-6 h-px bg-cyan-500 dark:bg-cyan-400" />
                <div className="absolute -top-px -right-px w-px h-6 bg-cyan-500 dark:bg-cyan-400" />
                {/* Bottom-left */}
                <div className="absolute -bottom-px -left-px w-6 h-px bg-cyan-500 dark:bg-cyan-400" />
                <div className="absolute -bottom-px -left-px w-px h-6 bg-cyan-500 dark:bg-cyan-400" />
                {/* Bottom-right */}
                <div className="absolute -bottom-px -right-px w-6 h-px bg-cyan-500 dark:bg-cyan-400" />
                <div className="absolute -bottom-px -right-px w-px h-6 bg-cyan-500 dark:bg-cyan-400" />

                {/* Top row: blinking status dot + label + percentage */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div
                      className={
                        "size-1.5 rounded-full transition-opacity duration-150 " +
                        (statusBlink
                          ? "bg-cyan-500 dark:bg-cyan-400 opacity-100"
                          : "bg-cyan-500 dark:bg-cyan-400 opacity-20")
                      }
                      style={
                        statusBlink
                          ? {
                              boxShadow:
                                "0 0 4px oklch(0.75 0.15 195 / 0.8), 0 0 8px oklch(0.75 0.15 195 / 0.3)",
                            }
                          : undefined
                      }
                    />
                    <span className="text-[10px] font-mono text-cyan-500/70 dark:text-cyan-400/70 tracking-[0.2em] uppercase">
                      Sys.Init
                    </span>
                  </div>
                  <span className="text-xs font-mono text-cyan-500 dark:text-cyan-400 tabular-nums tracking-wider">
                    {String(displayPercent).padStart(3, "0")}
                    <span className="text-cyan-500/40 dark:text-cyan-400/40">%</span>
                  </span>
                </div>

                {/* Segmented bar with scan line overlay */}
                <div className="relative">
                  {/* Glow bleed behind filled segments */}
                  <div
                    className="absolute inset-0 rounded-sm"
                    style={{
                      width: `${(filled / TOTAL_SEGMENTS) * 100}%`,
                      boxShadow:
                        filled > 0
                          ? "0 0 12px oklch(0.75 0.15 195 / 0.25), 0 0 24px oklch(0.75 0.15 195 / 0.1)"
                          : "none",
                      background:
                        filled > 0
                          ? "oklch(0.75 0.15 195 / 0.08)"
                          : "transparent",
                    }}
                  />

                  {/* Segments */}
                  <div className="relative flex gap-[3px]">
                    {Array.from({ length: TOTAL_SEGMENTS }, (_, i) => {
                      const isOn = flickerMap[i];
                      const isLeading = i === filled - 1 && filled > 0;
                      return (
                        <div
                          key={i}
                          className={
                            "h-2 flex-1 rounded-[1px] transition-colors duration-75 " +
                            (isOn
                              ? "bg-cyan-500 dark:bg-cyan-400"
                              : i < filled
                                ? "bg-cyan-500/60 dark:bg-cyan-400/60"
                                : "bg-cyan-500/10 dark:bg-cyan-400/10")
                          }
                          style={
                            isLeading
                              ? {
                                  boxShadow:
                                    "0 0 6px oklch(0.75 0.15 195 / 0.7), 0 0 14px oklch(0.75 0.15 195 / 0.3), 0 0 2px oklch(0.85 0.18 195 / 0.9)",
                                }
                              : undefined
                          }
                        />
                      );
                    })}
                  </div>

                  {/* Scan line overlay */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none rounded-sm"
                    style={{ background: scanGradient }}
                  />
                </div>

                {/* Bottom decorative row */}
                <div className="flex items-center gap-2 mt-3">
                  <div className="h-px flex-1 bg-cyan-500/15 dark:bg-cyan-400/15" />
                  <div className="flex gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="size-1 bg-cyan-500/30 dark:bg-cyan-400/30"
                      />
                    ))}
                  </div>
                  <div className="h-px flex-1 bg-cyan-500/15 dark:bg-cyan-400/15" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

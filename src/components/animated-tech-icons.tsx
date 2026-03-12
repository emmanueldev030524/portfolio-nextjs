"use client";
import { useEffect, useRef, useSyncExternalStore } from "react";
import { animate, useInView } from "motion/react";
import { getTechIcon } from "@/lib/tech-icon-map";

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

export function AnimatedTechIcons({ tags }: { tags: readonly string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: false, margin: "-50px" });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!inView || !containerRef.current || reducedMotion) return;

    const icons = containerRef.current.querySelectorAll("[data-tech-icon]");
    if (icons.length === 0) return;

    let cancelled = false;

    async function runLoop() {
      while (!cancelled) {
        for (let i = 0; i < icons.length; i++) {
          if (cancelled) return;
          await animate(
            icons[i],
            { scale: [1, 1.15, 1], y: [0, -4, 0] },
            { duration: 0.4, ease: "easeInOut" }
          );
        }
        await new Promise((r) => setTimeout(r, 1500));
      }
    }

    runLoop();
    return () => {
      cancelled = true;
    };
  }, [inView, reducedMotion]);

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center gap-1.5 pt-5 pb-3 px-3"
    >
      {tags.map((tag) => {
        const { Icon, letter } = getTechIcon(tag);
        return (
          <div
            key={tag}
            data-tech-icon
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted/60 ring-1 ring-border/30"
          >
            {Icon ? (
              <Icon className="size-4" />
            ) : (
              <span className="text-xs font-semibold text-muted-foreground">
                {letter}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

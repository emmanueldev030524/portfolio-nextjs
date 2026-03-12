"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { DATA } from "@/data/resume";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

function CompanyLogo({ src, alt }: { src: string; alt: string }) {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div className="flex size-10 items-center justify-center rounded-full bg-muted text-xs font-bold text-white">
        {alt.charAt(0)}
      </div>
    );
  }

  return (
    <div className="flex size-14 shrink-0 items-center justify-center rounded-full border border-border/40 bg-white dark:bg-white/90 p-0.5">
      <Image
        src={src}
        alt={alt}
        width={56}
        height={56}
        className="size-full object-contain"
        onError={() => setError(true)}
      />
    </div>
  );
}

export default function WorkSection() {
  const [active, setActive] = useState(0);
  const activeWork = DATA.work[active];
  const totalTabs = DATA.work.length;
  const beamPercent = ((active + 1) / totalTabs) * 100;

  return (
    <div className="relative flex flex-col gap-6 md:flex-row md:gap-16">
      {/* Left: Company tabs */}
      <div className="relative flex flex-row gap-1 md:flex-col md:gap-1 overflow-x-auto md:overflow-visible pb-2 md:pb-0 md:shrink-0">
        {/* Beam — scoped to tab list height */}
        <div className="absolute left-[2.5rem] top-0 bottom-0 w-[2px] hidden md:block">
          <div className="absolute inset-0 bg-border/10 rounded-full" />
          <motion.div
            animate={{ height: `${beamPercent}%` }}
            transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] rounded-full bg-foreground/20"
          />
        </div>
        {DATA.work.map((work, index) => (
          <button
            key={work.company}
            onClick={() => setActive(index)}
            className={cn(
              "relative flex items-center gap-3 rounded-lg px-3 py-3 text-left text-base cursor-pointer whitespace-nowrap transition-colors",
              active === index
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {active === index && (
              <motion.div
                layoutId="activeWork"
                className="absolute inset-0 rounded-lg bg-muted"
                transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-3">
              <CompanyLogo src={work.logoUrl} alt={work.company} />
              <span className="font-medium text-base">{work.company}</span>
            </span>
          </button>
        ))}
      </div>

      {/* Right: Details panel */}
      <div className="flex-1 min-h-[260px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-4"
          >
            <div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight font-heading break-words">
                {activeWork.title}{" "}
                <span className="text-cyan-400">@ {activeWork.company}</span>
              </h3>
              <p className="text-base tabular-nums text-muted-foreground mt-1">
                {activeWork.start} - {activeWork.end ?? "Present"}
              </p>
              <p className="text-base text-muted-foreground">
                {activeWork.location}
              </p>
            </div>

            {"highlights" in activeWork &&
              (activeWork as { highlights: readonly string[] }).highlights && (
                <div className="flex flex-col gap-3 mt-2">
                  {(
                    activeWork as { highlights: readonly string[] }
                  ).highlights.map((highlight: string, i: number) => (
                    <motion.div
                      key={highlight}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08, duration: 0.25 }}
                      className="flex items-start gap-3"
                    >
                      <Check className="mt-1 size-4 shrink-0 text-cyan-400" />
                      <span className="text-base text-muted-foreground leading-relaxed">
                        {highlight}
                      </span>
                    </motion.div>
                  ))}
                </div>
              )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

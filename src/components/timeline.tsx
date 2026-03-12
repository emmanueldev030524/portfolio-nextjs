"use client";
import { ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "motion/react";

type Orientation = "vertical" | "horizontal";

export interface TimelineItemProps {
  children: ReactNode;
  className?: string;
}

export interface TimelineProps {
  children: ReactNode;
  className?: string;
  orientation?: Orientation;
}

export interface TimelineConnectItemProps {
  children: ReactNode;
  className?: string;
}

export function TimelineConnectItem({
  children,
  className,
}: TimelineConnectItemProps) {
  return (
    <div
      className={cn(
        "relative flex shrink-0 justify-center items-center self-stretch",
        className
      )}
    >
      <div
        data-timeline-line
        className={cn(
          "absolute bg-border/30",
          "group-data-[orientation=vertical]:left-1/2 group-data-[orientation=vertical]:-translate-x-1/2",
          "group-data-[orientation=vertical]:top-0 group-data-[orientation=vertical]:h-[calc(50%+var(--timeline-gap)+50%)]",
          "group-data-[orientation=vertical]:w-px",
          "group-data-[orientation=horizontal]:top-1/2 group-data-[orientation=horizontal]:-translate-y-1/2",
          "group-data-[orientation=horizontal]:left-1/2 group-data-[orientation=horizontal]:w-[calc(50%+var(--timeline-gap)+50%)]",
          "group-data-[orientation=horizontal]:h-px"
        )}
      />
      <div className="relative z-20 shrink-0">{children}</div>
    </div>
  );
}

export function TimelineItem({ children, className }: TimelineItemProps) {
  return (
    <div className={cn("relative", className)}>
      {children}
    </div>
  );
}

export function Timeline({
  children,
  className,
  orientation = "vertical",
}: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 50%"],
  });

  const beamHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div
      ref={containerRef}
      data-orientation={orientation}
      className={cn(
        "group relative [--timeline-gap:2rem]",
        orientation === "vertical" && "flex flex-col gap-4 p-4 w-full",
        orientation === "horizontal" && "flex flex-row gap-4 p-4 h-full",
        className
      )}
    >
      {/* Rainbow scroll beam - aligned to the left with timeline dots */}
      {orientation === "vertical" && (
        <div className="absolute left-[2.19rem] top-4 bottom-4 w-[2px] -translate-x-1/2">
          <div className="absolute inset-0 bg-border/20 rounded-full" />
          <motion.div
            style={{ height: beamHeight }}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] rounded-full"
          >
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "linear-gradient(to bottom, #ff0080, #ff00ff, #8b5cf6, #3b82f6, #06b6d4, #10b981, #eab308, #ef4444)",
              }}
            />
            <div
              className="absolute inset-0 rounded-full blur-[6px] opacity-70"
              style={{
                background:
                  "linear-gradient(to bottom, #ff0080, #ff00ff, #8b5cf6, #3b82f6, #06b6d4, #10b981, #eab308, #ef4444)",
              }}
            />
            <div
              className="absolute inset-0 rounded-full blur-[12px] opacity-40"
              style={{
                background:
                  "linear-gradient(to bottom, #ff0080, #ff00ff, #8b5cf6, #3b82f6, #06b6d4, #10b981, #eab308, #ef4444)",
              }}
            />
          </motion.div>
        </div>
      )}
      <div
        className={cn(
          "relative [&>*:last-child_[data-timeline-line]]:hidden",
          orientation === "vertical" && "space-y-8 w-full",
          orientation === "horizontal" && "flex flex-row gap-8 h-full"
        )}
      >
        {children}
      </div>
    </div>
  );
}

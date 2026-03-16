"use client";
import React, { useState, useEffect, useCallback } from "react";

import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { COLORS } from "@/constants/colors";
import { cn } from "@/lib/utils";

type Direction = "TOP" | "LEFT" | "BOTTOM" | "RIGHT";

function getMovingMap(glowColor: string, glowFade: string): Record<Direction, string> {
  return {
    TOP: `radial-gradient(20.7% 50% at 50% 0%, ${glowColor} 0%, ${glowFade} 100%)`,
    LEFT: `radial-gradient(16.6% 43.1% at 0% 50%, ${glowColor} 0%, ${glowFade} 100%)`,
    BOTTOM: `radial-gradient(20.7% 50% at 50% 100%, ${glowColor} 0%, ${glowFade} 100%)`,
    RIGHT: `radial-gradient(16.2% 41.2% at 100% 50%, ${glowColor} 0%, ${glowFade} 100%)`,
  };
}

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Tag = "button",
  duration = 1,
  clockwise = true,
  ...props
}: React.PropsWithChildren<
  {
    as?: React.ElementType;
    containerClassName?: string;
    className?: string;
    duration?: number;
    clockwise?: boolean;
  } & React.HTMLAttributes<HTMLElement> & React.ButtonHTMLAttributes<HTMLButtonElement>
>) {
  const [hovered, setHovered] = useState<boolean>(false);
  const [direction, setDirection] = useState<Direction>("TOP");
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const isDark = !mounted || resolvedTheme === "dark";

  const rotateDirection = useCallback((currentDirection: Direction): Direction => {
    const directions: Direction[] = ["TOP", "LEFT", "BOTTOM", "RIGHT"];
    const currentIndex = directions.indexOf(currentDirection);
    const nextIndex = clockwise
      ? (currentIndex - 1 + directions.length) % directions.length
      : (currentIndex + 1) % directions.length;
    return directions[nextIndex];
  }, [clockwise]);

  const glowColor = isDark ? COLORS.white.full : COLORS.cyan[500];
  const glowFade = isDark ? COLORS.white.fade : COLORS.cyan.fade;
  const movingMap = getMovingMap(glowColor, glowFade);

  const highlight =
    `radial-gradient(75% 181.15942028985506% at 50% 50%, ${COLORS.cyan[500]} 0%, ${COLORS.white.fade} 100%)`;

  useEffect(() => {
    if (!hovered) {
      const kickstart = setTimeout(() => {
        setDirection((prev) => rotateDirection(prev));
      }, 50);
      const interval = setInterval(() => {
        setDirection((prev) => rotateDirection(prev));
      }, duration * 1000);
      return () => {
        clearTimeout(kickstart);
        clearInterval(interval);
      };
    }
  }, [hovered, duration, rotateDirection, isDark]);

  return (
    <Tag
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "group/hbg relative flex rounded-full content-center items-center flex-col flex-nowrap gap-10 h-min justify-center overflow-visible p-[2px] decoration-clone w-fit cursor-pointer",
        "transition-[transform,box-shadow] duration-200 hover:scale-[1.02] hover:shadow-[0_0_20px_-5px_rgba(6,182,212,0.3)] active:scale-[0.98]",
        containerClassName
      )}
      {...props}
    >
      <div
        className={cn(
          "w-auto z-10 px-4 py-2 rounded-[inherit]",
          className
        )}
      >
        {children}
      </div>
      <motion.div
        key={`${isDark}`}
        className="flex-none inset-0 overflow-hidden absolute z-0 rounded-[inherit]"
        style={{
          filter: "blur(5px)",
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
        initial={{ background: movingMap[direction] }}
        animate={{
          background: hovered
            ? [movingMap[direction], highlight]
            : movingMap[direction],
        }}
        transition={{ ease: "linear", duration: duration ?? 1 }}
      />
    </Tag>
  );
}

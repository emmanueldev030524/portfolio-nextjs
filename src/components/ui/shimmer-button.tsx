"use client"

import React, { type CSSProperties } from "react"
import { cn } from "@/lib/utils"
import { ArrowUpRight } from "lucide-react"

interface ShimmerButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  href?: string
}

export function ShimmerButton({
  children,
  className,
  onClick,
  href,
}: ShimmerButtonProps) {
  const borderRadius = "calc(0.625rem + 4px)"

  const inner = (
    <span
      style={
        {
          "--spread": "120deg",
          "--shimmer-color": "#ffffff",
          "--radius": borderRadius,
          "--speed": "3s",
          "--cut": "0.08em",
          "--bg": "rgba(0, 0, 0, 1)",
        } as CSSProperties
      }
      className={cn(
        "group/shimmer relative z-0 inline-flex cursor-pointer items-center justify-center overflow-hidden [border-radius:var(--radius)] border-2 border-black px-5 py-2.5 text-sm font-semibold whitespace-nowrap text-white [background:var(--bg)]",
        "transform-gpu transition-[transform,box-shadow] duration-300 ease-in-out active:translate-y-px hover:scale-[1.02] active:scale-[0.98]",
        className
      )}
    >
      {/* spark container — dark mode only */}
      <div
        className={cn(
          "-z-30 blur-[3px]",
          "[container-type:size] absolute inset-0 overflow-visible",
          "block"
        )}
      >
        <div className="animate-shimmer-slide absolute inset-0 aspect-[1] h-[100cqh] rounded-none [mask:none]">
          <div className="animate-spin-around absolute -inset-full w-auto [translate:0_0] rotate-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))]" />
        </div>
      </div>

      {/* backdrop */}
      <div
        className="absolute inset-[var(--cut)] -z-20 [border-radius:var(--radius)] [background:var(--bg)]"
      />

      <span className="relative z-10 flex items-center gap-2">
        {children}
        <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </span>
  )

  if (href) {
    return (
      <a href={href} onClick={onClick} className="group">
        {inner}
      </a>
    )
  }

  return (
    <button type="button" onClick={onClick} className="group">
      {inner}
    </button>
  )
}

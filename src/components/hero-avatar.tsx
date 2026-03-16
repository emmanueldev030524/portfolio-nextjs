"use client";

import { useEffect, useState } from "react";
import { PixelatedCanvas } from "@/components/ui/pixelated-canvas";
import { COLORS } from "@/constants/colors";
import { DATA } from "@/data/resume";

const MOBILE_BREAKPOINT = 768;

export function HeroAvatar() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return (
    <PixelatedCanvas
      src={DATA.avatarUrl}
      width={224}
      height={224}
      cellSize={3}
      dotScale={0.85}
      shape="circle"
      backgroundColor={COLORS.dark.bg}
      backgroundColorLight={COLORS.dark.bgAlt}
      dropoutStrength={0}
      interactive
      distortionMode="repel"
      distortionStrength={3}
      distortionRadius={60}
      followSpeed={0.2}
      jitterStrength={2}
      jitterSpeed={3}
      tintStrength={0}
      fadeOnLeave
      fadeSpeed={0.08}
      objectFit="cover"
      objectPositionX={isMobile ? 0.65 : 0.5}
      objectPositionY={isMobile ? 0.5 : 0.4}
      zoom={isMobile ? 1.4 : 1.6}
    />
  );
}

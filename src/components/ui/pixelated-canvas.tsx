"use client";
import React from "react";
import {
  type PixelSample,
  type CanvasDims,
  parseHexOrRgb,
  computeObjectFitDimensions,
  computeSamples,
  drawDot,
} from "./pixelated-canvas-utils";

type PixelatedCanvasProps = {
  src: string;
  width?: number;
  height?: number;
  cellSize?: number;
  dotScale?: number;
  shape?: "circle" | "square";
  backgroundColor?: string;
  backgroundColorLight?: string;
  grayscale?: boolean;
  className?: string;
  responsive?: boolean;
  dropoutStrength?: number;
  interactive?: boolean;
  distortionStrength?: number;
  distortionRadius?: number;
  distortionMode?: "repel" | "attract" | "swirl";
  followSpeed?: number;
  sampleAverage?: boolean;
  tintColor?: string;
  tintStrength?: number;
  maxFps?: number;
  objectFit?: "cover" | "contain" | "fill" | "none";
  objectPositionX?: number;
  objectPositionY?: number;
  zoom?: number;
  jitterStrength?: number;
  jitterSpeed?: number;
  fadeOnLeave?: boolean;
  fadeSpeed?: number;
};

export const PixelatedCanvas: React.FC<PixelatedCanvasProps> = ({
  src,
  width = 400,
  height = 500,
  cellSize = 3,
  dotScale = 0.9,
  shape = "square",
  backgroundColor = "#000000",
  backgroundColorLight,
  grayscale = false,
  className,
  responsive = false,
  dropoutStrength = 0.4,
  interactive = true,
  distortionStrength = 3,
  distortionRadius = 80,
  distortionMode = "swirl",
  followSpeed = 0.2,
  sampleAverage = true,
  tintColor = "#FFFFFF",
  tintStrength = 0.2,
  maxFps = 60,
  objectFit = "cover",
  objectPositionX = 0.5,
  objectPositionY = 0.5,
  zoom = 1,
  jitterStrength = 4,
  jitterSpeed = 4,
  fadeOnLeave = true,
  fadeSpeed = 0.1,
}) => {
  const isDark = () =>
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark");

  const resolvedBg = React.useRef(backgroundColor);
  const getResolvedBg = React.useCallback(
    () => (backgroundColorLight && !isDark() ? backgroundColorLight : backgroundColor),
    [backgroundColorLight, backgroundColor],
  );

  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const samplesRef = React.useRef<PixelSample[]>([]);
  const dimsRef = React.useRef<CanvasDims | null>(null);
  const targetMouseRef = React.useRef({ x: -9999, y: -9999 });
  const animMouseRef = React.useRef({ x: -9999, y: -9999 });
  const rafRef = React.useRef<number | null>(null);
  const lastFrameRef = React.useRef(0);
  const pointerInsideRef = React.useRef(false);
  const activityRef = React.useRef(0);
  const activityTargetRef = React.useRef(0);
  const cleanupRef = React.useRef<(() => void) | null>(null);

  React.useEffect(() => {
    let isCancelled = false;
    const canvas = canvasRef.current;
    if (!canvas) return;

    resolvedBg.current = getResolvedBg();

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;

    const compute = () => {
      if (!canvas) return;
      resolvedBg.current = getResolvedBg();
      const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
      const displayWidth = width ?? img.naturalWidth;
      const displayHeight = height ?? img.naturalHeight;

      canvas.width = Math.max(1, Math.floor(displayWidth * dpr));
      canvas.height = Math.max(1, Math.floor(displayHeight * dpr));
      canvas.style.width = `${displayWidth}px`;
      canvas.style.height = `${displayHeight}px`;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.resetTransform();
      ctx.scale(dpr, dpr);

      clearCanvas(ctx, displayWidth, displayHeight);

      const offscreen = document.createElement("canvas");
      offscreen.width = Math.max(1, Math.floor(displayWidth));
      offscreen.height = Math.max(1, Math.floor(displayHeight));
      const off = offscreen.getContext("2d");
      if (!off) return;

      const iw = img.naturalWidth || displayWidth;
      const ih = img.naturalHeight || displayHeight;
      const { dw, dh, dx, dy } = computeObjectFitDimensions(
        displayWidth, displayHeight, iw, ih, objectFit, zoom, objectPositionX, objectPositionY,
      );
      off.drawImage(img, dx, dy, dw, dh);

      let imageData: ImageData;
      try {
        imageData = off.getImageData(0, 0, offscreen.width, offscreen.height);
      } catch {
        ctx.drawImage(img, 0, 0, displayWidth, displayHeight);
        return;
      }

      const effectiveDotSize = Math.max(1, Math.floor(cellSize * dotScale));
      dimsRef.current = { width: displayWidth, height: displayHeight, dot: effectiveDotSize };

      const tintRGB = tintColor && tintStrength > 0 ? parseHexOrRgb(tintColor) : null;
      samplesRef.current = computeSamples(
        imageData, offscreen.width, offscreen.height,
        cellSize, sampleAverage, grayscale, tintRGB, tintStrength, dropoutStrength,
      );
    };

    const clearCanvas = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
      if (resolvedBg.current) {
        ctx.fillStyle = resolvedBg.current;
        ctx.fillRect(0, 0, w, h);
      } else {
        ctx.clearRect(0, 0, w, h);
      }
    };

    const renderStatic = () => {
      const ctx = canvas.getContext("2d");
      const dims = dimsRef.current;
      const samples = samplesRef.current;
      if (!ctx || !dims || !samples) return;
      clearCanvas(ctx, dims.width, dims.height);
      for (const s of samples) {
        if (s.drop || s.a <= 0) continue;
        drawDot(ctx, s.x + cellSize / 2, s.y + cellSize / 2, s, dims.dot, shape);
      }
      ctx.globalAlpha = 1;
    };

    const startInteractive = (canvasEl: HTMLCanvasElement) => {
      const onPointerMove = (e: PointerEvent) => {
        const rect = canvasEl.getBoundingClientRect();
        targetMouseRef.current.x = e.clientX - rect.left;
        targetMouseRef.current.y = e.clientY - rect.top;
        pointerInsideRef.current = true;
        activityTargetRef.current = 1;
      };
      const onPointerEnter = () => {
        pointerInsideRef.current = true;
        activityTargetRef.current = 1;
      };
      const onPointerLeave = () => {
        pointerInsideRef.current = false;
        if (fadeOnLeave) {
          activityTargetRef.current = 0;
        } else {
          targetMouseRef.current = { x: -9999, y: -9999 };
        }
      };

      canvasEl.addEventListener("pointermove", onPointerMove);
      canvasEl.addEventListener("pointerenter", onPointerEnter);
      canvasEl.addEventListener("pointerleave", onPointerLeave);

      const animate = () => {
        const now = performance.now();
        if (now - lastFrameRef.current < 1000 / Math.max(1, maxFps)) {
          rafRef.current = requestAnimationFrame(animate);
          return;
        }
        lastFrameRef.current = now;

        const ctx = canvasEl.getContext("2d");
        const dims = dimsRef.current;
        const samples = samplesRef.current;
        if (!ctx || !dims || !samples) {
          rafRef.current = requestAnimationFrame(animate);
          return;
        }

        animMouseRef.current.x += (targetMouseRef.current.x - animMouseRef.current.x) * followSpeed;
        animMouseRef.current.y += (targetMouseRef.current.y - animMouseRef.current.y) * followSpeed;

        if (fadeOnLeave) {
          activityRef.current += (activityTargetRef.current - activityRef.current) * fadeSpeed;
        } else {
          activityRef.current = pointerInsideRef.current ? 1 : 0;
        }

        clearCanvas(ctx, dims.width, dims.height);

        const mx = animMouseRef.current.x;
        const my = animMouseRef.current.y;
        const sigma = Math.max(1, distortionRadius * 0.5);
        const t = now * 0.001 * jitterSpeed;
        const activity = Math.max(0, Math.min(1, activityRef.current));

        for (const s of samples) {
          if (s.drop || s.a <= 0) continue;
          let drawX = s.x + cellSize / 2;
          let drawY = s.y + cellSize / 2;
          const ddx = drawX - mx;
          const ddy = drawY - my;
          const dist2 = ddx * ddx + ddy * ddy;
          const influence = Math.exp(-dist2 / (2 * sigma * sigma)) * activity;

          if (influence > 0.0005) {
            ({ drawX, drawY } = applyDistortion(
              drawX, drawY, mx, my, ddx, ddy, dist2, influence,
              distortionMode, distortionStrength,
            ));
            if (jitterStrength > 0) {
              const k = s.seed * 43758.5453;
              drawX += Math.sin(t + k) * jitterStrength * influence;
              drawY += Math.cos(t + k * 1.13) * jitterStrength * influence;
            }
          }

          drawDot(ctx, drawX, drawY, s, dims.dot, shape);
        }
        ctx.globalAlpha = 1;
        rafRef.current = requestAnimationFrame(animate);
      };

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(animate);

      cleanupRef.current = () => {
        canvasEl.removeEventListener("pointermove", onPointerMove);
        canvasEl.removeEventListener("pointerenter", onPointerEnter);
        canvasEl.removeEventListener("pointerleave", onPointerLeave);
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
    };

    img.onload = () => {
      if (isCancelled) return;
      compute();
      const canvasEl = canvasRef.current;
      if (!canvasEl) return;

      if (!interactive) {
        renderStatic();
        return;
      }
      startInteractive(canvasEl);
    };

    img.onerror = () => {
      console.error("Failed to load image for PixelatedCanvas:", src);
    };

    const themeObserver = new MutationObserver(() => {
      const newBg = getResolvedBg();
      if (newBg !== resolvedBg.current) {
        resolvedBg.current = newBg;
        if (!interactive && img.complete && img.naturalWidth) {
          compute();
        }
      }
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    if (responsive) {
      const onResize = () => {
        if (img.complete && img.naturalWidth) compute();
      };
      window.addEventListener("resize", onResize);
      return () => {
        isCancelled = true;
        themeObserver.disconnect();
        window.removeEventListener("resize", onResize);
        cleanupRef.current?.();
      };
    }

    return () => {
      isCancelled = true;
      themeObserver.disconnect();
      cleanupRef.current?.();
    };
  }, [
    src, width, height, cellSize, dotScale, shape,
    backgroundColor, backgroundColorLight, getResolvedBg,
    grayscale, responsive, dropoutStrength, interactive,
    distortionStrength, distortionRadius, distortionMode,
    followSpeed, sampleAverage, tintColor, tintStrength,
    maxFps, objectFit, objectPositionX, objectPositionY,
    zoom, jitterStrength, jitterSpeed, fadeOnLeave, fadeSpeed,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-label="Pixelated rendering of source image"
      role="img"
    />
  );
};

function applyDistortion(
  drawX: number, drawY: number,
  mx: number, my: number,
  dx: number, dy: number,
  dist2: number, influence: number,
  mode: "repel" | "attract" | "swirl",
  strength: number,
) {
  if (mode === "repel") {
    const dist = Math.sqrt(dist2) + 0.0001;
    return {
      drawX: drawX + (dx / dist) * strength * influence,
      drawY: drawY + (dy / dist) * strength * influence,
    };
  }
  if (mode === "attract") {
    const dist = Math.sqrt(dist2) + 0.0001;
    return {
      drawX: drawX - (dx / dist) * strength * influence,
      drawY: drawY - (dy / dist) * strength * influence,
    };
  }
  // swirl
  const angle = strength * 0.05 * influence;
  return {
    drawX: mx + Math.cos(angle) * dx - Math.sin(angle) * dy,
    drawY: my + Math.sin(angle) * dx + Math.cos(angle) * dy,
  };
}

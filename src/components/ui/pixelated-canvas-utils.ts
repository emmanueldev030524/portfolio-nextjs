/** Pure utility functions for PixelatedCanvas — no React dependency */

export type PixelSample = {
  x: number;
  y: number;
  r: number;
  g: number;
  b: number;
  a: number;
  drop: boolean;
  seed: number;
};

export type CanvasDims = {
  width: number;
  height: number;
  dot: number;
};

export type ObjectFitMode = "cover" | "contain" | "fill" | "none";

export function parseHexOrRgb(c: string): [number, number, number] | null {
  if (c.startsWith("#")) {
    const hex = c.slice(1);
    if (hex.length === 3) {
      return [
        parseInt(hex[0] + hex[0], 16),
        parseInt(hex[1] + hex[1], 16),
        parseInt(hex[2] + hex[2], 16),
      ];
    }
    return [
      parseInt(hex.slice(0, 2), 16),
      parseInt(hex.slice(2, 4), 16),
      parseInt(hex.slice(4, 6), 16),
    ];
  }
  const m = c.match(/rgb\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)\)/i);
  if (m) return [parseInt(m[1], 10), parseInt(m[2], 10), parseInt(m[3], 10)];
  return null;
}

export function computeObjectFitDimensions(
  displayWidth: number,
  displayHeight: number,
  imgWidth: number,
  imgHeight: number,
  fit: ObjectFitMode,
  zoom: number,
  posX: number,
  posY: number,
): { dw: number; dh: number; dx: number; dy: number } {
  if (fit === "cover") {
    const scale = Math.max(displayWidth / imgWidth, displayHeight / imgHeight) * zoom;
    const dw = Math.ceil(imgWidth * scale);
    const dh = Math.ceil(imgHeight * scale);
    return {
      dw,
      dh,
      dx: Math.floor((displayWidth - dw) * posX),
      dy: Math.floor((displayHeight - dh) * posY),
    };
  }
  if (fit === "contain") {
    const scale = Math.min(displayWidth / imgWidth, displayHeight / imgHeight);
    const dw = Math.ceil(imgWidth * scale);
    const dh = Math.ceil(imgHeight * scale);
    return {
      dw,
      dh,
      dx: Math.floor((displayWidth - dw) / 2),
      dy: Math.floor((displayHeight - dh) / 2),
    };
  }
  if (fit === "fill") {
    return { dw: displayWidth, dh: displayHeight, dx: 0, dy: 0 };
  }
  // "none"
  return {
    dw: imgWidth,
    dh: imgHeight,
    dx: Math.floor((displayWidth - imgWidth) / 2),
    dy: Math.floor((displayHeight - imgHeight) / 2),
  };
}

function luminanceAt(data: Uint8ClampedArray, stride: number, w: number, h: number, px: number, py: number) {
  const ix = Math.max(0, Math.min(w - 1, px));
  const iy = Math.max(0, Math.min(h - 1, py));
  const i = iy * stride + ix * 4;
  return 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
}

function hash2D(ix: number, iy: number) {
  const s = Math.sin(ix * 12.9898 + iy * 78.233) * 43758.5453123;
  return s - Math.floor(s);
}

export function computeSamples(
  imageData: ImageData,
  canvasWidth: number,
  canvasHeight: number,
  cellSize: number,
  sampleAverage: boolean,
  grayscale: boolean,
  tintRGB: [number, number, number] | null,
  tintStrength: number,
  dropoutStrength: number,
): PixelSample[] {
  const data = imageData.data;
  const stride = canvasWidth * 4;
  const samples: PixelSample[] = [];

  for (let y = 0; y < canvasHeight; y += cellSize) {
    const cy = Math.min(canvasHeight - 1, y + Math.floor(cellSize / 2));
    for (let x = 0; x < canvasWidth; x += cellSize) {
      const cx = Math.min(canvasWidth - 1, x + Math.floor(cellSize / 2));
      let r = 0, g = 0, b = 0, a = 0;

      if (!sampleAverage) {
        const idx = cy * stride + cx * 4;
        r = data[idx];
        g = data[idx + 1];
        b = data[idx + 2];
        a = data[idx + 3] / 255;
      } else {
        let count = 0;
        for (let oy = -1; oy <= 1; oy++) {
          for (let ox = -1; ox <= 1; ox++) {
            const sx = Math.max(0, Math.min(canvasWidth - 1, cx + ox));
            const sy = Math.max(0, Math.min(canvasHeight - 1, cy + oy));
            const sIdx = sy * stride + sx * 4;
            r += data[sIdx];
            g += data[sIdx + 1];
            b += data[sIdx + 2];
            a += data[sIdx + 3] / 255;
            count++;
          }
        }
        r = Math.round(r / count);
        g = Math.round(g / count);
        b = Math.round(b / count);
        a = a / count;
      }

      if (grayscale) {
        const L = Math.round(0.2126 * r + 0.7152 * g + 0.0722 * b);
        r = L; g = L; b = L;
      } else if (tintRGB && tintStrength > 0) {
        const k = Math.max(0, Math.min(1, tintStrength));
        r = Math.round(r * (1 - k) + tintRGB[0] * k);
        g = Math.round(g * (1 - k) + tintRGB[1] * k);
        b = Math.round(b * (1 - k) + tintRGB[2] * k);
      }

      const Lc = luminanceAt(data, stride, canvasWidth, canvasHeight, cx, cy);
      const Lx1 = luminanceAt(data, stride, canvasWidth, canvasHeight, cx - 1, cy);
      const Lx2 = luminanceAt(data, stride, canvasWidth, canvasHeight, cx + 1, cy);
      const Ly1 = luminanceAt(data, stride, canvasWidth, canvasHeight, cx, cy - 1);
      const Ly2 = luminanceAt(data, stride, canvasWidth, canvasHeight, cx, cy + 1);
      const grad = Math.abs(Lx2 - Lx1) + Math.abs(Ly2 - Ly1) + Math.abs(Lc - (Lx1 + Lx2 + Ly1 + Ly2) / 4);
      const gradientNorm = Math.max(0, Math.min(1, grad / 255));
      const dropoutProb = Math.max(0, Math.min(1, (1 - gradientNorm) * dropoutStrength));
      const drop = hash2D(cx, cy) < dropoutProb;
      const seed = hash2D(cx, cy);

      samples.push({ x, y, r, g, b, a, drop, seed });
    }
  }

  return samples;
}

export function drawDot(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  sample: PixelSample,
  dotSize: number,
  shape: "circle" | "square",
) {
  ctx.globalAlpha = sample.a;
  ctx.fillStyle = `rgb(${sample.r}, ${sample.g}, ${sample.b})`;
  if (shape === "circle") {
    ctx.beginPath();
    ctx.arc(x, y, dotSize / 2, 0, Math.PI * 2);
    ctx.fill();
  } else {
    ctx.fillRect(x - dotSize / 2, y - dotSize / 2, dotSize, dotSize);
  }
}

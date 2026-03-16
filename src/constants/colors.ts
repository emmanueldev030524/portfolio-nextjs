/** Brand color constants — cyan + white palette */

export const COLORS = {
  cyan: {
    500: "#06b6d4",
    400: "#22d3ee",
    fade: "rgba(6, 182, 212, 0)",
  },
  white: {
    full: "hsl(0, 0%, 100%)",
    fade: "rgba(255, 255, 255, 0)",
  },
  dark: {
    bg: "#000000",
    bgAlt: "#1a1a1a",
  },
} as const;

export const TIMELINE_RAINBOW_GRADIENT =
  "linear-gradient(to bottom, #ff0080, #ff00ff, #8b5cf6, #3b82f6, #06b6d4, #10b981, #eab308, #ef4444)";

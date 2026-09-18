import React from "react";
import {
  AbsoluteFill,
  Img,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { C, FONT } from "./theme";

/** 快节奏：高刚度 + 低阻尼，落位干脆 */
const FAST = { damping: 13, mass: 0.5, stiffness: 180 };
const SMOOTH = { damping: 200, mass: 0.6, stiffness: 140 };

export const usePop = (delay = 0, cfg: Record<string, number> = FAST) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: f - delay, fps, config: cfg });
};

export const Rise: React.FC<{
  delay?: number;
  y?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ delay = 0, y = 34, children, style }) => {
  const p = usePop(delay);
  return (
    <div
      style={{ opacity: p, transform: `translateY(${(1 - p) * y}px)`, ...style }}
    >
      {children}
    </div>
  );
};

export const Slide: React.FC<{
  delay?: number;
  from?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ delay = 0, from = -70, children, style }) => {
  const p = usePop(delay, SMOOTH);
  return (
    <div
      style={{ opacity: p, transform: `translateX(${(1 - p) * from}px)`, ...style }}
    >
      {children}
    </div>
  );
};

export const Pop: React.FC<{
  delay?: number;
  from?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ delay = 0, from = 0.8, children, style }) => {
  const p = usePop(delay);
  return (
    <div style={{ opacity: p, transform: `scale(${from + (1 - from) * p})`, ...style }}>
      {children}
    </div>
  );
};

/** 蓝色光晕，慢呼吸 */
export const Glow: React.FC<{
  x?: number;
  y?: number;
  size?: number;
  intensity?: number;
}> = ({ x = 50, y = 45, size = 62, intensity = 1 }) => {
  const f = useCurrentFrame();
  const breathe = 0.82 + 0.18 * Math.sin(f / 26);
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(${size}% ${size * 0.8}% at ${x}% ${y}%, rgba(56,189,248,${
          0.2 * intensity * breathe
        }) 0%, rgba(56,189,248,0) 70%)`,
      }}
    />
  );
};

export const Shell: React.FC<{
  children: React.ReactNode;
  glowX?: number;
  glowY?: number;
  intensity?: number;
}> = ({ children, glowX = 50, glowY = 45, intensity = 1 }) => (
  <AbsoluteFill
    style={{ backgroundColor: C.bg, fontFamily: FONT, color: C.text }}
  >
    <Glow x={glowX} y={glowY} intensity={intensity} />
    {children}
  </AbsoluteFill>
);

export const Shot: React.FC<{
  src: string;
  height: number;
  style?: React.CSSProperties;
}> = ({ src, height, style }) => (
  <div
    style={{
      height,
      borderRadius: height * 0.055,
      overflow: "hidden",
      boxShadow:
        "0 44px 130px rgba(0,0,0,0.78), 0 0 0 1px rgba(125,211,252,0.24)",
      ...style,
    }}
  >
    <Img src={staticFile(src)} style={{ height: "100%", display: "block" }} />
  </div>
);

export const Kicker: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      fontSize: 24,
      fontWeight: 600,
      letterSpacing: 8,
      color: C.blue,
      textTransform: "uppercase",
    }}
  >
    {children}
  </div>
);

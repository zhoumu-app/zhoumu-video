import React from "react";
import { AbsoluteFill } from "remotion";

const SIZE = 1024;
const CX = SIZE / 2;
const CY = SIZE / 2;

/** 细的放射线：像光线在镜头里汇聚 */
const thinRays = Array.from({ length: 36 }, (_, i) => {
  const a = (i / 36) * Math.PI * 2;
  return {
    x1: CX + Math.cos(a) * 168,
    y1: CY + Math.sin(a) * 168,
    x2: CX + Math.cos(a) * 760,
    y2: CY + Math.sin(a) * 760,
  };
});

/** 几根更亮的主光线，制造"打光"的层次 */
const heroRays = [
  { x1: CX - 700, y1: CY - 210, x2: CX + 700, y2: CY + 250 },
  { x1: CX - 700, y1: CY + 250, x2: CX + 700, y2: CY - 210 },
  { x1: CX - 120, y1: CY - 720, x2: CX + 180, y2: CY + 720 },
  { x1: CX + 180, y1: CY - 720, x2: CX - 120, y2: CY + 720 },
];

export const Avatar: React.FC<{ clip?: boolean }> = ({ clip }) => (
  <AbsoluteFill
    style={{
      backgroundColor: "#03060E",
      justifyContent: "center",
      alignItems: "center",
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif',
      ...(clip ? { clipPath: "circle(50% at 50% 50%)" } : {}),
    }}
  >
    {/* 底色渐变 */}
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(180deg, #050A16 0%, #07182E 48%, #03060E 100%)",
      }}
    />

    {/* 中心蓝光 */}
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(58% 58% at 50% 47%, rgba(56,189,248,0.42) 0%, rgba(56,189,248,0.10) 45%, rgba(56,189,248,0) 74%)",
      }}
    />

    {/* 光线 */}
    <svg
      width={SIZE}
      height={SIZE}
      style={{ position: "absolute", top: 0, left: 0 }}
    >
      {thinRays.map((r, i) => (
        <line
          key={`t${i}`}
          x1={r.x1}
          y1={r.y1}
          x2={r.x2}
          y2={r.y2}
          stroke="#38BDF8"
          strokeWidth={2}
          opacity={0.16}
        />
      ))}
      {heroRays.map((r, i) => (
        <line
          key={`h${i}`}
          x1={r.x1}
          y1={r.y1}
          x2={r.x2}
          y2={r.y2}
          stroke="#7DD3FC"
          strokeWidth={5}
          opacity={0.34}
        />
      ))}
      {/* 结构环，圆形裁切后仍然好看 */}
      <circle
        cx={CX}
        cy={CY}
        r={452}
        fill="none"
        stroke="#38BDF8"
        strokeWidth={4}
        opacity={0.4}
      />
      <circle
        cx={CX}
        cy={CY}
        r={496}
        fill="none"
        stroke="#38BDF8"
        strokeWidth={2}
        opacity={0.18}
      />
    </svg>

    {/* 主体文字 */}
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        transform: "translateY(-16px)",
      }}
    >
      <div
        style={{
          fontSize: 306,
          fontWeight: 800,
          letterSpacing: -10,
          lineHeight: 0.94,
          color: "#F4FBFF",
          textShadow:
            "0 0 26px rgba(56,189,248,0.95), 0 0 90px rgba(56,189,248,0.75), 0 14px 40px rgba(0,0,0,0.6)",
        }}
      >
        RTX
      </div>

      <div
        style={{
          marginTop: 18,
          width: 300,
          height: 5,
          borderRadius: 3,
          backgroundColor: "#38BDF8",
          boxShadow: "0 0 28px rgba(56,189,248,0.9)",
        }}
      />

      <div
        style={{
          marginTop: 26,
          fontSize: 36,
          fontWeight: 600,
          letterSpacing: 16,
          color: "#7DD3FC",
          opacity: 0.9,
        }}
      >
        RAY TRACING
      </div>
    </div>
  </AbsoluteFill>
);

import React from "react";
import { AbsoluteFill } from "remotion";
import { C, FONT, MONO } from "./theme";
import { Glow } from "./anim";

const Pill: React.FC<{ children: React.ReactNode; hot?: boolean }> = ({ children, hot }) => (
  <div
    style={{
      padding: "14px 30px",
      borderRadius: 999,
      backgroundColor: hot ? "rgba(56,189,248,0.20)" : "rgba(125,211,252,0.08)",
      border: `1px solid ${hot ? "rgba(56,189,248,0.55)" : C.line}`,
      color: hot ? C.bluePale : C.textDim,
      fontSize: 28,
      fontWeight: 600,
      letterSpacing: 1,
    }}
  >
    {children}
  </div>
);

/** B 站封面：幕后篇（深色 + 淡蓝），1920×1080 */
export const BtsCover: React.FC = () => (
  <AbsoluteFill
    style={{
      backgroundColor: C.bg,
      fontFamily: FONT,
      color: C.text,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    }}
  >
    <Glow x={50} y={40} size={66} intensity={1.2} />

    <div style={{ fontSize: 28, fontWeight: 600, letterSpacing: 14, color: C.blue }}>
      BEHIND THE SCENES
    </div>

    <div style={{ height: 18 }} />

    <div
      style={{
        fontSize: 196,
        fontWeight: 700,
        letterSpacing: 10,
        lineHeight: 1,
        color: C.text,
        textShadow: "0 40px 130px rgba(56,189,248,0.45)",
      }}
    >
      幕后
    </div>

    <div
      style={{
        marginTop: 26,
        width: 430,
        height: 8,
        borderRadius: 4,
        backgroundColor: C.blue,
      }}
    />

    <div style={{ marginTop: 34, fontSize: 46, color: C.textDim, letterSpacing: 2 }}>
      周目 · 一个 App 从想法到开源
    </div>

    <div style={{ marginTop: 58, display: "flex", gap: 20 }}>
      <Pill hot>97 项断言</Pill>
      <Pill>6 个坑</Pill>
      <Pill>28 段全记录</Pill>
    </div>
  </AbsoluteFill>
);

import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";

/** B 站封面：1146 × 717（16:10） */
const C = {
  bg: "#05080F",
  line: "rgba(76,141,255,0.22)",
  blue: "#4C8DFF",
  blueBright: "#86B4FF",
  blueSoft: "rgba(76,141,255,0.14)",
  text: "#E8F0FF",
  dim: "#8296B4",
  faint: "#55688A",
};

const FONT =
  '-apple-system, BlinkMacSystemFont, "SF Pro SC", "PingFang SC", "Helvetica Neue", sans-serif';

export const Cover14: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg, fontFamily: FONT }}>
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(70% 90% at 22% 45%, rgba(76,141,255,0.30) 0%, rgba(76,141,255,0) 66%)",
      }}
    />

    <div style={{ position: "absolute", inset: 0, padding: "44px 50px", display: "flex" }}>
      {/* 左：手表 */}
      <div style={{ display: "flex", alignItems: "center", width: 430 }}>
        <Img
          src={staticFile("watch-2x.png")}
          style={{
            width: 268, height: 320, display: "block", borderRadius: 64,
            border: `2px solid ${C.line}`,
            boxShadow: "0 30px 70px rgba(0,0,0,0.65), 0 0 70px rgba(76,141,255,0.28)",
          }}
        />
      </div>

      {/* 右：文字 */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", paddingLeft: 8 }}>
        {/* 头部 */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Img
            src={staticFile("appicon-dark.png")}
            style={{ width: 62, height: 62, borderRadius: 15, display: "block" }}
          />
          <span style={{ fontSize: 40, fontWeight: 700, color: C.text, letterSpacing: 1 }}>周目</span>
          <span style={{
            fontSize: 26, fontWeight: 800, color: "#04101F", background: C.blue,
            padding: "4px 16px", borderRadius: 10,
          }}>v1.4</span>
        </div>

        <div style={{ height: 30 }} />

        <div style={{ fontSize: 62, fontWeight: 800, color: C.text, lineHeight: 1.2, letterSpacing: 1 }}>
          抬腕就知道
          <br />
          <span style={{ color: C.blueBright }}>今天第几周</span>
        </div>

        <div style={{ height: 26 }} />

        <div style={{ fontSize: 24, color: C.dim, letterSpacing: 0.5 }}>
          新增 Apple Watch 应用 · 四种表盘复杂功能
        </div>

        <div style={{ height: 22 }} />

        {/* 三个标签 */}
        <div style={{ display: "flex", gap: 12 }}>
          {["随 iPhone 一起装", "灵动岛提醒", "不联网"].map((t) => (
            <span key={t} style={{
              fontSize: 19, color: C.blueBright, padding: "7px 16px", borderRadius: 9,
              background: C.blueSoft, border: `1px solid ${C.line}`,
            }}>{t}</span>
          ))}
        </div>

        <div style={{ height: 26 }} />

        <div style={{ fontSize: 20, color: C.faint, fontFamily: "ui-monospace, Menlo, monospace" }}>
          github.com/zhoumu-app/zhoumu
        </div>
      </div>
    </div>
  </AbsoluteFill>
);

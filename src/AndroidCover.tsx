import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";

const C = {
  bg: "#05080F",
  line: "rgba(76,141,255,0.22)",
  blue: "#4C8DFF",
  blueBright: "#86B4FF",
  blueSoft: "rgba(76,141,255,0.14)",
  green: "#3DDC84",
  text: "#E8F0FF",
  dim: "#8296B4",
  faint: "#55688A",
};

const FONT =
  '-apple-system, BlinkMacSystemFont, "SF Pro SC", "PingFang SC", "Helvetica Neue", sans-serif';

/** Android 版 B 站封面：1146 × 717 */
export const AndroidCover: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg, fontFamily: FONT }}>
    <AbsoluteFill
      style={{
        background: "radial-gradient(70% 90% at 78% 45%, rgba(76,141,255,0.30) 0%, rgba(76,141,255,0) 66%)",
      }}
    />
    <div style={{ position: "absolute", inset: 0, padding: "44px 50px", display: "flex", alignItems: "center", gap: 46 }}>
      {/* 左：文字 */}
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <Img src={staticFile("appicon-dark.png")}
               style={{ width: 58, height: 58, borderRadius: 14, display: "block" }} />
          <span style={{ fontSize: 36, fontWeight: 700, color: C.text }}>周目</span>
          <span style={{ fontSize: 28, fontWeight: 700, color: C.green }}>Android 版</span>
          <span style={{ fontSize: 24, fontWeight: 800, color: "#04101F", background: C.blue,
                         padding: "3px 14px", borderRadius: 9 }}>v1.5</span>
        </div>

        <div style={{ marginTop: 26, fontSize: 62, fontWeight: 800, color: C.text, lineHeight: 1.18 }}>
          打开就知道
          <br />
          <span style={{ color: C.blueBright }}>今天第几周</span>
        </div>

        <div style={{ marginTop: 22, fontSize: 22, color: C.dim }}>
          和 iPhone 版功能一致 · 只是没有灵动岛
        </div>

        <div style={{ marginTop: 20, display: "flex", gap: 11 }}>
          {["桌面小组件", "上下课提醒", "不联网"].map((t) => (
            <span key={t} style={{
              fontSize: 18, color: C.blueBright, padding: "6px 15px", borderRadius: 9,
              background: C.blueSoft, border: `1px solid ${C.line}`,
            }}>{t}</span>
          ))}
        </div>

        <div style={{ marginTop: 24, fontSize: 18, color: C.faint, fontFamily: "ui-monospace, Menlo, monospace" }}>
          github.com/zhoumu-app/zhoumu-android
        </div>
      </div>

      {/* 右：两张截图 */}
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        {[
          { src: "android-s2.png", h: 300, off: 0 },
          { src: "android-s1.png", h: 340, off: -10 },
        ].map((t) => (
          <div key={t.src} style={{
            height: t.h, aspectRatio: "9 / 16", overflow: "hidden", borderRadius: 22,
            border: `1px solid ${C.line}`, background: "#fff",
            boxShadow: "0 26px 60px rgba(0,0,0,0.6)", marginTop: t.off,
          }}>
            <Img src={staticFile(t.src)} style={{ width: "100%", display: "block" }} />
          </div>
        ))}
      </div>
    </div>
  </AbsoluteFill>
);

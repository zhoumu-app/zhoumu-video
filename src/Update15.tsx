import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";

const C = {
  bg: "#05080F",
  card: "#101827",
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

const ITEMS: { tag: string; title: string; desc: string }[] = [
  { tag: "修复", title: "节数直接显示在加减处", desc: "以前只剩「− +」，看不出现在是几节" },
  { tag: "新增", title: "上下课时间支持每天单独", desc: "也可以继续用「统一」，所有天共用一套" },
  { tag: "兼容", title: "老数据不受影响", desc: "升级后课表、时间、科目都不丢" },
];

/** v1.5 更新公告图：1080 × 1180 */
export const Update15: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg, fontFamily: FONT }}>
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(78% 42% at 50% 0%, rgba(76,141,255,0.24) 0%, rgba(76,141,255,0) 68%)",
      }}
    />

    <div style={{ position: "absolute", inset: 0, padding: "60px 62px", display: "flex", flexDirection: "column" }}>
      {/* 头部 */}
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <Img
          src={staticFile("appicon-dark.png")}
          style={{ width: 116, height: 116, borderRadius: 27, display: "block", boxShadow: "0 18px 44px rgba(0,0,0,0.5)" }}
        />
        <div>
          <div style={{ fontSize: 48, fontWeight: 700, color: C.text, letterSpacing: 2 }}>周目</div>
          <div style={{ marginTop: 7, display: "flex", alignItems: "center", gap: 11 }}>
            <span style={{ fontSize: 24, fontWeight: 700, color: "#04101F", padding: "4px 15px", borderRadius: 9, backgroundColor: C.blue }}>
              v1.5
            </span>
            <span style={{ fontSize: 19, color: C.dim }}>手感细节打磨</span>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 32, height: 1, backgroundColor: C.line }} />

      <div style={{ marginTop: 26, fontSize: 20, fontWeight: 700, color: C.blue, letterSpacing: 6 }}>
        本 次 更 新
      </div>

      {/* 条目 */}
      <div style={{ marginTop: 8 }}>
        {ITEMS.map((item, i) => (
          <div key={item.title} style={{
            display: "flex", alignItems: "flex-start", gap: 16,
            padding: "18px 0", borderBottom: `1px solid ${C.line}`,
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 11, flexShrink: 0,
              backgroundColor: C.blueSoft, border: `1px solid ${C.line}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 15, fontWeight: 700, color: C.blue, fontVariantNumeric: "tabular-nums",
            }}>{String(i + 1).padStart(2, "0")}</div>
            <div style={{ flex: 1, paddingTop: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <span style={{ fontSize: 25, fontWeight: 700, color: C.text }}>{item.title}</span>
                <span style={{
                  fontSize: 12, fontWeight: 700, color: C.blue, letterSpacing: 1,
                  padding: "2px 7px", borderRadius: 6,
                  backgroundColor: C.blueSoft, border: `1px solid ${C.line}`,
                }}>{item.tag}</span>
              </div>
              <div style={{ marginTop: 3, fontSize: 17, color: C.dim, lineHeight: 1.4 }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* 实拍 */}
      <div style={{ marginTop: 26, display: "flex", alignItems: "center", gap: 26 }}>
        <Img
          src={staticFile("stepper-card.png")}
          style={{
            width: 430, display: "block", borderRadius: 18,
            border: `1px solid ${C.line}`, boxShadow: "0 22px 50px rgba(0,0,0,0.5)",
          }}
        />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: C.blue, letterSpacing: 3 }}>改 前</div>
          <div style={{
            marginTop: 8, fontSize: 24, color: C.faint,
            fontFamily: "ui-monospace, Menlo, monospace",
          }}>[ − | + ]</div>
          <div style={{ marginTop: 20, fontSize: 14, fontWeight: 700, color: C.blue, letterSpacing: 3 }}>改 后</div>
          <div style={{
            marginTop: 8, fontSize: 24, color: C.blueBright, fontWeight: 700,
            fontFamily: "ui-monospace, Menlo, monospace",
          }}>[ − | 3 节 | + ]</div>
        </div>
      </div>

      {/* 页脚 */}
      <div style={{ flex: 1 }} />
      <div style={{
        marginTop: 24, padding: "16px 20px", borderRadius: 15,
        backgroundColor: C.card, border: `1px solid ${C.line}`,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <span style={{ fontSize: 20, color: C.blueBright, fontWeight: 600 }}>
          github.com/zhoumu-app/zhoumu
        </span>
        <span style={{ fontSize: 17, color: C.faint }}>开源免费 · 不联网 · 不收集数据</span>
      </div>
    </div>
  </AbsoluteFill>
);

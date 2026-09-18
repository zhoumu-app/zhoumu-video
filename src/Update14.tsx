import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";

/** 和 App 的 Shared/Theme.swift 保持一致 */
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
  { tag: "新增", title: "Apple Watch 应用", desc: "随 iPhone 应用一起安装，不用单独下" },
  { tag: "新增", title: "表盘复杂功能", desc: "圆形 / 矩形 / 行内 / 角标，四种样式" },
  { tag: "改进", title: "灵动岛标出目标时刻", desc: "倒计时下面多一行「→ 21:10」，过期了也读得懂" },
  { tag: "改进", title: "课后清理实时活动", desc: "后台刷新尽力收尾，不再一直停在 0:00" },
  { tag: "结构", title: "一个 IPA 装全套", desc: "iPhone + 小组件 + 手表 + 表盘复杂功能" },
];

const Row: React.FC<{ index: number; item: (typeof ITEMS)[number] }> = ({ index, item }) => (
  <div style={{ display: "flex", alignItems: "flex-start", gap: 16, padding: "21px 0", borderBottom: `1px solid ${C.line}` }}>
    <div
      style={{
        width: 38, height: 38, borderRadius: 11, flexShrink: 0,
        backgroundColor: C.blueSoft, border: `1px solid ${C.line}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 16, fontWeight: 700, color: C.blue, fontVariantNumeric: "tabular-nums",
      }}
    >
      {String(index + 1).padStart(2, "0")}
    </div>
    <div style={{ flex: 1, paddingTop: 1 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
        <span style={{ fontSize: 24, fontWeight: 700, color: C.text }}>{item.title}</span>
        <span
          style={{
            fontSize: 12, fontWeight: 700, color: C.blue, letterSpacing: 1,
            padding: "2px 7px", borderRadius: 6,
            backgroundColor: C.blueSoft, border: `1px solid ${C.line}`,
          }}
        >
          {item.tag}
        </span>
      </div>
      <div style={{ marginTop: 3, fontSize: 17, color: C.dim, lineHeight: 1.4 }}>{item.desc}</div>
    </div>
  </div>
);

/** v1.4 更新公告图：1080 × 1620 */
export const Update14: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg, fontFamily: FONT }}>
    <AbsoluteFill
      style={{
        background: `radial-gradient(80% 44% at 50% 0%, rgba(76,141,255,0.26) 0%, rgba(76,141,255,0) 68%)`,
      }}
    />

    <div style={{ position: "absolute", inset: 0, padding: "62px 64px", display: "flex", flexDirection: "column" }}>
      {/* 头部 */}
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <Img
          src={staticFile("appicon-dark.png")}
          style={{ width: 118, height: 118, borderRadius: 27, display: "block", boxShadow: "0 18px 44px rgba(0,0,0,0.5)" }}
        />
        <div>
          <div style={{ fontSize: 48, fontWeight: 700, color: C.text, letterSpacing: 2 }}>周目</div>
          <div style={{ marginTop: 7, display: "flex", alignItems: "center", gap: 11 }}>
            <span style={{ fontSize: 24, fontWeight: 700, color: "#04101F", padding: "4px 15px", borderRadius: 9, backgroundColor: C.blue }}>
              v1.4
            </span>
            <span style={{ fontSize: 19, color: C.dim }}>来了 Apple Watch</span>
          </div>
        </div>
      </div>

      {/* 主角：手表实拍 */}
      <div style={{ marginTop: 26, display: "flex", alignItems: "center", gap: 30 }}>
        <Img
          src={staticFile("watch-2x.png")}
          style={{
            width: 236, height: 282, display: "block",
            borderRadius: 58, border: `1px solid ${C.line}`,
            boxShadow: "0 24px 60px rgba(0,0,0,0.55)",
          }}
        />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: C.blue, letterSpacing: 4 }}>本 次 主 角</div>
          <div style={{ marginTop: 10, fontSize: 38, fontWeight: 700, color: C.text, lineHeight: 1.25 }}>
            表盘上直接看到
            <br />
            <span style={{ color: C.blueBright }}>今天第几周</span>
          </div>
          <div style={{ marginTop: 12, fontSize: 18, color: C.dim, lineHeight: 1.5 }}>
            抬腕就是答案。
            <br />
            随 iPhone 应用一起装，不用单独下。
          </div>
        </div>
      </div>

      {/* 分隔 + 标题 */}
      <div style={{ marginTop: 30, height: 1, backgroundColor: C.line }} />
      <div style={{ marginTop: 24, fontSize: 20, fontWeight: 700, color: C.blue, letterSpacing: 6 }}>
        本 次 更 新
      </div>

      <div style={{ marginTop: 8, flex: 1 }}>
        {ITEMS.map((item, i) => (
          <Row key={item.title} index={i} item={item} />
        ))}
      </div>

      {/* 页脚 */}
      <div
        style={{
          marginTop: 22, padding: "16px 20px", borderRadius: 15,
          backgroundColor: C.card, border: `1px solid ${C.line}`,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}
      >
        <span style={{ fontSize: 20, color: C.blueBright, fontWeight: 600 }}>
          github.com/zhoumu-app/zhoumu
        </span>
        <span style={{ fontSize: 17, color: C.faint }}>开源免费 · 不联网 · 不收集数据</span>
      </div>
    </div>
  </AbsoluteFill>
);

import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";

/** v1.3 的蓝色配色，和 App 的 Shared/Theme.swift 保持一致 */
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

/** 本次更新的全部条目 */
const ITEMS: { tag: string; title: string; desc: string }[] = [
  { tag: "改色", title: "整体换成蓝色系", desc: "浅色白蓝 #2563EB · 深色黑蓝 #4C8DFF" },
  { tag: "新增", title: "外观开关", desc: "浅色 / 深色 / 跟随系统，三态切换" },
  { tag: "新增", title: "课表拆成两张", desc: "正课表 + 晚课表（原课表改名），可单独关闭" },
  { tag: "新增", title: "每日节数独立可调", desc: "周一到周日每天 1–12 节，各不一样也行" },
  { tag: "新增", title: "每节可选填上下课时间", desc: "两张表各一套，互不影响" },
  { tag: "新增", title: "排布方式可选", desc: "固定不变 / 按周目轮换，随时切换" },
  { tag: "改版", title: "首页分两页", desc: "第一页圆环 + 三行倒计时，第二页当日完整课表" },
  { tag: "改版", title: "圆环显示课程进度", desc: "上课中按本节进度填充，课间闭合，每节课后重置" },
  { tag: "新增", title: "灵动岛 / 锁屏实时活动", desc: "上下课前 5 分钟提醒，带下节课名与倒计时" },
];

const Row: React.FC<{ index: number; item: (typeof ITEMS)[number] }> = ({ index, item }) => (
  <div style={{ display: "flex", alignItems: "flex-start", gap: 18, padding: "23px 0", borderBottom: `1px solid ${C.line}` }}>
    <div
      style={{
        width: 40, height: 40, borderRadius: 12, flexShrink: 0,
        backgroundColor: C.blueSoft, border: `1px solid ${C.line}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 17, fontWeight: 700, color: C.blue, fontVariantNumeric: "tabular-nums",
      }}
    >
      {String(index + 1).padStart(2, "0")}
    </div>
    <div style={{ flex: 1, paddingTop: 1 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 25, fontWeight: 700, color: C.text }}>{item.title}</span>
        <span
          style={{
            fontSize: 13, fontWeight: 700, color: C.blue, letterSpacing: 1,
            padding: "2px 8px", borderRadius: 6,
            backgroundColor: C.blueSoft, border: `1px solid ${C.line}`,
          }}
        >
          {item.tag}
        </span>
      </div>
      <div style={{ marginTop: 4, fontSize: 18, color: C.dim, lineHeight: 1.45 }}>{item.desc}</div>
    </div>
  </div>
);

/** 更新公告图：1080 × 1620 */
export const Update13: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg, fontFamily: FONT }}>
    <AbsoluteFill
      style={{
        background: `radial-gradient(78% 46% at 50% 0%, rgba(76,141,255,0.26) 0%, rgba(76,141,255,0) 68%)`,
      }}
    />

    <div style={{ position: "absolute", inset: 0, padding: "70px 68px", display: "flex", flexDirection: "column" }}>
      {/* 头部：图标 + 名称 + 版本 */}
      <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
        <Img
          src={staticFile("appicon-dark.png")}
          style={{ width: 132, height: 132, borderRadius: 30, display: "block", boxShadow: "0 20px 50px rgba(0,0,0,0.5)" }}
        />
        <div>
          <div style={{ fontSize: 54, fontWeight: 700, color: C.text, letterSpacing: 2 }}>周目</div>
          <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 12 }}>
            <span
              style={{
                fontSize: 26, fontWeight: 700, color: "#04101F",
                padding: "5px 16px", borderRadius: 10, backgroundColor: C.blue,
              }}
            >
              v1.3
            </span>
            <span style={{ fontSize: 20, color: C.dim }}>大版本更新</span>
          </div>
        </div>
      </div>

      {/* 分隔 */}
      <div style={{ marginTop: 38, height: 1, backgroundColor: C.line }} />

      {/* 标题 */}
      <div style={{ marginTop: 30, fontSize: 22, fontWeight: 700, color: C.blue, letterSpacing: 6 }}>
        本 次 更 新
      </div>

      {/* 更新条目 */}
      <div style={{ marginTop: 12, flex: 1 }}>
        {ITEMS.map((item, i) => (
          <Row key={item.title} index={i} item={item} />
        ))}
      </div>

      {/* 页脚 */}
      <div
        style={{
          marginTop: 26, padding: "18px 22px", borderRadius: 16,
          backgroundColor: C.card, border: `1px solid ${C.line}`,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}
      >
        <span style={{ fontSize: 21, color: C.blueBright, fontWeight: 600 }}>
          github.com/zhoumu-app/zhoumu
        </span>
        <span style={{ fontSize: 18, color: C.faint }}>开源免费 · 不联网 · 不收集数据</span>
      </div>
    </div>
  </AbsoluteFill>
);

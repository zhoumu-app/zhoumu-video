import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/** App 本身的配色（和真机一致） */
export const APP = {
  bg: "#FFF9F4",
  card: "#FFFFFF",
  orange: "#4C8DFF",
  orangeDeep: "#1D4ED8",
  orangeSoft: "#17253D",
  text: "#2E231C",
  textDim: "#8C7870",
};

const R = '-apple-system, BlinkMacSystemFont, "SF Pro SC", "PingFang SC", sans-serif';

export const useSpring = (
  delay = 0,
  cfg: Record<string, number> = { damping: 200, mass: 0.7, stiffness: 110 },
) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: f - delay, fps, config: cfg });
};

// ---------------------------------------------------------------- 手机外壳

export const Phone: React.FC<{
  w: number;
  h: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ w, h, children, style }) => (
  <div
    style={{
      width: w,
      height: h,
      borderRadius: w * 0.155,
      backgroundColor: "#0B0B0F",
      padding: w * 0.026,
      boxShadow:
        "0 60px 150px rgba(0,0,0,0.72), 0 0 0 1px rgba(255,255,255,0.12), inset 0 0 0 2px rgba(255,255,255,0.06)",
      ...style,
    }}
  >
    <div
      style={{
        width: "100%",
        height: "100%",
        borderRadius: w * 0.132,
        overflow: "hidden",
        backgroundColor: APP.bg,
        position: "relative",
        fontFamily: R,
      }}
    >
      {/* 灵动岛 */}
      <div
        style={{
          position: "absolute",
          top: w * 0.045,
          left: "50%",
          transform: "translateX(-50%)",
          width: w * 0.3,
          height: w * 0.088,
          borderRadius: w * 0.05,
          backgroundColor: "#0B0B0F",
          zIndex: 5,
        }}
      />
      {children}
    </div>
  </div>
);

// ---------------------------------------------------------------- 主界面

export const AppHome: React.FC<{
  s: number;
  weekday: string;
  subject: string;
  week: number;
  rawWeek: number;
  cycleWeeks: number;
  dayInWeek: number;
  startText: string;
  dateText: string;
  /** 圈内文案的变化进度：0→1 之间会做一次"换字" */
  swap?: number;
}> = ({ s, weekday, subject, week, rawWeek, cycleWeeks, dayInWeek, startText, dateText, swap = 1 }) => {
  const ring = 252 * s;
  const stroke = 16 * s;
  const progress = dayInWeek / 7;
  const weekOpacity = interpolate(swap, [0, 0.5, 1], [1, 0.15, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", padding: `${26 * s}px ${24 * s}px ${14 * s}px` }}>
      {/* 顶部 */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontSize: 22 * s, fontWeight: 700, color: APP.orange }}>周目</div>
        <div
          style={{
            width: 40 * s,
            height: 40 * s,
            borderRadius: 20 * s,
            backgroundColor: "rgba(76,141,255,0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 19 * s,
            color: APP.orange,
          }}
        >
          ⚙
        </div>
      </div>

      {/* 圈 */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 22 * s }}>
        <div style={{ width: ring, height: ring, position: "relative" }}>
          <svg width={ring} height={ring} style={{ transform: "rotate(-90deg)" }}>
            <circle cx={ring / 2} cy={ring / 2} r={(ring - stroke) / 2} fill="none" stroke={APP.orangeSoft} strokeWidth={stroke} />
            <circle
              cx={ring / 2}
              cy={ring / 2}
              r={(ring - stroke) / 2}
              fill="none"
              stroke={APP.orange}
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={`${Math.PI * (ring - stroke) * progress} ${Math.PI * (ring - stroke)}`}
            />
          </svg>
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 4 * s,
            }}
          >
            <div style={{ fontSize: 13 * s, color: APP.textDim }}>{weekday}</div>
            <div
              style={{
                fontSize: 46 * s,
                fontWeight: 700,
                color: APP.orange,
                opacity: weekOpacity,
                lineHeight: 1.1,
              }}
            >
              {subject}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 * s }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 4 * s, color: APP.orange, opacity: weekOpacity }}>
            <span style={{ fontSize: 15 * s, fontWeight: 600 }}>第</span>
            <span style={{ fontSize: 30 * s, fontWeight: 700 }}>{week}</span>
            <span style={{ fontSize: 15 * s, fontWeight: 600 }}>周</span>
          </div>
          <div style={{ display: "flex", gap: 8 * s }}>
            {Array.from({ length: cycleWeeks }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: i === week - 1 ? 13 * s : 9 * s,
                  height: i === week - 1 ? 13 * s : 9 * s,
                  borderRadius: 8 * s,
                  backgroundColor: i === week - 1 ? APP.orange : APP.orangeSoft,
                }}
              />
            ))}
          </div>
          <div style={{ fontSize: 14 * s, color: APP.textDim }}>
            开学第 {rawWeek} 周 · {cycleWeeks} 周循环
          </div>
        </div>
      </div>

      {/* 信息卡 */}
      <div
        style={{
          backgroundColor: APP.card,
          borderRadius: 26 * s,
          padding: 20 * s,
          display: "flex",
          flexDirection: "column",
          gap: 14 * s,
          boxShadow: "0 10px 20px rgba(76,141,255,0.10)",
        }}
      >
        {[
          ["开学日期", startText, false],
          ["今天", dateText, false],
          ["距下一周目", `${7 - dayInWeek} 天`, true],
        ].map(([label, value, hot], i) => (
          <React.Fragment key={i}>
            {i > 0 ? <div style={{ height: 1, backgroundColor: APP.orangeSoft }} /> : null}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span style={{ fontSize: 15 * s, color: APP.textDim }}>{label as string}</span>
              <span
                style={{
                  fontSize: 15 * s,
                  fontWeight: 600,
                  color: hot ? APP.orangeDeep : APP.text,
                }}
              >
                {value as string}
              </span>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

// ---------------------------------------------------------------- 课表卡片

export const ScheduleGrid: React.FC<{
  s: number;
  rows: string[][];
  /** 已填出的格子数（用于逐格动画） */
  reveal?: number;
  /** 高亮某一格 */
  active?: { r: number; c: number } | null;
  activeT?: number;
}> = ({ s, rows, reveal = 99, active, activeT = 0 }) => {
  const days = ["一", "二", "三", "四", "五", "六", "日"];
  const cw = 76 * s;
  const ch = 56 * s;
  let idx = 0;
  return (
    <div style={{ backgroundColor: APP.card, borderRadius: 26 * s, padding: `${22 * s}px ${24 * s}px`, display: "inline-block" }}>
      <div style={{ fontSize: 13 * s, fontWeight: 600, color: APP.orangeDeep, marginBottom: 14 * s }}>课表</div>
      <div style={{ display: "flex", gap: 10 * s, marginBottom: 14 * s, paddingLeft: 62 * s }}>
        {days.map((d) => (
          <div key={d} style={{ width: cw, textAlign: "center", fontSize: 12 * s, fontWeight: 600, color: APP.textDim }}>
            {d}
          </div>
        ))}
      </div>
      {rows.map((row, r) => (
        <div key={r} style={{ display: "flex", gap: 10 * s, alignItems: "center", marginBottom: 10 * s }}>
          <div style={{ width: 52 * s, fontSize: 12 * s, fontWeight: 700, color: APP.orange }}>{r + 1}周</div>
          {row.map((cell, c) => {
            const shown = idx < reveal;
            idx++;
            const filled = cell.length > 0;
            const isActive = active && active.r === r && active.c === c;
            const scale = isActive ? 1 + 0.12 * Math.sin(Math.min(1, activeT) * Math.PI) : 1;
            return (
              <div
                key={c}
                style={{
                  width: cw,
                  height: ch,
                  borderRadius: 14 * s,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 11 * s,
                  fontWeight: filled ? 600 : 400,
                  backgroundColor: filled ? APP.orangeSoft : "rgba(76,141,255,0.10)",
                  color: filled ? APP.orangeDeep : "#C8B8AE",
                  border: `2px solid ${isActive ? APP.orange : "transparent"}`,
                  opacity: shown ? 1 : 0,
                  transform: `scale(${(shown ? 1 : 0.7) * scale})`,
                }}
              >
                {filled ? cell : "·"}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

// ---------------------------------------------------------------- 小组件

export const WidgetCard: React.FC<{
  size: "small" | "medium";
  w: number;
  weekday: string;
  subject: string;
  week: number;
  rawWeek: number;
  cycleWeeks: number;
}> = ({ size, w, weekday, subject, week, rawWeek, cycleWeeks }) => {
  const s = w / 170;
  const h = size === "small" ? w : w * 0.47;
  return (
    <div
      style={{
        width: w,
        height: h,
        borderRadius: 22 * s,
        backgroundColor: APP.bg,
        padding: 16 * s,
        fontFamily: R,
        boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
        display: "flex",
        flexDirection: size === "small" ? "column" : "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10 * s,
      }}
    >
      {size === "small" ? (
        <>
          <div style={{ fontSize: 11 * s, color: APP.textDim }}>{weekday}</div>
          <div style={{ fontSize: 26 * s, fontWeight: 700, color: APP.orange }}>{subject}</div>
          <div style={{ fontSize: 11 * s, fontWeight: 600, color: APP.orangeDeep }}>第 {week} 周</div>
        </>
      ) : (
        <>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 * s }}>
            <div style={{ fontSize: 11 * s, color: APP.textDim }}>{weekday}</div>
            <div style={{ fontSize: 30 * s, fontWeight: 700, color: APP.orange }}>{subject}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 5 * s }}>
            <div style={{ fontSize: 20 * s, fontWeight: 700, color: APP.orangeDeep }}>第 {week} 周</div>
            <div style={{ display: "flex", gap: 4 * s }}>
              {Array.from({ length: cycleWeeks }).map((_, i) => (
                <div key={i} style={{ width: i === week - 1 ? 8 * s : 6 * s, height: i === week - 1 ? 8 * s : 6 * s, borderRadius: 4 * s, backgroundColor: i === week - 1 ? APP.orange : APP.orangeSoft }} />
              ))}
            </div>
            <div style={{ fontSize: 10 * s, color: APP.textDim }}>开学第 {rawWeek} 周</div>
          </div>
        </>
      )}
    </div>
  );
};

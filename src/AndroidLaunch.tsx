import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";

const C = {
  bg: "#05080F",
  card: "#101827",
  line: "rgba(76,141,255,0.22)",
  blue: "#4C8DFF",
  blueBright: "#86B4FF",
  blueSoft: "rgba(76,141,255,0.14)",
  green: "#3DDC84",          // Android 的那点绿，只做点缀
  text: "#E8F0FF",
  dim: "#8296B4",
  faint: "#55688A",
};

const FONT =
  '-apple-system, BlinkMacSystemFont, "SF Pro SC", "PingFang SC", "Helvetica Neue", sans-serif';

const FEATURES: [string, string, string][] = [
  ["🗓", "周目", "按开学日期算第几周，支持 N 周循环"],
  ["📚", "两张课表", "正课 / 晚课互相独立，每天节数可不同"],
  ["🏠", "首页两页", "圆环 + 三行倒计时 / 当天完整课表"],
  ["🧩", "桌面小组件", "不打开 App 也能看到第几周"],
  ["🔔", "上下课提醒", "上课前、下课前各提醒一次"],
  ["🔒", "数据不出手机", "不联网 · 不要账号 · 不收集数据"],
];

/** Android 版发布公告图：1080 × 1360 */
export const AndroidLaunch: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg, fontFamily: FONT }}>
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(80% 42% at 50% 0%, rgba(76,141,255,0.24) 0%, rgba(76,141,255,0) 68%)",
      }}
    />

    <div style={{ position: "absolute", inset: 0, padding: "58px 60px", display: "flex", flexDirection: "column" }}>
      {/* 头部 */}
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <Img
          src={staticFile("appicon-dark.png")}
          style={{ width: 112, height: 112, borderRadius: 26, display: "block", boxShadow: "0 18px 44px rgba(0,0,0,0.5)" }}
        />
        <div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <span style={{ fontSize: 46, fontWeight: 700, color: C.text, letterSpacing: 2 }}>周目</span>
            <span style={{ fontSize: 26, fontWeight: 600, color: C.green }}>Android 版</span>
          </div>
          <div style={{ marginTop: 7, display: "flex", alignItems: "center", gap: 11 }}>
            <span style={{ fontSize: 23, fontWeight: 700, color: "#04101F", padding: "4px 15px", borderRadius: 9, backgroundColor: C.blue }}>
              v1.5
            </span>
            <span style={{ fontSize: 19, color: C.dim }}>第一个版本</span>
          </div>
        </div>
      </div>

      {/* 标题 */}
      <div style={{ marginTop: 30, display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: C.blue, letterSpacing: 5 }}>安 卓 版 来 了</div>
          <div style={{ marginTop: 12, fontSize: 56, fontWeight: 800, color: C.text, lineHeight: 1.2 }}>
            打开就知道 <span style={{ color: C.blueBright }}>今天第几周</span>
          </div>
        </div>
        <div style={{ fontSize: 17, color: C.dim, textAlign: "right", lineHeight: 1.6, paddingBottom: 6 }}>
          和 iPhone 版功能一致
          <br />
          只是没有灵动岛
        </div>
      </div>

      {/* 三张实拍 */}
      <div style={{ marginTop: 28, display: "flex", alignItems: "flex-start", gap: 30 }}>
        {[
          { src: "android-s1.png", w: 300, h: 434, cap: "设置 · 外观 / 学期 / 两张课表" },
          { src: "android-s2.png", w: 300, h: 434, cap: "上下课提醒 · 到点弹通知" },
          { src: "android-s3.png", w: 380, h: 292, cap: "桌面小组件 · 不打开也能看" },
        ].map((t) => (
          <div key={t.src} style={{ width: t.w }}>
            <div style={{
              width: t.w, height: t.h, overflow: "hidden", borderRadius: 20,
              border: `1px solid ${C.line}`, boxShadow: "0 20px 50px rgba(0,0,0,0.55)",
              background: "#fff", display: "flex", alignItems: "flex-start",
            }}>
              <Img src={staticFile(t.src)} style={{ width: t.w, display: "block" }} />
            </div>
            <div style={{ marginTop: 12, fontSize: 15, color: C.dim, lineHeight: 1.4 }}>{t.cap}</div>
          </div>
        ))}
      </div>

      {/* 功能 */}
      <div style={{ marginTop: 34, height: 1, backgroundColor: C.line }} />
      <div style={{ marginTop: 24, fontSize: 19, fontWeight: 700, color: C.blue, letterSpacing: 5 }}>
        功 能 一 览
      </div>
      <div style={{ marginTop: 12, flex: 1 }}>
        {FEATURES.map(([icon, title, desc]) => (
          <div key={title} style={{
            display: "flex", alignItems: "center", gap: 16,
            padding: "15px 0", borderBottom: `1px solid ${C.line}`,
          }}>
            <span style={{ fontSize: 26, width: 36, textAlign: "center" }}>{icon}</span>
            <span style={{ fontSize: 24, fontWeight: 700, color: C.text, width: 190 }}>{title}</span>
            <span style={{ fontSize: 18, color: C.dim }}>{desc}</span>
          </div>
        ))}
      </div>

      {/* 页脚 */}
      <div style={{
        marginTop: 22, padding: "16px 20px", borderRadius: 15,
        backgroundColor: C.card, border: `1px solid ${C.line}`,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <span style={{ fontSize: 19, color: C.blueBright, fontWeight: 600 }}>
          github.com/zhoumu-app/zhoumu-android
        </span>
        <span style={{ fontSize: 16, color: C.faint }}>开源免费 · MIT</span>
      </div>
    </div>
  </AbsoluteFill>
);

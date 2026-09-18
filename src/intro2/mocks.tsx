import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { APP } from "./ui";

const R = '-apple-system, BlinkMacSystemFont, "SF Pro SC", "PingFang SC", sans-serif';
const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';

const sp = (f: number, delay: number, cfg: Record<string, number> = { damping: 200, mass: 0.6, stiffness: 130 }) => {
  const { fps } = useVideoConfig();
  return spring({ frame: f - delay, fps, config: cfg });
};

/** 桌面窗口外壳 */
const Win: React.FC<{ title: string; w: number; children: React.ReactNode }> = ({ title, w, children }) => (
  <div
    style={{
      width: w,
      borderRadius: 16,
      backgroundColor: "#0E1420",
      border: "1px solid rgba(255,255,255,0.12)",
      boxShadow: "0 40px 100px rgba(0,0,0,0.6)",
      overflow: "hidden",
      fontFamily: R,
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "13px 18px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
      {["#FB7185", "#FBBF24", "#4ADE80"].map((c) => (
        <div key={c} style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: c }} />
      ))}
      <div style={{ marginLeft: 12, fontSize: 15, color: "rgba(255,255,255,0.6)" }}>{title}</div>
    </div>
    <div style={{ padding: 22 }}>{children}</div>
  </div>
);

/** 鼠标指针：移动到目标并点一下 */
const Cursor: React.FC<{ w: number; from: [number, number]; to: [number, number]; t: number; clickAt?: number }> = ({
  w, from, to, t, clickAt = 0.62,
}) => {
  const x = interpolate(t, [0, 0.45], [from[0], to[0]], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const y = interpolate(t, [0, 0.45], [from[1], to[1]], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const click = interpolate(t, [clickAt, clickAt + 0.06, clickAt + 0.13], [1, 0.82, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: 20 }}>
      <div style={{ transform: `scale(${click})`, filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.6))" }}>
        <svg width={w} height={w} viewBox="0 0 24 24">
          <path d="M5 2 L5 19 L9.4 14.8 L12.3 21.4 L15 20.2 L12.2 13.8 L18.4 13.6 Z" fill="#fff" stroke="#111" strokeWidth="1.1" />
        </svg>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------- 步骤 1：下载 IPA

export const MockDownload: React.FC<{ p: number }> = ({ p }) => {
  const cur = sp(useCurrentFrame(), 22);
  const hit = interpolate(p, [0.62, 0.72], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ position: "relative" }}>
      <Win title="github.com/zhoumu-app/zhoumu/releases" w={860}>
        <div style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", marginBottom: 14, fontFamily: MONO }}>
          Releases / v1.2
        </div>
        {[
          { n: "ZhouMu-1.2-unsigned.ipa", s: "252 KB", hot: true },
          { n: "Source code (zip)", s: "1.1 MB", hot: false },
          { n: "Source code (tar.gz)", s: "1.0 MB", hot: false },
        ].map((f, i) => (
          <div
            key={f.n}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px 18px",
              marginBottom: 10,
              borderRadius: 12,
              border: `1px solid ${f.hot && hit > 0.4 ? "rgba(56,189,248,0.8)" : "rgba(255,255,255,0.10)"}`,
              backgroundColor: f.hot ? `rgba(56,189,248,${0.10 + 0.14 * hit})` : "rgba(255,255,255,0.03)",
              opacity: sp(useCurrentFrame(), 8 + i * 5),
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 18 }}>{f.hot ? "⬇" : "📄"}</span>
              <span style={{ fontSize: 20, color: f.hot ? "#BAE6FD" : "rgba(255,255,255,0.55)", fontFamily: MONO }}>{f.n}</span>
            </div>
            <span style={{ fontSize: 16, color: "rgba(255,255,255,0.35)" }}>{f.s}</span>
          </div>
        ))}
      </Win>
      <Cursor w={44} from={[-160, 300]} to={[430, 118]} t={cur} />
    </div>
  );
};

// ---------------------------------------------------------------- 步骤 2：选自签工具

export const MockTools: React.FC<{ p: number }> = ({ p }) => {
  const f = useCurrentFrame();
  const picked = interpolate(p, [0.45, 0.6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const tools = [
    { n: "Sideloadly", d: "Windows / macOS", hot: true },
    { n: "AltStore", d: "Windows / macOS", hot: false },
  ];
  return (
    <div style={{ display: "flex", gap: 34 }}>
      {tools.map((t, i) => {
        const active = t.hot ? picked : 0;
        return (
          <div
            key={t.n}
            style={{
              width: 330,
              padding: "34px 26px",
              borderRadius: 22,
              textAlign: "center",
              backgroundColor: t.hot ? `rgba(56,189,248,${0.10 + 0.14 * active})` : "rgba(255,255,255,0.04)",
              border: `2px solid ${t.hot && active > 0.4 ? "#38BDF8" : "rgba(255,255,255,0.10)"}`,
              transform: `scale(${sp(f, i * 6) * (1 + 0.04 * active)})`,
              fontFamily: R,
              opacity: sp(f, i * 6),
            }}
          >
            <div style={{ width: 96, height: 96, margin: "0 auto 20px", borderRadius: 24, backgroundColor: t.hot ? "#38BDF8" : "rgba(255,255,255,0.10)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 46 }}>
              {t.hot ? "🔧" : "🧰"}
            </div>
            <div style={{ fontSize: 28, fontWeight: 700, color: "#E8F2FF" }}>{t.n}</div>
            <div style={{ marginTop: 8, fontSize: 17, color: "rgba(255,255,255,0.45)" }}>{t.d}</div>
            {t.hot ? (
              <div style={{ marginTop: 18, fontSize: 19, fontWeight: 700, color: "#4ADE80", opacity: active }}>
                ✓ 推荐用这个
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

// ---------------------------------------------------------------- 步骤 3：连手机

export const MockConnect: React.FC<{ p: number }> = ({ p }) => {
  const f = useCurrentFrame();
  const cable = interpolate(p, [0.1, 0.4], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const dialog = interpolate(p, [0.45, 0.6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 70, fontFamily: R }}>
      {/* 电脑 */}
      <div style={{ width: 300, height: 190, borderRadius: 14, border: "2px solid rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 60 }}>
        💻
      </div>
      {/* 数据线 */}
      <div style={{ position: "relative", width: 150, height: 8 }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: 4, backgroundColor: "rgba(255,255,255,0.10)" }} />
        <div style={{ width: `${cable * 100}%`, height: "100%", borderRadius: 4, backgroundColor: "#38BDF8", boxShadow: "0 0 20px rgba(56,189,248,0.8)" }} />
      </div>
      {/* 手机 */}
      <div style={{ position: "relative" }}>
        <div style={{ width: 150, height: 300, borderRadius: 26, border: "3px solid rgba(255,255,255,0.35)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 54, backgroundColor: "rgba(255,255,255,0.04)" }}>
          📱
        </div>
        {/* 信任弹窗 */}
        <div
          style={{
            position: "absolute",
            left: 60,
            top: 96,
            width: 300,
            padding: "22px 24px",
            borderRadius: 18,
            backgroundColor: "#F2F2F7",
            opacity: dialog,
            transform: `scale(${0.9 + 0.1 * dialog})`,
            boxShadow: "0 30px 70px rgba(0,0,0,0.6)",
          }}
        >
          <div style={{ fontSize: 19, fontWeight: 700, color: "#111", textAlign: "center" }}>要信任此电脑吗？</div>
          <div style={{ marginTop: 8, fontSize: 15, color: "#666", textAlign: "center", lineHeight: 1.5 }}>
            信任此电脑后，可以访问此 iPhone 上的数据
          </div>
          <div style={{ marginTop: 18, display: "flex", gap: 12 }}>
            <div style={{ flex: 1, padding: "11px 0", borderRadius: 12, textAlign: "center", fontSize: 17, color: "#007AFF", backgroundColor: "#fff" }}>
              不信任
            </div>
            <div
              style={{
                flex: 1,
                padding: "11px 0",
                borderRadius: 12,
                textAlign: "center",
                fontSize: 17,
                fontWeight: 700,
                color: "#fff",
                backgroundColor: "#007AFF",
                transform: `scale(${sp(f, 40, { damping: 14, mass: 0.5, stiffness: 180 })})`,
              }}
            >
              信任
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------- 步骤 4：拖入并签名

export const MockSign: React.FC<{ p: number }> = ({ p }) => {
  const f = useCurrentFrame();
  const drop = interpolate(p, [0.12, 0.42], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const typed = Math.max(0, Math.min(1, (p - 0.45) / 0.35));
  const email = "you@example.com";
  const shown = email.slice(0, Math.round(email.length * typed));
  return (
    <Win title="Sideloadly" w={860}>
      {/* 设备 */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", borderRadius: 12, backgroundColor: "rgba(255,255,255,0.04)", marginBottom: 16 }}>
        <span style={{ fontSize: 26 }}>📱</span>
        <div>
          <div style={{ fontSize: 20, color: "#E8F2FF" }}>iPhone</div>
          <div style={{ fontSize: 15, color: "#4ADE80" }}>已连接</div>
        </div>
      </div>
      {/* IPA 拖放区 */}
      <div
        style={{
          height: 130,
          borderRadius: 14,
          border: `2px dashed ${drop > 0.9 ? "#4ADE80" : "rgba(56,189,248,0.5)"}`,
          backgroundColor: `rgba(56,189,248,${0.05 + 0.12 * drop})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 14,
          marginBottom: 16,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "12px 18px",
            borderRadius: 10,
            backgroundColor: "rgba(56,189,248,0.22)",
            border: "1px solid rgba(56,189,248,0.6)",
            fontFamily: MONO,
            fontSize: 18,
            color: "#BAE6FD",
            transform: `translate(${(1 - drop) * -420}px, ${(1 - drop) * -40}px)`,
            opacity: drop > 0.02 ? 1 : 0,
          }}
        >
          📦 ZhouMu-1.2-unsigned.ipa
        </div>
        {drop > 0.9 ? <span style={{ fontSize: 30 }}>✅</span> : null}
      </div>
      {/* Apple ID */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", borderRadius: 12, backgroundColor: "rgba(255,255,255,0.04)", marginBottom: 16 }}>
        <span style={{ fontSize: 22 }}>🔑</span>
        <div style={{ fontFamily: MONO, fontSize: 20, color: "#E8F2FF" }}>
          {shown}
          {typed < 1 ? <span style={{ opacity: Math.sin(f / 3) > 0 ? 1 : 0 }}>|</span> : null}
        </div>
      </div>
      {/* Start */}
      <div
        style={{
          padding: "15px 0",
          borderRadius: 12,
          textAlign: "center",
          fontSize: 22,
          fontWeight: 700,
          color: "#04121E",
          backgroundColor: typed >= 1 ? "#38BDF8" : "rgba(56,189,248,0.35)",
          transform: `scale(${typed >= 1 ? 1 + 0.03 * Math.sin(f / 6) : 1})`,
        }}
      >
        Start
      </div>
    </Win>
  );
};

// ---------------------------------------------------------------- iPhone 设置列表

const SettingsList: React.FC<{ rows: { name: string; hot?: boolean; value?: string; on?: boolean }[]; highlight: number }> = ({
  rows, highlight,
}) => (
  <div style={{ width: 330, borderRadius: 20, backgroundColor: "#F2F2F7", padding: 14, fontFamily: R, boxShadow: "0 30px 70px rgba(0,0,0,0.5)" }}>
    {rows.map((r, i) => {
      const on = r.hot && highlight > i / rows.length;
      return (
        <div
          key={r.name}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "15px 14px",
            marginBottom: 8,
            borderRadius: 12,
            backgroundColor: on ? "rgba(76,141,255,0.16)" : "#fff",
            border: `2px solid ${on ? "#4C8DFF" : "transparent"}`,
          }}
        >
          <span style={{ fontSize: 17, color: "#111", fontWeight: on ? 700 : 400 }}>{r.name}</span>
          <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 15, color: "#999" }}>
            {r.value ?? ""}
            {r.on !== undefined ? (
              <span
                style={{
                  width: 44,
                  height: 26,
                  borderRadius: 13,
                  backgroundColor: r.on ? "#34C759" : "#D1D1D6",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: r.on ? "flex-end" : "flex-start",
                  padding: 3,
                }}
              >
                <span style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: "#fff" }} />
              </span>
            ) : (
              <span style={{ color: "#C7C7CC" }}>›</span>
            )}
          </span>
        </div>
      );
    })}
  </div>
);

// ---------------------------------------------------------------- 步骤 5：信任证书

export const MockTrust: React.FC<{ p: number }> = ({ p }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
    <SettingsList
      highlight={p}
      rows={[
        { name: "通用", value: "VPN与设备管理", hot: true },
        { name: "隐私与安全性" },
        { name: "墙纸" },
      ]}
    />
    <div style={{ fontSize: 40, color: "#38BDF8", opacity: interpolate(p, [0.4, 0.55], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
      →
    </div>
    <div
      style={{
        opacity: interpolate(p, [0.45, 0.62], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        transform: `translateX(${(1 - interpolate(p, [0.45, 0.62], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })) * 40}px)`,
      }}
    >
      <div style={{ width: 330, borderRadius: 20, backgroundColor: "#F2F2F7", padding: 22, fontFamily: R }}>
        <div style={{ fontSize: 16, color: "#8E8E93", marginBottom: 12 }}>开发者 App</div>
        <div style={{ fontSize: 18, fontWeight: 700, color: "#111" }}>Apple Development: you@…</div>
        <div style={{ marginTop: 6, fontSize: 15, color: "#8E8E93" }}>未受信任</div>
        <div
          style={{
            marginTop: 20,
            padding: "14px 0",
            borderRadius: 12,
            textAlign: "center",
            fontSize: 19,
            fontWeight: 700,
            color: "#fff",
            backgroundColor: "#007AFF",
            transform: `scale(${sp(useCurrentFrame(), 60, { damping: 14, mass: 0.5, stiffness: 180 })})`,
          }}
        >
          信任
        </div>
      </div>
    </div>
  </div>
);

// ---------------------------------------------------------------- 步骤 6：开发者模式

export const MockDevMode: React.FC<{ p: number }> = ({ p }) => {
  const f = useCurrentFrame();
  const on = p > 0.4;
  const k = sp(f, Math.round(0.4 * 0));
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 44 }}>
      <div style={{ width: 330, borderRadius: 20, backgroundColor: "#F2F2F7", padding: 16, fontFamily: R }}>
        <div style={{ fontSize: 13, color: "#8E8E93", margin: "4px 0 10px 6px" }}>隐私与安全性</div>
        {["定位服务", "跟踪", "分析与改进", "开发者模式"].map((n, i) => {
          const hot = n === "开发者模式";
          return (
            <div
              key={n}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "15px 14px",
                marginBottom: 8,
                borderRadius: 12,
                backgroundColor: hot ? "rgba(76,141,255,0.16)" : "#fff",
                border: `2px solid ${hot && on ? "#4C8DFF" : "transparent"}`,
              }}
            >
              <span style={{ fontSize: 17, color: "#111", fontWeight: hot && on ? 700 : 400 }}>{n}</span>
              {hot ? (
                <span
                  style={{
                    width: 48,
                    height: 28,
                    borderRadius: 14,
                    backgroundColor: on ? "#34C759" : "#D1D1D6",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: on ? "flex-end" : "flex-start",
                    padding: 3,
                    transition: "none",
                    transform: `scale(${on ? 1 + 0.05 * Math.exp(-Math.pow((p - 0.42) * 22, 2)) : 1})`,
                  }}
                >
                  <span style={{ width: 22, height: 22, borderRadius: 11, backgroundColor: "#fff" }} />
                </span>
              ) : (
                <span style={{ color: "#C7C7CC" }}>›</span>
              )}
            </div>
          );
        })}
      </div>
      {/* 重启提示 */}
      <div
        style={{
          width: 300,
          padding: "22px 24px",
          borderRadius: 18,
          backgroundColor: "#F2F2F7",
          fontFamily: R,
          opacity: interpolate(p, [0.62, 0.74], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          transform: `scale(${0.9 + 0.1 * interpolate(p, [0.62, 0.74], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })})`,
        }}
      >
        <div style={{ fontSize: 18, fontWeight: 700, color: "#111", textAlign: "center" }}>需要重新启动</div>
        <div style={{ marginTop: 8, fontSize: 15, color: "#666", textAlign: "center", lineHeight: 1.5 }}>
          打开开发者模式后需要重启 iPhone 才能生效
        </div>
        <div style={{ marginTop: 16, padding: "12px 0", borderRadius: 12, textAlign: "center", fontSize: 17, fontWeight: 700, color: "#fff", backgroundColor: "#007AFF" }}>
          重新启动
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------- 步骤 7：完成

export const MockDone: React.FC<{ p: number }> = ({ p }) => {
  const f = useCurrentFrame();
  const items = ["手机连上电脑", "IPA 拖进工具", "Apple ID 签名", "信任开发者证书", "打开开发者模式"];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 60, fontFamily: R }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {items.map((t, i) => {
          const k = interpolate(p, [i * 0.09, i * 0.09 + 0.1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <div key={t} style={{ display: "flex", alignItems: "center", gap: 14, opacity: k, transform: `translateX(${(1 - k) * -24}px)` }}>
              <div style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: "rgba(74,222,128,0.18)", color: "#4ADE80", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700 }}>
                ✓
              </div>
              <span style={{ fontSize: 24, color: "#E8F2FF" }}>{t}</span>
            </div>
          );
        })}
      </div>
      <div
        style={{
          transform: `scale(${sp(f, 40, { damping: 13, mass: 0.7, stiffness: 110 } as Record<string, number>)})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div style={{ width: 150, height: 150, borderRadius: 34, backgroundColor: APP.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 74, fontWeight: 800, color: APP.orange, boxShadow: "0 30px 70px rgba(76,141,255,0.35)" }}>
          周
        </div>
        <div style={{ fontSize: 22, color: "#BAE6FD" }}>装好了</div>
      </div>
    </div>
  );
};

export const MOCKS = [MockDownload, MockTools, MockConnect, MockSign, MockTrust, MockDevMode, MockDone];

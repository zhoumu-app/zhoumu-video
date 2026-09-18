import React from "react";
import { AbsoluteFill, Img, interpolate, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../theme";
import { AppHome, APP, Phone, ScheduleGrid, WidgetCard, useSpring } from "./ui";
import { MOCKS } from "./mocks";

const F = '-apple-system, BlinkMacSystemFont, "SF Pro SC", "PingFang SC", sans-serif';
const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';

/** 示例课表：3 个周目 × 周一至周日 */
const SCHEDULE = [
  ["数学", "语文", "英语", "物理", "化学", "", ""],
  ["历史", "", "地理", "", "政治", "", "体育"],
  ["", "生物", "", "美术", "", "音乐", ""],
];
const WEEKDAYS = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];

const Shell: React.FC<{ children: React.ReactNode; glow?: number; y?: number }> = ({ children, glow = 1, y = 44 }) => {
  const f = useCurrentFrame();
  const breathe = 0.85 + 0.15 * Math.sin(f / 44);
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg, fontFamily: F, color: COLORS.text }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(60% 55% at 50% ${y}%, rgba(76,141,255,${0.22 * glow * breathe}) 0%, rgba(76,141,255,0) 72%)`,
        }}
      />
      {children}
    </AbsoluteFill>
  );
};

const Fade: React.FC<{ dur: number; children: React.ReactNode }> = ({ dur, children }) => {
  const f = useCurrentFrame();
  const o = interpolate(f, [0, 12, dur - 14, dur], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return <AbsoluteFill style={{ opacity: o }}>{children}</AbsoluteFill>;
};

const Kicker: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => (
  <div style={{ opacity: useSpring(delay), fontSize: 26, fontWeight: 600, letterSpacing: 7, color: COLORS.orange }}>
    {children}
  </div>
);

// ---------------------------------------------------------------- 1 开场

const SceneOpen: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const icon = useSpring(0, { damping: 13, mass: 0.8, stiffness: 95 });
  return (
    <Fade dur={dur}>
      <Shell glow={1.15}>
        <AbsoluteFill style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <div style={{ transform: `scale(${0.72 + 0.28 * icon})`, opacity: icon }}>
            <Img src={staticFile("appicon.png")} style={{ width: 230, height: 230, borderRadius: 52, display: "block", boxShadow: "0 46px 110px rgba(76,141,255,0.38)" }} />
          </div>
          <div style={{ height: 46 }} />
          <div style={{ opacity: useSpring(16), fontSize: 118, fontWeight: 700, letterSpacing: 10, color: "#fff" }}>周目</div>
          <div style={{ height: 20 }} />
          <div style={{ opacity: useSpring(30), fontSize: 36, color: COLORS.textDim, letterSpacing: 3 }}>
            开学第几周，打开就知道
          </div>
        </AbsoluteFill>
      </Shell>
    </Fade>
  );
};

// ---------------------------------------------------------------- 2 痛点

const ScenePain: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const q = interpolate(f, [0, 20, 120, 145], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const a = useSpring(130);
  return (
    <Fade dur={dur}>
      <Shell>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
          <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: q }}>
            <div style={{ fontSize: 78, fontWeight: 700, color: COLORS.text }}>每次开学，都要数今天是第几周</div>
            <div style={{ height: 26 }} />
            <div style={{ fontSize: 34, color: COLORS.textDim }}>翻日历、掰手指、算错了还得重来</div>
          </AbsoluteFill>
          <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: a, transform: `scale(${0.9 + 0.1 * a})` }}>
            <div style={{ fontSize: 92, fontWeight: 700, color: COLORS.orange, textShadow: "0 20px 80px rgba(76,141,255,0.5)" }}>
              交给它就好
            </div>
          </AbsoluteFill>
        </AbsoluteFill>
      </Shell>
    </Fade>
  );
};

// ---------------------------------------------------------------- 3 公式演算

const EqLine: React.FC<{ delay: number; label: string; expr: string; result: string; hot?: boolean }> = ({
  delay, label, expr, result, hot,
}) => {
  const p = useSpring(delay);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 26, opacity: p, transform: `translateX(${(1 - p) * 30}px)` }}>
      <div style={{ width: 230, textAlign: "right", fontSize: 30, color: COLORS.textDim }}>{label}</div>
      <div style={{ fontSize: 20, color: COLORS.textFaint }}>→</div>
      <div style={{ fontFamily: MONO, fontSize: 34, color: hot ? COLORS.orangeBright : "#D8D8DE", letterSpacing: 1 }}>{expr}</div>
      <div style={{ fontSize: 20, color: COLORS.textFaint }}>=</div>
      <div style={{ fontFamily: MONO, fontSize: 52, fontWeight: 700, color: COLORS.orange, minWidth: 120 }}>{result}</div>
    </div>
  );
};

const SceneFormula: React.FC<{ dur: number }> = ({ dur }) => (
  <Fade dur={dur}>
    <Shell>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 40 }}>
        <Kicker>怎么算的</Kicker>
        <div style={{ fontSize: 46, fontWeight: 700, marginBottom: 10 }}>三步，一次取模</div>
        <EqLine delay={20} label="距开学天数" expr="今天 − 开学日期" result="21" />
        <EqLine delay={50} label="开学第几周" expr="21 ÷ 7 + 1" result="4" />
        <EqLine delay={80} label="显示周目" expr="(4 − 1) mod 3 + 1" result="1" hot />
        <div style={{ marginTop: 30, fontSize: 30, color: COLORS.textDim, opacity: useSpring(130) }}>
          开学第 4 周、循环 3 周 → 显示 <span style={{ color: COLORS.orange, fontWeight: 700 }}>第 1 周</span>
        </div>
      </AbsoluteFill>
    </Shell>
  </Fade>
);

// ---------------------------------------------------------------- 4 循环演示

const SceneCycle: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const { fps: fpsC } = useVideoConfig();
  return (
    <Fade dur={dur}>
      <Shell>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
          <Kicker>周目循环</Kicker>
          <div style={{ height: 18 }} />
          <div style={{ fontSize: 44, fontWeight: 700, marginBottom: 50 }}>每 3 周回到起点</div>
          <div style={{ display: "flex", gap: 18 }}>
            {Array.from({ length: 7 }).map((_, i) => {
              const raw = i + 1;
              const shown = ((raw - 1) % 3) + 1;
              const p = spring({ frame: f - (20 + i * 12), fps: fpsC, config: { damping: 200, mass: 0.7, stiffness: 110 } });
              const isWrap = shown === 1 && raw > 1;
              return (
                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, opacity: p, transform: `translateY(${(1 - p) * 30}px)` }}>
                  <div style={{ fontSize: 20, color: COLORS.textDim }}>第 {raw} 周</div>
                  <div style={{ fontSize: 22, color: COLORS.textFaint }}>↓</div>
                  <div
                    style={{
                      width: 108,
                      height: 108,
                      borderRadius: 26,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 44,
                      fontWeight: 700,
                      color: isWrap ? "#1A0A00" : COLORS.orange,
                      backgroundColor: isWrap ? COLORS.orange : "rgba(76,141,255,0.14)",
                      border: `2px solid ${COLORS.orange}`,
                      boxShadow: isWrap ? "0 20px 60px rgba(76,141,255,0.5)" : "none",
                    }}
                  >
                    {shown}
                  </div>
                  {isWrap ? (
                    <div style={{ fontSize: 17, color: COLORS.orange, fontWeight: 600 }}>循环</div>
                  ) : (
                    <div style={{ fontSize: 17, color: "transparent" }}>·</div>
                  )}
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: 56, fontSize: 30, color: COLORS.textDim, opacity: useSpring(130) }}>
            第 4、7 周都回到第 1 周 —— 课表也跟着走第 1 排
          </div>
        </AbsoluteFill>
      </Shell>
    </Fade>
  );
};

// ---------------------------------------------------------------- 5 主界面演示

const SceneHome: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const { fps: fpsH } = useVideoConfig();
  // 24 秒里走完 3 个周目 × 7 天
  const total = 21;
  const step = Math.min(total - 1, Math.floor((f / dur) * total));
  const cycleRow = Math.floor(step / 7);
  const dayIdx = step % 7;
  const subject = SCHEDULE[cycleRow][dayIdx] || "无课";
  const swap = interpolate((f % (dur / total)) / (dur / total), [0, 0.16, 0.34], [1, 0.1, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const p = useSpring(4, { damping: 200, mass: 0.9, stiffness: 90 });

  return (
    <Fade dur={dur}>
      <Shell glow={0.6}>
        <AbsoluteFill style={{ flexDirection: "row", alignItems: "center", padding: "0 150px", gap: 80 }}>
          <div style={{ flex: 1 }}>
            <Kicker>主界面</Kicker>
            <div style={{ height: 20 }} />
            <div style={{ fontSize: 74, fontWeight: 700, lineHeight: 1.2 }}>打开就是答案</div>
            <div style={{ height: 40 }} />
            {[
              ["圈内", "今天要上的科目"],
              ["圈下", "第几周 + 循环位置"],
              ["外圈", "本周已经过了几天"],
            ].map(([a, b], i) => (
              <div key={a} style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 24, opacity: spring({ frame: f - (20 + i * 12), fps: fpsH, config: { damping: 200, mass: 0.7, stiffness: 110 } }) }}>
                <span style={{ fontSize: 30, fontWeight: 700, color: COLORS.orange, minWidth: 90 }}>{a}</span>
                <span style={{ fontSize: 28, color: COLORS.text }}>{b}</span>
              </div>
            ))}
            <div style={{ marginTop: 30, fontSize: 26, color: COLORS.textDim, opacity: useSpring(60) }}>
              下面这圈里，每天都在自己变 ↓
            </div>
          </div>
          <div style={{ opacity: p, transform: `translateX(${(1 - p) * 70}px)` }}>
            <Phone w={360} h={742}>
              <AppHome
                s={0.92}
                weekday={WEEKDAYS[dayIdx]}
                subject={subject}
                week={cycleRow + 1}
                rawWeek={cycleRow + 1}
                cycleWeeks={3}
                dayInWeek={dayIdx + 1}
                startText="2026年8月26日"
                dateText={`2026年9月${16 + step}日`}
                swap={swap}
              />
            </Phone>
          </div>
        </AbsoluteFill>
      </Shell>
    </Fade>
  );
};

// ---------------------------------------------------------------- 6 课表演示

const SceneSchedule: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const rows = 3, cells = rows * 7;
  // 0-40%：逐格填出；40-70%：点中一格；70-100%：编辑并保存
  const reveal = Math.round(interpolate(f, [10, dur * 0.38], [0, cells], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const tapAt = dur * 0.44;
  const activeT = Math.max(0, Math.min(1, (f - tapAt) / 24));
  const editorP = useSpring(Math.round(dur * 0.55), { damping: 200, mass: 0.7, stiffness: 120 });
  const saveP = useSpring(Math.round(dur * 0.82), { damping: 200, mass: 0.6, stiffness: 140 });
  const editing = f > dur * 0.52;
  const saved = f > dur * 0.8;
  const custom = "自习";
  const typed = custom.slice(0, Math.round(custom.length * Math.max(0, Math.min(1, (f - dur * 0.62) / (dur * 0.14)))));

  const rowsData = SCHEDULE.map((r, ri) =>
    r.map((c, ci) => (ri === 0 && ci === 5 ? (saved ? custom : c) : c)),
  );

  return (
    <Fade dur={dur}>
      <Shell glow={0.55}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 34 }}>
          <Kicker>课表</Kicker>
          <div style={{ fontSize: 48, fontWeight: 700 }}>点一下格子就能改</div>
          <div style={{ display: "flex", alignItems: "center", gap: 60 }}>
            <ScheduleGrid s={1} rows={rowsData} reveal={reveal} active={{ r: 0, c: 5 }} activeT={activeT} />
            {/* 编辑弹层 */}
            <div
              style={{
                width: 340,
                padding: 26,
                borderRadius: 24,
                backgroundColor: "#fff",
                opacity: editorP,
                transform: `translateY(${(1 - editorP) * 40}px)`,
                boxShadow: "0 40px 100px rgba(0,0,0,0.5)",
              }}
            >
              <div style={{ fontSize: 15, fontWeight: 700, color: APP.orangeDeep }}>科目</div>
              <div style={{ marginTop: 16, display: "flex", gap: 10, padding: 5, borderRadius: 12, backgroundColor: "#F2F2F7" }}>
                <div style={{ flex: 1, padding: "10px 0", borderRadius: 9, textAlign: "center", fontSize: 20, fontWeight: 600, color: editing ? "#8E8E93" : "#111", backgroundColor: editing ? "transparent" : "#fff" }}>
                  无
                </div>
                <div style={{ flex: 1, padding: "10px 0", borderRadius: 9, textAlign: "center", fontSize: 20, fontWeight: 600, color: editing ? "#111" : "#8E8E93", backgroundColor: editing ? "#fff" : "transparent" }}>
                  自定义
                </div>
              </div>
              <div style={{ marginTop: 16, padding: "13px 16px", borderRadius: 12, backgroundColor: "#F7F7FA", fontSize: 22, color: "#111", minHeight: 52 }}>
                {typed || <span style={{ color: "#B0B0B8" }}>例如：自习</span>}
                {editing && !saved ? <span style={{ opacity: Math.sin(f / 3) > 0 ? 1 : 0 }}>|</span> : null}
              </div>
              <div style={{ marginTop: 18, padding: "14px 0", borderRadius: 14, textAlign: "center", fontSize: 21, fontWeight: 700, color: "#fff", backgroundColor: APP.orange, transform: `scale(${saveP * 0.06 + 0.94})` }}>
                保存
              </div>
            </div>
          </div>
          <div style={{ fontSize: 28, color: COLORS.textDim, opacity: useSpring(Math.round(dur * 0.88)) }}>
            每周目一排，今天那一格会自动描边
          </div>
        </AbsoluteFill>
      </Shell>
    </Fade>
  );
};

// ---------------------------------------------------------------- 7 小组件演示

const SceneWidget: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const step = Math.min(20, Math.floor((f / dur) * 21));
  const cycleRow = Math.floor(step / 7);
  const dayIdx = step % 7;
  const subject = SCHEDULE[cycleRow][dayIdx] || "无课";
  const p = useSpring(6, { damping: 200, mass: 0.8, stiffness: 100 });

  return (
    <Fade dur={dur}>
      <Shell glow={0.7}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 46 }}>
          <Kicker>桌面小组件</Kicker>
          <div style={{ fontSize: 66, fontWeight: 700 }}>不打开也能看到</div>
          <div style={{ display: "flex", alignItems: "center", gap: 46, opacity: p, transform: `translateY(${(1 - p) * 40}px)` }}>
            <WidgetCard size="small" w={300} weekday={WEEKDAYS[dayIdx]} subject={subject} week={cycleRow + 1} rawWeek={cycleRow + 1} cycleWeeks={3} />
            <WidgetCard size="medium" w={640} weekday={WEEKDAYS[dayIdx]} subject={subject} week={cycleRow + 1} rawWeek={cycleRow + 1} cycleWeeks={3} />
          </div>
          <div style={{ fontSize: 28, color: COLORS.textDim, opacity: useSpring(40) }}>
            小号 / 中号两种尺寸 · 和 App 里的设置自动同步
          </div>
        </AbsoluteFill>
      </Shell>
    </Fade>
  );
};

// ---------------------------------------------------------------- 8 设置联动

const SceneSettings: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const cycle = f < dur * 0.5 ? 3 : 5;
  const rows = SCHEDULE.concat([
    ["化学", "物理", "生物", "英语", "数学", "", ""],
    ["语文", "历史", "政治", "地理", "", "体育", ""],
  ]).slice(0, cycle);
  const p = useSpring(6, { damping: 200, mass: 0.8, stiffness: 100 });
  const changed = f > dur * 0.5;

  return (
    <Fade dur={dur}>
      <Shell glow={0.5}>
        <AbsoluteFill style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 80 }}>
          <div style={{ width: 420 }}>
            <Kicker>设置</Kicker>
            <div style={{ height: 20 }} />
            <div style={{ fontSize: 58, fontWeight: 700, lineHeight: 1.25 }}>改一处，全跟着变</div>
            <div style={{ height: 40 }} />
            <div style={{ backgroundColor: "#fff", borderRadius: 26, padding: 26, boxShadow: "0 30px 80px rgba(0,0,0,0.45)" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: APP.orangeDeep }}>周目循环</div>
              <div style={{ marginTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 24, color: APP.text }}>循环周数</span>
                <span style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <span style={{ fontSize: 30, fontWeight: 700, color: APP.orange, transform: `scale(${changed ? 1.15 : 1})` }}>{cycle} 周</span>
                  <span style={{ display: "flex", gap: 8 }}>
                    <span style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: "#F2F2F7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, color: "#666" }}>−</span>
                    <span style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: "#F2F2F7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, color: "#666" }}>+</span>
                  </span>
                </span>
              </div>
              <div style={{ marginTop: 16, fontSize: 16, color: APP.textDim, lineHeight: 1.5 }}>
                每 {cycle} 周循环一次。今天是开学第 4 周，按循环显示为第 {((4 - 1) % cycle) + 1} 周。
              </div>
            </div>
            <div style={{ marginTop: 24, fontSize: 24, color: COLORS.textDim, opacity: useSpring(50) }}>
              课表排数自动跟着变成 {cycle} 排 →
            </div>
          </div>
          <div style={{ opacity: p, transform: `translateX(${(1 - p) * 70}px)` }}>
            <ScheduleGrid s={0.86} rows={rows} reveal={99} />
          </div>
        </AbsoluteFill>
      </Shell>
    </Fade>
  );
};

// ---------------------------------------------------------------- 9 安装教程

const STEP_TEXT: { t: string; d: string; path: string }[] = [
  { t: "下载 IPA 安装包", d: "打开项目的 GitHub 页面，进入 Releases，下载无签名 IPA。", path: "Releases ▸ ZhouMu-1.2-unsigned.ipa" },
  { t: "准备一个自签工具", d: "手机没法直接装无签名包，需要电脑上的工具帮你签名。", path: "Sideloadly / AltStore" },
  { t: "用数据线连上 iPhone", d: "连接后在手机上点「信任此电脑」，并输入锁屏密码。", path: "iPhone 弹窗 ▸ 信任" },
  { t: "把 IPA 拖进去签名", d: "填入你的 Apple ID —— 免费账号就够了。", path: "拖入 IPA ▸ 输入 Apple ID ▸ Start" },
  { t: "在手机上信任证书", d: "不信任的话，点 App 图标会提示「未受信任的开发者」。", path: "通用 ▸ VPN与设备管理 ▸ 信任" },
  { t: "打开开发者模式", d: "iOS 16 以后必须开，开完会要求重启一次。", path: "隐私与安全性 ▸ 开发者模式" },
  { t: "打开 App，加小组件", d: "先设好开学日期和课表，然后长按桌面添加小组件。", path: "长按桌面 ▸ + ▸ 搜索「周目」" },
];

const SceneInstall: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const HEAD = 160;
  const STEP = (dur - HEAD) / 7;
  const headerP = interpolate(f, [0, HEAD], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <Fade dur={dur}>
      <Shell glow={0.45} y={30}>
        <AbsoluteFill style={{ paddingTop: 52, paddingLeft: 120, paddingRight: 120 }}>
          <div style={{ opacity: headerP - Math.max(0, (f - HEAD) / 20) * headerP, display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
            <div>
              <Kicker>安装教程</Kicker>
              <div style={{ height: 14 }} />
              <div style={{ fontSize: 58, fontWeight: 700 }}>5 分钟装到手机上</div>
            </div>
            <div style={{ fontSize: 28, color: COLORS.textFaint }}>7 步</div>
          </div>
        </AbsoluteFill>

        {STEP_TEXT.map((s, i) => {
          const from = HEAD + i * STEP;
          const local = f - from;
          if (local < 0 || local > STEP) return null;
          const Mock = MOCKS[i];
          const p = Math.min(1, local / STEP);
          return (
            <AbsoluteFill key={i} style={{ paddingTop: 46, paddingLeft: 120, paddingRight: 120 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 22, opacity: spring({ frame: local, fps, config: { damping: 14, mass: 0.6, stiffness: 150 } }) }}>
                <div style={{ width: 64, height: 64, borderRadius: 18, backgroundColor: COLORS.orange, color: "#1A0A00", fontSize: 34, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {i + 1}
                </div>
                <div style={{ fontSize: 46, fontWeight: 700 }}>{s.t}</div>
                <div style={{ marginLeft: "auto", fontSize: 26, color: COLORS.textFaint }}>
                  {i + 1} / 7
                </div>
              </div>
              <div style={{ marginTop: 14, marginLeft: 86, fontSize: 26, color: COLORS.textDim }}>{s.d}</div>
              <div style={{ marginTop: 10, marginLeft: 86, fontFamily: MONO, fontSize: 22, color: COLORS.orangeSoft }}>{s.path}</div>
              <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 6 }}>
                <Mock p={p} />
              </div>
            </AbsoluteFill>
          );
        })}

        {/* 顶部进度 */}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 5, backgroundColor: "rgba(255,255,255,0.08)" }}>
          <div style={{ width: `${Math.min(1, f / dur) * 100}%`, height: "100%", backgroundColor: COLORS.orange }} />
        </div>
      </Shell>
    </Fade>
  );
};

// ---------------------------------------------------------------- 10 结尾

const SceneEnd: React.FC<{ dur: number }> = ({ dur }) => (
  <Fade dur={dur}>
    <Shell glow={1}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        <Img src={staticFile("appicon.png")} style={{ width: 124, height: 124, borderRadius: 28, display: "block", opacity: useSpring(0) }} />
        <div style={{ height: 28 }} />
        <div style={{ fontSize: 62, fontWeight: 700, opacity: useSpring(10) }}>开源免费，随意取用</div>
        <div style={{ height: 18 }} />
        <div style={{ fontSize: 27, color: COLORS.textDim, letterSpacing: 3, opacity: useSpring(20) }}>
          不联网 · 不要账号 · 不收集任何数据
        </div>
        <div style={{ height: 50 }} />
        <div style={{ padding: "24px 44px", borderRadius: 20, backgroundColor: COLORS.bgCard, border: `1px solid ${COLORS.line}`, fontSize: 38, fontWeight: 600, color: COLORS.orange, opacity: useSpring(30) }}>
          github.com/zhoumu-app/zhoumu
        </div>
      </AbsoluteFill>
    </Shell>
  </Fade>
);

// ---------------------------------------------------------------- 时间轴

export const SCENES2 = [
  { id: "open", dur: 240, C: SceneOpen },
  { id: "pain", dur: 240, C: ScenePain },
  { id: "formula", dur: 480, C: SceneFormula },
  { id: "cycle", dur: 420, C: SceneCycle },
  { id: "home", dur: 720, C: SceneHome },
  { id: "schedule", dur: 780, C: SceneSchedule },
  { id: "widget", dur: 540, C: SceneWidget },
  { id: "settings", dur: 540, C: SceneSettings },
  { id: "install", dur: 2820, C: SceneInstall },
  { id: "end", dur: 353, C: SceneEnd },
];

export const TOTAL2 = SCENES2.reduce((a, s) => a + s.dur, 0);

export const Intro2: React.FC = () => {
  let offset = 0;
  const seqs = SCENES2.map((s) => {
    const from = offset;
    offset += s.dur;
    const C = s.C;
    return (
      <Sequence key={s.id} from={from} durationInFrames={s.dur}>
        <C dur={s.dur} />
      </Sequence>
    );
  });
  return <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>{seqs}</AbsoluteFill>;
};

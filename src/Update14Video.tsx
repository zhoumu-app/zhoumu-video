import React from "react";
import {
  AbsoluteFill, Audio, Img, Sequence, interpolate, spring,
  staticFile, useCurrentFrame, useVideoConfig,
} from "remotion";
import { COLORS, FONT, FPS } from "./theme";
import { FadeUp, Headline, Kicker, SceneShell, ScaleIn } from "./anim";

/** v1.4 更新视频：17 个场景，配 Episode 33 */
const MUSIC = "episode33.mp3";
/** 音乐 4:18（7734 帧），视频 3:43（6690 帧）——用前 3:43 并淡出 */
const TOTAL = 6690;

/** 场景表：from 是起始帧，dur 是长度 */
const S = {
  open:      { from: 0,    dur: 270 },  // 0:00  开场
  watchHero: { from: 270,  dur: 360 },  // 0:09  来了 Apple Watch
  faceCirc:  { from: 630,  dur: 390 },  // 0:21  复杂功能 · 圆形
  faceRest:  { from: 1020, dur: 450 },  // 0:34  复杂功能 · 其余三种
  watchUI:   { from: 1470, dur: 420 },  // 0:49  手表主界面
  watchSet:  { from: 1890, dur: 360 },  // 1:03  手表设置
  color:     { from: 2250, dur: 390 },  // 1:15  蓝色新配色
  tables:    { from: 2640, dur: 450 },  // 1:28  两张课表
  pages:     { from: 3090, dur: 450 },  // 2:03  首页两页
  island:    { from: 3540, dur: 450 },  // 2:18  灵动岛
  recap:     { from: 3990, dur: 360 },  // 2:33  其余功能速览
  privacy:   { from: 4350, dur: 330 },  // 2:45  不联网
  install:   { from: 4680, dur: 600 },  // 2:96  安装
  packages:  { from: 5280, dur: 420 },  // 3:26  一个 IPA 装全套
  opensrc:   { from: 5700, dur: 390 },  // 3:40  开源
  outro:     { from: 6090, dur: 300 },  // 3:53  结尾
  end:       { from: 6390, dur: 300 },  // 4:03  收尾
} as const;

// ── 通用小件 ────────────────────────────────────────────

const Caption: React.FC<{ delay: number; children: React.ReactNode }> = ({ delay, children }) => (
  <FadeUp delay={delay} distance={22}>
    <div style={{ fontSize: 27, color: COLORS.textDim, letterSpacing: 1, lineHeight: 1.5 }}>{children}</div>
  </FadeUp>
);

/** 手表截图：加一圈圆角 + 阴影，看起来像真机 */
const WatchShot: React.FC<{
  delay?: number; height?: number; glow?: boolean; src?: string;
}> = ({ delay = 0, height = 560, glow = true, src = "watch-2x.png" }) => (
  <ScaleIn delay={delay} from={0.86}>
    <div style={{
      borderRadius: height * 0.24, overflow: "hidden", lineHeight: 0,
      boxShadow: glow
        ? `0 50px 120px rgba(0,0,0,0.65), 0 0 0 1px ${COLORS.line}, 0 0 90px rgba(76,141,255,0.22)`
        : `0 50px 120px rgba(0,0,0,0.65), 0 0 0 1px ${COLORS.line}`,
    }}>
      <Img src={staticFile(src)} style={{ height, display: "block" }} />
    </div>
  </ScaleIn>
);

const BigWeek: React.FC<{ delay: number; n?: number }> = ({ delay, n = 3 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 14, stiffness: 90 } });
  return (
    <div style={{
      display: "flex", alignItems: "baseline", gap: 10,
      transform: `scale(${interpolate(s, [0, 1], [0.8, 1])})`,
      opacity: interpolate(s, [0, 1], [0, 1]),
    }}>
      <span style={{ fontSize: 46, fontWeight: 600, color: COLORS.text }}>第</span>
      <span style={{ fontSize: 150, fontWeight: 800, color: COLORS.blue, lineHeight: 1,
                     fontVariantNumeric: "tabular-nums" }}>{n}</span>
      <span style={{ fontSize: 46, fontWeight: 600, color: COLORS.text }}>周</span>
    </div>
  );
};

// ── 场景 ────────────────────────────────────────────────

/** 开场：周目 v1.4 */
const SceneOpen: React.FC<{ dur: number }> = ({ dur }) => (
  <SceneShell duration={dur} glow={1.1} glowY={46}>
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <ScaleIn delay={2} from={0.7}>
        <Img src={staticFile("appicon-dark.png")}
             style={{ width: 200, height: 200, borderRadius: 46, display: "block",
                      boxShadow: "0 30px 80px rgba(0,0,0,0.6)" }} />
      </ScaleIn>
      <div style={{ height: 44 }} />
      <Headline delay={12} size={96}>周目</Headline>
      <div style={{ height: 26 }} />
      <FadeUp delay={22} distance={24}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <span style={{ fontSize: 40, fontWeight: 800, color: "#04101F", background: COLORS.blue,
                         padding: "8px 26px", borderRadius: 14 }}>v1.4</span>
          <span style={{ fontSize: 40, fontWeight: 600, color: COLORS.text }}>来了 Apple Watch</span>
        </div>
      </FadeUp>
      <div style={{ height: 34 }} />
      <Caption delay={40}>打开就知道今天是第几周、今天上什么课</Caption>
    </AbsoluteFill>
  </SceneShell>
);

/** 主角：Apple Watch */
const SceneWatchHero: React.FC<{ dur: number }> = ({ dur }) => (
  <SceneShell duration={dur} glow={1.0} glowY={42}>
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <Kicker delay={4}>本次主角</Kicker>
      <div style={{ height: 46 }} />
      <div style={{ display: "flex", alignItems: "center", gap: 90 }}>
        <WatchShot delay={12} height={580} />
        <div style={{ width: 620 }}>
          <Headline delay={20} size={72}>抬腕就是答案</Headline>
          <div style={{ height: 30 }} />
          <FadeUp delay={34} distance={24}>
            <div style={{ fontSize: 30, color: COLORS.textDim, lineHeight: 1.6 }}>
              新增 Apple Watch 应用
              <br />
              <span style={{ color: COLORS.blueBright }}>随 iPhone 应用一起安装</span>，不用单独下
            </div>
          </FadeUp>
        </div>
      </div>
    </AbsoluteFill>
  </SceneShell>
);

/** 复杂功能：圆形 */
const SceneFaceCircular: React.FC<{ dur: number }> = ({ dur }) => (
  <SceneShell duration={dur} glow={0.9} glowY={40}>
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <Kicker delay={4}>表盘复杂功能</Kicker>
      <div style={{ height: 20 }} />
      <Headline delay={10} size={70}>表盘上直接看到第几周</Headline>
      <div style={{ height: 40 }} />
      <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
        {[3, 5, 9, 12].map((n, i) => (
          <ScaleIn key={n} delay={24 + i * 8} from={0.8}>
            <div style={{
              width: 200, height: 200, borderRadius: "50%",
              border: `12px solid ${COLORS.blueSoft}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              position: "relative", background: "rgba(76,141,255,0.06)",
            }}>
              {/* 进度弧：用 conic-gradient 近似 */}
              <div style={{
                position: "absolute", inset: -12, borderRadius: "50%",
                background: `conic-gradient(${COLORS.blue} 0turn ${(i + 1) * 0.22}turn, transparent ${(i + 1) * 0.22}turn 1turn)`,
                mask: "radial-gradient(farthest-side, transparent calc(100% - 12px), #000 calc(100% - 11px))",
                WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 12px), #000 calc(100% - 11px))",
              }} />
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 24, color: COLORS.textDim, marginBottom: 2 }}>第</div>
                <div style={{ fontSize: 62, fontWeight: 800, color: COLORS.blue, lineHeight: 1,
                              fontVariantNumeric: "tabular-nums" }}>{n}</div>
                <div style={{ fontSize: 24, color: COLORS.textDim, marginTop: 2 }}>周</div>
              </div>
            </div>
          </ScaleIn>
        ))}
      </div>
      <div style={{ height: 42 }} />
      <Caption delay={60}>圆形样式 · 进度环走到哪，这周就过到哪</Caption>
    </AbsoluteFill>
  </SceneShell>
);

/** 复杂功能：其余三种 */
const SceneFaceRest: React.FC<{ dur: number }> = ({ dur }) => {
  const rows = [
    { label: "矩形", main: "第 3 周", sub: "今天：数学" },
    { label: "行内", main: "第 3 周 · 数学", sub: "" },
    { label: "角标", main: "3", sub: "周", corner: true },
  ];
  return (
    <SceneShell duration={dur} glow={0.85} glowY={40}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        <Kicker delay={4}>四种样式随便挑</Kicker>
        <div style={{ height: 44 }} />
        <div style={{ display: "flex", alignItems: "flex-start", gap: 60 }}>
          {rows.map((r, i) => (
            <ScaleIn key={r.label} delay={16 + i * 10} from={0.84}>
              <div style={{ width: 440, textAlign: "center" }}>
                <div style={{
                  height: 168, borderRadius: 26, background: "rgba(255,255,255,0.07)",
                  border: `1px solid ${COLORS.line}`,
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 16,
                }}>
                  {r.corner ? (
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 74, fontWeight: 800, color: COLORS.blue, lineHeight: 1 }}>{r.main}</div>
                      <div style={{ fontSize: 22, color: COLORS.textDim }}>{r.sub}</div>
                    </div>
                  ) : r.sub ? (
                    <div style={{ textAlign: "left" }}>
                      <div style={{ fontSize: 36, fontWeight: 700, color: COLORS.text }}>{r.main}</div>
                      <div style={{ fontSize: 26, color: COLORS.textDim, marginTop: 4 }}>{r.sub}</div>
                    </div>
                  ) : (
                    <div style={{ fontSize: 34, fontWeight: 700, color: COLORS.text }}>{r.main}</div>
                  )}
                </div>
                <div style={{ marginTop: 20, fontSize: 30, fontWeight: 600, color: COLORS.blueBright }}>{r.label}</div>
              </div>
            </ScaleIn>
          ))}
        </div>
        <div style={{ height: 50 }} />
        <Caption delay={54}>加上圆形一共四种 · 装完在表盘上就能加</Caption>
      </AbsoluteFill>
    </SceneShell>
  );
};

/** 手表主界面 */
const SceneWatchUI: React.FC<{ dur: number }> = ({ dur }) => (
  <SceneShell duration={dur} glow={0.95} glowY={42}>
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <Kicker delay={4}>抬腕就看到</Kicker>
      <div style={{ height: 40 }} />
      <div style={{ display: "flex", alignItems: "center", gap: 90 }}>
        <WatchShot delay={10} height={600} />
        <div style={{ width: 640 }}>
          <BigWeek delay={18} n={3} />
          <div style={{ height: 36 }} />
          <FadeUp delay={32} distance={22}>
            <div style={{ fontSize: 28, color: COLORS.textDim, lineHeight: 1.7 }}>
              · 本周进度条，一眼看清过了多少
              <br />
              · 下面是今天的课，第几节、什么科目、几点上
              <br />
              · 跨零点自动重算，不用手动刷新
            </div>
          </FadeUp>
        </div>
      </div>
    </AbsoluteFill>
  </SceneShell>
);

/** 手表设置 */
const SceneWatchSet: React.FC<{ dur: number }> = ({ dur }) => {
  const items = ["开学日期", "周目循环", "今天各节的科目"];
  return (
    <SceneShell duration={dur} glow={0.8} glowY={40}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        <Headline delay={6} size={70}>手表上也能改</Headline>
        <div style={{ height: 46 }} />
        <div style={{ display: "flex", gap: 40 }}>
          {items.map((t, i) => (
            <ScaleIn key={t} delay={18 + i * 9} from={0.86}>
              <div style={{
                padding: "30px 46px", borderRadius: 22, fontSize: 34, fontWeight: 600,
                background: COLORS.bgCard, border: `1px solid ${COLORS.line}`, color: COLORS.text,
              }}>{t}</div>
            </ScaleIn>
          ))}
        </div>
        <div style={{ height: 46 }} />
        <Caption delay={48}>屏幕小，所以课表只编辑今天这一天</Caption>
      </AbsoluteFill>
    </SceneShell>
  );
};

/** 蓝色新配色 */
const SceneColor: React.FC<{ dur: number }> = ({ dur }) => (
  <SceneShell duration={dur} glow={1.0} glowY={44}>
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <Kicker delay={4}>外观</Kicker>
      <div style={{ height: 20 }} />
      <Headline delay={10} size={72}>橙色换成蓝色</Headline>
      <div style={{ height: 56 }} />
      <div style={{ display: "flex", gap: 70 }}>
        {[
          { name: "浅色", bg: "#F6F9FF", fg: "#2563EB", desc: "白底蓝调" },
          { name: "深色", bg: "#05080F", fg: "#4C8DFF", desc: "黑底蓝调" },
        ].map((t, i) => (
          <ScaleIn key={t.name} delay={20 + i * 10} from={0.86}>
            <div style={{ textAlign: "center" }}>
              <div style={{
                width: 300, height: 300, borderRadius: 40, background: t.bg,
                border: `1px solid ${COLORS.line}`, display: "flex", alignItems: "center",
                justifyContent: "center", boxShadow: "0 30px 70px rgba(0,0,0,0.5)",
              }}>
                <div style={{
                  width: 150, height: 150, borderRadius: "50%",
                  border: `16px solid ${t.fg}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 54, fontWeight: 800, color: t.fg,
                }}>周</div>
              </div>
              <div style={{ marginTop: 22, fontSize: 32, fontWeight: 700, color: COLORS.text }}>{t.name}</div>
              <div style={{ fontSize: 24, color: COLORS.textDim, marginTop: 4 }}>
                {t.desc} {t.fg}
              </div>
            </div>
          </ScaleIn>
        ))}
      </div>
      <div style={{ height: 42 }} />
      <Caption delay={54}>还有「跟随系统」· App 图标也有深浅两个版本</Caption>
    </AbsoluteFill>
  </SceneShell>
);

/** 两张课表 */
const SceneTables: React.FC<{ dur: number }> = ({ dur }) => (
  <SceneShell duration={dur} glow={0.85} glowY={40}>
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <Kicker delay={4}>课表</Kicker>
      <div style={{ height: 20 }} />
      <Headline delay={10} size={72}>正课表 + 晚课表</Headline>
      <div style={{ height: 50 }} />
      <div style={{ display: "flex", gap: 56 }}>
        {[
          { icon: "☀️", name: "正课表", desc: "固定 · 每日节数不同" },
          { icon: "🌙", name: "晚课表", desc: "按周目轮换 · 每天 1 节" },
        ].map((t, i) => (
          <ScaleIn key={t.name} delay={20 + i * 10} from={0.86}>
            <div style={{
              width: 480, padding: "40px 44px", borderRadius: 26, background: COLORS.bgCard,
              border: `1px solid ${COLORS.line}`, textAlign: "left",
            }}>
              <div style={{ fontSize: 52 }}>{t.icon}</div>
              <div style={{ marginTop: 16, fontSize: 40, fontWeight: 700, color: COLORS.text }}>{t.name}</div>
              <div style={{ marginTop: 10, fontSize: 25, color: COLORS.textDim }}>{t.desc}</div>
            </div>
          </ScaleIn>
        ))}
      </div>
      <div style={{ height: 48 }} />
      <FadeUp delay={50} distance={22}>
        <div style={{ fontSize: 28, color: COLORS.textDim, textAlign: "center", lineHeight: 1.6 }}>
          两张表互相独立：各自设每日节数、上下课时间、固定还是按周目轮换
          <br />
          <span style={{ color: COLORS.blueBright }}>也可以单独关掉其中一张</span>
        </div>
      </FadeUp>
    </AbsoluteFill>
  </SceneShell>
);

/** 首页两页 */
const ScenePages: React.FC<{ dur: number }> = ({ dur }) => (
  <SceneShell duration={dur} glow={0.9} glowY={42}>
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <Headline delay={6} size={70}>首页分两页</Headline>
      <div style={{ height: 48 }} />
      <div style={{ display: "flex", alignItems: "center", gap: 70 }}>
        {[
          { src: "home.png", cap: "第一页 · 圆环 + 三行倒计时" },
          { src: "settings.png", cap: "第二页 · 当天完整课表" },
        ].map((t, i) => (
          <ScaleIn key={t.src} delay={18 + i * 12} from={0.88}>
            <div style={{ textAlign: "center" }}>
              <Img src={staticFile(t.src)} style={{
                height: 560, display: "block", borderRadius: 34,
                boxShadow: "0 40px 100px rgba(0,0,0,0.6)", border: `1px solid ${COLORS.line}`,
              }} />
              <div style={{ marginTop: 20, fontSize: 26, color: COLORS.textDim }}>{t.cap}</div>
            </div>
          </ScaleIn>
        ))}
      </div>
    </AbsoluteFill>
  </SceneShell>
);

/** 灵动岛 */
const SceneIsland: React.FC<{ dur: number }> = ({ dur }) => (
  <SceneShell duration={dur} glow={0.95} glowY={42}>
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <Kicker delay={4}>灵动岛</Kicker>
      <div style={{ height: 20 }} />
      <Headline delay={10} size={70}>上课中，岛上有课名和倒计时</Headline>
      <div style={{ height: 54 }} />
      <ScaleIn delay={22} from={0.88}>
        <div style={{
          borderRadius: 999, background: "#000", padding: "26px 60px",
          display: "flex", alignItems: "center", gap: 90,
          boxShadow: "0 30px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.08)",
        }}>
          <span style={{ fontSize: 54 }}>📘</span>
          <span style={{ fontSize: 52, fontWeight: 700, color: COLORS.blue, fontVariantNumeric: "tabular-nums" }}>
            32:04
          </span>
        </div>
      </ScaleIn>
      <div style={{ height: 50 }} />
      <FadeUp delay={40} distance={22}>
        <div style={{ fontSize: 28, color: COLORS.textDim, textAlign: "center", lineHeight: 1.7 }}>
          上课前 5 分钟、下课前 5 分钟各提醒一次，提醒里写清下节课名
          <br />
          倒计时下方标出目标时刻（<span style={{ color: COLORS.blueBright }}>→ 21:10</span>）
          <br />
          倒计时和进度条由系统渲染，<span style={{ color: COLORS.blueBright }}>App 没在运行也不会停</span>
        </div>
      </FadeUp>
    </AbsoluteFill>
  </SceneShell>
);

/** 其余功能速览 */
const SceneRecap: React.FC<{ dur: number }> = ({ dur }) => {
  const items = ["每日节数独立可调", "每节可选填上下课时间", "固定 / 按周目轮换", "首页圆环按课程进度填充"];
  return (
    <SceneShell duration={dur} glow={0.8} glowY={40}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        <Headline delay={6} size={66}>还有一些细节</Headline>
        <div style={{ height: 52 }} />
        <div style={{ display: "flex", flexWrap: "wrap", gap: 28, width: 1200, justifyContent: "center" }}>
          {items.map((t, i) => (
            <ScaleIn key={t} delay={18 + i * 8} from={0.88}>
              <div style={{
                padding: "26px 42px", borderRadius: 20, background: COLORS.bgCard,
                border: `1px solid ${COLORS.line}`, fontSize: 32, color: COLORS.text,
              }}>{t}</div>
            </ScaleIn>
          ))}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};

/** 不联网 */
const ScenePrivacy: React.FC<{ dur: number }> = ({ dur }) => (
  <SceneShell duration={dur} glow={0.8} glowY={40}>
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <ScaleIn delay={6} from={0.6}>
        <div style={{ fontSize: 130 }}>🔒</div>
      </ScaleIn>
      <div style={{ height: 30 }} />
      <Headline delay={16} size={78}>数据不出手机</Headline>
      <div style={{ height: 32 }} />
      <FadeUp delay={30} distance={24}>
        <div style={{ fontSize: 34, color: COLORS.textDim, letterSpacing: 4 }}>
          不联网 · 不要账号 · 不收集任何数据
        </div>
      </FadeUp>
    </AbsoluteFill>
  </SceneShell>
);

/** 安装 */
const SceneInstall: React.FC<{ dur: number }> = ({ dur }) => (
  <SceneShell duration={dur} glow={0.85} glowY={40}>
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <Kicker delay={4}>安装</Kicker>
      <div style={{ height: 20 }} />
      <Headline delay={10} size={68}>下载那个 IPA 就行</Headline>
      <div style={{ height: 50 }} />
      <ScaleIn delay={22} from={0.9}>
        <div style={{
          padding: "34px 54px", borderRadius: 22, background: COLORS.bgCard,
          border: `1px solid ${COLORS.line}`, fontSize: 34, color: COLORS.blueBright,
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
        }}>github.com/zhoumu-app/zhoumu/releases</div>
      </ScaleIn>
      <div style={{ height: 44 }} />
      <FadeUp delay={42} distance={22}>
        <div style={{ fontSize: 27, color: COLORS.textDim, textAlign: "center", lineHeight: 1.8 }}>
          Sideloadly / AltStore / ESign 等自签工具都能装
          <br />
          免费 Apple ID 签的 7 天到期，重新连电脑跑一次就行，数据不丢
        </div>
      </FadeUp>
    </AbsoluteFill>
  </SceneShell>
);

/** 一个 IPA 装全套 */
const ScenePackages: React.FC<{ dur: number }> = ({ dur }) => {
  const rows = [
    ["ZhouMu.app", "iPhone 应用", 0],
    ["├─ PlugIns/ZhouMuWidget.appex", "小组件 + 灵动岛", 1],
    ["└─ Watch/ZhouMuWatch.app", "手表应用", 0],
    ["   └─ ZhouMuWatchWidget.appex", "表盘复杂功能", 1],
  ] as const;
  return (
    <SceneShell duration={dur} glow={0.8} glowY={40}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        <Headline delay={6} size={66}>一个 IPA 装全套</Headline>
        <div style={{ height: 48 }} />
        <div style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.line}`,
                      borderRadius: 24, padding: "38px 52px", minWidth: 1000 }}>
          {rows.map(([path, label, indent], i) => (
            <FadeUp key={path} delay={18 + i * 9} distance={20}>
              <div style={{ display: "flex", alignItems: "center", gap: 28,
                            paddingLeft: indent * 34, marginBottom: i < rows.length - 1 ? 20 : 0 }}>
                <span style={{ fontSize: 30, fontFamily: 'ui-monospace, Menlo, monospace',
                               color: indent ? COLORS.textDim : COLORS.text, whiteSpace: "pre" }}>{path}</span>
                <span style={{ fontSize: 26, color: COLORS.blueBright }}>{label}</span>
              </div>
            </FadeUp>
          ))}
        </div>
        <div style={{ height: 38 }} />
        <Caption delay={60}>手表应用随 iPhone 应用一起安装，不用单独下</Caption>
      </AbsoluteFill>
    </SceneShell>
  );
};

/** 开源 */
const SceneOpenSource: React.FC<{ dur: number }> = ({ dur }) => (
  <SceneShell duration={dur} glow={0.85} glowY={40}>
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <Headline delay={6} size={76}>开源免费</Headline>
      <div style={{ height: 40 }} />
      <FadeUp delay={20} distance={22}>
        <div style={{ fontSize: 36, color: COLORS.blueBright,
                      fontFamily: 'ui-monospace, Menlo, monospace' }}>
          github.com/zhoumu-app
        </div>
      </FadeUp>
      <div style={{ height: 40 }} />
      <Caption delay={36}>MIT 协议 · 代码全在 · 想改哪里都行</Caption>
    </AbsoluteFill>
  </SceneShell>
);

/** 结尾 */
const SceneOutro: React.FC<{ dur: number }> = ({ dur }) => (
  <SceneShell duration={dur} glow={1.05} glowY={44}>
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <ScaleIn delay={4} from={0.8}>
        <Img src={staticFile("appicon-dark.png")}
             style={{ width: 160, height: 160, borderRadius: 38, display: "block",
                      boxShadow: "0 30px 80px rgba(0,0,0,0.6)" }} />
      </ScaleIn>
      <div style={{ height: 36 }} />
      <Headline delay={14} size={82}>周目 v1.4</Headline>
      <div style={{ height: 24 }} />
      <FadeUp delay={26} distance={22}>
        <div style={{ fontSize: 32, color: COLORS.textDim }}>抬腕就知道今天第几周</div>
      </FadeUp>
    </AbsoluteFill>
  </SceneShell>
);

/** 收尾：慢慢淡出 */
const SceneEnd: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [0, 40, dur - 60, dur], [0, 1, 1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ background: COLORS.bg, justifyContent: "center", alignItems: "center",
                           opacity: o }}>
      <div style={{ fontSize: 40, color: COLORS.textFaint, letterSpacing: 8 }}>周目 · ZHŌUMÙ</div>
    </AbsoluteFill>
  );
};

// ── 主组件 ──────────────────────────────────────────────

const SCENE_MAP: [keyof typeof S, React.FC<{ dur: number }>][] = [
  ["open", SceneOpen],
  ["watchHero", SceneWatchHero],
  ["faceCirc", SceneFaceCircular],
  ["faceRest", SceneFaceRest],
  ["watchUI", SceneWatchUI],
  ["watchSet", SceneWatchSet],
  ["color", SceneColor],
  ["tables", SceneTables],
  ["pages", ScenePages],
  ["island", SceneIsland],
  ["recap", SceneRecap],
  ["privacy", ScenePrivacy],
  ["install", SceneInstall],
  ["packages", ScenePackages],
  ["opensrc", SceneOpenSource],
  ["outro", SceneOutro],
  ["end", SceneEnd],
];

export const Update14Video: React.FC = () => (
  <>
    {/* 音乐：前 1 秒淡入，最后 3 秒淡出（视频比整首歌短，不能硬切） */}
    <Audio
      src={staticFile(MUSIC)}
      volume={(f) =>
        interpolate(f, [0, 30, TOTAL - 90, TOTAL], [0, 1, 1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      }
    />
    {SCENE_MAP.map(([key, Comp]) => {
      const { from, dur } = S[key];
      return (
        <Sequence key={key} from={from} durationInFrames={dur} name={key}>
          <Comp dur={dur} />
        </Sequence>
      );
    })}
  </>
);

export const UPDATE14_TOTAL = TOTAL;

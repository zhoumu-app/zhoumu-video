import React from "react";
import {
  AbsoluteFill, Audio, Img, Sequence, interpolate, spring,
  staticFile, useCurrentFrame, useVideoConfig,
} from "remotion";
import { COLORS, FONT, FPS } from "./theme";
import { FadeUp, Headline, Kicker, SceneShell, ScaleIn } from "./anim";

const MUSIC = "episode33.mp3";

const S = {
  open:      { from: 0,    dur: 270 },
  week:      { from: 270,  dur: 360 },
  tables:    { from: 630,  dur: 420 },
  editor:    { from: 1050, dur: 390 },
  pages:     { from: 1440, dur: 390 },
  widget:    { from: 1830, dur: 390 },
  remind:    { from: 2220, dur: 420 },
  privacy:   { from: 2640, dur: 300 },
  install:   { from: 2940, dur: 450 },
  outro:     { from: 3390, dur: 300 },
} as const;

const TOTAL = 3690;   // 2 分 03 秒

/** 手机截图外壳：把 1080×2400 的截图裁成圆角卡片 */
const PhoneShot: React.FC<{ src: string; height: number; delay?: number }> = ({ src, height, delay = 0 }) => (
  <ScaleIn delay={delay} from={0.88}>
    <div style={{
      height, aspectRatio: "9 / 16", overflow: "hidden", borderRadius: height * 0.09,
      border: `1px solid ${COLORS.line}`, boxShadow: "0 40px 100px rgba(0,0,0,0.65)",
      background: "#fff", lineHeight: 0,
    }}>
      <Img src={staticFile(src)} style={{ width: "100%", display: "block" }} />
    </div>
  </ScaleIn>
);

/** 画一个圆环（和 App 里那个一致） */
const Ring: React.FC<{ progress: number; size?: number }> = ({ progress, size = 300 }) => (
  <div style={{
    width: size, height: size, borderRadius: "50%",
    background: `conic-gradient(${COLORS.blue} 0turn ${progress}turn, ${COLORS.blueDeep}22 ${progress}turn 1turn)`,
    display: "flex", alignItems: "center", justifyContent: "center",
  }}>
    <div style={{
      width: size - 44, height: size - 44, borderRadius: "50%",
      background: COLORS.bg, display: "flex", alignItems: "center",
      justifyContent: "center", flexDirection: "column",
    }}>
      <div style={{ fontSize: size * 0.09, color: COLORS.textDim }}>周六</div>
      <div style={{ fontSize: size * 0.22, fontWeight: 800, color: COLORS.blue }}>数学</div>
    </div>
  </div>
);

/** 开场 */
const SceneOpen: React.FC<{ dur: number }> = ({ dur }) => (
  <SceneShell duration={dur} glow={1.1} glowY={46}>
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <ScaleIn delay={2} from={0.7}>
        <Img src={staticFile("appicon-dark.png")}
             style={{ width: 190, height: 190, borderRadius: 44, display: "block",
                      boxShadow: "0 30px 80px rgba(0,0,0,0.6)" }} />
      </ScaleIn>
      <div style={{ height: 40 }} />
      <FadeUp delay={12} distance={24}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
          <span style={{ fontSize: 92, fontWeight: 800, color: COLORS.text, letterSpacing: 3 }}>周目</span>
          <span style={{ fontSize: 46, fontWeight: 700, color: "#3DDC84" }}>Android 版</span>
        </div>
      </FadeUp>
      <div style={{ height: 24 }} />
      <FadeUp delay={24} distance={22}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <span style={{ fontSize: 34, fontWeight: 800, color: "#04101F", background: COLORS.blue,
                         padding: "7px 24px", borderRadius: 13 }}>v1.5</span>
          <span style={{ fontSize: 34, fontWeight: 600, color: COLORS.text }}>第一个版本</span>
        </div>
      </FadeUp>
      <div style={{ height: 30 }} />
      <FadeUp delay={40} distance={20}>
        <div style={{ fontSize: 26, color: COLORS.textDim }}>打开就知道今天是第几周、今天上什么课</div>
      </FadeUp>
    </AbsoluteFill>
  </SceneShell>
);

/** 周目 */
const SceneWeek: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - 20, fps, config: { damping: 20, stiffness: 60 } });
  return (
    <SceneShell duration={dur} glow={1.0} glowY={42}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        <Kicker delay={4}>周目</Kicker>
        <div style={{ height: 40 }} />
        <div style={{ display: "flex", alignItems: "center", gap: 80 }}>
          <Ring progress={interpolate(p, [0, 1], [0, 0.74])} size={330} />
          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
              <span style={{ fontSize: 44, color: COLORS.text }}>第</span>
              <span style={{ fontSize: 130, fontWeight: 800, color: COLORS.blue, lineHeight: 1 }}>3</span>
              <span style={{ fontSize: 44, color: COLORS.text }}>周</span>
            </div>
            <div style={{ marginTop: 14, fontSize: 26, color: COLORS.textDim }}>开学第 3 周 · 3 周循环</div>
            <div style={{ marginTop: 34, fontSize: 28, color: COLORS.textDim, lineHeight: 1.6 }}>
              按开学日期算，支持 N 周循环
              <br />
              <span style={{ color: COLORS.blueBright }}>圆环按课程完成进度填充</span>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};

/** 两张课表 */
const SceneTables: React.FC<{ dur: number }> = ({ dur }) => (
  <SceneShell duration={dur} glow={0.85} glowY={40}>
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <Headline delay={6} size={68}>正课表 + 晚课表</Headline>
      <div style={{ height: 48 }} />
      <div style={{ display: "flex", gap: 50 }}>
        {[
          { icon: "☀️", name: "正课表", desc: "固定 · 每日节数不同" },
          { icon: "🌙", name: "晚课表", desc: "按周目轮换 · 每天 1 节" },
        ].map((t, i) => (
          <ScaleIn key={t.name} delay={18 + i * 10} from={0.86}>
            <div style={{
              width: 470, padding: "38px 42px", borderRadius: 26, background: COLORS.bgCard,
              border: `1px solid ${COLORS.line}`,
            }}>
              <div style={{ fontSize: 50 }}>{t.icon}</div>
              <div style={{ marginTop: 14, fontSize: 38, fontWeight: 700, color: COLORS.text }}>{t.name}</div>
              <div style={{ marginTop: 8, fontSize: 24, color: COLORS.textDim }}>{t.desc}</div>
            </div>
          </ScaleIn>
        ))}
      </div>
      <div style={{ height: 46 }} />
      <FadeUp delay={46} distance={22}>
        <div style={{ fontSize: 26, color: COLORS.textDim }}>两张表互相独立，也可以单独关掉其中一张</div>
      </FadeUp>
    </AbsoluteFill>
  </SceneShell>
);

/** 每日节数 + 时间 */
const SceneEditor: React.FC<{ dur: number }> = ({ dur }) => (
  <SceneShell duration={dur} glow={0.85} glowY={40}>
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <Headline delay={6} size={66}>课表自己定</Headline>
      <div style={{ height: 46 }} />
      <div style={{ display: "flex", gap: 40, alignItems: "center" }}>
        <PhoneShot src="android-s1.png" height={520} delay={16} />
        <div style={{ width: 560 }}>
          {[
            "每天节数可以不一样（1–12 节）",
            "加减控件上直接显示是几节",
            "每节可选填上下课时间",
            "时间支持「统一 / 每天单独」",
          ].map((t, i) => (
            <FadeUp key={t} delay={26 + i * 9} distance={20}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
                <span style={{ color: COLORS.blue, fontSize: 24 }}>·</span>
                <span style={{ fontSize: 27, color: COLORS.text }}>{t}</span>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  </SceneShell>
);

/** 首页两页 */
const ScenePages: React.FC<{ dur: number }> = ({ dur }) => (
  <SceneShell duration={dur} glow={0.9} glowY={42}>
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <Headline delay={6} size={66}>首页分两页</Headline>
      <div style={{ height: 44 }} />
      <div style={{ display: "flex", gap: 120 }}>
        {[
          { t: "第一页", d: "圆环 + 三行倒计时" },
          { t: "第二页", d: "当天完整课表" },
        ].map((x, i) => (
          <ScaleIn key={x.t} delay={18 + i * 12} from={0.88}>
            <div style={{ textAlign: "center" }}>
              <div style={{
                width: 150, height: 150, borderRadius: 34, background: COLORS.bgCard,
                border: `1px solid ${COLORS.line}`, display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: 56, margin: "0 auto",
              }}>{i === 0 ? "◯" : "☰"}</div>
              <div style={{ marginTop: 20, fontSize: 30, fontWeight: 700, color: COLORS.text }}>{x.t}</div>
              <div style={{ marginTop: 6, fontSize: 22, color: COLORS.textDim }}>{x.d}</div>
            </div>
          </ScaleIn>
        ))}
      </div>
      <div style={{ height: 46 }} />
      <FadeUp delay={46} distance={22}>
        <div style={{ fontSize: 25, color: COLORS.textDim }}>当前那节标「进行中」，一眼看到上到哪了</div>
      </FadeUp>
    </AbsoluteFill>
  </SceneShell>
);

/** 桌面小组件 */
const SceneWidget: React.FC<{ dur: number }> = ({ dur }) => (
  <SceneShell duration={dur} glow={0.9} glowY={42}>
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <Kicker delay={4}>桌面小组件</Kicker>
      <div style={{ height: 36 }} />
      <ScaleIn delay={14} from={0.86}>
        <Img src={staticFile("android-widget.png")}
             style={{ width: 620, display: "block", borderRadius: 30,
                      boxShadow: "0 40px 100px rgba(0,0,0,0.6)" }} />
      </ScaleIn>
      <div style={{ height: 44 }} />
      <FadeUp delay={32} distance={22}>
        <div style={{ fontSize: 27, color: COLORS.textDim }}>不打开 App，桌面上就能看到第几周和今天的课</div>
      </FadeUp>
    </AbsoluteFill>
  </SceneShell>
);

/** 上下课提醒 */
const SceneRemind: React.FC<{ dur: number }> = ({ dur }) => (
  <SceneShell duration={dur} glow={0.9} glowY={42}>
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <Kicker delay={4}>上下课提醒</Kicker>
      <div style={{ height: 36 }} />
      <div style={{ display: "flex", alignItems: "center", gap: 70 }}>
        <PhoneShot src="android-s2.png" height={520} delay={14} />
        <div style={{ width: 520 }}>
          <FadeUp delay={24} distance={20}>
            <div style={{ fontSize: 34, fontWeight: 700, color: COLORS.text, lineHeight: 1.5 }}>
              上课前、下课前
              <br />
              <span style={{ color: COLORS.blueBright }}>各提醒一次</span>
            </div>
          </FadeUp>
          <div style={{ height: 28 }} />
          <FadeUp delay={38} distance={20}>
            <div style={{ fontSize: 25, color: COLORS.textDim, lineHeight: 1.7 }}>
              用系统精确闹钟
              <br />
              App 没开着也会响
              <br />
              提醒里写清科目和还剩多久
            </div>
          </FadeUp>
        </div>
      </div>
    </AbsoluteFill>
  </SceneShell>
);

/** 不联网 */
const ScenePrivacy: React.FC<{ dur: number }> = ({ dur }) => (
  <SceneShell duration={dur} glow={0.85} glowY={40}>
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <ScaleIn delay={6} from={0.6}>
        <div style={{ fontSize: 120 }}>🔒</div>
      </ScaleIn>
      <div style={{ height: 26 }} />
      <Headline delay={16} size={74}>数据不出手机</Headline>
      <div style={{ height: 30 }} />
      <FadeUp delay={30} distance={22}>
        <div style={{ fontSize: 32, color: COLORS.textDim, letterSpacing: 3 }}>
          不联网 · 不要账号 · 不收集数据
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
      <div style={{ height: 24 }} />
      <Headline delay={10} size={64}>下个 APK 就行</Headline>
      <div style={{ height: 46 }} />
      <ScaleIn delay={22} from={0.9}>
        <div style={{
          padding: "32px 50px", borderRadius: 22, background: COLORS.bgCard,
          border: `1px solid ${COLORS.line}`, fontSize: 32, color: COLORS.blueBright,
          fontFamily: "ui-monospace, Menlo, monospace",
        }}>github.com/zhoumu-app/zhoumu-android</div>
      </ScaleIn>
      <div style={{ height: 40 }} />
      <FadeUp delay={40} distance={20}>
        <div style={{ fontSize: 25, color: COLORS.textDim, textAlign: "center", lineHeight: 1.7 }}>
          已经签好名了，不需要自签
          <br />
          需要 Android 8.0 或更高 · 开源免费（MIT）
        </div>
      </FadeUp>
    </AbsoluteFill>
  </SceneShell>
);

/** 结尾 */
const SceneOutro: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [0, 30, dur - 60, dur], [0, 1, 1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  return (
    <SceneShell duration={dur} glow={1.05} glowY={44}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", opacity: o }}>
        <Img src={staticFile("appicon-dark.png")}
             style={{ width: 150, height: 150, borderRadius: 36, display: "block",
                      boxShadow: "0 30px 80px rgba(0,0,0,0.6)" }} />
        <div style={{ height: 32 }} />
        <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
          <span style={{ fontSize: 68, fontWeight: 800, color: COLORS.text }}>周目</span>
          <span style={{ fontSize: 34, fontWeight: 700, color: "#3DDC84" }}>Android 版</span>
        </div>
        <div style={{ height: 18 }} />
        <div style={{ fontSize: 26, color: COLORS.textFaint, letterSpacing: 4 }}>打开就知道今天第几周</div>
      </AbsoluteFill>
    </SceneShell>
  );
};

const MAP: [keyof typeof S, React.FC<{ dur: number }>][] = [
  ["open", SceneOpen], ["week", SceneWeek], ["tables", SceneTables], ["editor", SceneEditor],
  ["pages", ScenePages], ["widget", SceneWidget], ["remind", SceneRemind],
  ["privacy", ScenePrivacy], ["install", SceneInstall], ["outro", SceneOutro],
];

export const AndroidVideo: React.FC = () => (
  <>
    {/* 音乐：前 1 秒淡入，最后 3 秒淡出 */}
    <Audio
      src={staticFile(MUSIC)}
      volume={(f) =>
        interpolate(f, [0, 30, TOTAL - 90, TOTAL], [0, 1, 1, 0], {
          extrapolateLeft: "clamp", extrapolateRight: "clamp",
        })
      }
    />
    {MAP.map(([key, Comp]) => {
      const { from, dur } = S[key];
      return (
        <Sequence key={key} from={from} durationInFrames={dur} name={key}>
          <Comp dur={dur} />
        </Sequence>
      );
    })}
  </>
);

export const ANDROID_TOTAL = TOTAL;

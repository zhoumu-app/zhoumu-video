// 视觉设计系统：v1.4 起 App 换成蓝色系，视频也跟着换。
//
// 背景仍是近黑，让白色的 App 截图和手表截屏"跳"出来。
// 注意：下面 orange* 这些键名是 v1.3 之前留下的，值已经换成蓝色，
// 目的是不改动已有场景的代码就能整体换色。
export const COLORS = {
  /** 背景：近黑，带一点点冷的蓝调 */
  bg: "#05080F",
  bgCard: "#101827",
  bgCardSoft: "#17253D",

  /** 文字 */
  text: "#E8F0FF",
  textDim: "#8296B4",
  textFaint: "#55688A",

  /** 主色（键名沿用 orange，值是 App 现在的蓝） */
  orange: "#4C8DFF",
  orangeBright: "#86B4FF",
  orangeDeep: "#1D4ED8",
  orangeSoft: "#17253D",

  /** 更直白的别名，新代码建议用这些 */
  blue: "#4C8DFF",
  blueBright: "#86B4FF",
  blueDeep: "#1D4ED8",
  blueSoft: "#17253D",

  white: "#FFFFFF",
  line: "rgba(76,141,255,0.18)",
};

/** macOS 上会解析成 SF Pro / PingFang SC，最接近苹果发布会的观感 */
export const FONT =
  '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro SC", "PingFang SC", "Helvetica Neue", "Microsoft YaHei", sans-serif';

/** 时间轴：30fps，全部以帧为单位 */
export const FPS = 30;

export const SCENES = {
  intro: { from: 0, dur: 165 },
  problem: { from: 165, dur: 225 },
  home: { from: 390, dur: 285 },
  schedule: { from: 675, dur: 285 },
  widget: { from: 960, dur: 225 },
  install: { from: 1185, dur: 1260 },
  outro: { from: 2445, dur: 255 },
} as const;

export const TOTAL_FRAMES = SCENES.outro.from + SCENES.outro.dur; // 2700 帧 = 90 秒

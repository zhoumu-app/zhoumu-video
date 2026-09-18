import React from "react";
import { AbsoluteFill, interpolate, Sequence, useCurrentFrame } from "remotion";
import { Beat, BeatView, Counter, Ctx, Progress } from "./beats";
import { Shell } from "./anim";
import { TOTAL } from "./theme";

/** 每段之间的淡入淡出，短促一点更"快" */
const useBeatFade = (dur: number, fade = 7) => {
  const f = useCurrentFrame();
  return interpolate(f, [0, fade, dur - fade, dur], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
};

const BEATS: Beat[] = [
  { t: "title", dur: 200, kicker: "BEHIND THE SCENES", text: "幕后", sub: "一个 App 从想法到开源" },
  { t: "quote", dur: 170, text: "每次开学，都要数一遍今天是第几周", hi: "数一遍" },
  { t: "code", dur: 230, title: "周目怎么算", lines: [
      "距开学天数 = 今天 − 开学日期",
      "rawWeek    = 天数 ÷ 7 + 1",
      "显示周目    = (rawWeek − 1) mod 循环周数 + 1",
    ], hi: [2] },
  { t: "stat", dur: 200, items: [
      { n: "4", l: "开学第 4 周" },
      { n: "3", l: "循环 3 周" },
      { n: "1", l: "显示第 1 周" },
    ] },
  { t: "title", dur: 160, kicker: "INTERFACE", text: "界面", sub: "橙白极简，只有一屏" },
  { t: "shot", dur: 230, src: "home.png", caption: "圈内是今天要上的科目，圈下是第几周" },
  { t: "list", dur: 220, title: "三个设计决定", items: [
      "课表按周目排：N 排 × 周一至周日",
      "每格只有「无」和「自定义」两个选项",
      "小组件优先读共享容器，读不到就回退",
    ] },
  { t: "title", dur: 140, kicker: "SCHEDULE", text: "课表" },
  { t: "shot", dur: 230, src: "settings.png", caption: "N 排 = 循环周数，今天那一格自动描边" },
  { t: "list", dur: 200, title: "课表怎么对应", items: [
      "今天显示第几周 → 用第几排",
      "今天是周几 → 用那一排的第几格",
      "开学第 4 周 → 循环回第 1 排",
    ] },
  { t: "title", dur: 140, kicker: "WIDGET", text: "小组件" },
  { t: "shot", dur: 230, src: "widgets-home.jpg", caption: "不打开 App 也能看到", wide: true },
  { t: "title", dur: 140, kicker: "THE HARD PART", text: "最难的一步", sub: "App Group 到底能不能用免费账号签" },
  { t: "code", dur: 230, title: "在副本里做实验", lines: [
      "cp -R 工程 副本/",
      "给两个 target 加 entitlements",
      "xcodebuild -allowProvisioningUpdates",
    ], hi: [2] },
  { t: "code", dur: 250, title: "描述文件给出的答案", lines: [
      "IsXcodeManaged      = True",
      "LocalProvision      = True",
      "application-groups  = [group.com.zhoumu.weekdisplay]",
    ], hi: [2] },
  { t: "quote", dur: 200, text: "我一开始的结论是：免费账号不支持 App Groups", hi: "不支持" },
  { t: "quote", dur: 230, text: "结果是我自己的验证脚本写错了 —— plutil 把点当成了层级分隔符", hi: "写错了" },
  { t: "title", dur: 140, kicker: "BUGS", text: "踩过的坑" },
  { t: "list", dur: 230, title: "坑 1 / 2", tone: "fix", items: [
      "DatePicker 在启动瞬间自动展开，把日期回写成当月 1 号",
      "首次启动标记没落盘，导致每次启动都弹设置页",
    ] },
  { t: "list", dur: 230, title: "坑 3 / 4", tone: "fix", items: [
      "双击 .sh 脚本，终端会话秒退，看不到任何输出",
      "离屏渲染不会自动加 WidgetKit 的 16pt 内容边距",
    ] },
  { t: "list", dur: 230, title: "坑 5 / 6", tone: "fix", items: [
      "模拟器没有触摸注入，加不了桌面小组件",
      "命令行注册 App Group，需要团队先写进 TargetAttributes",
    ] },
  { t: "title", dur: 140, kicker: "TESTS", text: "怎么保证不写错" },
  { t: "stat", dur: 200, items: [
      { n: "97", l: "逻辑断言" },
      { n: "0", l: "需要真机" },
      { n: "2", l: "渲染校验脚本" },
    ] },
  { t: "shot", dur: 230, src: "widget-medium.png", caption: "离屏渲染：不用模拟器也能逐帧检查排版", wide: true },
  { t: "title", dur: 140, kicker: "SHIP", text: "发布" },
  { t: "list", dur: 200, title: "发布清单", items: [
      "GitHub 仓库：源码 + 图文安装说明",
      "Release 附件：打包好的 IPA",
      "MIT 协议：随便用、随便改",
    ] },
  { t: "stat", dur: 170, items: [
      { n: "42", l: "仓库文件" },
      { n: "6", l: "次提交" },
      { n: "5610", l: "本片帧数" },
    ] },
  { t: "title", dur: 300, kicker: "周目", text: "开源免费", sub: "github.com/zhoumu-app/zhoumu" },
];

const BeatScene: React.FC<{ b: Beat; ctx: Ctx }> = ({ b, ctx }) => {
  const opacity = useBeatFade(b.dur);
  return (
    <Shell>
      <AbsoluteFill style={{ opacity }}>
        <BeatView b={b} />
        <Counter {...ctx} />
      </AbsoluteFill>
      <Progress {...ctx} />
    </Shell>
  );
};

export const BTS: React.FC = () => {
  let offset = 0;
  const seqs = BEATS.map((b, i) => {
    const from = offset;
    offset += b.dur;
    const ctx: Ctx = { offset: from, total: TOTAL, index: i, count: BEATS.length };
    return (
      <Sequence key={i} from={from} durationInFrames={b.dur}>
        <BeatScene b={b} ctx={ctx} />
      </Sequence>
    );
  });
  return <AbsoluteFill style={{ backgroundColor: "#05070E" }}>{seqs}</AbsoluteFill>;
};

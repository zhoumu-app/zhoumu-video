import React from "react";
import { Composition, Sequence } from "remotion";
import { FPS, SCENES, TOTAL_FRAMES } from "./theme";
import { Intro } from "./scenes/Intro";
import { Problem } from "./scenes/Problem";
import { FeatureHome } from "./scenes/FeatureHome";
import { FeatureSchedule } from "./scenes/FeatureSchedule";
import { FeatureWidget } from "./scenes/FeatureWidget";
import { Install } from "./scenes/Install";
import { Outro } from "./scenes/Outro";
import { Cover } from "./Cover";
import { BTS } from "./bts/BTS";
import { BtsCover } from "./bts/Cover";
import { Update13 } from "./Update13";
import { Update14 } from "./Update14";
import { Update14Video, UPDATE14_TOTAL } from "./Update14Video";
import { Cover14 } from "./Cover14";
import { Update15 } from "./Update15";
import { Avatar } from "./Avatar";
import { Intro2, TOTAL2 } from "./intro2/Intro2";
import { TOTAL as BTS_TOTAL } from "./bts/theme";

/** 整支片子：7 个场景按时间轴顺序拼接 */
const ZhoumuIntro: React.FC = () => {
  return (
    <>
      <Sequence from={SCENES.intro.from} durationInFrames={SCENES.intro.dur}>
        <Intro duration={SCENES.intro.dur} />
      </Sequence>

      <Sequence from={SCENES.problem.from} durationInFrames={SCENES.problem.dur}>
        <Problem duration={SCENES.problem.dur} />
      </Sequence>

      <Sequence from={SCENES.home.from} durationInFrames={SCENES.home.dur}>
        <FeatureHome duration={SCENES.home.dur} />
      </Sequence>

      <Sequence
        from={SCENES.schedule.from}
        durationInFrames={SCENES.schedule.dur}
      >
        <FeatureSchedule duration={SCENES.schedule.dur} />
      </Sequence>

      <Sequence from={SCENES.widget.from} durationInFrames={SCENES.widget.dur}>
        <FeatureWidget duration={SCENES.widget.dur} />
      </Sequence>

      <Sequence from={SCENES.install.from} durationInFrames={SCENES.install.dur}>
        <Install duration={SCENES.install.dur} />
      </Sequence>

      <Sequence from={SCENES.outro.from} durationInFrames={SCENES.outro.dur}>
        <Outro duration={SCENES.outro.dur} />
      </Sequence>
    </>
  );
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ZhoumuIntro"
        component={ZhoumuIntro}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={1920}
        height={1080}
      />
      {/* 幕后视频：187 秒，配 SLOW MOTION (CASTLE. Remix) 整首 */}
      <Composition
        id="ZhoumuBTS"
        component={BTS}
        durationInFrames={BTS_TOTAL}
        fps={FPS}
        width={1920}
        height={1080}
      />
      {/* 加长版介绍片：238 秒，配 The Darkness That You Fear 整首 */}
      <Composition id="ZhoumuIntroFull" component={Intro2}
        durationInFrames={TOTAL2} fps={FPS} width={1920} height={1080} />
      {/* 账号头像（方形原图）与圆形裁切预览 */}
      <Composition id="AvatarSquare" component={Avatar} durationInFrames={1}
        fps={FPS} width={1024} height={1024} />
      <Composition id="AvatarCircle" component={Avatar} durationInFrames={1}
        fps={FPS} width={1024} height={1024} defaultProps={{ clip: true }} />
      {/* v1.4 更新视频：1920×1080，3 分 43 秒，配 Episode 33 */}
      <Composition
        id="ZhoumuUpdate14Video"
        component={Update14Video}
        durationInFrames={UPDATE14_TOTAL}
        fps={FPS}
        width={1920}
        height={1080}
      />
      {/* v1.5 更新公告图 */}
      <Composition
        id="ZhoumuUpdate15"
        component={Update15}
        durationInFrames={1}
        fps={FPS}
        width={1080}
        height={1005}
      />
      {/* B 站封面：1146×717 */}
      <Composition
        id="ZhoumuCover14"
        component={Cover14}
        durationInFrames={1}
        fps={FPS}
        width={1146}
        height={717}
      />
      {/* v1.4 更新公告图 */}
      <Composition id="ZhoumuUpdate14" component={Update14}
        durationInFrames={1} fps={FPS} width={1080} height={1265} />
      {/* v1.3 更新公告图 */}
      <Composition id="ZhoumuUpdate13" component={Update13}
        durationInFrames={1} fps={FPS} width={1080} height={1500} />
      {/* 幕后篇的 B 站封面 */}
      <Composition
        id="ZhoumuBtsCover"
        component={BtsCover}
        durationInFrames={1}
        fps={FPS}
        width={1920}
        height={1080}
      />
      {/* B 站封面，单独渲染一张静态图 */}
      <Composition
        id="ZhoumuCover"
        component={Cover}
        durationInFrames={1}
        fps={FPS}
        width={1920}
        height={1080}
      />
    </>
  );
};

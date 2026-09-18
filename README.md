# 周目 · 宣传视频工程

用 [Remotion](https://remotion.dev)（React 写视频）生成周目的更新视频、B 站封面和更新公告图。

## 生成的东西

| Composition | 内容 |
| --- | --- |
| `ZhoumuUpdate14Video` | v1.4 更新视频（1920×1080，3 分 43 秒） |
| `ZhoumuCover14` | B 站封面（1146×717） |
| `ZhoumuUpdate15` | v1.5 更新公告图（1080×1005） |
| `ZhoumuUpdate14` | v1.4 更新公告图（1080×1265） |
| `ZhoumuIntro` | 90 秒介绍片 |
| `ZhoumuIntroFull` | 加长版介绍片 |
| `ZhoumuBTS` | 幕后篇 |
| `AvatarSquare` / `AvatarCircle` | 账号头像 |

## 用法

```bash
npm install

# 列出现在有哪些 composition
npx remotion compositions

# 渲一张静态图
npx remotion still ZhoumuUpdate15 out/update-1.5.png

# 渲视频
npx remotion render ZhoumuUpdate14Video out/zhoumu-v1.4-update.mp4

# 可视化编辑器，逐帧调
npx remotion studio
```

## 关于背景音乐

**仓库里没有音乐文件**（版权原因）。渲染带声音的视频时，需要自己准备音乐放到项目根目录，
文件名要和 `src/` 里 `staticFile()` 引用的对上（比如 `Episode 33.mp3`）。

渲染出来的 MP4 已经带了音轨，可以直接发。

## 配色

`src/theme.ts` 是全局配色。注意里面 `orange*` 这些键名是历史遗留的——
v1.4 之后 App 换成蓝色系了，**键名没改但值是蓝的**，这样老场景不用动代码就能整体换色。

## 结构

```
src/
  theme.ts            全局配色（键名 orange*，值是蓝）
  anim.tsx            动效工具（SceneShell / Kicker / Headline / FadeUp …）
  Update14Video.tsx   v1.4 更新视频（17 个场景）
  Update13.tsx        v1.3 更新公告图
  Update14.tsx        v1.4 更新公告图
  Update15.tsx        v1.5 更新公告图
  Cover14.tsx         B 站封面
  intro2/             加长版介绍片
  bts/                幕后篇
  scenes/             90 秒介绍片的各个场景
public/               截图、图标等素材
```

## 许可证

[MIT](LICENSE)

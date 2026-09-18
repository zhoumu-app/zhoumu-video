import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C, MONO } from "./theme";
import { Kicker, Pop, Rise, Shot, Slide, usePop } from "./anim";

export type Beat =
  | { t: "title"; dur: number; kicker: string; text: string; sub?: string }
  | { t: "quote"; dur: number; text: string; hi?: string }
  | { t: "code"; dur: number; title: string; lines: string[]; hi?: number[] }
  | { t: "stat"; dur: number; items: { n: string; l: string }[] }
  | { t: "list"; dur: number; title: string; items: string[]; tone?: "fix" }
  | { t: "shot"; dur: number; src: string; caption: string; wide?: boolean };

export type Ctx = { offset: number; total: number; index: number; count: number };

/** 底部进度条：长视频需要一点"在推进"的感觉 */
export const Progress: React.FC<Ctx> = ({ offset, total }) => {
  const f = useCurrentFrame();
  const p = Math.min(1, Math.max(0, (offset + f) / total));
  return (
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 5, backgroundColor: "rgba(125,211,252,0.10)" }}>
      <div style={{ width: `${p * 100}%`, height: "100%", backgroundColor: C.blue }} />
    </div>
  );
};

export const Counter: React.FC<Ctx> = ({ index, count }) => (
  <div style={{ position: "absolute", right: 56, bottom: 34, fontFamily: MONO, fontSize: 22, letterSpacing: 2, color: C.textFaint }}>
    {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
  </div>
);

const TitleBeat: React.FC<{ b: Extract<Beat, { t: "title" }> }> = ({ b }) => {
  const lineW = usePop(10, { damping: 200, mass: 0.5, stiffness: 90 });
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <Rise delay={0} y={20}><Kicker>{b.kicker}</Kicker></Rise>
      <div style={{ height: 26 }} />
      <Pop delay={6} from={0.86}>
        <div style={{ fontSize: 132, fontWeight: 700, letterSpacing: -2, color: C.text, textShadow: "0 40px 120px rgba(56,189,248,0.35)" }}>
          {b.text}
        </div>
      </Pop>
      <div style={{ marginTop: 22, width: 280 * lineW, height: 6, borderRadius: 3, backgroundColor: C.blue }} />
      {b.sub ? (
        <>
          <div style={{ height: 30 }} />
          <Rise delay={16} y={24}>
            <div style={{ fontSize: 34, color: C.textDim, letterSpacing: 2 }}>{b.sub}</div>
          </Rise>
        </>
      ) : null}
    </AbsoluteFill>
  );
};

const QuoteBeat: React.FC<{ b: Extract<Beat, { t: "quote" }> }> = ({ b }) => {
  const parts = b.hi ? b.text.split(b.hi) : [b.text];
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: "0 200px" }}>
      <Rise delay={0} y={26}>
        <div style={{ fontSize: 62, fontWeight: 600, lineHeight: 1.5, textAlign: "center" }}>
          {parts[0]}
          {b.hi ? <span style={{ color: C.blue }}>{b.hi}</span> : null}
          {parts[1] ?? ""}
        </div>
      </Rise>
    </AbsoluteFill>
  );
};

const CodeLine: React.FC<{ text: string; i: number; hot: boolean }> = ({ text, i, hot }) => {
  const p = usePop(12 + i * 7, { damping: 200, mass: 0.4, stiffness: 160 });
  return (
    <div style={{ fontFamily: MONO, fontSize: 30, lineHeight: 1.85, color: hot ? C.blue : C.textDim, fontWeight: hot ? 600 : 400, opacity: p, transform: `translateX(${(1 - p) * 24}px)` }}>
      <span style={{ color: C.textFaint, marginRight: 16 }}>{String(i + 1).padStart(2, "0")}</span>
      {text}
    </div>
  );
};

const CodeBeat: React.FC<{ b: Extract<Beat, { t: "code" }> }> = ({ b }) => (
  <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
    <Rise delay={0} y={30}>
      <div style={{ fontSize: 34, fontWeight: 600, color: C.bluePale, marginBottom: 26 }}>{b.title}</div>
    </Rise>
    <Pop delay={6} from={0.94}>
      <div style={{ width: 1180, borderRadius: 20, backgroundColor: C.card, border: `1px solid ${C.line}`, boxShadow: "0 40px 110px rgba(0,0,0,0.6)", overflow: "hidden" }}>
        <div style={{ display: "flex", gap: 10, padding: "16px 22px", borderBottom: `1px solid ${C.line}` }}>
          {["#FB7185", "#FBBF24", "#4ADE80"].map((c) => (
            <div key={c} style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: c }} />
          ))}
        </div>
        <div style={{ padding: "26px 30px 30px" }}>
          {b.lines.map((ln, i) => (
            <CodeLine key={i} text={ln} i={i} hot={!!b.hi?.includes(i)} />
          ))}
        </div>
      </div>
    </Pop>
  </AbsoluteFill>
);

const StatBeat: React.FC<{ b: Extract<Beat, { t: "stat" }> }> = ({ b }) => (
  <AbsoluteFill style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 100 }}>
    {b.items.map((it, i) => (
      <div key={i} style={{ textAlign: "center" }}>
        <Pop delay={i * 8} from={0.7}>
          <div style={{ fontSize: 150, fontWeight: 700, color: C.blue, lineHeight: 1, textShadow: "0 30px 90px rgba(56,189,248,0.45)" }}>
            {it.n}
          </div>
        </Pop>
        <div style={{ height: 18 }} />
        <Rise delay={i * 8 + 6} y={18}>
          <div style={{ fontSize: 28, color: C.textDim, letterSpacing: 1 }}>{it.l}</div>
        </Rise>
      </div>
    ))}
  </AbsoluteFill>
);

const ListBeat: React.FC<{ b: Extract<Beat, { t: "list" }> }> = ({ b }) => (
  <AbsoluteFill style={{ justifyContent: "center", padding: "0 220px" }}>
    <Rise delay={0} y={22}><Kicker>{b.title}</Kicker></Rise>
    <div style={{ height: 44 }} />
    {b.items.map((it, i) => (
      <div key={i} style={{ marginBottom: 30 }}>
        <Slide delay={10 + i * 8} from={-50}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 24 }}>
            <div style={{ marginTop: 12, width: 34, height: 34, borderRadius: 10, backgroundColor: b.tone === "fix" ? "rgba(74,222,128,0.16)" : C.blueSoft, color: b.tone === "fix" ? C.green : C.blue, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 700, flexShrink: 0 }}>
              {b.tone === "fix" ? "✓" : i + 1}
            </div>
            <div style={{ fontSize: 40, fontWeight: 500, lineHeight: 1.45, color: C.text }}>{it}</div>
          </div>
        </Slide>
      </div>
    ))}
  </AbsoluteFill>
);

const ShotBeat: React.FC<{ b: Extract<Beat, { t: "shot" }> }> = ({ b }) => {
  const p = usePop(4, { damping: 200, mass: 0.8, stiffness: 110 });
  const drift = 1 + 0.03 * Math.min(1, useCurrentFrame() / b.dur);
  if (b.wide) {
    return (
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ opacity: p, transform: `scale(${drift})` }}><Shot src={b.src} height={620} /></div>
        <div style={{ height: 44 }} />
        <Rise delay={14} y={20}>
          <div style={{ fontSize: 32, color: C.bluePale, letterSpacing: 1 }}>{b.caption}</div>
        </Rise>
      </AbsoluteFill>
    );
  }
  return (
    <AbsoluteFill style={{ flexDirection: "row", alignItems: "center", padding: "0 170px", gap: 90 }}>
      <div style={{ flex: 1 }}>
        <Rise delay={6} y={24}>
          <div style={{ fontSize: 50, fontWeight: 600, lineHeight: 1.5, color: C.text }}>{b.caption}</div>
        </Rise>
      </div>
      <div style={{ opacity: p, transform: `translateX(${(1 - p) * 70}px) scale(${drift})` }}>
        <Shot src={b.src} height={720} />
      </div>
    </AbsoluteFill>
  );
};

export const BeatView: React.FC<{ b: Beat }> = ({ b }) => {
  switch (b.t) {
    case "title": return <TitleBeat b={b} />;
    case "quote": return <QuoteBeat b={b} />;
    case "code": return <CodeBeat b={b} />;
    case "stat": return <StatBeat b={b} />;
    case "list": return <ListBeat b={b} />;
    case "shot": return <ShotBeat b={b} />;
  }
};

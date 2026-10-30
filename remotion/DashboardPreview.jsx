import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { dash } from "./dashboardTheme";

const NAV = [
  { label: "Overview", active: true },
  { label: "Journal", active: false },
  { label: "Beats", active: false },
  { label: "Support", active: false },
  { label: "Survey", active: false },
];

const STATS = [
  { label: "Wellness score", value: 78, suffix: "/100", delta: "+6 this week" },
  { label: "Day streak", value: 12, suffix: " days", delta: "Personal best" },
  { label: "Calm minutes", value: 34, suffix: " min", delta: "Today" },
  { label: "Journal entries", value: 5, suffix: "", delta: "This week" },
];

const WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MOOD = [62, 58, 71, 65, 78, 82, 76];

const ACTIVITY = [
  { time: "8:12 AM", title: "Morning check-in", meta: "Mood: Calm · 2 min" },
  { time: "12:40 PM", title: "Binaural session", meta: "10 Hz focus · 15 min" },
  { time: "6:05 PM", title: "Journal entry", meta: "Grateful · Content" },
];

const QUICK = ["Start breathing", "Play beats", "Log mood", "Coping match"];

function stagger(frame, start, index, step = 6) {
  return interpolate(frame, [start + index * step, start + index * step + 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
}

function Panel({ children, style }) {
  return (
    <div
      style={{
        background: dash.elevated,
        border: `1px solid ${dash.border}`,
        borderRadius: 14,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export const DashboardPreview = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const shellIn = spring({
    frame,
    fps,
    config: { damping: 22, stiffness: 90 },
  });

  const sidebarX = interpolate(shellIn, [0, 1], [-24, 0]);
  const contentOpacity = interpolate(frame, [0, 20], [0.92, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const chartProgress = interpolate(frame, [45, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const lineReveal = interpolate(frame, [120, 200], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  const highlightJournal = interpolate(
    frame % durationInFrames,
    [140, 155, 175, 190],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const cursorX = interpolate(frame, [145, 175], [920, 1080], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  const cursorY = interpolate(frame, [145, 175], [420, 468], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  const cursorOpacity = interpolate(frame, [140, 148, 188, 198], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scorePulse =
    78 +
    Math.sin((frame / durationInFrames) * Math.PI * 2) * 1.2;

  const maxMood = Math.max(...MOOD);
  const chartH = 120;

  return (
    <AbsoluteFill
      style={{
        background: dash.bg,
        fontFamily: dash.font,
        color: dash.text,
        fontSize: 13,
      }}
    >
      <div
        style={{
          display: "flex",
          height: "100%",
          transform: `translateX(${sidebarX}px)`,
          opacity: Math.max(0.94, shellIn),
        }}
      >
        {/* Sidebar */}
        <aside
          style={{
            width: 200,
            flexShrink: 0,
            borderRight: `1px solid ${dash.border}`,
            background: dash.elevated,
            padding: "20px 14px",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: dash.accentSoft,
                border: `1px solid ${dash.border}`,
              }}
            />
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>Soul Space</div>
              <div style={{ fontSize: 11, color: dash.textMuted }}>Wellness hub</div>
            </div>
          </div>
          {NAV.map((item, i) => {
            const navIn = stagger(frame, 12, i, 5);
            return (
              <div
                key={item.label}
                style={{
                  opacity: navIn,
                  transform: `translateX(${interpolate(navIn, [0, 1], [-8, 0])}px)`,
                  padding: "10px 12px",
                  borderRadius: 10,
                  background: item.active ? dash.accentSoft : "transparent",
                  color: item.active ? dash.text : dash.textMuted,
                  fontWeight: item.active ? 600 : 400,
                  fontSize: 13,
                }}
              >
                {item.label}
              </div>
            );
          })}
          <div style={{ flex: 1 }} />
          <Panel style={{ padding: 12, opacity: stagger(frame, 35, 0) }}>
            <div style={{ fontSize: 11, color: dash.textMuted }}>Today&apos;s focus</div>
            <div style={{ marginTop: 6, fontSize: 12, lineHeight: 1.4 }}>
              5 min breathing before bed
            </div>
            <div
              style={{
                marginTop: 10,
                height: 4,
                borderRadius: 4,
                background: dash.muted,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${interpolate(frame, [50, 120], [20, 65], { extrapolateRight: "clamp" })}%`,
                  background: dash.accent,
                  borderRadius: 4,
                }}
              />
            </div>
          </Panel>
        </aside>

        {/* Main */}
        <main style={{ flex: 1, padding: "20px 22px", opacity: contentOpacity, overflow: "hidden" }}>
          <header
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 18,
            }}
          >
            <div>
              <div style={{ fontSize: 11, color: dash.textMuted, letterSpacing: "0.12em", textTransform: "uppercase" }}>
                Friday · Preview
              </div>
              <h1 style={{ margin: "6px 0 0", fontSize: 22, fontWeight: 600 }}>
                Good evening, Alex
              </h1>
              <p style={{ margin: "6px 0 0", color: dash.textMuted, fontSize: 12 }}>
                Your dashboard summarizes mood, habits, and recommended next steps.
              </p>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <div
                style={{
                  padding: "8px 14px",
                  borderRadius: 999,
                  border: `1px solid ${dash.border}`,
                  fontSize: 12,
                  color: dash.textMuted,
                }}
              >
                Last sync · 2m ago
              </div>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  border: `1px solid ${dash.border}`,
                  background: dash.muted,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                }}
              >
                ○
              </div>
            </div>
          </header>

          {/* Stat cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 12,
              marginBottom: 14,
            }}
          >
            {STATS.map((stat, i) => {
              const t = stagger(frame, 22, i, 7);
              const displayValue =
                i === 0 ? Math.round(scorePulse) : stat.value;
              return (
                <Panel
                  key={stat.label}
                  style={{
                    padding: "14px 14px 12px",
                    opacity: t,
                    transform: `translateY(${interpolate(t, [0, 1], [12, 0])}px)`,
                  }}
                >
                  <div style={{ fontSize: 11, color: dash.textMuted }}>{stat.label}</div>
                  <div style={{ marginTop: 6, fontSize: 26, fontWeight: 600, letterSpacing: "-0.02em" }}>
                    {displayValue}
                    <span style={{ fontSize: 14, fontWeight: 500, color: dash.textMuted }}>
                      {stat.suffix}
                    </span>
                  </div>
                  <div style={{ marginTop: 6, fontSize: 11, color: dash.accent }}>{stat.delta}</div>
                </Panel>
              );
            })}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 12, flex: 1 }}>
            {/* Chart */}
            <Panel style={{ padding: 16, minHeight: 220 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontWeight: 600 }}>Weekly mood trend</div>
                  <div style={{ fontSize: 11, color: dash.textMuted, marginTop: 4 }}>
                    Sample data · tap a day to drill down
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 11,
                    padding: "4px 10px",
                    borderRadius: 999,
                    background: dash.accentSoft,
                    color: dash.accent,
                  }}
                >
                  +11% vs last week
                </div>
              </div>
              <div
                style={{
                  marginTop: 20,
                  display: "flex",
                  alignItems: "flex-end",
                  gap: 10,
                  height: chartH,
                  paddingBottom: 4,
                }}
              >
                {MOOD.map((v, i) => {
                  const barH = (v / maxMood) * chartH * chartProgress;
                  const dayHighlight = interpolate(
                    highlightJournal,
                    [0, 1],
                    [1, i === 5 ? 1.08 : 1]
                  );
                  return (
                    <div key={WEEK[i]} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                      <div
                        style={{
                          width: "100%",
                          maxWidth: 36,
                          height: barH * dayHighlight,
                          borderRadius: "6px 6px 2px 2px",
                          background: i === 5 ? dash.accent : dash.muted,
                          border: i === 5 ? `1px solid ${dash.accent}` : `1px solid ${dash.border}`,
                          transition: "none",
                        }}
                      />
                      <span style={{ fontSize: 10, color: dash.textMuted }}>{WEEK[i]}</span>
                    </div>
                  );
                })}
              </div>
              {/* Line overlay */}
              <svg
                viewBox="0 0 400 40"
                style={{ width: "100%", height: 36, marginTop: 8, opacity: lineReveal }}
              >
                <polyline
                  fill="none"
                  stroke={dash.positive}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray={400}
                  strokeDashoffset={400 * (1 - lineReveal)}
                  points={MOOD.map((v, i) => `${(i / 6) * 380 + 10},${38 - (v / 100) * 32}`).join(" ")}
                />
              </svg>
            </Panel>

            {/* Activity + quick actions */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Panel style={{ padding: 14, flex: 1 }}>
                <div style={{ fontWeight: 600, marginBottom: 10 }}>Recent activity</div>
                {ACTIVITY.map((item, i) => {
                  const t = stagger(frame, 55, i, 10);
                  return (
                    <div
                      key={item.title}
                      style={{
                        opacity: t,
                        transform: `translateX(${interpolate(t, [0, 1], [16, 0])}px)`,
                        padding: "10px 0",
                        borderBottom: i < ACTIVITY.length - 1 ? `1px solid ${dash.border}` : "none",
                      }}
                    >
                      <div style={{ fontSize: 10, color: dash.textMuted }}>{item.time}</div>
                      <div style={{ fontWeight: 500, marginTop: 2 }}>{item.title}</div>
                      <div style={{ fontSize: 11, color: dash.textMuted, marginTop: 2 }}>{item.meta}</div>
                    </div>
                  );
                })}
              </Panel>
              <Panel style={{ padding: 14 }}>
                <div style={{ fontWeight: 600, marginBottom: 10 }}>Quick actions</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  {QUICK.map((label, i) => {
                    const t = stagger(frame, 70, i, 6);
                    const isJournal = label === "Log mood";
                    return (
                      <div
                        key={label}
                        style={{
                          opacity: t,
                          padding: "10px 8px",
                          borderRadius: 10,
                          textAlign: "center",
                          fontSize: 11,
                          background: isJournal
                            ? `rgba(107, 155, 138, ${0.12 + highlightJournal * 0.25})`
                            : dash.muted,
                          border: isJournal
                            ? `1px solid rgba(107, 155, 138, ${0.3 + highlightJournal * 0.5})`
                            : `1px solid ${dash.border}`,
                          boxShadow: isJournal
                            ? `0 0 ${20 * highlightJournal}px rgba(107, 155, 138, 0.35)`
                            : "none",
                          transform: `scale(${isJournal ? 1 + highlightJournal * 0.04 : 1})`,
                        }}
                      >
                        {label}
                      </div>
                    );
                  })}
                </div>
              </Panel>
            </div>
          </div>

          {/* Bottom row: recommendations */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 12,
              marginTop: 12,
            }}
          >
            {[
              { title: "Suggested beat", body: "15 Hz · 12 min focus block", tag: "Beats" },
              { title: "Coping match", body: "Feeling stressed · 5 min breathing", tag: "Support" },
              { title: "Survey reminder", body: "Weekly check-in due tomorrow", tag: "Survey" },
            ].map((card, i) => {
              const t = stagger(frame, 85, i, 8);
              return (
                <Panel
                  key={card.title}
                  style={{
                    padding: 12,
                    opacity: t,
                    transform: `translateY(${interpolate(t, [0, 1], [8, 0])}px)`,
                  }}
                >
                  <span
                    style={{
                      fontSize: 10,
                      color: dash.accent,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {card.tag}
                  </span>
                  <div style={{ fontWeight: 600, marginTop: 6, fontSize: 13 }}>{card.title}</div>
                  <div style={{ fontSize: 11, color: dash.textMuted, marginTop: 4, lineHeight: 1.4 }}>
                    {card.body}
                  </div>
                </Panel>
              );
            })}
          </div>
        </main>
      </div>

      {/* Fake cursor */}
      <div
        style={{
          position: "absolute",
          left: cursorX,
          top: cursorY,
          opacity: cursorOpacity,
          pointerEvents: "none",
          zIndex: 50,
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill={dash.text}>
          <path d="M5 3l14 9-6 1-3 7z" />
        </svg>
      </div>

      {/* Preview badge */}
      <div
        style={{
          position: "absolute",
          bottom: 14,
          right: 16,
          fontSize: 10,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: dash.textMuted,
          opacity: 0.7,
        }}
      >
        Dashboard preview · sample data
      </div>
    </AbsoluteFill>
  );
};

export const dashboardPreviewConfig = {
  id: "DashboardPreview",
  durationInFrames: 300,
  fps: 30,
  width: 1280,
  height: 720,
};

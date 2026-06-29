// src/components/typing/TypingResults.jsx

import { useEffect, useRef, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceDot,
} from "recharts";
import { saveSession, deriveStats, computeSessionStats } from "../../utils/typingStorage";

// ── WPM chart ─────────────────────────────────────────────────────────────────

function WpmChart({ snapshots, duration }) {
  if (!snapshots || snapshots.length < 2) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "200px", color: "var(--text-secondary)", fontSize: "13px" }}>
        Not enough data to draw a chart.
      </div>
    );
  }

  const data = snapshots.map((s) => ({
    second: s.second,
    burst:  s.burst ?? s.wpm,
    wpm:    s.wpm,
    errors: s.errors,
  }));
  const errorPoints = data.filter((d, i) => i > 0 && d.errors > data[i - 1].errors);
  const xStep = duration <= 60 ? 10 : duration <= 180 ? 30 : 60;

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
        <CartesianGrid stroke="rgba(var(--border-color-rgb), 0.35)" strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="second" type="number" domain={[0, duration]}
          ticks={Array.from({ length: Math.floor(duration / xStep) + 1 }, (_, i) => i * xStep)}
          tickFormatter={(t) => `${t}s`}
          tick={{ fill: "var(--text-secondary)", fontSize: 10 }}
          axisLine={{ stroke: "rgba(var(--border-color-rgb), 0.4)" }} tickLine={false}
        />
        <YAxis tick={{ fill: "var(--text-secondary)", fontSize: 10 }} axisLine={false} tickLine={false} width={32}
          label={{ value: "wpm", angle: -90, position: "insideLeft", fill: "var(--text-secondary)", fontSize: 9, letterSpacing: "0.08em" }}
        />
        <Tooltip
          contentStyle={{ background: "rgba(var(--bg-card-rgb), 0.95)", border: "1px solid rgba(var(--border-color-rgb), 0.5)", borderRadius: "8px", fontSize: "12px" }}
          labelStyle={{ color: "var(--text-secondary)" }} labelFormatter={(s) => `${s}s`}
        />
        <Line type="monotone" dataKey="burst" stroke="rgba(var(--border-color-rgb), 0.9)" strokeWidth={1.5} dot={false} isAnimationActive={false} name="burst" />
        <Line type="monotone" dataKey="wpm" stroke="var(--accent-primary)" strokeWidth={2.5} dot={{ r: 3, fill: "var(--accent-primary)", strokeWidth: 0 }} activeDot={{ r: 4 }} isAnimationActive={false} name="wpm" />
        {errorPoints.map((d, i) => <ReferenceDot key={i} x={d.second} y={d.burst} r={4} fill="var(--poppy-red)" stroke="none" isFront />)}
      </LineChart>
    </ResponsiveContainer>
  );
}

// ── Stat block ────────────────────────────────────────────────────────────────

function StatBlock({ label, value, color, large }) {
  return (
    <div>
      <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-secondary)", marginBottom: "4px" }}>
        {label}
      </div>
      <div style={{ fontSize: large ? "52px" : "28px", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1, color: color || "var(--accent-primary)" }}>
        {value}
      </div>
    </div>
  );
}

// ── Mini stat ─────────────────────────────────────────────────────────────────

function MiniStat({ label, value, subLabel }) {
  return (
    <div>
      <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-secondary)", marginBottom: "2px" }}>
        {label}
      </div>
      <div style={{ fontSize: "16px", fontWeight: 700, color: "var(--accent-primary)" }}>
        {value}
      </div>
      {subLabel && <div style={{ fontSize: "10px", color: "var(--text-secondary)" }}>{subLabel}</div>}
    </div>
  );
}

// ── Metrics bar ───────────────────────────────────────────────────────────────

function Delta({ value, unit = "" }) {
  if (value === null || value === undefined) return null;
  const positive = value >= 0;
  const arrow    = positive ? "↑" : "↓";
  const sign     = positive ? "+" : "";
  const color    = positive ? "var(--lush-lime)" : "var(--poppy-red)";
  return (
    <span style={{ color, fontSize: "11px", fontWeight: 600, marginLeft: "4px", opacity: 0.9 }}>
      ({arrow}{sign}{value}{unit})
    </span>
  );
}

function MetricsBar({ wpm, accuracy, score, derived }) {
  const wpmDelta   = derived && derived.totalSessions > 1 ? +(wpm - derived.averageWpm).toFixed(1) : null;
  const accDelta   = derived && derived.totalSessions > 1 ? +(accuracy - derived.averageAccuracy).toFixed(2) : null;
  const scoreDelta = derived && derived.totalSessions > 1 ? Math.round(score - (derived.averageWpm * accuracy / 100 * 10)) : null;

  const sep = <span style={{ color: "var(--border-color)", margin: "0 6px" }}>·</span>;

  return (
    <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "2px", fontSize: "14px", color: "var(--text-secondary)", fontWeight: 500, marginTop: "4px" }}>
      <span style={{ fontWeight: 700, color: "var(--text-primary)", marginRight: "6px" }}>Metrics:</span>
      <span>Speed: <strong style={{ color: "var(--accent-primary)" }}>{wpm}wpm</strong><Delta value={wpmDelta} unit="wpm" /></span>
      {sep}
      <span>Accuracy: <strong style={{ color: "var(--accent-primary)" }}>{accuracy}%</strong><Delta value={accDelta} unit="%" /></span>
      {sep}
      <span>Score: <strong style={{ color: "var(--accent-primary)" }}>{score}</strong><Delta value={scoreDelta} /></span>
      {derived && <>{sep}<span>Best <strong style={{ color: "var(--accent-primary)" }}>{derived.bestWpm}wpm</strong></span></>}
      {derived && <>{sep}<span>Avg <strong style={{ color: "var(--accent-primary)" }}>{derived.averageWpm}wpm</strong> <span style={{ fontSize: "12px" }}>({Math.min(derived.totalSessions, 10)} sessions)</span></span></>}
      {derived && <>{sep}<span style={{ display: "inline-flex", alignItems: "center", gap: "3px" }}>Trend <TrendIcon trend={derived.trend} /><strong style={{ color: derived.trend === "up" ? "var(--lush-lime)" : derived.trend === "down" ? "var(--poppy-red)" : "var(--text-secondary)" }}>{derived.trend === "up" ? "improving" : derived.trend === "down" ? "declining" : "stable"}</strong></span></>}
    </div>
  );
}

// ── Daily goal bars ───────────────────────────────────────────────────────────

function DailyGoalBars({ wpm, elapsedSeconds, goalWpm, goalTime }) {
  const hasWpmGoal  = goalWpm  && goalWpm  > 0;
  const hasTimeGoal = goalTime && goalTime > 0;
  if (!hasWpmGoal && !hasTimeGoal) return null;

  // Time progress: accumulate across the session just finished
  // goalTime is in minutes; elapsedSeconds is this session's contribution
  const sessionMinutes = elapsedSeconds / 60;

  return (
    <div style={{ marginTop: "8px", display: "flex", flexDirection: "column", gap: "6px" }}>
      {hasWpmGoal && (() => {
        const pct     = Math.min(100, Math.round((wpm / goalWpm) * 100));
        const reached = wpm >= goalWpm;
        return (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "11px", color: "var(--text-secondary)", whiteSpace: "nowrap", flexShrink: 0 }}>
              WPM goal: <strong style={{ color: reached ? "var(--lush-lime)" : "var(--accent-primary)" }}>{goalWpm} wpm</strong>
              {reached && <span style={{ color: "var(--lush-lime)", marginLeft: "4px" }}>🎉</span>}
            </span>
            <div style={{ flex: 1, height: "5px", borderRadius: "3px", background: "rgba(var(--border-color-rgb), 0.4)", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${pct}%`, borderRadius: "3px", background: reached ? "var(--lush-lime)" : "var(--accent-primary)", transition: "width 0.6s ease" }} />
            </div>
            <span style={{ fontSize: "11px", color: reached ? "var(--lush-lime)" : "var(--text-secondary)", whiteSpace: "nowrap", flexShrink: 0 }}>{pct}%</span>
          </div>
        );
      })()}

      {hasTimeGoal && (() => {
        const pct     = Math.min(100, Math.round((sessionMinutes / goalTime) * 100));
        const reached = sessionMinutes >= goalTime;
        return (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "11px", color: "var(--text-secondary)", whiteSpace: "nowrap", flexShrink: 0 }}>
              Time goal: <strong style={{ color: reached ? "var(--lush-lime)" : "var(--accent-primary)" }}>{goalTime} min</strong>
              {reached && <span style={{ color: "var(--lush-lime)", marginLeft: "4px" }}>🎉</span>}
            </span>
            <div style={{ flex: 1, height: "5px", borderRadius: "3px", background: "rgba(var(--border-color-rgb), 0.4)", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${pct}%`, borderRadius: "3px", background: reached ? "var(--lush-lime)" : "var(--accent-primary)", transition: "width 0.6s ease" }} />
            </div>
            <span style={{ fontSize: "11px", color: reached ? "var(--lush-lime)" : "var(--text-secondary)", whiteSpace: "nowrap", flexShrink: 0 }}>{sessionMinutes.toFixed(1)} min</span>
          </div>
        );
      })()}
    </div>
  );
}

// ── Raise-goal prompt ─────────────────────────────────────────────────────────
// Shown once per results screen when the WPM goal was just reached. Offers a
// one-tap +5 bump. Dismissing just hides it for this results screen — it
// isn't a "never ask again" choice, it'll show up again next time a goal
// is freshly reached.

function RaiseGoalPrompt({ goalWpm, onAccept, onDismiss }) {
  const newGoal = goalWpm + 5;

  return (
    <div
      className="card"
      style={{
        display: "flex", alignItems: "center", gap: "14px",
        padding: "14px 18px", marginTop: "10px",
        borderColor: "rgba(var(--border-color-rgb), 0.6)",
      }}
    >
      <div style={{
        width: "32px", height: "32px", borderRadius: "10px", flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "rgba(var(--border-color-rgb), 0.3)",
        color: "var(--lush-lime)",
      }}>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" />
        </svg>
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-primary)" }}>
          Goal reached — ready to push further?
        </div>
        <div style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "2px" }}>
          Raise your daily WPM goal from {goalWpm} to {newGoal}.
        </div>
      </div>

      <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
        <button
          onClick={onDismiss}
          className="button"
          style={{ fontSize: "12px", padding: "7px 14px" }}
        >
          Not now
        </button>
        <button
          onClick={() => onAccept(newGoal)}
          className="button solid"
          style={{ fontSize: "12px", padding: "7px 16px", fontWeight: 700 }}
        >
          Raise to {newGoal}
        </button>
      </div>
    </div>
  );
}

// ── Trend icon ────────────────────────────────────────────────────────────────

function TrendIcon({ trend }) {
  if (trend === "up") return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--lush-lime)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="18 15 12 9 6 15" />
    </svg>
  );
  if (trend === "down") return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--poppy-red)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

// ── Minimalist action button ──────────────────────────────────────────────────

function ActionButton({ onClick, icon, label }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex", alignItems: "center", gap: "7px",
        background: "none", border: "1px solid rgba(var(--border-color-rgb), 0.4)",
        cursor: "pointer", color: "var(--text-secondary)", fontSize: "13px",
        fontWeight: 600, letterSpacing: "0.04em", padding: "6px 14px",
        borderRadius: "8px", opacity: 0.8, transition: "opacity 0.15s ease, border-color 0.15s ease",
      }}
      onMouseEnter={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.borderColor = "rgba(var(--border-color-rgb), 0.8)"; }}
      onMouseLeave={e => { e.currentTarget.style.opacity = "0.8"; e.currentTarget.style.borderColor = "rgba(var(--border-color-rgb), 0.4)"; }}
    >
      {icon}
      {label}
    </button>
  );
}

// ── Icons ─────────────────────────────────────────────────────────────────────

const Icons = {
  Retry: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
    </svg>
  ),
  Next: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  ),
  Clock: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  Back: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  ),
  Goal: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
    </svg>
  ),
  Sliders: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" />
      <line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" />
      <line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" />
      <line x1="1" y1="14" x2="7" y2="14" /><line x1="9" y1="8" x2="15" y2="8" />
      <line x1="17" y1="16" x2="23" y2="16" />
    </svg>
  ),
  BarChart: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
      <line x1="2" y1="20" x2="22" y2="20" />
    </svg>
  ),
  Module: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
};

// ── Main export ───────────────────────────────────────────────────────────────

export default function TypingResults({
  result, moduleId, moduleName, durationLabel,
  dailyGoalWpm, dailyGoalTime,
  onOpenSettings, onRaiseGoal,
  onTypingReport, onGoToModule,
  onRetry, onNextTest, onChangeModule,
}) {
  const { correctChars, incorrectChars, completedPassages, elapsedSeconds, snapshots = [] } = result;

  const { wpm, rawWpm, accuracy, score, consistency: consistencyNum } = computeSessionStats({
    correctChars, incorrectChars, elapsedSeconds, snapshots,
  });
  const consistency = consistencyNum === null ? "—" : `${consistencyNum}%`;

  const accColor = accuracy > 95 ? "var(--lush-lime)"
                 : accuracy > 80 ? "var(--vibrant-cyan)"
                 : accuracy > 65 ? "var(--golden-amber)"
                 : "var(--poppy-red)";

  const [derived, setDerived] = useState(null);
  const savedRef = useRef(false);

  useEffect(() => {
    if (savedRef.current) return;
    savedRef.current = true;
    saveSession({ wpm, accuracy }).then((rec) => setDerived(deriveStats(rec, wpm)));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const wpmGoalReached = dailyGoalWpm && wpm >= dailyGoalWpm;
  const [raiseGoalDismissed, setRaiseGoalDismissed] = useState(false);

  return (
    <div>
      {/* ── Header row ── */}
      <div style={{
        display: "flex", alignItems: "flex-start", justifyContent: "space-between",
        gap: "20px", marginBottom: "20px",
      }}>
        {/* Left: title + metrics */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap", marginBottom: "4px" }}>
            <h2 style={{ margin: 0, fontSize: "24px", fontWeight: 800, color: "var(--text-primary)" }}>
              Test complete
            </h2>
            {wpmGoalReached && (
              <span style={{
                display: "inline-flex", alignItems: "center", gap: "5px",
                fontSize: "12px", fontWeight: 700, letterSpacing: "0.05em",
                color: "var(--lush-lime)",
                border: "1px solid var(--lush-lime)",
                borderRadius: "999px", padding: "3px 10px",
                opacity: 0.95,
              }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                WPM goal reached!
              </span>
            )}
          </div>
          <p style={{ color: "var(--text-secondary)", fontSize: "13px", margin: "0 0 6px" }}>
            {moduleName} · {durationLabel}
          </p>
          <MetricsBar wpm={wpm} accuracy={accuracy} score={score} derived={derived} />
          <DailyGoalBars wpm={wpm} elapsedSeconds={elapsedSeconds} goalWpm={dailyGoalWpm} goalTime={dailyGoalTime} />
          {wpmGoalReached && onRaiseGoal && !raiseGoalDismissed && (
            <RaiseGoalPrompt
              goalWpm={dailyGoalWpm}
              onAccept={(newGoal) => { onRaiseGoal(newGoal); setRaiseGoalDismissed(true); }}
              onDismiss={() => setRaiseGoalDismissed(true)}
            />
          )}
        </div>

        {/* Right: action buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: "5px", flexShrink: 0, minWidth: "200px" }}>

          {/* Top tier — primary navigation, side by side */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5px" }}>
            <button
              onClick={onTypingReport}
              className="button solid"
              style={{ justifyContent: "center", padding: "8px 8px", fontSize: "12px", fontWeight: 700, borderRadius: "8px", gap: "5px" }}
            >
              <Icons.BarChart /> Report
            </button>
            <button
              onClick={onGoToModule}
              className="button solid"
              style={{ justifyContent: "center", padding: "8px 8px", fontSize: "12px", fontWeight: 700, borderRadius: "8px", gap: "5px" }}
            >
              <Icons.Module /> Module
            </button>
          </div>

          {/* Settings tier — 2×2 grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5px" }}>
            <ActionButton onClick={() => onOpenSettings("goal")}       icon={<Icons.Goal />}    label="Daily goal"   />
            <ActionButton onClick={() => onOpenSettings("difficulty")} icon={<Icons.Sliders />} label="Difficulty"   />
            <ActionButton onClick={() => onOpenSettings("duration")}   icon={<Icons.Clock />}   label="Change time"  />
            <ActionButton onClick={onChangeModule}                     icon={<Icons.Back />}    label="Change Module"       />
          </div>

          {/* Bottom tier — repeat / next */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5px" }}>
            <button
              onClick={onRetry}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: "5px",
                padding: "8px 10px", borderRadius: "8px", border: "none", cursor: "pointer",
                fontSize: "12px", fontWeight: 700,
                background: "rgba(var(--border-color-rgb), 0.25)",
                color: "var(--text-primary)",
                transition: "background 0.15s ease",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(var(--border-color-rgb), 0.45)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(var(--border-color-rgb), 0.25)"}
            >
              <Icons.Retry /> Repeat
            </button>
            <button
              onClick={onNextTest}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: "5px",
                padding: "8px 10px", borderRadius: "8px", border: "none", cursor: "pointer",
                fontSize: "12px", fontWeight: 700,
                background: "rgba(var(--border-color-rgb), 0.25)",
                color: "var(--text-primary)",
                transition: "background 0.15s ease",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(var(--border-color-rgb), 0.45)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(var(--border-color-rgb), 0.25)"}
            >
              <Icons.Next /> Next
            </button>
          </div>
        </div>
      </div>

      {/* ── Stats card ── */}
      <div className="card" style={{ padding: "24px 28px", marginBottom: "20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: "24px", alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <StatBlock label="wpm" value={wpm} color="var(--accent-primary)" large />
            <StatBlock label="acc" value={`${accuracy}%`} color={accColor} large />
          </div>
          <WpmChart snapshots={snapshots} duration={elapsedSeconds} />
        </div>

        <div style={{ borderTop: "1px solid rgba(var(--border-color-rgb), 0.4)", margin: "20px 0 16px" }} />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "16px" }}>
          <MiniStat label="test type" value={`time ${Math.round(elapsedSeconds)}`} />
          <MiniStat label="raw" value={rawWpm} />
          <MiniStat
            label="characters"
            value={
              <span>
                <span style={{ color: "var(--lush-lime)" }}>{correctChars}</span>
                <span style={{ color: "var(--text-secondary)", fontSize: "12px" }}> / </span>
                <span style={{ color: "var(--poppy-red)" }}>{incorrectChars}</span>
              </span>
            }
            subLabel="correct / incorrect"
          />
          <MiniStat label="consistency" value={consistency} />
          <MiniStat label="passages" value={completedPassages} />
        </div>


      </div>
    </div>
  );
}
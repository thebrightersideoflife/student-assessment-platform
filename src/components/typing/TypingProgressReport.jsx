// src/components/typing/TypingProgressReport.jsx
//
// Pure presentation component — takes already-loaded data as props and
// renders the printable progress report. All data loading lives in
// TypingReportPage.jsx; this file only derives chart-ready shapes from
// what it's given.
//
// Sections (in order): cover + summary stats, WPM over time, accuracy
// over time, session scores, daily practice time, consistency trend,
// struggling characters, performance by difficulty, footer.
//
// isAnimationActive={false} on every chart series — required so charts
// render correctly when window.print() fires before any chart animation
// would otherwise complete.

import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine,
  ResponsiveContainer, Cell,
} from "recharts";
import { aggregateCharErrors } from "../../utils/typingStorage";

// ── Shared chart chrome ───────────────────────────────────────────────────

const axisTick = { fill: "var(--text-secondary)", fontSize: 10 };
const gridStroke = "rgba(var(--border-color-rgb), 0.35)";
const tooltipStyle = {
  background: "rgba(var(--bg-card-rgb), 0.95)",
  border: "1px solid rgba(var(--border-color-rgb), 0.5)",
  borderRadius: "8px",
  fontSize: "12px",
};

function ChartCard({ title, note, children }) {
  return (
    <div className="tpr-section">
      <div className="tpr-section-header">
        <div className="tpr-section-title">{title}</div>
        {note && <div className="tpr-section-note">{note}</div>}
      </div>
      <div className="card" style={{ padding: "16px 20px" }}>
        {children}
      </div>
    </div>
  );
}

function NoChartData() {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "center",
      height: "180px", color: "var(--text-secondary)", fontSize: "13px",
    }}>
      Not enough data yet for this chart.
    </div>
  );
}

// ── Section: WPM over time ─────────────────────────────────────────────────

function WpmOverTimeChart({ sessions, goalWpm }) {
  if (sessions.length < 2) return <NoChartData />;

  const data = sessions.map((s, i) => ({ session: i + 1, wpm: s.wpm }));
  const hasGoal = goalWpm && goalWpm > 0;

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
        <CartesianGrid stroke={gridStroke} strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="session" tick={axisTick} axisLine={{ stroke: gridStroke }} tickLine={false}
          label={{ value: "session #", position: "insideBottom", offset: -2, fill: "var(--text-secondary)", fontSize: 9 }} />
        <YAxis tick={axisTick} axisLine={false} tickLine={false} width={32} />
        <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: "var(--text-secondary)" }}
          labelFormatter={(s) => `Session ${s}`} />
        <Legend wrapperStyle={{ fontSize: "11px" }} />
        {hasGoal && (
          <ReferenceLine y={goalWpm} stroke="var(--golden-amber)" strokeDasharray="4 4"
            label={{ value: "Goal", position: "right", fill: "var(--golden-amber)", fontSize: 10 }} />
        )}
        <Line type="monotone" dataKey="wpm" name="WPM" stroke="var(--accent-primary)" strokeWidth={2.5}
          dot={(props) => {
            const { cx, cy, payload } = props;
            const reached = hasGoal && payload.wpm >= goalWpm;
            return <circle cx={cx} cy={cy} r={3.5} fill={reached ? "var(--lush-lime)" : "var(--accent-primary)"} stroke="none" />;
          }}
          activeDot={{ r: 5 }} isAnimationActive={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

// ── Section: accuracy over time ────────────────────────────────────────────

function AccuracyOverTimeChart({ sessions }) {
  if (sessions.length < 2) return <NoChartData />;

  const data = sessions.map((s, i) => ({ session: i + 1, accuracy: s.accuracy }));
  const colorFor = (acc) => acc >= 95 ? "var(--lush-lime)" : acc >= 80 ? "var(--vibrant-cyan)" : "var(--poppy-red)";

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
        <CartesianGrid stroke={gridStroke} strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="session" tick={axisTick} axisLine={{ stroke: gridStroke }} tickLine={false} />
        <YAxis domain={[0, 100]} tick={axisTick} axisLine={false} tickLine={false} width={32} />
        <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: "var(--text-secondary)" }}
          labelFormatter={(s) => `Session ${s}`} formatter={(v) => [`${v}%`, "Accuracy"]} />
        <Line type="monotone" dataKey="accuracy" name="Accuracy"
          stroke="var(--vibrant-cyan)" strokeWidth={2.5}
          dot={(props) => {
            const { cx, cy, payload } = props;
            return <circle cx={cx} cy={cy} r={3.5} fill={colorFor(payload.accuracy)} stroke="none" />;
          }}
          activeDot={{ r: 5 }} isAnimationActive={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

// ── Section: session scores ────────────────────────────────────────────────

function SessionScoresChart({ sessions, goalWpm }) {
  if (sessions.length < 2) return <NoChartData />;

  const hasGoal = goalWpm && goalWpm > 0;
  const data = sessions.map((s, i) => ({ session: i + 1, score: s.score, reached: hasGoal ? s.wpm >= goalWpm : null }));

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
        <CartesianGrid stroke={gridStroke} strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="session" tick={axisTick} axisLine={{ stroke: gridStroke }} tickLine={false} />
        <YAxis tick={axisTick} axisLine={false} tickLine={false} width={36} />
        <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: "var(--text-secondary)" }}
          labelFormatter={(s) => `Session ${s}`} />
        <Bar dataKey="score" name="Score" radius={[4, 4, 0, 0]} isAnimationActive={false}>
          {data.map((d, i) => (
            <Cell key={i} fill={d.reached ? "var(--lush-lime)" : "var(--accent-primary)"} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

// ── Section: daily practice time ───────────────────────────────────────────

function DailyPracticeChart({ sessions, goalTime }) {
  const byDate = {};
  for (const s of sessions) {
    byDate[s.date] = (byDate[s.date] || 0) + (s.duration || 0);
  }
  const data = Object.entries(byDate)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, seconds]) => ({ date: date.slice(5), minutes: +(seconds / 60).toFixed(1) }));

  if (data.length < 2) return <NoChartData />;

  const hasGoal = goalTime && goalTime > 0;

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
        <CartesianGrid stroke={gridStroke} strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="date" tick={axisTick} axisLine={{ stroke: gridStroke }} tickLine={false} />
        <YAxis tick={axisTick} axisLine={false} tickLine={false} width={32}
          label={{ value: "min", angle: -90, position: "insideLeft", fill: "var(--text-secondary)", fontSize: 9 }} />
        <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: "var(--text-secondary)" }}
          formatter={(v) => [`${v} min`, "Practice time"]} />
        {hasGoal && (
          <ReferenceLine y={goalTime} stroke="var(--golden-amber)" strokeDasharray="4 4"
            label={{ value: "Goal", position: "right", fill: "var(--golden-amber)", fontSize: 10 }} />
        )}
        <Bar dataKey="minutes" name="Minutes" fill="var(--sunset-orange)" radius={[4, 4, 0, 0]} isAnimationActive={false} />
      </BarChart>
    </ResponsiveContainer>
  );
}

// ── Section: consistency trend ─────────────────────────────────────────────

function ConsistencyChart({ sessions }) {
  const data = sessions
    .map((s, i) => ({ session: i + 1, consistency: s.consistency }))
    .filter((d) => d.consistency !== null && d.consistency !== undefined);

  if (data.length < 2) return <NoChartData />;

  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={data} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id="tprConsistencyFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--vibrant-cyan)" stopOpacity={0.35} />
            <stop offset="100%" stopColor="var(--vibrant-cyan)" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke={gridStroke} strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="session" tick={axisTick} axisLine={{ stroke: gridStroke }} tickLine={false} />
        <YAxis domain={[0, 100]} tick={axisTick} axisLine={false} tickLine={false} width={32} />
        <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: "var(--text-secondary)" }}
          labelFormatter={(s) => `Session ${s}`} formatter={(v) => [`${v}%`, "Consistency"]} />
        <Area type="monotone" dataKey="consistency" name="Consistency" stroke="var(--vibrant-cyan)"
          strokeWidth={2} fill="url(#tprConsistencyFill)" isAnimationActive={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

// ── Section: struggling characters ─────────────────────────────────────────

function displayChar(c) {
  if (c === " ") return "space";
  return c;
}

function StrugglingCharsChart({ sessions }) {
  const top = aggregateCharErrors(sessions).slice(0, 10);
  if (top.length === 0) return <NoChartData />;

  const data = top.map((d) => ({ ...d, label: displayChar(d.char) })).reverse(); // reverse so #1 sits at top

  return (
    <ResponsiveContainer width="100%" height={Math.max(160, top.length * 28)}>
      <BarChart data={data} layout="vertical" margin={{ top: 8, right: 24, bottom: 0, left: 8 }}>
        <CartesianGrid stroke={gridStroke} strokeDasharray="3 3" horizontal={false} />
        <XAxis type="number" tick={axisTick} axisLine={{ stroke: gridStroke }} tickLine={false} allowDecimals={false} />
        <YAxis type="category" dataKey="label" tick={{ ...axisTick, fontFamily: "monospace" }}
          axisLine={false} tickLine={false} width={48} />
        <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: "var(--text-secondary)" }}
          formatter={(v) => [v, "Errors"]} />
        <Bar dataKey="count" name="Errors" fill="var(--poppy-red)" radius={[0, 4, 4, 0]} isAnimationActive={false} />
      </BarChart>
    </ResponsiveContainer>
  );
}

const MODE_LABELS = { beginner: "Beginner", intermediate: "Intermediate", normal: "Normal" };

// ── Cover ─────────────────────────────────────────────────────────────────
//
// `sessions` here is already scoped to a single difficulty mode (the report
// page filters before this component ever sees them), so every stat below
// — best WPM, average WPM, average accuracy — reflects that one mode only.

function Cover({ sessions, mode }) {
  const totalSessions = sessions.length;
  const bestWpm = sessions.length > 0 ? Math.max(...sessions.map((s) => s.wpm)) : 0;
  const avgWpm = sessions.length > 0
    ? Math.round(sessions.reduce((sum, s) => sum + s.wpm, 0) / sessions.length)
    : 0;
  const avgAccuracy = sessions.length > 0
    ? Math.round(sessions.reduce((sum, s) => sum + s.accuracy, 0) / sessions.length)
    : 0;

  const generated = new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="tpr-cover">
      <div>
        <h1>Typing Progress Report — {MODE_LABELS[mode] || mode}</h1>
        <div className="tpr-generated">Generated {generated} · last {totalSessions} {totalSessions === 1 ? "session" : "sessions"}</div>
      </div>
      <div className="tpr-cover-stats">
        <div className="tpr-cover-stat">
          <div className="tpr-cover-stat-value">{totalSessions}</div>
          <div className="tpr-cover-stat-label">Sessions</div>
        </div>
        <div className="tpr-cover-stat">
          <div className="tpr-cover-stat-value">{bestWpm}</div>
          <div className="tpr-cover-stat-label">Best WPM</div>
        </div>
        <div className="tpr-cover-stat">
          <div className="tpr-cover-stat-value">{avgWpm}</div>
          <div className="tpr-cover-stat-label">Avg WPM</div>
        </div>
        <div className="tpr-cover-stat">
          <div className="tpr-cover-stat-value">{avgAccuracy}%</div>
          <div className="tpr-cover-stat-label">Avg Accuracy</div>
        </div>
      </div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────

export default function TypingProgressReport({ sessions, goalWpm, goalTime, mode }) {
  const modeLabel = MODE_LABELS[mode] || mode;

  if (sessions.length === 0) {
    return (
      <div className="tpr-empty">
        <h2>No {modeLabel} sessions yet</h2>
        <p>Complete a typing test in {modeLabel} mode to see your progress here.</p>
      </div>
    );
  }

  return (
    <div>
      <Cover sessions={sessions} mode={mode} />

      {sessions.length < 4 && (
        <p className="tpr-section-note" style={{ marginBottom: "20px" }}>
          More sessions will improve the accuracy of trend data.
        </p>
      )}

      <ChartCard title="WPM over time" note={goalWpm ? `Goal: ${goalWpm} wpm` : null}>
        <WpmOverTimeChart sessions={sessions} goalWpm={goalWpm} />
      </ChartCard>

      <ChartCard title="Accuracy over time">
        <AccuracyOverTimeChart sessions={sessions} />
      </ChartCard>

      <ChartCard title="Session scores" note={goalWpm ? "Green = goal reached" : null}>
        <SessionScoresChart sessions={sessions} goalWpm={goalWpm} />
      </ChartCard>

      <ChartCard title="Daily practice time" note={goalTime ? `Goal: ${goalTime} min/day` : null}>
        <DailyPracticeChart sessions={sessions} goalTime={goalTime} />
      </ChartCard>

      <ChartCard title="Consistency trend">
        <ConsistencyChart sessions={sessions} />
      </ChartCard>

      <ChartCard title="Struggling characters" note={`Top 10, across ${modeLabel} sessions`}>
        <StrugglingCharsChart sessions={sessions} />
      </ChartCard>

      <div className="tpr-footer">
        <span>Typing Practice — Progress Report · {modeLabel}</span>
        <span>{sessions.length} sessions on record</span>
      </div>
    </div>
  );
}
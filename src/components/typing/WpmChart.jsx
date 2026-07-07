// src/components/typing/WpmChart.jsx

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceDot,
} from "recharts";

// ── Custom tooltip content ───────────────────────────────────────────────────
// recharts' default <Tooltip> colors each row's label/value by that series'
// own stroke color unless overridden. The "wpm" line's stroke is the bold
// --accent-primary, so its tooltip row reads fine — but "burst" is
// deliberately drawn as a faint rgba(border-color) line (it's meant to sit
// quietly behind "wpm" on the chart itself), and that same faint color was
// leaking into the tooltip text, making the burst value nearly illegible.
// A custom content renderer fixes this by choosing tooltip text colors
// independently of each line's own on-chart stroke.
function ChartTooltip({ active, payload, label }) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div style={{
      background:   "rgba(var(--bg-card-rgb), 0.95)",
      border:       "1px solid rgba(var(--border-color-rgb), 0.5)",
      borderRadius: "8px",
      padding:      "8px 10px",
      fontSize:     "12px",
      minWidth:     "90px",
    }}>
      <div style={{ color: "var(--text-primary)", marginBottom: "4px" }}>{label}s</div>
      {payload.map((entry) => (
        <div
          key={entry.dataKey}
          style={{
            display:        "flex",
            justifyContent: "space-between",
            gap:            "14px",
            color:          entry.dataKey === "wpm" ? "var(--accent-primary)" : "var(--text-secondary)",
            fontWeight:     entry.dataKey === "wpm" ? 700 : 600,
          }}
        >
          <span style={{ textTransform: "capitalize" }}>{entry.name}</span>
          <span>{entry.value}</span>
        </div>
      ))}
    </div>
  );
}

export default function WpmChart({ snapshots, duration }) {
  if (!snapshots || snapshots.length < 2) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "200px", color: "var(--text-secondary)", fontSize: "13px" }}>
        Not enough data to draw a chart.
      </div>
    );
  }

  // ── Y-axis ceiling ──────────────────────────────────────────────────────────
  // `burst` (this-second-only rate) is intentionally noisy — a fast keystroke
  // cluster landing right on a second boundary can spike it to hundreds of
  // "wpm" for a single tick even in an otherwise ~70wpm session. The smooth
  // `wpm` line (a running average) never does this, so it's the trustworthy
  // basis for how tall the chart should be. Ceiling = 1.4x the highest
  // *cumulative* wpm reached, rounded up to a clean multiple of 10, with a
  // 60wpm floor so a very slow/short session doesn't get a cramped 10wpm-tall
  // chart. Burst values above this ceiling are clamped for display only —
  // the underlying stat/tooltip elsewhere in the app is untouched.
  const maxCumulativeWpm = Math.max(...snapshots.map((s) => s.wpm), 0);
  const yMax = Math.max(60, Math.ceil((maxCumulativeWpm * 1.4) / 10) * 10);

  const data = snapshots.map((s) => ({
    second: s.second,
    burst:  Math.min(s.burst ?? s.wpm, yMax),
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
        <YAxis
          domain={[0, yMax]}
          tick={{ fill: "var(--text-secondary)", fontSize: 10 }} axisLine={false} tickLine={false} width={32}
          label={{ value: "wpm", angle: -90, position: "insideLeft", fill: "var(--text-secondary)", fontSize: 9, letterSpacing: "0.08em" }}
        />
        <Tooltip content={<ChartTooltip />} />
        <Line type="monotone" dataKey="burst" stroke="rgba(var(--border-color-rgb), 0.9)" strokeWidth={1.5} dot={false} isAnimationActive={false} name="burst" />
        <Line type="monotone" dataKey="wpm" stroke="var(--accent-primary)" strokeWidth={2.5} dot={{ r: 3, fill: "var(--accent-primary)", strokeWidth: 0 }} activeDot={{ r: 4 }} isAnimationActive={false} name="wpm" />
        {errorPoints.map((d, i) => <ReferenceDot key={i} x={d.second} y={d.burst} r={4} fill="var(--poppy-red)" stroke="none" isFront />)}
      </LineChart>
    </ResponsiveContainer>
  );
}
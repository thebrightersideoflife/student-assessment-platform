// src/components/typing/WpmChart.jsx

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceDot,
} from "recharts";

export default function WpmChart({ snapshots, duration }) {
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
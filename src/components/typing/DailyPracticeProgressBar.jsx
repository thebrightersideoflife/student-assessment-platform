// src/components/typing/DailyPracticeProgressBar.jsx

import React from "react";
import { Clock, CheckCircle2 } from "lucide-react";

export default function DailyPracticeProgressBar({
  todayTotalSeconds,
  goalMinutes,
  accentColor = "var(--accent-primary)",
  accentRgb = "0, 191, 255",
}) {
  const hasTimeGoal = goalMinutes && goalMinutes > 0;
  if (!hasTimeGoal) return null;

  const todayMinutes = todayTotalSeconds / 60;
  const pct = Math.min(100, Math.round((todayMinutes / goalMinutes) * 100));
  const reached = todayMinutes >= goalMinutes;
  const minutesLeft = Math.max(0, goalMinutes - todayMinutes);

  return (
    <div className="card" style={{ padding: "16px 20px", marginBottom: "24px", border: reached ? `1px solid rgba(${accentRgb}, 0.3)` : undefined }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{
            width: "32px", height: "32px", borderRadius: "8px",
            background: reached ? "var(--lush-lime-bg, rgba(34, 197, 94, 0.12))" : `rgba(${accentRgb}, 0.12)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: reached ? "var(--lush-lime)" : accentColor
          }}>
            {reached ? <CheckCircle2 size={18} /> : <Clock size={18} />}
          </div>
          <div>
            <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-primary)" }}>
              Daily Typing Goal
            </div>
            <div style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
              {reached ? "Goal reached! Keep it up." : `${minutesLeft.toFixed(1)} minutes to go today.`}
            </div>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "16px", fontWeight: 800, color: reached ? "var(--lush-lime)" : accentColor }}>
            {pct}%
          </div>
          <div style={{ fontSize: "11px", fontWeight: 600, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            {todayMinutes.toFixed(1)} / {goalMinutes} min
          </div>
        </div>
      </div>

      <div style={{ height: "8px", borderRadius: "4px", background: "rgba(var(--border-color-rgb), 0.3)", overflow: "hidden", position: "relative" }}>
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            borderRadius: "4px",
            background: reached ? "var(--lush-lime)" : `linear-gradient(90deg, ${accentColor}, rgba(${accentRgb}, 0.7))`,
            transition: "width 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)"
          }}
        />
      </div>

      {reached && (
        <div style={{ marginTop: "10px", fontSize: "11px", color: "var(--lush-lime)", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px" }}>
          <span>✨</span> Daily goal completed! Every extra minute builds mastery.
        </div>
      )}
    </div>
  );
}

import { CheckCircle2, Circle } from "lucide-react";

export default function GoalStatusIndicator({
  goalMinutes,
  todayMinutes,
  accentColor = "var(--accent-primary)",
  accentRgb = "0, 191, 255",
}) {
  if (!goalMinutes || goalMinutes <= 0) return null;

  const reached = todayMinutes >= goalMinutes;
  const minutesLeft = Math.max(0, Math.round(goalMinutes - todayMinutes));

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        padding: "8px 11px",
        borderRadius: "999px",
        border: `1px solid rgba(${accentRgb}, 0.24)`,
        background: `rgba(${accentRgb}, 0.11)`,
        color: accentColor,
        fontSize: "12px",
        fontWeight: 700,
        letterSpacing: "0.01em",
        whiteSpace: "nowrap",
      }}
    >
      {reached ? <CheckCircle2 size={14} /> : <Circle size={14} />}
      <span>
        {reached ? "Goal done" : minutesLeft > 0 ? `${minutesLeft}m to go` : "Start today"}
      </span>
    </div>
  );
}

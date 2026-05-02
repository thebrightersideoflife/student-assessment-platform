import { currentISOWeek } from "../utils/streakHelpers";

/**
 * StreakCard
 *
 * Displays the student's current streak and all-time best.
 *
 * Props:
 *   streak      number   — consecutive weeks (0 = no streak)
 *   longest     number   — all-time best streak in weeks
 *   isAtRisk    bool     — true when current week has no completion yet
 *   activeWeeks string[] — sorted ISO week strings (for the mini activity grid)
 */
export default function StreakCard({ streak, longest, isAtRisk, activeWeeks = [] }) {
  const hasStreak = streak > 0;

  // Show the last 12 ISO weeks as a mini activity grid
  const GRID_SIZE = 12;
  const weekSet = new Set(activeWeeks);
  const gridWeeks = [];
  let cursor = currentISOWeek();
  for (let i = 0; i < GRID_SIZE; i++) {
    gridWeeks.unshift(cursor);
    // Step back one week manually via a small helper
    const [year, wStr] = cursor.split("-W");
    const w = parseInt(wStr, 10);
    const jan4 = new Date(Date.UTC(parseInt(year, 10), 0, 4));
    const dayOfWeek = (jan4.getUTCDay() + 6) % 7;
    const monday = new Date(jan4);
    monday.setUTCDate(jan4.getUTCDate() - dayOfWeek + (w - 1) * 7 - 1);
    cursor = [
      String(monday.getUTCFullYear()),
      "-W",
      String(
        Math.ceil(
          ((monday -
            new Date(Date.UTC(monday.getUTCFullYear(), 0, 1))) /
            86400000 +
            1) /
            7
        )
      ).padStart(2, "0"),
    ].join("");
  }

  const flameColor = isAtRisk
    ? "var(--golden-amber)"
    : hasStreak
    ? "var(--sunset-orange)"
    : "var(--text-secondary)";

  const borderColor = isAtRisk
    ? "rgba(244,169,0,0.35)"
    : hasStreak
    ? "rgba(255,127,36,0.35)"
    : "rgba(var(--border-color-rgb),0.45)";

  const bgGradient = isAtRisk
    ? "linear-gradient(135deg, rgba(244,169,0,0.06), rgba(var(--bg-card-rgb),0.82))"
    : hasStreak
    ? "linear-gradient(135deg, rgba(255,127,36,0.08), rgba(var(--bg-card-rgb),0.82))"
    : "rgba(var(--bg-card-rgb),0.72)";

  return (
    <div
      style={{
        background: bgGradient,
        backdropFilter: "blur(12px) saturate(160%)",
        WebkitBackdropFilter: "blur(12px) saturate(160%)",
        border: `1px solid ${borderColor}`,
        borderRadius: "14px",
        padding: "24px 28px",
        marginBottom: "32px",
        display: "flex",
        alignItems: "center",
        gap: "28px",
        flexWrap: "wrap",
      }}
    >
      {/* Flame + streak number */}
      <div style={{ display: "flex", alignItems: "center", gap: "14px", flexShrink: 0 }}>
        <span
          style={{
            fontSize: "42px",
            lineHeight: 1,
            filter: hasStreak && !isAtRisk ? "drop-shadow(0 0 8px rgba(255,127,36,0.5))" : "none",
            animation: hasStreak && !isAtRisk ? "flamePulse 2s ease-in-out infinite" : "none",
          }}
        >
          🔥
        </span>
        <div>
          <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
            <span
              style={{
                fontSize: "36px",
                fontWeight: 800,
                color: flameColor,
                lineHeight: 1,
                letterSpacing: "-1px",
              }}
            >
              {streak}
            </span>
            <span style={{ fontSize: "16px", color: "var(--text-secondary)", fontWeight: 500 }}>
              {streak === 1 ? "week" : "weeks"}
            </span>
          </div>
          <div
            style={{
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.07em",
              textTransform: "uppercase",
              color: flameColor,
              marginTop: "2px",
            }}
          >
            Current streak
          </div>
        </div>
      </div>

      {/* Divider */}
      <div
        style={{
          width: "1px",
          height: "48px",
          background: "rgba(var(--border-color-rgb),0.4)",
          flexShrink: 0,
        }}
      />

      {/* Best + status message */}
      <div style={{ flex: 1, minWidth: "160px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "18px", marginBottom: "8px" }}>
          <div>
            <span style={{ fontSize: "20px", fontWeight: 700, color: "var(--text-primary)" }}>
              {longest}
            </span>
            <span
              style={{
                fontSize: "12px",
                color: "var(--text-secondary)",
                marginLeft: "5px",
                fontWeight: 500,
              }}
            >
              week{longest !== 1 ? "s" : ""} best
            </span>
          </div>
          {longest > 0 && longest === streak && !isAtRisk && (
            <span
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.05em",
                color: "var(--sunset-orange)",
                background: "rgba(255,127,36,0.12)",
                border: "1px solid rgba(255,127,36,0.3)",
                borderRadius: "999px",
                padding: "2px 9px",
                textTransform: "uppercase",
              }}
            >
              🏆 Personal best
            </span>
          )}
        </div>

        <p
          style={{
            fontSize: "13px",
            color: isAtRisk ? "var(--golden-amber)" : "var(--text-secondary)",
            margin: 0,
            lineHeight: 1.5,
          }}
        >
          {!hasStreak
            ? "Complete an assessment this week to start your streak."
            : isAtRisk
            ? "⚠️ Complete an assessment this week to keep your streak alive."
            : streak === 1
            ? "You've started something — one week in."
            : `${streak} weeks in a row. Keep it going.`}
        </p>
      </div>

      {/* Mini activity grid — last 12 weeks */}
      <div style={{ flexShrink: 0 }}>
        <div
          style={{
            fontSize: "11px",
            color: "var(--text-secondary)",
            marginBottom: "6px",
            fontWeight: 500,
            textAlign: "right",
          }}
        >
          Last 12 weeks
        </div>
        <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
          {gridWeeks.map((w, i) => {
            const isActive = weekSet.has(w);
            const isThisWeek = w === currentISOWeek();
            return (
              <div
                key={i}
                title={w}
                style={{
                  width: "14px",
                  height: "14px",
                  borderRadius: "3px",
                  background: isActive
                    ? "var(--sunset-orange)"
                    : "rgba(var(--border-color-rgb),0.4)",
                  border: isThisWeek
                    ? `2px solid ${flameColor}`
                    : "2px solid transparent",
                  transition: "background 0.2s",
                  flexShrink: 0,
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Pulse animation keyframe injected inline */}
      <style>{`
        @keyframes flamePulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
      `}</style>
    </div>
  );
}
/**
 * AssessmentGate
 *
 * Full-screen gate shown before questions render for any quiz/exam week
 * that has a `duration` field. The student explicitly chooses Practice or
 * Timed mode — there is no going back once they click through.
 *
 * Props:
 *   weekLabel        string   — e.g. "Week 4"
 *   kindConfig       object   — from getWeekKindConfig()
 *   duration         number   — minutes (the institution time limit)
 *   bestScore        object|null  — { percentage, attempts } from previous attempt
 *   onSelectMode     function — called with "practice" | "timed"
 */
export default function AssessmentGate({
  weekLabel,
  kindConfig,
  duration,
  bestScore = null,
  onSelectMode,
}) {
  const durationLabel = duration >= 60
    ? `${Math.floor(duration / 60)}h${duration % 60 > 0 ? ` ${duration % 60}m` : ""}`
    : `${duration} min`;

  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 16px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "560px",
          background: "rgba(var(--bg-card-rgb), 0.82)",
          backdropFilter: "blur(16px) saturate(160%)",
          WebkitBackdropFilter: "blur(16px) saturate(160%)",
          border: "1px solid rgba(var(--border-color-rgb), 0.5)",
          borderRadius: "18px",
          padding: "40px 36px",
        }}
      >
        {/* Kind badge */}
        {kindConfig && (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              marginBottom: "16px",
              background: kindConfig.bgColor,
              border: `1px solid ${kindConfig.borderColor}`,
              color: kindConfig.color,
              borderRadius: "999px",
              padding: "4px 14px",
              fontSize: "13px",
              fontWeight: 600,
            }}
          >
            {kindConfig.icon} {kindConfig.label}
          </div>
        )}

        {/* Heading */}
        <h2
          style={{
            fontSize: "24px",
            fontWeight: 700,
            color: "var(--text-primary)",
            marginBottom: "6px",
            lineHeight: 1.3,
          }}
        >
          {weekLabel}
        </h2>
        <p
          style={{
            fontSize: "14px",
            color: "var(--text-secondary)",
            marginBottom: "28px",
            lineHeight: 1.6,
          }}
        >
          {kindConfig?.description || "Choose how you want to attempt this assessment."}
        </p>

        {/* Previous best score — shown only if student has prior attempt */}
        {bestScore !== null && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 14px",
              marginBottom: "24px",
              background: "rgba(var(--bg-secondary-rgb), 0.6)",
              border: "1px solid rgba(var(--border-color-rgb), 0.35)",
              borderRadius: "10px",
              fontSize: "13px",
              color: "var(--text-secondary)",
            }}
          >
            <span style={{ fontSize: "16px" }}>🏆</span>
            <span>
              Your best score:{" "}
              <strong
                style={{
                  color:
                    bestScore.percentage >= 70
                      ? "var(--lush-lime)"
                      : "var(--golden-amber)",
                  fontWeight: 700,
                }}
              >
                {bestScore.percentage}%
              </strong>
              {bestScore.attempts > 1 && (
                <span style={{ marginLeft: "6px", opacity: 0.7 }}>
                  · {bestScore.attempts} attempt{bestScore.attempts !== 1 ? "s" : ""}
                </span>
              )}
            </span>
          </div>
        )}

        {/* Mode cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
          {/* Practice Mode */}
          <button
            onClick={() => onSelectMode("practice")}
            style={{
              width: "100%",
              padding: "18px 20px",
              background: "rgba(var(--bg-secondary-rgb), 0.55)",
              border: "1px solid rgba(var(--border-color-rgb), 0.5)",
              borderRadius: "12px",
              cursor: "pointer",
              textAlign: "left",
              color: "var(--text-primary)",
              transition: "border-color 0.18s ease, background 0.18s ease, transform 0.18s ease",
              display: "flex",
              alignItems: "center",
              gap: "14px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(var(--border-color-rgb), 0.9)";
              e.currentTarget.style.background = "rgba(var(--bg-secondary-rgb), 0.85)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(var(--border-color-rgb), 0.5)";
              e.currentTarget.style.background = "rgba(var(--bg-secondary-rgb), 0.55)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <span style={{ fontSize: "26px", flexShrink: 0 }}>📖</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: "15px", marginBottom: "3px" }}>
                Practice Mode
              </div>
              <div style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                No time limit. Work through questions at your own pace.
              </div>
            </div>
          </button>

          {/* Timed Mode */}
          <button
            onClick={() => onSelectMode("timed")}
            style={{
              width: "100%",
              padding: "18px 20px",
              background: `rgba(var(--bg-secondary-rgb), 0.55)`,
              border: `1px solid ${kindConfig?.borderColor ?? "rgba(var(--border-color-rgb),0.5)"}`,
              borderRadius: "12px",
              cursor: "pointer",
              textAlign: "left",
              color: "var(--text-primary)",
              transition: "border-color 0.18s ease, background 0.18s ease, transform 0.18s ease",
              display: "flex",
              alignItems: "center",
              gap: "14px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = kindConfig?.color ?? "rgba(var(--border-color-rgb),0.9)";
              e.currentTarget.style.background = kindConfig?.bgColor ?? "rgba(var(--bg-secondary-rgb), 0.85)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = kindConfig?.borderColor ?? "rgba(var(--border-color-rgb),0.5)";
              e.currentTarget.style.background = "rgba(var(--bg-secondary-rgb), 0.55)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <span style={{ fontSize: "26px", flexShrink: 0 }}>⏱</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: "15px", marginBottom: "3px", display: "flex", alignItems: "center", gap: "10px" }}>
                Timed Mode
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: kindConfig?.color ?? "var(--accent-secondary)",
                    background: kindConfig?.bgColor ?? "transparent",
                    border: `1px solid ${kindConfig?.borderColor ?? "transparent"}`,
                    borderRadius: "999px",
                    padding: "1px 9px",
                  }}
                >
                  {durationLabel}
                </span>
              </div>
              <div style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                Mirrors the real {kindConfig?.label?.toLowerCase() ?? "assessment"} conditions.
              </div>
            </div>
          </button>
        </div>

        {/* Honest disclaimer */}
        <p
          style={{
            fontSize: "12px",
            color: "var(--text-secondary)",
            lineHeight: 1.6,
            textAlign: "center",
            padding: "0 8px",
          }}
        >
          ⚠️ Timed mode auto-submits when time runs out. You cannot pause.
          Practice mode has no restrictions.
        </p>
      </div>
    </div>
  );
}
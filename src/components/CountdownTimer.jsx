/**
 * CountdownTimer
 *
 * Renders the persistent countdown display during timed mode.
 * Sits above the question list, below the audio player.
 * Visual states:
 *   > 5 min  — neutral (--text-secondary)
 *   ≤ 5 min  — amber (--golden-amber) + subtle pulse
 *   ≤ 1 min  — red (--poppy-red) + stronger pulse
 *   expired  — red, "Time's up — submitting..."
 *
 * Props:
 *   timeRemaining  number   — seconds left
 *   hasExpired     bool
 */
export default function CountdownTimer({ timeRemaining, hasExpired }) {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const display = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  const isCritical = !hasExpired && timeRemaining <= 60;
  const isWarning  = !hasExpired && !isCritical && timeRemaining <= 300;

  const accentColor = hasExpired || isCritical
    ? "var(--poppy-red)"
    : isWarning
    ? "var(--golden-amber)"
    : "var(--text-secondary)";

  const borderColor = hasExpired || isCritical
    ? "rgba(255,64,64,0.35)"
    : isWarning
    ? "rgba(244,169,0,0.35)"
    : "rgba(var(--border-color-rgb),0.45)";

  const bgColor = hasExpired || isCritical
    ? "rgba(255,64,64,0.07)"
    : isWarning
    ? "rgba(244,169,0,0.07)"
    : "rgba(var(--bg-card-rgb),0.6)";

  const pulseAnimation = hasExpired || isCritical
    ? "timerPulseCritical 0.8s ease-in-out infinite"
    : isWarning
    ? "timerPulseWarn 1.6s ease-in-out infinite"
    : "none";

  return (
    <>
      <style>{`
        @keyframes timerPulseWarn {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.72; }
        }
        @keyframes timerPulseCritical {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.82; transform: scale(1.01); }
        }
      `}</style>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "13px 20px",
          marginBottom: "20px",
          background: bgColor,
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: `1px solid ${borderColor}`,
          borderRadius: "12px",
          animation: pulseAnimation,
        }}
      >
        {/* Clock icon */}
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke={accentColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ flexShrink: 0 }}
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>

        {/* Time display */}
        <span
          style={{
            fontFamily: "'Courier New', 'Cascadia Code', monospace",
            fontSize: "22px",
            fontWeight: 700,
            color: accentColor,
            letterSpacing: "0.05em",
            fontVariantNumeric: "tabular-nums",
            lineHeight: 1,
            flexShrink: 0,
          }}
        >
          {hasExpired ? "00:00" : display}
        </span>

        {/* Status label */}
        <span
          style={{
            fontSize: "13px",
            color: accentColor,
            fontWeight: hasExpired || isCritical ? 700 : 500,
          }}
        >
          {hasExpired
            ? "Time's up — submitting…"
            : isCritical
            ? "Less than 1 minute remaining"
            : isWarning
            ? "5 minutes remaining"
            : "Time remaining"}
        </span>

        {/* Right-aligned timed mode badge */}
        <span
          style={{
            marginLeft: "auto",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "var(--text-secondary)",
            background: "rgba(var(--bg-secondary-rgb),0.6)",
            border: "1px solid rgba(var(--border-color-rgb),0.4)",
            borderRadius: "999px",
            padding: "3px 10px",
            flexShrink: 0,
          }}
        >
          ⏱ Timed Mode
        </span>
      </div>
    </>
  );
}
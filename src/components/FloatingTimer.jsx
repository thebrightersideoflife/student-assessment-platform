/**
 * FloatingTimer
 *
 * A fixed-position mini countdown that stacks just above ScrollToggleButton.
 * Only rendered by AssessmentPage when timed mode is active.
 *
 * Intentionally minimal — the student is supposed to be focused on questions.
 * Mirrors the glass-morphism style of ScrollToggleButton exactly.
 *
 * Visual states (match the inline CountdownTimer thresholds):
 *   > 5 min   — neutral glass
 *   ≤ 5 min   — amber tint + subtle pulse
 *   ≤ 1 min   — red tint + faster pulse
 *   expired   — red, "0:00"
 *
 * Props:
 *   timeRemaining  number   — seconds remaining
 *   hasExpired     bool
 */
export default function FloatingTimer({ timeRemaining, hasExpired }) {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const display = `${minutes}:${String(seconds).padStart(2, "0")}`;

  const isCritical = !hasExpired && timeRemaining <= 60;
  const isWarning  = !hasExpired && !isCritical && timeRemaining <= 300;

  // Colour tokens — match CountdownTimer exactly
  const accentColor = hasExpired || isCritical
    ? "var(--poppy-red)"
    : isWarning
    ? "var(--golden-amber)"
    : "var(--text-primary)";

  // Tinted border for warning/critical, plain glass otherwise
  const borderColor = hasExpired || isCritical
    ? "rgba(255,64,64,0.45)"
    : isWarning
    ? "rgba(244,169,0,0.45)"
    : "rgba(255,255,255,0.15)";

  // Subtle background tint on warning/critical
  const bgColor = hasExpired || isCritical
    ? "rgba(255,64,64,0.14)"
    : isWarning
    ? "rgba(244,169,0,0.10)"
    : "rgba(255,255,255,0.08)";

  const pulseAnimation = hasExpired || isCritical
    ? "floatTimerCritical 0.8s ease-in-out infinite"
    : isWarning
    ? "floatTimerWarn 1.6s ease-in-out infinite"
    : "none";

  return (
    <>
      <style>{`
        @keyframes floatTimerWarn {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.68; }
        }
        @keyframes floatTimerCritical {
          0%, 100% { opacity: 1; box-shadow: 0 8px 32px rgba(255,64,64,0.25); }
          50% { opacity: 0.80; box-shadow: 0 8px 32px rgba(255,64,64,0.50); }
        }
      `}</style>

      <div
        title={hasExpired ? "Time's up" : `${display} remaining`}
        style={{
          position: "fixed",
          bottom: "88px",     // 24px base + 52px button + 12px gap
          right: "24px",
          zIndex: 9999,

          /* Same glass morphism as ScrollToggleButton */
          background: bgColor,
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: `1px solid ${borderColor}`,
          borderRadius: "26px",   // pill shape
          boxShadow: "0 8px 32px rgba(0,0,0,0.25)",

          /* Layout */
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "0 14px",
          height: "36px",

          animation: pulseAnimation,
          transition: "background 0.3s ease, border-color 0.3s ease",
          pointerEvents: "none",  // purely informational — never intercepts clicks
        }}
      >
        {/* Clock icon — small, matches the inline version */}
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke={accentColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ flexShrink: 0 }}
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>

        {/* Time readout */}
        <span
          style={{
            fontFamily: "'Courier New', 'Cascadia Code', monospace",
            fontSize: "14px",
            fontWeight: 700,
            color: accentColor,
            letterSpacing: "0.04em",
            fontVariantNumeric: "tabular-nums",
            lineHeight: 1,
          }}
        >
          {hasExpired ? "0:00" : display}
        </span>
      </div>
    </>
  );
}
/**
 * FloatingProgressRing
 *
 * A fixed-position circular progress indicator — the left-side counterpart
 * to FloatingTimer (which sits on the right, timed mode only). Shown in
 * BOTH practice and timed mode, since "how many have I answered" is useful
 * regardless of whether the clock is running.
 *
 * Mirrors the glass-morphism style of FloatingTimer/ScrollToggleButton
 * exactly — same blur, border, shadow language, just circular instead
 * of pill-shaped, and anchored bottom-left instead of bottom-right.
 *
 * Visual states:
 *   in progress  — neutral glass, ring fills with --accent-primary
 *   complete     — ring turns --lush-lime, subtle one-shot glow
 *
 * Props:
 *   answered   number  — questions answered/saved so far
 *   total      number  — total required questions
 */
export default function FloatingProgressRing({ answered, total }) {
  const safeTotal = total > 0 ? total : 1;
  const ratio = Math.min(Math.max(answered / safeTotal, 0), 1);
  const isComplete = total > 0 && answered >= total;

  // Ring geometry
  const size = 56;
  const stroke = 4;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - ratio);

  const ringColor = isComplete ? "var(--lush-lime)" : "var(--accent-primary)";

  const borderColor = isComplete
    ? "rgba(118,209,61,0.45)"
    : "rgba(255,255,255,0.15)";

  const bgColor = isComplete
    ? "rgba(118,209,61,0.12)"
    : "rgba(255,255,255,0.08)";

  return (
    <>
      <style>{`
        @keyframes progressRingComplete {
          0%   { box-shadow: 0 8px 32px rgba(118,209,61,0.20); }
          50%  { box-shadow: 0 8px 32px rgba(118,209,61,0.45); }
          100% { box-shadow: 0 8px 32px rgba(118,209,61,0.20); }
        }
      `}</style>

      <div
        title={`${answered} of ${total} questions answered`}
        style={{
          position: "fixed",
          bottom: "24px",
          left: "24px",
          zIndex: 9999,

          /* Same glass morphism as FloatingTimer */
          background: bgColor,
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: `1px solid ${borderColor}`,
          borderRadius: "50%",
          boxShadow: "0 8px 32px rgba(0,0,0,0.25)",

          width: `${size}px`,
          height: `${size}px`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          animation: isComplete ? "progressRingComplete 1.6s ease-in-out 1" : "none",
          transition: "background 0.3s ease, border-color 0.3s ease",
          pointerEvents: "none", // purely informational — never intercepts clicks
        }}
      >
        {/* SVG ring */}
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }}
        >
          {/* Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth={stroke}
          />
          {/* Progress */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={ringColor}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            style={{ transition: "stroke-dashoffset 0.4s ease, stroke 0.3s ease" }}
          />
        </svg>

        {/* Centre label */}
        <span
          style={{
            fontFamily: "'Courier New', 'Cascadia Code', monospace",
            fontSize: "12px",
            fontWeight: 700,
            color: isComplete ? "var(--lush-lime)" : "var(--text-primary)",
            letterSpacing: "0.01em",
            lineHeight: 1,
            fontVariantNumeric: "tabular-nums",
            textAlign: "center",
          }}
        >
          {answered}/{total}
        </span>
      </div>
    </>
  );
}
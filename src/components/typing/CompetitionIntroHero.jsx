// src/components/typing/CompetitionIntroHero.jsx
import { Trophy, BarChart3, Clock, User } from "lucide-react";
import { RACER_META } from "./CompetitionRaceTrack";

const PREVIEW_TEXT = "Every session gives you a meaningful benchmark, helping you track progress, stay motivated, and build lasting improvement—one race at a time.";
const HIGHLIGHT_WORD = "progress";

const RACER_ORDER = ["best", "average", "lastRecorded", "you"];
const RACER_ICON = {
  best:         Trophy,
  average:      BarChart3,
  lastRecorded: Clock,
  you:          User,
};
const RACER_DESC = {
  best:         "Your all-time personal record.",
  average:      "Your typical performance.",
  lastRecorded: "Your most recent attempt.",
  you:          "Your live run.",
};

function PreviewSparkline({ color }) {
  return (
    <svg viewBox="0 0 160 40" width="100%" height="36" preserveAspectRatio="none">
      <polyline
        points="0,30 20,28 40,24 60,26 80,18 100,20 120,10 140,8 160,4"
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="160" cy="4" r="4" fill={color} />
    </svg>
  );
}

// Converts a CSS color reference used elsewhere (e.g. "var(--lush-lime)")
// into a plain rgba() wash for card backgrounds/borders. RACER_META's
// colors are all var(...) references to keep them theme-aware, but we need
// an actual RGB triplet here to build a translucent tint — each token
// already has a matching "-rgb"-less hex defined once in colors.css/dark.css/
// light.css, so rather than hardcode a parallel rgb map (which WOULD drift
// out of sync with those files over time), each card reads its tint via a
// CSS custom property set inline, letting the browser resolve the real
// color and mix it at render time instead of us guessing the RGB by hand.
function racerCardStyle(color) {
  return {
    background: `color-mix(in srgb, ${color} 10%, var(--bg-card))`,
    border: `1px solid color-mix(in srgb, ${color} 28%, var(--border-color))`,
  };
}

// NOTE: racerCardStyle is currently unused — the racer preview row below
// switched to standalone cards using the same flat var(--bg-card) styling
// as the live-preview card, rather than a per-racer color tint. Left in
// place in case that tinted treatment gets reinstated elsewhere.


export default function CompetitionIntroHero({ moduleName, unlockState, onStart }) {
  return (
    // Outer wrapper carries the animated spark border (same traveling
    // conic-gradient treatment as the "Compete" button elsewhere) —
    // deliberately NOT overflow:hidden, since the border pseudo-element
    // sits 1px outside this box (inset: -1px) and would get clipped
    // otherwise. Rounded-corner content clipping instead happens on the
    // inner wrapper just below.
    <div className="hero-spark-border" style={{
      position: "relative",
      isolation: "isolate",
      borderRadius: "24px",
    }}>
      <div style={{
        background: "var(--bg-primary)",
        borderRadius: "24px",
        overflow: "hidden",
      }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "40px",
        padding: "56px 48px 40px",
      }}>
        {/* ── Left: headline + CTA ─────────────────────────────────── */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <h1 style={{ fontSize: "40px", fontWeight: 800, lineHeight: 1.1, margin: "0 0 16px" }}>
            Compete<br />
            <span style={{ color: "var(--accent-primary)" }}>Against </span>
            <span style={{ color: "var(--vibrant-cyan)" }}>Yourself</span>
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "16px", lineHeight: 1.6, marginBottom: "28px", maxWidth: "420px" }}>
            The fastest way to improve isn't by chasing someone else's score—it's
            by beating your own, on {moduleName}.
          </p>
          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
            <button
              className="button"
              onClick={onStart}
              style={{
                // Pinned to --sunset-orange directly (not --accent-secondary,
                // which swaps to --vibrant-cyan in dark mode) so this button
                // stays orange in both themes, per spec.
                background: "var(--sunset-orange)",
                color: "white",
                border: "none",
                padding: "14px 24px",
                borderRadius: "12px",
                fontWeight: 700,
                fontSize: "15px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
              }}
            >
              {unlockState?.unlocked ? "Start Typing Now" : "Start Practice Run"} →
            </button>
          </div>
          {!unlockState?.unlocked && (
            <p style={{ marginTop: "14px", fontSize: "13px", color: "var(--text-secondary)" }}>
              Practice run {(unlockState?.attemptsRecorded ?? 0) + 1} of 3 — ghosts unlock
              once you've completed 3 runs at this difficulty.
            </p>
          )}
        </div>

        {/* ── Right: live-preview card ─────────────────────────────── */}
        <div style={{
          background: "var(--bg-card)",
          border: "1px solid rgba(var(--border-color-rgb), 0.4)",
          borderRadius: "18px",
          padding: "20px 22px",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
            {[
              { label: "Time", value: "00:45", color: "var(--sunset-orange)" },
              { label: "WPM", value: "72", color: "var(--vibrant-cyan)" },
              { label: "Accuracy", value: "96%", color: "var(--lush-lime)" },
            ].map((s) => (
              <div key={s.label}>
                <div style={{ fontSize: "12px", color: "var(--text-secondary)" }}>{s.label}</div>
                <div style={{ fontSize: "20px", fontWeight: 800, color: s.color, fontVariantNumeric: "tabular-nums" }}>
                  {s.value}
                </div>
              </div>
            ))}
          </div>
          <p style={{
            fontFamily: "'Courier New', Courier, monospace",
            fontSize: "15px",
            lineHeight: 1.8,
            color: "var(--text-secondary)",
          }}>
            {PREVIEW_TEXT.split(HIGHLIGHT_WORD).map((chunk, i, arr) => (
              <span key={i}>
                {chunk}
                {i < arr.length - 1 && (
                  <span style={{ background: "color-mix(in srgb, var(--accent-primary) 25%, transparent)", borderRadius: "3px", padding: "0 3px" }}>
                    {HIGHLIGHT_WORD}
                  </span>
                )}
              </span>
            ))}
          </p>
        </div>
      </div>

      {/* ── Racer identity preview row — each racer in its own standalone
          rounded card, matching the preview card's exact styling (same
          background, border, and radius) rather than a flush shared-seam
          grid ─────────────────────────────────────────────────────────── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "16px",
        padding: "0 48px 48px",
      }}>
        {RACER_ORDER.map((id) => {
          const meta = RACER_META[id];
          const Icon = RACER_ICON[id];
          return (
            <div
              key={id}
              style={{
                background: "var(--bg-card)",
                border: "1px solid rgba(var(--border-color-rgb), 0.4)",
                borderRadius: "18px",
                padding: "20px 22px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                <Icon size={18} color={meta.color} strokeWidth={2.25} />
                <span style={{ fontWeight: 700, fontSize: "15px", color: "var(--text-primary)" }}>{meta.label}</span>
              </div>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", margin: "0 0 12px" }}>
                {RACER_DESC[id]}
              </p>
              <PreviewSparkline color={meta.color} />
            </div>
          );
        })}
      </div>
      </div>

      <style>{`
        /* ── Hero spark border — same traveling conic-gradient treatment as
           the "Compete" button elsewhere, so the card reads as "this is the
           thing that leads to Compete" before you even read the text. A
           thin border with light continuously sweeping around it, rather
           than a solid or static-gradient outline. */
        @property --hero-spark-angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }

        .hero-spark-border::before {
          content: "";
          position: absolute;
          inset: -2.5px;
          z-index: -1;
          border-radius: inherit;
          padding: 2.5px;
          background: conic-gradient(
            from var(--hero-spark-angle),
            transparent 0%,
            var(--vibrant-cyan) 10%,
            transparent 24%,
            transparent 76%,
            var(--golden-amber) 90%,
            transparent 100%
          );
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          animation: hero-spark-spin 3.4s linear infinite;
        }

        @keyframes hero-spark-spin {
          to { --hero-spark-angle: 360deg; }
        }
      `}</style>
    </div>
  );
}
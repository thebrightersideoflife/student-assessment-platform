// src/components/typing/GoalAchievementModal.jsx
//
// Congratulatory modal shown when a daily practice goal (time or WPM
// personal best) is reached. Built entirely from this app's existing
// tokens (colors.css / dark.css / light.css) so it adapts to both themes
// automatically.
//
// ── kind-specific identity ──────────────────────────────────────────────
// The two milestones this celebrates are different feelings — "you're
// typing FAST right now" vs "you put in the TIME today" — so instead of
// one generic trophy card with a label swap, each `kind` gets its own
// hero illustration, accent color, and default copy:
//
//   kind="wpm"   Trophy hero with a celebratory glow and ring, cyan accent
//                (var(--vibrant-cyan)) — visually "you won this milestone".
//   kind="time"  Stopwatch hero with pulsing concentric rings (a finish-
//                line/lap feel, matching the "Lap 2!" copy this already
//                gets from TypingResults), amber accent
//                (var(--golden-amber)) — visually "steady, building up".
//
// Both accent tokens are identical across light/dark themes (see
// colors.css), so no theme-branching logic is needed here either.
//
// Usage:
//   <GoalAchievementModal
//     open={showGoalModal}
//     kind="wpm" // or "time"
//     goalLabel="New Personal Best!"
//     goalValue={72}
//     goalUnit="wpm"
//     stats={[{ icon: "bolt", value: "98%", label: "Accuracy" }, ...]}
//     onDismiss={() => setShowGoalModal(false)}
//   />

import { useContext, useEffect, useRef } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import GoalConfetti from "./GoalConfetti";

const STAT_ICONS = {
  bolt: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  flame: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 17a2.5 2.5 0 0 0 2.5-2.5c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7.5 7.5 0 1 1-15 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  ),
  trend: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
    </svg>
  ),
  clock: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  bolt2: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
};

// ── Per-kind identity ────────────────────────────────────────────────────
// Everything that makes the two milestones feel different lives here, in
// one place, so adding a third kind later is "add one entry" rather than
// hunting through the JSX for every spot that assumed only two existed.
const KIND_CONFIG = {
  wpm: {
    accent: "var(--vibrant-cyan)",
    accentRgb: "0, 191, 255",
    titleEmoji: "🏆",
    defaultTitle: "Congratulations!",
    defaultSubtitle: "You're typing faster than ever today!",
    ringIcon: "bolt2",
    heroClass: "gam-hero-wpm",
  },
  time: {
    accent: "var(--golden-amber)",
    accentRgb: "244, 169, 0",
    titleEmoji: "🏁",
    defaultTitle: "Congratulations!",
    defaultSubtitle: "You reached your daily practice goal!",
    ringIcon: "clock",
    heroClass: "gam-hero-time",
  },
};

// Trophy hero — a bright, celebratory burst framed as a win rather than
// a speed streak, so WPM milestones feel like "you nailed it" rather than
// "you were fast".
function TrophyHero() {
  return (
    <div className="gam-hero gam-hero-wpm" aria-hidden="true">
      <div className="gam-trophy-glow" />
      <div className="gam-trophy-icon">🏆</div>
      <div className="gam-trophy-ring" />
    </div>
  );
}

// Stopwatch hero — concentric rings pulsing outward like a finish-line
// beacon, evoking a lap completing rather than a one-off badge.
function PulseRingHero() {
  return (
    <div className="gam-hero gam-hero-time" aria-hidden="true">
      <div className="gam-pulse-ring gam-pulse-1" />
      <div className="gam-pulse-ring gam-pulse-2" />
      <div className="gam-pulse-ring gam-pulse-3" />
      <div className="gam-stopwatch-icon">⏱️</div>
    </div>
  );
}

export default function GoalAchievementModal({
  open,
  kind = "time", // "wpm" | "time" — drives illustration, accent, default copy
  goalLabel,
  goalValue,
  goalUnit = "min",
  message,
  encouragement = "Keep it up!",
  stats = [],
  celebrationMode, // "wpm" | "silver" | "time" — passed through to GoalConfetti; defaults to kind
  onDismiss,
}) {
  const { theme } = useContext(ThemeContext);
  const cardRef = useRef(null);
  const cfg = KIND_CONFIG[kind] || KIND_CONFIG.time;

  const resolvedLabel = goalLabel || cfg.defaultTitle;
  const resolvedSubtitle = message || cfg.defaultSubtitle;
  const resolvedConfettiMode = celebrationMode || (kind === "wpm" ? "wpm" : "time");

  useEffect(() => {
    if (!open) return;
    cardRef.current?.focus();
    const onKey = (e) => { if (e.key === "Escape") onDismiss?.(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onDismiss]);

  if (!open) return null;

  return (
    <div
      className="gam-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onDismiss?.(); }}
      style={{ "--gam-accent": cfg.accent, "--gam-accent-rgb": cfg.accentRgb }}
    >
      <GoalConfetti mode={resolvedConfettiMode} theme={theme} />
      <div ref={cardRef} className="gam-card" role="dialog" aria-modal="true" aria-label={resolvedLabel} tabIndex={-1}>
        <button className="gam-close" onClick={onDismiss} aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {kind === "wpm" ? <TrophyHero /> : <PulseRingHero />}

        <h2 className="gam-title">
          <span aria-hidden="true">{cfg.titleEmoji}</span> {resolvedLabel}
        </h2>
        <p className="gam-subtitle">{resolvedSubtitle}</p>

        <div className="gam-goal-row">
          <div className="gam-ring" aria-hidden="true">
            <svg viewBox="0 0 100 100" width="76" height="76">
              <circle cx="50" cy="50" r="42" fill="none" stroke="var(--border-color)" strokeWidth="8" />
              <circle
                className="gam-ring-fill"
                cx="50" cy="50" r="42" fill="none"
                stroke="var(--gam-accent)" strokeWidth="8" strokeLinecap="round"
                strokeDasharray="264" strokeDashoffset="264"
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="gam-ring-center">
              {STAT_ICONS[cfg.ringIcon]}
              <span className="gam-ring-value">{goalValue}</span>
              <span className="gam-ring-unit">{goalUnit}</span>
            </div>
          </div>

          <div className="gam-goal-copy">
            <div className="gam-goal-label">
              {resolvedLabel}
              <span className="gam-check" aria-hidden="true">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
            </div>
            <p className="gam-goal-message">{resolvedSubtitle}</p>
            <p className="gam-encouragement">{encouragement} <span aria-hidden="true">{kind === "wpm" ? "🏆" : "🚀"}</span></p>
          </div>
        </div>

        {stats.length > 0 && (
          <>
            <div className="gam-divider"><span>Today's stats</span></div>
            <div className="gam-stats">
              {stats.map((s, i) => (
                <div className="gam-stat" key={i}>
                  <span className="gam-stat-icon">{STAT_ICONS[s.icon] || STAT_ICONS.bolt}</span>
                  <span className="gam-stat-value">{s.value}</span>
                  <span className="gam-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="gam-actions">
          <button className="gam-btn gam-btn-primary" onClick={onDismiss}>
            Keep practicing
          </button>
        </div>
      </div>

      <style>{`
        .gam-overlay {
          position: fixed; inset: 0; z-index: 1200;
          background: rgba(0, 0, 0, 0.55);
          display: flex; align-items: center; justify-content: center;
          padding: 20px;
          animation: gam-overlay-fade 0.25s ease;
        }
        @keyframes gam-overlay-fade { from { opacity: 0; } to { opacity: 1; } }

        .gam-card {
          position: relative;
          width: 100%; max-width: 400px;
          background: var(--bg-card);
          border: 1px solid rgba(var(--gam-accent-rgb), 0.4);
          border-radius: 20px;
          padding: 28px 26px 24px;
          box-shadow: 0 24px 60px rgba(0,0,0,0.35), 0 0 46px rgba(var(--gam-accent-rgb), 0.18);
          animation: gam-card-in 0.35s cubic-bezier(0.2, 0.9, 0.3, 1.2);
        }
        @keyframes gam-card-in {
          from { opacity: 0; transform: translateY(10px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .gam-close {
          position: absolute; top: 14px; right: 14px;
          width: 28px; height: 28px; border-radius: 8px;
          border: none; background: transparent; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          color: var(--text-secondary); opacity: 0.7;
          transition: opacity 0.15s ease, background 0.15s ease;
        }
        .gam-close:hover { opacity: 1; background: rgba(var(--border-color-rgb), 0.4); }

        /* ── Hero container (shared) ── */
        .gam-hero {
          position: relative; height: 100px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 4px; overflow: hidden;
        }

        /* ── WPM: trophy hero ─────────────────────────────────────────────── */
        .gam-trophy-glow {
          position: absolute; inset: 0;
          background: radial-gradient(circle, rgba(0, 191, 255, 0.30) 0%, transparent 72%);
          filter: blur(14px);
          animation: gam-trophy-glow-pulse 1.25s ease-in-out infinite;
        }
        @keyframes gam-trophy-glow-pulse {
          0%, 100% { opacity: 0.8; transform: scale(0.96); }
          50%       { opacity: 1;   transform: scale(1.08); }
        }
        .gam-trophy-icon {
          position: relative;
          font-size: 58px; line-height: 1;
          filter: drop-shadow(0 0 14px rgba(0, 191, 255, 0.55));
          animation: gam-trophy-bounce 1.8s ease-in-out 0.2s infinite;
        }
        @keyframes gam-trophy-bounce {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          20%       { transform: translateY(-6px) rotate(-4deg); }
          40%       { transform: translateY(0) rotate(0deg); }
          60%       { transform: translateY(-3px) rotate(4deg); }
          80%       { transform: translateY(0) rotate(-2deg); }
        }
        .gam-trophy-ring {
          position: absolute; inset: 12px;
          border: 3px solid rgba(0, 191, 255, 0.45);
          border-radius: 999px;
          animation: gam-trophy-ring-spin 2.8s linear infinite;
        }
        @keyframes gam-trophy-ring-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        /* ── Time: pulse-ring hero ──────────────────────────────────────── */
        .gam-pulse-ring {
          position: absolute;
          width: 64px; height: 64px; border-radius: 50%;
          border: 2.5px solid var(--golden-amber);
          animation: gam-pulse-out 2.2s ease-out infinite;
        }
        .gam-pulse-2 { animation-delay: 0.7s; }
        .gam-pulse-3 { animation-delay: 1.4s; }
        @keyframes gam-pulse-out {
          0%   { transform: scale(1);   opacity: 0.75; }
          100% { transform: scale(2.3); opacity: 0; }
        }
        .gam-stopwatch-icon {
          position: relative;
          font-size: 48px; line-height: 1;
          filter: drop-shadow(0 6px 14px rgba(244, 169, 0, 0.4));
          animation: gam-stopwatch-pop 0.5s cubic-bezier(0.2, 0.9, 0.3, 1.3) 0.05s both,
                     gam-stopwatch-tick 1s steps(2) 0.6s infinite;
        }
        @keyframes gam-stopwatch-pop {
          0%   { opacity: 0; transform: scale(0.4) translateY(10px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes gam-stopwatch-tick {
          0%, 100% { transform: rotate(-4deg); }
          50%       { transform: rotate(4deg); }
        }

        .gam-title {
          margin: 4px 0 2px; text-align: center;
          font-size: 22px; font-weight: 800; color: var(--text-primary);
        }
        .gam-subtitle {
          margin: 0 0 18px; text-align: center;
          font-size: 13px; color: var(--text-secondary);
        }

        .gam-goal-row {
          display: flex; align-items: center; gap: 16px;
          background: rgba(var(--gam-accent-rgb), 0.10);
          border: 1px solid rgba(var(--gam-accent-rgb), 0.3);
          border-radius: 14px; padding: 16px 18px;
        }
        .gam-ring { position: relative; flex-shrink: 0; width: 76px; height: 76px; }
        .gam-ring-fill { animation: gam-ring-fill 1s cubic-bezier(0.2, 0.7, 0.3, 1) 0.3s forwards; }
        @keyframes gam-ring-fill { to { stroke-dashoffset: 0; } }
        .gam-ring-center {
          position: absolute; inset: 0;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          color: var(--gam-accent);
        }
        .gam-ring-value { font-size: 18px; font-weight: 800; line-height: 1.1; color: var(--text-primary); }
        .gam-ring-unit { font-size: 10px; font-weight: 600; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.04em; }

        .gam-goal-copy { min-width: 0; }
        .gam-goal-label {
          display: flex; align-items: center; gap: 6px;
          font-size: 15px; font-weight: 800; color: var(--gam-accent);
        }
        .gam-check {
          display: inline-flex; align-items: center; justify-content: center;
          width: 16px; height: 16px; border-radius: 50%;
          background: var(--lush-lime); flex-shrink: 0;
        }
        .gam-goal-message { margin: 3px 0 0; font-size: 12px; color: var(--text-secondary); line-height: 1.4; }
        .gam-encouragement { margin: 4px 0 0; font-size: 12px; font-weight: 700; color: var(--gam-accent); }

        .gam-divider {
          display: flex; align-items: center; gap: 10px; margin: 18px 0 12px;
          color: var(--text-secondary); font-size: 10px; font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase;
        }
        .gam-divider::before, .gam-divider::after {
          content: ""; flex: 1; height: 1px; background: rgba(var(--border-color-rgb), 0.5);
        }

        .gam-stats {
          display: grid; grid-template-columns: repeat(${Math.max(stats.length, 1)}, 1fr); gap: 8px;
        }
        .gam-stat { display: flex; flex-direction: column; align-items: center; gap: 3px; text-align: center; }
        .gam-stat-icon { color: var(--gam-accent); }
        .gam-stat-value { font-size: 15px; font-weight: 800; color: var(--text-primary); }
        .gam-stat-label { font-size: 10px; color: var(--text-secondary); }

        .gam-actions { display: flex; gap: 10px; margin-top: 22px; }
        .gam-btn {
          flex: 1;
          display: flex; align-items: center; justify-content: center; gap: 7px;
          padding: 11px 14px; border-radius: 10px;
          font-size: 13px; font-weight: 700; cursor: pointer;
          transition: transform 0.15s ease, opacity 0.15s ease;
        }
        .gam-btn:hover { transform: translateY(-1px); }
        .gam-btn-primary { border: none; background: var(--gam-accent); color: var(--bg-primary); }

        @media (prefers-reduced-motion: reduce) {
          .gam-overlay, .gam-card, .gam-ring-fill, .gam-btn,
          .gam-trophy-icon, .gam-trophy-glow, .gam-trophy-ring,
          .gam-stopwatch-icon, .gam-pulse-ring { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
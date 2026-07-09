// src/components/typing/GoalAchievementModal.jsx
//
// Congratulatory modal shown once per day when a daily practice goal
// (time or WPM) is reached. Built entirely from this app's existing
// tokens (colors.css / dark.css / light.css) so it adapts to both themes
// automatically. The trophy stays golden-amber/sunset-orange in both
// themes on purpose — gold doesn't change color with the lights.
//
// Usage:
//   <GoalAchievementModal
//     open={showGoalModal}
//     goalLabel="Daily Goal Completed"
//     goalValue={60}
//     goalUnit="min"
//     stats={[{ icon: "bolt", value: "98%", label: "Accuracy" }, ...]}
//     onShare={() => {...}}
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
};

export default function GoalAchievementModal({
  open,
  goalLabel = "Daily Goal Completed",
  goalValue,
  goalUnit = "min",
  message = "Great consistency leads to great results.",
  encouragement = "Keep it up!",
  stats = [],
  celebrationMode = "time", // "wpm" | "silver" | "time" — passed through to GoalConfetti
  onDismiss,
}) {
  const { theme } = useContext(ThemeContext);
  const cardRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    cardRef.current?.focus();
    const onKey = (e) => { if (e.key === "Escape") onDismiss?.(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onDismiss]);

  if (!open) return null;

  return (
    <div className="gam-overlay" onClick={(e) => { if (e.target === e.currentTarget) onDismiss?.(); }}>
      <GoalConfetti mode={celebrationMode} theme={theme} />
      <div ref={cardRef} className="gam-card" role="dialog" aria-modal="true" aria-label={goalLabel} tabIndex={-1}>
        <button className="gam-close" onClick={onDismiss} aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="gam-hero">
          <div className="gam-trophy" aria-hidden="true">🏆</div>
        </div>

        <h2 className="gam-title">
          <span aria-hidden="true">🎉</span> Congratulations!
        </h2>
        <p className="gam-subtitle">You reached your daily practice goal!</p>

        <div className="gam-goal-row">
          <div className="gam-ring" aria-hidden="true">
            <svg viewBox="0 0 100 100" width="76" height="76">
              <circle cx="50" cy="50" r="42" fill="none" stroke="var(--border-color)" strokeWidth="8" />
              <circle
                className="gam-ring-fill"
                cx="50" cy="50" r="42" fill="none"
                stroke="var(--accent-primary)" strokeWidth="8" strokeLinecap="round"
                strokeDasharray="264" strokeDashoffset="264"
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="gam-ring-center">
              {STAT_ICONS.clock}
              <span className="gam-ring-value">{goalValue}</span>
              <span className="gam-ring-unit">{goalUnit}</span>
            </div>
          </div>

          <div className="gam-goal-copy">
            <div className="gam-goal-label">
              {goalLabel}
              <span className="gam-check" aria-hidden="true">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
            </div>
            <p className="gam-goal-message">{message}</p>
            <p className="gam-encouragement">{encouragement} <span aria-hidden="true">🚀</span></p>
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
          border: 1px solid var(--border-color);
          border-radius: 20px;
          padding: 28px 26px 24px;
          box-shadow: 0 24px 60px rgba(0,0,0,0.35);
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

        .gam-hero {
          position: relative; height: 96px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 4px; overflow: hidden;
        }
        .gam-trophy {
          font-size: 56px; line-height: 1;
          filter: drop-shadow(0 6px 14px rgba(244, 169, 0, 0.35));
          animation: gam-trophy-pop 0.5s cubic-bezier(0.2, 0.9, 0.3, 1.3) 0.1s both;
        }
        @keyframes gam-trophy-pop {
          0%   { opacity: 0; transform: scale(0.4) translateY(10px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
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
          background: rgba(var(--border-color-rgb), 0.18);
          border: 1px solid rgba(var(--border-color-rgb), 0.5);
          border-radius: 14px; padding: 16px 18px;
        }
        .gam-ring { position: relative; flex-shrink: 0; width: 76px; height: 76px; }
        .gam-ring-fill { animation: gam-ring-fill 1s cubic-bezier(0.2, 0.7, 0.3, 1) 0.3s forwards; }
        @keyframes gam-ring-fill { to { stroke-dashoffset: 0; } }
        .gam-ring-center {
          position: absolute; inset: 0;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          color: var(--accent-primary);
        }
        .gam-ring-value { font-size: 18px; font-weight: 800; line-height: 1.1; color: var(--text-primary); }
        .gam-ring-unit { font-size: 10px; font-weight: 600; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.04em; }

        .gam-goal-copy { min-width: 0; }
        .gam-goal-label {
          display: flex; align-items: center; gap: 6px;
          font-size: 15px; font-weight: 800; color: var(--accent-primary);
        }
        .gam-check {
          display: inline-flex; align-items: center; justify-content: center;
          width: 16px; height: 16px; border-radius: 50%;
          background: var(--lush-lime); flex-shrink: 0;
        }
        .gam-goal-message { margin: 3px 0 0; font-size: 12px; color: var(--text-secondary); line-height: 1.4; }
        .gam-encouragement { margin: 4px 0 0; font-size: 12px; font-weight: 700; color: var(--golden-amber); }

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
        .gam-stat-icon { color: var(--golden-amber); }
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
        .gam-btn-primary { border: none; background: var(--accent-primary); color: var(--bg-primary); }
        .gam-btn-secondary {
          border: 1px solid rgba(var(--border-color-rgb), 0.7);
          background: transparent; color: var(--text-primary);
        }

        @media (prefers-reduced-motion: reduce) {
          .gam-overlay, .gam-card, .gam-trophy, .gam-ring-fill, .gam-btn { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
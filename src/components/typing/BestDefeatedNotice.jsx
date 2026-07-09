// src/components/typing/BestDefeatedNotice.jsx
//
// Shown once, right after Results mounts, when the player has beaten the
// "Best" ghost in this race (see CompetitionResults.jsx's defeatedBest
// check). Mirrors BestChallengeNotice's visual language — same fixed
// near-black cinematic card, same artwork, same golden-amber accents —
// since this is the payoff to that earlier "challenger has emerged"
// moment. Unlike that notice, this one is dismissible (the race is
// already over, nothing is gated behind it).

import { useEffect, useState } from "react";
import GoalConfetti from "./GoalConfetti";

const IMAGE_SRC = "/images/Best_Player-Typing_Competition.png";

// How long dismissal (keyboard AND click) is locked out after this notice
// mounts. Beating Best usually means the player was just mashing
// space/enter as fast as possible to finish the race — without this delay
// that same keystroke immediately fires onDismiss (autoFocus + native
// button activation on Enter/Space) before the celebration is ever seen.
const DISMISS_LOCKOUT_MS = 3000;

export default function BestDefeatedNotice({
  yourWpm, yourAccuracy, yourTime,
  bestWpm, bestAccuracy, bestTime,
  onDismiss,
}) {
  const [canDismiss, setCanDismiss] = useState(false);
  // Seconds remaining, purely for the button label countdown below.
  const [secondsLeft, setSecondsLeft] = useState(Math.ceil(DISMISS_LOCKOUT_MS / 1000));

  useEffect(() => {
    const unlockTimer = setTimeout(() => setCanDismiss(true), DISMISS_LOCKOUT_MS);
    const tickTimer = setInterval(() => {
      setSecondsLeft((s) => Math.max(0, s - 1));
    }, 1000);
    return () => { clearTimeout(unlockTimer); clearInterval(tickTimer); };
  }, []);

  useEffect(() => {
    // Guarded on canDismiss — during the lockout window this listener is
    // effectively a no-op, so a residual Enter/Escape keyup from finishing
    // the race can't close the notice before the lockout lifts.
    const onKeyDown = (e) => {
      if (!canDismiss) return;
      if (e.key === "Enter" || e.key === "Escape") onDismiss();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [canDismiss, onDismiss]);

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-label="You defeated your Best self"
      className="bdn-backdrop"
      onClick={(e) => { if (canDismiss && e.target === e.currentTarget) onDismiss(); }}
    >
      <GoalConfetti mode="wpm" theme="dark" accentColor="var(--golden-amber)" />
      <div className="bdn-card">
        <div className="bdn-art-glow" aria-hidden="true" />
        <img src={IMAGE_SRC} alt="Your Best self, defeated" className="bdn-art" />

        <h1 className="bdn-headline">I AM DEFEATED!</h1>
        <h2 className="bdn-subtitle">You have bested your Best Self</h2>

        <div className="bdn-stats">
          <div className="bdn-stat">
            <span className="bdn-stat-label">WPM</span>
            <span className="bdn-stat-value">{yourWpm}</span>
            <span className="bdn-stat-vs">Best: {bestWpm ?? "—"}</span>
          </div>
          <div className="bdn-stat">
            <span className="bdn-stat-label">Accuracy</span>
            <span className="bdn-stat-value">{yourAccuracy}%</span>
            <span className="bdn-stat-vs">Best: {bestAccuracy != null ? `${bestAccuracy}%` : "—"}</span>
          </div>
          <div className="bdn-stat">
            <span className="bdn-stat-label">Time</span>
            <span className="bdn-stat-value">{Math.round(yourTime)}s</span>
            <span className="bdn-stat-vs">Best: {bestTime != null ? `${Math.round(bestTime)}s` : "—"}</span>
          </div>
        </div>

        {/* Not autoFocus anymore — focusing this immediately meant a
            trailing Enter/Space keypress from the race itself would
            activate it natively the instant this mounts, lockout or not.
            Disabled (not just click-guarded) during the lockout window so
            neither mouse clicks nor native keyboard activation (Enter/
            Space on a focused button) can slip through. */}
        <button
          type="button"
          onClick={onDismiss}
          disabled={!canDismiss}
          className="bdn-continue-btn"
        >
          <span className="bdn-bracket" aria-hidden="true">~[</span>
          <span className="bdn-continue-label">
            {canDismiss ? "Continue" : `Continue (${secondsLeft}s)`}
          </span>
          <span className="bdn-bracket" aria-hidden="true">]~</span>
        </button>
      </div>

      <style>{`
        .bdn-backdrop {
          position: fixed; inset: 0; z-index: 20000;
          display: flex; align-items: center; justify-content: center;
          padding: 24px;
          background: rgba(0, 0, 0, 0.88);
          backdrop-filter: blur(6px);
          animation: bdn-backdrop-in 0.35s ease both;
        }

        .bdn-card {
          position: relative;
          max-width: 440px; width: 100%;
          padding: 40px 36px 34px;
          text-align: center;
          display: flex; flex-direction: column; align-items: center; gap: 4px;
          border-radius: 26px;
          background: #05070C;
          border: 1px solid rgba(244, 169, 0, 0.55);
          box-shadow:
            0 0 0 1px rgba(244, 169, 0, 0.12),
            0 0 46px rgba(244, 169, 0, 0.30),
            0 0 110px rgba(244, 169, 0, 0.16),
            0 30px 80px rgba(0, 0, 0, 0.6);
          animation: bdn-card-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) both, bdn-border-breathe 4s ease-in-out infinite;
          animation-delay: 0.05s, 0.5s;
        }

        .bdn-art-glow {
          position: absolute; top: 24px;
          width: 240px; height: 240px; border-radius: 50%;
          background: radial-gradient(circle, rgba(244, 169, 0, 0.28) 0%, transparent 68%);
          filter: blur(6px);
          animation: bdn-glow-pulse 4.5s ease-in-out infinite;
        }

        .bdn-art {
          position: relative;
          width: 190px; height: 190px;
          object-fit: contain;
          margin-bottom: 6px;
          filter: grayscale(0.25) brightness(0.9);
        }

        .bdn-headline {
          position: relative;
          margin: 4px 0 0;
          font-size: 28px;
          font-weight: 800;
          line-height: 1.2;
          letter-spacing: 0.01em;
          background: linear-gradient(100deg, #D98F00 10%, var(--golden-amber) 40%, #FFE29A 50%, var(--golden-amber) 60%, #D98F00 90%);
          background-size: 220% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: bdn-shimmer-sweep 5s ease-in-out infinite;
        }

        .bdn-subtitle {
          position: relative;
          margin: 6px 0 0;
          font-size: 16px; font-weight: 500; line-height: 1.4;
          color: #EAF2FF; opacity: 0.92;
        }

        .bdn-stats {
          position: relative;
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          margin-top: 22px; width: 100%;
        }
        .bdn-stat {
          display: flex; flex-direction: column; align-items: center; gap: 2px;
          padding: 10px 6px;
          border-radius: 12px;
          background: rgba(244, 169, 0, 0.06);
          border: 1px solid rgba(244, 169, 0, 0.22);
        }
        .bdn-stat-label {
          font-size: 10px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase;
          color: #9FB3C8;
        }
        .bdn-stat-value { font-size: 18px; font-weight: 800; color: #EAF2FF; }
        .bdn-stat-vs { font-size: 11px; color: var(--golden-amber); opacity: 0.85; }

        .bdn-continue-btn {
          position: relative;
          margin-top: 22px;
          padding: 13px 34px;
          border-radius: 12px;
          cursor: pointer;
          background: rgba(244, 169, 0, 0.08);
          border: 1.5px solid var(--golden-amber);
          box-shadow: 0 0 0 1px rgba(244, 169, 0, 0.1) inset, 0 0 22px rgba(244, 169, 0, 0.28);
          transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
          display: inline-flex; align-items: center; gap: 8px;
        }
        .bdn-continue-btn:hover {
          transform: translateY(-2px);
          background: rgba(244, 169, 0, 0.16);
          box-shadow: 0 0 0 1px rgba(244, 169, 0, 0.18) inset, 0 0 34px rgba(244, 169, 0, 0.42);
        }
        .bdn-continue-btn:active { transform: translateY(0px) scale(0.97); background: rgba(244, 169, 0, 0.22); }
        .bdn-continue-btn:disabled {
          cursor: default;
          opacity: 0.55;
          transform: none;
          box-shadow: 0 0 0 1px rgba(244, 169, 0, 0.1) inset, 0 0 14px rgba(244, 169, 0, 0.16);
        }
        .bdn-continue-btn:disabled:hover { transform: none; background: rgba(244, 169, 0, 0.08); }

        .bdn-continue-label { font-weight: 800; font-size: 16px; letter-spacing: 0.02em; color: var(--golden-amber); }
        .bdn-bracket { font-weight: 800; font-size: 18px; color: var(--golden-amber); opacity: 0.75; }

        @keyframes bdn-backdrop-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes bdn-card-in {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes bdn-glow-pulse {
          0%, 100% { opacity: 0.7; transform: scale(0.97); }
          50%       { opacity: 1;   transform: scale(1.04); }
        }
        @keyframes bdn-shimmer-sweep {
          0%, 100% { background-position: 100% 0; }
          50%       { background-position: -20% 0; }
        }
        @keyframes bdn-border-breathe {
          0%, 100% { box-shadow: 0 0 0 1px rgba(244, 169, 0, 0.12), 0 0 46px rgba(244, 169, 0, 0.30), 0 0 110px rgba(244, 169, 0, 0.16), 0 30px 80px rgba(0, 0, 0, 0.6); }
          50%       { box-shadow: 0 0 0 1px rgba(244, 169, 0, 0.18), 0 0 60px rgba(244, 169, 0, 0.42), 0 0 130px rgba(244, 169, 0, 0.22), 0 30px 80px rgba(0, 0, 0, 0.6); }
        }

        @media (prefers-reduced-motion: reduce) {
          .bdn-backdrop, .bdn-card, .bdn-art-glow, .bdn-headline { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
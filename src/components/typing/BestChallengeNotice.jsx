// src/components/typing/BestChallengeNotice.jsx
//
// Full-screen notice shown right before a race that will include "Best" as
// a racer (see useCompetitionFlow.js's decideRoster). Deliberately has only
// one button and no dismiss path — no backdrop-click-to-close, no "Not now"
// — facing your own Best is framed as an event to rise to, not an optional
// matchup to decline. Passage + ghosts are already fully prepared by the
// time this renders (see handleStartRace/handleRaceAgain); accepting just
// reveals the race screen that's already sitting ready underneath.
//
// ── Visual language ──────────────────────────────────────────────────────
// Built to match a reference mockup: the artwork itself (public/images/
// Best_Player-Typing_Competition.png) is a transparent-background emblem
// that ALREADY has its own baked-in golden ring + glow + teal accent swirl
// — so this component doesn't wrap it in another circular border the way
// an earlier version did; it just gives it room and a soft bloom behind
// it. Big gold-gradient headline ("A challenger has emerged"), the actual
// required copy ("Your Best Self Has Challenged You") as a smaller
// subtitle beneath it, bracket-flanked outline button.
//
// DELIBERATE CHOICE: unlike most of this app, the card here is locked to a
// fixed near-black palette rather than following the app's light/dark
// theme — the reference only reads correctly on black, and this is a
// one-off cinematic moment (closer to a splash/reveal screen) rather than
// a themed UI surface. var(--golden-amber) is used for the gold accents
// anyway since it's one of the few tokens that's already IDENTICAL in both
// themes (see colors.css) — so nothing here actually fights the app's
// palette, it's just not following the bg/text swap. Revisit if this
// should instead adapt per-theme.
import { useEffect } from "react";

const IMAGE_SRC = "/images/Best_Player-Typing_Competition.png"; // public/

export default function BestChallengeNotice({ onAccept, isFirstAttempt = false }) {
  // Enter also accepts — this notice blocks the flow either way, so
  // there's no harm in the fast path, and it matches "press Enter to
  // continue" conventions elsewhere in the typing flow.
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Enter") onAccept();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onAccept]);

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-label="Your Best self has challenged you"
      className="bcn-backdrop"
    >
      <div className="bcn-card">
        <div className="bcn-art-glow" aria-hidden="true" />
        <img
          src={IMAGE_SRC}
          alt="An illustration of your Best self"
          className="bcn-art"
        />

        <h1 className="bcn-headline">A challenger has emerged</h1>
        <h2 className="bcn-subtitle">Your Best Self Has Challenged You</h2>

        {isFirstAttempt && (
          <p className="bcn-subtext">
            This is your very first race — Best is here to give you something to chase from day one.
          </p>
        )}

        <button
          type="button"
          onClick={onAccept}
          autoFocus
          className="bcn-accept-btn"
        >
          <span className="bcn-bracket" aria-hidden="true">~[</span>
          <span className="bcn-accept-label">Accept</span>
          <span className="bcn-bracket" aria-hidden="true">]~</span>
        </button>
      </div>

      <style>{`
        .bcn-backdrop {
          position: fixed;
          inset: 0;
          z-index: 20000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background: rgba(0, 0, 0, 0.88);
          backdrop-filter: blur(6px);
          animation: bcn-backdrop-in 0.35s ease both;
        }

        .bcn-card {
          position: relative;
          max-width: 420px;
          width: 100%;
          padding: 40px 36px 34px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          border-radius: 26px;
          background: #05070C;
          border: 1px solid rgba(244, 169, 0, 0.55);
          box-shadow:
            0 0 0 1px rgba(244, 169, 0, 0.12),
            0 0 46px rgba(244, 169, 0, 0.30),
            0 0 110px rgba(244, 169, 0, 0.16),
            0 30px 80px rgba(0, 0, 0, 0.6);
          animation: bcn-card-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) both, bcn-border-breathe 4s ease-in-out infinite;
          animation-delay: 0.05s, 0.5s;
        }

        /* Soft warm bloom sitting behind the artwork — the artwork already
           has its own glow baked in, this just extends that bloom a
           little further into the card so the emblem doesn't look pasted
           on top of a flat background. */
        .bcn-art-glow {
          position: absolute;
          top: 24px;
          width: 240px;
          height: 240px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(244, 169, 0, 0.28) 0%, transparent 68%);
          filter: blur(6px);
          animation: bcn-glow-pulse 4.5s ease-in-out infinite;
        }

        .bcn-art {
          position: relative;
          width: 200px;
          height: 200px;
          object-fit: contain;
          margin-bottom: 6px;
        }

        .bcn-headline {
          position: relative;
          margin: 4px 0 0;
          font-size: 26px;
          font-weight: 800;
          line-height: 1.25;
          letter-spacing: 0.005em;
          background: linear-gradient(100deg, #D98F00 10%, var(--golden-amber) 40%, #FFE29A 50%, var(--golden-amber) 60%, #D98F00 90%);
          background-size: 220% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: bcn-shimmer-sweep 5s ease-in-out infinite;
        }

        .bcn-subtitle {
          position: relative;
          margin: 6px 0 0;
          font-size: 16px;
          font-weight: 500;
          line-height: 1.4;
          color: #EAF2FF;
          opacity: 0.92;
        }

        .bcn-subtext {
          position: relative;
          margin: 10px 0 0;
          font-size: 13px;
          color: #9FB3C8;
          line-height: 1.55;
          max-width: 300px;
        }

        .bcn-accept-btn {
          position: relative;
          margin-top: 22px;
          padding: 13px 34px;
          border-radius: 12px;
          cursor: pointer;
          background: rgba(244, 169, 0, 0.08);
          border: 1.5px solid var(--golden-amber);
          box-shadow: 0 0 0 1px rgba(244, 169, 0, 0.1) inset, 0 0 22px rgba(244, 169, 0, 0.28);
          transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .bcn-accept-btn:hover {
          transform: translateY(-2px);
          background: rgba(244, 169, 0, 0.16);
          box-shadow: 0 0 0 1px rgba(244, 169, 0, 0.18) inset, 0 0 34px rgba(244, 169, 0, 0.42);
        }
        .bcn-accept-btn:active {
          transform: translateY(0px) scale(0.97);
          background: rgba(244, 169, 0, 0.22);
        }

        .bcn-accept-label {
          font-weight: 800;
          font-size: 16px;
          letter-spacing: 0.02em;
          color: var(--golden-amber);
        }
        .bcn-bracket {
          font-weight: 800;
          font-size: 18px;
          color: var(--golden-amber);
          opacity: 0.75;
        }

        @keyframes bcn-backdrop-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes bcn-card-in {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes bcn-glow-pulse {
          0%, 100% { opacity: 0.7; transform: scale(0.97); }
          50%       { opacity: 1;   transform: scale(1.04); }
        }
        @keyframes bcn-shimmer-sweep {
          0%, 100% { background-position: 100% 0; }
          50%       { background-position: -20% 0; }
        }
        @keyframes bcn-border-breathe {
          0%, 100% { box-shadow: 0 0 0 1px rgba(244, 169, 0, 0.12), 0 0 46px rgba(244, 169, 0, 0.30), 0 0 110px rgba(244, 169, 0, 0.16), 0 30px 80px rgba(0, 0, 0, 0.6); }
          50%       { box-shadow: 0 0 0 1px rgba(244, 169, 0, 0.18), 0 0 60px rgba(244, 169, 0, 0.42), 0 0 130px rgba(244, 169, 0, 0.22), 0 30px 80px rgba(0, 0, 0, 0.6); }
        }
      `}</style>
    </div>
  );
}
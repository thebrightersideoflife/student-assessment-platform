// src/components/typing/TypingResults.jsx

import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { deriveStats, computeSessionStats, loadSessions } from "../../utils/typingStorage";
import GoalConfetti from "./GoalConfetti";
import WpmChart from "./WpmChart";
import {
  StatBlock, MiniStat, NextTestMiniButton, MetricsBar, DailyGoalBars,
  RaiseGoalPrompt, ActionButton, Icons,
} from "./TypingResultsBits";

// ── Main export ───────────────────────────────────────────────────────────────

export default function TypingResults({
  result, moduleId, moduleName, durationLabel, mode,
  dailyGoalWpm, dailyGoalTime,
  onOpenSettings, onRaiseGoal,
  onTypingReport, onGoToModule,
  onRetry, onNextTest, onChangeModule,
  isUnitMode = false, onUnitTest,
}) {
  const { theme } = useContext(ThemeContext);
  const { correctChars, incorrectChars, rawErrors, elapsedSeconds, snapshots = [] } = result;

  const { wpm, rawWpm, accuracy, score, consistency: consistencyNum } = computeSessionStats({
    correctChars, incorrectChars, rawErrors, elapsedSeconds, snapshots,
  });
  const consistency = consistencyNum === null ? "—" : `${consistencyNum}%`;

  const accColor = accuracy > 95 ? "var(--lush-lime)"
                 : accuracy > 80 ? "var(--vibrant-cyan)"
                 : accuracy > 65 ? "var(--golden-amber)"
                 : "var(--poppy-red)";

  const [derived, setDerived] = useState(null);

  // saveSessionDetail (in typingStorage) is called synchronously in
  // TypingPracticePage's handleFinish, BEFORE setResult — so by the time
  // this component mounts, the just-finished session is already the last
  // entry in the session log. Reading it back here (instead of maintaining
  // a separate write-your-own-summary record) guarantees these stats can
  // never drift from what TypingReportPage shows, since both read the
  // exact same mode-filtered array.
  useEffect(() => {
    const modeSessions = loadSessions().filter((s) => s.mode === mode);
    setDerived(deriveStats(modeSessions, wpm, elapsedSeconds));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const wpmGoalReached = dailyGoalWpm && wpm >= dailyGoalWpm;
  const [raiseGoalDismissed, setRaiseGoalDismissed] = useState(false);

  // ── Today's accumulated typing time (from session log) ─────────────────
  // saveSessionDetail is called before setResult in handleFinish, so the
  // current session is already in localStorage by the time this mounts.
  const todayISO = new Date().toISOString().slice(0, 10);
  const todayTotalSeconds = loadSessions()
    .filter((s) => s.date === todayISO)
    .reduce((sum, s) => sum + (s.duration ?? 0), 0);

  // Time goal reached = cumulative today minutes ≥ goalTime
  const timeGoalReached = dailyGoalTime && (todayTotalSeconds / 60) >= dailyGoalTime;

  // Confetti: wpm goal wins if both are true (bigger celebration)
  const confettiMode = wpmGoalReached ? "wpm" : timeGoalReached ? "time" : null;

  return (
    <div>
      {confettiMode && <GoalConfetti mode={confettiMode} theme={theme} />}
      {/* ── Header row ── */}
      <div style={{
        display: "flex", alignItems: "flex-start", justifyContent: "space-between",
        gap: "20px", marginBottom: "20px",
      }}>
        {/* Left: title + metrics */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap", marginBottom: "4px" }}>
            <h2 style={{ margin: 0, fontSize: "24px", fontWeight: 800, color: "var(--text-primary)" }}>
              Test complete
            </h2>
            {wpmGoalReached && (
              <span style={{
                display: "inline-flex", alignItems: "center", gap: "5px",
                fontSize: "12px", fontWeight: 700, letterSpacing: "0.05em",
                color: "var(--lush-lime)",
                border: "1px solid var(--lush-lime)",
                borderRadius: "999px", padding: "3px 10px",
                opacity: 0.95,
              }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                WPM goal reached!
              </span>
            )}
          </div>
          <p style={{ color: "var(--text-secondary)", fontSize: "13px", margin: "0 0 6px" }}>
            {moduleName} · {durationLabel}
          </p>
          <MetricsBar wpm={wpm} accuracy={accuracy} score={score} derived={derived} />
          <DailyGoalBars wpm={wpm} elapsedSeconds={todayTotalSeconds} goalWpm={dailyGoalWpm} goalTime={dailyGoalTime} />
          {wpmGoalReached && onRaiseGoal && !raiseGoalDismissed && (
            <RaiseGoalPrompt
              goalWpm={dailyGoalWpm}
              wpm={wpm}
              onAccept={(newGoal) => { onRaiseGoal(newGoal); setRaiseGoalDismissed(true); }}
              onDismiss={() => setRaiseGoalDismissed(true)}
            />
          )}
        </div>

        {/* Right: action buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: "5px", flexShrink: 0, minWidth: "200px" }}>

          {/* Top tier — primary navigation, side by side */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5px" }}>
            <button
              onClick={onTypingReport}
              className="button solid"
              style={{ justifyContent: "center", padding: "8px 8px", fontSize: "12px", fontWeight: 700, borderRadius: "8px", gap: "5px" }}
            >
              <Icons.BarChart /> Report
            </button>
            <button
              onClick={onGoToModule}
              className="button solid"
              style={{ justifyContent: "center", padding: "8px 8px", fontSize: "12px", fontWeight: 700, borderRadius: "8px", gap: "5px" }}
            >
              <Icons.Module /> Module
            </button>
          </div>

          {/* Settings tier — Daily goal, Difficulty, and Duration now live
              behind a single "Settings" button (gear icon) that opens the
              same SettingsModal; the modal's own tabs handle switching
              between goal / difficulty / duration. Placed before "Module"
              per the combined-button request. */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5px" }}>
            <ActionButton onClick={() => onOpenSettings("goal")} icon={<Icons.Settings />} label="Settings" />
            <ActionButton onClick={onChangeModule} icon={<Icons.Back />} label="Module" />
          </div>

          {/* Unit Typing entry point — always offered on the results
              screen (timed or unit) so the user can hop into an untimed
              single-unit session without going back through module select. */}
          {onUnitTest && (
            <button
              onClick={onUnitTest}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: "5px",
                padding: "8px 10px", borderRadius: "8px",
                border: "1px solid rgba(var(--border-color-rgb), 0.4)",
                cursor: "pointer",
                fontSize: "12px", fontWeight: 700,
                background: "transparent",
                color: "var(--text-primary)",
                transition: "background 0.15s ease, border-color 0.15s ease",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(var(--border-color-rgb), 0.2)"; e.currentTarget.style.borderColor = "rgba(var(--border-color-rgb), 0.7)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(var(--border-color-rgb), 0.4)"; }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
              Unit Test
            </button>
          )}

          {/* Bottom tier — repeat (Next Test now lives in the stats row below) */}
          <button
            onClick={onRetry}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: "5px",
              padding: "8px 10px", borderRadius: "8px", border: "none", cursor: "pointer",
              fontSize: "12px", fontWeight: 700,
              background: "rgba(var(--border-color-rgb), 0.25)",
              color: "var(--text-primary)",
              transition: "background 0.15s ease",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(var(--border-color-rgb), 0.45)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(var(--border-color-rgb), 0.25)"}
          >
            <Icons.Retry /> Repeat
          </button>
        </div>
      </div>

      {/* ── Stats card ── */}
      <div className="card" style={{ padding: "24px 28px", marginBottom: "20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: "24px", alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <StatBlock label="wpm" value={wpm} color="var(--accent-primary)" large />
            <StatBlock label="acc" value={`${accuracy}%`} color={accColor} large />
          </div>
          <WpmChart snapshots={snapshots} duration={elapsedSeconds} />
        </div>

        <div style={{ borderTop: "1px solid rgba(var(--border-color-rgb), 0.4)", margin: "20px 0 16px" }} />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "16px", alignItems: "center" }}>
          <MiniStat label="test type" value={isUnitMode ? `unit ${Math.round(elapsedSeconds)}s` : `time ${Math.round(elapsedSeconds)}`} />
          <MiniStat label="raw" value={rawWpm} />
          <MiniStat
            label="characters"
            value={
              <span>
                <span style={{ color: "var(--lush-lime)" }}>{correctChars}</span>
                <span style={{ color: "var(--text-secondary)", fontSize: "12px" }}> / </span>
                <span style={{ color: "var(--poppy-red)" }}>{incorrectChars}</span>
              </span>
            }
            subLabel="correct / incorrect"
          />
          <MiniStat label="consistency" value={consistency} />
          <NextTestMiniButton onClick={onNextTest} />
        </div>

      </div>

      <style>{`
        /* Only the arrow glyphs animate — not the button, not the label —
           a slow, gentle horizontal nudge suggesting "go on to the next one".
           The second arrow lags slightly so the pair reads as a forward
           gesture rather than two things just twitching in sync. */
        @keyframes tr-arrow-nudge {
          0%, 100% { transform: translateX(0); opacity: 0.55; }
          50%      { transform: translateX(3px); opacity: 1; }
        }
        .tr-arrow-1 {
          display: inline-block;
          animation: tr-arrow-nudge 1.4s ease-in-out infinite;
        }
        .tr-arrow-2 {
          display: inline-block;
          margin-left: -3px;
          animation: tr-arrow-nudge 1.4s ease-in-out infinite;
          animation-delay: 0.12s;
        }

        /* Ripple: rings expand outward from the button's edge and fade as
           they grow — three of them, staggered by a third of the cycle
           each, so at any moment there are two rings visible at clearly
           different sizes (one freshly born, one mid-expansion) rather
           than a single ring quietly fading in and out. That distinction
           — multiple simultaneous, differently-sized rings — is what
           actually reads as "ripple" instead of "pulsing outline."

           Animates the "inset" property in fixed pixels rather than
           transform:scale(). scale() multiplies both axes by the same factor, which looks
           fine on a circle/square but is wrong on a wide pill: 12% of a
           ~90px width is a much bigger jump than 12% of a ~38px height,
           so the ring visibly stretched sideways and barely moved
           vertically. Pushing all four edges outward by the same pixel
           amount expands evenly in every direction regardless of the
           button's aspect ratio. */
        .tr-next-test-wrap {
          position: relative;
          display: block;
          width: 100%;
        }
        .tr-ripple {
          position: absolute;
          inset: 0;
          border-radius: 10px;
          border: 1.5px solid var(--accent-primary);
          pointer-events: none;
          animation: tr-ripple 3.6s ease-out infinite;
        }
        .tr-ripple-2 { animation-delay: 1.2s; }
        .tr-ripple-3 { animation-delay: 2.4s; }
        @keyframes tr-ripple {
          0%   { inset: 0;      border-radius: 10px; opacity: 0.55; }
          75%  { inset: -14px;  border-radius: 20px; opacity: 0; }
          100% { inset: -14px;  border-radius: 20px; opacity: 0; }
        }
      `}</style>
    </div>
  );
}
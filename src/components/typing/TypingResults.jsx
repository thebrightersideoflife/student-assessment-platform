// src/components/typing/TypingResults.jsx

import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Zap, Keyboard } from "lucide-react";
import { ThemeContext } from "../../context/ThemeContext";
import {
  deriveStats, computeSessionStats, loadSessions, getCompetitionUnlockState,
  getTodayPracticeSeconds, computeStreaks, checkTimeMilestone, checkWpmMilestone,
  getCombinedModeSessions,
} from "../../utils/typingStorage";
import GoalAchievementModal from "./GoalAchievementModal";
import WpmChart from "./WpmChart";
import {
  StatBlock, MiniStat, NextTestMiniButton, MetricsBar, DailyGoalBars,
  RaiseGoalPrompt, ActionButton, Icons, SettingsBadgeRow,
} from "./TypingResultsBits";

// ── Tip ──────────────────────────────────────────────────────────────────
// Small CSS-only hover tooltip wrapper for the action-panel buttons below
// (Report / Module / Settings / Module / Unit Test / Repeat / Compete) —
// several of those are icon+single-word labels (or share the same label,
// like the two "Module" buttons, which actually go to two different
// places), so a quick hover explanation clarifies what each one actually
// does without needing extra click-through. Pure CSS (no hover state in
// JS) so it doesn't fight each button's own hover styling underneath —
// the wrapper just adds a positioned bubble on top via ::after.
function Tip({ text, children }) {
  return (
    <div className="tr-tip" data-tooltip={text}>
      {children}
    </div>
  );
}

export default function TypingResults({
  result, moduleId, moduleName, durationLabel, mode,
  dailyGoalWpm, dailyGoalTime,
  onOpenSettings, onRaiseGoal,
  onTypingReport, onGoToModule,
  onRetry, onNextTest, onChangeModule,
  isUnitMode = false, onUnitTest,
  saveRejectedReason = null,
}) {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
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
  const [streak, setStreak] = useState(null);

  const [showSaveToast, setShowSaveToast] = useState(false);
  useEffect(() => {
    if (!saveRejectedReason) { setShowSaveToast(false); return; }
    setShowSaveToast(true);
    const t = setTimeout(() => setShowSaveToast(false), 5000);
    return () => clearTimeout(t);
  }, [saveRejectedReason]);

  useEffect(() => {
    setDerived(deriveStats(getCombinedModeSessions(mode), wpm, elapsedSeconds));
    setStreak(computeStreaks(loadSessions()));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [competitionUnlock, setCompetitionUnlock] = useState(null);
  useEffect(() => {
    setCompetitionUnlock(getCompetitionUnlockState(moduleId, mode));
  }, [moduleId, mode]);

  const wpmGoalReached = dailyGoalWpm && wpm >= dailyGoalWpm;
  const [raiseGoalDismissed, setRaiseGoalDismissed] = useState(false);

  // Today's accumulated typing time across both session logs (Timed/Unit + Competition).
  const todayTotalSeconds = getTodayPracticeSeconds();

  // ── Goal achievement modal ───────────────────────────────────────────────
  // Fires repeatedly across a day, not just once — checkTimeMilestone re-fires
  // every time today's total crosses another multiple of the time goal, and
  // checkWpmMilestone re-fires every time a session both clears the WPM goal
  // and sets a new personal best FOR TODAY. Time is checked first: if a
  // session happens to cross both at once, the time milestone takes it (it's
  // the rarer, bigger one at multiples of the goal), and WPM gets its own
  // moment on a session where only it advances.
  const [activeGoalModal, setActiveGoalModal] = useState(null); // { kind, level? } | null
  const celebratedRef = useRef(false);
  useEffect(() => {
    if (celebratedRef.current) return;
    celebratedRef.current = true;
    const timeLevel = checkTimeMilestone(todayTotalSeconds / 60, dailyGoalTime);
    if (timeLevel) {
      setActiveGoalModal({ kind: "time", level: timeLevel });
      return;
    }
    if (checkWpmMilestone(wpm, dailyGoalWpm)) {
      setActiveGoalModal({ kind: "wpm" });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <GoalAchievementModal
        open={activeGoalModal != null}
        goalLabel={
          activeGoalModal?.kind === "wpm"
            ? "New Personal Best!"
            : activeGoalModal?.level > 1
              ? `Daily Goal Completed — Lap ${activeGoalModal.level}!`
              : "Daily Goal Completed"
        }
        goalValue={activeGoalModal?.kind === "wpm" ? wpm : dailyGoalTime}
        goalUnit={activeGoalModal?.kind === "wpm" ? "wpm" : "min"}
        celebrationMode={activeGoalModal?.kind === "wpm" ? "wpm" : "time"}
        message={
          activeGoalModal?.kind === "wpm"
            ? "You just beat your best WPM of the day."
            : activeGoalModal?.level > 1
              ? `That's ${activeGoalModal.level}× your daily goal today.`
              : "Great consistency leads to great results."
        }
        stats={[
          { icon: "bolt", value: `${accuracy}%`, label: "Accuracy" },
          { icon: "flame", value: correctChars + incorrectChars, label: "Chars typed" },
          { icon: "trend", value: streak?.current ?? 0, label: "Streak days" },
        ]}
        onDismiss={() => setActiveGoalModal(null)}
      />

      {showSaveToast && saveRejectedReason && (
        <div
          className="tr-save-toast"
          style={{
            position: "fixed", bottom: "24px", right: "24px", zIndex: 1000,
            display: "flex", alignItems: "center", gap: "8px",
            padding: "12px 16px", borderRadius: "10px",
            background: "var(--poppy-red)",
            border: "1px solid var(--poppy-red)",
            color: "white",
            fontSize: "13px", fontWeight: 600,
            maxWidth: "340px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.28)",
          }}
        >
          <span>⚠</span>
          <span>This attempt wasn't saved. {saveRejectedReason}</span>
        </div>
      )}

      <div style={{
        display: "flex", alignItems: "flex-start", justifyContent: "space-between",
        gap: "20px", marginBottom: "20px",
      }}>
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
            <SettingsBadgeRow mode={mode} durationLabel={durationLabel} goalWpm={dailyGoalWpm} />
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

        <div className="card" style={{
          display: "flex", flexDirection: "column", gap: "5px",
          flexShrink: 0, minWidth: "200px", padding: "14px",
        }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5px" }}>
            <Tip text="See your typing progress over time, with charts">
              <button
                onClick={onTypingReport}
                className="button solid"
                style={{ width: "100%", justifyContent: "center", padding: "8px 8px", fontSize: "12px", fontWeight: 700, borderRadius: "8px", gap: "5px" }}
              >
                <Icons.BarChart /> Report
              </button>
            </Tip>
            <Tip text={`Go to the ${moduleName} module page`}>
              <button
                onClick={onGoToModule}
                className="button solid"
                style={{ width: "100%", justifyContent: "center", padding: "8px 8px", fontSize: "12px", fontWeight: 700, borderRadius: "8px", gap: "5px" }}
              >
                <Icons.Module /> Module
              </button>
            </Tip>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5px" }}>
            <Tip text="Adjust your daily goal, difficulty, or duration">
              <ActionButton onClick={() => onOpenSettings("goal")} icon={<Icons.Settings />} label="Settings" />
            </Tip>
            <Tip text="Pick a different module to practice">
              <ActionButton onClick={onChangeModule} icon={<Icons.Back />} label="Module" />
            </Tip>
          </div>

          {onUnitTest && (
            <div style={{
              display: "grid",
              gridTemplateColumns: competitionUnlock?.unlocked ? "1fr 1fr" : "1fr",
              gap: "5px",
            }}>
              <Tip text="Untimed practice — type one passage at your own pace">
                <button
                  onClick={onUnitTest}
                  className="unit-test-btn"
                  style={{ width: "100%" }}
                >
                  <Keyboard size={13} strokeWidth={2.25} className="unit-test-icon" />
                  Unit Test
                </button>
              </Tip>

              {competitionUnlock?.unlocked && (
                <Tip text="Race ghosts of your average, last, and best runs">
                  <button
                    className="compete-spark-btn"
                    onClick={() => navigate(`/typing/competition/${moduleId}/${mode}`)}
                    style={{ width: "100%" }}
                  >
                    <Zap size={13} strokeWidth={2.5} className="compete-spark-icon" />
                    Compete
                  </button>
                </Tip>
              )}
            </div>
          )}

          <Tip text="Redo this exact test again">
            <button
              onClick={onRetry}
              style={{
                width: "100%",
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
          </Tip>
        </div>
      </div>

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
        @keyframes tr-arrow-nudge {
          0%, 100% { transform: translateX(0); opacity: 0.55; }
          50%      { transform: translateX(3px); opacity: 1; }
        }
        .tr-arrow-1 { display: inline-block; animation: tr-arrow-nudge 1.4s ease-in-out infinite; }
        .tr-arrow-2 { display: inline-block; margin-left: -3px; animation: tr-arrow-nudge 1.4s ease-in-out infinite; animation-delay: 0.12s; }

        .tr-next-test-wrap { position: relative; display: block; width: 100%; }
        .tr-ripple {
          position: absolute; inset: 0; border-radius: 10px;
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

        .tr-save-toast { animation: tr-toast-fade 5s ease forwards; }
        @keyframes tr-toast-fade {
          0%   { opacity: 0; transform: translateY(8px); }
          8%   { opacity: 1; transform: translateY(0); }
          85%  { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(8px); }
        }

        .unit-test-btn {
          display: flex; align-items: center; justify-content: center; gap: 6px;
          padding: 8px 10px; border-radius: 8px; cursor: pointer;
          font-size: 12px; font-weight: 700; letter-spacing: 0.01em;
          background: color-mix(in srgb, var(--cornflower-blue) 12%, var(--bg-card));
          border: 1px solid color-mix(in srgb, var(--cornflower-blue) 38%, transparent);
          color: var(--text-primary);
          transition: transform 0.16s ease, background 0.16s ease, border-color 0.16s ease;
        }
        .unit-test-btn:hover {
          transform: translateY(-1px);
          background: color-mix(in srgb, var(--cornflower-blue) 20%, var(--bg-card));
          border-color: color-mix(in srgb, var(--cornflower-blue) 55%, transparent);
        }
        .unit-test-icon { color: var(--cornflower-blue); flex-shrink: 0; }

        .tr-tip { position: relative; display: block; width: 100%; }
        .tr-tip::after {
          content: attr(data-tooltip);
          position: absolute;
          bottom: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%) translateY(4px);
          padding: 6px 10px;
          border-radius: 8px;
          background: var(--bg-card);
          border: 1px solid rgba(var(--border-color-rgb), 0.6);
          color: var(--text-primary);
          font-size: 11px;
          font-weight: 600;
          line-height: 1.4;
          white-space: normal;
          width: max-content;
          max-width: 180px;
          text-align: center;
          box-shadow: 0 6px 18px rgba(0,0,0,0.18);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.15s ease, transform 0.15s ease;
          z-index: 40;
        }
        .tr-tip:hover::after {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
        @media (hover: none) {
          .tr-tip::after { display: none; }
        }

        @property --spark-angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        .compete-spark-btn {
          position: relative; isolation: isolate;
          display: flex; align-items: center; justify-content: center; gap: 5px;
          padding: 8px 10px; border-radius: 8px; border: none; cursor: pointer;
          background: var(--bg-card); color: var(--text-primary);
          font-size: 12px; font-weight: 700; letter-spacing: 0.02em;
          transition: transform 0.16s ease;
        }
        .compete-spark-btn:hover { transform: translateY(-1px); }
        .compete-spark-btn::before {
          content: "";
          position: absolute; inset: -1px; z-index: -1; border-radius: inherit; padding: 1.4px;
          background: conic-gradient(
            from var(--spark-angle),
            transparent 0%, var(--vibrant-cyan) 10%, transparent 24%,
            transparent 76%, var(--golden-amber) 90%, transparent 100%
          );
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          animation: compete-spark-spin 2.6s linear infinite;
        }
        .compete-spark-btn:hover::before { filter: brightness(1.4); }
        .compete-spark-icon { color: var(--vibrant-cyan); flex-shrink: 0; }
        @keyframes compete-spark-spin { to { --spark-angle: 360deg; } }
      `}</style>
    </div>
  );
}
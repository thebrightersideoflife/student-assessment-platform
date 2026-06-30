// src/pages/TypingPracticePage.jsx
// Orchestrates: module select → duration select → typing test → results.
//
// ── Repeat-test fix ────────────────────────────────────────────────────────
// applyAndSet always shuffles, so "Repeat test" previously behaved identically
// to "Next test". Fix: after computing the final array that will be handed to
// TypingTest, we snapshot it in lastPassagesRef. handleRetry restores that
// exact snapshot — no shuffle, no re-transform.
//
// ── SettingsModal ──────────────────────────────────────────────────────────
// "Set daily goal", "Change difficulty", and "Change time" all open the same
// SettingsModal (defined in TypingResults / passed down). The modal has four
// sections: goal WPM, goal time (default 15 min), difficulty, duration.
// Each action button opens the modal pre-focused on the relevant tab.

import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { modules } from "../data/modules";
import { extractPassages, applyMode, shuffleArray, TYPING_MODES } from "../utils/typingExtractor";
import { loadSettings, saveSettings, saveSessionDetail, computeSessionStats, recordGoalChange } from "../utils/typingStorage";
import Breadcrumb from "../components/Breadcrumb";
import { DurationSelect } from "../components/typing/TypingSetup";
import TypingModuleGrid  from "../components/TypingModuleGrid";
import TypingTest        from "../components/typing/TypingTest";
import TypingResults     from "../components/typing/TypingResults";

const STEP = { MODULE: "module", DURATION: "duration", TYPING: "typing", RESULTS: "results" };

// ── Cross-session recency tracker ─────────────────────────────────────────────
// Stores the IDs of the last RECENCY_CAP passages the user has seen, keyed
// per module so switching modules doesn't pollute each other's history.
// On every shuffle we rotate these to the back so the user always gets fresh
// content first. Incognito sessions have no localStorage, so we silently
// fall back to a plain shuffle — no errors, no warnings.
const RECENCY_CAP = 40; // remember up to this many recent passage IDs per module

function recencyKey(moduleId) {
  return `typing:recency:v1:${moduleId}`;
}

function loadRecentIds(moduleId) {
  try {
    const raw = localStorage.getItem(recencyKey(moduleId));
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveRecentIds(moduleId, ids) {
  try {
    localStorage.setItem(recencyKey(moduleId), JSON.stringify(ids));
  } catch {
    // Incognito / storage full — silently skip
  }
}

/**
 * shuffleWithRecency(passages, moduleId) → Passage[]
 *
 * 1. Fisher-Yates shuffle the full pool.
 * 2. Partition into [unseen, recentlySeen] based on stored IDs.
 * 3. Concatenate unseen first, recently-seen at the back.
 * 4. Update the stored recency log with the first RECENCY_CAP IDs of the
 *    new order (those are what will actually be shown in short sessions).
 */
function shuffleWithRecency(passages, moduleId) {
  // Step 1 — Fisher-Yates
  const arr = [...passages];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  // Step 2 — partition
  const recentSet = new Set(loadRecentIds(moduleId));
  const unseen    = arr.filter((p) => !recentSet.has(p.id));
  const seen      = arr.filter((p) =>  recentSet.has(p.id));

  // Step 3 — unseen first
  const ordered = [...unseen, ...seen];

  // Step 4 — persist the leading slice as the new recency log
  const nextRecentIds = ordered.slice(0, RECENCY_CAP).map((p) => p.id);
  saveRecentIds(moduleId, nextRecentIds);

  return ordered;
}

const DURATION_OPTIONS = [
  { label: "30 sec", seconds: 30 },
  { label: "45 sec", seconds: 45 },
  { label: "60 sec", seconds: 60 },
];

function KeyboardPillIcon({ size = 13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <line x1="6"  y1="10" x2="6"  y2="10" strokeWidth="2.5" />
      <line x1="10" y1="10" x2="10" y2="10" strokeWidth="2.5" />
      <line x1="14" y1="10" x2="14" y2="10" strokeWidth="2.5" />
      <line x1="18" y1="10" x2="18" y2="10" strokeWidth="2.5" />
      <line x1="8"  y1="16" x2="16" y2="16" strokeWidth="2" />
    </svg>
  );
}

// ── SettingsModal ─────────────────────────────────────────────────────────────
// Unified modal for goal WPM, goal time, difficulty, and duration.
// `initialTab`: "goal" | "difficulty" | "duration"

function SettingsModal({
  initialTab = "goal",
  dailyGoalWpm, dailyGoalTime,
  selectedDuration, selectedMode,
  onSave, onClose,
}) {
  const { theme } = useContext(ThemeContext);
  const accentRgb   = theme === "light" ? "42,92,167"        : "244,169,0";
  const accentColor = theme === "light" ? "var(--royal-blue)" : "var(--golden-amber)";

  const [tab, setTab] = useState(initialTab);

  // Goal WPM
  const [goalWpm,  setGoalWpm]  = useState(dailyGoalWpm != null ? String(dailyGoalWpm) : "");
  // Goal time in minutes
  const [goalTime, setGoalTime] = useState(dailyGoalTime ? String(dailyGoalTime) : "15");

  // Difficulty
  const [mode, setMode] = useState(selectedMode || "beginner");

  // Duration
  const [durationSeconds, setDurationSeconds] = useState(selectedDuration?.seconds || 60);
  const [customSecs,      setCustomSecs]      = useState("");
  const [customError,     setCustomError]     = useState("");

  const handleSave = () => {
    const wpm  = parseInt(goalWpm,  10);
    const time = parseInt(goalTime, 10);

    // Duration: use customSecs if filled, else the selected preset
    let finalSeconds = durationSeconds;
    if (customSecs.trim()) {
      const cv = parseInt(customSecs, 10);
      if (isNaN(cv) || cv < 10) { setCustomError("Minimum is 10 seconds."); setTab("duration"); return; }
      if (cv > 3600)             { setCustomError("Maximum is 3600 seconds."); setTab("duration"); return; }
      finalSeconds = cv;
    }

    const minutes = Math.floor(finalSeconds / 60);
    const secs    = finalSeconds % 60;
    const durationLabel = minutes > 0
      ? secs > 0 ? `${minutes}m ${secs}s` : `${minutes} min`
      : `${finalSeconds}s`;

    onSave({
      goalWpm:      !isNaN(wpm)  && wpm  >= 10 ? wpm  : null,
      goalTime:     !isNaN(time) && time >= 1  ? time : 15,
      mode,
      duration: { label: durationLabel, seconds: finalSeconds, mode },
    });
  };

  const tabs = [
    { id: "goal",       label: "Daily Goals"  },
    { id: "difficulty", label: "Difficulty"   },
    { id: "duration",   label: "Duration"     },
  ];

  const inputStyle = {
    width: "100%", padding: "12px 14px", fontSize: "16px", fontWeight: 600,
    borderRadius: "10px", border: `1px solid rgba(${accentRgb}, 0.35)`,
    background: "rgba(var(--bg-card-rgb), 0.7)", color: "var(--text-primary)",
    outline: "none", boxSizing: "border-box",
  };

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 200,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)",
      }}
      onClick={onClose}
    >
      <div
        className="card"
        style={{ padding: "28px 32px", maxWidth: "440px", width: "calc(100% - 32px)" }}
        onClick={e => e.stopPropagation()}
      >
        {/* Tab bar */}
        <div style={{ display: "flex", gap: "4px", marginBottom: "24px", background: "rgba(var(--bg-secondary-rgb), 0.6)", borderRadius: "10px", padding: "4px" }}>
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                flex: 1, padding: "8px 6px", border: "none", borderRadius: "7px",
                cursor: "pointer", fontSize: "13px", fontWeight: 700, transition: "all 0.15s ease",
                background: tab === t.id ? `rgba(${accentRgb}, 0.15)` : "transparent",
                color:      tab === t.id ? accentColor : "var(--text-secondary)",
                boxShadow:  tab === t.id ? `inset 0 0 0 1px rgba(${accentRgb}, 0.35)` : "none",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ── Tab: Daily Goals ── */}
        {tab === "goal" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "var(--text-secondary)", marginBottom: "8px" }}>
                Words Per Minute (WPM) goal
              </label>
              <input
                type="number" min="10" max="300" placeholder="e.g. 60"
                value={goalWpm}
                onChange={e => setGoalWpm(e.target.value)}
                autoFocus
                style={inputStyle}
              />
              <p style={{ margin: "6px 0 0", fontSize: "12px", color: "var(--text-secondary)" }}>
                Target WPM to hit each session. Shows a progress bar on results.
              </p>
            </div>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "var(--text-secondary)", marginBottom: "8px" }}>
                Daily goal — Typing time (minutes)
              </label>
              <input
                type="number" min="1" max="120" placeholder="15"
                value={goalTime}
                onChange={e => setGoalTime(e.target.value)}
                style={inputStyle}
              />
              <p style={{ margin: "6px 0 0", fontSize: "12px", color: "var(--text-secondary)" }}>
                How long you want to type today. Default: 15 minutes. Tracked across sessions.
              </p>
            </div>
          </div>
        )}

        {/* ── Tab: Difficulty ── */}
        {tab === "difficulty" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {TYPING_MODES.map(m => {
              const sel = mode === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id)}
                  style={{
                    textAlign: "left", padding: "14px 16px", borderRadius: "10px", border: sel
                      ? `1px solid rgba(${accentRgb}, 0.6)`
                      : "1px solid rgba(var(--border-color-rgb), 0.35)",
                    background: sel ? `rgba(${accentRgb}, 0.08)` : "rgba(var(--bg-card-rgb), 0.55)",
                    cursor: "pointer", transition: "all 0.15s ease",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{
                      width: 14, height: 14, borderRadius: "50%", flexShrink: 0,
                      border: sel ? `2px solid ${accentColor}` : "2px solid rgba(var(--border-color-rgb), 0.5)",
                      background: sel ? accentColor : "transparent",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      {sel && <div style={{ width: 5, height: 5, borderRadius: "50%", background: "white" }} />}
                    </div>
                    <div>
                      <span style={{ fontSize: "14px", fontWeight: 700, color: sel ? accentColor : "var(--text-primary)" }}>
                        {m.label}
                      </span>
                      <span style={{ fontSize: "11px", color: "var(--text-secondary)", marginLeft: "8px" }}>
                        {m.description}
                      </span>
                    </div>
                  </div>
                  <p style={{ margin: "6px 0 0 24px", fontSize: "12px", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                    {m.detail}
                  </p>
                </button>
              );
            })}
          </div>
        )}

        {/* ── Tab: Duration ── */}
        {tab === "duration" && (
          <div>
            <div style={{ display: "flex", gap: "10px", marginBottom: "16px", justifyContent: "center" }}>
              {DURATION_OPTIONS.map(opt => (
                <button
                  key={opt.seconds}
                  onClick={() => { setDurationSeconds(opt.seconds); setCustomSecs(""); setCustomError(""); }}
                  style={{
                    padding: "14px 20px", fontSize: "16px", fontWeight: 700, borderRadius: "10px",
                    border: durationSeconds === opt.seconds && !customSecs
                      ? `1px solid rgba(${accentRgb}, 0.6)`
                      : "1px solid rgba(var(--border-color-rgb), 0.4)",
                    background: durationSeconds === opt.seconds && !customSecs
                      ? `rgba(${accentRgb}, 0.12)`
                      : "rgba(var(--bg-card-rgb), 0.55)",
                    color: durationSeconds === opt.seconds && !customSecs ? accentColor : "var(--text-primary)",
                    cursor: "pointer", transition: "all 0.15s ease",
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "16px 0" }}>
              <div style={{ flex: 1, height: "1px", background: "rgba(var(--border-color-rgb), 0.3)" }} />
              <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-secondary)", opacity: 0.6 }}>or custom</span>
              <div style={{ flex: 1, height: "1px", background: "rgba(var(--border-color-rgb), 0.3)" }} />
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <input
                type="number" min="10" max="3600" placeholder="seconds, e.g. 90"
                value={customSecs}
                onChange={e => { setCustomSecs(e.target.value); setCustomError(""); }}
                style={{ ...inputStyle, flex: 1 }}
              />
            </div>
            {customError && (
              <p style={{ marginTop: "8px", fontSize: "12px", color: "rgba(255,80,80,0.9)" }}>{customError}</p>
            )}
          </div>
        )}

        {/* Save / Cancel */}
        <div style={{ display: "flex", gap: "10px", marginTop: "24px" }}>
          <button className="button solid" style={{ flex: 1, justifyContent: "center", padding: "11px" }} onClick={handleSave}>
            Apply
          </button>
          <button className="button" style={{ flex: 1, justifyContent: "center", padding: "11px" }} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function TypingPracticePage() {
  const { theme } = useContext(ThemeContext);
  const navigate  = useNavigate();
  const location  = useLocation();

  const accentRgb   = theme === "light" ? "42,92,167"   : "244,169,0";
  const accentColor = theme === "light" ? "var(--royal-blue)" : "var(--golden-amber)";

  // Load persisted settings once on mount
  const _saved = loadSettings();

  // ── Restore-from-report-page state ─────────────────────────────────────
  // When the user opens the typing report, we hand the full results-screen
  // state forward via navigate(..., { state }). The report page's Back
  // button explicitly navigates to /typing carrying that same payload
  // forward again (not a plain navigate(-1) — see the comment on
  // restoreResults in TypingReportPage.jsx for why a history pop alone
  // wouldn't bring this state back). We use it here to seed every piece of
  // state STEP.RESULTS depends on, so Back lands exactly where the user
  // left off instead of resetting to module-select.
  const restore = location.state?.restoreResults ?? null;

  const [step,             setStep]             = useState(restore ? STEP.RESULTS : STEP.MODULE);
  const [selectedModule,   setSelectedModule]   = useState(restore?.selectedModule ?? null);
  const [selectedDuration, setSelectedDuration] = useState(restore?.selectedDuration ?? _saved.duration);
  const [selectedMode,     setSelectedMode]     = useState(restore?.selectedMode ?? _saved.mode ?? "beginner");
  const [passages,         setPassages]         = useState([]);
  const [loadingModule,    setLoadingModule]    = useState(false);
  const [result,           setResult]           = useState(restore?.result ?? null);

  // Daily goals — seeded from persisted settings
  const [dailyGoalWpm,  setDailyGoalWpm]  = useState(_saved.goalWpm);
  const [dailyGoalTime, setDailyGoalTime] = useState(_saved.goalTime);

  // Settings modal
  const [settingsModal,    setSettingsModal]    = useState(null); // null | "goal" | "difficulty" | "duration"

  // Raw (pre-mode) passages — source of truth for all retry/reshuffle calls.
  const rawPassagesRef  = useRef([]);

  // ── REPEAT FIX ────────────────────────────────────────────────────────────
  // Snapshot of the exact array passed to TypingTest. handleRetry restores
  // this directly — no shuffle, no re-transform.
  const lastPassagesRef = useRef([]);

  /* ── Helpers ──────────────────────────────────────────────── */

  // Applies mode to a (possibly shuffled) raw pool, snapshots the result,
  // and sets state.
  const applyAndSet = (raw, mode) => {
    const result = applyMode(shuffleArray(raw), mode);
    lastPassagesRef.current = result;        // ← snapshot for repeat
    setPassages(result);
  };

  /* ── Handlers ─────────────────────────────────────────────── */

  // ── Restore-from-report re-warm ──────────────────────────────────────────
  // When we land directly on STEP.RESULTS via restore (see `restore` above),
  // rawPassagesRef/lastPassagesRef are empty — they only ever get populated
  // by handleModuleSelect, which we deliberately skip on restore so the user
  // doesn't see a flash of the module/duration screens. Re-fetch the same
  // module's passage pool here, silently, so Retry and Next test still work
  // on the restored screen. This never changes `step` — only warms the refs.
  useEffect(() => {
    if (!restore) return;
    (async () => {
      try {
        const { questions } = await import("../data/questions/index.js");
        const allQuestions  = Object.values(questions[restore.selectedModule.id] || {}).flat();
        const pool          = extractPassages(allQuestions);
        const raw = pool.length > 0 ? pool : [{
          id:    "fallback",
          parts: [{ role: "question", text: "No typeable content found for this module." }],
        }];
        rawPassagesRef.current = shuffleWithRecency(raw, restore.selectedModule.id);
        applyAndSet(rawPassagesRef.current, restore.selectedMode);
      } catch (err) {
        console.error("Failed to re-warm passages after restore:", err);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleModuleSelect = async (mod) => {
    setLoadingModule(true);
    try {
      const { questions } = await import("../data/questions/index.js");
      const allQuestions  = Object.values(questions[mod.id] || {}).flat();
      const pool          = extractPassages(allQuestions);

      const raw = pool.length > 0 ? pool : [{
        id:    "fallback",
        parts: [{ role: "question", text: "No typeable content found for this module." }],
      }];

      rawPassagesRef.current = shuffleWithRecency(raw, mod.id);
      setSelectedModule(mod);
      if (selectedDuration && selectedMode) {
        applyAndSet(rawPassagesRef.current, selectedMode);
        setStep(STEP.TYPING);
      } else {
        setPassages([]);
        setStep(STEP.DURATION);
      }
    } catch (err) {
      console.error("Failed to load questions:", err);
      rawPassagesRef.current = [{
        id:    "error",
        parts: [{ role: "question", text: "Could not load questions for this module." }],
      }];
      setSelectedModule(mod);
      if (selectedDuration && selectedMode) {
        applyAndSet(rawPassagesRef.current, selectedMode);
        setStep(STEP.TYPING);
      } else {
        setPassages([]);
        setStep(STEP.DURATION);
      }
    } finally {
      setLoadingModule(false);
    }
  };

  const handleDurationSelect = (opt) => {
    const mode = opt.mode ?? selectedMode;
    setSelectedMode(mode);
    applyAndSet(rawPassagesRef.current, mode);
    setSelectedDuration(opt);
    saveSettings({ duration: opt, mode });
    setStep(STEP.TYPING);
  };

  const hasAutoOpenedGoalRef = useRef(false);

  const handleFinish = (res) => {
    // Persist the detail record for the progress report. The existing
    // `typing:perf:v1:global` aggregate (saved separately by TypingResults
    // via saveSession) is untouched — this is the richer per-session log.
    const stats = computeSessionStats(res);
    saveSessionDetail({
      ts:             Date.now(),
      date:           new Date().toISOString().slice(0, 10),
      wpm:            stats.wpm,
      rawWpm:         stats.rawWpm,
      accuracy:       stats.accuracy,
      score:          stats.score,
      consistency:    stats.consistency,
      duration:       selectedDuration.seconds,
      mode:           selectedMode,
      moduleId:       selectedModule.id,
      correctChars:   res.correctChars,
      incorrectChars: res.incorrectChars,
      charErrors:     res.charErrors,
      snapshots:      res.snapshots,
    });

    setResult(res);
    setStep(STEP.RESULTS);
    // On first-ever results visit, prompt the user to set their WPM goal
    if (!hasAutoOpenedGoalRef.current && !_saved.goalSet) {
      hasAutoOpenedGoalRef.current = true;
      setSettingsModal("goal");
    }
  };

  // Repeat: restore the exact same passage array — no shuffle, no re-transform.
  const handleRetry = () => {
    setResult(null);
    setPassages(lastPassagesRef.current);   // ← restore snapshot directly
    setStep(STEP.TYPING);
  };

  // Next test: re-shuffle pool respecting recency, keep same settings, go straight to typing
  const handleNextTest = () => {
    setResult(null);
    rawPassagesRef.current = shuffleWithRecency(rawPassagesRef.current, selectedModule.id);
    applyAndSet(rawPassagesRef.current, selectedMode);
    setStep(STEP.TYPING);
  };

  const handleChangeDuration = () => {
    setResult(null);
    setSelectedDuration(null);
    setStep(STEP.DURATION);
  };

  const handleChangeModule = () => {
    rawPassagesRef.current  = [];
    lastPassagesRef.current = [];
    setSelectedModule(null);
    setPassages([]);
    setResult(null);
    setStep(STEP.MODULE);
  };

  // SettingsModal save handler
  const handleSettingsSave = ({ goalWpm, goalTime, mode, duration }) => {
    if (goalWpm  !== null) setDailyGoalWpm(goalWpm);
    if (goalTime !== null) setDailyGoalTime(goalTime);

    // Log this as a goal-history event if the goal actually changed —
    // recordGoalChange itself no-ops if it matches the currently-active
    // goal, but we also gate on `!== null` here since the modal can be
    // submitted with goalWpm untouched (null = "no change").
    if (goalWpm !== null) {
      recordGoalChange(goalWpm);
    }

    const modeChanged     = mode     !== selectedMode;
    const durationChanged = duration.seconds !== selectedDuration?.seconds;

    if (modeChanged || durationChanged) {
      setSelectedMode(mode);
      setSelectedDuration(duration);
      // Re-apply mode and re-shuffle so the change takes effect on next test
      applyAndSet(rawPassagesRef.current, mode);
    }

    // Persist all settings changes
    saveSettings({
      duration: duration,
      mode,
      goalWpm:  goalWpm  !== null ? goalWpm  : dailyGoalWpm,
      goalTime: goalTime !== null ? goalTime : dailyGoalTime,
      goalSet: true,
    });

    setSettingsModal(null);
  };

  // Raise-goal prompt (shown on results when the WPM goal was just hit) —
  // a lighter path than the full SettingsModal: bumps only goalWpm and
  // persists it the same way handleSettingsSave does, including logging
  // the change to goal history.
  const handleRaiseGoal = (newGoalWpm) => {
    setDailyGoalWpm(newGoalWpm);
    recordGoalChange(newGoalWpm);
    saveSettings({ goalWpm: newGoalWpm, goalSet: true });
  };

  /* ── Render ───────────────────────────────────────────────── */

  return (
    <div style={{ overflowX: "hidden" }}>

      {/* ════════════════════════════════════════════════════
          HERO  — shown only on module-select step
          ════════════════════════════════════════════════════ */}
      {step === STEP.MODULE && (
        <section style={{
          position:  "relative",
          padding:   "42px 40px 52px",
          maxWidth:  "860px",
          margin:    "0 auto",
          textAlign: "center",
        }}>
          <div style={{
            position:      "absolute",
            top: 0, left: "50%",
            transform:     "translateX(-50%)",
            width:         "600px",
            height:        "320px",
            background:    `radial-gradient(ellipse 70% 60% at 50% 10%, rgba(${accentRgb}, 0.10), transparent 80%)`,
            pointerEvents: "none",
            zIndex:        0,
          }} />

          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{
              display:       "inline-flex",
              alignItems:    "center",
              gap:           "8px",
              background:    "rgba(var(--bg-card-rgb), 0.7)",
              border:        "1px solid rgba(var(--border-color-rgb), 0.4)",
              borderRadius:  "999px",
              padding:       "6px 16px",
              marginBottom:  "28px",
              fontSize:      "13px",
              fontWeight:    600,
              color:         accentColor,
              letterSpacing: "0.06em",
            }}>
              <KeyboardPillIcon size={13} />
              Typing Practice
            </div>

            <h1 style={{
              margin:        "0 0 20px",
              fontSize:      "clamp(2rem, 5vw, 3rem)",
              fontWeight:    800,
              letterSpacing: "-0.03em",
              color:         "var(--text-primary)",
              lineHeight:    1.15,
            }}>
              Build speed while{" "}
              <span style={{ color: accentColor }}>reinforcing what you know</span>
            </h1>

            <p style={{ margin: "0 auto 12px", maxWidth: "620px", fontSize: "17px", color: "var(--text-primary)", lineHeight: 1.7 }}>
              Type the question, then the model answer, then the explanation — all in sequence. Every keystroke doubles as revision.
            </p>
            <p style={{ margin: "0 auto", maxWidth: "520px", fontSize: "17px", color: "var(--text-secondary)", lineHeight: 1.7 }}>
              Pick a module below to get started.
            </p>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════
          MODULE SELECT
          ════════════════════════════════════════════════════ */}
      {step === STEP.MODULE && (
        <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 40px 80px", position: "relative", zIndex: 1 }}>
          {loadingModule && (
            <p style={{ color: "var(--text-secondary)", marginBottom: "16px", fontSize: "14px", textAlign: "center" }}>
              Loading module questions…
            </p>
          )}
          <TypingModuleGrid modules={modules} loading={loadingModule} onSelect={handleModuleSelect} />
        </section>
      )}

      {/* ════════════════════════════════════════════════════
          DURATION GATE
          ════════════════════════════════════════════════════ */}
      {step === STEP.DURATION && selectedModule && (
        <div className="container">
          <Breadcrumb items={[
            { label: "Home", path: "/" },
            { label: "Typing Practice", onClick: handleChangeModule },
            { label: selectedModule.name },
          ]} />
          <DurationSelect
            moduleName={selectedModule.name}
            onSelect={handleDurationSelect}
            onBack={handleChangeModule}
          />
        </div>
      )}

      {/* ════════════════════════════════════════════════════
          TYPING TEST
          ════════════════════════════════════════════════════ */}
      {step === STEP.TYPING && selectedModule && selectedDuration && (
        <div className="container">
          <Breadcrumb items={[
            { label: "Home", path: "/" },
            { label: "Typing Practice", onClick: handleChangeModule },
            { label: selectedModule.name },
          ]} />

          <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "24px" }}>
            <span style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: accentColor }}>
              {selectedModule.name}
            </span>
            <span style={{ color: "var(--text-secondary)", fontSize: "13px" }}>
              {passages.length} passages · {selectedDuration.label} · {selectedMode}
            </span>
          </div>

          <TypingTest
            key={`${selectedModule.id}-${selectedDuration.seconds}-${selectedMode}-${passages[0]?.id}`}
            passages={passages}
            duration={selectedDuration}
            onFinish={handleFinish}
          />
        </div>
      )}

      {/* ════════════════════════════════════════════════════
          RESULTS
          ════════════════════════════════════════════════════ */}
      {step === STEP.RESULTS && selectedModule && selectedDuration && result && (
        <div className="container">
          <Breadcrumb items={[
            { label: "Home", path: "/" },
            { label: "Typing Practice", onClick: handleChangeModule },
            { label: selectedModule.name },
          ]} />
          <TypingResults
            result={result}
            moduleId={selectedModule.id}
            moduleName={selectedModule.name}
            durationLabel={selectedDuration.label}
            dailyGoalWpm={dailyGoalWpm}
            dailyGoalTime={dailyGoalTime}
            onOpenSettings={(tab) => setSettingsModal(tab)}
            onRaiseGoal={handleRaiseGoal}
            onTypingReport={() => navigate("/typing/report", {
              state: {
                restoreResults: {
                  result, selectedModule, selectedDuration, selectedMode,
                },
              },
            })}
            onGoToModule={() => navigate(`/module/${selectedModule.id}`)}
            onRetry={handleRetry}
            onNextTest={handleNextTest}
            onChangeModule={handleChangeModule}
          />
        </div>
      )}

      {/* ════════════════════════════════════════════════════
          SETTINGS MODAL (shared)
          ════════════════════════════════════════════════════ */}
      {settingsModal && (
        <SettingsModal
          initialTab={settingsModal}
          dailyGoalWpm={dailyGoalWpm}
          dailyGoalTime={dailyGoalTime}
          selectedDuration={selectedDuration}
          selectedMode={selectedMode}
          onSave={handleSettingsSave}
          onClose={() => setSettingsModal(null)}
        />
      )}

      <style>{`
        @media (max-width: 480px) {
          section { padding-left: 20px !important; padding-right: 20px !important; }
        }
      `}</style>
    </div>
  );
}
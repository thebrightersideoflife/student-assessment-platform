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
import { weeks } from "../data/weeks";
import { questions } from "../data/questions/index.js";
import { extractPassages, applyMode, shuffleArray, TYPING_MODES } from "../utils/typingExtractor";
import { loadSettings, saveSettings, saveSessionDetail, computeSessionStats, recordGoalChange } from "../utils/typingStorage";
import Breadcrumb from "../components/Breadcrumb";
import { DurationSelect } from "../components/typing/TypingSetup";
import TypingModuleGrid from "../components/TypingModuleGrid";
import TypingPracticeHero from "../components/typing/TypingPracticeHero";
import TypingPracticeSettingsModal from "../components/typing/TypingPracticeSettingsModal";
import TypingModuleSearchBar from "../components/typing/TypingModuleSearchBar";
import TypingTest from "../components/typing/TypingTest";
import TypingResults from "../components/typing/TypingResults";
import { getTypingReadyModules } from "../utils/typingContent";

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
  const [moduleQuery,      setModuleQuery]      = useState("");
  const [hasMadeFirstAttempt, setHasMadeFirstAttempt] = useState(false);
  const autoSelectedModuleRef = useRef(null);

  // Daily goals — seeded from persisted settings.
  // goalWpm is now per-mode ({ beginner, intermediate, normal }, see
  // typingStorage's DEFAULT_SETTINGS) since a "65 wpm" goal set while
  // practising Beginner text isn't a reasonable goal for Normal text.
  // dailyGoalWpm below derives the single number for whichever mode is
  // currently selected, which is what TypingResults/DailyGoalBars actually
  // want to compare the session's wpm against.
  const [dailyGoalWpmByMode, setDailyGoalWpmByMode] = useState(_saved.goalWpm);
  const [dailyGoalTime,      setDailyGoalTime]       = useState(_saved.goalTime);
  const dailyGoalWpm = dailyGoalWpmByMode?.[selectedMode] ?? null;

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
    // goalWpm coming out of the modal belongs to whichever difficulty tab
    // was selected in the modal (`mode`), NOT necessarily the mode the user
    // was practising in when they opened it — so it's stored keyed by
    // `mode`, never as a flat overwrite of the whole per-mode object.
    if (goalWpm !== null) {
      setDailyGoalWpmByMode((prev) => ({ ...prev, [mode]: goalWpm }));
      // Log this as a goal-history event if the goal actually changed —
      // recordGoalChange itself no-ops if it matches the currently-active
      // goal for that mode, but we also gate on `!== null` here since the
      // modal can be submitted with goalWpm untouched (null = "no change").
      recordGoalChange(mode, goalWpm);
    }
    if (goalTime !== null) setDailyGoalTime(goalTime);

    const modeChanged     = mode     !== selectedMode;
    const durationChanged = duration.seconds !== selectedDuration?.seconds;

    if (modeChanged || durationChanged) {
      setSelectedMode(mode);
      setSelectedDuration(duration);
      // Re-apply mode and re-shuffle so the change takes effect on next test
      applyAndSet(rawPassagesRef.current, mode);
    }

    // Persist all settings changes. goalWpm is passed as a partial
    // { [mode]: value } object — saveSettings merges this key-by-key into
    // the existing per-mode goal object, leaving other modes' goals intact.
    // Omitted entirely (rather than passed as undefined) when unchanged, so
    // saveSettings's spread-merge doesn't clobber the stored value.
    const settingsPatch = {
      duration,
      mode,
      goalTime: goalTime !== null ? goalTime : dailyGoalTime,
      goalSet:  true,
    };
    if (goalWpm !== null) settingsPatch.goalWpm = { [mode]: goalWpm };
    saveSettings(settingsPatch);

    setSettingsModal(null);
  };

  // Raise-goal prompt (shown on results when the WPM goal was just hit) —
  // a lighter path than the full SettingsModal: bumps only goalWpm for the
  // mode the user is currently practising in, and persists it the same way
  // handleSettingsSave does, including logging the change to goal history.
  const handleRaiseGoal = (newGoalWpm) => {
    setDailyGoalWpmByMode((prev) => ({ ...prev, [selectedMode]: newGoalWpm }));
    recordGoalChange(selectedMode, newGoalWpm);
    saveSettings({ goalWpm: { [selectedMode]: newGoalWpm }, goalSet: true });
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const moduleParam = params.get("module");

    if (!moduleParam) return;
    if (autoSelectedModuleRef.current === moduleParam) return;

    const requestedModule = modules.find((mod) => mod.id === moduleParam);
    if (!requestedModule) return;

    autoSelectedModuleRef.current = moduleParam;
    handleModuleSelect(requestedModule);
  }, [location.search, modules]);

  const availableModules = getTypingReadyModules(modules, weeks, questions);

  const filteredModules = availableModules.filter((mod) => {
    const query = moduleQuery.trim().toLowerCase();
    if (!query) return true;
    const haystack = `${mod.id} ${mod.name} ${mod.description || ""}`.toLowerCase();
    return haystack.includes(query);
  });

  /* ── Render ───────────────────────────────────────────────── */

  return (
    <div style={{ overflowX: "hidden" }}>

      {/* ════════════════════════════════════════════════════
          HERO  — shown only on module-select step
          ════════════════════════════════════════════════════ */}
      {step === STEP.MODULE && (
        <TypingPracticeHero accentColor={accentColor} accentRgb={accentRgb} />
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
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "20px", marginBottom: "20px", flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: "280px" }}>
              <TypingModuleSearchBar
                value={moduleQuery}
                onChange={setModuleQuery}
                totalModules={availableModules.length}
                visibleModules={filteredModules.length}
                accentColor={accentColor}
              />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", marginBottom: "10px", flexWrap: "wrap" }}>
                <div style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
                  Your progress report becomes available after your first typing attempt.
                </div>
                <button
                  type="button"
                  className="button"
                  onClick={() => navigate("/typing/report")}
                  disabled={!hasMadeFirstAttempt}
                  style={{
                    padding: "10px 16px",
                    fontSize: "14px",
                    opacity: hasMadeFirstAttempt ? 1 : 0.6,
                  }}
                >
                  {hasMadeFirstAttempt ? "View progress report" : "Progress report"}
                </button>
              </div>
            </div>
            <div style={{
              width: "min(360px, 100%)",
              padding: "18px 20px",
              borderRadius: "18px",
              background: "linear-gradient(135deg, rgba(42,92,167,0.16), rgba(244,169,0,0.16))",
              border: "1px solid rgba(42,92,167,0.24)",
              boxShadow: "0 18px 45px rgba(0,0,0,0.08)",
              color: "var(--text-primary)",
              fontSize: "15px",
              lineHeight: 1.7,
              position: "relative",
              overflow: "hidden",
              alignSelf: "flex-start",
            }}>
              <div style={{
                position: "absolute",
                inset: 0,
                background: "radial-gradient(circle at top right, rgba(255,255,255,0.35), transparent 42%)",
                pointerEvents: "none",
              }} />
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ fontSize: "12px", fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: accentColor, marginBottom: "6px" }}>
                  Coming soon
                </div>
                <div style={{ fontSize: "16px", fontWeight: 700, marginBottom: "6px" }}>
                  Want to type your own content? In just a little:
                </div>
                <div>
                  You’ll be able to upload your custom PDF or text and turn your own material into a personalised typing challenge.
                </div>
              </div>
            </div>
          </div>
          <TypingModuleGrid modules={filteredModules} loading={loadingModule} onSelect={handleModuleSelect} />
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
            onFirstAttempt={() => setHasMadeFirstAttempt(true)}
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
            mode={selectedMode}
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
        <TypingPracticeSettingsModal
          initialTab={settingsModal}
          goalWpmByMode={dailyGoalWpmByMode}
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
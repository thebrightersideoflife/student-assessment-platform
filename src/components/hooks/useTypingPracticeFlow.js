// src/hooks/useTypingPracticeFlow.js
//
// Owns all step/session/goal state for TypingPracticePage and every handler
// that mutates it. The page component's job becomes: call this hook, then
// render whichever step is active. Pulled out of TypingPracticePage.jsx
// because this state and its ~15 handlers were interleaved with ~350 lines
// of JSX in one file — this hook is the "table of contents" the page reads
// from instead.
//
// ── Repeat-test fix ────────────────────────────────────────────────────────
// applyAndSet always shuffles, so "Repeat test" previously behaved identically
// to "Next test". Fix: after computing the final array that will be handed to
// TypingTest, we snapshot it in lastPassagesRef. handleRetry restores that
// exact snapshot — no shuffle, no re-transform.

import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { modules } from "../../data/modules";
import { weeks } from "../../data/weeks";
import { questions } from "../../data/questions/index.js";
import { extractPassages, applyMode, shuffleArray } from "../../utils/typingExtractor";
import { loadSettings, saveSettings, saveSessionDetail, computeSessionStats, recordGoalChange } from "../../utils/typingStorage";
import { shuffleWithRecency } from "../../utils/typingRecency";
import { getTypingReadyModules } from "../../utils/typingContent";

// ── Steps ──────────────────────────────────────────────────────────────────
// First-timer flow:   MODULE → TEST_TYPE → (DURATION → TYPING) | (UNIT_SETUP → UNIT_TYPING) → RESULTS
// Returning-user flow (duration/mode already saved): MODULE → TYPING → RESULTS,
// with a "Unit Test" button on the timed results screen jumping straight to
// UNIT_TYPING for the same module/difficulty (see handleStartUnitTest).
export const STEP = {
  MODULE:      "module",
  TEST_TYPE:   "testType",
  DURATION:    "duration",
  UNIT_SETUP:  "unitSetup",
  TYPING:      "typing",
  UNIT_TYPING: "unitTyping",
  RESULTS:     "results",
};

export function useTypingPracticeFlow() {
  const location = useLocation();

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
  const [selectedTestType, setSelectedTestType] = useState(restore?.isUnitMode ? "unit" : "timed");
  const [passages,         setPassages]         = useState([]);
  const [loadingModule,    setLoadingModule]    = useState(false);
  const [result,           setResult]           = useState(restore?.result ?? null);
  // Whether the `result` currently on screen came from the untimed Unit
  // Typing flow rather than a timed test — controls which labels/actions
  // TypingResults shows (see isUnitMode prop) and which retry/next handlers
  // onRetry/onNextTest should call.
  const [resultIsUnit,     setResultIsUnit]     = useState(restore?.isUnitMode ?? false);
  const [moduleQuery,      setModuleQuery]      = useState("");
  const [hasMadeFirstAttempt, setHasMadeFirstAttempt] = useState(false);
  const autoSelectedModuleRef = useRef(null);

  // Index of the passage currently being typed in Unit Typing mode — the
  // pool (rawPassagesRef/passages) is shared with the timed flow, but unit
  // mode only ever shows ONE passage at a time, tracked here.
  const unitIndexRef = useRef(0);

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
        const { questions } = await import("../../data/questions/index.js");
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
      const { questions } = await import("../../data/questions/index.js");
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
        setStep(STEP.TEST_TYPE);
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
        setStep(STEP.TEST_TYPE);
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

  // ── Test-type gate (first-timer flow) ─────────────────────────────────────
  const handleTestTypeSelect = (type) => {
    setSelectedTestType(type);
    if (type === "unit") {
      setStep(STEP.UNIT_SETUP);
    } else {
      setStep(STEP.DURATION);
    }
  };

  // Unit Typing's difficulty-only gate. Doesn't touch selectedDuration, so
  // a first-timer who picks Unit Typing is still treated as a first-timer
  // for the timed flow next time they pick a module — there's no default
  // duration to skip straight to yet.
  const handleUnitModeSelect = (mode) => {
    setSelectedMode(mode);
    applyAndSet(rawPassagesRef.current, mode);
    saveSettings({ mode });
    unitIndexRef.current = 0;
    setStep(STEP.UNIT_TYPING);
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
      testType:       "timed",
      correctChars:   res.correctChars,
      incorrectChars: res.incorrectChars,
      charErrors:     res.charErrors,
      snapshots:      res.snapshots,
    });

    setResult(res);
    setResultIsUnit(false);
    setStep(STEP.RESULTS);
    // On first-ever results visit, prompt the user to set their WPM goal
    if (!hasAutoOpenedGoalRef.current && !_saved.goalSet) {
      hasAutoOpenedGoalRef.current = true;
      setSettingsModal("goal");
    }
  };

  // Unit Typing finish — same session-log shape as a timed test, but
  // `duration` is however long this one unit actually took (there's no
  // fixed setting to record) and `testType` is tagged "unit" so the
  // report/results screens can tell them apart later if needed.
  const handleUnitFinish = (res) => {
    const stats = computeSessionStats(res);
    saveSessionDetail({
      ts:             Date.now(),
      date:           new Date().toISOString().slice(0, 10),
      wpm:            stats.wpm,
      rawWpm:         stats.rawWpm,
      accuracy:       stats.accuracy,
      score:          stats.score,
      consistency:    stats.consistency,
      duration:       res.elapsedSeconds,
      mode:           selectedMode,
      moduleId:       selectedModule.id,
      testType:       "unit",
      correctChars:   res.correctChars,
      incorrectChars: res.incorrectChars,
      charErrors:     res.charErrors,
      snapshots:      res.snapshots,
    });

    setResult(res);
    setResultIsUnit(true);
    setStep(STEP.RESULTS);
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

  // Unit-mode repeat: retype the exact same unit.
  const handleUnitRetry = () => {
    setResult(null);
    setStep(STEP.UNIT_TYPING);
  };

  // Unit-mode next: advance to the next unit in the pool, wrapping (and
  // reshuffling with recency) once the end is reached.
  const handleUnitNextTest = () => {
    setResult(null);
    const nextIndex = unitIndexRef.current + 1;
    if (nextIndex >= passages.length) {
      rawPassagesRef.current = shuffleWithRecency(rawPassagesRef.current, selectedModule.id);
      applyAndSet(rawPassagesRef.current, selectedMode);
      unitIndexRef.current = 0;
    } else {
      unitIndexRef.current = nextIndex;
    }
    setStep(STEP.UNIT_TYPING);
  };

  // Jump into Unit Typing from a timed results screen (the "Unit Test"
  // button) — reuses the module/pool/difficulty already loaded, no need to
  // go back through module select or the test-type gate.
  const handleStartUnitTest = () => {
    setResult(null);
    unitIndexRef.current = 0;
    setStep(STEP.UNIT_TYPING);
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

  return {
    // step + core selection state
    step, setStep,
    selectedModule, selectedDuration, selectedMode, selectedTestType,
    passages, loadingModule, result, resultIsUnit,
    moduleQuery, setModuleQuery,
    hasMadeFirstAttempt,
    unitIndexRef,

    // goals + settings modal
    dailyGoalWpmByMode, dailyGoalTime, dailyGoalWpm,
    settingsModal, setSettingsModal,

    // module list
    availableModules, filteredModules,

    // handlers
    handleModuleSelect,
    handleDurationSelect,
    handleTestTypeSelect,
    handleUnitModeSelect,
    handleFinish,
    handleUnitFinish,
    handleRetry,
    handleNextTest,
    handleUnitRetry,
    handleUnitNextTest,
    handleStartUnitTest,
    handleChangeDuration,
    handleChangeModule,
    handleSettingsSave,
    handleRaiseGoal,
    setHasMadeFirstAttempt,
  };
}
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
import { modules } from "../data/modules";
import { weeks } from "../data/weeks";
import { questions } from "../data/questions/index.js";
import { extractPassages, applyMode, shuffleArray } from "../utils/typingExtractor";
import { loadSettings, saveSettings, saveSessionDetail, computeSessionStats, recordGoalChange, loadSessions } from "../utils/typingStorage";
import { shuffleWithRecency } from "../utils/typingRecency";
import { getTypingReadyModules } from "../utils/typingContent";

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
  // Set when the just-finished session was rejected by typingStorage's
  // validity guard (too short / too little typed / implausible wpm) — the
  // results screen renders this as a warning banner so the rejection is
  // visible instead of a console.warn nobody sees. Cleared on every retry/
  // next-test transition so a stale warning never lingers onto a fresh
  // attempt.
  const [saveRejectedReason, setSaveRejectedReason] = useState(null);
  // Whether the `result` currently on screen came from the untimed Unit
  // Typing flow rather than a timed test — controls which labels/actions
  // TypingResults shows (see isUnitMode prop) and which retry/next handlers
  // onRetry/onNextTest should call.
  const [resultIsUnit,     setResultIsUnit]     = useState(restore?.isUnitMode ?? false);
  const [moduleQuery,      setModuleQuery]      = useState("");
  // Seeded from actual stored history, not just `false` — a returning user
  // who already has session data from a previous visit should see the
  // Progress Report button enabled immediately, not only after making
  // another attempt in THIS page load. Previously this always started
  // false and was only ever flipped by onFirstAttempt firing live during a
  // session, which is what made the button appear permanently "stuck"
  // disabled for anyone who already had history but hadn't yet typed
  // anything new since opening the page.
  const [hasMadeFirstAttempt, setHasMadeFirstAttempt] = useState(() => loadSessions().length > 0);
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

  // `opts.forceTimed` — used by the "Back to module" link on Competition's
  // results screen (see CompetitionResults/useCompetitionFlow), which wants
  // to land the user directly on a timed test for that module rather than
  // routing them back through the first-timer TEST_TYPE gate. Mirrors the
  // same "seed a default duration if none exists yet" fallback
  // handleUnitModeSelect already uses for the reverse case, so someone who's
  // never touched timed mode still gets a sensible duration instead of
  // landing on STEP.TYPING with selectedDuration still null.
  const handleModuleSelect = async (mod, opts = {}) => {
    const { forceTimed = false } = opts;
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

      const goStraightToTyping = (selectedDuration && selectedMode) || forceTimed;

      if (goStraightToTyping) {
        const durationToUse = selectedDuration || DEFAULT_UNIT_FALLBACK_DURATION;
        if (!selectedDuration) {
          setSelectedDuration(durationToUse);
          saveSettings({ duration: durationToUse, mode: selectedMode });
        }
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

      const goStraightToTyping = (selectedDuration && selectedMode) || forceTimed;

      if (goStraightToTyping) {
        const durationToUse = selectedDuration || DEFAULT_UNIT_FALLBACK_DURATION;
        if (!selectedDuration) {
          setSelectedDuration(durationToUse);
          saveSettings({ duration: durationToUse, mode: selectedMode });
        }
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

  // Default fallback duration seeded the first time someone picks Unit
  // Typing without ever having set up a timed test — see handleUnitModeSelect.
  const DEFAULT_UNIT_FALLBACK_DURATION = { label: "30s", seconds: 30 };
  const DEFAULT_UNIT_FALLBACK_GOAL_WPM = 35;

  // Unit Typing's difficulty-only gate.
  //
  // Historically this never touched selectedDuration, so a first-timer who
  // picked Unit Typing was still treated as a first-timer for the timed flow
  // next time they picked a module — nextTestIsUnit would then be stuck on
  // `true` forever (see the comment above nextTestIsUnit), since there was
  // no saved duration to fall back to.
  //
  // Fix: the first time someone reaches this gate with no duration ever
  // saved, pre-seed selectedDuration (30s) and their WPM goal (35) for the
  // chosen difficulty, used as the fallback "timed setup" — exactly as if
  // they'd gone through DurationSelect and picked the 30s preset. That way
  // nextTestIsUnit correctly flips to `false` right after their very first
  // unit test, and the results screen's "Next" button knows to hand them a
  // timed test without any manual trip through Settings.
  const handleUnitModeSelect = (mode) => {
    setSelectedMode(mode);
    applyAndSet(rawPassagesRef.current, mode);

    const settingsPatch = { mode };

    if (!selectedDuration) {
      const fallbackDuration = { ...DEFAULT_UNIT_FALLBACK_DURATION, mode };
      setSelectedDuration(fallbackDuration);
      settingsPatch.duration = fallbackDuration;

      // Only seed the goal if the user has never set one themselves.
      if (!_saved.goalSet && (dailyGoalWpmByMode?.[mode] == null)) {
        setDailyGoalWpmByMode((prev) => ({ ...prev, [mode]: DEFAULT_UNIT_FALLBACK_GOAL_WPM }));
        recordGoalChange(mode, DEFAULT_UNIT_FALLBACK_GOAL_WPM);
        settingsPatch.goalWpm = { [mode]: DEFAULT_UNIT_FALLBACK_GOAL_WPM };
        settingsPatch.goalSet = true;
      }
    }

    saveSettings(settingsPatch);
    unitIndexRef.current = 0;
    setStep(STEP.UNIT_TYPING);
  };

  const hasAutoOpenedGoalRef = useRef(false);

  const handleFinish = (res) => {
    const stats = computeSessionStats(res);
    const saveResult = saveSessionDetail({
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
    setSaveRejectedReason(saveResult.saved ? null : saveResult.reason);
    setStep(STEP.RESULTS);
    // On first-ever results visit, prompt the user to set their WPM goal —
    // only for a session that actually counted.
    if (saveResult.saved && !hasAutoOpenedGoalRef.current && !_saved.goalSet) {
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
    const saveResult = saveSessionDetail({
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
    setSaveRejectedReason(saveResult.saved ? null : saveResult.reason);
    setStep(STEP.RESULTS);
    if (saveResult.saved && !hasAutoOpenedGoalRef.current && !_saved.goalSet) {
      hasAutoOpenedGoalRef.current = true;
      setSettingsModal("goal");
    }
  };

  // Repeat: restore the exact same passage array — no shuffle, no re-transform.
  const handleRetry = () => {
    setResult(null);
    setSaveRejectedReason(null);
    setPassages(lastPassagesRef.current);   // ← restore snapshot directly
    setStep(STEP.TYPING);
  };

  // Next test: re-shuffle pool respecting recency, keep same settings, go straight to typing
  const handleNextTest = () => {
    setResult(null);
    setSaveRejectedReason(null);
    rawPassagesRef.current = shuffleWithRecency(rawPassagesRef.current, selectedModule.id);
    applyAndSet(rawPassagesRef.current, selectedMode);
    setStep(STEP.TYPING);
  };

  // Unit-mode repeat: retype the exact same unit.
  const handleUnitRetry = () => {
    setResult(null);
    setSaveRejectedReason(null);
    setStep(STEP.UNIT_TYPING);
  };

  // Unit-mode next: advance to the next unit in the pool, wrapping (and
  // reshuffling with recency) once the end is reached.
  const handleUnitNextTest = () => {
    setResult(null);
    setSaveRejectedReason(null);
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
  //
  // Previously this hardcoded unitIndexRef.current = 0, so every click
  // landed back on the exact same first passage in the pool instead of a
  // new one — clicking "Unit Test" repeatedly (e.g. from several different
  // timed results screens in a row) never actually varied the unit shown.
  // Fixed to advance exactly like handleUnitNextTest does: move to the next
  // passage in the pool, reshuffling with recency and wrapping back to 0
  // once the pool is exhausted — so a fresh click always presents a
  // different unit than the last one shown, the same guarantee Next test
  // already gives inside a unit-typing session.
  const handleStartUnitTest = () => {
    setResult(null);
    setSaveRejectedReason(null);
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
    handleModuleSelect(requestedModule, { forceTimed: !!location.state?.forceTimed });
  }, [location.search, modules]);

  const availableModules = getTypingReadyModules(modules, weeks, questions);

  const filteredModules = availableModules.filter((mod) => {
    const query = moduleQuery.trim().toLowerCase();
    if (!query) return true;
    const haystack = `${mod.id} ${mod.name} ${mod.description || ""}`.toLowerCase();
    return haystack.includes(query);
  });

  // ── What should the "Next" button on the results screen do? ────────────────
  // NOT the same question as "was the just-finished test a unit test"
  // (resultIsUnit) — those two used to be conflated, which meant clicking
  // the ad-hoc "Unit Test" button on a timed results screen permanently
  // "stuck" the Next button in unit mode with no way back to timed without
  // fully backing out to the module/test-type gates again.
  //
  // The fix relies on an already-existing signal: `selectedDuration` is
  // `null` until the user has *ever* picked a timed duration, and the
  // ad-hoc "Unit Test" button (handleStartUnitTest) never touches it.
  //   - Native Unit Typing flow (first-timer deliberately chose Unit Typing,
  //     never set up a duration) → selectedDuration stays null → nothing to
  //     fall back to → Next correctly keeps doing unit tests.
  //   - Ad-hoc Unit Test (button pressed from an established timed results
  //     screen) → selectedDuration was already set before the detour and is
  //     untouched by it → Next correctly resumes the timed flow.
  // "Repeat" is intentionally NOT changed by this — repeating should always
  // redo the exact thing that was just done, unit or timed.
  const nextTestIsUnit = resultIsUnit && !selectedDuration;

  return {
    // step + core selection state
    step, setStep,
    selectedModule, selectedDuration, selectedMode, selectedTestType,
    passages, loadingModule, result, resultIsUnit, nextTestIsUnit,
    saveRejectedReason,
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
    handleChangeModule,
    handleSettingsSave,
    handleRaiseGoal,
    setHasMadeFirstAttempt,
  };
}
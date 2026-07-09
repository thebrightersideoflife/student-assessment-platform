// src/hooks/useCompetitionFlow.js
// Owns all state/handlers for Competition mode. Module + difficulty now
// arrive via route params (/typing/competition/:moduleId/:mode) rather than
// an internal module-picker step — Competition is reached FROM the normal
// typing practice flow once a (module, difficulty) pair unlocks it, not
// picked independently. See CompetitionLandingPage for the STEP.INTRO hero
// that replaces the old STEP.MODULE/STEP.MODE screens.

import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { modules } from "../data/modules";
import { questions } from "../data/questions/index.js";
import { extractPassages, applyMode, buildJoinedTarget } from "../utils/typingExtractor";
import { shuffleWithRecency } from "../utils/typingRecency";
import {
  computeSessionStats,
  saveCompetitionSessionDetail,
  getCompetitionUnlockState,
  getAttemptsSinceBestFaced,
  saveSettings,
  loadGhostCandidateSessions,
} from "../utils/typingStorage";
import { selectGhosts, createGhostRunner } from "../utils/typingRace";

export const STEP = {
  INTRO:   "intro",   // hero screen — Best/Average/Last Recorded/You preview + CTA
  RACE:    "race",    // covers both practice runs (locked) and real races (unlocked)
  RESULTS: "results",
};

export function useCompetitionFlow() {
  const { moduleId, mode } = useParams();
  const navigate = useNavigate();

  const [step,            setStep]            = useState(STEP.INTRO);
  const [selectedModule,  setSelectedModule]  = useState(null);
  const [selectedMode,    setSelectedMode]    = useState(mode || "beginner");
  const [passage,         setPassage]         = useState(null);
  const [loadingModule,   setLoadingModule]   = useState(true);
  const [result,          setResult]          = useState(null);
  // Set when saveCompetitionSessionDetail rejected the just-finished race
  // (too short / too little typed / implausible wpm) — surfaced as a
  // warning banner on the results screen instead of a silent console.warn.
  const [saveRejectedReason, setSaveRejectedReason] = useState(null);
  // Snapshot of this (module, mode) pair's best wpm/accuracy from BEFORE
  // the just-finished race was saved — the baseline CompetitionResults
  // compares the new session against to decide "new personal best" and to
  // render the You row's wpm/accuracy delta indicators. Null when there's
  // no prior history at all (first-ever attempt at this pair), in which
  // case there's nothing to have "surpassed" yet.
  const [priorBest,       setPriorBest]       = useState(null);
  const [unlockState,     setUnlockState]     = useState(null);
  const [ghosts,          setGhosts]          = useState(null);
  // Non-null while the "Your Best Self Has Challenged You" notice is
  // blocking the flow — set by handleStartRace/handleRaceAgain whenever
  // this race's roster includes Best, cleared by handleAcceptChallenge.
  // Passage + ghosts are already fully built by the time this is set; the
  // notice is purely a gate in front of a race screen that's already
  // ready, not something that triggers additional loading.
  const [pendingChallenge, setPendingChallenge] = useState(null); // { isFirstAttempt } | null

  const rawPassagesRef = useRef([]);
  // Remembers whether THIS race's roster included Best, from the moment
  // it's decided (handleStartRace/handleRaceAgain) through to when the
  // result is saved (handleFinish) — so the saved CompetitionSessionDetail
  // can be stamped with facedBest accurately. A ref rather than state:
  // nothing needs to re-render off this value changing, it just needs to
  // still be readable later in the same flow.
  const bestIncludedRef = useRef(false);

  // ── Resolve module/passages/unlock state from the route params ─────────
  // Runs on mount and whenever the URL's moduleId/mode actually change
  // (e.g. navigating from one module's Compete link to another's without a
  // full page reload). Invalid params bounce back to the normal practice
  // page rather than rendering a broken race screen.
  useEffect(() => {
    const mod = modules.find((m) => m.id === moduleId);
    if (!mod || !mode) {
      navigate("/typing", { replace: true });
      return;
    }

    setLoadingModule(true);
    try {
      const allQuestions = Object.values(questions[mod.id] || {}).flat();
      const pool = extractPassages(allQuestions);
      rawPassagesRef.current = pool.length > 0 ? pool : [{
        id: "fallback",
        parts: [{ role: "question", text: "No typeable content found for this module." }],
      }];
      setSelectedModule(mod);
      setSelectedMode(mode);
      saveSettings({ mode }); // keep global "current difficulty" in sync with
                              // wherever Competition's URL says the user is —
                              // otherwise a normal-mode session saved right
                              // after visiting Competition can silently tag
                              // itself with a stale, unrelated difficulty.
      setUnlockState(getCompetitionUnlockState(mod.id, mode));
      setResult(null);
      setGhosts(null);
      setStep(STEP.INTRO);
    } finally {
      setLoadingModule(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moduleId, mode]);

  // ── Competition-only passage length cap ──────────────────────────────────
  // Competition races should stay short enough to watch a ghost race through
  // in one sitting — a long passage doesn't help fairness (createGhostRunner
  // already rescales ghosts to whatever length is picked, see typingRace.js)
  // but it does hurt the experience. This is intentionally NOT touched in
  // typingExtractor.js, which is shared with Timed/Unit modes — the cap only
  // applies to what Competition is willing to select from its own pool.
  const COMPETITION_MAX_TARGET_LENGTH = 600; // characters, measured post-applyMode
  const COMPETITION_MIN_TARGET_LENGTH = 250; // characters, measured post-applyMode — a too-short passage is over almost before a ghost race gets going

  // Picks the next passage from the pool (fresh each race — recency-aware,
  // same convention as Timed/Unit) and applies the current difficulty.
  // Filters to passages that land within [COMPETITION_MIN_TARGET_LENGTH,
  // COMPETITION_MAX_TARGET_LENGTH] once transformed for this mode —
  // measured after applyMode, not on raw extracted text, since
  // beginner/intermediate stripping can shrink a passage noticeably
  // relative to normal mode on the same question. Falls back to the full
  // (unfiltered) pool if nothing in it happens to qualify, so a sparse
  // question bank never leaves Competition with no passage at all — better
  // to occasionally serve one outside the ideal range than to break the
  // mode.
  const pickPassage = (m) => {
    const pool = shuffleWithRecency(rawPassagesRef.current, selectedModule.id);
    rawPassagesRef.current = pool;
    const transformed = applyMode(pool, m);
    const inRange = transformed.filter((p) => {
      const len = buildJoinedTarget(p).target.length;
      return len >= COMPETITION_MIN_TARGET_LENGTH && len <= COMPETITION_MAX_TARGET_LENGTH;
    });
    const candidates = inRange.length > 0 ? inRange : transformed;
    const next = candidates[0];
    setPassage(next);
    return next;
  };

  // ── Best-appearance roster policy ─────────────────────────────────────
  // Best is a bonus 4th racer rather than always-on: the default field is
  // you + Average + Last Recorded (3). Best joins either at random (kept
  // rare — BEST_RANDOM_CHANCE), guaranteed by the 15th attempt since it
  // last raced so it's never gone for good, OR whenever the player
  // explicitly requests it via handleChallengeBest below (bidirectional —
  // the system can challenge the player, and the player can challenge
  // back). Also unconditional on this pair's genuine first-ever
  // Competition attempt (getAttemptsSinceBestFaced returns null exactly in
  // that case).
  //
  // This decision deliberately lives here, NOT in typingRace.js —
  // selectGhosts() there is a pure ghost-building function with no concept
  // of roster policy (see that file's own header comment), and stays that
  // way; "should Best race this time" is Competition-flow-level product
  // logic, so it's applied one layer up, by simply omitting `best` from
  // what gets built into runners/data below.
  const BEST_INTERVAL      = 15;   // Best is guaranteed by the 15th attempt since it last raced
  const BEST_RANDOM_CHANCE = 0.08; // otherwise, a small per-attempt chance — kept low since the guaranteed window is now wide

  const decideRoster = (moduleId, m) => {
    const sinceBest = getAttemptsSinceBestFaced(moduleId, m);
    if (sinceBest === null) return { includeBest: true, isFirstAttempt: true };
    const dueForBest = sinceBest >= BEST_INTERVAL - 1; // this IS the 15th attempt without Best
    return { includeBest: dueForBest || Math.random() < BEST_RANDOM_CHANCE, isFirstAttempt: false };
  };

  const refreshGhosts = (modId, m, todayTargetLength = null, includeBest = true) => {
    const state = getCompetitionUnlockState(modId, m);
    setUnlockState(state);

    if (!state.unlocked) {
      setGhosts(null);
      return;
    }

    const selected = selectGhosts({ moduleId: modId, mode: m });
    if (!selected) { setGhosts(null); return; }

    // selectGhosts() always returns all three regardless of includeBest —
    // roster filtering happens here, not there (see comment above).
    const roster = includeBest
      ? selected
      : { average: selected.average, lastRecorded: selected.lastRecorded };

    const seed = Date.now();
    const runners = {
      average:      createGhostRunner(roster.average,      { jitterSeed: seed + 1, todayTargetLength }),
      lastRecorded: createGhostRunner(roster.lastRecorded,  { jitterSeed: seed + 2, todayTargetLength }),
    };
    if (roster.best) {
      runners.best = createGhostRunner(roster.best, { jitterSeed: seed, todayTargetLength });
    }

    setGhosts({ data: roster, runners });
  };

  // Fired by the hero's CTA (STEP.INTRO → STEP.RACE) — picks today's
  // passage, decides whether Best is in this race's roster, and builds
  // ghosts accordingly. If Best is in, the race screen isn't shown yet —
  // passage/ghosts are already fully prepared, just held behind the
  // challenge notice until handleAcceptChallenge fires.
  const handleStartRace = () => {
    const next = pickPassage(selectedMode);
    const todayTargetLength = buildJoinedTarget(next).target.length;
    const { includeBest, isFirstAttempt } = decideRoster(selectedModule.id, selectedMode);
    bestIncludedRef.current = includeBest;
    refreshGhosts(selectedModule.id, selectedMode, todayTargetLength, includeBest);

    if (includeBest) {
      setPendingChallenge({ isFirstAttempt });
    } else {
      setStep(STEP.RACE);
    }
  };

  // Accepts the "Your Best Self Has Challenged You" notice — the race
  // screen underneath is already fully prepared, this just reveals it.
  const handleAcceptChallenge = () => {
    setPendingChallenge(null);
    setStep(STEP.RACE);
  };

  const handleFinish = (raceResult) => {
    const stats = computeSessionStats(raceResult);
    const detail = {
      ts: Date.now(),
      date: new Date().toISOString().slice(0, 10),
      wpm: stats.wpm,
      rawWpm: stats.rawWpm,
      accuracy: stats.accuracy,
      score: stats.score,
      consistency: stats.consistency,
      duration: raceResult.elapsedSeconds,
      mode: selectedMode,
      moduleId: selectedModule.id,
      correctChars: raceResult.correctChars,
      incorrectChars: raceResult.incorrectChars,
      charErrors: raceResult.charErrors,
      snapshots: raceResult.snapshots,
      targetLength: raceResult.targetLength,
      paceCurve: raceResult.paceCurve,
      // Drives getAttemptsSinceBestFaced() on future races — see
      // typingStorage.js for why this lives on the record itself rather
      // than a separate counter store.
      facedBest: bestIncludedRef.current,
    };

    // Snapshot ghosts from history BEFORE saving this attempt — unchanged
    // from before, still needed to avoid a new PB racing itself (see 6.3).
    const priorUnlock = getCompetitionUnlockState(selectedModule.id, selectedMode);

    // Prior personal best for THIS (module, mode) pair, from the same
    // combined normal+competition candidate pool ghosts are drawn from —
    // computed BEFORE this session is saved, same "best of everything
    // before this one" pattern deriveStats' isNewBest already uses
    // elsewhere. Independent of whether Competition has unlocked ghosts
    // yet (priorUnlock.unlocked) — "surpassed your best" is a personal-
    // history question, not a "did the ghosts race" question. Null when
    // there's no prior history to compare against at all.
    const priorCandidates = loadGhostCandidateSessions(selectedModule.id, selectedMode);
    const priorBestSnapshot = priorCandidates.length > 0
      ? priorCandidates.reduce((a, b) => (b.wpm > a.wpm ? b : a))
      : null;

    let ghostsForResults = null;
    if (priorUnlock.unlocked) {
      const selected = selectGhosts({
        moduleId: selectedModule.id, mode: selectedMode,
      });
      if (selected) {
        // Same roster this race actually used (bestIncludedRef, set in
        // handleStartRace/handleRaceAgain) — a race that didn't include
        // Best shouldn't suddenly show them on the results screen.
        const roster = bestIncludedRef.current
          ? selected
          : { average: selected.average, lastRecorded: selected.lastRecorded };
        const seed = Date.now();
        const runners = {
          average:      createGhostRunner(roster.average,      { jitterSeed: seed + 1, todayTargetLength: raceResult.targetLength }),
          lastRecorded: createGhostRunner(roster.lastRecorded,  { jitterSeed: seed + 2, todayTargetLength: raceResult.targetLength }),
        };
        if (roster.best) {
          runners.best = createGhostRunner(roster.best, { jitterSeed: seed, todayTargetLength: raceResult.targetLength });
        }
        ghostsForResults = { data: roster, runners };
      }
    }

    const saveResult = saveCompetitionSessionDetail(detail);
    setResult(raceResult);
    setGhosts(ghostsForResults);
    setSaveRejectedReason(saveResult.saved ? null : saveResult.reason);
    setPriorBest(priorBestSnapshot ? { wpm: priorBestSnapshot.wpm, accuracy: priorBestSnapshot.accuracy } : null);
    setUnlockState(getCompetitionUnlockState(selectedModule.id, selectedMode));
    setStep(STEP.RESULTS);
  };

  const handleRaceAgain = () => {
    setResult(null);
    setSaveRejectedReason(null);
    setPriorBest(null);
    const next = pickPassage(selectedMode);
    const todayTargetLength = buildJoinedTarget(next).target.length;
    const { includeBest, isFirstAttempt } = decideRoster(selectedModule.id, selectedMode);
    bestIncludedRef.current = includeBest;
    refreshGhosts(selectedModule.id, selectedMode, todayTargetLength, includeBest);

    if (includeBest) {
      setPendingChallenge({ isFirstAttempt });
    } else {
      setStep(STEP.RACE);
    }
  };

  // Player-initiated counterpart to decideRoster — bidirectional per
  // product decision: the system challenges the player on its own cadence
  // above, but the player can also challenge Best back at any time from
  // the results screen ("Challenge Your Best Self"). Forces includeBest
  // rather than computing it. Unlike the system-initiated challenge
  // (handleStartRace/handleRaceAgain), this one skips the "Your Best Self
  // Has Challenged You" notice entirely — the player already explicitly
  // asked for this, so gating it behind a confirmation screen would just
  // be a redundant extra click, not a real decision point. Goes straight
  // to STEP.RACE once passage/ghosts are ready. It still counts toward
  // resetting the "since Best last faced" cadence normally (handleFinish
  // stamps facedBest from bestIncludedRef.current the same way regardless
  // of how this race's roster was decided).
  //
  // No-ops if Best isn't actually available yet (Competition not unlocked
  // for this pair) — callers should gate the button on unlockState.unlocked
  // too, this is just a defensive second check, same convention
  // selectGhosts itself already follows.
  const handleChallengeBest = () => {
    const state = getCompetitionUnlockState(selectedModule.id, selectedMode);
    if (!state.unlocked) return;

    setResult(null);
    setSaveRejectedReason(null);
    setPriorBest(null);
    const next = pickPassage(selectedMode);
    const todayTargetLength = buildJoinedTarget(next).target.length;
    bestIncludedRef.current = true;
    refreshGhosts(selectedModule.id, selectedMode, todayTargetLength, true);
    setStep(STEP.RACE);
  };

  // Competition no longer owns "change module" internally — module choice
  // lives in the normal practice flow now, so this just leaves the feature
  // entirely and goes back to typing practice.
  const handleChangeModule = () => {
    navigate("/typing");
  };

  // "Back to module" (Competition results screen) — unlike handleChangeModule
  // above, this stays anchored to the SAME module the race just happened in,
  // and drops the user straight into a timed test for it rather than back to
  // module-select. Passes forceTimed via location.state so
  // useTypingPracticeFlow skips the first-timer TEST_TYPE gate even if this
  // person has never run a timed test before (see that hook's
  // handleModuleSelect for the fallback-duration seeding this triggers).
  const handleBackToModule = () => {
    navigate(`/typing?module=${selectedModule.id}`, { state: { forceTimed: true } });
  };

  return {
    step, setStep,
    selectedModule, selectedMode, passage, loadingModule, result,
    unlockState, ghosts, saveRejectedReason, priorBest,
    pendingChallenge,
    handleStartRace, handleAcceptChallenge, handleFinish, handleRaceAgain, handleChallengeBest, handleChangeModule,
    handleBackToModule,
  };
}
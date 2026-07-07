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

  const rawPassagesRef = useRef([]);

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

  // Picks the next passage from the pool (fresh each race — recency-aware,
  // same convention as Timed/Unit) and applies the current difficulty.
  // Filters to passages that stay under COMPETITION_MAX_TARGET_LENGTH once
  // transformed for this mode — measured after applyMode, not on raw
  // extracted text, since beginner/intermediate stripping can shrink a
  // passage noticeably relative to normal mode on the same question. Falls
  // back to the full (unfiltered) pool if nothing in it happens to qualify,
  // so a sparse question bank never leaves Competition with no passage at
  // all — better to occasionally serve a long one than to break the mode.
  const pickPassage = (m) => {
    const pool = shuffleWithRecency(rawPassagesRef.current, selectedModule.id);
    rawPassagesRef.current = pool;
    const transformed = applyMode(pool, m);
    const shortEnough = transformed.filter(
      (p) => buildJoinedTarget(p).target.length <= COMPETITION_MAX_TARGET_LENGTH
    );
    const candidates = shortEnough.length > 0 ? shortEnough : transformed;
    const next = candidates[0];
    setPassage(next);
    return next;
  };

  const refreshGhosts = (modId, m, todayTargetLength = null) => {
    const state = getCompetitionUnlockState(modId, m);
    setUnlockState(state);

    if (!state.unlocked) {
      setGhosts(null);
      return;
    }

    const selected = selectGhosts({ moduleId: modId, mode: m });
    if (!selected) { setGhosts(null); return; }

    const seed = Date.now();
    setGhosts({
      data: selected,
      runners: {
        best:         createGhostRunner(selected.best,         { jitterSeed: seed,     todayTargetLength }),
        average:      createGhostRunner(selected.average,      { jitterSeed: seed + 1, todayTargetLength }),
        lastRecorded: createGhostRunner(selected.lastRecorded, { jitterSeed: seed + 2, todayTargetLength }),
      },
    });
  };

  // Fired by the hero's CTA (STEP.INTRO → STEP.RACE) — picks today's
  // passage and builds ghosts scaled to it, same as the old handleModeSelect
  // did right after difficulty was picked.
  const handleStartRace = () => {
    const next = pickPassage(selectedMode);
    const todayTargetLength = buildJoinedTarget(next).target.length;
    refreshGhosts(selectedModule.id, selectedMode, todayTargetLength);
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
        const seed = Date.now();
        ghostsForResults = {
          data: selected,
          runners: {
            best:         createGhostRunner(selected.best,         { jitterSeed: seed,     todayTargetLength: raceResult.targetLength }),
            average:      createGhostRunner(selected.average,      { jitterSeed: seed + 1, todayTargetLength: raceResult.targetLength }),
            lastRecorded: createGhostRunner(selected.lastRecorded, { jitterSeed: seed + 2, todayTargetLength: raceResult.targetLength }),
          },
        };
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
    refreshGhosts(selectedModule.id, selectedMode, todayTargetLength);
    setStep(STEP.RACE);
  };

  // Competition no longer owns "change module" internally — module choice
  // lives in the normal practice flow now, so this just leaves the feature
  // entirely and goes back to typing practice.
  const handleChangeModule = () => {
    navigate("/typing");
  };

  return {
    step, setStep,
    selectedModule, selectedMode, passage, loadingModule, result,
    unlockState, ghosts, saveRejectedReason, priorBest,
    handleStartRace, handleFinish, handleRaceAgain, handleChangeModule,
  };
}
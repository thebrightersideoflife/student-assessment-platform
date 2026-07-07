// src/components/typing/CompetitionTypingTest.jsx
// Competition engine: types one whole passage (question→answer→explanation,
// joined) against Best/Average/Last-Recorded ghosts (or solo, if this
// (module, mode) pair hasn't unlocked ghosts yet — see typingStorage's
// getCompetitionUnlockState). Structurally closest to UnitTypingTest
// (untimed, single passage, stopwatch counts up) — reuses its scoring
// plumbing (buildSnapshot/exceedsErrorCap) and its buildJoinedTarget
// helper rather than duplicating either. Renders CompetitionDisplay
// (2-line paginated view) instead of UnitTypingDisplay.
//
// Unlike Unit Typing, this also tracks pctComplete every tick (not just
// wpm/errors) — that's the paceCurve persisted on finish (see
// typingStorage's CompetitionSessionDetail) and also what onProgress
// reports live, every second, so a parent race-track component can plot
// the player's dot alongside ghost runners without this component needing
// to know anything about ghosts itself.

import { useState, useEffect, useRef, useCallback } from "react";
import CompetitionDisplay from "./CompetitionDisplay";
import { buildJoinedTarget } from "../../utils/typingExtractor";
import { buildSnapshot, exceedsErrorCap } from "../../utils/typingScoring";

export default function CompetitionTypingTest({ passage, onFinish, onFirstAttempt, onProgress, onGiveUp }) {
  const { target, boundaries } = buildJoinedTarget(passage);
  const blankHighlights = boundaries.flatMap((b) => b.blankHighlights || []);

  // buildJoinedTarget stitches parts together with a literal "\n" — but
  // CompetitionDisplay renders that boundary with default CSS white-space
  // handling, which visually collapses it into an ordinary space. The
  // player is shown a space there and naturally types a spacebar, so every
  // character-by-character comparison (both the correct/incorrect tally
  // below and exceedsErrorCap's shared error-streak scan) needs to compare
  // against what's actually displayed, not the literal separator. This is
  // a 1-for-1 character swap — same length, same indices — so it never
  // touches target.length, boundaries, or anything display-related; it
  // exists purely for comparison purposes and is scoped to this file only,
  // so Unit/Timed typing (which also uses buildJoinedTarget) is unaffected.
  const compareTarget = target.replace(/\n/g, " ");

  const [typed,   setTyped]   = useState("");
  const [started, setStarted] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const correctCharsRef   = useRef(0);
  const incorrectCharsRef = useRef(0);
  const charErrorsRef     = useRef({});
  const typedRef          = useRef("");
  const elapsedRef        = useRef(0);
  const secondWindowRef   = useRef(0);
  const snapshotsRef      = useRef([]);
  const paceCurveRef      = useRef([]); // [{ second, pctComplete }] — this run's own journey
  const timerRef          = useRef(null);
  const inputRef          = useRef(null);

  useEffect(() => { inputRef.current?.focus({ preventScroll: true }); }, []);

  // ── Stopwatch — same shape as UnitTypingTest's, plus pctComplete tracking ─
  useEffect(() => {
    if (!started) return;
    timerRef.current = setInterval(() => {
      elapsedRef.current += 1;
      setElapsedSeconds(elapsedRef.current);

      const snap = buildSnapshot({
        elapsedSeconds:     elapsedRef.current,
        correctChars:       correctCharsRef.current,
        incorrectChars:     incorrectCharsRef.current,
        windowCorrectChars: secondWindowRef.current,
      });
      secondWindowRef.current = 0;
      snapshotsRef.current = [...snapshotsRef.current, snap];

      const pctComplete = Math.min(100, (typedRef.current.length / target.length) * 100);
      paceCurveRef.current = [...paceCurveRef.current, { second: elapsedRef.current, pctComplete }];

      onProgress?.({ elapsedSeconds: elapsedRef.current, pctComplete });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [started, target.length, onProgress]);

  const fireFinish = useCallback((elapsed) => {
    clearInterval(timerRef.current);

    // The 1-second tick almost never lands exactly on the moment the last
    // character is typed, so paceCurveRef's last recorded point is usually
    // short of 100% (e.g. 96%) — replaying that curve later would then cap
    // the ghost just under its real finish forever. Lock in a final point
    // at the real finish second so every stored curve properly terminates
    // at 100%. If the last tick happened to land on this same second,
    // overwrite it rather than adding a duplicate-second point (two points
    // sharing one second would make interpolation pick the wrong one).
    const prevCurve = paceCurveRef.current;
    const last = prevCurve[prevCurve.length - 1];
    const finalPaceCurve = last && last.second === elapsed
      ? [...prevCurve.slice(0, -1), { second: elapsed, pctComplete: 100 }]
      : [...prevCurve, { second: elapsed, pctComplete: 100 }];

    onFinish({
      correctChars:      correctCharsRef.current,
      incorrectChars:    incorrectCharsRef.current,
      completedParts:    passage.parts.length,
      completedPassages: 1,
      elapsedSeconds:    Math.max(elapsed, 1),
      snapshots:         snapshotsRef.current,
      charErrors:        charErrorsRef.current,
      targetLength:      target.length,
      paceCurve:         finalPaceCurve,
    });
  }, [onFinish, passage.parts.length, target.length]);

  const handleChange = useCallback((e) => {
    const value = e.target.value;

    if (!started && value.length > 0) {
      setStarted(true);
      onFirstAttempt?.();
    }

    const prev = typedRef.current;

    if (value.length > prev.length && exceedsErrorCap(value, compareTarget)) {
      typedRef.current = prev;
      setTyped(prev);
      return;
    }

    if (value.length > prev.length) {
      const idx = value.length - 1;
      if (idx < compareTarget.length) {
        if (value[idx] === compareTarget[idx]) {
          correctCharsRef.current += 1;
          secondWindowRef.current += 1;
        } else {
          incorrectCharsRef.current += 1;
          const expected = compareTarget[idx];
          charErrorsRef.current[expected] = (charErrorsRef.current[expected] || 0) + 1;
        }
      }
    }

    typedRef.current = value;
    setTyped(value);

    if (value.length >= target.length) {
      fireFinish(elapsedRef.current);
    }
  }, [started, compareTarget, target.length, onFirstAttempt, fireFinish]);

  const handleGiveUp = useCallback(() => {
    if (onGiveUp) { onGiveUp(); return; }
    fireFinish(elapsedRef.current);
  }, [fireFinish, onGiveUp]);

  return (
    <div>
      {started && (
        <div style={{
          fontSize: "22px", fontWeight: 700, fontVariantNumeric: "tabular-nums",
          color: "var(--text-secondary)", marginBottom: "18px",
        }}>
          {String(Math.floor(elapsedSeconds / 60)).padStart(2, "0")}:{String(elapsedSeconds % 60).padStart(2, "0")}
        </div>
      )}

      <div style={{ cursor: "text" }} onClick={() => inputRef.current?.focus({ preventScroll: true })}>
        <CompetitionDisplay target={target} typed={typed} blankHighlights={blankHighlights} />
      </div>

      <textarea
        ref={inputRef}
        value={typed}
        onChange={handleChange}
        onPaste={(e) => e.preventDefault()}
        rows={1}
        aria-label="Type here"
        style={{ position: "absolute", left: "-9999px", top: 0, opacity: 0, pointerEvents: "none", resize: "none" }}
      />

      <div style={{ display: "flex", justifyContent: "center", marginTop: "28px" }}>
        <button className="button" onClick={handleGiveUp} style={{ fontSize: "13px", padding: "8px 20px", opacity: 0.65 }}>
          Finish now
        </button>
      </div>
    </div>
  );
}
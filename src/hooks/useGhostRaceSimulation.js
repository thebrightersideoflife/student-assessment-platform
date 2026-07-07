// src/hooks/useGhostRaceSimulation.js
// Keeps ghosts moving live on the RESULTS screen after "you" have already
// finished — matches the described 10FastFingers behavior where other
// racers keep visibly progressing toward the finish line while you watch.
// This is intentionally NOT tied to CompetitionTypingTest's 1-second tick
// (that component has already unmounted by the time this runs) — it's a
// self-contained rAF loop keyed off wall-clock time since the results
// screen mounted, continuing each ghost's simulated elapsedSeconds forward
// from wherever it was when the player crossed the finish line.

import { useEffect, useRef, useState } from "react";

/**
 * @param {Record<string, { getPctAt(seconds:number): number }>} ghostRunners
 *   keyed by "best" | "average" | "lastRecorded" — output of createGhostRunner
 * @param {number} initialElapsedSeconds — the player's own finish time; ghosts
 *   resume their simulated race from this point forward
 * @returns {{ ghostStates: Array<{ id, pct, finishedAt }>, allFinished: boolean }}
 */
function computeInitialGhostStates(ghostRunners, ids, initialElapsedSeconds) {
  return ids.map((id) => {
    const runner = ghostRunners[id];
    const pct = runner?.getPctAt(initialElapsedSeconds) ?? 0;
    // A ghost that already finished before the player reached the results
    // screen should be credited with ITS OWN real (rescaled) finish time —
    // runner.totalSeconds — not stamped with the player's own finish time.
    // Stamping every already-finished ghost with the same "now" value was
    // producing identical Time entries for Best/Last Recorded/You and,
    // since ties resolve by array order with "You" listed first, silently
    // ranking the player above ghosts that had objectively finished ahead
    // of them.
    const finishedAt = pct >= 100
      ? Math.min(initialElapsedSeconds, runner?.totalSeconds ?? initialElapsedSeconds)
      : null;
    return { id, pct, finishedAt };
  });
}

export function useGhostRaceSimulation(ghostRunners, initialElapsedSeconds) {
  const ids = Object.keys(ghostRunners || {});

  const [ghostStates, setGhostStates] = useState(
    () => computeInitialGhostStates(ghostRunners, ids, initialElapsedSeconds)
  );
  const [allFinished, setAllFinished] = useState(
    () => ids.length === 0 || computeInitialGhostStates(ghostRunners, ids, initialElapsedSeconds)
      .every((g) => g.finishedAt != null)
  );

  // Mirrors ghostStates but read/written synchronously within tick() —
  // React state itself can't be trusted for this, since under React 18's
  // automatic batching a setState updater function is no longer guaranteed
  // to run before the next line of code executes (see below).
  const ghostStatesRef = useRef(ghostStates);
  const startWallTimeRef = useRef(null);
  const rafRef           = useRef(null);

  useEffect(() => {
    if (ids.length === 0) return;

    // Re-derive fresh initial state here too (not just in the useState
    // initializers above) — this effect now re-runs whenever ghostRunners
    // or initialElapsedSeconds actually change (see the dependency array
    // below), which includes the case where ghosts were still null/empty
    // on this hook's very first render and only became available on a
    // later one. With the old `[]` deps, that case would set ids.length=0,
    // return immediately, and never get a second chance — freezing the
    // track/table forever at their never-updated initial values even
    // after real ghosts arrived.
    const initial = computeInitialGhostStates(ghostRunners, ids, initialElapsedSeconds);
    ghostStatesRef.current = initial;
    setGhostStates(initial);
    setAllFinished(initial.every((g) => g.finishedAt != null));

    startWallTimeRef.current = performance.now();

    const tick = () => {
      const now             = performance.now();
      const simulatedSeconds = initialElapsedSeconds + (now - startWallTimeRef.current) / 1000;

      // Compute the next array as a plain synchronous value, reading from
      // the ref rather than from inside setState's functional updater.
      // The old version mutated a local `stillRacing` flag INSIDE the
      // setGhostStates updater and then read that flag on the very next
      // line, assuming the updater ran synchronously — true under React's
      // old unbatched-outside-event-handlers behavior, but no longer true
      // under React 18's automatic batching, which now defers setState
      // updaters (including ones called from a requestAnimationFrame
      // callback) to the render phase. That meant `stillRacing` was almost
      // always still reading its stale initial `false`, so the loop's
      // `else` branch (setAllFinished(true), no further rAF) fired after
      // essentially one frame, every time — the exact "one tick then dead"
      // pattern that showed up in testing, and the real cause of ghosts
      // permanently appearing to freeze mid-race.
      let stillRacing = false;
      const next = ghostStatesRef.current.map((g) => {
        if (g.finishedAt != null) return g;
        const runner = ghostRunners[g.id];
        // Defensive: a missing runner would otherwise throw here, which
        // (since it happens inside this rAF callback, before reaching
        // the requestAnimationFrame(tick) call below) silently kills
        // the whole animation loop forever with no visible error —
        // exactly the same "frozen" symptom as the deps bug above, just
        // from a different cause. Skipping this ghost for one frame
        // instead keeps the rest of the race running.
        if (!runner) { stillRacing = true; return g; }
        const pct = runner.getPctAt(simulatedSeconds);
        if (pct >= 100) {
          return { ...g, pct: 100, finishedAt: simulatedSeconds };
        }
        stillRacing = true;
        return { ...g, pct };
      });

      ghostStatesRef.current = next;
      setGhostStates(next);

      if (stillRacing) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setAllFinished(true);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
    // Real dependencies now, not [] — this genuinely restarts the loop
    // (with fresh initial state) if either the runners or the starting
    // point change, e.g. ghosts finishing async setup, or Race Again
    // swapping in a brand new race.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ghostRunners, initialElapsedSeconds]);

  return { ghostStates, allFinished };
}
// src/components/typing/CompetitionRaceTrackLive.jsx
// Bridges CompetitionTypingTest's onProgress callback into live racer state
// for CompetitionRaceTrack during the race itself. Driven by
// CompetitionTypingTest's 1-second onProgress tick (not a rAF loop, unlike
// useGhostRaceSimulation's post-finish version) — "you" only move when the
// engine reports real progress, ghosts move in lockstep off that same tick
// via getPctAt(elapsedSeconds).
//
// CompetitionTypingTest and this component are SIBLINGS in
// CompetitionLandingPage, not parent/child, so the progress callback is
// wired through a ref (onProgressRef) rather than a plain prop passed
// downward — see the parent wiring note below for why.

import { useEffect, useState } from "react";
import CompetitionRaceTrack from "./CompetitionRaceTrack";

export default function CompetitionRaceTrackLive({ ghosts, onProgressRef }) {
  const [racers, setRacers] = useState(() => [
    { id: "you", pct: 0 },
    ...(ghosts ? Object.keys(ghosts.runners).map((id) => ({
      id, pct: 0, wpm: ghosts.data[id].wpm,
    })) : []),
  ]);

  // Reset racer state if ghosts change (e.g. Race Again re-rolls jitter,
  // or unlock state flips mid-session) — otherwise stale racers from a
  // previous race would linger at their last pct.
  useEffect(() => {
    setRacers([
      { id: "you", pct: 0 },
      ...(ghosts ? Object.keys(ghosts.runners).map((id) => ({
        id, pct: 0, wpm: ghosts.data[id].wpm,
      })) : []),
    ]);
  }, [ghosts]);

  // Exposed via ref so CompetitionTypingTest (a sibling, not a parent) can
  // drive this component's state without either needing to know about the
  // other's internals — CompetitionTypingTest stays fully ghost-agnostic.
  useEffect(() => {
    onProgressRef.current = ({ elapsedSeconds, pctComplete }) => {
      setRacers((prev) => prev.map((r) => {
        if (r.id === "you") return { ...r, pct: pctComplete };
        const runner = ghosts?.runners?.[r.id];
        return runner ? { ...r, pct: runner.getPctAt(elapsedSeconds) } : r;
      }));
    };
  }, [ghosts, onProgressRef]);

  return <CompetitionRaceTrack racers={racers} mode="live" />;
}
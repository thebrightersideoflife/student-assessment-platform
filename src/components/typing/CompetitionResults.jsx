// src/components/typing/CompetitionResults.jsx
// Results screen for Competition mode. "You" arrive already finished (that's
// why we're here); ghosts keep animating toward the finish line live via
// useGhostRaceSimulation, and a finish-order list grows underneath the
// track as each one crosses — this list is the direct answer to "gives the
// order of finished participants... pops up live as players finish."

import { useContext, useEffect, useMemo, useRef, useState } from "react";
import CompetitionRaceTrack, { RACER_META, RANK_OPACITY, rankRacers } from "./CompetitionRaceTrack";
import { computeSessionStats } from "../../utils/typingStorage";
import { useGhostRaceSimulation } from "../../hooks/useGhostRaceSimulation";
import { ThemeContext } from "../../context/ThemeContext";
import GoalConfetti from "./GoalConfetti";

const TABLE_HEADERS = ["Position", "Username", "WPM", "Keystrokes", "Accuracy", "Time"];
const EMPTY_RUNNERS = {};

// Small inline indicator like "(↑+4wpm)" / "(↓-58wpm)" / "(↑+2%)" — only
// rendered when there's an actual, nonzero change to report. Up = green
// (an improvement, whether that's wpm or accuracy), down = red — same
// "good/bad" color convention already used elsewhere (accColor in
// TypingResults, tpr-good/tpr-bad in the report).
function DeltaBadge({ delta, suffix }) {
  if (delta == null) return null;
  const rounded = Math.round(delta);
  if (rounded === 0) return null;
  const isUp  = rounded > 0;
  const arrow = isUp ? "↑" : "↓";
  const sign  = isUp ? "+" : ""; // the minus sign is already part of a negative number
  return (
    <span style={{
      marginLeft: "6px", fontSize: "11px", fontWeight: 700,
      color: isUp ? "var(--lush-lime)" : "var(--poppy-red)",
    }}>
      ({arrow}{sign}{rounded}{suffix})
    </span>
  );
}

export default function CompetitionResults({ result, ghosts, saveRejectedReason = null, priorBest = null, onRaceAgain, onChangeModule }) {
  const { theme } = useContext(ThemeContext);
  const yourStats = useMemo(() => computeSessionStats(result), [result]);
  const yourKeystrokes = (result.correctChars || 0) + (result.incorrectChars || 0);

  // Deltas vs. this (module, mode) pair's prior personal best — shown as
  // inline badges in the You row regardless of whether a celebration
  // fires (see below); purely informational.
  const wpmDelta      = priorBest ? yourStats.wpm - priorBest.wpm : null;
  const accuracyDelta = priorBest ? yourStats.accuracy - priorBest.accuracy : null;

  // ── Save-rejected toast ─────────────────────────────────────────────────
  // Pop-up rather than a persistent banner, matching TypingResults' — the
  // warning is noticed in the moment without permanently occupying the
  // results layout. Re-triggers if saveRejectedReason itself changes (a
  // fresh race, rejected again, right after a prior toast faded).
  const [showSaveToast, setShowSaveToast] = useState(false);
  useEffect(() => {
    if (!saveRejectedReason) { setShowSaveToast(false); return; }
    setShowSaveToast(true);
    const t = setTimeout(() => setShowSaveToast(false), 5000);
    return () => clearTimeout(t);
  }, [saveRejectedReason]);

  // Stable reference: without this, `ghosts?.runners ?? {}` produces a new
  // object every render, which (since useGhostRaceSimulation depends on
  // this value by reference) tears down and restarts the rAF loop on every
  // single frame it itself produces — the loop never survives long enough
  // to reach a ghost's finish, which is what was producing the permanent
  // "racing…" state even though the dots visually sat near the finish line.
  const ghostRunners = useMemo(() => ghosts?.runners ?? EMPTY_RUNNERS, [ghosts]);
  const { ghostStates, allFinished } = useGhostRaceSimulation(ghostRunners, result.elapsedSeconds);

  const racers = [
    {
      id: "you", pct: 100, finishedAt: result.elapsedSeconds,
      wpm: yourStats.wpm, accuracy: yourStats.accuracy, keystrokes: yourKeystrokes,
    },
    ...ghostStates.map((g) => {
      const data = ghosts?.data?.[g.id];
      const runner = ghostRunners[g.id];
      return {
        ...g,
        wpm: data?.wpm,
        accuracy: data?.accuracy,
        // Use the runner's rescaled projection, not the raw historical
        // count off `data` — `data.keystrokes` is tied to the ghost's own
        // historical passage length and isn't comparable to today's race.
        keystrokes: runner?.projectedKeystrokes ?? data?.keystrokes,
      };
    }),
  ];

  // Every racer, ordered by the same rule the track uses for its rank-fade
  // (finished by finish time, still-racing by current position) — so the
  // table shows the whole field the whole time, reordering live as ghosts
  // gain or lose ground, not just growing once each one finishes.
  const orderedRacers = rankRacers(racers);

  // ── Position-based celebration ──────────────────────────────────────────
  // "You" arrives at Results already finished, and rankRacers always ranks
  // a finished racer above any still-racing one regardless of that racer's
  // current pct — so your position relative to every ghost is fully
  // decided the instant this component first renders. It cannot later
  // improve OR worsen as the still-racing ghosts keep animating toward
  // their own finish (a ghost finishing later than you simply can't
  // out-rank you — see rankRacers). That's what makes it safe to trigger
  // immediately, without waiting for allFinished.
  //
  // 1st place → "gold" tier: the fullest celebration (most confetti + the
  // PartyPopper icon), via GoalConfetti's mode="wpm".
  // 2nd place → "silver" tier: a step down (moderate confetti + a smaller
  // Medal icon), via GoalConfetti's dedicated mode="silver" — deliberately
  // NOT mode="time": that mode has no icon fallback, so under
  // prefers-reduced-motion it renders nothing at all, which is exactly why
  // 2nd place wasn't showing any celebration before this fix.
  // 3rd/4th → no celebration.
  const yourRank = orderedRacers.findIndex((r) => r.id === "you");
  const celebrationTier = yourRank === 0 ? "gold" : yourRank === 1 ? "silver" : null;

  // Ref-guarded so it fires exactly once per mount (component fully
  // unmounts/remounts on Race Again via the parent's step transitions, so
  // no manual reset is needed here).
  const celebratedTierRef = useRef(null);
  const [activeCelebration, setActiveCelebration] = useState(null);
  useEffect(() => {
    if (celebrationTier && celebratedTierRef.current === null) {
      celebratedTierRef.current = celebrationTier;
      setActiveCelebration(celebrationTier);
    }
  }, [celebrationTier]);

  return (
    <div>
      {activeCelebration === "gold" && <GoalConfetti mode="wpm" theme={theme} accentColor={RACER_META.you.color} />}
      {activeCelebration === "silver" && <GoalConfetti mode="silver" theme={theme} accentColor={RACER_META.you.color} />}
      {showSaveToast && saveRejectedReason && (
        <div
          className="cr-save-toast"
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
      <CompetitionRaceTrack racers={racers} mode="results" />

      <div style={{ marginTop: "24px" }}>
        <h3 style={{ fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-secondary)", marginBottom: "10px" }}>
          Standings
        </h3>

        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
          <thead>
            <tr>
              {TABLE_HEADERS.map((h, i) => (
                <th key={h} style={{
                  textAlign:     i <= 1 ? "left" : "right",
                  padding:       "6px 10px",
                  fontSize:      "11px",
                  fontWeight:    700,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  color:         "var(--text-secondary)",
                  borderBottom:  "1px solid rgba(var(--border-color-rgb), 0.4)",
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orderedRacers.map((r, i) => {
              const meta      = RACER_META[r.id] || { label: r.id, color: "var(--text-secondary)" };
              const opacity   = RANK_OPACITY[Math.min(i, RANK_OPACITY.length - 1)];
              const isDone    = r.finishedAt != null;

              return (
                <tr key={r.id}>
                  <td style={{ padding: "8px 10px" }}>
                    <span style={{
                      display: "inline-flex", alignItems: "center", justifyContent: "center",
                      width: "22px", height: "22px", borderRadius: "6px",
                      background: meta.color, opacity, color: "white",
                      fontWeight: 700, fontSize: "12px",
                      transition: "background 0.2s ease",
                    }}>
                      {i + 1}
                    </span>
                  </td>
                  <td style={{ padding: "8px 10px", fontWeight: 700, color: meta.color, opacity }}>
                    {meta.label}
                  </td>
                  <td style={{ padding: "8px 10px", textAlign: "right", fontVariantNumeric: "tabular-nums", color: "var(--text-primary)", opacity: isDone ? 1 : 0.6 }}>
                    {r.wpm ?? "—"}
                    {r.id === "you" && <DeltaBadge delta={wpmDelta} suffix="wpm" />}
                  </td>
                  <td style={{ padding: "8px 10px", textAlign: "right", fontVariantNumeric: "tabular-nums", color: "var(--text-primary)", opacity: isDone ? 1 : 0.6 }}>
                    {r.keystrokes ?? "—"}
                  </td>
                  <td style={{ padding: "8px 10px", textAlign: "right", fontVariantNumeric: "tabular-nums", color: "var(--text-primary)", opacity: isDone ? 1 : 0.6 }}>
                    {r.accuracy != null ? `${r.accuracy}%` : "—"}
                    {r.id === "you" && <DeltaBadge delta={accuracyDelta} suffix="%" />}
                  </td>
                  <td style={{ padding: "8px 10px", textAlign: "right", fontVariantNumeric: "tabular-nums", color: "var(--text-secondary)" }}>
                    {isDone
                      ? `${Math.round(r.finishedAt)}s`
                      : <span style={{ fontStyle: "italic", opacity: 0.7 }}>racing…</span>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {!allFinished && Object.keys(ghostRunners).length > 0 && (
          <p style={{ fontSize: "12px", color: "var(--text-secondary)", opacity: 0.7, marginTop: "8px" }}>
            still racing…
          </p>
        )}
      </div>

      <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginTop: "28px" }}>
        <button className="button" onClick={onRaceAgain}>Race again</button>
        <button className="button" onClick={onChangeModule} style={{ opacity: 0.75 }}>Change module</button>
      </div>

      <style>{`
        /* Save-rejected toast — slides/fades in, holds, then fades out over
           the full 5s lifetime the component keeps it mounted for. */
        .cr-save-toast {
          animation: cr-toast-fade 5s ease forwards;
        }
        @keyframes cr-toast-fade {
          0%   { opacity: 0; transform: translateY(8px); }
          8%   { opacity: 1; transform: translateY(0); }
          85%  { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(8px); }
        }
      `}</style>
    </div>
  );
}
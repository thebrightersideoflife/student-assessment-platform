// src/components/typing/CompetitionResults.jsx
// Results screen for Competition mode. "You" arrive already finished (that's
// why we're here); ghosts keep animating toward the finish line live via
// useGhostRaceSimulation, and a finish-order list grows underneath the
// track as each one crosses.

import { useContext, useEffect, useMemo, useRef, useState } from "react";
import CompetitionRaceTrack, { RACER_META, RANK_OPACITY, rankRacers } from "./CompetitionRaceTrack";
import { computeSessionStats } from "../../utils/typingStorage";
import { useGhostRaceSimulation } from "../../hooks/useGhostRaceSimulation";
import { ThemeContext } from "../../context/ThemeContext";
import GoalConfetti from "./GoalConfetti";
import BestDefeatedNotice from "./BestDefeatedNotice";

const TABLE_HEADERS = ["Position", "Username", "WPM", "Keystrokes", "Accuracy", "Time"];
const EMPTY_RUNNERS = {};
// Same artwork used in BestChallengeNotice / BestDefeatedNotice — reused
// here as Best's "profile pic" on the Challenge Your Best Self button so
// the same face represents Best everywhere it shows up in Competition mode.
const BEST_IMAGE_SRC = "/images/Best_Player-Typing_Competition.png";

// Small inline indicator like "(↑+4wpm)" — only rendered when nonzero.
function DeltaBadge({ delta, suffix }) {
  if (delta == null) return null;
  const rounded = Math.round(delta);
  if (rounded === 0) return null;
  const isUp  = rounded > 0;
  const arrow = isUp ? "↑" : "↓";
  const sign  = isUp ? "+" : "";
  return (
    <span style={{
      marginLeft: "6px", fontSize: "11px", fontWeight: 700,
      color: isUp ? "var(--lush-lime)" : "var(--poppy-red)",
    }}>
      ({arrow}{sign}{rounded}{suffix})
    </span>
  );
}

export default function CompetitionResults({ result, ghosts, saveRejectedReason = null, priorBest = null, unlockState = null, onRaceAgain, onChallengeBest, onChangeModule, onBackToModule }) {
  const { theme } = useContext(ThemeContext);
  const yourStats = useMemo(() => computeSessionStats(result), [result]);
  const yourKeystrokes = (result.correctChars || 0) + (result.incorrectChars || 0);

  const wpmDelta      = priorBest ? yourStats.wpm - priorBest.wpm : null;
  const accuracyDelta = priorBest ? yourStats.accuracy - priorBest.accuracy : null;

  const [showSaveToast, setShowSaveToast] = useState(false);
  useEffect(() => {
    if (!saveRejectedReason) { setShowSaveToast(false); return; }
    setShowSaveToast(true);
    const t = setTimeout(() => setShowSaveToast(false), 5000);
    return () => clearTimeout(t);
  }, [saveRejectedReason]);

  // Stable reference — avoids tearing down/restarting useGhostRaceSimulation's
  // rAF loop on every render.
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
        keystrokes: runner?.projectedKeystrokes ?? data?.keystrokes,
      };
    }),
  ];

  const orderedRacers = rankRacers(racers);

  // ── Best-defeated check ──────────────────────────────────────────────────
  // Same "decided once, at mount" invariant the rank-based celebration
  // below already relies on: rankRacers ranks a finished racer above any
  // still-racing one, so if Best is in this race and you outrank it in
  // orderedRacers, that's final the instant this renders — Best cannot
  // later "catch up" as its own animation continues toward its own,
  // already-fixed finish time.
  const bestInRace = racers.find((r) => r.id === "best");
  const yourIndex = orderedRacers.findIndex((r) => r.id === "you");
  const bestIndex = bestInRace ? orderedRacers.findIndex((r) => r.id === "best") : -1;
  const defeatedBest = bestInRace != null && bestIndex !== -1 && yourIndex < bestIndex;

  const bestData   = ghosts?.data?.best;
  const bestRunner = ghostRunners.best;

  const [showDefeatedNotice, setShowDefeatedNotice] = useState(false);
  const defeatedFiredRef = useRef(false);
  useEffect(() => {
    if (defeatedBest && !defeatedFiredRef.current) {
      defeatedFiredRef.current = true;
      setShowDefeatedNotice(true);
    }
  }, [defeatedBest]);

  // ── Position-based celebration (gold/silver confetti) ───────────────────
  // Suppressed when defeatedBest is true — beating Best already gets the
  // bigger, more specific BestDefeatedNotice above, so both firing at once
  // would just be visual clutter.
  const yourRank = yourIndex;
  const celebrationTier = defeatedBest ? null : yourRank === 0 ? "gold" : yourRank === 1 ? "silver" : null;

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
      {showDefeatedNotice && (
        <BestDefeatedNotice
          yourWpm={yourStats.wpm}
          yourAccuracy={yourStats.accuracy}
          yourTime={result.elapsedSeconds}
          bestWpm={bestData?.wpm}
          bestAccuracy={bestData?.accuracy}
          bestTime={bestRunner?.totalSeconds}
          onDismiss={() => setShowDefeatedNotice(false)}
        />
      )}
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
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: "12px", marginBottom: "10px", flexWrap: "wrap",
        }}>
          <h3 style={{ fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-secondary)", margin: 0 }}>
            Standings
          </h3>

          {unlockState?.unlocked && onChallengeBest && (
            <button
              className="button"
              onClick={onChallengeBest}
              style={{
                display: "flex", alignItems: "center", gap: "8px",
                padding: "6px 12px 6px 6px",
                fontSize: "12.5px", fontWeight: 700,
                borderRadius: "999px",
                background: "color-mix(in srgb, var(--lush-lime) 12%, transparent)",
                border: "1px solid color-mix(in srgb, var(--lush-lime) 45%, transparent)",
                color: "var(--lush-lime)",
              }}
            >
              <span style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: "22px", height: "22px", borderRadius: "50%",
                overflow: "hidden", flexShrink: 0,
                background: RACER_META.best.color,
                boxShadow: `0 0 0 1px color-mix(in srgb, var(--lush-lime) 55%, transparent)`,
              }}>
                <img
                  src={BEST_IMAGE_SRC}
                  alt=""
                  aria-hidden="true"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </span>
              Challenge Your Best Self
            </button>
          )}
        </div>

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

      <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginTop: "28px", flexWrap: "wrap" }}>
        <button className="button" onClick={onRaceAgain}>Race again</button>
        {onBackToModule && (
          <button className="button" onClick={onBackToModule} style={{ opacity: 0.9 }}>
            Back to module
          </button>
        )}
        <button className="button" onClick={onChangeModule} style={{ opacity: 0.75 }}>Change module</button>
      </div>

      <style>{`
        .cr-save-toast { animation: cr-toast-fade 5s ease forwards; }
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
// src/components/typing/CompetitionRaceTrack.jsx
// Shared race track for both the typing session (mode="live") and the
// results view (mode="results") — same component, same fixed identity
// colors, same rank-fade math in both places, so "how do I read this
// track" never has to be relearned between the two screens.
//
// ── Colors (two layered concerns, per the agreed design) ────────────────
// 1. Identity color — constant per racer, always tells you who's who:
//      You            → var(--accent-primary)
//      Best           → var(--lush-lime)
//      Average        → var(--vibrant-cyan)
//      Last Recorded  → var(--sunset-orange)
// 2. Rank fade — an OPACITY multiplier on top of the identity color, not a
//    color swap: 1st place 100%, 2nd ~75%, 3rd ~50%, 4th ~30%. Rank is
//    recomputed from current `pct` on every render, so in live mode the
//    fade visibly reshuffles as racers overtake each other; in results
//    mode it's just permanently settled at final standing.

import { useMemo } from "react";
import { Flag } from "lucide-react";

export const RACER_META = {
  you:          { label: "You",           color: "var(--accent-primary)" },
  best:         { label: "Best",          color: "var(--lush-lime)" },
  average:      { label: "Average",       color: "var(--vibrant-cyan)" },
  lastRecorded: { label: "Last Recorded", color: "var(--sunset-orange)" },
};

export const RANK_OPACITY = [1, 0.75, 0.5, 0.3]; // 1st, 2nd, 3rd, 4th place

/**
 * @param {Array<{ id: "you"|"best"|"average"|"lastRecorded", pct: number, wpm?: number, accuracy?: number }>} racers
 * @param {"live"|"results"} mode
 */
// ── Shared ranking rule ──────────────────────────────────────────────────
// Finished racers rank by finish time (earlier = better); still-racing
// racers rank by current position. Exported so CompetitionResults' table
// can order/re-order its rows by the exact same rule the track uses for
// its rank-fade opacity — "how do I read this" stays consistent between
// the dots and the table, including which one bumps which live.
export function rankRacers(racers) {
  return [...racers].sort((a, b) => {
    const aDone = a.finishedAt != null;
    const bDone = b.finishedAt != null;
    if (aDone && bDone) return a.finishedAt - b.finishedAt; // earlier finish = better rank
    if (aDone) return -1;
    if (bDone) return 1;
    return b.pct - a.pct; // still racing — order by current position
  });
}

/**
 * @param {Array<{ id: "you"|"best"|"average"|"lastRecorded", pct: number, wpm?: number, accuracy?: number }>} racers
 * @param {"live"|"results"} mode
 */
export default function CompetitionRaceTrack({ racers, mode = "live" }) {
  const rankById = useMemo(() => {
    const map = {};
    rankRacers(racers).forEach((r, i) => { map[r.id] = i; });
    return map;
  }, [racers]);

  return (
    <div className="card" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {racers.map((racer) => {
        const meta    = RACER_META[racer.id] || { label: racer.id, color: "var(--text-secondary)" };
        const rank    = rankById[racer.id] ?? racers.length - 1;
        const opacity = RANK_OPACITY[Math.min(rank, RANK_OPACITY.length - 1)];
        const pct     = Math.max(0, Math.min(100, racer.pct));

        return (
          <div
            key={racer.id}
            style={{
              display: "flex", alignItems: "center", gap: "12px",
              padding: "6px 8px", borderRadius: "10px",
              background: rank === 0 ? "rgba(var(--border-color-rgb), 0.12)" : "transparent",
              transition: "background 0.3s ease",
            }}
          >
            {/* Rank badge — makes standing legible at a glance instead of
                relying on opacity alone to communicate position */}
            <span style={{
              width: "18px", height: "18px", flexShrink: 0, borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "10px", fontWeight: 800,
              color: rank === 0 ? "var(--bg-card)" : "var(--text-secondary)",
              background: rank === 0 ? meta.color : "rgba(var(--border-color-rgb), 0.35)",
              transition: "background 0.3s ease, color 0.3s ease",
            }}>
              {rank + 1}
            </span>

            <span style={{
              width: "84px", flexShrink: 0, fontSize: "12px", fontWeight: 700,
              letterSpacing: "0.04em", textTransform: "uppercase",
              color: meta.color, opacity,
            }}>
              {meta.label}
            </span>

            {/* Track — inner width already reserves room for the finish
                flag, so `pct%` maps directly without nested calc() */}
            <div style={{ position: "relative", flex: 1, height: "22px", paddingRight: "24px" }}>
              {/* Lane background — a soft rounded groove the dot travels
                  through, instead of a bare dashed line floating in space */}
              <div style={{
                position: "absolute", top: "50%", left: 0, right: "24px", height: "6px",
                borderRadius: "999px",
                background: "rgba(var(--border-color-rgb), 0.28)",
                transform: "translateY(-50%)",
              }} />
              {/* Filled trail — ground already covered, tinted in the
                  racer's own identity color so progress reads at a glance
                  even before comparing dot positions across rows */}
              <div style={{
                position: "absolute", top: "50%", left: 0, height: "6px",
                width: `${pct}%`,
                borderRadius: "999px",
                background: meta.color, opacity: opacity * 0.5,
                transform: "translateY(-50%)",
                transition: "width 0.35s linear",
              }} />
              <div style={{
                position: "absolute", top: "50%", right: 0,
                width: "18px", height: "18px", borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                border: "1.5px solid rgba(var(--border-color-rgb), 0.9)",
                background: "var(--bg-card)", transform: "translateY(-50%)",
                color: "var(--text-secondary)",
              }}>
                <Flag size={10} strokeWidth={2.25} />
              </div>
              <div style={{
                position: "absolute", top: "50%", left: `${pct}%`,
                width: "14px", height: "14px", borderRadius: "50%",
                background: meta.color, opacity,
                transform: "translate(-50%, -50%)",
                transition: "left 0.35s linear",
                boxShadow: `0 0 0 3px rgba(var(--bg-card-rgb), 0.9), 0 0 8px 1px ${meta.color}`,
              }} />
            </div>

            {mode === "results" && (
              <span style={{
                width: "84px", flexShrink: 0, textAlign: "right",
                fontSize: "12px", fontVariantNumeric: "tabular-nums",
                color: "var(--text-secondary)", opacity,
              }}>
                {racer.wpm != null ? `${racer.wpm} wpm` : "—"}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
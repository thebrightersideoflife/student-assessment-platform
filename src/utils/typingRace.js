// src/utils/typingRace.js
//
// Ghost selection + replay for Competition mode. Pure functions only — no
// storage reads/writes live here (that's typingStorage.js's job); this file
// takes already-loaded CompetitionSessionDetail[] and turns them into
// race-able ghosts.
//
// ── Identity vs journey ─────────────────────────────────────────────────
// A ghost's displayed stats (wpm/accuracy/elapsedSeconds) are ALWAYS that
// historical session's real numbers, unchanged run to run — that's what
// makes "Best"/"Average"/"Last Recorded" meaningful labels rather than
// random flavor text. Only the pace CURVE (the dot's position over time,
// second-by-second) is re-randomized on every replay, via createGhostRunner
// below — see its doc comment for how.

import { COMPETITION_UNLOCK_THRESHOLD, loadGhostCandidateSessions } from "./typingStorage";

// ─── Selection ────────────────────────────────────────────────────────────

/**
 * selectGhosts({ moduleId, mode }) → { best, average, lastRecorded } | null
 *
 * Ghost candidates come from the combined normal+competition pool for this
 * (moduleId, mode) — see loadGhostCandidateSessions in typingStorage.js.
 *
 * Returns null if fewer than COMPETITION_UNLOCK_THRESHOLD sessions exist for
 * that group — callers should check getCompetitionUnlockState() first and
 * only call this once unlocked, but this is a defensive second check.
 */
export function selectGhosts({ moduleId, mode }) {
  const group = loadGhostCandidateSessions(moduleId, mode)
    .slice() // oldest-first, same convention as everywhere else
    .sort((a, b) => a.ts - b.ts);

  if (group.length < COMPETITION_UNLOCK_THRESHOLD) return null;

  // Prefer genuine Competition-mode sessions for best/lastRecorded — they
  // carry a real recorded paceCurve rather than the flat synthetic ramp
  // normal-mode sessions get (see loadGhostCandidateSessions). Racing
  // against a dead-straight line labeled "Last Recorded" reads as uncanny
  // next to a genuine jittery curve, so real Competition data wins the
  // slot whenever it's available; normal-mode sessions only fill in when
  // there's no real Competition attempt to use at all. `average` is left
  // untouched — it's already a blended synthetic curve regardless of
  // source, so mixing sources there doesn't introduce a new mismatch.
  const competitionOnly = group.filter((s) => s.__sourceType !== "normal");
  const best = competitionOnly.length > 0
    ? competitionOnly.reduce((a, b) => (b.wpm > a.wpm ? b : a))
    : group.reduce((a, b) => (b.wpm > a.wpm ? b : a));
  const lastRecorded = competitionOnly.length > 0
    ? competitionOnly[competitionOnly.length - 1]
    : group[group.length - 1];
  const average = buildAverageGhost(group);

  return {
    best:          toGhost(best, "best", "Best"),
    lastRecorded:  toGhost(lastRecorded, "lastRecorded", "Last Recorded"),
    average,
  };
}

function toGhost(session, id, label) {
  return {
    id,
    label,
    wpm:            session.wpm,
    accuracy:       session.accuracy,
    elapsedSeconds: session.duration,
    targetLength:   session.targetLength || null,
    keystrokes:     (session.correctChars || 0) + (session.incorrectChars || 0),
    paceCurve:      session.paceCurve || [],
  };
}

// ─── Average ghost construction ────────────────────────────────────────────

const RESAMPLE_POINTS = 100; // fixed-resolution common time axis for averaging

/**
 * resamplePaceCurve(curve, totalSeconds, numPoints) → number[]
 * Linearly interpolates a { second, pctComplete }[] curve onto `numPoints`
 * evenly-spaced fractions of totalSeconds (0 → totalSeconds), returning just
 * the pctComplete values. Used so curves of different lengths/second-counts
 * can be pointwise-averaged against each other.
 */
function resamplePaceCurve(curve, totalSeconds, numPoints = RESAMPLE_POINTS) {
  if (!curve || curve.length === 0 || totalSeconds <= 0) {
    return new Array(numPoints).fill(0);
  }
  const sorted = [...curve].sort((a, b) => a.second - b.second);
  const out = [];
  for (let i = 0; i < numPoints; i++) {
    const targetSecond = (i / (numPoints - 1)) * totalSeconds;
    out.push(interpolateAt(sorted, targetSecond));
  }
  return out;
}

function interpolateAt(sortedCurve, second) {
  if (second <= sortedCurve[0].second) return sortedCurve[0].pctComplete;
  const last = sortedCurve[sortedCurve.length - 1];
  if (second >= last.second) return last.pctComplete;

  for (let i = 1; i < sortedCurve.length; i++) {
    const prev = sortedCurve[i - 1];
    const curr = sortedCurve[i];
    if (second <= curr.second) {
      const span = curr.second - prev.second;
      const frac = span > 0 ? (second - prev.second) / span : 0;
      return prev.pctComplete + (curr.pctComplete - prev.pctComplete) * frac;
    }
  }
  return last.pctComplete;
}

/**
 * buildAverageGhost(sessions) → Ghost
 *
 * Pointwise-averages every session's pace curve (each resampled onto the
 * same RESAMPLE_POINTS-point axis) to build one synthetic curve, and
 * averages wpm/accuracy/elapsedSeconds the ordinary way. `sessions` must
 * already be filtered to one (moduleId, mode) group.
 */
export function buildAverageGhost(sessions) {
  const avgElapsed = Math.round(
    sessions.reduce((sum, s) => sum + s.duration, 0) / sessions.length
  );
  const avgWpm = Math.round(
    sessions.reduce((sum, s) => sum + s.wpm, 0) / sessions.length
  );
  const avgAccuracy = Math.round(
    sessions.reduce((sum, s) => sum + s.accuracy, 0) / sessions.length
  );
  const lengthSamples = sessions.map((s) => s.targetLength).filter((n) => n > 0);
  const avgTargetLength = lengthSamples.length > 0
    ? Math.round(lengthSamples.reduce((sum, n) => sum + n, 0) / lengthSamples.length)
    : null;
  const avgKeystrokes = Math.round(
    sessions.reduce((sum, s) => sum + ((s.correctChars || 0) + (s.incorrectChars || 0)), 0) / sessions.length
  );

  const resampled = sessions.map((s) =>
    resamplePaceCurve(s.paceCurve, s.duration)
  );

  const averagedPoints = [];
  for (let i = 0; i < RESAMPLE_POINTS; i++) {
    const avgPct =
      resampled.reduce((sum, curve) => sum + curve[i], 0) / resampled.length;
    averagedPoints.push(avgPct);
  }

  // Rescale the averaged 0..RESAMPLE_POINTS-1 axis back onto avgElapsed
  // seconds so this ghost's curve uses real second values, same shape as
  // every other ghost's paceCurve.
  const paceCurve = averagedPoints.map((pctComplete, i) => ({
    second: Math.round((i / (RESAMPLE_POINTS - 1)) * avgElapsed),
    pctComplete,
  }));

  return {
    id:             "average",
    label:          "Average",
    wpm:            avgWpm,
    accuracy:       avgAccuracy,
    elapsedSeconds: avgElapsed,
    targetLength:   avgTargetLength,
    keystrokes:     avgKeystrokes,
    paceCurve,
  };
}

// ─── Replay ("feels real" journey re-randomization) ────────────────────────
//
// A ghost's stored paceCurve is deterministic — replaying it identically
// every race would look robotic. createGhostRunner() wraps a ghost's curve
// with a ONE-TIME-PER-RACE randomization pass: small pointwise pace jitter
// plus a handful of accuracy-scaled "hesitation" dips, computed once when
// the runner is created (not recomputed per tick — that would be wasteful
// and would also make the dips inconsistent frame-to-frame). The finish
// time is preserved almost exactly; jitter only reshapes the middle of the
// journey, never the destination.

// Tiny seeded PRNG (mulberry32) — deterministic per (ghost, jitterSeed) pair
// so a replay is stable within one race (every tick reads consistent jitter)
// while still differing from the last time this same ghost was raced.
function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const JITTER_MAGNITUDE = 0.07;   // ±7% pointwise pace jitter
const MIN_DIPS = 1;
const MAX_DIPS_AT_WORST_ACCURACY = 6; // scaled toward this as accuracy → 0
const DIP_DEPTH = 0.35;           // dips knock pace down to 35% of normal, briefly

/**
 * createGhostRunner(ghost, { jitterSeed, todayTargetLength }) → { getPctAt(elapsedSeconds) → number }
 *
 * jitterSeed should differ each time the same ghost is raced (e.g.
 * Date.now() at race start, or an incrementing race counter) so the ghost
 * doesn't move identically every time you compete against it.
 *
 * ── todayTargetLength (time rescaling — fixes impossible finish orders) ──
 * Every race types a freshly-picked, differently-LENGTH passage. A ghost's
 * stored paceCurve is on a time axis calibrated to ITS OWN historical
 * passage's length — replaying that axis unscaled against today's passage
 * ignores how fast the ghost actually typed (chars/sec) and uses only how
 * long their own passage happened to take. That's how a genuinely faster
 * "Best" ghost (whose historical passage was simply long) could end up
 * projected to finish behind a slower "Last Recorded" ghost (whose
 * historical passage was short). Passing todayTargetLength lets us derive
 * each ghost's real completion rate (targetLength / elapsedSeconds) and
 * rescale its time axis so it takes the amount of time THAT rate implies
 * for today's actual passage length — same rate, fair comparison. If
 * todayTargetLength or ghost.targetLength is unavailable (e.g. a session
 * saved before this field existed), this degrades to the old unscaled
 * behavior for that ghost only, rather than breaking.
 */
export function createGhostRunner(ghost, { jitterSeed = Date.now(), todayTargetLength = null } = {}) {
  const rand = mulberry32(jitterSeed ^ hashString(ghost.id));

  // ── Time rescale ──────────────────────────────────────────────────────
  // Rate derived from wpm directly (wpm is already chars/5 per minute, so
  // charsPerSecond = wpm * 5 / 60) rather than targetLength/elapsedSeconds.
  // This is mathematically equivalent for sessions that DO have both
  // fields, and — critically — also works for normal-mode sessions being
  // used as ghost candidates, which never recorded a targetLength at all.
  const rawRate = ghost.wpm > 0 ? (ghost.wpm * 5) / 60 : null;
  const projectedSeconds = (rawRate && todayTargetLength)
    ? todayTargetLength / rawRate
    : (ghost.elapsedSeconds || 1);
  const timeScale = projectedSeconds / (ghost.elapsedSeconds || 1);

  // ── Keystrokes rescale ────────────────────────────────────────────────
  // ghost.keystrokes (raw historical correctChars+incorrectChars) belongs
  // to the ghost's OWN historical passage and isn't comparable to today's
  // passage length directly — it's an absolute count, not a rate. accuracy
  // IS a rate, so back-deriving "how many total keystrokes would it take
  // this ghost, at this accuracy, to cover today's character count" is the
  // correct transferable quantity. Falls back to the raw historical count
  // only if we don't have enough to project.
  const projectedKeystrokes = (todayTargetLength && ghost.accuracy > 0)
    ? Math.round(todayTargetLength / (ghost.accuracy / 100))
    : ghost.keystrokes;

  const sorted = [...ghost.paceCurve]
    .sort((a, b) => a.second - b.second)
    .map((p) => ({ second: p.second * timeScale, pctComplete: p.pctComplete }));
  const totalSeconds = projectedSeconds;

  // Precompute a fixed jitter offset per resample point, plus a handful of
  // hesitation-dip windows scaled by how error-prone this ghost's real
  // session was (lower accuracy → more/bigger dips). All computed once.
  const jitterByPoint = sorted.map(() => (rand() - 0.5) * 2 * JITTER_MAGNITUDE);

  const dipCount = Math.round(
    MIN_DIPS + (1 - ghost.accuracy / 100) * (MAX_DIPS_AT_WORST_ACCURACY - MIN_DIPS)
  );
  const dips = Array.from({ length: dipCount }, () => {
    const center = rand() * totalSeconds;
    const width = 0.2 + rand() * 0.2; // 200–400ms-equivalent, in "seconds" units
    return { center, width };
  });

  function dipFactorAt(second) {
    let factor = 1;
    for (const dip of dips) {
      const dist = Math.abs(second - dip.center);
      if (dist < dip.width) {
        const closeness = 1 - dist / dip.width; // 0..1
        factor = Math.min(factor, 1 - (1 - DIP_DEPTH) * closeness);
      }
    }
    return factor;
  }

  // ── Monotonic guard (fixes positions moving backwards) ──────────────────
  // Jitter/dip factors intentionally vary the ghost's local PACE — but
  // multiplying them straight onto the position value (pctComplete) means
  // a dip easing back toward 1 can make a LATER tick compute a smaller pct
  // than an EARLIER tick already returned: the dot visibly reverses. A real
  // racer can stall (pace → 0) but never actually lose ground. `lastPct`
  // clamps every call to be at least what was already returned, so a dip
  // now reads as "paused in place" rather than "walked backward" — the
  // intended feel, without needing a full time-warp reformulation.
  let lastPct = 0;

  /**
   * getPctAt(elapsedSeconds) → number (0–100)
   * Base pct from the (jittered) stored curve, further reduced during
   * hesitation-dip windows, then clamped to never go below the last value
   * this runner already returned. Clamped to [0, 100].
   */
  function getPctAt(elapsedSeconds) {
    if (sorted.length === 0) return lastPct;

    // Once real time has passed this ghost's own (rescaled) finish, it's
    // simply done — no further jitter should be able to hold it below 100
    // forever. Without this, a single negative jitter sample landing on
    // the curve's last resample index would multiply 100% down to (say)
    // 95% and keep it pinned there indefinitely, since the underlying
    // curve has nothing past its own last recorded point to interpolate
    // toward instead.
    if (elapsedSeconds >= totalSeconds) {
      lastPct = 100;
      return 100;
    }

    let basePct = interpolateAt(sorted, elapsedSeconds);

    // Apply pointwise jitter by finding the nearest resample index and
    // nudging basePct by that index's fixed jitter value — cheap and stable.
    const idx = Math.min(
      sorted.length - 1,
      Math.floor((elapsedSeconds / totalSeconds) * (sorted.length - 1))
    );
    basePct *= 1 + jitterByPoint[idx];
    basePct *= dipFactorAt(elapsedSeconds);

    const clamped = Math.max(lastPct, Math.min(100, Math.max(0, basePct)));
    lastPct = clamped;
    return clamped;
  }

  return { getPctAt, totalSeconds, projectedKeystrokes };
}

function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return h;
}
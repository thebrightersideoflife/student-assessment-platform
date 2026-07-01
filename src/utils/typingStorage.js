// src/utils/typingStorage.js
// Persistent performance storage for the typing practice feature.
//
// ── Per-difficulty record ────────────────────────────────────────────────
// Stats are split by difficulty mode (beginner / intermediate / normal),
// NOT by module. Raw typing speed and accuracy are a property of the
// person practising at a given difficulty — but "beginner" (lowercase, no
// punctuation) and "normal" (full punctuation, sentence case) measure
// meaningfully different skills. Blending them into one record made a
// beginner-mode PR look like a plateau-then-crash the moment someone tried
// Normal, which is misleading rather than motivating. Each mode gets its
// own bests, its own recent-session window, and its own trend.
//
// Storage key: `typing:perf:v1:<mode>`  (previously the single
// `typing:perf:v1:global` key, which is no longer read — records reset
// per mode the first time this version runs. That's intentional: a
// conflated global "best" wasn't a meaningful number to carry forward.)
//
// ── Tamper protection ───────────────────────────────────────────────────────
// Every record is stored alongside an HMAC-SHA-256 signature. On read,
// the signature is recomputed and compared; a mismatch silently discards
// the record. Stops casual console edits; a reader of this source can
// still forge a valid sig — acceptable for a study tool.
//
// ── Storage schema ──────────────────────────────────────────────────────────
// Key:   `typing:perf:v1:<mode>`
// Value: JSON string of { data: RecordData, sig: string }
//
// RecordData = {
//   bestWpm:        number,
//   recentWpm:      number[],   // ring buffer, last MAX_RECENT sessions
//   recentAccuracy: number[],
//   totalSessions:  number,
//   lastPlayed:     string,     // ISO date "YYYY-MM-DD"
// }

const STORAGE_VERSION = "v1";
export const TYPING_MODE_IDS = ["beginner", "intermediate", "normal"];
const recordKey = (mode) => `typing:perf:${STORAGE_VERSION}:${mode}`;
const MAX_RECENT      = 20;   // larger window makes sense for a per-mode record

function assertMode(mode) {
  if (!TYPING_MODE_IDS.includes(mode)) {
    throw new Error(`[typingStorage] Unknown mode "${mode}" — expected one of ${TYPING_MODE_IDS.join(", ")}`);
  }
}

// ── HMAC key ─────────────────────────────────────────────────────────────────
// Bump HMAC_SECRET if you change the RecordData schema in a breaking way —
// that will invalidate existing records so users start fresh.
const HMAC_SECRET = "tp-perf-hmac-key-2026-v3-per-mode";

// ── Crypto helpers ────────────────────────────────────────────────────────────

let _cryptoKey = null;

async function getCryptoKey() {
  if (_cryptoKey) return _cryptoKey;
  const enc     = new TextEncoder();
  const keyData = enc.encode(HMAC_SECRET);
  _cryptoKey    = await crypto.subtle.importKey(
    "raw", keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
  return _cryptoKey;
}

async function sign(payload) {
  const key    = await getCryptoKey();
  const enc    = new TextEncoder();
  const sigBuf = await crypto.subtle.sign("HMAC", key, enc.encode(payload));
  return Array.from(new Uint8Array(sigBuf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function verify(payload, hexSig) {
  try {
    const expected = await sign(payload);
    if (expected.length !== hexSig.length) return false;
    let diff = 0;
    for (let i = 0; i < expected.length; i++) {
      diff |= expected.charCodeAt(i) ^ hexSig.charCodeAt(i);
    }
    return diff === 0;
  } catch {
    return false;
  }
}

// ── Shared session-stat formulas ────────────────────────────────────────────
//
// computeSessionStats(res) is the single source of truth for every derived
// number shown on the results page AND stored for the report. TypingResults
// and TypingPracticePage both call this instead of each keeping their own
// copy of the wpm/accuracy/score/consistency formulas — that duplication is
// exactly what let `consistency` drift into a formatted string ("91%") in
// one place while everything downstream (charts, aggregates) expects a
// plain number. This function always returns numbers; formatting (adding
// the "%" for display) is left to the component that renders them.
//
// SessionStats = {
//   wpm:          number,
//   rawWpm:       number,
//   accuracy:     number,   // 0–100
//   score:        number,
//   consistency:  number | null,  // 0–100, null if not enough snapshot data
// }
export function computeSessionStats({ correctChars, incorrectChars, elapsedSeconds, snapshots = [] }) {
  const wpm    = Math.round((correctChars / 5) / (elapsedSeconds / 60));
  const rawWpm = Math.round(((correctChars + incorrectChars) / 5) / (elapsedSeconds / 60));
  const total  = correctChars + incorrectChars;
  const accuracy = total > 0 ? Math.round((correctChars / total) * 100) : 100;
  const score     = Math.round(wpm * (accuracy / 100) * 10);

  let consistency = null;
  if (snapshots.length >= 3) {
    const wpmVals = snapshots.map((s) => s.wpm).filter((v) => v > 0);
    if (wpmVals.length >= 2) {
      const mean = wpmVals.reduce((a, b) => a + b, 0) / wpmVals.length;
      const vari = wpmVals.reduce((a, b) => a + (b - mean) ** 2, 0) / wpmVals.length;
      consistency = Math.max(0, Math.round(100 - (Math.sqrt(vari) / Math.max(mean, 1)) * 100));
    }
  }

  return { wpm, rawWpm, accuracy, score, consistency };
}

// ── Read ──────────────────────────────────────────────────────────────────────

/**
 * loadRecord(mode) → RecordData | null
 *
 * Returns the typing record for the given difficulty mode, or null if:
 *   - nothing stored yet for that mode
 *   - JSON is malformed
 *   - signature doesn't match (tampered or HMAC_SECRET bumped)
 */
export async function loadRecord(mode) {
  assertMode(mode);
  try {
    const raw = localStorage.getItem(recordKey(mode));
    if (!raw) return null;

    const { data, sig } = JSON.parse(raw);
    if (!data || !sig) return null;

    const dataStr = JSON.stringify(data);
    const valid   = await verify(dataStr, sig);
    if (!valid) {
      console.warn(`[typingStorage] Signature mismatch — "${mode}" record discarded.`);
      localStorage.removeItem(recordKey(mode));
      return null;
    }

    return data;
  } catch {
    return null;
  }
}

/**
 * loadAllRecords() → { beginner: RecordData|null, intermediate: RecordData|null, normal: RecordData|null }
 * Convenience helper for screens (like the progress report) that need every mode at once.
 */
export async function loadAllRecords() {
  const entries = await Promise.all(TYPING_MODE_IDS.map(async (mode) => [mode, await loadRecord(mode)]));
  return Object.fromEntries(entries);
}

// ── Write ─────────────────────────────────────────────────────────────────────

/**
 * saveSession({ wpm, accuracy, mode }) → RecordData
 *
 * Merges a completed session into the record for that difficulty mode and
 * returns the updated record. Creates a new record if none exists yet for
 * that mode.
 */
export async function saveSession({ wpm, accuracy, mode }) {
  assertMode(mode);
  const existing = await loadRecord(mode);

  const prev = existing ?? {
    bestWpm:        0,
    recentWpm:      [],
    recentAccuracy: [],
    totalSessions:  0,
    lastPlayed:     null,
  };

  const recentWpm      = [...prev.recentWpm,      wpm].slice(-MAX_RECENT);
  const recentAccuracy = [...prev.recentAccuracy, accuracy].slice(-MAX_RECENT);

  const updated = {
    bestWpm:       Math.max(prev.bestWpm, wpm),
    recentWpm,
    recentAccuracy,
    totalSessions: prev.totalSessions + 1,
    lastPlayed:    new Date().toISOString().slice(0, 10),
  };

  const dataStr = JSON.stringify(updated);
  const sig     = await sign(dataStr);

  localStorage.setItem(recordKey(mode), JSON.stringify({ data: updated, sig }));

  return updated;
}

// ── Derived stats ─────────────────────────────────────────────────────────────

/**
 * deriveStats(record, currentWpm?) → DerivedStats | null
 *
 * DerivedStats = {
 *   bestWpm, averageWpm, averageAccuracy, recentMin,
 *   trend: "up" | "down" | "stable",
 *   totalSessions,
 *   isNewBest,
 * }
 */
export function deriveStats(record, currentWpm = null, durationSeconds = 60) {
  if (!record) return null;

  const { bestWpm, recentWpm, recentAccuracy, totalSessions } = record;

  const avg = (arr) =>
    arr.length === 0 ? 0 : Math.round(arr.reduce((a, b) => a + b, 0) / arr.length);

  const averageWpm      = avg(recentWpm);
  const averageAccuracy = avg(recentAccuracy);
  const recentMin       = recentWpm.length > 0 ? Math.min(...recentWpm) : 0;

  // Trend: compare the average of the most recent 5 sessions against the
  // 5 sessions before that. Requires at least 10 sessions total so both
  // halves of the comparison are fully populated — fewer than that and a
  // single outlier session can swing the label either way on short tests.
  // Returns null when there isn't enough data yet so the UI can hide the
  // label entirely rather than show a meaningless guess.
  //
  // Threshold scales with test duration because shorter tests have higher
  // session-to-session WPM variance — a single awkward passage on a 30s
  // test moves the number much more than the same passage on a 120s test:
  //   ≤ 30s  → ±6 WPM  (high noise)
  //   ≤ 60s  → ±4 WPM  (medium noise)
  //   > 60s  → ±3 WPM  (lower noise, longer sample per session)
  const TREND_WINDOW = 5; // sessions per half
  const TREND_MIN    = TREND_WINDOW * 2; // need both halves full

  const TREND_THRESHOLD =
    durationSeconds <= 30 ? 6 :
    durationSeconds <= 60 ? 4 : 3;

  let trend = null;
  if (recentWpm.length >= TREND_MIN) {
    const recent   = avg(recentWpm.slice(-TREND_WINDOW));
    const previous = avg(recentWpm.slice(-(TREND_WINDOW * 2), -TREND_WINDOW));
    if (previous > 0) {
      const delta = recent - previous;
      if (delta >  TREND_THRESHOLD) trend = "up";
      else if (delta < -TREND_THRESHOLD) trend = "down";
      else trend = "stable";
    }
  }

  const isNewBest = currentWpm !== null && currentWpm >= bestWpm;

  return { bestWpm, averageWpm, averageAccuracy, recentMin, trend, totalSessions, isNewBest };
}

/**
 * clearRecord(mode) — wipes the typing record for one difficulty mode.
 */
export async function clearRecord(mode) {
  assertMode(mode);
  localStorage.removeItem(recordKey(mode));
}

/**
 * clearAllRecords() — wipes the typing record for every difficulty mode.
 */
export async function clearAllRecords() {
  for (const mode of TYPING_MODE_IDS) localStorage.removeItem(recordKey(mode));
}
// ── Settings persistence ──────────────────────────────────────────────────────
// Stores the user's chosen duration, mode, and WPM goal(s) across page loads.
// No HMAC needed — these are preferences, not performance records.
//
// Key: `typing:settings:v1`
// Value: JSON string of TypingSettings
//
// TypingSettings = {
//   duration: { label: string, seconds: number } | null,
//   mode:     "beginner" | "intermediate" | "normal" | null,
//   goalWpm:  { beginner: number|null, intermediate: number|null, normal: number|null },
//   goalTime: number,   // minutes, default 15 — shared across modes; it's a
//                       // "time spent practising today" goal, not a speed goal,
//                       // so it doesn't need to be split per difficulty.
//   goalSet:  boolean,  // true once the user has been through the goal modal
//                       // at least once — gates the auto-open-on-first-visit
//                       // prompt in TypingPracticePage. Was previously written
//                       // by saveSettings() but dropped by loadSettings()'s
//                       // return whitelist, so the prompt reappeared on every
//                       // visit — fixed by including it below.
// }
//
// ── goalWpm migration ────────────────────────────────────────────────────
// goalWpm used to be a single number shared across every difficulty. On
// first load under this version, a legacy number is fanned out into all
// three modes so nobody's existing goal silently vanishes — they can then
// diverge it per mode going forward.

const SETTINGS_KEY = "typing:settings:v1";

export const DEFAULT_SETTINGS = {
  duration: null,
  mode:     null,
  goalWpm:  { beginner: 35, intermediate: 35, normal: 35 },
  goalTime: 15,
  goalSet:  false,
};

function normaliseGoalWpm(goalWpm) {
  if (typeof goalWpm === "number") {
    // Legacy single-value goal — seed every mode with it.
    return { beginner: goalWpm, intermediate: goalWpm, normal: goalWpm };
  }
  if (goalWpm && typeof goalWpm === "object") {
    return { ...DEFAULT_SETTINGS.goalWpm, ...goalWpm };
  }
  return { ...DEFAULT_SETTINGS.goalWpm };
}

/**
 * loadSettings() → TypingSettings
 * Returns persisted settings, falling back to DEFAULT_SETTINGS for any missing field.
 */
export function loadSettings() {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return { ...DEFAULT_SETTINGS, goalWpm: { ...DEFAULT_SETTINGS.goalWpm } };
    const parsed = JSON.parse(raw);
    return {
      duration: parsed.duration ?? DEFAULT_SETTINGS.duration,
      mode:     parsed.mode     ?? DEFAULT_SETTINGS.mode,
      goalWpm:  normaliseGoalWpm(parsed.goalWpm),
      goalTime: parsed.goalTime ?? DEFAULT_SETTINGS.goalTime,
      goalSet:  parsed.goalSet  ?? DEFAULT_SETTINGS.goalSet,
    };
  } catch {
    return { ...DEFAULT_SETTINGS, goalWpm: { ...DEFAULT_SETTINGS.goalWpm } };
  }
}

/**
 * saveSettings(partial) — merges partial into stored settings and writes back.
 * Pass only the fields you want to update. `partial.goalWpm`, if present, is
 * itself merged key-by-key into the existing per-mode goal object rather than
 * replacing it wholesale — so `saveSettings({ goalWpm: { normal: 60 } })`
 * updates only the Normal goal and leaves Beginner/Intermediate untouched.
 */
export function saveSettings(partial) {
  try {
    const current = loadSettings();
    const updated = { ...current, ...partial };
    if (partial.goalWpm && typeof partial.goalWpm === "object") {
      updated.goalWpm = { ...current.goalWpm, ...partial.goalWpm };
    }
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return loadSettings();
  }
}

// ── Session detail log (for the progress report) ───────────────────────────
//
// A richer, per-session record used only by the typing progress report's
// charts. The existing `typing:perf:v1:global` record above is left
// completely untouched — it still backs the results-page stats and trend.
// This is separate, analytical data: no HMAC, since there's nothing here
// worth tampering with and signature overhead isn't justified.
//
// Storage key: `typing:sessions:v1`
// Value: JSON array of SessionDetail, capped at MAX_SESSIONS entries
// (oldest dropped first — a simple ring buffer via Array.slice).
//
// SessionDetail = {
//   ts:             number,   // Date.now()
//   date:           string,   // "YYYY-MM-DD", for grouping by day
//   wpm:            number,
//   rawWpm:         number,
//   accuracy:       number,   // 0–100
//   score:          number,
//   consistency:    number | null,  // 0–100
//   duration:       number,   // seconds (the test's timer setting)
//   mode:           "beginner" | "intermediate" | "normal",
//   moduleId:       string,
//   correctChars:   number,
//   incorrectChars: number,
//   charErrors:     Record<string, number>,
//   snapshots:      Array<{ second, wpm, burst, errors }>,  // for burst sparkline
// }

const SESSIONS_KEY = "typing:sessions:v1";
const MAX_SESSIONS = 50;

/**
 * saveSessionDetail(detail) — appends a record to the capped session log,
 * advances the dedicated uncapped session counter, and checks whether this
 * session's wpm just cleared the currently-active goal period (closing it
 * out as "reached" if so). Returns the post-increment session count, in
 * case the caller wants it (e.g. for its own goal-aware messaging).
 *
 * Silently no-ops on storage failure (e.g. quota exceeded) rather than
 * throwing — losing one detail record should never break the typing flow.
 */
export function saveSessionDetail(detail) {
  let sessionCount = getSessionCount();
  try {
    const existing = loadSessions();
    const updated  = [...existing, detail].slice(-MAX_SESSIONS);
    localStorage.setItem(SESSIONS_KEY, JSON.stringify(updated));

    sessionCount = incrementSessionCount();
    checkGoalReached(detail.mode, detail.wpm, sessionCount);
  } catch (err) {
    console.warn("[typingStorage] Failed to save session detail:", err);
  }
  return sessionCount;
}

/**
 * loadSessions() → SessionDetail[]
 * Returns all stored session details, oldest-first. Never throws.
 */
export function loadSessions() {
  try {
    const raw = localStorage.getItem(SESSIONS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * clearSessions() — wipes the session detail log.
 */
export function clearSessions() {
  localStorage.removeItem(SESSIONS_KEY);
}

/**
 * aggregateCharErrors(sessions) → { char, count }[]
 *
 * Reduces every session's charErrors map into one combined tally,
 * sorted descending by count. Used for the "Struggling Characters" chart.
 */
export function aggregateCharErrors(sessions) {
  const totals = {};
  for (const session of sessions) {
    const errors = session.charErrors;
    if (!errors) continue;
    for (const [char, count] of Object.entries(errors)) {
      totals[char] = (totals[char] || 0) + count;
    }
  }
  return Object.entries(totals)
    .map(([char, count]) => ({ char, count }))
    .sort((a, b) => b.count - a.count);
}

// ── Goal history ─────────────────────────────────────────────────────────
//
// Tracks every WPM-goal period the user has set, and how long (in sessions)
// it took to reach each one — or whether it was abandoned (changed before
// being reached). This is intentionally a separate, append-mostly log from
// the live `goalWpm` field in settings: that field only ever holds the
// *current* goal, with no memory of what came before or how it went.
//
// Session counting here uses a DEDICATED uncapped counter
// (`typing:sessionCount:v1`), incremented by saveSessionDetail itself,
// rather than the global record's `totalSessions` (see saveSession above).
// Two reasons:
//   1. The session detail log (typing:sessions:v1) is capped at
//      MAX_SESSIONS and rolls old entries off, so loadSessions().length
//      isn't a stable basis for "sessions to reach a goal" once the ring
//      buffer wraps past 50.
//   2. The global record's totalSessions is incremented by saveSession(),
//      which is called from TypingResults.jsx as an async side effect on
//      mount — NOT synchronously from the same place saveSessionDetail is
//      called in TypingPracticePage.jsx. Relying on it here would risk
//      reading a stale pre-increment value due to that ordering gap.
// A dedicated counter, incremented in the same synchronous call as
// saveSessionDetail, has neither problem.

const SESSION_COUNT_KEY = "typing:sessionCount:v1";

function getSessionCount() {
  try {
    const raw = localStorage.getItem(SESSION_COUNT_KEY);
    const n = raw ? parseInt(raw, 10) : 0;
    return Number.isFinite(n) ? n : 0;
  } catch {
    return 0;
  }
}

function incrementSessionCount() {
  const next = getSessionCount() + 1;
  try {
    localStorage.setItem(SESSION_COUNT_KEY, String(next));
  } catch (err) {
    console.warn("[typingStorage] Failed to persist session count:", err);
  }
  return next;
}

// Storage key: `typing:goalHistory:v1`
// Value: JSON array of GoalPeriod, oldest first, uncapped (this is a small,
// slow-growing list — one entry per goal change, not per session — so
// there's no realistic need to cap it the way the session log is capped).
//
// GoalPeriod = {
//   mode:               "beginner" | "intermediate" | "normal",
//   goalWpm:           number,
//   setAt:              number,        // Date.now() when this goal became active
//   setAtSessionIdx:    number,        // session count at that moment
//   reachedAt:          number | null, // Date.now() of the session that first hit it
//   reachedSessionIdx:  number | null,
//   sessionsToReach:    number | null, // reachedSessionIdx - setAtSessionIdx
//   status:             "active" | "reached" | "abandoned",
// }
//
// "abandoned" means the goal was changed to a new value before ever being
// reached — still useful signal (e.g. someone set an unrealistic goal and
// walked it back), distinct from "reached".

const GOAL_HISTORY_KEY = "typing:goalHistory:v1";

function loadGoalHistoryRaw() {
  try {
    const raw = localStorage.getItem(GOAL_HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveGoalHistoryRaw(history) {
  try {
    localStorage.setItem(GOAL_HISTORY_KEY, JSON.stringify(history));
  } catch (err) {
    console.warn("[typingStorage] Failed to save goal history:", err);
  }
}

/**
 * loadGoalHistory() → GoalPeriod[]
 * Returns the full goal history, oldest first. Never throws.
 */
export function loadGoalHistory() {
  return loadGoalHistoryRaw();
}

/**
 * recordGoalChange(mode, newGoalWpm) — call whenever the user's goalWpm
 * setting is being changed for a given difficulty mode (from
 * handleSettingsSave or the raise-goal prompt), BEFORE the new value is
 * persisted to settings.
 *
 * Closes out the previously-active period FOR THAT MODE as "abandoned" if
 * one exists and was never reached, then opens a new "active" period for
 * newGoalWpm under that same mode. No-ops if newGoalWpm matches the
 * currently-active goal for that mode exactly (so saving the settings modal
 * without actually changing the goal doesn't create a spurious duplicate
 * period). Periods belonging to other modes are left untouched — each mode
 * has its own independent goal timeline, same as its own record and session log.
 */
export function recordGoalChange(mode, newGoalWpm) {
  if (newGoalWpm == null) return;
  assertMode(mode);

  const history = loadGoalHistoryRaw();
  const active  = history.find((p) => p.status === "active" && p.mode === mode);

  if (active && active.goalWpm === newGoalWpm) return; // no real change

  if (active) {
    active.status = "abandoned";
  }

  history.push({
    mode,
    goalWpm:           newGoalWpm,
    setAt:             Date.now(),
    setAtSessionIdx:   getSessionCount(),
    reachedAt:         null,
    reachedSessionIdx: null,
    sessionsToReach:   null,
    status:            "active",
  });

  saveGoalHistoryRaw(history);
}

/**
 * clearGoalHistory() — wipes the goal history log.
 */
export function clearGoalHistory() {
  localStorage.removeItem(GOAL_HISTORY_KEY);
}

/**
 * checkGoalReached(mode, sessionWpm, sessionCount) — called internally by
 * saveSessionDetail right after the session counter is incremented. If
 * there's an active goal period FOR THAT MODE and this session's wpm clears
 * it, closes the period out as "reached" with sessionsToReach computed.
 * No-ops if there's no active goal for that mode, or it isn't yet reached.
 * Not exported — this is always derived from a session being saved, never
 * called standalone.
 */
function checkGoalReached(mode, sessionWpm, sessionCount) {
  const history = loadGoalHistoryRaw();
  const active  = history.find((p) => p.status === "active" && p.mode === mode);
  if (!active) return;
  if (sessionWpm < active.goalWpm) return;

  active.status            = "reached";
  active.reachedAt         = Date.now();
  active.reachedSessionIdx = sessionCount;
  active.sessionsToReach   = sessionCount - active.setAtSessionIdx;

  saveGoalHistoryRaw(history);
}

// ── Streaks ──────────────────────────────────────────────────────────────
//
// Pure derived data — no storage of its own. Entirely reconstructed from
// the `date` field already present on every SessionDetail, so there's
// nothing here that can drift out of sync with the session log; recompute
// on every report load instead of caching.

/**
 * computeStreaks(sessions) → { current, longest, practicedToday }
 *
 * current  — consecutive days up to and including the most recent
 *             practice day, counting backward from today. If the most
 *             recent session isn't today or yesterday, current is 0
 *             (the streak has already lapsed).
 * longest  — the longest consecutive-day run anywhere in the log.
 * practicedToday — whether today's date appears in the session log.
 */
export function computeStreaks(sessions) {
  if (sessions.length === 0) return { current: 0, longest: 0, practicedToday: false };

  const uniqueDates = [...new Set(sessions.map((s) => s.date))].sort();
  const dayMs = 24 * 60 * 60 * 1000;

  const toUTCDay = (iso) => Date.parse(`${iso}T00:00:00Z`) / dayMs;

  // Longest run anywhere in the log
  let longest = 1;
  let run     = 1;
  for (let i = 1; i < uniqueDates.length; i++) {
    const gap = toUTCDay(uniqueDates[i]) - toUTCDay(uniqueDates[i - 1]);
    run = gap === 1 ? run + 1 : 1;
    longest = Math.max(longest, run);
  }

  // Current streak: walk backward from the most recent practice day only
  // if that day is today or yesterday — otherwise the streak has lapsed.
  const todayISO = new Date().toISOString().slice(0, 10);
  const todayDay = toUTCDay(todayISO);
  const lastDay  = toUTCDay(uniqueDates[uniqueDates.length - 1]);

  let current = 0;
  if (todayDay - lastDay <= 1) {
    current = 1;
    for (let i = uniqueDates.length - 1; i > 0; i--) {
      const gap = toUTCDay(uniqueDates[i]) - toUTCDay(uniqueDates[i - 1]);
      if (gap === 1) current += 1;
      else break;
    }
  }

  return { current, longest, practicedToday: lastDay === todayDay };
}
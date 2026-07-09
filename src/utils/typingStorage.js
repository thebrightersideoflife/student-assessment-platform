// src/utils/typingStorage.js
// Persistent performance storage for the typing practice feature.
//
// ── One session log, one source of truth ─────────────────────────────────
// There used to be two independent stores: a per-mode "record" summary
// (`typing:perf:v1:<mode>` — bestWpm + a 20-session ring buffer + an
// uncapped totalSessions counter, written by TypingResults on mount) and
// this session detail log (`typing:sessions:v1`, written synchronously by
// TypingPracticePage.handleFinish). TypingResults read its stats from the
// former; TypingReportPage read from the latter. They drifted apart —
// different averaging windows, different session counts, and a save-order
// gap (the record was written asynchronously, after the results screen
// had already mounted) meant a session could land in one store and not
// the other. The record store is gone. Everything — results screen,
// progress report, "new best" detection — now derives from this one
// session log via deriveStats() below, so there's nothing left to
// disagree with itself.
//
// Stats are still split by difficulty mode (beginner / intermediate /
// normal), NOT by module: "beginner" (lowercase, no punctuation) and
// "normal" (full punctuation, sentence case) measure meaningfully
// different skills, so every stat a caller computes here should be over a
// single mode's sessions, never blended across modes.
//
// ── Storage schema ──────────────────────────────────────────────────────
// Key:   `typing:sessions:v1`
// Value: JSON array of SessionDetail (see below), oldest-first, capped at
// MAX_SESSIONS_PER_MODE entries *per mode* (older sessions of that same
// mode are dropped first — see capSessionsPerMode()). Note this cap is
// per-mode, not shared: previously all three modes shared one 50-entry
// cap, so practising two modes could silently evict a third mode's
// history far sooner than its own "totalSessions" counter suggested.

export const TYPING_MODE_IDS = ["beginner", "intermediate", "normal"];

function assertMode(mode) {
  if (!TYPING_MODE_IDS.includes(mode)) {
    throw new Error(`[typingStorage] Unknown mode "${mode}" — expected one of ${TYPING_MODE_IDS.join(", ")}`);
  }
}

// ── Integrity guard (NOT real security) ────────────────────────────────
// Everything in this file lives in localStorage — fully readable and
// editable by anyone using the app on their own machine, via devtools'
// "Edit value" or by pasting in someone else's exported JSON. There is no
// way to keep a real secret in a client-only bundle: any "signing key"
// embedded here ships in the JS that anyone can read, so a motivated
// person can always recompute a valid checksum by hand once they've seen
// the source. This is NOT cryptographic protection and must never be
// treated as one.
//
// What it DOES do: stop the far more common case — a casual edit of one
// field's value in devtools, or a naive copy-paste of a friend's raw JSON
// — from silently "just working" the next time the app reads this data.
// That's a real deterrent even though it's not a real guarantee.
//
// If a genuine anti-cheat requirement ever shows up (e.g. a public
// leaderboard), the only durable fix is moving session validation to a
// server the client can't edit — this is a stopgap for a still-fully-
// client-side app, not a substitute for that.
const INTEGRITY_SALT = "tr-typing-integrity-v1"; // bump this if the schema changes meaningfully — invalidates all previously-stored guarded data, which is fine, it just falls back to empty

function checksum(str) {
  // djb2 — fast, dependency-free, good distribution for tamper
  // *detection*. Not collision-resistant; not a cryptographic hash; not
  // trying to be one. See the block comment above.
  let hash = 5381;
  const salted = INTEGRITY_SALT + str;
  for (let i = 0; i < salted.length; i++) {
    hash = ((hash << 5) + hash + salted.charCodeAt(i)) | 0;
  }
  return hash.toString(36);
}

/**
 * writeGuarded(key, payload) — JSON-stringifies payload, wraps it with a
 * checksum, and writes the envelope to localStorage.
 */
function writeGuarded(key, payload) {
  const json = JSON.stringify(payload);
  localStorage.setItem(key, JSON.stringify({ payload: json, sum: checksum(json) }));
}

/**
 * readGuarded(key) → parsed payload | null
 *
 * Verifies the checksum before trusting the payload. A legacy bare
 * array/object (written before this guard existed) is accepted once,
 * un-checked — there's real user history in there worth keeping, and it's
 * the ONLY shape allowed to skip verification. Anything shaped like a
 * guarded envelope but with a mismatched checksum is treated as
 * tampered/corrupted and dropped (logged, not thrown) rather than trusted.
 */
function readGuarded(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const outer = JSON.parse(raw);

    if (Array.isArray(outer) || (outer && typeof outer === "object" && !("sum" in outer))) {
      return outer; // legacy pre-guard shape — accepted once, unverified
    }
    if (!outer || typeof outer.payload !== "string" || checksum(outer.payload) !== outer.sum) {
      console.warn(`[typingStorage] "${key}" failed its integrity check — treating as tampered or corrupted and ignoring it.`);
      return null;
    }
    return JSON.parse(outer.payload);
  } catch {
    return null;
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

// ── Derived stats ─────────────────────────────────────────────────────────────

/**
 * deriveStats(modeSessions, currentWpm?, durationSeconds?) → DerivedStats | null
 *
 * modeSessions must already be filtered to a single difficulty mode and
 * oldest-first (exactly what `loadSessions().filter(s => s.mode === mode)`
 * gives you) — this is the SAME array TypingReportPage / TypingProgressReport
 * use to draw their charts, so anything computed here will always agree
 * with what the report shows.
 *
 * DerivedStats = {
 *   bestWpm, averageWpm, averageAccuracy, recentMin,
 *   trend: "up" | "down" | "stable" | null,
 *   totalSessions,
 *   isNewBest,
 * }
 */
export function deriveStats(modeSessions, currentWpm = null, durationSeconds = 60) {
  if (!modeSessions || modeSessions.length === 0) return null;

  const wpmVals = modeSessions.map((s) => s.wpm);
  const accVals = modeSessions.map((s) => s.accuracy);

  const avg = (arr) =>
    arr.length === 0 ? 0 : Math.round(arr.reduce((a, b) => a + b, 0) / arr.length);

  const bestWpm          = Math.max(...wpmVals);
  const averageWpm       = avg(wpmVals);
  const averageAccuracy  = avg(accVals);

  const RECENT_WINDOW  = 20;
  const recentWpmVals  = wpmVals.slice(-RECENT_WINDOW);
  const recentMin      = recentWpmVals.length > 0 ? Math.min(...recentWpmVals) : 0;

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
  if (wpmVals.length >= TREND_MIN) {
    const recent   = avg(wpmVals.slice(-TREND_WINDOW));
    const previous = avg(wpmVals.slice(-(TREND_WINDOW * 2), -TREND_WINDOW));
    if (previous > 0) {
      const delta = recent - previous;
      if (delta >  TREND_THRESHOLD) trend = "up";
      else if (delta < -TREND_THRESHOLD) trend = "down";
      else trend = "stable";
    }
  }

  // isNewBest compares the just-finished session's wpm against the best of
  // everything BEFORE it (not including it) — modeSessions is expected to
  // already contain the current session as its last entry (saveSessionDetail
  // runs synchronously before the results screen mounts), so we exclude that
  // last entry to get the "prior" best to beat.
  const priorWpmVals = wpmVals.slice(0, -1);
  const priorBest    = priorWpmVals.length > 0 ? Math.max(...priorWpmVals) : 0;
  const isNewBest    = currentWpm !== null && currentWpm >= priorBest;

  return {
    bestWpm,
    averageWpm,
    averageAccuracy,
    recentMin,
    trend,
    totalSessions: modeSessions.length,
    isNewBest,
  };
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

// ── Session detail log ───────────────────────────────────────────────────
//
// The single record of every completed session. Backs both the results
// screen's stats (via deriveStats, above) and the progress report's
// charts. No HMAC: there's nothing here worth tampering with and signature
// overhead isn't justified for a study tool.
//
// Storage key: `typing:sessions:v1`
// Value: JSON array of SessionDetail, oldest-first, capped at
// MAX_SESSIONS_PER_MODE entries *per mode* (oldest of that mode dropped
// first — see capSessionsPerMode()).
//
// SessionDetail = {
//   ts:             number,   // Date.now()
//   date:           string,   // "YYYY-MM-DD", for grouping by day
//   wpm:            number,
//   rawWpm:         number,
//   accuracy:       number,   // 0–100
//   score:          number,
//   consistency:    number | null,  // 0–100
//   duration:       number,   // seconds — the timed test's setting, or the
//                             // actual elapsed time for a Unit Typing session
//   mode:           "beginner" | "intermediate" | "normal",
//   testType:       "timed" | "unit",  // optional — absent on older records,
//                             // treated as "timed" wherever it's read
//   moduleId:       string,
//   correctChars:   number,
//   incorrectChars: number,
//   charErrors:     Record<string, number>,
//   snapshots:      Array<{ second, wpm, burst, errors }>,  // for burst sparkline
// }

const SESSIONS_KEY = "typing:sessions:v1";
const MAX_SESSIONS_PER_MODE = 50;

/**
 * capSessionsPerMode(sessions) → SessionDetail[]
 *
 * Keeps at most MAX_SESSIONS_PER_MODE most-recent entries FOR EACH MODE,
 * dropping older overflow of that same mode, and returns the result back
 * in oldest-first order (required by deriveStats' trend calc and the
 * report's charts, which both assume chronological order).
 *
 * This replaces a single shared 50-entry cap across all three modes,
 * which meant practising two modes could quietly evict a third mode's
 * history long before that mode's own session count reached 50.
 */
function capSessionsPerMode(sessions) {
  const countByMode = {};
  const kept = [];
  for (let i = sessions.length - 1; i >= 0; i--) {
    const s = sessions[i];
    const count = countByMode[s.mode] || 0;
    if (count < MAX_SESSIONS_PER_MODE) {
      kept.push(s);
      countByMode[s.mode] = count + 1;
    }
  }
  return kept.reverse();
}

// ── Session validity guard ──────────────────────────────────────────────
// Rejects sessions that couldn't represent real typing — near-zero input,
// near-zero duration, or an implausible wpm that could only come from a
// degenerate save (e.g. clicking "finish" with nothing typed, or ending a
// test a fraction of a second after starting). These would otherwise
// silently enter a module+mode's candidate pool and corrupt Competition's
// best/average/lastRecorded ghosts — a synthetic flat curve built from a
// near-instant, near-empty session doesn't fail loudly, it just produces
// wrong-looking ghost behavior much later, in a totally different screen.
//
// Returns a reason string (not just true/false) so the results screen can
// tell the user WHY nothing was saved, rather than the rejection being a
// silent console.warn nobody ever sees.
const MIN_VALID_DURATION_SECONDS = 10;
const MIN_VALID_CHARS_TYPED = 30;
const MAX_PLAUSIBLE_WPM = 250;
const CLOCK_SKEW_TOLERANCE_MS = 5 * 60 * 1000; // 5 minutes — generous for real clock drift, not for backdating/gaming streaks

function validateSessionDetail(detail) {
  const totalChars = (detail.correctChars || 0) + (detail.incorrectChars || 0);
  // Deliberately vague on duration/chars — naming the exact thresholds
  // would just teach someone the minimum effort needed to game a save,
  // which defeats the point of having a validity floor at all.
  if (!detail.duration || detail.duration < MIN_VALID_DURATION_SECONDS) {
    return "This attempt was too short to save.";
  }
  if (totalChars < MIN_VALID_CHARS_TYPED) {
    return "Not enough was typed to save this attempt.";
  }
  // WPM is fine to be specific about — it's a plausibility check on speed,
  // not a "how little can I get away with" threshold, so telling the user
  // what's realistic here doesn't help anyone cheat the floor.
  if (detail.wpm > MAX_PLAUSIBLE_WPM) {
    return `A speed of ${detail.wpm} wpm isn't currently considered plausible (max ${MAX_PLAUSIBLE_WPM}), so this attempt wasn't saved.`;
  }
  // A timestamp meaningfully in the future can only come from a manually
  // edited/injected record (or a wildly wrong system clock) — either way,
  // trusting it would let streaks/history be backdated or padded.
  if (detail.ts && detail.ts > Date.now() + CLOCK_SKEW_TOLERANCE_MS) {
    return "This attempt's timestamp isn't valid, so it wasn't saved.";
  }
  return null; // valid
}

/**
 * saveSessionDetail(detail) → { saved: boolean, sessionCount: number, reason?: string }
 *
 * Appends a record to the per-mode-capped session log, advances the
 * dedicated uncapped session counter, and checks whether this session's
 * wpm just cleared the currently-active goal period — but only if the
 * session passes validateSessionDetail. Rejected sessions are never
 * persisted, never counted, and never checked against goals; `reason` is
 * populated so the caller can surface why to the user.
 */
export function saveSessionDetail(detail) {
  const rejectionReason = validateSessionDetail(detail);
  if (rejectionReason) {
    console.warn("[typingStorage] Rejected implausible session:", detail, rejectionReason);
    return { saved: false, sessionCount: getSessionCount(), reason: rejectionReason };
  }

  let sessionCount = getSessionCount();
  try {
    const existing = loadSessions();
    const updated  = capSessionsPerMode([...existing, detail]);
    writeGuarded(SESSIONS_KEY, updated);

    sessionCount = incrementSessionCount();
    checkGoalReached(detail.mode, detail.wpm, sessionCount);
  } catch (err) {
    console.warn("[typingStorage] Failed to save session detail:", err);
    return { saved: false, sessionCount, reason: "Couldn't save this attempt due to a storage error." };
  }
  return { saved: true, sessionCount };
}

/**
 * loadSessions() → SessionDetail[]
 * Returns all stored session details, oldest-first. Never throws.
 *
 * Two layers of trust before a stored record reaches the app: the
 * checksum envelope (readGuarded — catches tampering with the raw
 * localStorage value) and a re-run of validateSessionDetail on every
 * entry (catches anything that ended up in the array without ever going
 * through saveSessionDetail — e.g. a directly-injected record that
 * happens to be wrapped in a valid-looking envelope). Both are "raise the
 * bar", not "airtight" — see the integrity-guard comment above.
 */
export function loadSessions() {
  const parsed = readGuarded(SESSIONS_KEY);
  if (!Array.isArray(parsed)) return [];
  return parsed.filter((s) => s && typeof s === "object" && !validateSessionDetail(s));
}

/**
 * clearSessions() — wipes the session detail log.
 */
export function clearSessions() {
  localStorage.removeItem(SESSIONS_KEY);
}

/**
 * clearSessionsForMode(mode) — removes only this difficulty's practice
 * sessions from the log, leaving other modes' history untouched. Used by
 * the progress report's "clear history for this difficulty" action —
 * intentionally scoped, since beginner/intermediate/normal are meaningfully
 * different skills and a user asking to reset one shouldn't lose the
 * others. Rewrites through writeGuarded (not removeItem) so the remaining
 * modes' entries stay covered by the integrity checksum.
 */
export function clearSessionsForMode(mode) {
  assertMode(mode);
  const remaining = loadSessions().filter((s) => s.mode !== mode);
  writeGuarded(SESSIONS_KEY, remaining);
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
// rather than deriveStats' `totalSessions` (which is just modeSessions.length).
// The session detail log (typing:sessions:v1) is capped per mode at
// MAX_SESSIONS_PER_MODE and rolls old entries off, so loadSessions().length
// isn't a stable basis for "sessions to reach a goal" once a mode's window
// wraps past that cap. A dedicated, never-capped counter avoids that.

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

// ── Competition session log ────────────────────────────────────────────────
//
// Separate from typing:sessions:v1 on purpose: Competition's 2-line-paginated
// engine has a different rhythm than Timed/Unit, so blending its history into
// the same log would corrupt deriveStats' trend/best calculations for those
// modes. This log is also grouped by (moduleId, mode) rather than just mode —
// ghosts only make sense racing the same module's content at the same
// difficulty, unlike the report page's per-mode-only charts.
//
// Storage key: `typing:competitionSessions:v1`
// Value: JSON array of CompetitionSessionDetail, oldest-first, capped at
// MAX_COMPETITION_SESSIONS_PER_GROUP entries per (moduleId, mode) pair.
//
// CompetitionSessionDetail = {
//   ...same fields as SessionDetail (ts, date, wpm, rawWpm, accuracy, score,
//   consistency, duration, mode, moduleId, correctChars, incorrectChars,
//   charErrors, snapshots),
//   targetLength: number,                          // passage char count
//   paceCurve:    Array<{ second: number, pctComplete: number }>,
//                                                    // 0–100, engine-tracked
// }
export const COMPETITION_UNLOCK_THRESHOLD = 3;
const COMPETITION_SESSIONS_KEY = "typing:competitionSessions:v1";
const MAX_COMPETITION_SESSIONS_PER_GROUP = 50;
function groupKey(moduleId, mode) {
  return `${moduleId}::${mode}`;
}
/**
 * capCompetitionSessions(sessions) → CompetitionSessionDetail[]
 * Same shape as capSessionsPerMode, but keyed by (moduleId, mode) instead of
 * mode alone — practising Competition on one module must never evict another
 * module's ghost history.
 */
function capCompetitionSessions(sessions) {
  const countByGroup = {};
  const kept = [];
  for (let i = sessions.length - 1; i >= 0; i--) {
    const s = sessions[i];
    const key = groupKey(s.moduleId, s.mode);
    const count = countByGroup[key] || 0;
    if (count < MAX_COMPETITION_SESSIONS_PER_GROUP) {
      kept.push(s);
      countByGroup[key] = count + 1;
    }
  }
  return kept.reverse();
}
/**
 * loadCompetitionSessions() → CompetitionSessionDetail[]
 * All groups, oldest-first. Never throws.
 * Same two-layer trust model as loadSessions() — see that function's
 * comment for why both the checksum envelope AND a re-run of
 * validateSessionDetail matter here.
 */
export function loadCompetitionSessions() {
  const parsed = readGuarded(COMPETITION_SESSIONS_KEY);
  if (!Array.isArray(parsed)) return [];
  return parsed.filter((s) => s && typeof s === "object" && !validateSessionDetail(s));
}
/**
 * loadCompetitionSessionsFor(moduleId, mode) → CompetitionSessionDetail[]
 * Convenience filter — oldest-first, exactly one (module, mode) group.
 */
export function loadCompetitionSessionsFor(moduleId, mode) {
  return loadCompetitionSessions().filter(
    (s) => s.moduleId === moduleId && s.mode === mode
  );
}
/**
 * saveCompetitionSessionDetail(detail) → { saved: boolean, reason?: string }
 *
 * Appends to the per-group-capped competition log. Does NOT touch
 * typing:sessions:v1, the session counter, or goal history — Competition
 * mode has its own unlock mechanic (below) instead of WPM goals.
 */
export function saveCompetitionSessionDetail(detail) {
  const rejectionReason = validateSessionDetail(detail);
  if (rejectionReason) {
    console.warn("[typingStorage] Rejected implausible competition session:", detail, rejectionReason);
    return { saved: false, reason: rejectionReason };
  }

  try {
    const existing = loadCompetitionSessions();
    const updated  = capCompetitionSessions([...existing, detail]);
    writeGuarded(COMPETITION_SESSIONS_KEY, updated);
  } catch (err) {
    console.warn("[typingStorage] Failed to save competition session detail:", err);
    return { saved: false, reason: "Couldn't save this attempt due to a storage error." };
  }
  return { saved: true };
}
/**
 * getCompetitionUnlockState(moduleId, mode) → { unlocked, attemptsRecorded, attemptsNeeded }
 *
 * Counts BOTH normal typing-practice attempts (typing:sessions:v1) AND
 * dedicated Competition attempts (typing:competitionSessions:v1) for this
 * (moduleId, mode) pair toward the unlock threshold — practising a module
 * normally builds toward Competition too, not just racing itself. See
 * selectGhosts in typingRace.js for how ghosts are actually built once
 * unlocked: it draws from this same combined pool, not competition
 * sessions alone.
 */
export function getCompetitionUnlockState(moduleId, mode) {
  const competitionCount = loadCompetitionSessionsFor(moduleId, mode).length;
  const normalCount = loadSessions().filter(
    (s) => s.moduleId === moduleId && s.mode === mode
  ).length;
  const attemptsRecorded = competitionCount + normalCount;
  return {
    unlocked: attemptsRecorded >= COMPETITION_UNLOCK_THRESHOLD,
    attemptsRecorded,
    attemptsNeeded: Math.max(0, COMPETITION_UNLOCK_THRESHOLD - attemptsRecorded),
  };
}

/**
 * getAttemptsSinceBestFaced(moduleId, mode) → number | null
 *
 * Walks this (moduleId, mode) pair's Competition history, newest-first,
 * counting how many consecutive most-recent attempts did NOT race against
 * "Best" (facedBest !== true) — stopping at the first attempt that DID, or
 * at the end of history. Returns null specifically when there's no
 * Competition history at all yet for this pair — callers treat that as the
 * "first-ever attempt" case and handle it separately (Best is always
 * included on a genuine first attempt, unconditionally — see
 * useCompetitionFlow.js's decideRoster).
 *
 * `facedBest` is stored directly on each CompetitionSessionDetail rather
 * than in a separate counter store, on purpose — this file already
 * documents (see the header comment) that a prior design with multiple
 * drifting stores was deliberately collapsed into one log with everything
 * else derived on read; this follows that same pattern rather than adding
 * a new store. A record saved before `facedBest` existed is treated as
 * `false` if missing — the safe direction, since it only makes Best come
 * due slightly sooner, never later.
 */
export function getAttemptsSinceBestFaced(moduleId, mode) {
  assertMode(mode);
  const history = loadCompetitionSessionsFor(moduleId, mode)
    .slice()
    .sort((a, b) => b.ts - a.ts); // newest-first

  if (history.length === 0) return null;

  let count = 0;
  for (const s of history) {
    if (s.facedBest) break;
    count += 1;
  }
  return count;
}
/**
 * loadGhostCandidateSessions(moduleId, mode) → CompetitionSessionDetail[]
 *
 * The actual pool ghosts get built from — normal-mode SessionDetail records
 * are normalized into the same shape Competition sessions use, with a
 * synthetic flat paceCurve standing in for the real per-second journey that
 * only genuine Competition attempts record (see buildSyntheticPaceCurve).
 * `targetLength` is left null for these — createGhostRunner derives its
 * time-rescale rate from wpm directly rather than targetLength/duration, so
 * a missing targetLength doesn't block the projection (see that file's
 * comment on why wpm-derived rate works for either source).
 * Oldest-first, matching every other loader's convention.
 */
export function loadGhostCandidateSessions(moduleId, mode) {
  const competition = loadCompetitionSessionsFor(moduleId, mode)
    .map((s) => ({ ...s, __sourceType: "competition" }));
  const normal = loadSessions()
    .filter((s) => s.moduleId === moduleId && s.mode === mode)
    .map((s) => ({
      ...s,
      targetLength: null, // unknown for normal-mode sessions — fine, see above
      paceCurve: buildSyntheticPaceCurve(s.duration),
      __sourceType: "normal",
    }));
  return [...competition, ...normal].sort((a, b) => a.ts - b.ts);
}
/**
 * buildSyntheticPaceCurve(durationSeconds) → { second, pctComplete }[]
 * A perfectly steady linear ramp — the honest stand-in for a normal-mode
 * session's journey, since normal mode never recorded one. Real Competition
 * attempts always have a genuine recorded curve and never hit this path.
 */
function buildSyntheticPaceCurve(durationSeconds) {
  const secs = Math.max(1, Math.round(durationSeconds || 1));
  const curve = [];
  for (let s = 0; s <= secs; s++) {
    curve.push({ second: s, pctComplete: Math.min(100, (s / secs) * 100) });
  }
  return curve;
}
/**
 * getTodayPracticeSeconds() → number
 *
 * Total typing time recorded today, summed across BOTH session logs —
 * typing:sessions:v1 (Timed/Unit) AND typing:competitionSessions:v1
 * (Competition). Competition previously wasn't counted here at all: it's a
 * genuinely separate log (see the header comment above the Competition
 * section — a deliberate split so Competition's different rhythm doesn't
 * corrupt Timed/Unit's deriveStats trend/best math), but a minute spent
 * racing is still a minute of practice, and the *daily time goal* is about
 * total time spent, not which mode it was spent in. So this is the one
 * place that intentionally reads across both logs, rather than adding a
 * third store or duplicating a running total — same "derive on read"
 * philosophy as everything else in this file (see §6.8-equivalent
 * reasoning at the top).
 *
 * Deliberately NOT filtered by mode/moduleId, matching the existing
 * (pre-Competition) behavior of summing every session logged today
 * regardless of difficulty — the daily time goal has always been "total
 * minutes typed today", not a per-difficulty count.
 */
export function getTodayPracticeSeconds() {
  const todayISO = new Date().toISOString().slice(0, 10);
  const normalSeconds = loadSessions()
    .filter((s) => s.date === todayISO)
    .reduce((sum, s) => sum + (s.duration ?? 0), 0);
  const competitionSeconds = loadCompetitionSessions()
    .filter((s) => s.date === todayISO)
    .reduce((sum, s) => sum + (s.duration ?? 0), 0);
  return normalSeconds + competitionSeconds;
}

const GOAL_MILESTONES_KEY = "typing:goalMilestones:v1";

function loadGoalMilestones() {
  try {
    const raw = localStorage.getItem(GOAL_MILESTONES_KEY);
    if (!raw) return {};
    const data = JSON.parse(raw);
    const todayISO = new Date().toISOString().slice(0, 10);
    return data.date === todayISO ? data : {};
  } catch {
    return {};
  }
}

function saveGoalMilestones(data) {
  try {
    const todayISO = new Date().toISOString().slice(0, 10);
    localStorage.setItem(GOAL_MILESTONES_KEY, JSON.stringify({ ...data, date: todayISO }));
  } catch {
    // non-critical, fine to no-op
  }
}

/**
 * checkTimeMilestone(totalMinutes, goalMinutes) → level | null
 *
 * Time goal celebrates every time the day's total crosses a NEW multiple
 * of the goal — not just the first crossing. Practice 60/60/60 min goal
 * and hit 190 total minutes today, and this fires at 60 (level 1), 120
 * (level 2), and 180 (level 3) — each one a genuinely new milestone, so
 * being "on a roll" keeps getting celebrated instead of going quiet after
 * the first hit.
 */
export function checkTimeMilestone(totalMinutes, goalMinutes) {
  if (!goalMinutes || goalMinutes <= 0) return null;
  const data = loadGoalMilestones();
  const currentLevel = Math.floor(totalMinutes / goalMinutes);
  const lastLevel = data.timeLevel ?? 0;
  if (currentLevel > lastLevel && currentLevel >= 1) {
    saveGoalMilestones({ ...data, timeLevel: currentLevel });
    return currentLevel;
  }
  return null;
}

/**
 * checkWpmMilestone(wpm, goalWpm) → boolean
 *
 * WPM celebrates every time a session both clears the goal AND sets a new
 * personal best FOR TODAY — so a string of increasingly fast sessions each
 * gets its own moment, rather than only the first time the goal is met.
 */
export function checkWpmMilestone(wpm, goalWpm) {
  if (!goalWpm || wpm < goalWpm) return false;
  const data = loadGoalMilestones();
  const lastBest = data.wpmBest ?? 0;
  if (wpm > lastBest) {
    saveGoalMilestones({ ...data, wpmBest: wpm });
    return true;
  }
  return false;
}

/**
 * getCombinedModeSessions(mode) → SessionDetail[]
 *
 * Merges typing:sessions:v1 and typing:competitionSessions:v1, filtered to
 * one difficulty mode, sorted oldest→newest by `ts`. Both logs already
 * store wpm/accuracy/etc. directly on each entry (see the schema docs),
 * so no recomputation is needed — just concatenate and re-sort, since
 * interleaving two independently-appended logs won't already be
 * chronological. Kept separate from deriveStats' modeSessions param name
 * (still expects a plain oldest-first array) — this is only about what
 * feeds it, not about deriveStats itself needing to know two logs exist.
 *
 * The two logs stay physically separate everywhere else (unlock math,
 * trend charts specific to one mode, etc.) — this merge exists only for
 * "best/average WPM & accuracy across all practice" style displays, where
 * a fast lap in Competition is just as real a data point as a Timed run.
 */
export function getCombinedModeSessions(mode) {
  const normal = loadSessions().filter((s) => s.mode === mode);
  const competition = loadCompetitionSessions().filter((s) => s.mode === mode);
  return [...normal, ...competition].sort((a, b) => a.ts - b.ts);
}

/**
 * clearCompetitionSessions() — wipes the entire competition log (all modules/modes).
 */
export function clearCompetitionSessions() {
  localStorage.removeItem(COMPETITION_SESSIONS_KEY);
}

/**
 * clearCompetitionSessionsForMode(mode) — removes Competition history for
 * this difficulty across ALL modules, leaving other modes' Competition
 * data untouched. Paired with clearSessionsForMode() for the progress
 * report's "clear history for this difficulty" action, so a full reset of
 * one difficulty also resets Competition's unlock progress for it — there's
 * no separate "unlocked" flag to clear, getCompetitionUnlockState derives
 * unlock status from attempt counts, so removing the underlying attempts
 * naturally re-locks Competition until the user repopulates 3 fresh ones.
 */
export function clearCompetitionSessionsForMode(mode) {
  assertMode(mode);
  const remaining = loadCompetitionSessions().filter((s) => s.mode !== mode);
  writeGuarded(COMPETITION_SESSIONS_KEY, remaining);
}
// src/utils/typingStorage.js
// Persistent performance storage for the typing practice feature.
//
// ── Global (cross-module) record ────────────────────────────────────────────
// Stats are intentionally NOT split by module. The point of the typing
// feature is to improve raw typing speed and accuracy — those metrics
// are a property of the person, not of the study module they happen to
// be practising. A single global record gives meaningful trend data much
// faster than per-module silos that each only accumulate a handful of
// sessions before the student moves on.
//
// Storage key: `typing:perf:v1:global`  (previously `typing:perf:v1:<moduleId>`)
//
// ── Tamper protection ───────────────────────────────────────────────────────
// Every record is stored alongside an HMAC-SHA-256 signature. On read,
// the signature is recomputed and compared; a mismatch silently discards
// the record. Stops casual console edits; a reader of this source can
// still forge a valid sig — acceptable for a study tool.
//
// ── Storage schema ──────────────────────────────────────────────────────────
// Key:   `typing:perf:v1:global`
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
const GLOBAL_KEY      = `typing:perf:${STORAGE_VERSION}:global`;
const MAX_RECENT      = 20;   // larger window makes sense for a global record

// ── HMAC key ─────────────────────────────────────────────────────────────────
// Bump HMAC_SECRET if you change the RecordData schema in a breaking way —
// that will invalidate existing records so users start fresh.
const HMAC_SECRET = "tp-perf-hmac-key-2026-v2-global";

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
 * loadRecord() → RecordData | null
 *
 * Returns the global typing record, or null if:
 *   - nothing stored yet
 *   - JSON is malformed
 *   - signature doesn't match (tampered or HMAC_SECRET bumped)
 */
export async function loadRecord() {
  try {
    const raw = localStorage.getItem(GLOBAL_KEY);
    if (!raw) return null;

    const { data, sig } = JSON.parse(raw);
    if (!data || !sig) return null;

    const dataStr = JSON.stringify(data);
    const valid   = await verify(dataStr, sig);
    if (!valid) {
      console.warn("[typingStorage] Signature mismatch — global record discarded.");
      localStorage.removeItem(GLOBAL_KEY);
      return null;
    }

    return data;
  } catch {
    return null;
  }
}

// ── Write ─────────────────────────────────────────────────────────────────────

/**
 * saveSession({ wpm, accuracy }) → RecordData
 *
 * Merges a completed session into the global record and returns the
 * updated record. Creates a new record if none exists.
 *
 * Note: moduleId param removed — record is now global.
 */
export async function saveSession({ wpm, accuracy }) {
  const existing = await loadRecord();

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

  localStorage.setItem(GLOBAL_KEY, JSON.stringify({ data: updated, sig }));

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
export function deriveStats(record, currentWpm = null) {
  if (!record) return null;

  const { bestWpm, recentWpm, recentAccuracy, totalSessions } = record;

  const avg = (arr) =>
    arr.length === 0 ? 0 : Math.round(arr.reduce((a, b) => a + b, 0) / arr.length);

  const averageWpm      = avg(recentWpm);
  const averageAccuracy = avg(recentAccuracy);
  const recentMin       = recentWpm.length > 0 ? Math.min(...recentWpm) : 0;

  let trend = "stable";
  if (recentWpm.length >= 4) {
    const recent   = avg(recentWpm.slice(-3));
    const previous = avg(recentWpm.slice(-6, -3));
    if (previous > 0) {
      const delta = recent - previous;
      if (delta >  2) trend = "up";
      if (delta < -2) trend = "down";
    }
  }

  const isNewBest = currentWpm !== null && currentWpm >= bestWpm;

  return { bestWpm, averageWpm, averageAccuracy, recentMin, trend, totalSessions, isNewBest };
}

/**
 * clearRecord() — wipes the global typing record.
 */
export async function clearRecord() {
  localStorage.removeItem(GLOBAL_KEY);
}
// ── Settings persistence ──────────────────────────────────────────────────────
// Stores the user's chosen duration, mode, and WPM goal across page loads.
// No HMAC needed — these are preferences, not performance records.
//
// Key: `typing:settings:v1`
// Value: JSON string of TypingSettings
//
// TypingSettings = {
//   duration: { label: string, seconds: number } | null,
//   mode:     "beginner" | "intermediate" | "normal" | null,
//   goalWpm:  number | null,
//   goalTime: number,   // minutes, default 15
//   goalSet:  boolean,  // true once the user has been through the goal modal
//                       // at least once — gates the auto-open-on-first-visit
//                       // prompt in TypingPracticePage. Was previously written
//                       // by saveSettings() but dropped by loadSettings()'s
//                       // return whitelist, so the prompt reappeared on every
//                       // visit — fixed by including it below.
// }

const SETTINGS_KEY = "typing:settings:v1";

export const DEFAULT_SETTINGS = {
  duration: null,
  mode:     null,
  goalWpm:  35,
  goalTime: 15,
  goalSet:  false,
};

/**
 * loadSettings() → TypingSettings
 * Returns persisted settings, falling back to DEFAULT_SETTINGS for any missing field.
 */
export function loadSettings() {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return { ...DEFAULT_SETTINGS };
    const parsed = JSON.parse(raw);
    return {
      duration: parsed.duration ?? DEFAULT_SETTINGS.duration,
      mode:     parsed.mode     ?? DEFAULT_SETTINGS.mode,
      goalWpm:  parsed.goalWpm  ?? DEFAULT_SETTINGS.goalWpm,
      goalTime: parsed.goalTime ?? DEFAULT_SETTINGS.goalTime,
      goalSet:  parsed.goalSet  ?? DEFAULT_SETTINGS.goalSet,
    };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

/**
 * saveSettings(partial) — merges partial into stored settings and writes back.
 * Pass only the fields you want to update.
 */
export function saveSettings(partial) {
  try {
    const current = loadSettings();
    const updated = { ...current, ...partial };
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
 * saveSessionDetail(detail) — appends a record to the capped session log.
 * Silently no-ops on storage failure (e.g. quota exceeded) rather than
 * throwing — losing one detail record should never break the typing flow.
 */
export function saveSessionDetail(detail) {
  try {
    const existing = loadSessions();
    const updated  = [...existing, detail].slice(-MAX_SESSIONS);
    localStorage.setItem(SESSIONS_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn("[typingStorage] Failed to save session detail:", err);
  }
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
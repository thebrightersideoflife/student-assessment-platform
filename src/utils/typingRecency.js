// src/utils/typingRecency.js
//
// ── Cross-session recency tracker ─────────────────────────────────────────────
// Stores the IDs of the last RECENCY_CAP passages the user has seen, keyed
// per module so switching modules doesn't pollute each other's history.
// On every shuffle we rotate these to the back so the user always gets fresh
// content first. Incognito sessions have no localStorage, so we silently
// fall back to a plain shuffle — no errors, no warnings.

export const RECENCY_CAP = 40; // remember up to this many recent passage IDs per module

function recencyKey(moduleId) {
  return `typing:recency:v1:${moduleId}`;
}

export function loadRecentIds(moduleId) {
  try {
    const raw = localStorage.getItem(recencyKey(moduleId));
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveRecentIds(moduleId, ids) {
  try {
    localStorage.setItem(recencyKey(moduleId), JSON.stringify(ids));
  } catch {
    // Incognito / storage full — silently skip
  }
}

/**
 * shuffleWithRecency(passages, moduleId) → Passage[]
 *
 * 1. Fisher-Yates shuffle the full pool.
 * 2. Partition into [unseen, recentlySeen] based on stored IDs.
 * 3. Concatenate unseen first, recently-seen at the back.
 * 4. Update the stored recency log with the first RECENCY_CAP IDs of the
 *    new order (those are what will actually be shown in short sessions).
 */
export function shuffleWithRecency(passages, moduleId) {
  // Step 1 — Fisher-Yates
  const arr = [...passages];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  // Step 2 — partition
  const recentSet = new Set(loadRecentIds(moduleId));
  const unseen    = arr.filter((p) => !recentSet.has(p.id));
  const seen      = arr.filter((p) =>  recentSet.has(p.id));

  // Step 3 — unseen first
  const ordered = [...unseen, ...seen];

  // Step 4 — persist the leading slice as the new recency log
  const nextRecentIds = ordered.slice(0, RECENCY_CAP).map((p) => p.id);
  saveRecentIds(moduleId, nextRecentIds);

  return ordered;
}
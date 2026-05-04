// src/utils/revisionHelpers.js
//
// Pure functions for the cross-week revision mode.
// No side effects, no storage reads — callers pass in the data.

import { GRADABLE_TYPES } from "./questionHelpers";

/**
 * Fisher-Yates shuffle — returns a new array, never mutates the input.
 * @param {Array} arr
 * @returns {Array}
 */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Collect every gradable question from completed weeks, optionally filtered
 * to a specific set of module IDs (the student's tracked modules).
 *
 * Attaches `_sourceModuleId` and `_sourceWeekId` to each question so the
 * revision UI can show provenance ("From ITNSA — Week 3").
 *
 * Scenario blocks are excluded — they're context providers, not questions,
 * and they're week-specific so they'd be misleading out of context.
 * show-answer (essay) questions are included since the student can still
 * read the model answer and self-assess.
 *
 * @param {object} questionsByModule  — questions[moduleId][weekId] = Question[]
 * @param {object} completionsByModule — { [moduleId]: Set<weekId string> }
 *                                       — which weeks are completed per module
 * @param {string[]} [trackedModuleIds] — if provided, only include these modules
 * @returns {Array} flat list of annotated question objects
 */
export function collectRevisionPool(questionsByModule, completionsByModule, trackedModuleIds) {
  const pool = [];
  const moduleIds = trackedModuleIds ?? Object.keys(questionsByModule);

  for (const moduleId of moduleIds) {
    const weekMap = questionsByModule[moduleId];
    if (!weekMap) continue;

    const completedWeeks = completionsByModule[moduleId] ?? new Set();

    for (const [weekId, questions] of Object.entries(weekMap)) {
      if (!completedWeeks.has(String(weekId))) continue;
      if (!Array.isArray(questions)) continue;

      for (const q of questions) {
        // Skip scenario blocks — not answerable out of context
        if (q.type === "scenario") continue;
        // Only gradable types + show-answer
        if (!GRADABLE_TYPES.includes(q.type) && q.type !== "show-answer") continue;

        pool.push({
          ...q,
          // Prefix the id so the same question from different weeks never collides
          id: `rev_${moduleId}_${weekId}_${q.id}`,
          _originalId: q.id,
          _sourceModuleId: moduleId,
          _sourceWeekId: weekId,
        });
      }
    }
  }

  return pool;
}

/**
 * Build the final revision set: shuffle the pool and take the first N questions.
 * If the pool is smaller than count, returns the whole pool shuffled.
 *
 * @param {Array}  pool   — from collectRevisionPool()
 * @param {number} count  — how many questions to include
 * @returns {Array}
 */
export function buildRevisionSet(pool, count) {
  return shuffle(pool).slice(0, count);
}

/**
 * Build a map of completed week IDs per module from AssessmentStorage.
 * Returns { [moduleId]: Set<weekId string> }.
 *
 * @param {string[]} moduleIds
 * @param {object}   weeksByModule — { [moduleId]: Week[] }
 * @param {Function} getCompletionStatus — AssessmentStorage.getCompletionStatus
 * @returns {object}
 */
export function buildCompletionMap(moduleIds, weeksByModule, getCompletionStatus) {
  const map = {};
  for (const moduleId of moduleIds) {
    const weeks = weeksByModule[moduleId] ?? [];
    map[moduleId] = new Set();
    for (const w of weeks) {
      if (getCompletionStatus(moduleId, String(w.id))) {
        map[moduleId].add(String(w.id));
      }
    }
  }
  return map;
}

/**
 * Count how many distinct weeks are completed across all tracked modules.
 * Used to decide whether to show the revision entry point.
 *
 * @param {object} completionMap — from buildCompletionMap()
 * @returns {number}
 */
export function countCompletedWeeks(completionMap) {
  return Object.values(completionMap).reduce((sum, set) => sum + set.size, 0);
}

/**
 * Revision size options — presented as chips in the config screen.
 * "All" is a sentinel that resolves to the full pool size at runtime.
 */
export const REVISION_SIZE_OPTIONS = [
  { label: "5 questions",  value: 5  },
  { label: "10 questions", value: 10 },
  { label: "20 questions", value: 20 },
  { label: "All",          value: Infinity },
];
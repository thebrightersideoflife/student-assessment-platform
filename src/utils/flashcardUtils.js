/**
 * Flashcard Utilities
 */

import { questions as allQuestions } from "../data/questions/index.js";

/**
 * Fisher-Yates shuffle.
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
 * Collect all questions from the selected modules, filtering by type.
 * Excludes 'scenario' and 'show-answer'.
 *
 * @param {string[]} moduleIds - List of module IDs to pull questions from.
 * @returns {Array} A list of question objects with source metadata.
 */
export function collectFlashcardPool(moduleIds) {
  const pool = [];

  for (const moduleId of moduleIds) {
    const weekMap = allQuestions[moduleId];
    if (!weekMap) continue;

    for (const [weekId, questions] of Object.entries(weekMap)) {
      if (!Array.isArray(questions)) continue;

      for (const q of questions) {
        // Exclude scenario blocks and essay-type (show-answer) questions
        if (q.type === "scenario" || q.type === "show-answer") continue;

        pool.push({
          ...q,
          _sourceModuleId: moduleId,
          _sourceWeekId: weekId,
        });
      }
    }
  }

  return pool;
}

/**
 * Build the flashcard set by shuffling the pool and prioritizing open-ended questions.
 *
 * @param {Array} pool - The pool of questions to prioritize and shuffle.
 * @returns {Array} The prioritized and shuffled flashcard list.
 */
export function buildFlashcardSet(pool) {
  if (!pool || pool.length === 0) return [];

  // Split into open-ended and others
  const openEnded = pool.filter(q => q.type === "open-ended");
  const others = pool.filter(q => q.type !== "open-ended");

  // Shuffle both sets independently
  const shuffledOpenEnded = shuffle(openEnded);
  const shuffledOthers = shuffle(others);

  // Concatenate: Open-ended first, then the rest
  return [...shuffledOpenEnded, ...shuffledOthers];
}

/**
 * Load user-selected modules from localStorage.
 * Fallback to all available modules if none are tracked yet.
 *
 * @param {string[]} allAvailableModuleIds
 * @returns {string[]} List of tracked module IDs.
 */
export function loadUserSelectedModules(allAvailableModuleIds) {
  const MODULE_SELECTION_KEY = "progress_tracked_modules";
  try {
    const raw = localStorage.getItem(MODULE_SELECTION_KEY);
    // Default to the first module only if nothing is stored yet
    if (!raw) return allAvailableModuleIds.length > 0 ? [allAvailableModuleIds[0]] : [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : [allAvailableModuleIds[0]];
  } catch {
    return allAvailableModuleIds.length > 0 ? [allAvailableModuleIds[0]] : [];
  }
}

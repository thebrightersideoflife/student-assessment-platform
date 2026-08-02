// src/utils/weaknessAnalysis.js
//
// Pure functions for the weakness-based quiz feature.
// No storage reads, no side effects — callers pass in attempt/history data
// (e.g. from AssessmentStorage.getAllAttempts() + getAllWeaknessQuestionResults()).

import { GRADABLE_TYPES } from "./questionHelpers";

// A tag only counts as "weak" once it has enough signal AND a high enough
// failure rate — otherwise one unlucky guess would flag a tag forever.
const DEFAULT_MIN_SEEN = 2;
const DEFAULT_FAILURE_THRESHOLD = 0.5;

/**
 * Aggregate per-tag stats from a flat list of questionResults
 * (shape: { questionId, tags, correct }).
 *
 * @param {Array} questionResultsList
 * @returns {object} { [tag]: { seen, failed, failureRate } }
 */
export function aggregateTagStats(questionResultsList = []) {
  const stats = {};
  for (const result of questionResultsList) {
    if (!result || !Array.isArray(result.tags)) continue;
    for (const tag of result.tags) {
      if (!stats[tag]) stats[tag] = { seen: 0, failed: 0 };
      stats[tag].seen += 1;
      if (!result.correct) stats[tag].failed += 1;
    }
  }
  for (const tag of Object.keys(stats)) {
    const s = stats[tag];
    s.failureRate = s.seen > 0 ? s.failed / s.seen : 0;
  }
  return stats;
}

/**
 * Rank tags by failure rate, only counting tags with enough signal.
 * Default: a tag must have been seen at least twice AND failed at least
 * half the time to count as a genuine weak spot.
 *
 * @param {object} tagStats — from aggregateTagStats()
 * @param {object} [options]
 * @param {number} [options.minSeen=2]
 * @param {number} [options.failureThreshold=0.5]
 * @returns {Array<{tag, seen, failed, failureRate}>} sorted worst-first
 */
export function getWeakTags(
  tagStats,
  { minSeen = DEFAULT_MIN_SEEN, failureThreshold = DEFAULT_FAILURE_THRESHOLD } = {}
) {
  return Object.entries(tagStats)
    .filter(([, s]) => s.seen >= minSeen && s.failureRate >= failureThreshold)
    .map(([tag, s]) => ({ tag, ...s }))
    .sort((a, b) => b.failureRate - a.failureRate || b.seen - a.seen);
}

/**
 * Collect a candidate pool of gradable questions from completed weeks in
 * the tracked modules, weighted (not filtered) by relevance to weak tags.
 *
 * Unlike collectRevisionPool(), scenario blocks are intentionally NOT
 * included here — attachScenarios() re-attaches the relevant ones to the
 * final selection once it's been chosen, so scenario context isn't lost
 * even though this pool itself is question-only.
 *
 * @param {object} questionsByModule   — questions[moduleId][weekId] = Question[]
 * @param {object} completionsByModule — { [moduleId]: Set<weekId string> }
 * @param {Array}  weakTags            — from getWeakTags()
 * @param {string[]} [trackedModuleIds]
 * @returns {Array} flat list of annotated gradable questions, each with a
 *          `_weakScore` (count of tags matching weakTags; 0 is fine — the
 *          pool still needs to work before any weakness signal exists).
 */
export function collectWeaknessPool(questionsByModule, completionsByModule, weakTags, trackedModuleIds) {
  const weakTagSet = new Set((weakTags || []).map((w) => w.tag));
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
        if (!GRADABLE_TYPES.includes(q.type)) continue;

        const weakScore = Array.isArray(q.tags)
          ? q.tags.filter((t) => weakTagSet.has(t)).length
          : 0;

        pool.push({
          ...q,
          // Prefix so the same question id from different weeks never collides
          id: `wq_${moduleId}_${weekId}_${q.id}`,
          _originalId: q.id,
          _sourceModuleId: moduleId,
          _sourceWeekId: weekId,
          _weakScore: weakScore,
        });
      }
    }
  }

  return pool;
}

/**
 * Weighted random selection: questions with a higher `_weakScore` are more
 * likely to be picked, but selection stays genuinely random — this is not
 * a deterministic "worst tags first" sort (which would produce the same
 * quiz every time for the same weak tags). Uses a weighted random key per
 * item (Efraimidis–Spirakis A-Res style) so every question — including
 * zero-score ones — always has a nonzero chance of being included.
 *
 * If `count` exceeds the pool size, the entire (shuffled) pool is returned.
 *
 * @param {Array}  pool
 * @param {number} count
 * @returns {Array}
 */
export function buildWeightedWeaknessSet(pool, count) {
  const keyed = pool.map((q) => {
    const weight = 1 + q._weakScore * 3; // weak-tagged questions weigh more; everyone gets a shot
    const key = Math.pow(Math.random(), 1 / weight);
    return { q, key };
  });
  keyed.sort((a, b) => b.key - a.key);
  return keyed.slice(0, count).map((k) => k.q);
}

/**
 * Given a final selection of questions (annotated with _sourceModuleId /
 * _sourceWeekId / _originalId) plus the original questionsByModule data,
 * find the nearest preceding `scenario` block for each selected question
 * within its home week's original array order — mirroring the same
 * "lastScenario" tracking AssessmentPage uses when rendering a week live.
 *
 * Scenario blocks are deduped (a scenario shared by several selected
 * questions from the same week appears only once, right before the first
 * of its questions) and each week/module group keeps its own original
 * relative ordering, so a student is never shown a question before the
 * scenario it depends on.
 *
 * @param {Array}  selectedQuestions — from buildWeightedWeaknessSet()
 * @param {object} questionsByModule
 * @returns {Array} ordered list — scenario blocks (flagged `_isScenario`)
 *          interleaved directly before the questions that depend on them
 */
export function attachScenarios(selectedQuestions, questionsByModule) {
  // Group selected questions by their source week — original week order
  // decides ordering within a group; the groups themselves are visited in
  // whatever order they first appear in the (already-shuffled) selection.
  const groupOrder = [];
  const byWeek = new Map(); // key: `${moduleId}::${weekId}` -> Set(_originalId)

  for (const q of selectedQuestions) {
    const key = `${q._sourceModuleId}::${q._sourceWeekId}`;
    if (!byWeek.has(key)) {
      byWeek.set(key, new Set());
      groupOrder.push(key);
    }
    byWeek.get(key).add(q._originalId);
  }

  const result = [];

  for (const key of groupOrder) {
    const [moduleId, weekId] = key.split("::");
    const originalIds = byWeek.get(key);
    const weekQuestions = questionsByModule[moduleId]?.[weekId] || [];

    let lastScenario = null;
    const seenScenarioIds = new Set();

    for (const q of weekQuestions) {
      if (q.type === "scenario") {
        lastScenario = q;
        continue;
      }
      if (!originalIds.has(q.id)) continue;

      if (lastScenario && !seenScenarioIds.has(lastScenario.id)) {
        seenScenarioIds.add(lastScenario.id);
        result.push({
          ...lastScenario,
          id: `wq_scenario_${moduleId}_${weekId}_${lastScenario.id}`,
          _sourceModuleId: moduleId,
          _sourceWeekId: weekId,
          _isScenario: true,
        });
      }

      const selected = selectedQuestions.find(
        (sq) => sq._sourceModuleId === moduleId && sq._sourceWeekId === weekId && sq._originalId === q.id
      );
      if (selected) result.push(selected);
    }
  }

  return result;
}
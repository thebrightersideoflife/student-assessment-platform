/**
 * streakHelpers.js
 *
 * Pure functions for computing streak data from raw completion records.
 * No localStorage access — callers pass in the array of all completion objects.
 * All functions are stateless and side-effect-free.
 */

/**
 * Convert an ISO date string to an ISO year-week string, e.g. "2026-W18".
 * Uses the ISO 8601 week definition (week starts Monday, week 1 contains the
 * first Thursday of the year).
 *
 * @param {string} isoDateString
 * @returns {string} e.g. "2026-W18"
 */
export function toISOWeek(isoDateString) {
  const date = new Date(isoDateString);
  // Work in UTC to avoid timezone drift
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  // ISO week: shift so Monday = 0
  const dayOfWeek = (d.getUTCDay() + 6) % 7;
  // Set d to the nearest Thursday (ISO week belongs to the year of its Thursday)
  d.setUTCDate(d.getUTCDate() - dayOfWeek + 3);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNumber = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(weekNumber).padStart(2, "0")}`;
}

/**
 * Get the ISO year-week string for today.
 * @returns {string}
 */
export function currentISOWeek() {
  return toISOWeek(new Date().toISOString());
}

/**
 * Get the ISO year-week string for the week before the given one.
 * Handles year boundaries correctly.
 *
 * @param {string} isoWeek  e.g. "2026-W01"
 * @returns {string}        e.g. "2025-W52"
 */
export function previousISOWeek(isoWeek) {
  const [year, weekStr] = isoWeek.split("-W");
  const week = parseInt(weekStr, 10);
  // Monday of that week = Jan 4 + 7*(week-1) days, shifted to Monday
  const jan4 = new Date(Date.UTC(parseInt(year, 10), 0, 4));
  const dayOfWeek = (jan4.getUTCDay() + 6) % 7;
  const monday = new Date(jan4);
  monday.setUTCDate(jan4.getUTCDate() - dayOfWeek + (week - 1) * 7);
  // Go back 1 day to land in the previous week
  monday.setUTCDate(monday.getUTCDate() - 1);
  return toISOWeek(monday.toISOString());
}

/**
 * Given a list of assessment completion objects (each must have `completedDate`),
 * return a sorted, deduplicated array of ISO year-week strings in ascending order.
 *
 * @param {Array<{completedDate: string}>} completions
 * @returns {string[]}
 */
export function getActiveWeeks(completions) {
  const weekSet = new Set();
  for (const c of completions) {
    if (c?.completedDate) {
      weekSet.add(toISOWeek(c.completedDate));
    }
  }
  return Array.from(weekSet).sort();
}

/**
 * Compute the current streak — consecutive weeks of activity ending at
 * this week or last week (so a student who hasn't completed anything yet
 * this week doesn't immediately lose their streak).
 *
 * "Active" means the student completed at least one assessment in that week.
 *
 * @param {string[]} sortedActiveWeeks  Sorted ascending list from getActiveWeeks()
 * @returns {{ streak: number, isAtRisk: boolean }}
 *   streak    — number of consecutive weeks (0 if none)
 *   isAtRisk  — true if current week has no completion (streak could break next week)
 */
export function getCurrentStreak(sortedActiveWeeks) {
  if (!sortedActiveWeeks.length) return { streak: 0, isAtRisk: false };

  const weekSet = new Set(sortedActiveWeeks);
  const thisWeek = currentISOWeek();
  const hasThisWeek = weekSet.has(thisWeek);

  // Start counting from the most recent completed week
  let cursor = hasThisWeek ? thisWeek : previousISOWeek(thisWeek);

  // If even the previous week has no completion, streak is 0
  if (!weekSet.has(cursor)) return { streak: 0, isAtRisk: false };

  let count = 0;
  while (weekSet.has(cursor)) {
    count++;
    cursor = previousISOWeek(cursor);
  }

  return { streak: count, isAtRisk: !hasThisWeek };
}

/**
 * Compute the longest streak ever from the full activity history.
 *
 * @param {string[]} sortedActiveWeeks  Sorted ascending list from getActiveWeeks()
 * @returns {number}
 */
export function getLongestStreak(sortedActiveWeeks) {
  if (!sortedActiveWeeks.length) return 0;

  let longest = 1;
  let current = 1;

  for (let i = 1; i < sortedActiveWeeks.length; i++) {
    const expected = previousISOWeek(sortedActiveWeeks[i]);
    if (sortedActiveWeeks[i - 1] === expected) {
      current++;
      if (current > longest) longest = current;
    } else {
      current = 1;
    }
  }

  return longest;
}
// src/data/questions/index.js
//
// Single assembly point for all question data.
// This is the ONLY file in the questions/ folder that contains logic.
//
// ─── Adding a new module ────────────────────────────────────────────────────
//   1. Create src/data/questions/NEWMOD/week1.js  (and week2.js, etc.)
//   2. Import them below
//   3. Add the module key to rawQuestions
//   That's it. Nothing in AssessmentPage, WeeksPage, or WeekCard needs to change.
//
// ─── Adding a new week to an existing module ────────────────────────────────
//   1. Create src/data/questions/ITNSA/week4.js
//   2. Import it below
//   3. Add "4": ITNSA_W4 to the ITNSA entry in rawQuestions
//   4. Add the week metadata to src/data/weeks.js
//
// The consumed shape — questions[moduleId][weekId] — is unchanged.
// AssessmentPage line: questions[moduleId]?.[weekId]  ✓ still works.
// WeeksPage line:      questions[moduleId]?.[week.id]  ✓ still works.
// ────────────────────────────────────────────────────────────────────────────

// ── ITNSA ──────────────────────────────────────────────────────────────────
import ITNSA_W1 from "./ITNSA/week1.js";
import ITNSA_W2 from "./ITNSA/week2.js";
import ITNSA_W3 from "./ITNSA/week3.js";
// import ITNSA_W4 from "./ITNSA/week4.js";  ← uncomment as you add weeks

// ── ITDSA ──────────────────────────────────────────────────────────────────
import ITDSA_W1 from "./ITDSA/week1.js";
import ITDSA_W2 from "./ITDSA/week2.js";
import ITDSA_W3 from "./ITDSA/week3.js";
// import ITDSA_W4 from "./ITDSA/week4.js";

// ── Assembly map ───────────────────────────────────────────────────────────
// Keys must match the week `id` strings in src/data/weeks.js
const rawQuestions = {
  ITNSA: {
    "1": ITNSA_W1,
    "2": ITNSA_W2,
    "3": ITNSA_W3,
    // "4": ITNSA_W4,
  },
  ITDSA: {
    "1": ITDSA_W1,
    "2": ITDSA_W2,
    "3": ITDSA_W3,
    // "4": ITDSA_W4,
  },
};

// ── normalizePoints ────────────────────────────────────────────────────────
// Caps question points per type so no individual file can accidentally
// exceed the platform-wide maximums. Edit caps here to change them globally.
function normalizePoints(questionsObj) {
  const clone = JSON.parse(JSON.stringify(questionsObj));
  const caps = {
    "multiple-choice": 2,
    "open-ended":      3,
    "show-answer":     8,
  };
  for (const moduleKey of Object.keys(clone)) {
    const moduleWeeks = clone[moduleKey];
    for (const weekKey of Object.keys(moduleWeeks)) {
      const arr = moduleWeeks[weekKey];
      if (!Array.isArray(arr)) continue;
      for (const q of arr) {
        if (!q || !q.type) continue;
        const cap = caps[q.type];
        if (typeof cap === "number") {
          q.points = Math.min(q.points || cap, cap);
        }
      }
    }
  }
  return clone;
}

export const questions = normalizePoints(rawQuestions);
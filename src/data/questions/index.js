// src/data/questions/index.js
//
// Single assembly point for all question data.
// This is the ONLY file in the questions/ folder that contains logic.
//
// ─── Adding a new module ────────────────────────────────────────────────────
//   1. Create src/data/questions/NEWMOD/week1.js  (and week2.js, etc.)
//   2. Import it below
//   3. Add the module key to rawQuestions
//   4. Add week metadata to src/data/weeks.js
//   5. Add the module entry to src/data/modules.js
//
// ─── Adding a new week to an existing module ────────────────────────────────
//   1. Create src/data/questions/ITNSA/week4.js
//   2. Import it below
//   3. Add "4": ITNSA_W4 to the ITNSA entry in rawQuestions
//   4. Add the week object to src/data/weeks.js
//
// The consumed shape — questions[moduleId][weekId] — is unchanged everywhere.
// ────────────────────────────────────────────────────────────────────────────

// ── ITNSA ──────────────────────────────────────────────────────────────────
import ITNSA_W1 from "./ITNSA/week1.js";
import ITNSA_W2 from "./ITNSA/week2.js";
import ITNSA_W3 from "./ITNSA/week3.js";
// import ITNSA_W4 from "./ITNSA/week4.js";

// ── ITDSA ──────────────────────────────────────────────────────────────────
import ITDSA_W1 from "./ITDSA/week1.js";
import ITDSA_W2 from "./ITDSA/week2.js";
import ITDSA_W3 from "./ITDSA/week3.js";
import ITDSA_W4 from "./ITDSA/week4.js";
import ITDSA_W5 from "./ITDSA/week5.js";
import ITDSA_W6 from "./ITDSA/week6.js";
import ITDSA_W7 from "./ITDSA/week7.js";
import ITDSA_W8 from "./ITDSA/week8.js";

// ── ITSEA ──────────────────────────────────────────────────────────────────
import ITSEA_W1 from "./ITSEA/week1.js";
import ITSEA_W2 from "./ITSEA/week2.js";
import ITSEA_W3 from "./ITSEA/week3.js";
import ITSEA_W4 from "./ITSEA/week4.js";
import ITSEA_W5 from "./ITSEA/week5.js";
import ITSEA_W6 from "./ITSEA/week6.js";
import ITSEA_W7 from "./ITSEA/week7.js";

// ── ITJVA ──────────────────────────────────────────────────────────────────
// import ITJVA_W1 from "./ITJVA/week1.js";

// ── Assembly map ───────────────────────────────────────────────────────────
// Week keys must match the id strings in src/data/weeks.js
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
    "4": ITDSA_W4,
    "5": ITDSA_W5,
    "6": ITDSA_W6,
    "7": ITDSA_W7,
    "8": ITDSA_W8,
  },
  ITSEA: {
    "1": ITSEA_W1,
    "2": ITSEA_W2,
    "3": ITSEA_W3,
    "4": ITSEA_W4,
    "5": ITSEA_W5,
    "6": ITSEA_W6,
    "7": ITSEA_W7,
  },
  ITJVA: {
    // "1": ITJVA_W1,
  },
};

// ── normalizePoints ────────────────────────────────────────────────────────
// Caps question points per type so no individual file can accidentally
// exceed the platform-wide maximums. Edit caps here to change them globally.
function normalizePoints(questionsObj) {
  const clone = JSON.parse(JSON.stringify(questionsObj));
  const caps = {
    "multiple-choice":    2,
    "open-ended":         3,
    "show-answer":        8,
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
          // Only cap points when the question explicitly specifies a
          // numeric `points` value that exceeds the platform cap.
          if (typeof q.points === "number" && q.points > cap) {
            q.points = cap;
          }
          // Leave q.points untouched when it's missing or already within cap.
        }
      }
    }
  }
  return clone;
}

export const questions = normalizePoints(rawQuestions);
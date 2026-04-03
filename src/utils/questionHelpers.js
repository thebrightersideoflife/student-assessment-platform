// src/utils/questionHelpers.js
//
// Shared helpers for question data and week metadata.
// Import from here — never hardcode week labels or kind colors in components.

// ── Week label ─────────────────────────────────────────────────────────────

/**
 * Derives the full display label for a week object.
 *
 * Examples:
 *   { name: "Week 1", block: 1 }  →  "Block 1, Week 1"
 *   { name: "Week 4", block: 1, kind: "quiz" }  →  "Block 1, Week 4"
 *   { name: "Week 1" }  →  "Week 1"   (no block — graceful fallback)
 *
 * @param {object} week — a week object from src/data/weeks.js
 * @returns {string}
 */
export function getWeekLabel(week) {
  if (!week) return "";
  // The UI groups weeks under block headings; cards should only show the week name.
  // Return the week name regardless of block to avoid repeating the block label.
  return week.name;
}

// ── Week kind config ───────────────────────────────────────────────────────

/**
 * Returns visual + copy config for a week's `kind` field.
 * Returns null for normal weeks — components should render nothing special.
 *
 * kind values:
 *   undefined / null  →  normal practice week   →  null
 *   "quiz"            →  formal online quiz      →  amber config
 *   "exam"            →  official exam           →  red config
 *
 * Usage:
 *   const kindConfig = getWeekKindConfig(week.kind);
 *   if (kindConfig) { ... render badge ... }
 *
 * @param {string|undefined} kind
 * @returns {{ label, icon, color, bgColor, borderColor, description } | null}
 */
export function getWeekKindConfig(kind) {
  switch (kind) {
    case "quiz":
      return {
        label:       "Online Quiz",
        icon:        "📋",
        color:       "var(--golden-amber)",
        bgColor:     "rgba(244,169,0,0.10)",
        borderColor: "rgba(244,169,0,0.40)",
        description: "This week is when you take the institution's formal online quiz.",
      };

    case "exam":
      return {
        label:       "Official Exam",
        icon:        "🎓",
        color:       "var(--poppy-red)",
        bgColor:     "rgba(255,64,64,0.10)",
        borderColor: "rgba(255,64,64,0.40)",
        description: "This week's assessment reflects the official exam content.",
      };

    default:
      return null;
  }
}

// ── Gradable question filter ───────────────────────────────────────────────
// Centralised here so AssessmentPage and PrintableQuestions use the same rule.

/** Question types that require a student response and count toward the score. */
export const GRADABLE_TYPES = ["multiple-choice", "open-ended", "fill-in-the-blank"];

/** Question types that are display-only and never graded. */
export const DISPLAY_ONLY_TYPES = ["scenario", "show-answer"];

/**
 * Returns only the questions that require a student answer.
 * @param {Array} questions
 * @returns {Array}
 */
export function getRequiredQuestions(questions = []) {
  return questions.filter(q => GRADABLE_TYPES.includes(q.type));
}
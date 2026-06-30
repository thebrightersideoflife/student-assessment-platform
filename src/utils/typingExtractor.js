// src/utils/typingExtractor.js
// Extracts grouped typing passages from question bank data.
//
// Each passage = { id, parts: [{ role, text }] }
// The user types question → answer → explanation as a single coherent unit.
//
// ── Difficulty modes ───────────────────────────────────────────────────────
// After extraction, call applyMode(passages, mode) to transform the text
// in every part. The returned passages are new objects — originals untouched.
//
//   "beginner"     – all lowercase, punctuation stripped to [space . , !?]
//   "intermediate" – sentence case preserved, punctuation stripped to [space . , !?]
//   "normal"       – sentence case + full punctuation (default, no transformation)
//
// applyMode is the ONLY place text is transformed. Both TypingDisplay (which
// renders the target) and TypingTest.handleChange (which matches typed input)
// receive the same passage objects produced by applyMode, so they are always
// in sync. Never transform in one place and not the other.

// ─── Special-character sanitisation ──────────────────────────────────────────

function sanitise(str) {
  return str
    .replace(/[—–]/g, "-")
    .replace(/…/g, "...")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[→←↔⇒⇐⇔▶▷◀◁►◄↑↓]/g, "->")
    .replace(/[⋈⊕⊗⊂⊃⊆⊇∈∉∩∪⊥∀∃∧∨¬≡≢]/g, " ")
    .replace(/≤/g, "<=").replace(/≥/g, ">=").replace(/≠/g, "!=").replace(/≈/g, "~=")
    .replace(/×/g, "x").replace(/÷/g, "/")
    .replace(/[°©®™]/g, " ")
    .replace(/[•·‣⁃◦▪▫■□●○]/g, "-")
    .replace(/½/g, "1/2").replace(/⅓/g, "1/3").replace(/¼/g, "1/4")
    .replace(/¾/g, "3/4").replace(/⅔/g, "2/3")
    .replace(/α/g, "alpha").replace(/β/g, "beta").replace(/γ/g, "gamma")
    .replace(/δ/g, "delta").replace(/λ/g, "lambda").replace(/σ/g, "sigma")
    .replace(/ω/g, "omega").replace(/π/g, "pi").replace(/θ/g, "theta")
    .replace(/φ/g, "phi").replace(/μ/g, "mu").replace(/ρ/g, "rho")
    .replace(/²/g, "2").replace(/³/g, "3").replace(/¹/g, "1")
    .replace(/[^\x20-\x7E]/g, " ")
    .replace(/  +/g, " ")
    .trim();
}

// ─── Markdown stripping ───────────────────────────────────────────────────────

function stripMarkdown(str) {
  if (typeof str !== "string") return "";
  return str
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`[^`]*`/g, "")
    .replace(/(\*\*|__)(.*?)\1/gs, "$2")
    .replace(/(\*|_)(.*?)\1/gs, "$2")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^\s*\|.*\|\s*$/gm, "")
    .replace(/^\s*\|?\s*[-:]+\s*\|[\s|:-]*$/gm, "")
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/^\s*\d+\.\s+/gm, "")
    .replace(/^\s*>\s*/gm, "")
    .replace(/\s+/g, " ")
    .trim();
}

function toPlain(str) {
  return sanitise(stripMarkdown(str));
}

// ─── Answer extraction ────────────────────────────────────────────────────────

function extractAnswer(correctAnswers, blanks) {
  // fill-in-the-blank questions store their answer(s) on blanks[].correctAnswer
  // rather than a top-level correctAnswers field. Assemble them here so the
  // answer part is never silently skipped for this question type.
  if (!correctAnswers && Array.isArray(blanks) && blanks.length > 0) {
    const parts = blanks
      .map((b) => (b && typeof b.correctAnswer === "string" ? toPlain(b.correctAnswer) : null))
      .filter(Boolean);
    if (parts.length === 0) return null;
    // Join multiple blanks with " / " so "Word1 / Word2" reads naturally as a typed answer
    return parts.join(" / ") || null;
  }

  if (!correctAnswers) return null;

  if (typeof correctAnswers === "string") {
    return toPlain(correctAnswers) || null;
  }

  if (Array.isArray(correctAnswers)) {
    const candidates = correctAnswers
      .map((item) => {
        if (typeof item === "string") return toPlain(item);
        if (item && typeof item === "object" && typeof item.text === "string") return toPlain(item.text);
        return null;
      })
      .filter(Boolean);

    if (candidates.length === 0) return null;
    return candidates.sort((a, b) => b.length - a.length)[0];
  }

  if (typeof correctAnswers === "object" && typeof correctAnswers.text === "string") {
    return toPlain(correctAnswers.text) || null;
  }

  return null;
}

// ─── Passage assembly ─────────────────────────────────────────────────────────

const MIN_PART_LENGTH = 15;

function isTypeable(str) {
  if (!str || str.length < MIN_PART_LENGTH) return false;
  const alpha = (str.match(/[a-zA-Z0-9]/g) || []).length;
  return alpha / str.length >= 0.55;
}

function buildPassage(question) {
  if (!question || typeof question !== "object") return null;
  if (question.type === "scenario") return null;

  const rawQ = question.text || question.question || "";
  let qText = toPlain(rawQ);
  qText = qText.replace(/\s*Answer in \w+ word[s]? only\.?\s*$/i, "").trim();
  qText = qText.replace(/\s+Your (discussion|answer) should (include|address)[^.]*\.?.*$/i, ".").trim();
  if (!isTypeable(qText)) return null;

  const answerText = extractAnswer(question.correctAnswers, question.blanks);
  const expText    = toPlain(question.explanation || "");

  // fill-in-the-blank answers are often a single word (e.g. "Contingency",
  // "Velocity") which are well below MIN_PART_LENGTH but still meaningful to
  // type in context. Use a lower floor of 3 chars for answers only, so the
  // student types the correct word after typing the question sentence.
  const MIN_ANSWER_LENGTH = 3;

  const parts = [];
  parts.push({ role: "question", text: qText });
  if (answerText && answerText.length >= MIN_ANSWER_LENGTH && isTypeable(answerText)) {
    parts.push({ role: "answer", text: answerText });
  }
  if (expText && isTypeable(expText)) parts.push({ role: "explanation", text: expText });

  return {
    id:    question.id || Math.random().toString(36).slice(2),
    parts,
  };
}

// ─── Public: extraction ───────────────────────────────────────────────────────

export function extractPassages(questions) {
  if (!Array.isArray(questions) || questions.length === 0) return [];
  return questions.map(buildPassage).filter(Boolean);
}

// ─── Public: mode transformation ─────────────────────────────────────────────
//
// Call this once, after extractPassages(), before passing passages to TypingTest.
// Returns new passage objects with transformed text — does not mutate originals.
//
// Mode definitions:
//
//   "beginner"
//     • All characters lowercased
//     • All punctuation removed except: space  .  ,  !  ?
//       (keeps sentence-ending punctuation so the student knows where to stop,
//        but removes commas and every other symbol for a gentler experience)
//     • Numbers are kept (they're unambiguous to type)
//
//   "intermediate"
//     • Sentence case preserved (no casing change)
//     • Punctuation stripped down to: space  .  ,  !  ?
//     • Numbers kept
//
//   "normal"
//     • No transformation — text is exactly as extracted (sentence case,
//       full punctuation: hyphens, quotes, colons, semicolons, parentheses,
//       slashes, etc.)
//
// Characters kept per mode:
//   beginner:     a-z 0-9 space          (letters + digits only, all lowercase)
//   intermediate: a-z A-Z 0-9 space . , ! ?  (adds safe punctuation, keeps case)
//   normal:       everything from extraction (no transformation)
//
// Inter-word hyphens become a space before stripping in all non-normal modes
// so "self-contained" becomes "self contained" rather than "selfcontained".

const STRIP_ALL_PUNCTUATION   = /[^a-zA-Z0-9 ]/g;
const STRIP_EXTRA_PUNCTUATION = /[^a-zA-Z0-9 .,!?]/g;
const INTER_WORD_HYPHEN       = /(\w)-(\w)/g;

function transformText(text, mode) {
  if (mode === "normal") return text;

  // Replace inter-word hyphens with a space before any stripping
  let t = text.replace(INTER_WORD_HYPHEN, "$1 $2");

  if (mode === "beginner") {
    // Strip everything except letters, digits, and space — no punctuation at all
    t = t.replace(STRIP_ALL_PUNCTUATION, "");
    t = t.replace(/  +/g, " ").trim();
    t = t.toLowerCase();
  } else {
    // intermediate: strip everything except letters, digits, space, and . , ! ?
    t = t.replace(STRIP_EXTRA_PUNCTUATION, "");
    t = t.replace(/  +/g, " ").trim();
    // Sentence case preserved — no casing change
  }

  return t;
}

/**
 * applyMode(passages, mode) → Passage[]
 *
 * @param {Passage[]} passages  - Output of extractPassages()
 * @param {"beginner"|"intermediate"|"normal"} mode
 * @returns {Passage[]} New passage objects with transformed .parts[*].text
 */
export function applyMode(passages, mode) {
  if (mode === "normal") return passages; // fast path — no allocation needed

  return passages.map((passage) => ({
    ...passage,
    parts: passage.parts.map((part) => ({
      ...part,
      text: transformText(part.text, mode),
    })),
  }));
}

// ─── Public: shuffle ──────────────────────────────────────────────────────────

export function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ─── Public: mode metadata ────────────────────────────────────────────────────
// Used by TypingSetup to render the difficulty options without duplicating labels.

export const TYPING_MODES = [
  {
    id:          "beginner",
    label:       "Beginner",
    description: "Lowercase, no punctuation",
    detail:      "Letters and numbers only, all lowercase. No punctuation keys at all — ideal for building raw speed without worrying about shift or symbols.",
  },
  {
    id:          "intermediate",
    label:       "Intermediate",
    description: "Sentence case, basic punctuation",
    detail:      "Capitalisation is back — you'll use shift for sentence starts and proper nouns. Only . , ! ? are kept; everything else is stripped.",
  },
  {
    id:          "normal",
    label:       "Normal",
    description: "Full text, all punctuation",
    detail:      "The complete extracted text: sentence case, hyphens, colons, quotes, parentheses — everything. Closest to real exam writing.",
  },
];
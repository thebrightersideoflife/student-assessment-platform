// src/constants/typingRoles.js
//
// Was defined identically in both TypingDisplay.jsx and UnitTypingDisplay.jsx.
// Single source of truth now — both import from here.

export const ROLE_META = {
  question:    { label: "Question",    color: "var(--vibrant-cyan)"  },
  answer:      { label: "Answer",      color: "var(--lush-lime)"     },
  explanation: { label: "Explanation", color: "var(--golden-amber)"  },
};
// src/utils/typingCompare.js
//
// buildJoinedTarget (typingExtractor.js) stitches passage parts together
// with a literal "\n" — but wherever that joined target gets RENDERED,
// default CSS white-space handling collapses that boundary character
// visually into an ordinary space. The player sees a space there and
// naturally types a spacebar, so any character-by-character comparison
// against the raw target (correct/incorrect coloring, the error-streak
// cap, scoring) needs to compare against what's actually displayed, not
// the literal separator — otherwise a correctly-typed space at that
// boundary reads as permanently wrong.
//
// This was previously patched independently in both CompetitionTypingTest
// (for scoring/exceedsErrorCap) and CompetitionDisplay (for per-character
// coloring) as a "1-for-1 swap, scoped to this file only" — same fix,
// written twice, with a comment in each warning that a third consumer of
// buildJoinedTarget would need to remember to add it a third time. Pulled
// into one function so there's a single source of truth instead.
//
// This is ONLY for comparison purposes (correct/incorrect checks, error
// scanning). It must never be used for anything involving actual
// line-break/page-flip layout or the real joined string sent to
// onFinish/storage — those still need the literal "\n" boundaries.
export function toComparable(target) {
  return target.replace(/\n/g, " ");
}
// src/utils/typingScoring.js
//
// The per-second WPM-snapshot formula and the consecutive-error input cap
// were implemented identically (copy-pasted) in both TypingTest.jsx and
// UnitTypingTest.jsx. Extracted here so a future tuning change (e.g. the
// error-streak threshold, or the wpm formula itself) only has to happen
// once and can't silently drift between the two engines.

export const MAX_ERRORS = 10;

/**
 * buildSnapshot(...) → Snapshot
 *
 * wpm   — CUMULATIVE average over the whole session so far (smooth,
 *         trends gently). This is a real running average, not a
 *         moving-average filter layered on top of noisy per-second data.
 * burst — LOCAL MOMENTARY rate: just this one second's correct keystrokes,
 *         extrapolated to a per-minute rate. Genuinely noisy by design —
 *         mirrors MonkeyType's own "burst" stat, which drops toward 0 if
 *         typing pauses for a second.
 */
export function buildSnapshot({ elapsedSeconds, correctChars, incorrectChars, windowCorrectChars }) {
  const cumulativeWpm = elapsedSeconds > 0
    ? Math.round((correctChars / 5) / (elapsedSeconds / 60))
    : 0;
  const burstWpm = Math.round((windowCorrectChars / 5) * 60);

  return {
    second: elapsedSeconds,
    wpm:    cumulativeWpm,
    burst:  burstWpm,
    errors: incorrectChars,
  };
}

/**
 * exceedsErrorCap(value, target) → boolean
 *
 * Scans the newly-typed value against the target string and returns true
 * once a run of MAX_ERRORS consecutive wrong characters is found — the
 * signal to block further input until the user backspaces. A single
 * correct character resets the streak.
 */
export function exceedsErrorCap(value, target) {
  let errorStreak = 0;
  for (let i = 0; i < value.length && i < target.length; i++) {
    if (value[i] !== target[i]) errorStreak++;
    else errorStreak = 0; // reset on any correct character
  }
  return errorStreak >= MAX_ERRORS;
}
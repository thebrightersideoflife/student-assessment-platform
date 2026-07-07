// src/utils/typingDuration.js
//
// Custom-duration validation (10-3600s bounds) and the "Xm Ys" / "X min" /
// "Xs" label format were both implemented independently in TypingSetup.jsx's
// DurationSelect and in TypingPracticeSettingsModal.jsx. Single source of
// truth now.

export const MIN_DURATION_SECONDS = 10;
export const MAX_DURATION_SECONDS = 3600;

/**
 * validateDuration(rawInput) → { valid: true, seconds } | { valid: false, error }
 *
 * rawInput is the raw string from a custom-seconds text field. Empty/
 * whitespace-only input is treated as invalid (callers that want to treat
 * "no custom value entered" as "use the preset instead" should check that
 * before calling this, not rely on this function for that distinction).
 */
export function validateDuration(rawInput) {
  const seconds = parseInt(rawInput, 10);

  if (!String(rawInput ?? "").trim() || isNaN(seconds) || seconds < MIN_DURATION_SECONDS) {
    return { valid: false, error: `Minimum is ${MIN_DURATION_SECONDS} seconds.` };
  }
  if (seconds > MAX_DURATION_SECONDS) {
    return { valid: false, error: `Maximum is ${MAX_DURATION_SECONDS} seconds (1 hour).` };
  }
  return { valid: true, seconds };
}

/**
 * formatDurationLabel(seconds) → "90s" | "2 min" | "2m 30s"
 */
export function formatDurationLabel(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs    = seconds % 60;
  if (minutes <= 0) return `${seconds}s`;
  return secs > 0 ? `${minutes}m ${secs}s` : `${minutes} min`;
}
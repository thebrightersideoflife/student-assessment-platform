import { useState, useEffect, useRef, useCallback } from "react";

/**
 * useCountdownTimer
 *
 * Custom hook that owns all countdown timer logic.
 * Persists remaining time to sessionStorage on every tick so a page refresh
 * restores the session mid-assessment.  Closing the tab clears sessionStorage,
 * mirroring real exam behaviour.
 *
 * @param {object} options
 * @param {number}   options.duration    — time limit in minutes
 * @param {boolean}  options.enabled     — false = hook is dormant (practice mode)
 * @param {string}   options.sessionKey  — e.g. "timer_ITNSA_4"
 * @param {function} options.onExpire    — called once when the timer hits 0
 *
 * @returns {{ timeRemaining: number, isRunning: boolean, hasExpired: boolean }}
 *   timeRemaining — seconds remaining (integer)
 *   isRunning     — true while counting down
 *   hasExpired    — true once it hits 0 (stays true)
 */
export default function useCountdownTimer({ duration, enabled, sessionKey, onExpire }) {
  // Derive the initial value:
  //   1. If sessionStorage has a saved value for this key, restore it.
  //   2. Otherwise start from duration × 60.
  const [timeRemaining, setTimeRemaining] = useState(() => {
    if (!enabled) return duration * 60;
    try {
      const saved = sessionStorage.getItem(sessionKey);
      if (saved !== null) {
        const parsed = parseInt(saved, 10);
        if (!isNaN(parsed) && parsed >= 0) return parsed;
      }
    } catch (_) {
      // sessionStorage unavailable (private browsing edge cases)
    }
    return duration * 60;
  });

  const [isRunning, setIsRunning] = useState(enabled && timeRemaining > 0);
  const [hasExpired, setHasExpired] = useState(false);

  // Keep onExpire stable so the interval closure doesn't go stale
  const onExpireRef = useRef(onExpire);
  useEffect(() => { onExpireRef.current = onExpire; }, [onExpire]);

  // Main tick effect — only runs when enabled
  useEffect(() => {
    if (!enabled || timeRemaining <= 0) return;

    setIsRunning(true);

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        const next = prev - 1;

        // Persist to sessionStorage every tick
        try {
          sessionStorage.setItem(sessionKey, String(next));
        } catch (_) {}

        if (next <= 0) {
          clearInterval(interval);
          setIsRunning(false);
          setHasExpired(true);
          // Fire the expiry callback on the next microtask so React state
          // has settled before AssessmentPage's submit handler runs
          Promise.resolve().then(() => onExpireRef.current?.());
          return 0;
        }

        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
    // Re-run only if enabled flips or the session key changes.
    // timeRemaining is intentionally excluded — the interval manages its own state.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, sessionKey]);

  // Clean up sessionStorage on unmount (assessment submitted or navigated away)
  const clear = useCallback(() => {
    try { sessionStorage.removeItem(sessionKey); } catch (_) {}
  }, [sessionKey]);

  useEffect(() => {
    return () => {
      // Only remove if expired or disabled — leave it if the student just refreshes
      if (hasExpired) clear();
    };
  }, [hasExpired, clear]);

  return { timeRemaining, isRunning, hasExpired };
}
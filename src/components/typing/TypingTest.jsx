// src/components/typing/TypingTest.jsx
// Core typing engine for the passage-based flow.
//
// A "passage" has parts: [question, answer?, explanation?]
// The user types each part in sequence. When a part is done, the next part
// appears automatically. When all parts in a passage are done, the next
// passage loads. Timer starts on first keystroke.
//
// ── Idle detection ────────────────────────────────────────────────────────
// After the test has started, if no key is pressed for IDLE_TIMEOUT_MS
// (5 seconds), the main countdown timer pauses and the text blurs.
// Any keystroke resumes both. The idle timeout resets on every keystroke
// so it only fires after a genuine gap in typing.

import { useState, useEffect, useRef, useCallback } from "react";
import TypingDisplay from "./TypingDisplay";

const IDLE_TIMEOUT_MS = 5000;

export default function TypingTest({ passages, duration, onFinish }) {
  // ── Passage + part position ───────────────────────────────────────────────
  const [passageIndex, setPassageIndex] = useState(0);
  const [partIndex,    setPartIndex]    = useState(0);
  const [typed,        setTyped]        = useState("");

  // ── Timer ─────────────────────────────────────────────────────────────────
  const [secondsLeft, setSecondsLeft] = useState(duration.seconds);
  const [started,     setStarted]     = useState(false);

  // ── Idle / paused state ───────────────────────────────────────────────────
  const [isPaused, setIsPaused] = useState(false);

  // ── Per-second snapshots for the results chart ────────────────────────────
  const [snapshots, setSnapshots] = useState([]);

  // ── All cumulative stats in refs — avoids stale-closure issues in timer ──
  const correctCharsRef   = useRef(0);
  const incorrectCharsRef = useRef(0);
  const charErrorsRef     = useRef({});
  const completedPartsRef = useRef(0);
  const passagesCompRef   = useRef(0);
  const elapsedRef        = useRef(0);
  const secondWindowRef   = useRef(0);

  // Refs for values needed inside timer / handleChange closures
  const passagesRef   = useRef(passages);
  const passageIdxRef = useRef(0);
  const partIdxRef    = useRef(0);
  const typedRef      = useRef("");
  const snapshotsRef  = useRef([]);
  const timerRef      = useRef(null);
  const inputRef      = useRef(null);

  // Idle refs — isPausedRef mirrors state so the timer interval can read it
  // without being in its dependency array (which would restart it on every pause)
  const isPausedRef   = useRef(false);
  const idleTimerRef  = useRef(null);

  // ── Inter-part spacebar forgiveness ───────────────────────────────────────
  // Set to true immediately after a part/passage advances. The next onChange
  // event will silently absorb one leading space (the user's habitual
  // between-paragraph spacebar) without scoring it as an error. If the very
  // next character is not a space the flag is cleared immediately — no space
  // is ever *required*, the forgiveness only prevents a penalty.
  const absorbSpaceRef = useRef(false);

  useEffect(() => { passagesRef.current  = passages;  }, [passages]);
  useEffect(() => { snapshotsRef.current = snapshots; }, [snapshots]);

  // ── Focus on mount ────────────────────────────────────────────────────────
  useEffect(() => { inputRef.current?.focus(); }, []);

  // ── Idle helpers ──────────────────────────────────────────────────────────

  const triggerPause = useCallback(() => {
    isPausedRef.current = true;
    setIsPaused(true);
  }, []);

  const triggerResume = useCallback(() => {
    isPausedRef.current = false;
    setIsPaused(false);
    inputRef.current?.focus();
  }, []);

  // Resets the 5-second idle countdown. Called on every keystroke.
  const resetIdleTimer = useCallback(() => {
    clearTimeout(idleTimerRef.current);
    // Only arm the idle timer once the test is underway
    if (!isPausedRef.current) {
      idleTimerRef.current = setTimeout(triggerPause, IDLE_TIMEOUT_MS);
    }
  }, [triggerPause]);

  // Clean up idle timer on unmount
  useEffect(() => () => clearTimeout(idleTimerRef.current), []);

  // ── Finish helper ─────────────────────────────────────────────────────────
  const fireFinish = useCallback((elapsed) => {
    clearInterval(timerRef.current);
    clearTimeout(idleTimerRef.current);
    onFinish({
      correctChars:      correctCharsRef.current,
      incorrectChars:    incorrectCharsRef.current,
      completedParts:    completedPartsRef.current,
      completedPassages: passagesCompRef.current,
      elapsedSeconds:    elapsed,
      snapshots:         snapshotsRef.current,
      charErrors:        charErrorsRef.current,
    });
  }, [onFinish]);

  // ── Main countdown timer ──────────────────────────────────────────────────
  // The interval keeps running — it just skips the tick when paused.
  // This avoids the drift that comes from clearing/restarting the interval.
  useEffect(() => {
    if (!started) return;

    timerRef.current = setInterval(() => {
      // Skip this tick entirely when idle-paused
      if (isPausedRef.current) return;

      elapsedRef.current += 1;

      // Two distinct WPM values per second, matching MonkeyType's actual
      // model (confirmed against their own docs/source):
      //   wpm   — GLOBAL CUMULATIVE average: correct chars typed so far,
      //           normalised to elapsed non-paused time. Smooth by
      //           construction — it's an average over everything typed up
      //           to this point, not a snapshot of one second.
      //   burst — LOCAL MOMENTARY value: just this second's correct
      //           keystrokes, extrapolated to a per-minute rate. Genuinely
      //           noisy by design; MonkeyType's own docs note this drops
      //           toward 0 if typing pauses for a second.
      // (Previously only the noisy per-second value existed, with a
      // moving-average filter layered on top of it elsewhere to fake
      // smoothness — a different computation from MonkeyType's real
      // cumulative average, which is why that line ended up looking flat
      // instead of gently trending like the real thing.)
      const cumulativeWpm = elapsedRef.current > 0
        ? Math.round((correctCharsRef.current / 5) / (elapsedRef.current / 60))
        : 0;
      const burstWpm = Math.round((secondWindowRef.current / 5) * 60);
      secondWindowRef.current = 0;

      const snap = {
        second: elapsedRef.current,
        wpm:    cumulativeWpm,
        burst:  burstWpm,
        errors: incorrectCharsRef.current,
      };
      setSnapshots((prev) => {
        const next = [...prev, snap];
        snapshotsRef.current = next;
        return next;
      });

      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setTimeout(() => fireFinish(duration.seconds), 0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [started, duration.seconds, fireFinish]);

  // ── Input handler ─────────────────────────────────────────────────────────
  const handleChange = useCallback((e) => {
    const value = e.target.value;

    // First keystroke starts the test
    if (!started && value.length > 0) setStarted(true);

    // Any keystroke while paused → resume first, then process the character
    if (isPausedRef.current) {
      triggerResume();
      // Arm the idle timer from this point
      idleTimerRef.current = setTimeout(triggerPause, IDLE_TIMEOUT_MS);
    } else {
      // Reset idle countdown on every keystroke
      resetIdleTimer();
    }

    const currentPassage = passagesRef.current[passageIdxRef.current];
    if (!currentPassage) return;
    const currentPart = currentPassage.parts[partIdxRef.current];
    if (!currentPart) return;
    const target = currentPart.text;
    const prev   = typedRef.current;

    // ── Inter-part spacebar forgiveness ──────────────────────────────────
    // If the user reflexively hit space between parts/passages, absorb it
    // silently — no error, no character added to typed. If they skipped the
    // space and went straight into the next word, clear the flag so normal
    // scoring resumes from the first character.
    if (absorbSpaceRef.current) {
      absorbSpaceRef.current = false;
      if (value === " ") {
        // Swallow the space: keep typed as "" and do not score
        typedRef.current = "";
        setTyped("");
        return;
      }
      // Not a space — fall through and score normally from here
    }

    // ── Error cap — block further input when too many consecutive errors ────
    // Count how many trailing characters in `value` are wrong. If the streak
    // has hit MAX_ERRORS the user must backspace before they can type more.
    // This matches MonkeyType / Keybr behaviour and prevents mindlessly
    // hammering through an entire wrong word without backspacing.
    const MAX_ERRORS = 10;
    if (value.length > prev.length) {
      let errorStreak = 0;
      for (let i = 0; i < value.length && i < target.length; i++) {
        if (value[i] !== target[i]) errorStreak++;
        else errorStreak = 0; // reset on any correct character
      }
      if (errorStreak >= MAX_ERRORS) {
        // Reject the keystroke — restore previous value without scoring
        typedRef.current = prev;
        setTyped(prev);
        return;
      }
    }

    // ── Count new character accuracy ──────────────────────────────────────
    if (value.length > prev.length) {
      const idx = value.length - 1;
      if (idx < target.length) {
        if (value[idx] === target[idx]) {
          correctCharsRef.current += 1;
          secondWindowRef.current += 1;
        } else {
          incorrectCharsRef.current += 1;
          const expected = target[idx];
          charErrorsRef.current[expected] = (charErrorsRef.current[expected] || 0) + 1;
        }
      }
    }

    // ── Advance on length match ───────────────────────────────────────────
    if (value.length >= target.length) {
      completedPartsRef.current += 1;

      const passage  = passagesRef.current[passageIdxRef.current];
      const nextPart = partIdxRef.current + 1;

      if (nextPart < passage.parts.length) {
        partIdxRef.current = nextPart;
        setPartIndex(nextPart);
      } else {
        passagesCompRef.current += 1;
        const isLastPassage = passageIdxRef.current + 1 >= passagesRef.current.length;

        if (isLastPassage) {
          // Re-shuffle the pool before wrapping so the next cycle is a
          // fresh order — prevents the same sequence repeating endlessly
          // within a single session.
          const shuffled = [...passagesRef.current].sort(() => Math.random() - 0.5);
          passagesRef.current = shuffled;
          passageIdxRef.current = 0;
        } else {
          passageIdxRef.current = passageIdxRef.current + 1;
        }

        partIdxRef.current = 0;
        setPassageIndex(passageIdxRef.current);
        setPartIndex(0);
      }

      absorbSpaceRef.current = true; // forgive one leading space on the next part
      typedRef.current = "";
      setTyped("");
      return;
    }

    typedRef.current = value;
    setTyped(value);
  }, [started, triggerResume, triggerPause, resetIdleTimer]);

  // ── End early ─────────────────────────────────────────────────────────────
  const handleEndEarly = useCallback(() => {
    fireFinish(Math.max(duration.seconds - secondsLeft, 1));
  }, [fireFinish, duration.seconds, secondsLeft]);

  // ── Skip passage ──────────────────────────────────────────────────────────
  const handleSkip = useCallback(() => {
    const nextPassage = passageIdxRef.current + 1 < passagesRef.current.length
      ? passageIdxRef.current + 1
      : 0;
    passageIdxRef.current = nextPassage;
    partIdxRef.current    = 0;
    typedRef.current      = "";
    setPassageIndex(nextPassage);
    setPartIndex(0);
    setTyped("");
    setTimeout(() => inputRef.current?.focus(), 0);
  }, []);

  const currentPassage = passages[passageIndex] || passages[0];
  const currentPart    = currentPassage?.parts[partIndex];
  const totalParts     = currentPassage?.parts.length ?? 1;

  if (!currentPart) return null;

  return (
    <div>
      {/* ── Countdown ────────────────────────────────────────────── */}
      {started && (
        <div style={{
          fontSize:           "32px",
          fontWeight:         700,
          fontVariantNumeric: "tabular-nums",
          color:              secondsLeft <= 15 && !isPaused
                                ? "var(--poppy-red)"
                                : "var(--text-secondary)",
          marginBottom:       "18px",
          transition:         "color 0.3s ease",
          display:            "flex",
          alignItems:         "center",
          gap:                "10px",
        }}>
          {secondsLeft}
          {/* Paused indicator next to the number */}
          {isPaused && (
            <span style={{
              fontSize:      "13px",
              fontWeight:    700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color:         "var(--golden-amber)",
              padding:       "3px 10px",
              borderRadius:  "4px",
              border:        "1px solid var(--golden-amber)",
              opacity:       0.9,
            }}>
              paused
            </span>
          )}
        </div>
      )}

      {/* ── Typing display + idle overlay ────────────────────────── */}
      <div
        style={{ cursor: "text", position: "relative" }}
        onClick={() => {
          if (isPaused) triggerResume();
          else inputRef.current?.focus();
        }}
      >
        <TypingDisplay
          target={currentPart.text}
          typed={typed}
          role={currentPart.role}
          partIndex={partIndex}
          totalParts={totalParts}
          onSkip={handleSkip}
          isPaused={isPaused}
          blankHighlights={currentPart.blankHighlights}
        />

        {/* Idle overlay — sits over the card when paused */}
        {isPaused && (
          <div style={{
            position:       "absolute",
            inset:          0,
            borderRadius:   "14px",
            display:        "flex",
            flexDirection:  "column",
            alignItems:     "center",
            justifyContent: "center",
            gap:            "10px",
            // Frosted glass matching .card recipe
            background:     "rgba(var(--bg-card-rgb), 0.72)",
            backdropFilter: "blur(12px) saturate(160%)",
            WebkitBackdropFilter: "blur(12px) saturate(160%)",
            border:         "1px solid rgba(var(--border-color-rgb), 0.45)",
            cursor:         "pointer",
            zIndex:         10,
          }}>
            {/* Pause icon */}
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
              stroke="var(--text-secondary)" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round"
              style={{ opacity: 0.6 }}>
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
            <p style={{
              margin:        0,
              fontSize:      "15px",
              fontWeight:    600,
              color:         "var(--text-primary)",
            }}>
              Timer paused
            </p>
            <p style={{
              margin:        0,
              fontSize:      "13px",
              color:         "var(--text-secondary)",
              textAlign:     "center",
              lineHeight:    1.5,
            }}>
              Press any key or click here to resume
            </p>
          </div>
        )}
      </div>

      {/* Hidden textarea */}
      <textarea
        ref={inputRef}
        value={typed}
        onChange={handleChange}
        onPaste={(e) => e.preventDefault()}
        rows={1}
        aria-label="Type here"
        style={{
          position:      "absolute",
          left:          "-9999px",
          top:           0,
          opacity:       0,
          pointerEvents: "none",
          resize:        "none",
        }}
      />

      {/* ── End early ────────────────────────────────────────────── */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "28px" }}>
        <button
          className="button"
          onClick={handleEndEarly}
          style={{ fontSize: "13px", padding: "8px 20px", opacity: 0.65 }}
        >
          End test early
        </button>
      </div>
    </div>
  );
}
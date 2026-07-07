// src/components/typing/UnitTypingTest.jsx
// Untimed engine for "Unit Typing": the student types one whole unit
// (question → answer → explanation) as a single continuous piece of text,
// moving from part to part with a real Enter keystroke. No countdown, no
// auto-advance to a new passage — finishing the unit finishes the test.
//
// Mirrors TypingTest's scoring/statistics logic (character-by-character
// correctness, WPM snapshots every second, error-streak cap) so results
// stay comparable between the two modes, but drops everything that only
// makes sense with a countdown: the timer display, idle-pause auto-blur,
// and passage-to-passage auto-advance.

import { useState, useEffect, useRef, useCallback } from "react";
import UnitTypingDisplay from "./UnitTypingDisplay";
import { buildSnapshot, exceedsErrorCap } from "../../utils/typingScoring";

// Builds the joined target string + per-part boundary offsets from a
// passage's parts. Parts are separated by a single "\n" — one Enter
// keystroke moves the student from one part into the next.
function buildTarget(passage) {
  let cursor = 0;
  const boundaries = [];
  const pieces = [];

  passage.parts.forEach((part, i) => {
    const start = cursor;
    pieces.push(part.text);
    cursor += part.text.length;
    boundaries.push({ role: part.role, start, end: cursor, blankHighlights: part.blankHighlights || [] });
    if (i < passage.parts.length - 1) {
      pieces.push("\n");
      cursor += 1;
    }
  });

  return { target: pieces.join(""), boundaries };
}

export default function UnitTypingTest({ passage, onFinish, onFirstAttempt, onGiveUp }) {
  const { target, boundaries } = buildTarget(passage);

  // Combine every part's blankHighlights into one target-space array so
  // UnitTypingDisplay can highlight them regardless of which block they're in.
  const blankHighlights = boundaries.flatMap((b) => b.blankHighlights || []);

  const [typed,   setTyped]   = useState("");
  const [started, setStarted] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [snapshots, setSnapshots] = useState([]);

  const correctCharsRef   = useRef(0);
  const incorrectCharsRef = useRef(0);
  const charErrorsRef     = useRef({});
  const typedRef          = useRef("");
  const elapsedRef        = useRef(0);
  const secondWindowRef   = useRef(0);
  const snapshotsRef      = useRef([]);
  const timerRef          = useRef(null);
  const inputRef          = useRef(null);

  useEffect(() => { inputRef.current?.focus({ preventScroll: true }); }, []);

  // ── Stopwatch — counts up, no countdown, starts on first keystroke ───────
  useEffect(() => {
    if (!started) return;
    timerRef.current = setInterval(() => {
      elapsedRef.current += 1;
      setElapsedSeconds(elapsedRef.current);

      const snap = buildSnapshot({
        elapsedSeconds:      elapsedRef.current,
        correctChars:        correctCharsRef.current,
        incorrectChars:      incorrectCharsRef.current,
        windowCorrectChars:  secondWindowRef.current,
      });
      secondWindowRef.current = 0;

      setSnapshots((prev) => {
        const next = [...prev, snap];
        snapshotsRef.current = next;
        return next;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [started]);

  const fireFinish = useCallback((elapsed) => {
    clearInterval(timerRef.current);
    onFinish({
      correctChars:      correctCharsRef.current,
      incorrectChars:    incorrectCharsRef.current,
      completedParts:    passage.parts.length,
      completedPassages: 1,
      elapsedSeconds:    Math.max(elapsed, 1),
      snapshots:         snapshotsRef.current,
      charErrors:        charErrorsRef.current,
    });
  }, [onFinish, passage.parts.length]);

  const handleChange = useCallback((e) => {
    const value = e.target.value;

    if (!started && value.length > 0) {
      setStarted(true);
      onFirstAttempt?.();
    }

    const prev = typedRef.current;

    // ── Error cap — block further input past a long wrong streak ──────────
    if (value.length > prev.length && exceedsErrorCap(value, target)) {
      typedRef.current = prev;
      setTyped(prev);
      return;
    }

    // ── Score the newest character ─────────────────────────────────────────
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

    typedRef.current = value;
    setTyped(value);

    // ── Finished the whole unit ─────────────────────────────────────────────
    if (value.length >= target.length) {
      fireFinish(elapsedRef.current);
    }
  }, [started, target, onFirstAttempt, fireFinish]);

  const handleGiveUp = useCallback(() => {
    if (onGiveUp) { onGiveUp(); return; }
    fireFinish(elapsedRef.current);
  }, [fireFinish, onGiveUp]);

  return (
    <div>
      {/* ── Elapsed time (counts up, no pressure) ─────────────────────── */}
      {started && (
        <div style={{
          fontSize:           "22px",
          fontWeight:         700,
          fontVariantNumeric: "tabular-nums",
          color:              "var(--text-secondary)",
          marginBottom:       "18px",
          display:            "flex",
          alignItems:         "center",
          gap:                "10px",
        }}>
          {String(Math.floor(elapsedSeconds / 60)).padStart(2, "0")}:{String(elapsedSeconds % 60).padStart(2, "0")}
          <span style={{
            fontSize:      "11px",
            fontWeight:    700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color:         "var(--text-secondary)",
            opacity:       0.6,
          }}>
            go at your own pace
          </span>
        </div>
      )}

      <div
        style={{ cursor: "text" }}
        onClick={() => inputRef.current?.focus({ preventScroll: true })}
      >
        <UnitTypingDisplay
          target={target}
          typed={typed}
          boundaries={boundaries}
          blankHighlights={blankHighlights}
        />
      </div>

      {/* Hidden textarea — real newlines flow through when Enter is pressed */}
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

      <div style={{ display: "flex", justifyContent: "center", marginTop: "28px" }}>
        <button
          className="button"
          onClick={handleGiveUp}
          style={{ fontSize: "13px", padding: "8px 20px", opacity: 0.65 }}
        >
          Finish now
        </button>
      </div>
    </div>
  );
}
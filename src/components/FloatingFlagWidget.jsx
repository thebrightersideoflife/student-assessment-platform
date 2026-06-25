/**
 * FloatingFlagWidget
 *
 * A fixed-position indicator for flagged questions — stacks directly above
 * FloatingProgressRing (bottom-left), following the same glass-morphism
 * language as FloatingTimer/FloatingProgressRing.
 *
 * Replaces the old "Flagged for review" list that lived next to the
 * progress bar near the top of the page — that list was easy to lose track
 * of once you'd scrolled past it. This stays in view the whole time.
 *
 * Behaviour:
 *   0 flagged   — renders nothing
 *   1 flagged   — a small pill, click navigates straight to that question
 *   2+ flagged  — click toggles a dropdown that opens UPWARD (the widget
 *                 sits at the bottom of the viewport, so a normal downward
 *                 dropdown would either clip off-screen or sit on top of
 *                 the progress ring beneath it)
 *
 * Props:
 *   flaggedQuestions   array   — question objects currently flagged
 *   displayNumberById  object  — { [questionId]: displayNumber }, the same
 *                                1-based numbering shown on each question's
 *                                own card. Must come from the SAME counting
 *                                pass the question list itself renders with
 *                                (i.e. every non-scenario question counts,
 *                                including show-answer/essay questions) — a
 *                                gradable-only index would drift out of sync
 *                                whenever a show-answer question sits before
 *                                a flagged one.
 *   onNavigate         function(question) — called when an entry is clicked
 */
import { useState, useRef, useEffect } from "react";
import { FlagIcon } from "./AssessmentIcons";

export default function FloatingFlagWidget({
  flaggedQuestions = [],
  displayNumberById = {},
  onNavigate,
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  // Close the dropdown if the student clicks anywhere outside it.
  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // Close automatically if the last flagged question gets unflagged elsewhere.
  useEffect(() => {
    if (flaggedQuestions.length < 2) setOpen(false);
  }, [flaggedQuestions.length]);

  if (flaggedQuestions.length === 0) return null;

  const displayNumberFor = (q) => displayNumberById[q.id] ?? "?";

  function handleEntryClick(q) {
    setOpen(false);
    onNavigate?.(q);
  }

  const isSingle = flaggedQuestions.length === 1;

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        bottom: "92px",   // 24px ring base + 56px ring height + 12px gap
        left: "24px",
        zIndex: 9999,
      }}
    >
      {/* Dropdown — opens UPWARD, anchored above the trigger */}
      {!isSingle && open && (
        <div
          style={{
            position: "absolute",
            bottom: "calc(100% + 10px)",
            left: 0,
            minWidth: "220px",
            maxHeight: "260px",
            overflowY: "auto",

            // Theme-aware surface — matches .card's own background recipe
            // (rgba(var(--bg-card-rgb), X)) instead of a hardcoded dark
            // colour. The previous hardcoded rgba(20,20,24,0.85) happened to
            // look fine in dark mode by coincidence (dark mode's
            // --bg-card-rgb is 26,34,54, a similar near-black) but stayed
            // dark in light mode regardless of the active theme, which is
            // what made this dropdown the one part of the page that didn't
            // follow light mode.
            background: "rgba(var(--bg-card-rgb), 0.92)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            border: "1px solid rgba(244,169,0,0.35)",
            borderRadius: "12px",
            padding: "8px",
          }}
        >
          <p style={{
            fontSize: "11px", fontWeight: 700, letterSpacing: "0.05em",
            textTransform: "uppercase", color: "var(--golden-amber)",
            margin: "2px 6px 8px", display: "flex", alignItems: "center", gap: "5px",
          }}>
            <FlagIcon /> Flagged for review
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {flaggedQuestions.map((q) => {
              const displayNum = displayNumberFor(q);
              return (
                <button
                  key={q.id}
                  onClick={() => handleEntryClick(q)}
                  style={{
                    textAlign: "left",
                    fontSize: "13px", fontWeight: 600,
                    color: "var(--text-primary)",
                    background: "rgba(244,169,0,0.08)",
                    border: "1px solid rgba(244,169,0,0.25)",
                    borderRadius: "8px",
                    padding: "8px 10px",
                    cursor: "pointer",
                    transition: "background 0.14s ease, border-color 0.14s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(244,169,0,0.18)";
                    e.currentTarget.style.borderColor = "rgba(244,169,0,0.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(244,169,0,0.08)";
                    e.currentTarget.style.borderColor = "rgba(244,169,0,0.25)";
                  }}
                  title="Jump to this question"
                >
                  Question {displayNum}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Trigger — single flagged question navigates directly,
          multiple flagged toggles the dropdown above */}
      <button
        onClick={() => {
          if (isSingle) {
            onNavigate?.(flaggedQuestions[0]);
          } else {
            setOpen((prev) => !prev);
          }
        }}
        title={
          isSingle
            ? `Jump to flagged Question ${displayNumberFor(flaggedQuestions[0])}`
            : `${flaggedQuestions.length} flagged questions`
        }
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          height: "36px",
          padding: "0 14px",

          background: "rgba(244,169,0,0.14)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(244,169,0,0.45)",
          borderRadius: "999px",

          color: "var(--golden-amber)",
          fontSize: "13px",
          fontWeight: 700,
          letterSpacing: "0.01em",
          cursor: "pointer",
          transition: "background 0.2s ease, transform 0.15s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(244,169,0,0.22)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(244,169,0,0.14)";
        }}
      >
        <FlagIcon />
        {isSingle
          ? `Q${displayNumberFor(flaggedQuestions[0])} flagged`
          : `${flaggedQuestions.length} flagged`}
        {!isSingle && (
          <span style={{
            fontSize: "10px",
            opacity: 0.8,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
            marginLeft: "2px",
          }}>
            ▲
          </span>
        )}
      </button>
    </div>
  );
}
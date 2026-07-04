// src/components/typing/UnitTypingDisplay.jsx
// Renders an entire unit (question → answer → explanation) TOGETHER, as one
// continuous piece of text the student types top to bottom at their own pace.
//
// This is deliberately different from TypingDisplay (used by the timed
// flow): TypingDisplay shows one part at a time inside a fixed-height
// rolling viewport with a countdown-driven auto-advance. Here there is no
// timer and no auto-advance — every part is visible up front, stacked with
// a role label above each, and the student moves from one part to the next
// by pressing Enter (a real newline character between parts in the target
// string).
//
// `target` is the full joined string: parts[0].text + "\n" + parts[1].text + ...
// `typed` is whatever the student has typed so far, including any "\n"
// characters from real Enter presses.
// `boundaries` is an array of { role, start, end } describing which slice of
// `target` belongs to which part, so each part can get its own label and
// its own highlight styling without re-deriving offsets here.
//
// ── Scroll behaviour ─────────────────────────────────────────────────────────
// Previously this called caretRef.scrollIntoView({ block: "center" }) on
// every keystroke. That caused a jarring bug: if the student scrolled the
// *page* down themselves to preview upcoming text, the caret itself hadn't
// moved yet (it only advances when they type) — so the very next keystroke
// re-centred the viewport back on that still-near-the-top caret position,
// snapping the page back up out from under them.
//
// Fix: borrow TypingDisplay's fixed-viewport approach instead of scrolling
// the page at all. The card is a fixed-height, overflow:hidden window, and
// the content inside is shifted upward via CSS transform as the caret moves
// down — the passage scrolls itself, so there's nothing for the student to
// manually scroll (and nothing for a keystroke to snap back to). Unlike
// TypingDisplay (one block, uniform line-height, so it can quantize into
// discrete lines) Unit Typing spans multiple role blocks with headers and
// margins between them, so instead of quantizing into lines we work
// directly in measured pixels: once the caret's offset passes
// SCROLL_FRACTION of the viewport height, the block shifts up by exactly
// that overflow so the caret settles back at that same fraction. Deleting
// characters naturally reverses the shift as the caret's offset drops.

import { useEffect, useLayoutEffect, useRef, useState } from "react";

const ROLE_META = {
  question:    { label: "Question",    color: "var(--vibrant-cyan)"  },
  answer:      { label: "Answer",      color: "var(--lush-lime)"     },
  explanation: { label: "Explanation", color: "var(--golden-amber)"  },
};

const VIEWPORT_HEIGHT = 420; // px shown at once when content overflows
const SCROLL_FRACTION = 0.5; // keep the caret at/above this fraction of the viewport

export default function UnitTypingDisplay({ target, typed, boundaries, isPaused, blankHighlights = [] }) {
  const chars = target.split("");

  // ── Refs ────────────────────────────────────────────────────────────────────
  const containerRef = useRef(null); // inner content wrapper — this is what gets translated
  const caretRef      = useRef(null); // whichever element currently represents the caret

  // ── State ───────────────────────────────────────────────────────────────────
  const [translateY, setTranslateY] = useState(0);
  const [contentH,   setContentH]   = useState(0); // measured full content height

  // Measure full content height so short units render at their natural
  // size instead of reserving a tall, mostly-empty viewport. Runs on every
  // render (font-size is clamp() and can shift on viewport resize), same
  // pattern as TypingDisplay's own measurement effect.
  useLayoutEffect(() => {
    if (containerRef.current) {
      const h = containerRef.current.getBoundingClientRect().height;
      if (h > 0) setContentH(h);
    }
  });

  const overflows = contentH > VIEWPORT_HEIGHT;

  // Recompute translateY whenever typed length changes (forward typing
  // shifts the block up; backspacing lets it settle back down, since the
  // shift is a pure function of the caret's current measured position).
  useEffect(() => {
    const caretEl = caretRef.current;
    if (!caretEl) return;

    if (!overflows) {
      setTranslateY(0);
      return;
    }

    const caretTop   = caretEl.offsetTop;
    const thresholdY = VIEWPORT_HEIGHT * SCROLL_FRACTION;
    const maxShift   = Math.max(0, contentH - VIEWPORT_HEIGHT);
    const shift      = Math.min(maxShift, Math.max(0, caretTop - thresholdY));
    setTranslateY(-shift);
  }, [typed, overflows, contentH]);

  // Reset scroll position when a new unit loads
  useEffect(() => {
    setTranslateY(0);
  }, [target]);

  const viewportHeight = contentH > 0 ? Math.min(contentH, VIEWPORT_HEIGHT) : undefined;

  return (
    <div>
      <div
        className="card"
        style={{
          marginBottom:  "4px",
          filter:        isPaused ? "blur(6px)" : "none",
          pointerEvents: isPaused ? "none" : "auto",
          transition:    "filter 0.3s ease",
          // Fixed height so the card never grows past the viewport cap and
          // never triggers a page scrollbar — short units still shrink to
          // their natural height via the min() above.
          height:        viewportHeight ? `calc(${viewportHeight}px + 56px)` : "auto",
          overflow:      "hidden",
          position:      "relative",
        }}
      >
        <div
          ref={containerRef}
          style={{
            padding:    "28px 32px",
            // Smooth upward slide — mirrors TypingDisplay's 150ms transform transition
            transform:  `translateY(${translateY}px)`,
            transition: "transform 0.15s ease",
          }}
        >
          {boundaries.map((block, blockIdx) => {
            const meta = ROLE_META[block.role] || ROLE_META.question;
            const isLastBlock = blockIdx === boundaries.length - 1;

            return (
              <div key={blockIdx} style={{ marginBottom: isLastBlock ? 0 : "22px" }}>
                <span style={{
                  display:       "inline-block",
                  fontSize:      "11px",
                  fontWeight:    700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color:         meta.color,
                  padding:       "3px 10px",
                  borderRadius:  "50px",
                  border:        `1px solid ${meta.color}`,
                  opacity:       0.9,
                  marginBottom:  "10px",
                }}>
                  {meta.label}
                </span>

                <div
                  aria-label={`${meta.label}: ${target.slice(block.start, block.end)}`}
                  style={{
                    fontFamily:    "'Courier New', Courier, monospace",
                    fontSize:      "clamp(17px, 2.1vw, 23px)",
                    lineHeight:    1.85,
                    letterSpacing: "0.025em",
                    wordBreak:     "break-word",
                    userSelect:    "none",
                  }}
                >
                  {chars.slice(block.start, block.end).map((char, i) => {
                    const idx = block.start + i;
                    const isTyped = idx < typed.length;
                    const isCaret = idx === typed.length;
                    const correct = isTyped && typed[idx] === char;
                    const wrong   = isTyped && typed[idx] !== char;
                    const isHighlighted = blankHighlights.some(
                      (h) => h.start >= 0 && idx >= h.start && idx < h.end
                    );

                    return (
                      <span
                        key={idx}
                        ref={isCaret ? caretRef : undefined}
                        style={{
                          color:          isCaret ? "var(--daisy-white)"
                                        : correct  ? "var(--lush-lime)"
                                        : wrong    ? "var(--poppy-red)"
                                        : isHighlighted ? "var(--text-primary)" : "var(--text-secondary)",
                          background:     isCaret ? "var(--accent-primary)"
                                        : isHighlighted ? "rgba(244, 169, 0, 0.20)" : "transparent",
                          textDecoration: wrong ? "underline" : "none",
                          borderRadius:   isCaret ? "2px" : isHighlighted ? "3px" : "0",
                          fontWeight:     isHighlighted ? 700 : 400,
                          boxShadow:      isHighlighted ? "inset 0 -1px 0 rgba(244, 169, 0, 0.45)" : "none",
                          padding:        isHighlighted ? "0 1px" : "0",
                          transition:     "color 0.05s ease, background 0.05s ease",
                        }}
                      >
                        {char}
                      </span>
                    );
                  })}

                  {/* Enter-key hint — shown right where the caret sits on the
                      separator newline between this part and the next */}
                  {!isLastBlock && typed.length === block.end && (
                    <span
                      ref={caretRef}
                      style={{
                        display:       "inline-flex",
                        alignItems:    "center",
                        gap:           "4px",
                        marginLeft:    "8px",
                        fontSize:      "11px",
                        fontWeight:    700,
                        letterSpacing: "0.05em",
                        color:         "var(--accent-primary)",
                        opacity:       0.85,
                      }}
                    >
                      ↵ press Enter
                    </span>
                  )}
                </div>
              </div>
            );
          })}

          {/* Blinking cursor after full completion */}
          {typed.length >= target.length && target.length > 0 && (
            <span
              ref={caretRef}
              style={{
                display:       "inline-block",
                width:         "2px",
                height:        "1.1em",
                background:    "var(--accent-primary)",
                borderRadius:  "1px",
                verticalAlign: "text-bottom",
                marginLeft:    "1px",
                animation:     "unit-typing-blink 1s step-end infinite",
              }}
            />
          )}
        </div>
      </div>

      <style>{`
        @keyframes unit-typing-blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
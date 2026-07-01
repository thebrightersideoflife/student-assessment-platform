// src/components/typing/TypingDisplay.jsx
// Renders the current passage part with per-character live feedback.
// Shows a role label (Question / Answer / Explanation) above the text.
// Correct chars → green, incorrect → red + underline, pending → muted, caret → accent.
//
// ── Rolling-line viewport ────────────────────────────────────────────────────
// The card shows up to VISIBLE_LINES lines at a time. Short passages render
// at their natural height; long ones are clamped to VISIBLE_LINES × lineH.
//
// Scroll behaviour: the first SCROLL_TRIGGER lines (0–2) are shown normally.
// The moment the caret reaches line SCROLL_TRIGGER (line 3, 0-based), ALL
// preceding lines jump off the top in one go — the block shifts up by
// caretLine × lineH so the caret lands on visual line 0 with fresh lines
// visible below. Every subsequent line the caret enters shifts up by another
// lineH. This mirrors MonkeyType / Keybr and prevents any page scrollbar.
//
// Line detection uses a hidden single-character probe rendered in the same
// font/size as the passage text. Its measured height is the true rendered
// line-height and is used to:
//   1. Clamp the card's viewport height (min of content height, VISIBLE_LINES × lineH)
//   2. Determine which rendered line each character sits on via offsetTop
//   3. Compute the CSS translateY offset that scrolls all completed lines off

import { useEffect, useLayoutEffect, useRef, useState, useCallback } from "react";

const ROLE_META = {
  question:    { label: "Question",    color: "var(--vibrant-cyan)"  },
  answer:      { label: "Answer",      color: "var(--lush-lime)"     },
  explanation: { label: "Explanation", color: "var(--golden-amber)"  },
};

const VISIBLE_LINES  = 5; // lines shown in the viewport at once
const SCROLL_TRIGGER = 3; // caret must reach this line index before scrolling starts (0-based)
                           // i.e. lines 0-2 are fully typed before the block starts moving

export default function TypingDisplay({ target, typed, role, partIndex, totalParts, onSkip, isPaused, blankHighlights = [] }) {
  const meta  = ROLE_META[role] || ROLE_META.question;
  const chars = target.split("");

  // ── Refs ────────────────────────────────────────────────────────────────────
  const probeRef     = useRef(null);  // hidden single-char element for line-height measurement
  const containerRef = useRef(null);  // the inner text div (position:relative, overflow:hidden wrapper)
  const caretRef     = useRef(null);  // the caret span
  const charRefsRef  = useRef([]);    // ref array, one per character span

  // ── State ───────────────────────────────────────────────────────────────────
  const [lineH,      setLineH]      = useState(0);   // measured px height of one rendered line
  const [contentH,   setContentH]   = useState(0);   // measured px height of the full text block
  const [translateY, setTranslateY] = useState(0);   // current upward shift in px (always ≤ 0)

  // ── Measure line height + content height ────────────────────────────────────
  // Runs after every render because font-size is clamp() and can change on
  // viewport resize. Both measurements come from live DOM so they're always
  // accurate regardless of text length or container width.
  useLayoutEffect(() => {
    if (probeRef.current) {
      const h = probeRef.current.getBoundingClientRect().height;
      if (h > 0) setLineH(h);
    }
    if (containerRef.current) {
      const h = containerRef.current.getBoundingClientRect().height;
      if (h > 0) setContentH(h);
    }
  });

  // ── Recompute translateY whenever typed length or lineH changes ─────────────
  // Behaviour: the first SCROLL_TRIGGER lines (0, 1, 2) are shown normally.
  // The moment the caret steps onto line SCROLL_TRIGGER (line 3, 0-based),
  // ALL preceding lines jump off the top in one go — the entire block shifts
  // up by caretLine × lineH so the caret lands on visual line 0 of the
  // viewport with VISIBLE_LINES - 1 fresh lines visible below it.
  // Every subsequent line advance shifts up by another lineH.
  const recompute = useCallback(() => {
    if (!lineH || !containerRef.current) return;

    const caretEl = charRefsRef.current[typed.length];
    if (!caretEl) return;

    // offsetTop of the caret span relative to the inner text div
    const caretTop  = caretEl.offsetTop;
    const caretLine = Math.round(caretTop / lineH); // 0-based line index

    // Before trigger: no shift, caret sits in its natural position
    if (caretLine < SCROLL_TRIGGER) {
      setTranslateY(0);
      return;
    }

    // At or past trigger: shift the entire block up so the caret is always
    // on visual line 0 of the viewport (all typed lines above disappear).
    setTranslateY(-(caretLine * lineH));
  }, [lineH, typed.length]);

  useEffect(() => { recompute(); }, [recompute]);

  // Reset scroll position when a new part/passage loads (target changes)
  useEffect(() => {
    setTranslateY(0);
  }, [target]);

  // ── Viewport height: content height clamped to VISIBLE_LINES max ────────────
  // Short passages (1–2 lines) use their natural height so the card shrinks
  // to fit. Long passages are capped at VISIBLE_LINES × lineH so the card
  // never grows past that and never triggers the page scrollbar.
  const maxHeight      = lineH > 0 ? lineH * VISIBLE_LINES : 0;
  const viewportHeight = contentH > 0 && maxHeight > 0
    ? Math.min(contentH, maxHeight)
    : undefined;

  return (
    <div>
      {/* Part label + progress pips + skip button */}
      <div style={{
        display:       "flex",
        alignItems:    "center",
        gap:           "10px",
        marginBottom:  "14px",
      }}>
        <span style={{
          fontSize:      "11px",
          fontWeight:    700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color:         meta.color,
          padding:       "3px 10px",
          borderRadius:  "50px",
          border:        `1px solid ${meta.color}`,
          opacity:       0.9,
          flexShrink:    0,
        }}>
          {meta.label}
        </span>

        {/* Part pips: Q → A → E */}
        {totalParts > 1 && (
          <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
            {Array.from({ length: totalParts }).map((_, i) => (
              <div key={i} style={{
                width:        i === partIndex ? "16px" : "6px",
                height:       "6px",
                borderRadius: "3px",
                background:   i < partIndex
                  ? "var(--lush-lime)"
                  : i === partIndex
                    ? meta.color
                    : "rgba(var(--border-color-rgb), 0.5)",
                transition:   "all 0.25s ease",
              }} />
            ))}
          </div>
        )}

        {onSkip && partIndex === 0 && (
          <button
            onClick={onSkip}
            title="Skip this passage"
            style={{
              marginLeft:    "auto",
              display:       "flex",
              alignItems:    "center",
              gap:           "7px",
              background:    "none",
              border:        "1px solid rgba(var(--border-color-rgb), 0.4)",
              cursor:        "pointer",
              color:         "var(--text-secondary)",
              fontSize:      "13px",
              fontWeight:    600,
              letterSpacing: "0.04em",
              padding:       "6px 14px",
              borderRadius:  "8px",
              opacity:       0.8,
              transition:    "opacity 0.15s ease, border-color 0.15s ease",
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.borderColor = "rgba(var(--border-color-rgb), 0.8)"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = "0.8"; e.currentTarget.style.borderColor = "rgba(var(--border-color-rgb), 0.4)"; }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 4 23 10 17 10" />
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
            </svg>
            skip
          </button>
        )}
      </div>

      {/* Character-by-character text — fixed-height viewport, text translates up */}
      <div
        className="card"
        style={{
          padding:    "28px 32px",
          marginBottom: "4px",
          // Fixed height so the card never grows and never triggers the scrollbar.
          // Falls back to 'auto' on first render before lineH is measured.
          height:     viewportHeight ? `calc(${viewportHeight}px + 56px)` : "auto",
          overflow:   "hidden",
          position:   "relative",
        }}
      >
        {/* Hidden probe — measures one rendered line's height in the live font */}
        <span
          ref={probeRef}
          aria-hidden="true"
          style={{
            position:    "absolute",
            visibility:  "hidden",
            pointerEvents: "none",
            fontFamily:  "'Courier New', Courier, monospace",
            fontSize:    "clamp(18px, 2.4vw, 26px)",
            lineHeight:  2,
            letterSpacing: "0.025em",
          }}
        >
          A
        </span>

        <div
          ref={containerRef}
          aria-label={`${meta.label}: ${target}`}
          style={{
            fontFamily:    "'Courier New', Courier, monospace",
            fontSize:      "clamp(18px, 2.4vw, 26px)",
            lineHeight:    2,
            letterSpacing: "0.025em",
            wordBreak:     "break-word",
            userSelect:    "none",
            filter:        isPaused ? "blur(6px)" : "none",
            pointerEvents: isPaused ? "none" : "auto",
            // Smooth upward slide — 150ms feels snappy without being jarring
            transform:     `translateY(${translateY}px)`,
            transition:    "transform 0.15s ease, filter 0.3s ease",
          }}
        >
          {chars.map((char, i) => {
            const isTyped = i < typed.length;
            const isCaret = i === typed.length;
            const correct = isTyped && typed[i] === char;
            const wrong   = isTyped && typed[i] !== char;
            const isHighlighted = blankHighlights.some((highlight) => highlight.start >= 0 && i >= highlight.start && i < highlight.end);

            return (
              <span
                key={i}
                ref={(el) => {
                  charRefsRef.current[i] = el;
                  if (isCaret) caretRef.current = el;
                }}
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

          {/* Blinking cursor after full completion */}
          {typed.length >= target.length && target.length > 0 && (
            <span style={{
              display:       "inline-block",
              width:         "2px",
              height:        "1.1em",
              background:    "var(--accent-primary)",
              borderRadius:  "1px",
              verticalAlign: "text-bottom",
              marginLeft:    "1px",
              animation:     "typing-blink 1s step-end infinite",
            }} />
          )}
        </div>
      </div>

      <style>{`
        @keyframes typing-blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
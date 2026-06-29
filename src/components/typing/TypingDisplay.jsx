// src/components/typing/TypingDisplay.jsx
// Renders the current passage part with per-character live feedback.
// Shows a role label (Question / Answer / Explanation) above the text.
// Correct chars → green, incorrect → red + underline, pending → muted, caret → accent.

import { useEffect, useRef } from "react";

const ROLE_META = {
  question:    { label: "Question",    color: "var(--vibrant-cyan)"  },
  answer:      { label: "Answer",      color: "var(--lush-lime)"     },
  explanation: { label: "Explanation", color: "var(--golden-amber)"  },
};

export default function TypingDisplay({ target, typed, role, partIndex, totalParts, onSkip, isPaused }) {
  const caretRef = useRef(null);

  useEffect(() => {
    caretRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [typed.length]);

  const meta   = ROLE_META[role] || ROLE_META.question;
  const chars  = target.split("");

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

        {/* Skip button — only at the start of a passage (partIndex 0),
            pushed to the far right so it doesn't crowd the label/pips */}
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
            {/* Refresh/cycle icon */}
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

      {/* Character-by-character text */}
      <div
        className="card"
        style={{
          padding:      "28px 32px",
          marginBottom: "4px",
        }}
      >
      <div
        aria-label={`${meta.label}: ${target}`}
        style={{
          fontFamily:   "'Courier New', Courier, monospace",
          fontSize:     "clamp(18px, 2.4vw, 26px)",
          lineHeight:   2,
          letterSpacing:"0.025em",
          wordBreak:    "break-word",
          userSelect:   "none",
          filter:       isPaused ? "blur(6px)" : "none",
          transition:   "filter 0.3s ease",
          pointerEvents: isPaused ? "none" : "auto",
        }}
      >
        {chars.map((char, i) => {
          const isTyped = i < typed.length;
          const isCaret = i === typed.length;
          const correct = isTyped && typed[i] === char;
          const wrong   = isTyped && typed[i] !== char;

          return (
            <span
              key={i}
              ref={isCaret ? caretRef : null}
              style={{
                color:          isCaret ? "var(--daisy-white)"
                              : correct  ? "var(--lush-lime)"
                              : wrong    ? "var(--poppy-red)"
                              :            "var(--text-secondary)",
                background:     isCaret ? "var(--accent-primary)" : "transparent",
                textDecoration: wrong ? "underline" : "none",
                borderRadius:   isCaret ? "2px" : "0",
                transition:     "color 0.05s ease",
              }}
            >
              {char}
            </span>
          );
        })}

        {/* Blinking cursor after full completion */}
        {typed.length >= target.length && target.length > 0 && (
          <span style={{
            display:        "inline-block",
            width:          "2px",
            height:         "1.1em",
            background:     "var(--accent-primary)",
            borderRadius:   "1px",
            verticalAlign:  "text-bottom",
            marginLeft:     "1px",
            animation:      "typing-blink 1s step-end infinite",
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
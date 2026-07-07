// src/components/typing/CompetitionDisplay.jsx
// Renders a Competition passage two lines at a time. Unlike TypingDisplay
// (rolling-scroll viewport) and UnitTypingDisplay (whole unit visible,
// pixel-based scroll), this display shows ONLY the current 2-line page and
// hard-cuts to the next page the instant the page's last character is
// typed correctly — no scroll animation, matching the "flips" behavior
// from 10FastFingers rather than a smooth transition.
//
// ── Measurement strategy ────────────────────────────────────────────────
// Reuses the same hidden-probe line-height measurement TypingDisplay uses
// (font is clamp()-sized, so line height can't be hardcoded), but the goal
// here is different: instead of computing a scroll offset, we render the
// FULL text once in a hidden (visibility:hidden, still laid out) pass to
// record which line every character falls on, building a `lineRanges`
// array of { start, end } char-index pairs. Once that's known, the current
// page is derived purely from `typed.length` — no extra page state needed,
// which is what makes the "flip" instant and glitch-free.

import { useLayoutEffect, useEffect, useRef, useState } from "react";

const PAGE_LINES = 2;

export default function CompetitionDisplay({ target, typed, blankHighlights = [] }) {
  // buildJoinedTarget stitches parts together with a literal "\n", which
  // default CSS white-space handling collapses visually into an ordinary
  // space — so a player correctly typing a space at that boundary was
  // being compared against "\n" here and rendered red forever, even
  // though CompetitionTypingTest's own scoring (patched separately) had
  // already learned to accept it. This display never knew about that fix
  // because it does its own independent char-by-char comparison for
  // coloring. Same 1-for-1 swap used there: same length, same indices,
  // used only for the correct/wrong comparison below — never for anything
  // involving actual line-break/page-flip layout, which still needs the
  // real "\n" to measure correctly (see the layout effect below, which
  // still measures off the raw `target`/`chars`).
  const compareChars = target.replace(/\n/g, " ").split("");
  const chars = target.split("");

  const probeRef        = useRef(null);
  const measureRef      = useRef(null);   // hidden full-text pass, for line mapping
  const charRefsRef     = useRef([]);
  const [lineH, setLineH] = useState(0);
  const [lineRanges, setLineRanges] = useState([]); // [{ start, end }], built once per target

  // ── Measure line height + build the line→char-range map ────────────────
  // Runs whenever target changes (new passage) or on resize (container
  // width changing reflows the line breaks). Both the probe height and the
  // per-char offsetTop come from the hidden full-text render pass so this
  // works regardless of passage length or viewport width.
  useLayoutEffect(() => {
    if (!probeRef.current || !measureRef.current) return;
    const h = probeRef.current.getBoundingClientRect().height;
    if (h <= 0) return;
    setLineH(h);

    const ranges = [];
    let currentLine = 0;
    let lineStart = 0;
    charRefsRef.current.forEach((el, i) => {
      if (!el) return;
      const line = Math.round(el.offsetTop / h);
      if (line !== currentLine) {
        ranges.push({ start: lineStart, end: i });
        lineStart = i;
        currentLine = line;
      }
    });
    ranges.push({ start: lineStart, end: chars.length });
    setLineRanges(ranges);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  // Re-measure on resize (line breaks can shift with container width)
  useEffect(() => {
    const onResize = () => {
      // Force remeasure by nudging lineH — triggers the layout effect above
      // via the ref check the next paint, since we key off target not lineH.
      if (probeRef.current) setLineH(probeRef.current.getBoundingClientRect().height);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // ── Current page, derived purely from typed.length ──────────────────────
  // No page state: the page is a pure function of how much has been typed
  // correctly-positioned so far, which is what makes the flip instantaneous
  // and impossible to get out of sync with the caret.
  let caretLine = 0;
  for (let i = 0; i < lineRanges.length; i++) {
    if (typed.length >= lineRanges[i].start && typed.length < lineRanges[i].end) { caretLine = i; break; }
    if (typed.length >= lineRanges[i].end) caretLine = i + 1;
  }
  const pageIndex     = Math.floor(caretLine / PAGE_LINES);
  const pageStartLine = pageIndex * PAGE_LINES;
  const pageEndLine   = Math.min(pageStartLine + PAGE_LINES - 1, lineRanges.length - 1);
  const pageStart     = lineRanges[pageStartLine]?.start ?? 0;
  const pageEnd       = lineRanges[pageEndLine]?.end ?? chars.length;

  return (
    <div>
      {/* Hidden probe — measures one rendered line's height */}
      <span
        ref={probeRef}
        aria-hidden="true"
        style={{
          position: "absolute", visibility: "hidden", pointerEvents: "none",
          fontFamily: "'Courier New', Courier, monospace",
          fontSize: "clamp(18px, 2.4vw, 26px)", lineHeight: 2, letterSpacing: "0.025em",
        }}
      >A</span>

      {/* Hidden full-text pass — only used to build lineRanges, never shown */}
      <div
        ref={measureRef}
        aria-hidden="true"
        style={{
          position: "absolute", visibility: "hidden", pointerEvents: "none",
          fontFamily: "'Courier New', Courier, monospace",
          fontSize: "clamp(18px, 2.4vw, 26px)", lineHeight: 2, letterSpacing: "0.025em",
          wordBreak: "break-word", width: "100%",
        }}
      >
        {chars.map((char, i) => (
          <span key={i} ref={(el) => { charRefsRef.current[i] = el; }}>{char}</span>
        ))}
      </div>

      {/* Visible page — only the current 2-line slice, hard-cut on flip */}
      <div
        className="card"
        style={{ padding: "28px 32px", marginBottom: "4px" }}
      >
        <div
          style={{
            fontFamily: "'Courier New', Courier, monospace",
            fontSize: "clamp(18px, 2.4vw, 26px)", lineHeight: 2, letterSpacing: "0.025em",
            wordBreak: "break-word", userSelect: "none", minHeight: lineH ? lineH * PAGE_LINES : undefined,
          }}
        >
          {chars.slice(pageStart, pageEnd).map((char, localIdx) => {
            const i = pageStart + localIdx;
            const isTyped = i < typed.length;
            const isCaret = i === typed.length;
            const correct = isTyped && typed[i] === compareChars[i];
            const wrong   = isTyped && typed[i] !== compareChars[i];
            const isHighlighted = blankHighlights.some((h) => i >= h.start && i < h.end);

            return (
              <span key={i} style={{
                color: isCaret ? "var(--daisy-white)"
                     : correct ? "var(--lush-lime)"
                     : wrong   ? "var(--poppy-red)"
                     : isHighlighted ? "var(--text-primary)" : "var(--text-secondary)",
                background: isCaret ? "var(--accent-primary)"
                          : isHighlighted ? "rgba(244, 169, 0, 0.20)" : "transparent",
                textDecoration: wrong ? "underline" : "none",
                borderRadius: isCaret ? "2px" : isHighlighted ? "3px" : "0",
                fontWeight: isHighlighted ? 700 : 400,
              }}>
                {char}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
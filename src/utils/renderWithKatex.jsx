import React from "react";
import katex from "katex";
import "katex/dist/katex.min.css";
import formatTextToNodes from "./formatText.jsx";

/**
 * Splits a string on $$...$$ (display) and $...$ (inline) delimiters,
 * renders math blocks with KaTeX, and passes prose through formatTextToNodes.
 *
 * Usage in question data:
 *   Display math:  $$\pi_{Name}(\sigma_{City='Jo'burg'}(CUSTOMER))$$
 *   Inline math:   The projection operator $\pi$ selects columns.
 */
function renderKatexString(str) {
  if (!str || typeof str !== "string") return null;

  // Split on $$...$$ first (display), then $...$ (inline)
  const displayPattern = /(\$\$[\s\S]+?\$\$)/g;
  const inlinePattern = /(\$[^$\n]+?\$)/g;

  // Two-pass split: display blocks first, then inline within prose segments
  const displayParts = str.split(displayPattern);

  return displayParts.map((part, di) => {
    if (part.startsWith("$$") && part.endsWith("$$")) {
      const latex = part.slice(2, -2).trim();
      try {
        const html = katex.renderToString(latex, { displayMode: true, throwOnError: false });
        return (
          <div
            key={`display-${di}`}
            dangerouslySetInnerHTML={{ __html: html }}
            style={{ overflowX: "auto", margin: "12px 0" }}
          />
        );
      } catch {
        return <code key={`display-err-${di}`} style={{ color: "var(--poppy-red)" }}>{part}</code>;
      }
    }

    // Prose segment — further split on inline $...$
    const inlineParts = part.split(inlinePattern);
    const nodes = inlineParts.map((seg, ii) => {
      if (seg.startsWith("$") && seg.endsWith("$") && seg.length > 2) {
        const latex = seg.slice(1, -1).trim();
        try {
          const html = katex.renderToString(latex, { displayMode: false, throwOnError: false });
          return (
            <span
              key={`inline-${di}-${ii}`}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        } catch {
          return <code key={`inline-err-${di}-${ii}`} style={{ color: "var(--poppy-red)" }}>{seg}</code>;
        }
      }
      // Plain prose — run through existing markdown formatter
      return (
        <span key={`prose-${di}-${ii}`}>
          {formatTextToNodes(seg)}
        </span>
      );
    });

    return <span key={`prose-block-${di}`}>{nodes}</span>;
  });
}

export default function renderWithKatex(answer) {
  if (answer == null) return null;
  const text = typeof answer === "string" ? answer : answer?.text ?? "";
  return renderKatexString(text);
}
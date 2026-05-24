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
  // but avoid matching $ inside backticks
  const displayPattern = /(\$\$[\s\S]+?\$\$)/g;

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

    // Prose segment — find inline $...$ but skip backtick-enclosed sections
    const inlineParts = [];
    let lastIdx = 0;
    let inBackticks = false;

    for (let i = 0; i < part.length; i++) {
      if (part[i] === "`") {
        inBackticks = !inBackticks;
      } else if (part[i] === "$" && !inBackticks && i + 1 < part.length) {
        // Potential start of $...$
        const remaining = part.slice(i);
        const match = remaining.match(/^\$([^$\n]+?)\$/);
        if (match) {
          // Found inline math
          inlineParts.push(part.slice(lastIdx, i)); // text before
          inlineParts.push(match[0]); // the $...$ match
          i += match[0].length - 1;
          lastIdx = i + 1;
        }
      }
    }
    inlineParts.push(part.slice(lastIdx)); // remaining text

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
        <React.Fragment key={`prose-${di}-${ii}`}>
          {formatTextToNodes(seg)}
        </React.Fragment>
      );
    });

    return <React.Fragment key={`prose-block-${di}`}>{nodes}</React.Fragment>;
  });
}

export default function renderWithKatex(answer) {
  if (answer == null) return null;
  const text = typeof answer === "string" ? answer : answer?.text ?? "";
  return renderKatexString(text);
}
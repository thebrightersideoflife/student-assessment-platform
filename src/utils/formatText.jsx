import React from "react";

// Convert plain text with simple markup into React nodes.
// Supports:
// - Paragraphs separated by blank lines
// - Single newlines converted to <br />
// - **bold** and *italic* inline markers
// - `code` inline markers
export default function formatTextToNodes(text) {
  if (text == null) return null;
  if (typeof text !== "string") return text;

  const paragraphs = text.split(/\n{2,}/g);

  function parseInline(str) {
    if (!str) return null;
    const parts = str.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g);
    return parts.map((part, i) => {
      if (!part) return null;
      if (part.startsWith("**") && part.endsWith("**")) {
        return React.createElement("strong", { key: i }, part.slice(2, -2));
      }
      if (part.startsWith("*") && part.endsWith("*")) {
        return React.createElement("em", { key: i }, part.slice(1, -1));
      }
      if (part.startsWith("`") && part.endsWith("`")) {
        return React.createElement("code", { key: i, style: { background: "rgba(0,0,0,0.06)", padding: "0 4px", borderRadius: 4 } }, part.slice(1, -1));
      }
      return part;
    });
  }

  return paragraphs.map((para, pi) => {
    const lines = para.split(/\n/g);
    const children = [];
    lines.forEach((line, li) => {
      const inline = parseInline(line);
      if (Array.isArray(inline)) children.push(...inline);
      else children.push(inline);
      if (li < lines.length - 1) children.push(React.createElement("br", { key: `br-${pi}-${li}` }));
    });
    return React.createElement(
      "p",
      { key: pi, style: { marginTop: pi === 0 ? 0 : 12, marginBottom: 0 } },
      children,
    );
  });
}

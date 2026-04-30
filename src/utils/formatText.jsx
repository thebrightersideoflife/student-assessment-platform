import React from "react";

// Convert plain text with simple markup into React nodes.
// Supports:
// - Fenced code blocks  ```lang\n...\n```
// - Markdown tables     | col | col |\n|---|---|\n| val | val |
// - Paragraphs separated by blank lines
// - Single newlines converted to <br />
// - **bold** and *italic* inline markers
// - `code` inline markers

// ─── Inline parser (unchanged) ───────────────────────────────────────────────
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
      return React.createElement("code", {
        key: i,
        style: { background: "rgba(0,0,0,0.06)", padding: "0 4px", borderRadius: 4 },
      }, part.slice(1, -1));
    }
    return part;
  });
}

// ─── Fenced code block renderer ──────────────────────────────────────────────
function renderCodeBlock(lang, code, key) {
  return React.createElement(
    "div",
    {
      key,
      style: { position: "relative", margin: "12px 0" },
    },
    lang && React.createElement(
      "span",
      {
        style: {
          position: "absolute",
          top: 8,
          right: 12,
          fontSize: "0.7rem",
          fontFamily: "monospace",
          color: "var(--text-muted, #888)",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          userSelect: "none",
        },
      },
      lang,
    ),
    React.createElement(
      "pre",
      {
        style: {
          background: "var(--code-bg, #1e1e2e)",
          color: "var(--code-fg, #cdd6f4)",
          borderRadius: 8,
          padding: "14px 16px",
          overflowX: "auto",
          fontSize: "0.85rem",
          lineHeight: 1.6,
          margin: 0,
          fontFamily: "'Fira Code', 'Cascadia Code', 'Consolas', monospace",
        },
      },
      React.createElement("code", null, code),
    ),
  );
}

// ─── Markdown table renderer ──────────────────────────────────────────────────
function renderTable(lines, key) {
  // lines[0]  = header row  | col | col |
  // lines[1]  = separator   |-----|-----|   (skip)
  // lines[2+] = data rows
  const parseRow = (line) =>
    line
      .replace(/^\||\|$/g, "")   // strip leading/trailing pipes
      .split("|")
      .map((cell) => cell.trim());

  const headers = parseRow(lines[0]);
  const dataRows = lines.slice(2).filter((l) => l.trim() !== "");

  const thCells = headers.map((h, ci) =>
    React.createElement(
      "th",
      {
        key: ci,
        style: {
          padding: "8px 12px",
          textAlign: "left",
          background: "var(--table-header-bg, rgba(0,0,0,0.08))",
          fontWeight: 600,
          borderBottom: "2px solid var(--border-color, #ddd)",
          whiteSpace: "nowrap",
        },
      },
      parseInline(h),
    ),
  );

  const bodyRows = dataRows.map((row, ri) => {
    const cells = parseRow(row);
    return React.createElement(
      "tr",
      {
        key: ri,
        style: {
          background: ri % 2 === 0 ? "transparent" : "var(--table-stripe-bg, rgba(0,0,0,0.03))",
        },
      },
      cells.map((cell, ci) =>
        React.createElement(
          "td",
          {
            key: ci,
            style: {
              padding: "7px 12px",
              borderBottom: "1px solid var(--border-color, #eee)",
              verticalAlign: "top",
            },
          },
          parseInline(cell),
        ),
      ),
    );
  });

  return React.createElement(
    "div",
    { key, style: { overflowX: "auto", margin: "12px 0" } },
    React.createElement(
      "table",
      {
        style: {
          borderCollapse: "collapse",
          width: "100%",
          fontSize: "0.9rem",
          border: "1px solid var(--border-color, #ddd)",
          borderRadius: 6,
          overflow: "hidden",
        },
      },
      React.createElement("thead", null,
        React.createElement("tr", null, thCells),
      ),
      React.createElement("tbody", null, bodyRows),
    ),
  );
}

// ─── Prose paragraph renderer ─────────────────────────────────────────────────
function renderParagraph(para, key) {
  const lines = para.split(/\n/g);
  const children = [];
  lines.forEach((line, li) => {
    const inline = parseInline(line);
    if (Array.isArray(inline)) children.push(...inline);
    else children.push(inline);
    if (li < lines.length - 1)
      children.push(React.createElement("br", { key: `br-${key}-${li}` }));
  });
  return React.createElement(
    "p",
    { key, style: { marginTop: key === 0 ? 0 : 12, marginBottom: 0 } },
    children,
  );
}

// ─── Block detector helpers ───────────────────────────────────────────────────
const FENCE_RE = /^```(\w*)$/;

function isTableRow(line) {
  return line.trimStart().startsWith("|");
}
function isSeparatorRow(line) {
  return /^\|[\s\-|:]+\|$/.test(line.trim());
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function formatTextToNodes(text) {
  if (text == null) return null;
  if (typeof text !== "string") return text;

  // Walk line-by-line and group lines into typed blocks:
  //   { kind: "fence",  lang, code }
  //   { kind: "table",  lines[] }
  //   { kind: "prose",  text }
  const blocks = [];
  const rawLines = text.split("\n");
  let i = 0;

  while (i < rawLines.length) {
    const line = rawLines[i];

    // ── Fenced code block ──────────────────────────────────────────────
    const fenceMatch = line.match(FENCE_RE);
    if (fenceMatch) {
      const lang = fenceMatch[1] || "";
      const codeLines = [];
      i++;
      while (i < rawLines.length && !rawLines[i].match(/^```\s*$/)) {
        codeLines.push(rawLines[i]);
        i++;
      }
      i++; // skip closing ```
      blocks.push({ kind: "fence", lang, code: codeLines.join("\n") });
      continue;
    }

    // ── Markdown table ─────────────────────────────────────────────────
    // Detect: current line is a table row AND next line is a separator row
    if (
      isTableRow(line) &&
      i + 1 < rawLines.length &&
      isSeparatorRow(rawLines[i + 1])
    ) {
      const tableLines = [];
      while (i < rawLines.length && isTableRow(rawLines[i])) {
        tableLines.push(rawLines[i]);
        i++;
      }
      blocks.push({ kind: "table", lines: tableLines });
      continue;
    }

    // ── Prose — accumulate until a block boundary ──────────────────────
    const proseLines = [];
    while (
      i < rawLines.length &&
      !rawLines[i].match(FENCE_RE) &&
      !(
        isTableRow(rawLines[i]) &&
        i + 1 < rawLines.length &&
        isSeparatorRow(rawLines[i + 1])
      )
    ) {
      proseLines.push(rawLines[i]);
      i++;
    }
    // Re-split prose on blank lines to preserve paragraph spacing
    const proseParagraphs = proseLines.join("\n").split(/\n{2,}/);
    proseParagraphs.forEach((p) => {
      if (p.trim()) blocks.push({ kind: "prose", text: p });
    });
  }

  // ── Render each block ────────────────────────────────────────────────
  let proseIndex = 0;
  return blocks.map((block, bi) => {
    if (block.kind === "fence") {
      return renderCodeBlock(block.lang, block.code, `block-${bi}`);
    }
    if (block.kind === "table") {
      return renderTable(block.lines, `block-${bi}`);
    }
    // prose — first prose block gets marginTop: 0
    const el = renderParagraph(block.text, proseIndex === 0 ? 0 : bi);
    proseIndex++;
    return el;
  });
}
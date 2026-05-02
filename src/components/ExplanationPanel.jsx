import { useState, useEffect } from "react";
import formatTextToNodes from "../utils/formatText.jsx";

/**
 * ExplanationPanel
 *
 * Props:
 *   explanation  string   — markdown-compatible prose (bold, italic, `code`, tables, fences)
 *   submitted    bool     — when true the panel auto-expands alongside answers
 *
 * Renders nothing when `explanation` is absent.
 * Collapsed by default so students see a subtle toggle, not a wall of text.
 * Uses --accent-secondary (cyan / orange depending on theme) to distinguish
 * itself from the answer feedback which uses --accent-primary / lush-lime.
 */
export default function ExplanationPanel({ explanation, submitted = false }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Auto-expand when the whole assessment is submitted
  useEffect(() => {
    if (submitted) setIsExpanded(true);
  }, [submitted]);

  if (!explanation) return null;

  return (
    <div
      style={{
        marginTop: "16px",
        borderRadius: "10px",
        overflow: "hidden",
        border: "1px solid rgba(var(--border-color-rgb), 0.45)",
      }}
    >
      {/* Toggle button */}
      <button
        onClick={() => setIsExpanded((prev) => !prev)}
        style={{
          width: "100%",
          padding: "11px 16px",
          background: isExpanded
            ? "rgba(var(--bg-secondary-rgb), 0.95)"
            : "rgba(var(--bg-secondary-rgb), 0.6)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          color: "var(--accent-secondary)",
          border: "none",
          borderBottom: isExpanded
            ? "1px solid rgba(var(--border-color-rgb), 0.45)"
            : "none",
          cursor: "pointer",
          fontSize: "13px",
          fontWeight: 600,
          letterSpacing: "0.02em",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "8px",
          transition: "background 0.18s ease",
        }}
        onMouseEnter={(e) => {
          if (!isExpanded)
            e.currentTarget.style.background =
              "rgba(var(--bg-secondary-rgb), 0.85)";
        }}
        onMouseLeave={(e) => {
          if (!isExpanded)
            e.currentTarget.style.background =
              "rgba(var(--bg-secondary-rgb), 0.6)";
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: "7px" }}>
          <span style={{ fontSize: "15px" }}>💡</span>
          {isExpanded ? "Hide Explanation" : "See Explanation"}
        </span>
        <span
          style={{
            fontSize: "11px",
            opacity: 0.7,
            transition: "transform 0.25s ease",
            transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
            display: "inline-block",
          }}
        >
          ▼
        </span>
      </button>

      {/* Content */}
      {isExpanded && (
        <div
          style={{
            padding: "16px 18px",
            background: "rgba(var(--bg-card-rgb), 0.55)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            fontSize: "14px",
            lineHeight: "1.75",
            color: "var(--text-primary)",
            borderLeft: "3px solid var(--accent-secondary)",
          }}
        >
          {formatTextToNodes(explanation)}
        </div>
      )}
    </div>
  );
}
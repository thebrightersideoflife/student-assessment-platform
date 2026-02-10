import { useState } from "react";

export default function ExplanationPanel({ explanation, questionNumber }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!explanation) return null;

  return (
    <div style={{
      marginTop: "20px",
      border: "2px solid var(--accent-primary)",
      borderRadius: "8px",
      overflow: "hidden"
    }}>
      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          width: "100%",
          padding: "14px 20px",
          background: "var(--accent-primary)",
          color: "white",
          border: "none",
          cursor: "pointer",
          fontSize: "15px",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "background 0.2s"
        }}
        onMouseOver={(e) => e.currentTarget.style.opacity = "0.9"}
        onMouseOut={(e) => e.currentTarget.style.opacity = "1"}
      >
        <span>💡 {isExpanded ? "Hide" : "Show"} Explanation</span>
        <span style={{
          fontSize: "18px",
          transition: "transform 0.3s",
          transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)"
        }}>
          ▼
        </span>
      </button>

      {/* Explanation Content */}
      {isExpanded && (
        <div style={{
          padding: "24px",
          background: "var(--bg-secondary)",
          borderTop: "1px solid var(--border-color)"
        }}>
          <div style={{
            fontSize: "15px",
            lineHeight: "1.8",
            color: "var(--text-primary)"
          }}>
            {/* Render explanation with basic markdown-like formatting */}
            <ExplanationContent content={explanation} />
          </div>
        </div>
      )}
    </div>
  );
}

// Component to render explanation content with formatting
function ExplanationContent({ content }) {
  // Split content by newlines and process each part
  const parts = content.split('\n');
  
  return (
    <div>
      {parts.map((part, index) => {
        // Skip empty lines
        if (!part.trim()) {
          return <br key={index} />;
        }

        // Headers (markdown style)
        if (part.startsWith('**') && part.endsWith('**')) {
          const text = part.slice(2, -2);
          return (
            <h3 key={index} style={{
              fontSize: "17px",
              fontWeight: "bold",
              marginTop: index > 0 ? "20px" : "0",
              marginBottom: "12px",
              color: "var(--accent-primary)"
            }}>
              {text}
            </h3>
          );
        }

        // Horizontal rule
        if (part.trim() === '---') {
          return (
            <hr key={index} style={{
              margin: "24px 0",
              border: "none",
              borderTop: "2px solid var(--border-color)"
            }} />
          );
        }

        // Display math (LaTeX block) - $$ ... $$
        if (part.trim().startsWith('$$') && part.trim().endsWith('$$')) {
          const mathContent = part.trim().slice(2, -2).trim();
          return (
            <div key={index} style={{
              padding: "16px",
              margin: "12px 0",
              background: "var(--bg-card)",
              border: "1px solid var(--border-color)",
              borderRadius: "4px",
              fontFamily: "monospace",
              fontSize: "16px",
              textAlign: "center",
              overflowX: "auto"
            }}>
              {mathContent}
            </div>
          );
        }

        // Table rows (markdown table)
        if (part.includes('|')) {
          return <TableRow key={index} content={part} />;
        }

        // Regular paragraph with inline formatting
        return (
          <p key={index} style={{
            marginBottom: "12px",
            lineHeight: "1.8"
          }}>
            <FormattedText content={part} />
          </p>
        );
      })}
    </div>
  );
}

// Component to handle inline formatting (bold, italic, inline math)
function FormattedText({ content }) {
  const parts = [];
  let currentIndex = 0;
  let partKey = 0;

  // Process the content character by character
  while (currentIndex < content.length) {
    // Check for inline math \( ... \)
    if (content.substr(currentIndex, 2) === '\\(') {
      const endIndex = content.indexOf('\\)', currentIndex + 2);
      if (endIndex !== -1) {
        const mathContent = content.substring(currentIndex + 2, endIndex);
        parts.push(
          <span key={partKey++} style={{
            fontFamily: "monospace",
            background: "var(--bg-card)",
            padding: "2px 6px",
            borderRadius: "3px",
            fontSize: "14px"
          }}>
            {mathContent}
          </span>
        );
        currentIndex = endIndex + 2;
        continue;
      }
    }

    // Check for bold **text**
    if (content.substr(currentIndex, 2) === '**') {
      const endIndex = content.indexOf('**', currentIndex + 2);
      if (endIndex !== -1) {
        const boldText = content.substring(currentIndex + 2, endIndex);
        parts.push(
          <strong key={partKey++} style={{ color: "var(--accent-primary)" }}>
            {boldText}
          </strong>
        );
        currentIndex = endIndex + 2;
        continue;
      }
    }

    // Regular text
    let nextSpecial = content.length;
    const nextMath = content.indexOf('\\(', currentIndex);
    const nextBold = content.indexOf('**', currentIndex);
    
    if (nextMath !== -1) nextSpecial = Math.min(nextSpecial, nextMath);
    if (nextBold !== -1) nextSpecial = Math.min(nextSpecial, nextBold);

    if (nextSpecial > currentIndex) {
      parts.push(
        <span key={partKey++}>
          {content.substring(currentIndex, nextSpecial)}
        </span>
      );
      currentIndex = nextSpecial;
    } else {
      currentIndex++;
    }
  }

  return <>{parts}</>;
}

// Component to render table rows
function TableRow({ content }) {
  const cells = content.split('|').map(cell => cell.trim()).filter(cell => cell);
  
  // Check if this is a header separator row
  if (cells.every(cell => /^-+$/.test(cell))) {
    return null; // Skip separator rows
  }

  const isHeader = content.includes('**') || content.includes('|---|');

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: `repeat(${cells.length}, 1fr)`,
      gap: "1px",
      background: "var(--border-color)",
      border: "1px solid var(--border-color)",
      marginBottom: "1px"
    }}>
      {cells.map((cell, idx) => (
        <div key={idx} style={{
          padding: "10px 12px",
          background: "var(--bg-card)",
          fontSize: "14px",
          fontWeight: isHeader ? "bold" : "normal",
          color: isHeader ? "var(--accent-primary)" : "var(--text-primary)"
        }}>
          <FormattedText content={cell} />
        </div>
      ))}
    </div>
  );
}
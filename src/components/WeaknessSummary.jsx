// src/components/WeaknessSummary.jsx
//
// Presentational chip list showing the student's weakest tags.
// Reused by WeaknessQuizPage's setup screen and available for a future
// dashboard summary — takes plain data in, no storage reads of its own.

export default function WeaknessSummary({ weakTags = [], emptyLabel }) {
  if (weakTags.length === 0) {
    return (
      <p style={{ fontSize: "13px", color: "var(--text-secondary)", fontStyle: "italic", margin: 0 }}>
        {emptyLabel || "No recurring weak spots detected yet — the quiz will draw from all your completed questions."}
      </p>
    );
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
      {weakTags.map(({ tag, failureRate, seen }) => (
        <span
          key={tag}
          title={`Missed ${Math.round(failureRate * 100)}% of ${seen} question${seen !== 1 ? "s" : ""} tagged "${tag}"`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "6px 12px",
            borderRadius: "999px",
            fontSize: "12.5px",
            fontWeight: 600,
            color: "var(--poppy-red)",
            background: "rgba(255,64,64,0.08)",
            border: "1px solid rgba(255,64,64,0.3)",
          }}
        >
          {tag}
          <span style={{ opacity: 0.75, fontWeight: 700 }}>
            {Math.round(failureRate * 100)}%
          </span>
        </span>
      ))}
    </div>
  );
}
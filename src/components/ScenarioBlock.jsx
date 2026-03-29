/*
  ScenarioBlock — renders a scenario context card before its questions.

  Question data shape in questions.js:
  ─────────────────────────────────────
  {
    id: "SCENARIO_Q1",
    type: "scenario",
    title: "Question 1: National Smart Infrastructure System (25 Marks)",
    context: "A government is planning to develop a National Smart...",
    // No answer — purely presentational. QuestionRenderer skips it for scoring.
  }
*/

const FileTextIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10 9 9 9 8 9"/>
  </svg>
);

export default function ScenarioBlock({ question }) {
  return (
    <div style={{
      background: "var(--bg-card)",
      border: "1px solid rgba(var(--border-color-rgb), 0.5)",
      position: "relative",
      borderRadius: "14px",
      padding: "24px 28px",
      marginBottom: "8px",
      marginTop: "32px",
    }}>
      {/* Title bar */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
        <span style={{ color: "var(--accent-primary)", flexShrink: 0 }}>
          <FileTextIcon />
        </span>
        <h2 style={{
          margin: 0,
          fontSize: "1.15rem",
          fontWeight: 700,
          color: "var(--text-primary)",
          letterSpacing: "-0.01em",
        }}>
          {question.title || "Scenario Context"}
        </h2>
      </div>

      {/* (corner glow removed per user request) */}

      {/* Scenario body */}
      {question.context && (
        <div style={{
          background: "rgba(var(--bg-secondary-rgb), 0.55)",
          border: "1px solid rgba(var(--border-color-rgb), 0.3)",
          borderRadius: "10px",
          padding: "16px 20px",
        }}>
          <p style={{
            margin: 0,
            fontSize: "15px",
            lineHeight: "1.75",
            color: "var(--text-secondary)",
            whiteSpace: "pre-line",   // respects \n line breaks in the context string
          }}>
            {question.context}
          </p>
        </div>
      )}

      {/* Section label hint */}
      <p style={{
        margin: "12px 0 0",
        fontSize: "12.5px",
        color: "var(--text-secondary)",
        opacity: 0.6,
        fontStyle: "italic",
      }}>
        Read the scenario above before answering the questions below.
      </p>
    </div>
  );
}
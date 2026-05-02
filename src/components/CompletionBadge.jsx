export default function CompletionBadge({
  moduleId,
  moduleName,
  weekId,
  score,
  totalQuestions,
  completionDate,
  attemptNumber = null,   // e.g. 2 — passed in by AssessmentPage after markCompleted
  totalAttempts = null,   // e.g. 3 — total attempts so far including this one
  timedMode = false,      // true when this attempt was completed under timed mode
}) {
  const percentage = Math.round((score / totalQuestions) * 100);
  const passed = percentage >= 70;
  const isRetake = attemptNumber !== null && attemptNumber > 1;

  function handlePrint() {
    const date = completionDate
      ? completionDate.replace(/\//g, "-").replace(/,\s*/g, "_")
      : new Date().toISOString().slice(0, 10);
    const attemptSuffix = attemptNumber ? `_Attempt${attemptNumber}` : "";
    const filename = `${moduleId}_Week${weekId}_Student_Assessment_Platform_${date}${attemptSuffix}`;
    const prevTitle = document.title;
    document.title = filename;
    window.print();
    document.title = prevTitle;
  }

  return (
    <>
      <style>
        {`
          @media print {
            .completion-badge { background: white !important; }
            .completion-badge.passed { border-color: #76d13d !important; }
            .completion-badge.not-passed { border-color: #f4a900 !important; }
            .completion-badge .main-heading { color: #000 !important; }
            .completion-badge .sub-heading { color: #000 !important; }
            .completion-badge .secondary-text { color: #666 !important; }
            .completion-badge .score-value.passed { color: #76d13d !important; }
            .completion-badge .score-value.not-passed { color: #f4a900 !important; }
            .completion-badge .score-display { background: #f5f5f5 !important; }
            .completion-badge .divider { background: #ddd !important; }
            .completion-badge .seal { border-top-color: #ddd !important; }
            .completion-badge .badge-circle.passed {
              background: linear-gradient(135deg, #76d13d, #00d4ff) !important;
            }
            .completion-badge .badge-circle.not-passed {
              background: linear-gradient(135deg, #f4a900, #ff6b35) !important;
            }
            .no-print { display: none !important; }
            /* Timed mode label prints — it's meaningful on a certificate */
            .timed-mode-label {
              color: #555 !important;
              border-color: #ccc !important;
              background: #f9f9f9 !important;
            }
          }
        `}
      </style>

      <div
        className={`completion-badge ${passed ? "passed" : "not-passed"}`}
        style={{
          background: "var(--bg-card)",
          border: `3px solid ${passed ? "#76d13d" : "#f4a900"}`,
          borderRadius: "12px",
          padding: "32px",
          textAlign: "center",
          maxWidth: "600px",
          margin: "24px auto",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        {/* ── Header ── */}
        <div style={{ marginBottom: "24px" }}>
          <div
            className={`badge-circle ${passed ? "passed" : "not-passed"}`}
            style={{
              width: "80px", height: "80px", borderRadius: "50%",
              background: passed
                ? "linear-gradient(135deg, #76d13d, #00d4ff)"
                : "linear-gradient(135deg, #f4a900, #ff6b35)",
              margin: "0 auto 16px",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "36px", color: "white", fontWeight: "bold",
            }}
          >
            {passed ? "✓" : "★"}
          </div>

          <h1
            className="main-heading"
            style={{ fontSize: "32px", marginBottom: "8px", color: "var(--text-primary)" }}
          >
            {passed ? "Assessment Passed!" : "Assessment Complete!"}
          </h1>

          <p
            className="secondary-text"
            style={{ fontSize: "18px", color: "var(--text-secondary)", marginBottom: "12px" }}
          >
            Certificate of Completion
          </p>

          {/* Meta pill row — timed mode + attempt number */}
          {(timedMode || isRetake) && (
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              gap: "8px", flexWrap: "wrap", marginBottom: "20px",
            }}>
              {/* Timed Mode — survives print */}
              {timedMode && (
                <span
                  className="timed-mode-label"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "5px",
                    fontSize: "12px", fontWeight: 700, letterSpacing: "0.04em",
                    color: "var(--accent-secondary)",
                    background: "rgba(var(--bg-secondary-rgb), 0.65)",
                    border: "1px solid rgba(var(--border-color-rgb), 0.4)",
                    borderRadius: "999px", padding: "3px 12px",
                  }}
                >
                  ⏱ Timed Mode
                </span>
              )}

              {/* Attempt number — screen only */}
              {isRetake && (
                <span
                  className="no-print"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "5px",
                    fontSize: "12px", fontWeight: 600,
                    color: "var(--text-secondary)",
                    background: "rgba(var(--bg-secondary-rgb), 0.65)",
                    border: "1px solid rgba(var(--border-color-rgb), 0.35)",
                    borderRadius: "999px", padding: "3px 12px",
                  }}
                >
                  Attempt {attemptNumber}
                  {totalAttempts !== null && totalAttempts > 1 && (
                    <span style={{ opacity: 0.65, fontWeight: 400 }}>of {totalAttempts}</span>
                  )}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="divider" style={{ height: "2px", background: "var(--border-color)", margin: "0 0 24px" }} />

        {/* Course details */}
        <div style={{ marginBottom: "24px" }}>
          <h2 className="sub-heading" style={{ fontSize: "24px", marginBottom: "8px", color: "var(--text-primary)" }}>
            {moduleId} - {moduleName}
          </h2>
          <p className="secondary-text" style={{ fontSize: "18px", color: "var(--text-secondary)" }}>
            Week {weekId} Assessment
          </p>
        </div>

        {/* Score display */}
        <div className="score-display" style={{ background: "var(--bg-secondary)", borderRadius: "8px", padding: "20px", marginBottom: "24px" }}>
          <div
            className={`score-value ${passed ? "passed" : "not-passed"}`}
            style={{ fontSize: "48px", fontWeight: "bold", color: passed ? "#76d13d" : "#f4a900", marginBottom: "8px" }}
          >
            {score}/{totalQuestions}
          </div>
          <div className="secondary-text" style={{ fontSize: "24px", color: "var(--text-secondary)" }}>
            {percentage}% Correct
          </div>
        </div>

        {/* Status message */}
        <p className="secondary-text" style={{ fontSize: "16px", color: "var(--text-secondary)", marginBottom: "24px" }}>
          {passed
            ? timedMode
              ? "Congratulations! You passed under timed conditions — that's the real thing."
              : "Congratulations! You have successfully demonstrated understanding of this week's material."
            : isRetake
            ? "Keep going — each attempt builds your understanding. Review the explanations and try again."
            : "You've completed the assessment. Review the material and try again to improve your score."}
        </p>

        {/* Completion date */}
        <div style={{ marginBottom: "24px" }}>
          <p className="secondary-text" style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
            Completed on: {completionDate}
          </p>
        </div>

        {/* Print button */}
        <button
          className="button no-print"
          onClick={handlePrint}
          style={{ padding: "12px 32px", fontSize: "16px", background: "var(--accent-primary)" }}
        >
          🖨️ Print Certificate
        </button>

        {/* Seal */}
        <div className="seal" style={{ marginTop: "32px", paddingTop: "24px", borderTop: "2px solid var(--border-color)" }}>
          <a
            href="https://student-assessment-platform.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="secondary-text"
            style={{ fontSize: "12px", color: "var(--text-secondary)", fontStyle: "italic", textDecoration: "none" }}
          >
            Student Assessment Platform
          </a>
        </div>
      </div>
    </>
  );
}
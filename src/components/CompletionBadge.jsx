export default function CompletionBadge({
  moduleId,
  moduleName,
  weekId,
  score,
  totalQuestions,
  completionDate,
  attemptNumber = null,
  totalAttempts = null,
  timedMode = false,
  studentName = "",
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
    const body = document.body;
    const printHost = document.createElement("div");

    printHost.className = "completion-badge-print-host";
    printHost.style.position = "fixed";
    printHost.style.inset = "0";
    printHost.style.zIndex = "999999";
    printHost.style.background = "white";
    printHost.style.padding = "24px";
    printHost.style.overflow = "auto";
    printHost.style.display = "flex";
    printHost.style.alignItems = "center";
    printHost.style.justifyContent = "center";

    const badge = document.querySelector(".completion-badge");
    if (badge) {
      const clone = badge.cloneNode(true);
      printHost.appendChild(clone);
      body.appendChild(printHost);
      body.classList.add("print-certificate-only");
      document.title = filename;

      const cleanup = () => {
        body.classList.remove("print-certificate-only");
        if (body.contains(printHost)) {
          body.removeChild(printHost);
        }
        document.title = prevTitle;
        window.removeEventListener("afterprint", cleanup);
      };

      window.addEventListener("afterprint", cleanup);
      window.print();
    }
  }

  return (
    <>
      <style>
        {`
          @media print {
            body.print-certificate-only * { visibility: hidden !important; }
            body.print-certificate-only .completion-badge-print-host,
            body.print-certificate-only .completion-badge-print-host * {
              visibility: visible !important;
            }
            body.print-certificate-only .completion-badge-print-host {
              position: absolute !important;
              inset: 0 !important;
              display: flex !important;
              align-items: center !important;
              justify-content: center !important;
              padding: 0 !important;
              margin: 0 !important;
              background: white !important;
            }
            body.print-certificate-only .completion-badge {
              box-shadow: none !important;
              width: auto !important;
              max-width: 100% !important;
              margin: 0 !important;
              background: var(--bg-card) !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              color-adjust: exact !important;
            }
            body.print-certificate-only .completion-badge .badge-circle,
            body.print-certificate-only .completion-badge .score-display,
            body.print-certificate-only .completion-badge .timed-mode-label {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              color-adjust: exact !important;
            }
            body.print-certificate-only .no-print { display: none !important; }
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
            style={{ fontSize: "18px", color: "var(--text-secondary)", marginBottom: studentName ? "6px" : "12px" }}
          >
            Certificate of Completion
          </p>

          {studentName && (
            <p
              className="secondary-text"
              style={{ fontSize: "15px", color: "var(--text-primary)", fontWeight: 600, marginBottom: "12px" }}
            >
              Issued to {studentName}
            </p>
          )}

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
          style={{ padding: "12px 32px", fontSize: "16px", background: "var(--accent-secondary)" }}
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
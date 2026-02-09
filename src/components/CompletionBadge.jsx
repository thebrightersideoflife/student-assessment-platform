export default function CompletionBadge({ 
  moduleId, 
  moduleName,
  weekId, 
  score, 
  totalQuestions,
  completionDate 
}) {
  const percentage = Math.round((score / totalQuestions) * 100);
  const passed = percentage >= 70;

  function handlePrint() {
    window.print();
  }

  return (
    <div 
      className="completion-badge"
      style={{
        background: "var(--bg-card)",
        border: `3px solid ${passed ? "var(--lush-lime)" : "var(--golden-amber)"}`,
        borderRadius: "12px",
        padding: "32px",
        textAlign: "center",
        maxWidth: "600px",
        margin: "24px auto",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
      }}
    >
      {/* Badge header */}
      <div style={{ marginBottom: "24px" }}>
        <div style={{
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          background: passed 
            ? "linear-gradient(135deg, var(--lush-lime), var(--vibrant-cyan))"
            : "linear-gradient(135deg, var(--golden-amber), var(--sunset-orange))",
          margin: "0 auto 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "36px",
          color: "white",
          fontWeight: "bold"
        }}>
          {passed ? "✓" : "★"}
        </div>
        
        <h1 style={{ 
          fontSize: "32px", 
          marginBottom: "8px",
          color: "var(--text-primary)" 
        }}>
          {passed ? "Assessment Passed!" : "Assessment Complete!"}
        </h1>
        
        <p style={{ 
          fontSize: "18px",
          color: "var(--text-secondary)",
          marginBottom: "24px"
        }}>
          Certificate of Completion
        </p>
      </div>

      {/* Divider */}
      <div style={{
        height: "2px",
        background: "var(--border-color)",
        margin: "24px 0"
      }} />

      {/* Course details */}
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ 
          fontSize: "24px",
          marginBottom: "8px",
          color: "var(--text-primary)"
        }}>
          {moduleId} - {moduleName}
        </h2>
        <p style={{ 
          fontSize: "18px",
          color: "var(--text-secondary)"
        }}>
          Week {weekId} Assessment
        </p>
      </div>

      {/* Score display */}
      <div style={{
        background: "var(--bg-secondary)",
        borderRadius: "8px",
        padding: "20px",
        marginBottom: "24px"
      }}>
        <div style={{ 
          fontSize: "48px",
          fontWeight: "bold",
          color: passed ? "var(--lush-lime)" : "var(--golden-amber)",
          marginBottom: "8px"
        }}>
          {score}/{totalQuestions}
        </div>
        <div style={{
          fontSize: "24px",
          color: "var(--text-secondary)"
        }}>
          {percentage}% Correct
        </div>
      </div>

      {/* Status message */}
      <p style={{
        fontSize: "16px",
        color: "var(--text-secondary)",
        marginBottom: "24px"
      }}>
        {passed 
          ? "Congratulations! You have successfully demonstrated understanding of this week's material."
          : "You've completed the assessment. Review the material and try again to improve your score."}
      </p>

      {/* Completion date */}
      <div style={{ marginBottom: "24px" }}>
        <p style={{ 
          fontSize: "14px",
          color: "var(--text-secondary)"
        }}>
          Completed on: {completionDate}
        </p>
      </div>

      {/* Print button */}
      <button
        className="button"
        onClick={handlePrint}
        style={{
          padding: "12px 32px",
          fontSize: "16px",
          background: "var(--accent-primary)",
          marginRight: "12px"
        }}
      >
        🖨️ Print Certificate
      </button>

      {/* Decorative seal */}
      <div style={{
        marginTop: "32px",
        paddingTop: "24px",
        borderTop: "2px solid var(--border-color)"
      }}>
        <p style={{
          fontSize: "12px",
          color: "var(--text-secondary)",
          fontStyle: "italic"
        }}>
          Student Assessment Platform
        </p>
      </div>
    </div>
  );
}
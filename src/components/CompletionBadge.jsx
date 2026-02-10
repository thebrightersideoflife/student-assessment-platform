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
    <>
      {/* Print-specific styles to force light mode COLORS while keeping badge design */}
      <style>
        {`
          @media print {
            .completion-badge {
              background: white !important;
            }
            
            /* Keep border color based on pass/fail */
            .completion-badge.passed {
              border-color: #76d13d !important;
            }
            
            .completion-badge.not-passed {
              border-color: #f4a900 !important;
            }
            
            /* Force dark text for readability */
            .completion-badge .main-heading {
              color: #000 !important;
            }
            
            .completion-badge .sub-heading {
              color: #000 !important;
            }
            
            .completion-badge .secondary-text {
              color: #666 !important;
            }
            
            /* Keep score colors based on pass/fail */
            .completion-badge .score-value.passed {
              color: #76d13d !important;
            }
            
            .completion-badge .score-value.not-passed {
              color: #f4a900 !important;
            }
            
            /* Light background for score section */
            .completion-badge .score-display {
              background: #f5f5f5 !important;
            }
            
            /* Keep divider visible */
            .completion-badge .divider {
              background: #ddd !important;
            }
            
            /* Keep seal border visible */
            .completion-badge .seal {
              border-top-color: #ddd !important;
            }
            
            /* Keep gradient badge circle with colors */
            .completion-badge .badge-circle.passed {
              background: linear-gradient(135deg, #76d13d, #00d4ff) !important;
            }
            
            .completion-badge .badge-circle.not-passed {
              background: linear-gradient(135deg, #f4a900, #ff6b35) !important;
            }
          }
        `}
      </style>

      <div 
        className={`completion-badge ${passed ? 'passed' : 'not-passed'}`}
        style={{
          background: "var(--bg-card)",
          border: `3px solid ${passed ? "#76d13d" : "#f4a900"}`,
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
          <div 
            className={`badge-circle ${passed ? 'passed' : 'not-passed'}`}
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: passed 
                ? "linear-gradient(135deg, #76d13d, #00d4ff)"
                : "linear-gradient(135deg, #f4a900, #ff6b35)",
              margin: "0 auto 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "36px",
              color: "white",
              fontWeight: "bold"
            }}
          >
            {passed ? "✓" : "★"}
          </div>
          
          <h1 
            className="main-heading"
            style={{ 
              fontSize: "32px", 
              marginBottom: "8px",
              color: "var(--text-primary)" 
            }}
          >
            {passed ? "Assessment Passed!" : "Assessment Complete!"}
          </h1>
          
          <p 
            className="secondary-text"
            style={{ 
              fontSize: "18px",
              color: "var(--text-secondary)",
              marginBottom: "24px"
            }}
          >
            Certificate of Completion
          </p>
        </div>

        {/* Divider */}
        <div 
          className="divider"
          style={{
            height: "2px",
            background: "var(--border-color)",
            margin: "24px 0"
          }} 
        />

        {/* Course details */}
        <div style={{ marginBottom: "24px" }}>
          <h2 
            className="sub-heading"
            style={{ 
              fontSize: "24px",
              marginBottom: "8px",
              color: "var(--text-primary)"
            }}
          >
            {moduleId} - {moduleName}
          </h2>
          <p 
            className="secondary-text"
            style={{ 
              fontSize: "18px",
              color: "var(--text-secondary)"
            }}
          >
            Week {weekId} Assessment
          </p>
        </div>

        {/* Score display */}
        <div 
          className="score-display"
          style={{
            background: "var(--bg-secondary)",
            borderRadius: "8px",
            padding: "20px",
            marginBottom: "24px"
          }}
        >
          <div 
            className={`score-value ${passed ? 'passed' : 'not-passed'}`}
            style={{ 
              fontSize: "48px",
              fontWeight: "bold",
              color: passed ? "#76d13d" : "#f4a900",
              marginBottom: "8px"
            }}
          >
            {score}/{totalQuestions}
          </div>
          <div 
            className="secondary-text"
            style={{
              fontSize: "24px",
              color: "var(--text-secondary)"
            }}
          >
            {percentage}% Correct
          </div>
        </div>

        {/* Status message */}
        <p 
          className="secondary-text"
          style={{
            fontSize: "16px",
            color: "var(--text-secondary)",
            marginBottom: "24px"
          }}
        >
          {passed 
            ? "Congratulations! You have successfully demonstrated understanding of this week's material."
            : "You've completed the assessment. Review the material and try again to improve your score."}
        </p>

        {/* Completion date */}
        <div style={{ marginBottom: "24px" }}>
          <p 
            className="secondary-text"
            style={{ 
              fontSize: "14px",
              color: "var(--text-secondary)"
            }}
          >
            Completed on: {completionDate}
          </p>
        </div>

        {/* Print button */}
        <button
          className="button no-print"
          onClick={handlePrint}
          style={{
            padding: "12px 32px",
            fontSize: "16px",
            background: "var(--accent-primary)"
          }}
        >
          🖨️ Print Certificate
        </button>

        {/* Decorative seal */}
        <div 
          className="seal"
          style={{
            marginTop: "32px",
            paddingTop: "24px",
            borderTop: "2px solid var(--border-color)"
          }}
        >
          <p 
            className="secondary-text"
            style={{
              fontSize: "12px",
              color: "var(--text-secondary)",
              fontStyle: "italic"
            }}
          >
            Student Assessment Platform
          </p>
        </div>
      </div>
    </>
  );
}
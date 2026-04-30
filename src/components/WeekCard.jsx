// src/components/WeekCard.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AssessmentStorage from "../utils/assessmentStorage";
import { getWeekLabel, getWeekKindConfig } from "../utils/questionHelpers";

export default function WeekCard({ moduleId, week, hasQuestions, blockWeekNumber }) {
  const navigate = useNavigate();
  const [completionStatus, setCompletionStatus] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const checkCompletion = () => {
      const status = AssessmentStorage.getCompletionStatus(moduleId, week.id);
      setCompletionStatus(status);
      setIsCompleted(status !== null);
    };
    checkCompletion();
    const unsubscribe = AssessmentStorage.subscribe((event) => {
      if (
        event.detail.clearAll ||
        (event.detail.moduleId === moduleId && event.detail.weekId === week.id)
      ) {
        checkCompletion();
      }
    });
    return unsubscribe;
  }, [moduleId, week.id]);

  function handleClick() {
    if (!hasQuestions) return;
    navigate(`/module/${moduleId}/week/${week.id}`);
  }

  const kindConfig = getWeekKindConfig(week.kind);

  // Border: completion wins over kind, kind wins over default
  const borderColor = isCompleted
    ? "rgba(118,209,61,0.6)"
    : kindConfig
      ? kindConfig.borderColor
      : "rgba(var(--border-color-rgb),0.45)";

  const bgOverlay = !hasQuestions
    ? "repeating-linear-gradient(45deg, rgba(var(--bg-card-rgb),0.7), rgba(var(--bg-card-rgb),0.7) 10px, rgba(var(--bg-card-rgb),0.55) 10px, rgba(var(--bg-card-rgb),0.55) 20px)"
    : isCompleted
      ? "linear-gradient(135deg, rgba(118,209,61,0.08), rgba(var(--bg-card-rgb),0.82))"
      : kindConfig
        ? `linear-gradient(135deg, ${kindConfig.bgColor}, rgba(var(--bg-card-rgb),0.82))`
        : "rgba(var(--bg-card-rgb),0.72)";

  return (
    <div
      onClick={handleClick}
      style={{
        background: bgOverlay,
        backdropFilter: "blur(12px) saturate(160%)",
        WebkitBackdropFilter: "blur(12px) saturate(160%)",
        border: `1px solid ${borderColor}`,
        borderRadius: "14px",
        padding: "20px",
        marginBottom: "16px",
        position: "relative",
        opacity: hasQuestions ? 1 : 0.45,
        cursor: hasQuestions ? "pointer" : "not-allowed",
        pointerEvents: hasQuestions ? "auto" : "none",
        transition: "transform 0.2s cubic-bezier(0.4,0,0.2,1), background 0.2s ease, border-color 0.2s ease",
      }}
      onMouseEnter={(e) => {
        if (!hasQuestions) return;
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.borderColor = isCompleted
          ? "rgba(118,209,61,0.85)"
          : kindConfig
            ? kindConfig.color
            : "rgba(var(--border-color-rgb),0.75)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.background = bgOverlay;
        e.currentTarget.style.borderColor = borderColor;
      }}
    >
      {/* Kind badge — top left */}
      {kindConfig && (
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "5px",
          marginBottom: "10px",
          background: kindConfig.bgColor,
          border: `1px solid ${kindConfig.borderColor}`,
          color: kindConfig.color,
          borderRadius: "999px", padding: "3px 10px",
          fontSize: "12px", fontWeight: 600,
        }}>
          {week.kind === "exam" ? "🎓" : "📋"} {kindConfig.label}
        </div>
      )}

      {/* Completion badge — top right, absolute */}
      {isCompleted && (
        <div style={{
          position: "absolute", top: "14px", right: "14px",
          background: "rgba(118,209,61,0.18)",
          backdropFilter: "blur(8px)",
          color: "var(--lush-lime)",
          border: "1px solid rgba(118,209,61,0.4)",
          padding: "5px 12px", borderRadius: "20px",
          fontSize: "12px", fontWeight: 600,
          display: "flex", alignItems: "center", gap: "5px",
        }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          Completed
        </div>
      )}

      {/* Title — sequential week name + optional block-week sub-label */}
      <h3 style={{ marginBottom: "4px" }}>
        {getWeekLabel(week)}
        {blockWeekNumber && blockWeekNumber !== parseInt(week.id) && (
          <span style={{
            marginLeft: "10px",
            fontSize: "13px",
            fontWeight: 500,
            color: "var(--text-secondary)",
            opacity: 0.75,
          }}>
            (Block {week.block}'s Week {blockWeekNumber})
          </span>
        )}
      </h3>

      {/* Kind description */}
      {kindConfig && !isCompleted && (
        <p style={{ fontSize: "13px", color: kindConfig.color, marginBottom: "4px", fontWeight: 500 }}>
          {kindConfig.description}
        </p>
      )}

      {/* Completion stats */}
      {isCompleted && completionStatus && (
        <div style={{
          marginTop: "12px", paddingTop: "12px",
          borderTop: "1px solid rgba(var(--border-color-rgb),0.35)",
          display: "flex", gap: "16px",
          fontSize: "14px", color: "var(--text-secondary)",
        }}>
          <div><strong>Score:</strong> {completionStatus.score}/{completionStatus.totalQuestions}</div>
          <div><strong>Grade:</strong> {completionStatus.percentage}%</div>
          <div style={{
            marginLeft: "auto",
            color: completionStatus.percentage >= 70 ? "var(--lush-lime)" : "var(--golden-amber)",
            fontWeight: 600,
          }}>
            {completionStatus.percentage >= 70 ? "Passed" : "Completed"}
          </div>
        </div>
      )}

      {/* Default subtitle */}
      {!isCompleted && (
        <p style={{ marginTop: "4px", fontSize: "14px", color: "var(--text-secondary)" }}>
          {hasQuestions ? "Click to start assessment" : "Assessment not yet available"}
        </p>
      )}
    </div>
  );
}
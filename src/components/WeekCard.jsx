import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AssessmentStorage from "../utils/assessmentStorage";

export default function WeekCard({ moduleId, week }) {
  const navigate = useNavigate();
  
  // Use state to track completion status so it updates when localStorage changes
  const [completionStatus, setCompletionStatus] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  
  // Check completion status and subscribe to storage updates
  useEffect(() => {
    const checkCompletion = () => {
      const status = AssessmentStorage.getCompletionStatus(moduleId, week.id);
      setCompletionStatus(status);
      setIsCompleted(status !== null);
    };
    
    // Check immediately on mount
    checkCompletion();
    
    // Subscribe to storage changes
    const unsubscribe = AssessmentStorage.subscribe((event) => {
      // Re-check completion if this week's data changed or if all data was cleared
      if (event.detail.clearAll || 
          (event.detail.moduleId === moduleId && event.detail.weekId === week.id)) {
        checkCompletion();
      }
    });
    
    // Cleanup subscription
    return unsubscribe;
  }, [moduleId, week.id]);
  
  function handleClick() {
    navigate(`/module/${moduleId}/week/${week.id}`);
  }

  return (
    <div
      className="card"
      onClick={handleClick}
      style={{
        cursor: "pointer",
        marginBottom: "16px",
        position: "relative",
        border: isCompleted 
          ? "2px solid var(--lush-lime)" 
          : "1px solid var(--border-color)",
        background: isCompleted 
          ? "linear-gradient(135deg, rgba(118, 209, 61, 0.05), transparent)"
          : "var(--bg-card)"
      }}
    >
      {/* Completion Badge */}
      {isCompleted && (
        <div style={{
          position: "absolute",
          top: "12px",
          right: "12px",
          background: "var(--lush-lime)",
          color: "white",
          padding: "6px 12px",
          borderRadius: "20px",
          fontSize: "12px",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          gap: "6px"
        }}>
          <span>✓</span>
          <span>Completed</span>
        </div>
      )}

      <h3 style={{ 
        marginBottom: isCompleted ? "8px" : "0"
      }}>
        {week.name}
      </h3>
      
      {isCompleted && completionStatus && (
        <div style={{
          marginTop: "12px",
          paddingTop: "12px",
          borderTop: "1px solid var(--border-color)",
          display: "flex",
          gap: "16px",
          fontSize: "14px",
          color: "var(--text-secondary)"
        }}>
          <div>
            <strong>Score:</strong> {completionStatus.score}/{completionStatus.totalQuestions}
          </div>
          <div>
            <strong>Grade:</strong> {completionStatus.percentage}%
          </div>
          <div style={{
            marginLeft: "auto",
            color: completionStatus.percentage >= 70 ? "var(--lush-lime)" : "var(--golden-amber)"
          }}>
            {completionStatus.percentage >= 70 ? "Passed" : "Completed"}
          </div>
        </div>
      )}
      
      {!isCompleted && (
        <p style={{ 
          marginTop: "8px",
          fontSize: "14px",
          color: "var(--text-secondary)" 
        }}>
          Click to start assessment →
        </p>
      )}
    </div>
  );
}
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import QuestionRenderer from "../components/QuestionRenderer";
import CompletionBadge from "../components/CompletionBadge";
import PrintableQuestions from "../components/PrintableQuestions";
import AssessmentStorage from "../utils/assessmentStorage";
import { questions } from "../data/questions";
import { modules } from "../data/modules";

export default function AssessmentPage() {
  const { moduleId, weekId } = useParams();
  const navigate = useNavigate();
  
  const moduleQuestions = questions[moduleId]?.[weekId] || [];
  const moduleInfo = modules.find(m => m.id === moduleId);
  
  // Check if assessment was previously completed
  const completionStatus = AssessmentStorage.getCompletionStatus(moduleId, weekId);
  const wasCompleted = completionStatus !== null;
  
  // Load in-progress answers if they exist
  const savedProgress = AssessmentStorage.loadProgress(moduleId, weekId);
  
  // Track answers: { questionId: { answer, isCorrect, checked } }
  const [answers, setAnswers] = useState(savedProgress?.answers || {});
  const [submitted, setSubmitted] = useState(false);
  const [showPrintView, setShowPrintView] = useState(false);
  
  // If already completed, show certificate page immediately
  const [showCertificate, setShowCertificate] = useState(wasCompleted);

  // Auto-save progress when answers change (only if not completed)
  useEffect(() => {
    if (!wasCompleted && !submitted && Object.keys(answers).length > 0) {
      AssessmentStorage.saveProgress(moduleId, weekId, answers);
    }
  }, [answers, moduleId, weekId, wasCompleted, submitted]);

  function handleAnswerChange(questionId, answerData) {
    setAnswers(prev => {
      const newAnswers = {
        ...prev,
        [questionId]: answerData
      };
      
      // Check if this was the last question and it was just checked
      if (answerData.checked) {
        const allAnswered = requiredQuestions.every(q => 
          q.id === questionId ? answerData.checked : newAnswers[q.id]?.checked
        );
        
        if (allAnswered && !submitted) {
          // All questions answered! Auto-submit
          setTimeout(() => {
            const correctCount = requiredQuestions.filter(q => 
              q.id === questionId 
                ? answerData.isCorrect 
                : newAnswers[q.id]?.isCorrect
            ).length;
            
            // Save completion to local storage (ONLY score and status)
            // This also clears in-progress data
            AssessmentStorage.markCompleted(
              moduleId, 
              weekId, 
              correctCount, 
              requiredQuestions.length
            );
            
            setSubmitted(true);
            setShowCertificate(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }, 500); // Small delay for smooth UX
        }
      }
      
      return newAnswers;
    });
  }

  function handleSubmit() {
    // Check if all required questions are answered
    const requiredQuestions = moduleQuestions.filter(q => 
      q.type === "open-ended" || q.type === "multiple-choice"
    );
    
    const unansweredCount = requiredQuestions.filter(q => 
      !answers[q.id]?.checked
    ).length;

    if (unansweredCount > 0) {
      alert(`Please answer all questions before submitting. ${unansweredCount} question(s) remaining.`);
      return;
    }

    // Calculate score
    const correctCount = requiredQuestions.filter(q => 
      answers[q.id]?.isCorrect
    ).length;

    // Save completion to local storage (ONLY score and status)
    // This also clears in-progress data
    AssessmentStorage.markCompleted(
      moduleId, 
      weekId, 
      correctCount, 
      requiredQuestions.length
    );

    setSubmitted(true);
    setShowCertificate(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleRedo() {
    if (!window.confirm("Are you sure you want to redo this assessment? Your previous score will be lost.")) {
      return;
    }
    
    // Reset local storage and state
    AssessmentStorage.resetAssessment(moduleId, weekId);
    setAnswers({});
    setSubmitted(false);
    setShowCertificate(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Calculate score (use stored score if completed, or current answers)
  const requiredQuestions = moduleQuestions.filter(q => 
    q.type === "open-ended" || q.type === "multiple-choice"
  );
  
  const correctCount = wasCompleted && completionStatus 
    ? completionStatus.score 
    : requiredQuestions.filter(q => answers[q.id]?.isCorrect).length;

  const totalQuestions = wasCompleted && completionStatus
    ? completionStatus.totalQuestions
    : requiredQuestions.length;

  const allQuestionsAnswered = requiredQuestions.every(q => 
    answers[q.id]?.checked
  );

  const completionDate = completionStatus?.completedDate 
    ? new Date(completionStatus.completedDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

  // Show printable question sheet
  if (showPrintView) {
    return (
      <div className="container">
        {/* Header */}
        <div 
          className="no-print"
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "24px"
          }}
        >
          <button
            className="button"
            onClick={() => setShowPrintView(false)}
          >
            ← Back to Assessment
          </button>
          <ThemeToggle />
        </div>

        <PrintableQuestions
          moduleId={moduleId}
          moduleName={moduleInfo?.name || moduleId}
          weekId={weekId}
          questions={moduleQuestions}
          examData={null}
        />
      </div>
    );
  }

  // Show completion certificate
  if (showCertificate) {
    return (
      <div className="container">
        {/* Header */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "24px"
        }}>
          <button
            className="button"
            onClick={() => navigate(`/module/${moduleId}`)}
          >
            ← Back to Weeks
          </button>
          <ThemeToggle />
        </div>

        {/* Previously Completed Notice */}
        {wasCompleted && (
          <div style={{
            background: "var(--bg-secondary)",
            border: "2px solid var(--accent-primary)",
            borderRadius: "8px",
            padding: "16px",
            marginBottom: "24px",
            display: "flex",
            alignItems: "center",
            gap: "12px"
          }}>
            <span style={{ fontSize: "24px" }}>ℹ️</span>
            <div>
              <strong>Previously Completed Assessment</strong>
              <p style={{ 
                fontSize: "14px", 
                color: "var(--text-secondary)",
                marginTop: "4px" 
              }}>
                You completed this assessment on {completionDate}.
              </p>
            </div>
          </div>
        )}

        {/* Completion Badge */}
        <CompletionBadge
          moduleId={moduleId}
          moduleName={moduleInfo?.name || moduleId}
          weekId={weekId}
          score={correctCount}
          totalQuestions={totalQuestions}
          completionDate={completionDate}
        />

        {/* Action buttons */}
        <div style={{
          display: "flex",
          gap: "12px",
          justifyContent: "center",
          marginTop: "24px",
          flexWrap: "wrap"
        }}>
          <button
            className="button"
            onClick={() => navigate(`/module/${moduleId}`)}
            style={{ 
              padding: "14px 32px",
              fontSize: "16px",
              background: "var(--accent-primary)" 
            }}
          >
            📚 Back to Weeks
          </button>
          
          <button
            className="button"
            onClick={handleRedo}
            style={{
              padding: "14px 32px",
              fontSize: "16px",
              background: "var(--accent-secondary)"
            }}
          >
            🔄 Redo Assessment
          </button>
        </div>
      </div>
    );
  }

  // Show assessment (taking test)
  return (
    <div className="container">
      {/* Header */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "24px"
      }}>
        <button
          className="button"
          onClick={() => navigate(`/module/${moduleId}`)}
        >
          ← Back
        </button>
        <ThemeToggle />
      </div>

      {/* Title and Print Button Row */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: "24px",
        gap: "16px"
      }}>
        <div>
          <h1 style={{ marginBottom: "8px" }}>
            {moduleId} Assessment
          </h1>
          <h2 style={{
            marginBottom: "0",
            color: "var(--text-secondary)"
          }}>
            Week {weekId}
          </h2>
        </div>
        
        <button
          className="button"
          onClick={() => setShowPrintView(true)}
          style={{
            padding: "12px 24px",
            fontSize: "14px",
            background: "var(--accent-secondary)",
            whiteSpace: "nowrap"
          }}
        >
          🖨️ Print Questions
        </button>
      </div>

      {/* In Progress Notice */}
      {savedProgress && Object.keys(answers).length > 0 && !submitted && (
        <div style={{
          background: "rgba(244, 169, 0, 0.1)",
          border: "2px solid var(--golden-amber)",
          borderRadius: "8px",
          padding: "16px",
          marginBottom: "24px",
          display: "flex",
          alignItems: "center",
          gap: "12px"
        }}>
          <span style={{ fontSize: "24px" }}>💾</span>
          <div>
            <strong style={{ color: "var(--golden-amber)" }}>Progress Saved</strong>
            <p style={{ 
              fontSize: "14px", 
              color: "var(--text-secondary)",
              marginTop: "4px" 
            }}>
              Your answers are automatically saved. You can leave and come back anytime.
            </p>
          </div>
        </div>
      )}

      {/* Progress indicator */}
      <div 
        className="card" 
        style={{ 
          marginBottom: "24px",
          background: "var(--bg-secondary)"
        }}
      >
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <div>
            <strong>Progress:</strong> {Object.keys(answers).filter(id => answers[id]?.checked).length} of {requiredQuestions.length} answered
          </div>
          <div style={{
            color: allQuestionsAnswered ? "var(--lush-lime)" : "var(--text-secondary)"
          }}>
            {allQuestionsAnswered ? "✓ Ready to submit" : "○ In progress"}
          </div>
        </div>
        
        {/* Progress bar */}
        <div style={{
          marginTop: "12px",
          height: "8px",
          background: "var(--border-color)",
          borderRadius: "4px",
          overflow: "hidden"
        }}>
          <div style={{
            height: "100%",
            background: "var(--accent-primary)",
            width: `${(Object.keys(answers).filter(id => answers[id]?.checked).length / requiredQuestions.length) * 100}%`,
            transition: "width 0.3s ease"
          }} />
        </div>
      </div>

      {/* Questions */}
      {moduleQuestions.map((question, index) => (
        <QuestionRenderer
          key={question.id}
          question={question}
          index={index}
          onAnswerChange={handleAnswerChange}
          savedAnswer={answers[question.id]}
          locked={false}
        />
      ))}

      {/* Submit/Action buttons */}
      <div style={{
        marginTop: "32px",
        padding: "24px",
        background: "var(--bg-secondary)",
        borderRadius: "8px",
        textAlign: "center"
      }}>
        <div style={{
          display: "flex",
          gap: "12px",
          justifyContent: "center",
          flexWrap: "wrap",
          marginBottom: "12px"
        }}>
          <button
            className="button"
            onClick={handleSubmit}
            disabled={!allQuestionsAnswered}
            style={{
              padding: "14px 48px",
              fontSize: "18px",
              opacity: allQuestionsAnswered ? 1 : 0.5,
              cursor: allQuestionsAnswered ? "pointer" : "not-allowed",
              background: allQuestionsAnswered ? "var(--lush-lime)" : "var(--accent-primary)"
            }}
          >
            {allQuestionsAnswered ? "✓ Submit Assessment" : `○ Answer all questions (${requiredQuestions.length - Object.keys(answers).filter(id => answers[id]?.checked).length} remaining)`}
          </button>
        </div>
        
        {!allQuestionsAnswered && (
          <p style={{
            marginTop: "12px",
            fontSize: "14px",
            color: "var(--text-secondary)"
          }}>
            Check your answers before submitting
          </p>
        )}
      </div>
    </div>
  );
}
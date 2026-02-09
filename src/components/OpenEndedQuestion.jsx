import { useState, useEffect } from "react";
import AnswerValidator from "../utils/answerValidator";

export default function OpenEndedQuestion({ 
  question, 
  index, 
  onAnswerChange,
  savedAnswer = null,
  locked = false 
}) {
  const [answer, setAnswer] = useState(savedAnswer?.answer || "");
  const [checked, setChecked] = useState(savedAnswer?.checked || false);
  const [validationResult, setValidationResult] = useState(null);

  // Support both old (answer) and new (correctAnswers) structure
  const correctAnswer = question.correctAnswers || question.answer;

  // Load saved answer on mount
  useEffect(() => {
    if (savedAnswer) {
      setAnswer(savedAnswer.answer || "");
      setChecked(savedAnswer.checked || false);
      
      // Re-validate saved answer to show results
      if (savedAnswer.checked && savedAnswer.answer) {
        const result = AnswerValidator.validate(
          savedAnswer.answer,
          correctAnswer,
          question.validationOptions || {}
        );
        setValidationResult(result);
      }
    }
  }, [savedAnswer, correctAnswer, question.validationOptions]);

  function handleCheck() {
    const result = AnswerValidator.validate(
      answer, 
      correctAnswer,
      question.validationOptions || {}
    );
    
    setValidationResult(result);
    setChecked(true);
    
    // Report answer status to parent (if not locked)
    if (onAnswerChange && !locked) {
      onAnswerChange(question.id, {
        answer,
        isCorrect: result.equivalent,
        checked: true
      });
    }
  }

  function handleAnswerChange(e) {
    if (locked) return; // Don't allow changes in locked mode
    
    const newAnswer = e.target.value;
    setAnswer(newAnswer);
    setChecked(false);
    
    // Report unchecked status to parent (if not locked)
    if (onAnswerChange && !locked) {
      onAnswerChange(question.id, {
        answer: newAnswer,
        isCorrect: false,
        checked: false
      });
    }
  }

  const isCorrect = validationResult?.equivalent;

  // Get the display answer (handle both string and array)
  const displayAnswer = Array.isArray(correctAnswer) ? correctAnswer[0] : correctAnswer;

  return (
    <div className="card" style={{ marginBottom: "16px" }}>
      {/* Locked indicator */}
      {locked && (
        <div style={{
          background: "rgba(118, 209, 61, 0.1)",
          border: "1px solid var(--lush-lime)",
          borderRadius: "6px",
          padding: "8px 12px",
          marginBottom: "12px",
          fontSize: "13px",
          display: "flex",
          alignItems: "center",
          gap: "8px"
        }}>
          <span>🔒</span>
          <span style={{ color: "var(--lush-lime)", fontWeight: "500" }}>
            Review Mode - Your previous answer
          </span>
        </div>
      )}

      <h3>Question {index + 1}</h3>
      <p style={{ marginBottom: "12px" }}>
        {question.text || question.question}
      </p>

      {/* Image if present */}
      {question.image && (
        <div style={{
          marginBottom: "16px",
          textAlign: "center",
          padding: "12px",
          background: "var(--bg-secondary)",
          borderRadius: "8px",
          border: "1px solid var(--border-color)"
        }}>
          <img 
            src={question.image.src} 
            alt={question.image.alt || "Question diagram"}
            style={{
              maxWidth: "100%",
              maxHeight: "300px",
              objectFit: "contain"
            }}
          />
          {question.image.caption && (
            <p style={{
              fontSize: "13px",
              fontStyle: "italic",
              color: "var(--text-secondary)",
              marginTop: "8px"
            }}>
              {question.image.caption}
            </p>
          )}
        </div>
      )}
      
      <input
        type="text"
        value={answer}
        onChange={handleAnswerChange}
        placeholder="Type your answer..."
        disabled={locked}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid var(--border-color)",
          background: locked ? "var(--bg-secondary)" : "var(--bg-card)",
          color: "var(--text-primary)",
          marginBottom: "10px",
          fontSize: "16px",
          cursor: locked ? "not-allowed" : "text",
          opacity: locked ? 0.8 : 1
        }}
      />
      
      {!locked && (
        <button
          className="button"
          onClick={handleCheck}
          disabled={!answer.trim() || checked}
          style={{
            opacity: (!answer.trim() || checked) ? 0.5 : 1,
            cursor: (!answer.trim() || checked) ? 'not-allowed' : 'pointer'
          }}
        >
          Check Answer
        </button>
      )}

      {checked && validationResult && (
        <div style={{ marginTop: "12px" }}>
          <p style={{
            color: isCorrect ? "var(--lush-lime)" : "var(--poppy-red)",
            fontWeight: "bold",
            marginBottom: "8px"
          }}>
            {validationResult.message}
          </p>
          
          {/* Show correct answer if incorrect */}
          {!isCorrect && (
            <div style={{
              background: "var(--bg-secondary)",
              padding: "12px",
              borderRadius: "6px",
              marginTop: "8px",
              border: "1px solid var(--border-color)"
            }}>
              <strong style={{ color: "var(--lush-lime)" }}>Correct Answer:</strong>
              <p style={{ 
                marginTop: "4px",
                color: "var(--text-primary)"
              }}>
                {displayAnswer}
              </p>
            </div>
          )}
          
          {validationResult.hints && validationResult.hints.length > 0 && (
            <div style={{
              background: "var(--bg-secondary)",
              padding: "8px 12px",
              borderRadius: "6px",
              fontSize: "14px",
              color: "var(--text-secondary)",
              marginTop: "8px"
            }}>
              💡 {validationResult.hints.join(", ")}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
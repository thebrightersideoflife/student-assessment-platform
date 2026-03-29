import { useState, useEffect } from "react";
import AnswerValidator from "../utils/answerValidator";

export default function OpenEndedQuestion({
  question,
  index,
  onAnswerChange,
  savedAnswer = null,
  locked = false,
  submitted = false,
}) {
  const [answer, setAnswer] = useState(savedAnswer?.answer || "");
  const [checked, setChecked] = useState(savedAnswer?.checked || false);
  const [validationResult, setValidationResult] = useState(null);

  const correctAnswer = question.correctAnswers || question.answer;

  useEffect(() => {
    if (savedAnswer) {
      setAnswer(savedAnswer.answer || "");
      setChecked(savedAnswer.checked || false);
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

  // If the assessment is submitted and this question hasn't been checked,
  // validate the current answer so we can display the correct answer.
  useEffect(() => {
    if (submitted && !checked) {
      const result = AnswerValidator.validate(
        answer,
        correctAnswer,
        question.validationOptions || {}
      );
      setValidationResult(result);
      setChecked(true);
    }
  }, [submitted]);

  function handleCheck() {
    const result = AnswerValidator.validate(
      answer,
      correctAnswer,
      question.validationOptions || {}
    );
    setValidationResult(result);
    setChecked(true);
    if (onAnswerChange && !locked) {
      onAnswerChange(question.id, {
        answer,
        isCorrect: result.equivalent,
        checked: true,
      });
    }
  }

  function handleAnswerChange(e) {
    if (locked) return;
    const newAnswer = e.target.value;
    setAnswer(newAnswer);
    setChecked(false);
    if (onAnswerChange && !locked) {
      onAnswerChange(question.id, { answer: newAnswer, isCorrect: false, checked: false });
    }
  }

  const isCorrect = validationResult?.equivalent;
  const displayAnswer = Array.isArray(correctAnswer) ? correctAnswer[0] : correctAnswer;

  return (
    <div className="card" style={{ marginBottom: "16px" }}>

      {/* Header row */}
      <div style={{
        display: "flex", justifyContent: "space-between",
        alignItems: "flex-start", marginBottom: "12px",
      }}>
        <div>
          <h3 style={{ margin: "0 0 4px" }}>
            {question.sectionLabel
              ? `${question.sectionLabel} — Question ${index + 1}`
              : `Question ${index + 1}`}
          </h3>
          {locked && (
            <span style={{
              fontSize: "12px", fontWeight: 500,
              color: "var(--lush-lime)",
              background: "rgba(118,209,61,0.1)",
              border: "1px solid rgba(118,209,61,0.35)",
              borderRadius: "999px", padding: "2px 10px",
            }}>
              Review Mode
            </span>
          )}
        </div>
        {question.points && (
          <span style={{
            fontSize: "12px", fontWeight: 600,
            color: "var(--text-secondary)",
            background: "rgba(var(--bg-secondary-rgb), 0.7)",
            border: "1px solid rgba(var(--border-color-rgb), 0.4)",
            borderRadius: "999px", padding: "2px 10px",
            flexShrink: 0,
          }}>
            {question.points} {question.points === 1 ? "mark" : "marks"}
          </span>
        )}
      </div>

      <p style={{ marginBottom: "14px", lineHeight: "1.65", fontSize: "16px" }}>
        {question.text || question.question}
      </p>

      {/* Image */}
      {question.image && (
        <div style={{
          marginBottom: "16px", textAlign: "center", padding: "12px",
          background: "rgba(var(--bg-secondary-rgb), 0.5)",
          borderRadius: "10px", border: "1px solid rgba(var(--border-color-rgb), 0.35)",
        }}>
          <img src={question.image.src} alt={question.image.alt || "Question diagram"}
            style={{ maxWidth: "100%", maxHeight: "300px", objectFit: "contain" }} />
          {question.image.caption && (
            <p style={{ fontSize: "13px", fontStyle: "italic", color: "var(--text-secondary)", marginTop: "8px" }}>
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
          width: "100%", padding: "11px 14px",
          borderRadius: "10px",
          border: `1px solid rgba(var(--border-color-rgb), ${checked ? (isCorrect ? "1" : "1") : "0.5"})`,
          borderColor: checked ? (isCorrect ? "var(--lush-lime)" : "var(--poppy-red)") : "rgba(var(--border-color-rgb), 0.5)",
          background: locked
            ? "rgba(var(--bg-secondary-rgb), 0.5)"
            : "rgba(var(--bg-card-rgb), 0.6)",
          backdropFilter: "blur(6px)",
          color: "var(--text-primary)",
          marginBottom: "12px",
          fontSize: "16px",
          cursor: locked ? "not-allowed" : "text",
          outline: "none",
          transition: "border-color 0.2s ease",
        }}
      />

      {!locked && !submitted && (
        <button
          className="button solid"
          onClick={handleCheck}
          disabled={!answer.trim() || checked}
        >
          Check Answer
        </button>
      )}

      {(checked || submitted) && validationResult && (
        <div style={{ marginTop: "14px" }}>
          <p style={{
            color: isCorrect ? "var(--lush-lime)" : "var(--poppy-red)",
            fontWeight: 700, marginBottom: "8px", fontSize: "15px",
          }}>
            {validationResult.message}
          </p>
          <div style={{
            background: "rgba(var(--bg-secondary-rgb), 0.6)",
            padding: "12px", borderRadius: "8px", marginTop: "8px",
            border: "1px solid rgba(var(--border-color-rgb), 0.35)",
          }}>
            <strong style={{ color: "var(--lush-lime)" }}>Correct Answer:</strong>
            <p style={{ marginTop: "4px", color: "var(--text-primary)" }}>{displayAnswer}</p>
          </div>

          {validationResult.hints && validationResult.hints.length > 0 && (
            <div style={{
              background: "rgba(var(--bg-secondary-rgb), 0.5)",
              padding: "8px 12px", borderRadius: "8px",
              fontSize: "14px", color: "var(--text-secondary)", marginTop: "8px",
              border: "1px solid rgba(var(--border-color-rgb), 0.3)",
            }}>
              💡 {validationResult.hints.join(", ")}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
import { useState, useEffect } from "react";
import AnswerReveal from "./AnswerReveal";

export default function ShowAnswerQuestion({ question, index, submitted = false }) {
  const [showAnswer, setShowAnswer] = useState(false);

  // Reveal automatically when the assessment is submitted
  useEffect(() => {
    if (submitted) setShowAnswer(true);
  }, [submitted]);

  return (
    <div className="card" style={{ marginBottom: "16px" }}>

      {/* Header row */}
      <div style={{
        display: "flex", justifyContent: "space-between",
        alignItems: "flex-start", marginBottom: "8px",
      }}>
        <div>
          <h3 style={{ margin: "0 0 4px" }}>
            {question.sectionLabel
              ? `${question.sectionLabel} — Question ${index + 1}`
              : `Question ${index + 1}`}
          </h3>
          <span style={{
            fontSize: "12px", fontWeight: 500,
            color: "var(--accent-secondary)",
            background: "rgba(var(--bg-secondary-rgb), 0.65)",
            border: "1px solid rgba(var(--border-color-rgb), 0.35)",
            borderRadius: "999px", padding: "2px 10px",
          }}>
            Essay / Self-grade
          </span>
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

      {/* Prompt */}
      <p style={{ marginBottom: "12px", lineHeight: "1.7", fontSize: "16px" }}>
        {question.text}
      </p>

      {/* Image */}
      {question.image && (
        <div style={{
          marginTop: "16px", marginBottom: "16px", textAlign: "center",
          padding: "12px",
          background: "rgba(var(--bg-secondary-rgb), 0.5)",
          borderRadius: "10px", border: "1px solid rgba(var(--border-color-rgb), 0.35)",
        }}>
          <img src={question.image.src} alt={question.image.alt}
            style={{ maxWidth: "100%", height: "auto", borderRadius: "6px" }} />
          {question.image.caption && (
            <p style={{
              fontSize: "14px", color: "var(--text-secondary)",
              fontStyle: "italic", marginTop: "8px",
            }}>
              {question.image.caption}
            </p>
          )}
        </div>
      )}

      {/* Reveal memo button / memo content */}
      {!showAnswer ? (
        <button className="button" onClick={() => setShowAnswer(true)}
          style={{ marginTop: "4px" }}>
          Reveal Memo / Model Answer
        </button>
      ) : (
        <>
          <AnswerReveal answer={question.correctAnswers[0]} />
          {/* Marking guide — optional extra field */}
          {question.markingGuide && (
            <div style={{
              marginTop: "12px",
              background: "rgba(var(--bg-secondary-rgb), 0.55)",
              border: "1px solid rgba(var(--border-color-rgb), 0.35)",
              borderLeft: "3px solid var(--accent-secondary)",
              borderRadius: "10px", padding: "14px 16px",
            }}>
              <p style={{
                fontSize: "12px", fontWeight: 700, letterSpacing: "0.04em",
                color: "var(--accent-secondary)", textTransform: "uppercase",
                marginBottom: "8px",
              }}>
                Marking Guide
              </p>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: "1.65", margin: 0 }}>
                {question.markingGuide}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
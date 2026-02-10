import { useState } from "react";
import AnswerReveal from "./AnswerReveal";

export default function ShowAnswerQuestion({ question, index }) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="card" style={{ marginBottom: "16px" }}>
      <h3>Question {index + 1}</h3>
      <p style={{ marginBottom: "12px", color: "var(--text-secondary)" }}>
        <em>Reference question - no answer required</em>
      </p>
      
      {/* Question Text */}
      <p style={{ marginBottom: "12px" }}>
        {question.text}
      </p>
      
      {/* Image Display (if present) */}
      {question.image && (
        <div style={{ 
          marginTop: "16px", 
          marginBottom: "16px",
          textAlign: "center" 
        }}>
          <img
            src={question.image.src}
            alt={question.image.alt}
            style={{
              maxWidth: "100%",
              height: "auto",
              border: "1px solid var(--border-color)",
              borderRadius: "4px",
              marginBottom: "8px"
            }}
          />
          {question.image.caption && (
            <p style={{
              fontSize: "14px",
              color: "var(--text-secondary)",
              fontStyle: "italic",
              marginTop: "8px"
            }}>
              {question.image.caption}
            </p>
          )}
        </div>
      )}
      
      {/* Show Answer Button or Answer Display */}
      {!showAnswer ? (
        <button
          className="button"
          onClick={() => setShowAnswer(true)}
        >
          Show Answer
        </button>
      ) : (
        <AnswerReveal answer={question.correctAnswers[0]} />
      )}
    </div>
  );
}
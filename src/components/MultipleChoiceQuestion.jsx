import { useState, useEffect } from "react";

export default function MultipleChoiceQuestion({ 
  question, 
  index, 
  onAnswerChange,
  savedAnswer = null,
  locked = false 
}) {
  const [selected, setSelected] = useState(savedAnswer?.answer || null);

  // Support both old (answer) and new (correctAnswers) structure
  const correctAnswer = Array.isArray(question.correctAnswers) 
    ? question.correctAnswers[0] 
    : question.correctAnswers || question.answer;

  // Load saved answer on mount
  useEffect(() => {
    if (savedAnswer?.answer) {
      setSelected(savedAnswer.answer);
    }
  }, [savedAnswer]);

  function handleSelect(option) {
    if (selected !== null || locked) return; // Lock after selection or if in review mode
    
    setSelected(option);
    const isCorrect = option === correctAnswer;
    
    // Report answer to parent (if not locked)
    if (onAnswerChange && !locked) {
      onAnswerChange(question.id, {
        answer: option,
        isCorrect,
        checked: true
      });
    }
  }

  const isCorrect = selected === correctAnswer;

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
      
      {/* Multiple Choice Options */}
      <div style={{ marginTop: "16px" }}>
        {question.options.map((option, i) => {
          const isThisOption = selected === option;
          const isCorrectOption = selected !== null && option === correctAnswer;
          const isWrongSelection = selected !== null && isThisOption && !isCorrect;
          
          let borderColor = "var(--border-color)";
          let backgroundColor = "var(--bg-card)";
          let textColor = "var(--text-primary)";
          
          if (selected !== null) {
            if (isCorrectOption) {
              borderColor = "var(--lush-lime)";
              backgroundColor = "rgba(118, 209, 61, 0.1)";
              textColor = "var(--lush-lime)";
            } else if (isWrongSelection) {
              borderColor = "var(--poppy-red)";
              backgroundColor = "rgba(255, 64, 64, 0.1)";
              textColor = "var(--poppy-red)";
            }
          } else if (isThisOption) {
            borderColor = "var(--accent-primary)";
            backgroundColor = "rgba(42, 92, 167, 0.05)";
          }
          
          return (
            <div 
              key={i} 
              onClick={() => !locked && handleSelect(option)}
              style={{ 
                marginBottom: "10px",
                padding: "14px 16px",
                borderRadius: "8px",
                border: `2px solid ${borderColor}`,
                backgroundColor,
                cursor: (selected !== null || locked) ? "default" : "pointer",
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                userSelect: "none",
                opacity: locked ? 0.95 : 1
              }}
              onMouseEnter={(e) => {
                if (selected === null && !locked) {
                  e.currentTarget.style.transform = "translateX(4px)";
                  e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
                }
              }}
              onMouseLeave={(e) => {
                if (selected === null && !locked) {
                  e.currentTarget.style.transform = "translateX(0)";
                  e.currentTarget.style.boxShadow = "none";
                }
              }}
            >
              {/* Custom Radio Button */}
              <div style={{
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                border: `2px solid ${selected !== null && isCorrectOption ? "var(--lush-lime)" : selected !== null && isWrongSelection ? "var(--poppy-red)" : isThisOption ? "var(--accent-primary)" : "var(--border-color)"}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                background: "var(--bg-card)",
                transition: "all 0.2s ease"
              }}>
                {isThisOption && (
                  <div style={{
                    width: "14px",
                    height: "14px",
                    borderRadius: "50%",
                    background: selected !== null 
                      ? (isCorrect ? "var(--lush-lime)" : "var(--poppy-red)")
                      : "var(--accent-primary)",
                    transition: "all 0.2s ease"
                  }} />
                )}
              </div>
              
              {/* Option Text */}
              <span style={{ 
                flex: 1,
                color: textColor,
                fontWeight: selected !== null && (isCorrectOption || isWrongSelection) ? "500" : "normal",
                fontSize: "15px"
              }}>
                {String.fromCharCode(65 + i)}. {option}
              </span>
              
              {/* Status Icon */}
              {selected !== null && (
                <span style={{ 
                  fontSize: "18px",
                  flexShrink: 0
                }}>
                  {isCorrectOption ? "✓" : isWrongSelection ? "✗" : ""}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Feedback Message */}
      {selected && (
        <div style={{ marginTop: "16px" }}>
          <p style={{
            color: isCorrect ? "var(--lush-lime)" : "var(--poppy-red)",
            fontWeight: "bold",
            fontSize: "16px"
          }}>
            {isCorrect ? "✓ Correct!" : "✗ Incorrect"}
          </p>
          
          {/* Show correct answer if incorrect */}
          {!isCorrect && (
            <div style={{
              background: "var(--bg-secondary)",
              padding: "12px",
              borderRadius: "6px",
              marginTop: "10px",
              border: "1px solid var(--border-color)"
            }}>
              <strong style={{ color: "var(--lush-lime)" }}>Correct Answer:</strong>
              <p style={{ 
                marginTop: "6px",
                color: "var(--text-primary)"
              }}>
                {correctAnswer}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
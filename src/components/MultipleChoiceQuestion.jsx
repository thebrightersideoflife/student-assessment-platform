import { useState, useEffect } from "react";
import ScenarioModal from "./ScenarioModal";

export default function MultipleChoiceQuestion({
  question,
  index,
  onAnswerChange,
  savedAnswer = null,
  locked = false,
  submitted = false,
  scenario = null,
}) {
  const [showScenario, setShowScenario] = useState(false);
  const [selected, setSelected] = useState(savedAnswer?.answer || null);

  const correctAnswer = Array.isArray(question.correctAnswers)
    ? question.correctAnswers[0]
    : question.correctAnswers || question.answer;

  useEffect(() => {
    if (savedAnswer?.answer) setSelected(savedAnswer.answer);
  }, [savedAnswer]);

  function handleSelect(option) {
    if (selected !== null || locked) return;
    setSelected(option);
    const isCorrect = option === correctAnswer;
    if (onAnswerChange && !locked) {
      onAnswerChange(question.id, { answer: option, isCorrect, checked: true });
    }
  }

  const isCorrect = selected === correctAnswer;
  const revealed = submitted || selected !== null;

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
        {scenario && scenario.context && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px" }}>
            <button className="button" onClick={() => setShowScenario(true)} style={{ padding: "6px 10px" }}>View Scenario | Instruction</button>
          </div>
        )}
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

      {scenario && (
        <ScenarioModal visible={showScenario} onClose={() => setShowScenario(false)} title={scenario.title || "Scenario Context"} context={scenario.context} />
      )}

      <p style={{ marginBottom: "16px", lineHeight: "1.65", fontSize: "16px" }}>
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

      {/* Options */}
      <div>
        {question.options.map((option, i) => {
          const isThisOption = selected === option;
          const isCorrectOption = selected !== null && option === correctAnswer;
          const isWrongSelection = selected !== null && isThisOption && !isCorrect;

          let borderColor = "rgba(var(--border-color-rgb), 0.5)";
          let backgroundColor = "rgba(var(--bg-card-rgb), 0.5)";
          let textColor = "var(--text-primary)";

          if (revealed) {
            if (isCorrectOption) {
              borderColor = "var(--lush-lime)";
              backgroundColor = "rgba(118, 209, 61, 0.10)";
              textColor = "var(--lush-lime)";
            } else if (isWrongSelection) {
              borderColor = "var(--poppy-red)";
              backgroundColor = "rgba(255, 64, 64, 0.10)";
              textColor = "var(--poppy-red)";
            }
          }

          return (
            <div
              key={i}
              onClick={() => !locked && handleSelect(option)}
              style={{
                marginBottom: "10px", padding: "14px 16px",
                borderRadius: "10px",
                border: `1px solid ${borderColor}`,
                backgroundColor,
                backdropFilter: "blur(8px)",
                cursor: (selected !== null || locked) ? "default" : "pointer",
                transition: "all 0.18s ease",
                display: "flex", alignItems: "center", gap: "12px",
                userSelect: "none",
              }}
              onMouseEnter={(e) => {
                if (selected === null && !locked) {
                  e.currentTarget.style.transform = "translateX(4px)";
                  e.currentTarget.style.borderColor = "rgba(var(--border-color-rgb), 0.9)";
                }
              }}
              onMouseLeave={(e) => {
                if (selected === null && !locked) {
                  e.currentTarget.style.transform = "translateX(0)";
                  e.currentTarget.style.borderColor = borderColor;
                }
              }}
            >
              {/* Radio dot */}
              <div style={{
                width: "22px", height: "22px", borderRadius: "50%", flexShrink: 0,
                border: `2px solid ${
                  selected !== null && isCorrectOption ? "var(--lush-lime)"
                  : selected !== null && isWrongSelection ? "var(--poppy-red)"
                  : isThisOption ? "var(--accent-primary)"
                  : "rgba(var(--border-color-rgb), 0.6)"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "rgba(var(--bg-card-rgb), 0.6)",
                transition: "all 0.18s ease",
              }}>
                {isThisOption && (
                  <div style={{
                    width: "12px", height: "12px", borderRadius: "50%",
                    background: selected !== null
                      ? (isCorrect ? "var(--lush-lime)" : "var(--poppy-red)")
                      : "var(--accent-primary)",
                  }} />
                )}
              </div>

              <span style={{
                flex: 1, color: textColor, fontSize: "15px",
                fontWeight: selected !== null && (isCorrectOption || isWrongSelection) ? 500 : 400,
              }}>
                {String.fromCharCode(65 + i)}. {option}
              </span>

              {revealed && (
                <span style={{ fontSize: "17px", flexShrink: 0, fontWeight: 700 }}>
                  {isCorrectOption ? "✓" : isWrongSelection ? "✗" : ""}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Feedback */}
      {revealed && (
        <div style={{ marginTop: "14px" }}>
          <p style={{
            color: isCorrect ? "var(--lush-lime)" : "var(--poppy-red)",
            fontWeight: 700, fontSize: "15px",
          }}>
            {isCorrect ? "✓ Correct!" : "✗ Incorrect"}
          </p>
          <div style={{
            background: "rgba(var(--bg-secondary-rgb), 0.6)",
            padding: "12px", borderRadius: "8px", marginTop: "10px",
            border: "1px solid rgba(var(--border-color-rgb), 0.35)",
          }}>
            <strong style={{ color: "var(--lush-lime)" }}>Correct Answer:</strong>
            <p style={{ marginTop: "6px", color: "var(--text-primary)" }}>{correctAnswer}</p>
          </div>
        </div>
      )}
    </div>
  );
}
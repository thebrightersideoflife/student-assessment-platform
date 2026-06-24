import { useState, useEffect } from "react";
import ScenarioModal from "./ScenarioModal";
import ExplanationPanel from "./ExplanationPanel";
import ImageViewer from "./ImageViewer";
import renderWithKatex from "../utils/renderWithKatex.jsx";

export default function MultipleChoiceQuestion({
  question,
  index,
  onAnswerChange,
  savedAnswer = null,
  locked = false,
  submitted = false,
  scenario = null,
  timedMode = false,
}) {
  const [showScenario, setShowScenario] = useState(false);
  // Non-timed mode: `selected` is both the pick AND the committed/revealed answer.
  // Timed mode: `selected` is the pick; `savedSelection` is what's been confirmed
  // via the "Save Selected" button. Nothing reveals until submit either way.
  const [selected, setSelected] = useState(savedAnswer?.answer || null);
  const [savedSelection, setSavedSelection] = useState(
    timedMode ? savedAnswer?.answer || null : null
  );

  const correctAnswer = Array.isArray(question.correctAnswers)
    ? question.correctAnswers[0]
    : question.correctAnswers || question.answer;

  useEffect(() => {
    if (savedAnswer?.answer) {
      setSelected(savedAnswer.answer);
      if (timedMode) setSavedSelection(savedAnswer.answer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedAnswer]);

  function handleSelect(option) {
    if (locked) return;
    if (timedMode) {
      // Can always change the pick before/after saving; only the explicit
      // Save Selected click commits it (and re-arms once changed again).
      if (submitted) return;
      setSelected(option);
      return;
    }
    // Practice mode: first click both selects and reveals — unchanged behavior.
    if (selected !== null) return;
    setSelected(option);
    const isCorrect = option === correctAnswer;
    if (onAnswerChange) {
      onAnswerChange(question.id, { answer: option, isCorrect, checked: true });
    }
  }

  function handleSaveSelected() {
    if (locked || submitted || selected === null) return;
    setSavedSelection(selected);
    const isCorrect = selected === correctAnswer;
    if (onAnswerChange) {
      onAnswerChange(question.id, { answer: selected, isCorrect, checked: true });
    }
  }

  const isCorrect = (timedMode ? savedSelection : selected) === correctAnswer;
  // In timed mode, never reveal correctness pre-submit — only after Submit & Finish.
  const revealed = timedMode ? submitted : (submitted || selected !== null);
  // Save button is active only when there's a pick that differs from what's saved.
  const saveDisabled = locked || submitted || selected === null || selected === savedSelection;

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

      <div style={{ marginBottom: "16px", lineHeight: "1.65", fontSize: "16px" }}>
        {renderWithKatex(question.text || question.question)}
      </div>

      {/* Image */}
      {question.image && (
        <ImageViewer
          src={question.image.src}
          alt={question.image.alt || "Question diagram"}
          caption={question.image.caption}
        />
      )}

      {/* Options */}
      {/* clickLocked: in practice mode, once an answer is picked it's final and
          the card stops responding to clicks (original behavior). In timed
          mode, clicking stays live right up until submit — only the explicit
          Save Selected button commits a choice. */}
      {(() => {
        const clickLocked = locked || submitted || (!timedMode && selected !== null);
        // What we use to decide colours/✓/✗ — never the "live" pick in timed
        // mode pre-submit, since nothing should reveal correctness early.
        const revealAgainst = timedMode ? savedSelection : selected;

        return (
          <div>
            {question.options.map((option, i) => {
              const isThisOption = selected === option;
              const isCorrectOption = revealed && revealAgainst !== null && option === correctAnswer;
              const isWrongSelection = revealed && revealAgainst !== null && option === revealAgainst && option !== correctAnswer;

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
              } else if (isThisOption) {
                // Pre-reveal "this is currently picked" highlight (practice
                // pre-click is moot since it locks immediately; this mainly
                // shows in timed mode while the student is still choosing).
                borderColor = "var(--accent-primary)";
                backgroundColor = "rgba(var(--bg-card-rgb), 0.7)";
              }

              return (
                <div
                  key={i}
                  onClick={() => !clickLocked && handleSelect(option)}
                  style={{
                    marginBottom: "10px", padding: "14px 16px",
                    borderRadius: "10px",
                    border: `1px solid ${borderColor}`,
                    backgroundColor,
                    backdropFilter: "blur(8px)",
                    cursor: clickLocked ? "default" : "pointer",
                    transition: "all 0.18s ease",
                    display: "flex", alignItems: "center", gap: "12px",
                    userSelect: "none",
                  }}
                  onMouseEnter={(e) => {
                    if (!clickLocked) {
                      e.currentTarget.style.transform = "translateX(4px)";
                      e.currentTarget.style.borderColor = "rgba(var(--border-color-rgb), 0.9)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!clickLocked) {
                      e.currentTarget.style.transform = "translateX(0)";
                      e.currentTarget.style.borderColor = borderColor;
                    }
                  }}
                >
                  {/* Radio dot */}
                  <div style={{
                    width: "22px", height: "22px", borderRadius: "50%", flexShrink: 0,
                    border: `2px solid ${
                      isCorrectOption ? "var(--lush-lime)"
                      : isWrongSelection ? "var(--poppy-red)"
                      : isThisOption ? "var(--accent-primary)"
                      : "rgba(var(--border-color-rgb), 0.6)"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: "rgba(var(--bg-card-rgb), 0.6)",
                    transition: "all 0.18s ease",
                  }}>
                    {isThisOption && (
                      <div style={{
                        width: "12px", height: "12px", borderRadius: "50%",
                        background: revealed
                          ? (isCorrect ? "var(--lush-lime)" : "var(--poppy-red)")
                          : "var(--accent-primary)",
                      }} />
                    )}
                  </div>

                  <span style={{
                    flex: 1, color: textColor, fontSize: "15px",
                    fontWeight: (isCorrectOption || isWrongSelection) ? 500 : 400,
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
        );
      })()}

      {/* Timed mode: explicit confirm step. Greys out once saved; re-arms the
          moment the student picks a different option than what's saved. */}
      {timedMode && !submitted && !locked && (
        <div style={{ marginTop: "14px", display: "flex", alignItems: "center", gap: "10px" }}>
          <button
            onClick={handleSaveSelected}
            disabled={saveDisabled}
            className="button solid"
            style={{
              padding: "10px 20px", fontSize: "14px",
              opacity: saveDisabled ? 0.5 : 1,
              cursor: saveDisabled ? "not-allowed" : "pointer",
            }}
          >
            {savedSelection !== null && savedSelection === selected ? "Saved ✓" : "Save Selected"}
          </button>
          {savedSelection !== null && savedSelection === selected && (
            <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
              Your answer is saved. Pick a different option to change it.
            </span>
          )}
        </div>
      )}

      {/* Feedback — never shown pre-submit in timed mode */}
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

          {/* Explanation — only visible once the student has committed an answer */}
          <ExplanationPanel explanation={question.explanation} submitted={submitted} />
        </div>
      )}
    </div>
  );
}
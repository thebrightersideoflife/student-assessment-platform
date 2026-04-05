import { useState, useEffect } from "react";
import ScenarioModal from "./ScenarioModal";

/*
  Fill-in-the-blank question.

  Question data shape in questions.js:
  ─────────────────────────────────────
  {
    id: "Q1",
    type: "fill-in-the-blank",
    text: "Software ___ is not constrained by physical materials, providing ___.",
    blanks: [
      {
        id: "b1",
        options: ["abstraction", "hardware", "firmware"],
        correctAnswer: "abstraction"
      },
      {
        id: "b2",
        options: ["high flexibility", "high cost", "low speed"],
        correctAnswer: "high flexibility"
      }
    ],
    points: 2
  }

  The `text` uses ___ (triple underscore) as a placeholder marker.
  Each ___ maps in order to blanks[0], blanks[1], etc.
*/

export default function FillInTheBlankQuestion({
  question,
  index,
  onAnswerChange,
  savedAnswer = null,
  locked = false,
  submitted = false,
  scenario = null,
}) {
  const [showScenario, setShowScenario] = useState(false);
  const blanks = question.blanks || [];
  const points = blanks.length;

  // selections: { [blankId]: selectedOption | null }
  const [selections, setSelections] = useState(() => {
    if (savedAnswer?.selections) return savedAnswer.selections;
    return Object.fromEntries(blanks.map((b) => [b.id, ""]));
  });

  const [revealed, setRevealed] = useState(savedAnswer?.revealed || false);
  const [checked, setChecked] = useState(savedAnswer?.checked || false);

  // Restore saved state
  useEffect(() => {
    if (savedAnswer?.selections) {
      setSelections(savedAnswer.selections);
      setRevealed(savedAnswer.revealed || false);
      setChecked(savedAnswer.checked || false);
    }
  }, [savedAnswer]);

  const allFilled = blanks.every((b) => selections[b.id] !== "");

  const correctCount = blanks.filter(
    (b) => selections[b.id] === b.correctAnswer
  ).length;

  const isFullyCorrect = correctCount === blanks.length;

  function handleSelect(blankId, value) {
    if (locked || revealed) return;
    const next = { ...selections, [blankId]: value };
    setSelections(next);
    // Reset checked state when user changes answers
    if (checked) setChecked(false);

    if (onAnswerChange) {
      onAnswerChange(question.id, {
        selections: next,
        // Do not mark correctness until user clicks Check Answer
        isCorrect: false,
        checked: false,
        revealed: false,
      });
    }
  }

  // Split sentence text on ___ markers
  const parts = (question.text || "").split("___");

  // Colour helpers — only show result colours after submit or when revealed/checked
  const showResult = submitted || revealed || checked;

  function blankBorderColor(blank) {
    if (!showResult || !selections[blank.id]) return "rgba(var(--border-color-rgb), 0.6)";
    return selections[blank.id] === blank.correctAnswer
      ? "var(--lush-lime)"
      : "var(--poppy-red)";
  }

  function blankBg(blank) {
    if (!showResult || !selections[blank.id]) return "rgba(var(--bg-secondary-rgb), 0.7)";
    return selections[blank.id] === blank.correctAnswer
      ? "rgba(118, 209, 61, 0.12)"
      : "rgba(255, 64, 64, 0.10)";
  }

  return (
    <div className="card" style={{ marginBottom: "16px" }}>
      {/* Header row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
        <h3 style={{ margin: 0 }}>Question {index + 1}</h3>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {scenario && scenario.context && (
            <button className="button" onClick={() => setShowScenario(true)} style={{ padding: "6px 10px" }}>View Scenario</button>
          )}
          {points > 0 && (
            <span style={{
              fontSize: "12px", fontWeight: 600,
              color: "var(--text-secondary)",
              background: "rgba(var(--bg-secondary-rgb), 0.7)",
              border: "1px solid rgba(var(--border-color-rgb), 0.4)",
              borderRadius: "999px", padding: "2px 10px",
            }}>
              {points} {points === 1 ? "mark" : "marks"}
            </span>
          )}
        </div>
      </div>

      <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "16px", fontStyle: "italic" }}>
        Fill in each blank by selecting the correct option from the dropdown.
      </p>

      {/* Image */}
      {question.image && (
        <div style={{
          marginBottom: "16px", textAlign: "center", padding: "12px",
          background: "rgba(var(--bg-secondary-rgb), 0.5)",
          borderRadius: "10px", border: "1px solid rgba(var(--border-color-rgb), 0.35)",
        }}>
          <img src={question.image.src} alt={question.image.alt || "Question image"}
            style={{ maxWidth: "100%", maxHeight: "300px", objectFit: "contain" }} />
          {question.image.caption && (
            <p style={{ fontSize: "13px", fontStyle: "italic", color: "var(--text-secondary)", marginTop: "8px" }}>
              {question.image.caption}
            </p>
          )}
        </div>
      )}

      {/* Sentence with inline dropdowns */}
      <p style={{ fontSize: "16px", lineHeight: "2.2", color: "var(--text-primary)" }}>
        {parts.map((part, i) => (
          <span key={i}>
            {part}
            {i < blanks.length && (
              <select
                value={selections[blanks[i].id] || ""}
                onChange={(e) => handleSelect(blanks[i].id, e.target.value)}
                disabled={locked || revealed}
                style={{
                  display: "inline-block",
                  margin: "0 6px",
                  padding: "4px 10px",
                  fontSize: "15px",
                  fontWeight: 500,
                  borderRadius: "8px",
                  border: `2px solid ${blankBorderColor(blanks[i])}`,
                  background: blankBg(blanks[i]),
                  color: "var(--text-primary)",
                  cursor: locked || revealed ? "not-allowed" : "pointer",
                  transition: "border-color 0.2s ease, background 0.2s ease",
                  outline: "none",
                  minWidth: "160px",
                  backdropFilter: "blur(6px)",
                }}
              >
                <option value="" disabled>— select —</option>
                {blanks[i].options.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            )}
          </span>
        ))}
      </p>

      {/* Result row — only after submit */}
      {showResult && (
        <div style={{ marginTop: "16px" }}>
          <p style={{
            fontWeight: 700, fontSize: "15px",
            color: isFullyCorrect ? "var(--lush-lime)" : "var(--poppy-red)",
            marginBottom: "10px",
          }}>
            {isFullyCorrect
              ? `✓ All correct! (${correctCount}/${blanks.length})`
              : `✗ ${correctCount} of ${blanks.length} correct`}
          </p>

          {/* Per-blank breakdown with correct answers */}
          <div style={{
            background: "rgba(var(--bg-secondary-rgb), 0.6)",
            border: "1px solid rgba(var(--border-color-rgb), 0.4)",
            borderRadius: "10px", padding: "14px",
          }}>
            <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "10px" }}>
              Correct answers:
            </p>
            {blanks.map((blank, i) => {
              const correct = selections[blank.id] === blank.correctAnswer;
              return (
                <div key={blank.id} style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  marginBottom: "6px", fontSize: "14px",
                }}>
                  <span style={{ color: correct ? "var(--lush-lime)" : "var(--poppy-red)", fontWeight: 700, minWidth: "16px" }}>
                    {correct ? "✓" : "✗"}
                  </span>
                  <span style={{ color: "var(--text-secondary)" }}>Blank {i + 1}:</span>
                  <span style={{ color: "var(--lush-lime)", fontWeight: 600 }}>{blank.correctAnswer}</span>
                  {!correct && (
                    <span style={{ color: "var(--text-secondary)", fontSize: "13px" }}>
                      (you chose: <em style={{ color: "var(--poppy-red)" }}>{selections[blank.id] || "—"}</em>)
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Action row: Check Answer button when not yet revealed/checked */}
      {!showResult && !locked && !submitted && (
        <div style={{ marginTop: "14px", display: "flex", gap: "8px" }}>
          <button
            onClick={() => {
              const correct = blanks.every((b) => selections[b.id] === b.correctAnswer);
              setRevealed(true);
              setChecked(true);
              if (onAnswerChange) {
                onAnswerChange(question.id, {
                  selections,
                  isCorrect: correct,
                  checked: true,
                  revealed: true,
                });
              }
            }}
            className="button solid"
            disabled={!allFilled || checked}
            style={{ padding: "8px 14px" }}
          >
            Check Answer
          </button>
        </div>
      )}
        {scenario && (
          <ScenarioModal visible={showScenario} onClose={() => setShowScenario(false)} title={scenario.title || "Scenario Context"} context={scenario.context} />
        )}
    </div>
  );
}
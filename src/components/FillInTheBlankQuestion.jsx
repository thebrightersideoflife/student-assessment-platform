import { useState, useEffect } from "react";
import ScenarioModal from "./ScenarioModal";
import ExplanationPanel from "./ExplanationPanel";
import ImageViewer from "./ImageViewer";

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
    points: 2,
    explanation: "Optional prose shown after the student checks their answer."
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
  timedMode = false,
}) {
  const [showScenario, setShowScenario] = useState(false);
  const blanks = question.blanks || [];
  const points = blanks.length;

  // selections: { [blankId]: selectedOption | null } — the live, editable picks
  const [selections, setSelections] = useState(() => {
    if (savedAnswer?.selections) return savedAnswer.selections;
    return Object.fromEntries(blanks.map((b) => [b.id, ""]));
  });

  // Practice mode: `revealed` means "Check Answer was clicked" — locks the
  // dropdowns and shows colours/breakdown immediately.
  // Timed mode: dropdowns never lock pre-submit. `savedSelections` is a
  // snapshot of whatever was selected at last "Save Answers" click — used
  // only to know whether the save button should be active, not to reveal
  // anything. Colours/breakdown wait for `submitted`.
  const [revealed, setRevealed] = useState(!timedMode && (savedAnswer?.revealed || false));
  const [checked, setChecked] = useState(savedAnswer?.checked || false);
  const [savedSelections, setSavedSelections] = useState(
    timedMode ? (savedAnswer?.checked ? savedAnswer?.selections : null) : null
  );

  // Restore saved state
  useEffect(() => {
    if (savedAnswer?.selections) {
      setSelections(savedAnswer.selections);
      setChecked(savedAnswer.checked || false);
      if (timedMode) {
        if (savedAnswer.checked) setSavedSelections(savedAnswer.selections);
      } else {
        setRevealed(savedAnswer.revealed || false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedAnswer]);

  const allFilled = blanks.every((b) => selections[b.id] !== "");

  const correctCount = blanks.filter(
    (b) => selections[b.id] === b.correctAnswer
  ).length;

  const isFullyCorrect = correctCount === blanks.length;

  // Have the live selections drifted from what was last saved? (timed mode)
  const selectionsMatchSaved = savedSelections
    ? blanks.every((b) => selections[b.id] === savedSelections[b.id])
    : false;
  const saveDisabled = locked || submitted || !allFilled || selectionsMatchSaved;

  function handleSelect(blankId, value) {
    if (locked || submitted) return;
    if (!timedMode && revealed) return;
    const next = { ...selections, [blankId]: value };
    setSelections(next);
    // Reset checked state when user changes answers
    if (checked && !timedMode) setChecked(false);

    if (onAnswerChange && !timedMode) {
      onAnswerChange(question.id, {
        selections: next,
        // Do not mark correctness until user clicks Check Answer
        isCorrect: false,
        checked: false,
        revealed: false,
      });
    }
    // In timed mode, onAnswerChange fires only on explicit Save Answers —
    // live edits here are local until confirmed.
  }

  function handleSaveAnswers() {
    if (saveDisabled) return;
    setSavedSelections(selections);
    setChecked(true);
    if (onAnswerChange) {
      const correct = blanks.every((b) => selections[b.id] === b.correctAnswer);
      onAnswerChange(question.id, {
        selections,
        isCorrect: correct,
        checked: true,
        revealed: false, // timed mode never reveals pre-submit
      });
    }
  }

  // Split sentence text on ___ markers
  const parts = (question.text || "").split("___");

  // Colour helpers — only show result colours after submit (timed mode),
  // or after submit/revealed/checked (practice mode, unchanged).
  const showResult = timedMode ? submitted : (submitted || revealed || checked);

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
            <button className="button" onClick={() => setShowScenario(true)} style={{ padding: "6px 10px" }}>View Scenario | Instruction</button>
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
        <ImageViewer
          src={question.image.src}
          alt={question.image.alt || "Question image"}
          caption={question.image.caption}
        />
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
                disabled={locked || submitted || (!timedMode && revealed)}
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
                  cursor: (locked || submitted || (!timedMode && revealed)) ? "not-allowed" : "pointer",
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

      {/* Result row — only after submit or check */}
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

          {/* Explanation — only visible once the student has committed an answer */}
          <ExplanationPanel explanation={question.explanation} submitted={submitted} />
        </div>
      )}

      {/* Action row */}
      {timedMode && !submitted && !locked && (
        <div style={{ marginTop: "14px", display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
          <button
            onClick={handleSaveAnswers}
            disabled={saveDisabled}
            className="button solid"
            style={{
              padding: "8px 14px",
              opacity: saveDisabled ? 0.5 : 1,
              cursor: saveDisabled ? "not-allowed" : "pointer",
            }}
          >
            {savedSelections && selectionsMatchSaved ? "Saved ✓" : "Save Answers"}
          </button>
          {savedSelections && selectionsMatchSaved && (
            <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
              Your answers are saved. Change a dropdown to update them.
            </span>
          )}
          {!allFilled && (
            <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
              Fill in every blank to save.
            </span>
          )}
        </div>
      )}

      {/* Practice mode: Check Answer button when not yet revealed/checked */}
      {!timedMode && !showResult && !locked && !submitted && (
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
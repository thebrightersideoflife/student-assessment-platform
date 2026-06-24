import { useState, useEffect } from "react";
import ScenarioModal from "./ScenarioModal";
import AnswerValidator from "../utils/answerValidator";
import ExplanationPanel from "./ExplanationPanel";
import ImageViewer from "./ImageViewer";
import renderWithKatex from "../utils/renderWithKatex.jsx";

/* ── Icons (self-contained) ─────────────────────────────────────────────── */
const FlagIcon = ({ filled }) => (
  <svg width="14" height="14" viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
    <line x1="4" y1="22" x2="4" y2="15"/>
  </svg>
);

const SkipIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="8" y1="12" x2="16" y2="12"/>
  </svg>
);

export default function OpenEndedQuestion({
  question,
  index,
  onAnswerChange,
  savedAnswer = null,
  locked = false,
  submitted = false,
  scenario = null,
  timedMode = false,
}) {
  const [showScenario, setShowScenario]         = useState(false);
  const [answer, setAnswer]                     = useState(savedAnswer?.answer || "");
  const [checked, setChecked]                   = useState(savedAnswer?.checked || false);
  const [skipped, setSkipped]                   = useState(savedAnswer?.isSkipped || false);
  const [flagged, setFlagged]                   = useState(savedAnswer?.isFlagged || false);
  const [validationResult, setValidationResult] = useState(null);
  // Timed mode: tracks the answer text as of the last "Save Answer" click,
  // so the button can grey out until the text changes again.
  const [savedAnswerText, setSavedAnswerText] = useState(
    timedMode && savedAnswer?.checked ? savedAnswer?.answer || "" : null
  );

  const correctAnswer = question.correctAnswers || question.answer;

  // Restore full state from savedAnswer
  useEffect(() => {
    if (savedAnswer) {
      setAnswer(savedAnswer.answer || "");
      setChecked(savedAnswer.checked || false);
      setSkipped(savedAnswer.isSkipped || false);
      setFlagged(savedAnswer.isFlagged || false);
      if (timedMode) {
        if (savedAnswer.checked) setSavedAnswerText(savedAnswer.answer || "");
      } else if (savedAnswer.checked && savedAnswer.answer && !savedAnswer.isSkipped) {
        const result = AnswerValidator.validate(
          savedAnswer.answer,
          correctAnswer,
          question.validationOptions || {}
        );
        setValidationResult(result);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedAnswer]);

  // Auto-validate on submit for unchecked questions, AND for timed-mode
  // questions that were saved but never had validation run against them
  // (since saving in timed mode skips validation to avoid revealing anything).
  useEffect(() => {
    if (submitted && !skipped && (!checked || (timedMode && !validationResult))) {
      const result = AnswerValidator.validate(
        answer,
        correctAnswer,
        question.validationOptions || {}
      );
      setValidationResult(result);
      setChecked(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitted]);

  function handleCheck() {
    if (timedMode) {
      // "Save Answer" — record the response, mark as answered for progress
      // tracking, but never run/show validation until the assessment is submitted.
      setSavedAnswerText(answer);
      setChecked(true);
      if (onAnswerChange && !locked) {
        onAnswerChange(question.id, {
          answer,
          isCorrect: false, // unknown until submit — graded then
          checked: true,
          isSkipped: false,
          isFlagged: flagged,
        });
      }
      return;
    }
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
        isSkipped: false,
        isFlagged: flagged,
      });
    }
  }

  function handleSkip() {
    setSkipped(true);
    setChecked(true);     // counts toward answeredCount so submit unlocks
    setAnswer("");
    setValidationResult(null);
    if (timedMode) setSavedAnswerText("");
    if (onAnswerChange && !locked) {
      onAnswerChange(question.id, {
        answer: "",
        isCorrect: false,
        checked: true,
        isSkipped: true,
        isFlagged: flagged,
      });
    }
  }

  function handleUnskip() {
    setSkipped(false);
    setChecked(false);
    if (timedMode) setSavedAnswerText(null);
    if (onAnswerChange && !locked) {
      onAnswerChange(question.id, {
        answer: "",
        isCorrect: false,
        checked: false,
        isSkipped: false,
        isFlagged: flagged,
      });
    }
  }

  function handleToggleFlag() {
    const next = !flagged;
    setFlagged(next);
    if (onAnswerChange && !locked) {
      onAnswerChange(question.id, {
        answer,
        isCorrect: validationResult?.equivalent || false,
        checked,
        isSkipped: skipped,
        isFlagged: next,
      });
    }
  }

  function handleAnswerChange(e) {
    if (locked || submitted || skipped) return;
    const newAnswer = e.target.value;
    setAnswer(newAnswer);
    if (!timedMode) {
      setChecked(false);
      if (onAnswerChange && !locked) {
        onAnswerChange(question.id, {
          answer: newAnswer,
          isCorrect: false,
          checked: false,
          isSkipped: false,
          isFlagged: flagged,
        });
      }
    }
    // Timed mode: typing is local only — onAnswerChange fires on explicit Save.
  }

  const isCorrect     = validationResult?.equivalent;
  const displayAnswer  = Array.isArray(correctAnswer) ? correctAnswer : [correctAnswer];
  // Timed mode: input stays editable right up to submit (re-saving updates the
  // committed answer); only locked/submitted/skipped disable it.
  const inputDisabled = timedMode
    ? (locked || submitted || skipped)
    : (locked || checked || submitted || skipped);
  // Save button greys out once the saved snapshot matches the live text.
  const saveDisabled = locked || submitted || !answer.trim() || (timedMode && savedAnswerText === answer);

  return (
    <div
      className="card"
      style={{
        marginBottom: "16px",
        // Amber left border when flagged — visible while scrolling past
        ...(flagged && { borderLeft: "3px solid var(--golden-amber)" }),
      }}
    >
      {/* ── Header row ─────────────────────────────────────────── */}
      <div style={{
        display: "flex", justifyContent: "space-between",
        alignItems: "flex-start", marginBottom: "12px",
      }}>
        <div>
          <h3 style={{ margin: "0 0 6px" }}>
            {question.sectionLabel
              ? `${question.sectionLabel} — Question ${index + 1}`
              : `Question ${index + 1}`}
          </h3>

          {/* Status badges */}
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
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
            {skipped && !submitted && (
              <span style={{
                fontSize: "12px", fontWeight: 500,
                color: "var(--text-secondary)",
                background: "rgba(var(--bg-secondary-rgb), 0.7)",
                border: "1px solid rgba(var(--border-color-rgb), 0.4)",
                borderRadius: "999px", padding: "2px 10px",
              }}>
                Skipped
              </span>
            )}
            {flagged && (
              <span style={{
                fontSize: "12px", fontWeight: 600,
                color: "var(--golden-amber)",
                background: "rgba(244,169,0,0.10)",
                border: "1px solid rgba(244,169,0,0.35)",
                borderRadius: "999px", padding: "2px 10px",
                display: "flex", alignItems: "center", gap: "4px",
              }}>
                <FlagIcon filled /> Flagged
              </span>
            )}
          </div>
        </div>

        {/* Right side controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {scenario && scenario.context && (
            <button className="button" onClick={() => setShowScenario(true)}
              style={{ padding: "6px 10px" }}>
              View Scenario | Instruction
            </button>
          )}

          {/* Flag toggle */}
          {!locked && !submitted && (
            <button
              onClick={handleToggleFlag}
              title={flagged ? "Remove flag" : "Flag — come back to this"}
              style={{
                display: "flex", alignItems: "center", gap: "5px",
                padding: "5px 10px",
                fontSize: "12px", fontWeight: 600,
                borderRadius: "8px",
                border: flagged
                  ? "1px solid rgba(244,169,0,0.5)"
                  : "1px solid rgba(var(--border-color-rgb), 0.4)",
                background: flagged
                  ? "rgba(244,169,0,0.10)"
                  : "rgba(var(--bg-secondary-rgb), 0.5)",
                color: flagged ? "var(--golden-amber)" : "var(--text-secondary)",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              <FlagIcon filled={flagged} />
              {flagged ? "Flagged" : "Flag"}
            </button>
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
      </div>

      {/* Question text */}
      <div style={{ marginBottom: "14px", lineHeight: "1.65", fontSize: "16px" }}>
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

      {scenario && (
        <ScenarioModal
          visible={showScenario}
          onClose={() => setShowScenario(false)}
          title={scenario.title || "Scenario Context"}
          context={scenario.context}
        />
      )}

      {/* ── Skipped placeholder ─────────────────────────────────── */}
      {skipped && !submitted ? (
        <div style={{
          padding: "14px 16px",
          background: "rgba(var(--bg-secondary-rgb), 0.5)",
          border: "1px solid rgba(var(--border-color-rgb), 0.35)",
          borderRadius: "10px",
          display: "flex", alignItems: "center",
          justifyContent: "space-between", gap: "12px",
        }}>
          <p style={{ margin: 0, fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.5 }}>
            You skipped this question.
          </p>
          <p style={{ margin: 0, fontSize: "14px", color: "var(--text-primary)", lineHeight: 1.5 }}>
            Note: If you don't try, you won't get the answer. Anything plausible counts — you can do this!
          </p>
          <button
            onClick={handleUnskip}
            className="button"
            style={{ padding: "6px 14px", fontSize: "13px", flexShrink: 0 }}
          >
            Answer it
          </button>
        </div>
      ) : (
        <>
          {/* Answer input */}
          <input
            type="text"
            value={answer}
            onChange={handleAnswerChange}
            placeholder="Type your answer..."
            disabled={inputDisabled}
            style={{
              width: "100%", padding: "11px 14px",
              borderRadius: "10px",
              border: `1px solid ${(checked && !timedMode)
                ? (isCorrect ? "var(--lush-lime)" : "var(--poppy-red)")
                : "rgba(var(--border-color-rgb), 0.5)"}`,
              background: inputDisabled
                ? "rgba(var(--bg-secondary-rgb), 0.5)"
                : "rgba(var(--bg-card-rgb), 0.6)",
              backdropFilter: "blur(6px)",
              color: "var(--text-primary)",
              marginBottom: "12px",
              fontSize: "16px",
              cursor: inputDisabled ? "not-allowed" : "text",
              outline: "none",
              transition: "border-color 0.2s ease",
            }}
          />

          {/* Action row — timed mode: Save Answer (re-armable) + I don't know */}
          {timedMode && !locked && !submitted && (
            <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
              <button
                className="button solid"
                onClick={handleCheck}
                disabled={saveDisabled}
                style={{
                  opacity: saveDisabled ? 0.5 : 1,
                  cursor: saveDisabled ? "not-allowed" : "pointer",
                }}
              >
                {checked && savedAnswerText === answer ? "Saved ✓" : "Save Answer"}
              </button>

              {checked && savedAnswerText === answer && (
                <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
                  Your answer is saved. Edit the text to update it.
                </span>
              )}

              <button
                onClick={handleSkip}
                style={{
                  display: "flex", alignItems: "center", gap: "6px",
                  padding: "10px 16px",
                  fontSize: "14px", fontWeight: 500,
                  borderRadius: "10px",
                  border: "1px solid rgba(var(--border-color-rgb), 0.4)",
                  background: "rgba(var(--bg-secondary-rgb), 0.5)",
                  color: "var(--text-secondary)",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(var(--border-color-rgb), 0.8)";
                  e.currentTarget.style.color = "var(--text-primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(var(--border-color-rgb), 0.4)";
                  e.currentTarget.style.color = "var(--text-secondary)";
                }}
              >
                <SkipIcon /> I don't know
              </button>
            </div>
          )}

          {/* Action row: Check Answer + I don't know (practice mode, unchanged) */}
          {!timedMode && !locked && !submitted && !checked && (
            <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
              <button
                className="button solid"
                onClick={handleCheck}
                disabled={!answer.trim()}
              >
                Check Answer
              </button>

              <button
                onClick={handleSkip}
                style={{
                  display: "flex", alignItems: "center", gap: "6px",
                  padding: "10px 16px",
                  fontSize: "14px", fontWeight: 500,
                  borderRadius: "10px",
                  border: "1px solid rgba(var(--border-color-rgb), 0.4)",
                  background: "rgba(var(--bg-secondary-rgb), 0.5)",
                  color: "var(--text-secondary)",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(var(--border-color-rgb), 0.8)";
                  e.currentTarget.style.color = "var(--text-primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(var(--border-color-rgb), 0.4)";
                  e.currentTarget.style.color = "var(--text-secondary)";
                }}
              >
                <SkipIcon /> I don't know
              </button>
            </div>
          )}
        </>
      )}

      {/* ── Validation result — never shown pre-submit in timed mode, since
           handleCheck()/the auto-validate effect only populate validationResult
           after submission when timedMode is true ──────────────────────── */}
      {(checked || submitted) && validationResult && !skipped && (
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
            <strong style={{ color: "var(--lush-lime)" }}>
              {displayAnswer.length > 1 ? "Accepted Answers:" : "Correct Answer:"}
            </strong>
            {displayAnswer.length > 1 ? (
              <ul style={{ margin: "4px 0 0", paddingLeft: "20px", color: "var(--text-primary)" }}>
                {displayAnswer.map((a, i) => <li key={i}>{a}</li>)}
              </ul>
            ) : (
              <p style={{ marginTop: "4px", color: "var(--text-primary)" }}>{displayAnswer[0]}</p>
            )}
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

          <ExplanationPanel explanation={question.explanation} submitted={submitted} />
        </div>
      )}

      {/* Skipped + submitted: show answer without a score message */}
      {skipped && submitted && (
        <div style={{ marginTop: "14px" }}>
          <p style={{ color: "var(--text-secondary)", fontWeight: 600, marginBottom: "8px", fontSize: "15px" }}>
            — Skipped
          </p>
          <div style={{
            background: "rgba(var(--bg-secondary-rgb), 0.6)",
            padding: "12px", borderRadius: "8px",
            border: "1px solid rgba(var(--border-color-rgb), 0.35)",
          }}>
            <strong style={{ color: "var(--lush-lime)" }}>
              {displayAnswer.length > 1 ? "Accepted Answers:" : "Correct Answer:"}
            </strong>
            {displayAnswer.length > 1 ? (
              <ul style={{ margin: "4px 0 0", paddingLeft: "20px", color: "var(--text-primary)" }}>
                {displayAnswer.map((a, i) => <li key={i}>{a}</li>)}
              </ul>
            ) : (
              <p style={{ marginTop: "4px", color: "var(--text-primary)" }}>{displayAnswer[0]}</p>
            )}
          </div>
          <ExplanationPanel explanation={question.explanation} submitted={submitted} />
        </div>
      )}
    </div>
  );
}
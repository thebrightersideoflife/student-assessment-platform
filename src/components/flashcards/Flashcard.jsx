import React, { useLayoutEffect, useRef } from "react";
import renderWithKatex from "../../utils/renderWithKatex.jsx";
import { HelpCircle, CheckSquare, Edit3 } from "lucide-react";
import "./Flashcard.css";

const MOD_COLOR_MAP = {
  ITNSA: "var(--fc-cyan)",
  ITDSA: "var(--fc-yellow)",
  ITJVA: "var(--fc-green)",
  ITSEA: "var(--fc-red)",
  ITSSA: "var(--fc-purple)",
  ITPMA: "var(--fc-blue)",
  ITCOA: "var(--fc-pink)",
};

export default function Flashcard({ question, isFlipped, onFlip }) {
  if (!question) return null;

  const frontContentRef = useRef(null);
  const backContentRef = useRef(null);

  useLayoutEffect(() => {
    const adjustFontSize = (container) => {
      if (!container) return;
      // Target the direct child that holds the text content
      const content = container.querySelector('.flashcard-question-text, .flashcard-answer-text');
      if (!content) return;

      // Base sizes
      let size = content.classList.contains('flashcard-question-text') ? 2.2 : 1.7;
      content.style.fontSize = `${size}rem`;

      let attempts = 0;
      // Shrink until it fits or reaches a minimum
      while (container.scrollHeight > container.clientHeight && size > 0.8 && attempts < 30) {
        size -= 0.05;
        content.style.fontSize = `${size}rem`;
        attempts++;
      }
    };

    // Run for both sides
    adjustFontSize(frontContentRef.current);
    adjustFontSize(backContentRef.current);
  }, [question, isFlipped]);

  const moduleColor = MOD_COLOR_MAP[question._sourceModuleId] || "var(--accent-primary)";

  const formatAnswer = () => {
    if (question.type === "multiple-choice") {
      return (
        <div style={{ fontWeight: 600, lineHeight: 1.6 }}>
          {question.correctAnswers.map((ans, idx) => (
            <div key={idx}>{renderWithKatex(ans)}</div>
          ))}
        </div>
      );
    }
    if (question.type === "fill-in-the-blank") {
      return (
        <div style={{ fontWeight: 600, lineHeight: 1.6 }}>
          {question.blanks.map((b, idx) => (
            <div key={idx}>
              {question.blanks.length > 1 && (
                <span style={{ opacity: 0.5, fontSize: "0.7rem", textTransform: "uppercase", marginRight: "8px" }}>
                  Blank {idx + 1}:
                </span>
              )}
              {renderWithKatex(b.correctAnswer)}
            </div>
          ))}
        </div>
      );
    }
    // open-ended
    return (
      <div style={{ fontWeight: 600, lineHeight: 1.6 }}>
        {renderWithKatex(question.correctAnswers[0])}
      </div>
    );
  };

  const getQuestionTypeInfo = () => {
    switch (question.type) {
      case "open-ended": return { label: "Open Ended", icon: <HelpCircle size={14} /> };
      case "multiple-choice": return { label: "Multiple Choice", icon: <CheckSquare size={14} /> };
      case "fill-in-the-blank": return { label: "Fill in Blank", icon: <Edit3 size={14} /> };
      default: return { label: "Question", icon: null };
    }
  };

  const typeInfo = getQuestionTypeInfo();

  return (
    <div className={`flashcard-container ${isFlipped ? "flipped" : ""}`} onClick={onFlip}>
      <div className="flashcard-inner">
        {/* FRONT */}
        <div className="flashcard-front">
          <div className="flashcard-badge flashcard-type-badge" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            {typeInfo.icon}
            {typeInfo.label}
          </div>
          <div className="flashcard-badge flashcard-module-badge" style={{ color: moduleColor, background: `color-mix(in srgb, ${moduleColor} 12%, transparent)` }}>
            {question._sourceModuleId}
          </div>

          <div className="flashcard-content" ref={frontContentRef}>
            <h2 className="flashcard-question-text">{renderWithKatex(question.text)}</h2>
          </div>

          <div className="flashcard-tap-hint">TAP TO REVEAL ANSWER</div>
        </div>

        {/* BACK */}
        <div className="flashcard-back">
          <div className="flashcard-badge flashcard-type-badge" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            {typeInfo.icon}
            {typeInfo.label}
          </div>
          <div className="flashcard-badge flashcard-module-badge" style={{ color: moduleColor, background: `color-mix(in srgb, ${moduleColor} 12%, transparent)` }}>
            {question._sourceModuleId}
          </div>

          <div className="flashcard-content" ref={backContentRef}>
            <span className="flashcard-answer-label">Official Answer</span>
            <div className="flashcard-answer-text">
              {formatAnswer()}
            </div>
          </div>

          <div className="flashcard-tap-hint">TAP TO FLIP BACK</div>
        </div>
      </div>
    </div>
  );
}

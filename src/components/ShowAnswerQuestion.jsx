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
      <p style={{ marginBottom: "12px" }}>
        {question.question}
      </p>
      
      {!showAnswer ? (
        <button
          className="button"
          onClick={() => setShowAnswer(true)}
        >
          Show Answer
        </button>
      ) : (
        <AnswerReveal answer={question.answer} />
      )}
    </div>
  );
}
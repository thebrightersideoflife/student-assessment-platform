import renderWithKatex from "../utils/renderWithKatex.jsx";

export default function AnswerReveal({ answer }) {
  const answers = Array.isArray(answer) ? answer : [answer];
  const isMultiple = answers.length > 1;

  return (
    <div
      style={{
        marginTop: "12px",
        padding: "12px",
        background: "var(--bg-secondary)",
        borderRadius: "6px",
        border: "1px solid var(--border-color)"
      }}
    >
      <strong>{isMultiple ? "Accepted Answers:" : "Answer:"}</strong>

      <div style={{ marginTop: 8 }}>
        {isMultiple ? (
          <ul style={{ margin: 0, paddingLeft: "20px" }}>
            {answers.map((a, i) => (
              <li key={i} style={{ marginBottom: i < answers.length - 1 ? "4px" : 0 }}>
                {renderWithKatex(a)}
              </li>
            ))}
          </ul>
        ) : (
          renderWithKatex(answers[0])
        )}
      </div>
    </div>
  );
}
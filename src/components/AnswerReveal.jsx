import formatTextToNodes from "../utils/formatText.jsx";

export default function AnswerReveal({ answer }) {

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

      <strong>Answer:</strong>

      <div style={{ marginTop: 8 }}>
        {formatTextToNodes(answer)}
      </div>

    </div>

  );

}

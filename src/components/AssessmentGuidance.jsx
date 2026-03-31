import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function AssessmentGuidance({ visible = true, onClose = () => {} }) {
  const { theme } = useContext(ThemeContext);
  if (!visible) return null;

  return (
    <div aria-modal="true" role="dialog" aria-label="Assessment guidance"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(2,6,23,0.45)",
        zIndex: 1200,
        padding: "24px",
      }}>

      <div onClick={(e) => e.stopPropagation()} style={{
        width: "min(920px, 96%)",
        maxHeight: "84vh",
        overflowY: "auto",
        borderRadius: "14px",
        padding: "22px",
        background: "rgba(var(--bg-card-rgb), 0.96)",
        border: "1px solid rgba(var(--border-color-rgb), 0.6)",
        boxShadow: "0 10px 40px rgba(2,6,23,0.35)",
      }}>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
          <h3 style={{ margin: 0 }}>Quick Guidance for Top Marks</h3>
          <button onClick={onClose} aria-label="Close guidance" className="button" style={{ padding: "8px 12px" }}>
            Close
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px", marginTop: "16px" }}>

          <section style={{ padding: "14px", borderRadius: "10px", background: "rgba(var(--accent-primary-rgb, 42,92,167), 0.08)", border: "1px solid rgba(var(--accent-primary-rgb, 42,92,167), 0.12)" }}>
            <h4 style={{ margin: "0 0 8px 0", color: "var(--accent-primary)" }}>What distinguishes an A+ script:</h4>
            <ul style={{ margin: 0, paddingLeft: "18px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
              <li>Clear application to the scenario (not generic theory) - if provided</li>
              <li>Balanced explanation + evaluation</li>
              <li>Use of correct terminology (e.g., incremental delivery, validation, prototyping)</li>
              <li>Logical structure and concise arguments</li>
            </ul>
          </section>

          <section style={{ padding: "14px", borderRadius: "10px", background: "rgba(255,64,64,0.06)", border: "1px solid rgba(255,64,64,0.08)" }}>
            <h4 style={{ margin: "0 0 8px 0", color: "var(--poppy-red)" }}>Common Reasons Students Lose Marks:</h4>
            <ul style={{ margin: 0, paddingLeft: "18px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
              <li>Writing generic textbook definitions only</li>
              <li>Not linking answers to the given scenario - if provided</li>
              <li>Missing evaluation/justification parts</li>
              <li>Confusing key concepts (e.g., anticipation vs tolerance)</li>
            </ul>
          </section>

        </div>

        {/* bottom action removed — clicking outside or Close header will dismiss */}
      </div>
    </div>
  );
}

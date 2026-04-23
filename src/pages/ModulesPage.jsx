import { useState } from "react";
import { modules } from "../data/modules";
import ModuleCard from "../components/ModuleCard";
import Breadcrumb from "../components/Breadcrumb";

function NoticeBoard() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{
      marginBottom: "28px",
      borderRadius: "14px",
      border: "1px solid rgba(var(--border-color-rgb), 0.5)",
      background: "rgba(var(--bg-card-rgb), 0.72)",
      backdropFilter: "blur(12px) saturate(160%)",
      WebkitBackdropFilter: "blur(12px) saturate(160%)",
      overflow: "hidden",
      transition: "border-color 0.2s ease",
    }}>
      {/* Header / toggle */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          padding: "14px 20px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          borderBottom: open ? "1px solid rgba(var(--border-color-rgb), 0.35)" : "none",
          transition: "border-color 0.2s ease",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {/* Amber dot */}
          <span style={{
            width: "8px", height: "8px", borderRadius: "50%",
            background: "var(--golden-amber)",
            boxShadow: "0 0 6px rgba(244,169,0,0.5)",
            flexShrink: 0,
          }} />
          <span style={{
            fontSize: "13px",
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "var(--golden-amber)",
          }}>
            Notice
          </span>
          {!open && (
            <span style={{
              fontSize: "13px",
              color: "var(--text-secondary)",
              fontWeight: 400,
            }}>
              — A quick note before you dive in
            </span>
          )}
        </div>
        {/* Chevron */}
        <svg
          width="16" height="16" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round"
          style={{
            color: "var(--text-secondary)",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.25s ease",
            flexShrink: 0,
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Body */}
      {open && (
        <div style={{ padding: "20px 24px" }}>
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            fontSize: "15px",
            lineHeight: "1.7",
            color: "var(--text-secondary)",
          }}>
            <p style={{ margin: 0 }}>
              <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>On open-ended answers: </span>
              The validation system is still growing. You may occasionally type a perfectly correct answer and have it marked wrong — this isn't a reflection of your knowledge. It happens because the system is nudging you toward a specific, standardised term. As the platform matures, the answer engine will become increasingly flexible and intelligent.
            </p>
            <p style={{ margin: 0 }}>
              <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>On multiple-choice questions: </span>
              Some questions may hint at or even reveal the correct option. Please resist the temptation to click first and read later. The real value is in understanding <em>why</em> an answer is correct — that reasoning is what will carry you through your actual exam.
            </p>
            <p style={{ margin: 0 }}>
              Happy learning! 🎓✨
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ModulesPage() {
  return (
    <div className="container">
      <Breadcrumb items={[
        { label: "Home", path: "/" },
        { label: "Modules" },
      ]} />

      <h1 style={{ marginBottom: "24px" }}>Modules</h1>

      <NoticeBoard />

      {modules.map(module => (
        <ModuleCard
          key={module.id}
          module={module}
        />
      ))}
    </div>
  );
}
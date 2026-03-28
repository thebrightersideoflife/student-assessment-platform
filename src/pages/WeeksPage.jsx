// src/pages/WeeksPage.jsx
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { weeks } from "../data/weeks";               // CHANGED: was ../data/questions
import { questions } from "../data/questions/index.js"; // CHANGED: was ../data/questions
import WeekCard from "../components/WeekCard";
import Breadcrumb from "../components/Breadcrumb";

const BookIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

export default function WeeksPage() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const pageKey = location.key || "default";

  // CHANGED: weeks is now per-module — weeks[moduleId] instead of flat weeks array
  const moduleWeeks = weeks[moduleId] || [];

  // Group weeks by block for optional block-header rendering
  // e.g. { 1: [...weeks], 2: [...weeks] }
  const blocks = moduleWeeks.reduce((acc, week) => {
    const block = week.block ?? "other";
    if (!acc[block]) acc[block] = [];
    acc[block].push(week);
    return acc;
  }, {});

  const blockKeys = Object.keys(blocks).sort((a, b) => Number(a) - Number(b));
  const hasBlocks = blockKeys.length > 1 || (blockKeys.length === 1 && blockKeys[0] !== "other");

  return (
    <div className="container">
      <Breadcrumb items={[
        { label: "Modules", path: "/modules" },
        { label: moduleId },
      ]} />

      <h1 style={{ marginBottom: "24px" }}>{moduleId} – Weeks</h1>

      {/* Roadmap card — ITJVA only */}
      {moduleId === "ITJVA" && (
        <div
          onClick={() => navigate(`/module/${moduleId}/roadmap`)}
          style={{
            background: "rgba(var(--bg-card-rgb), 0.72)",
            backdropFilter: "blur(12px) saturate(160%)",
            WebkitBackdropFilter: "blur(12px) saturate(160%)",
            border: "1px solid rgba(var(--border-color-rgb), 0.55)",
            borderRadius: "14px",
            padding: "22px 24px",
            marginBottom: "24px",
            cursor: "pointer",
            transition: "transform 0.2s cubic-bezier(0.4,0,0.2,1), background 0.2s ease, border-color 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-3px)";
            e.currentTarget.style.background = "rgba(var(--bg-card-rgb), 0.92)";
            e.currentTarget.style.borderColor = "rgba(var(--border-color-rgb), 0.85)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.background = "rgba(var(--bg-card-rgb), 0.72)";
            e.currentTarget.style.borderColor = "rgba(var(--border-color-rgb), 0.55)";
          }}
        >
          <div style={{
            display: "flex", alignItems: "center",
            justifyContent: "space-between", gap: "16px",
          }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
              <div style={{
                width: "42px", height: "42px", borderRadius: "10px",
                background: "rgba(var(--bg-secondary-rgb), 0.7)",
                border: "1px solid rgba(var(--border-color-rgb), 0.4)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "var(--accent-primary)", flexShrink: 0,
              }}>
                <BookIcon />
              </div>
              <div>
                <h3 style={{
                  margin: "0 0 6px 0", color: "var(--accent-primary)",
                  fontSize: "1.15rem", fontWeight: 600,
                }}>
                  Accelerated Learning Roadmap
                </h3>
                <p style={{
                  margin: 0, color: "var(--text-secondary)",
                  fontSize: "14px", lineHeight: "1.5",
                }}>
                  Curated resources and learning paths for mastering Java efficiently
                </p>
              </div>
            </div>
            <div style={{ color: "var(--text-secondary)", flexShrink: 0 }}>
              <ArrowRightIcon />
            </div>
          </div>
        </div>
      )}

      {/*
        If the module has multiple blocks, render a subtle block header
        before each group. If all weeks share one block (or have no block),
        render flat — same as before.
      */}
      {hasBlocks
        ? blockKeys.map((blockKey) => (
            <div key={blockKey}>
              {/* Block divider header */}
              <div style={{
                display: "flex", alignItems: "center", gap: "12px",
                margin: "8px 0 14px",
              }}>
                <span style={{
                  fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em",
                  textTransform: "uppercase", color: "var(--text-secondary)",
                  whiteSpace: "nowrap",
                }}>
                  Block {blockKey}
                </span>
                <div style={{
                  flex: 1, height: "1px",
                  background: "rgba(var(--border-color-rgb), 0.3)",
                }} />
              </div>

              {blocks[blockKey].map((week) => {
                const hasQuestions = questions[moduleId]?.[week.id]?.length > 0;
                return (
                  <WeekCard
                    key={`${week.id}-${pageKey}`}
                    moduleId={moduleId}
                    week={week}
                    hasQuestions={hasQuestions}
                  />
                );
              })}
            </div>
          ))
        : moduleWeeks.map((week) => {
            const hasQuestions = questions[moduleId]?.[week.id]?.length > 0;
            return (
              <WeekCard
                key={`${week.id}-${pageKey}`}
                moduleId={moduleId}
                week={week}
                hasQuestions={hasQuestions}
              />
            );
          })
      }
    </div>
  );
}
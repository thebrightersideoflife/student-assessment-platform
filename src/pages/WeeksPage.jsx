// src/pages/WeeksPage.jsx
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { weeks } from "../data/weeks";
import WeekCard from "../components/WeekCard";
import ThemeToggle from "../components/ThemeToggle";
import { questions } from "../data/questions";

export default function WeeksPage() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Use location.key as part of the React key to force re-render on navigation
  // This ensures WeekCard components re-mount and re-check localStorage
  const pageKey = location.key || 'default';

  return (
    <div className="container">
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "24px"
      }}>
        <button
          className="button"
          onClick={() => navigate("/")}
        >
          ← Back
        </button>
        <ThemeToggle />
      </div>

      <h1 style={{ marginBottom: "24px" }}>
        {moduleId} – Weeks
      </h1>

      {/* Roadmap button for ITJVA */}
      {moduleId === "ITJVA" && (
        <div 
          className="card"
          style={{
            marginBottom: "24px",
            background: "linear-gradient(135deg, var(--bg-card), var(--bg-secondary))",
            border: "2px solid var(--accent-primary)",
            cursor: "pointer",
            transition: "transform 0.2s ease, box-shadow 0.2s ease"
          }}
          onClick={() => navigate(`/module/${moduleId}/roadmap`)}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <div>
              <h3 style={{ 
                margin: "0 0 8px 0",
                color: "var(--accent-primary)",
                fontSize: "1.3rem"
              }}>
                📚 Accelerated Learning Roadmap
              </h3>
              <p style={{
                margin: 0,
                color: "var(--text-secondary)",
                lineHeight: "1.6"
              }}>
                View curated resources and learning paths for mastering Java efficiently
              </p>
            </div>
            <div style={{
              fontSize: "2rem",
              color: "var(--accent-primary)"
            }}>
              →
            </div>
          </div>
        </div>
      )}

      {weeks.map(week => {
        const hasQuestions =
          questions[moduleId]?.[week.id]?.length > 0;

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
  );
}
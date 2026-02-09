import { useParams, useNavigate, useLocation } from "react-router-dom";
import { weeks } from "../data/weeks";
import WeekCard from "../components/WeekCard";
import ThemeToggle from "../components/ThemeToggle";

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

      {weeks.map(week => (
        <WeekCard
          key={`${week.id}-${pageKey}`}
          moduleId={moduleId}
          week={week}
        />
      ))}
    </div>
  );
}
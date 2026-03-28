import Breadcrumb from "../components/Breadcrumb";
import { modules } from "../data/modules";
import { getRoadmap } from "../data/roadmaps/index";
import { MODULE_META, DEFAULT_META } from "../components/moduleMeta";
import { weeks as weekRegistry } from "../data/weeks";
import { useNavigate } from "react-router-dom";

const getWeekCount = (moduleId) => {
  const w = weekRegistry[moduleId];
  return Array.isArray(w) ? w.length : 7;
};

export default function ResourcesPage() {
  return (
    <div className="container">
      <Breadcrumb items={[{ label: "Home", path: "/" }, { label: "Resources" }]} />

      <h1 style={{ marginBottom: 16 }}>Resources</h1>

      <p style={{ color: "var(--text-secondary)", marginBottom: 20 }}>
        Learning roadmaps gathered in one place. Click a module to view its detailed roadmap (when available).
      </p>

      <div style={{ display: "grid", gap: 12 }}>
        {modules.filter(m => getRoadmap(m.id)).length === 0 ? (
          <div style={{ color: "var(--text-secondary)" }}>No roadmaps available yet.</div>
        ) : (
          modules.filter(m => getRoadmap(m.id)).map((m) => {
            const roadmap = getRoadmap(m.id);
            const meta = MODULE_META[m.id] || DEFAULT_META;
            const weekCount = getWeekCount(m.id);
            const navigate = useNavigate();

            return (
              <div
                key={m.id}
                className="card"
                onClick={() => navigate(`/module/${m.id}/roadmap`)}
                style={{
                  cursor: "pointer",
                  display: "flex",
                  gap: 16,
                  alignItems: "center",
                  padding: "18px",
                  borderRadius: 14,
                  background: "rgba(var(--bg-card-rgb), 0.65)",
                  backdropFilter: "blur(12px) saturate(160%)",
                  WebkitBackdropFilter: "blur(12px) saturate(160%)",
                  transition: "transform 0.22s cubic-bezier(0.4,0,0.2,1), background 0.2s ease, box-shadow 0.22s ease",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.background = "rgba(var(--bg-card-rgb), 0.88)";
                  e.currentTarget.style.boxShadow = `0 18px 48px rgba(${meta.accentRgb}, 0.12)`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.background = "rgba(var(--bg-card-rgb), 0.65)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={{ width: 56, height: 56, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", color: meta.accent, border: `1px solid rgba(${meta.accentRgb},0.18)`, background: `rgba(${meta.accentRgb},0.12)` }}>
                  {meta.icon}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 700 }}>{meta.label || m.name}</div>
                      <div style={{ color: "var(--text-secondary)", marginTop: 6 }}>{m.description}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 8 }}>{weekCount} week{weekCount !== 1 ? "s" : ""}</div>
                      <div>
                        <span className="button" style={{ padding: "8px 12px" }}>View roadmap</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

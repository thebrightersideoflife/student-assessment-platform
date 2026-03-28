import { useNavigate } from "react-router-dom";
import { MODULE_META, DEFAULT_META } from "./moduleMeta";

export default function ModuleCard({ module }) {

  const navigate = useNavigate();

  function handleClick() {
    navigate(`/module/${module.id}`);
  }

  const meta = MODULE_META[module.id] || DEFAULT_META;

  return (
    <div
      className="card"
      onClick={handleClick}
      style={{
        cursor: "pointer",
        marginBottom: "16px",
        display: "flex",
        gap: "16px",
        alignItems: "center",
      }}
    >
      <div style={{
        width: 56, height: 56, borderRadius: 14,
        background: "rgba(var(--bg-secondary-rgb), 0.45)", display: "flex",
        alignItems: "center", justifyContent: "center", color: meta.accent,
        border: `1px solid rgba(${meta.accentRgb}, 0.18)`,
      }}>
        {meta.icon}
      </div>

      <div>
        <h3 style={{ margin: 0 }}>{module.name}</h3>
        <div style={{ color: "var(--text-secondary)", marginTop: 6 }}>{module.description}</div>
      </div>
    </div>
  );

}

import { useNavigate } from "react-router-dom";

export default function ModuleCard({ module }) {

  const navigate = useNavigate();

  function handleClick() {

    navigate(`/module/${module.id}`);

  }

  return (

    <div
      className="card"
      onClick={handleClick}
      style={{
        cursor: "pointer",
        marginBottom: "16px"
      }}
    >

      <h2>{module.id}</h2>

      <h3>{module.name}</h3>

      <p style={{ color: "var(--text-secondary)" }}>
        {module.description}
      </p>

    </div>

  );

}

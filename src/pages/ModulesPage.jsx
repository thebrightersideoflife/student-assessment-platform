import { modules } from "../data/modules";
import ModuleCard from "../components/ModuleCard";
import Breadcrumb from "../components/Breadcrumb";

export default function ModulesPage() {
  return (
    <div className="container">
      <Breadcrumb items={[
        { label: "Home", path: "/" },
        { label: "Modules" },
      ]} />

      <h1 style={{ marginBottom: "24px" }}>Modules</h1>

      {modules.map(module => (
        <ModuleCard
          key={module.id}
          module={module}
        />
      ))}
    </div>
  );
}
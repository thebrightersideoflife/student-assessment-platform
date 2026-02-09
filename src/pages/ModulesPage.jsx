import { modules } from "../data/modules";

import ModuleCard from "../components/ModuleCard";

import ThemeToggle from "../components/ThemeToggle";

export default function ModulesPage() {

  return (

    <div className="container">

      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "24px"
      }}>

        <h1>Modules</h1>

        <ThemeToggle />

      </div>

      {modules.map(module => (

        <ModuleCard
          key={module.id}
          module={module}
        />

      ))}

    </div>

  );

}

import { BrowserRouter, Routes, Route } from "react-router-dom";

import ModulesPage from "../pages/ModulesPage";
import WeeksPage from "../pages/WeeksPage";
import AssessmentPage from "../pages/AssessmentPage";
import RoadmapPage from "../pages/RoadmapPage";

export default function AppRouter() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<ModulesPage />} />

        <Route path="/module/:moduleId" element={<WeeksPage />} />

        <Route
          path="/module/:moduleId/week/:weekId"
          element={<AssessmentPage />}
        />

        <Route
          path="/module/:moduleId/roadmap"
          element={<RoadmapPage />}
        />

      </Routes>

    </BrowserRouter>

  );

}
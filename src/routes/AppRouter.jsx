import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "../components/Header";
import HomePage from "../pages/HomePage";
import ModulesPage from "../pages/ModulesPage";
import WeeksPage from "../pages/WeeksPage";
import AssessmentPage from "../pages/AssessmentPage";
import RoadmapPage from "../pages/RoadmapPage";
import ResourcesPage from "../pages/ResourcesPage";
import ProgressPage from "../pages/ProgressPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        {/* Home — new landing page */}
        <Route path="/" element={<HomePage />} />

        {/* Full module listing */}
        <Route path="/modules" element={<ModulesPage />} />

        <Route path="/resources" element={<ResourcesPage />} />

        <Route path="/progress" element={<ProgressPage />} />

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
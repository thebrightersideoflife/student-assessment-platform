import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "../components/Header";
import HomePage from "../pages/HomePage";
import ModulesPage from "../pages/ModulesPage";
import WeeksPage from "../pages/WeeksPage";
import AssessmentPage from "../pages/AssessmentPage";
import RoadmapPage from "../pages/RoadmapPage";
import ResourcesPage from "../pages/ResourcesPage";
import ProgressPage from "../pages/ProgressPage";
import SupportPage from "../pages/SupportPage";
import QuestionSearchPage from "../pages/QuestionSearchPage";
import RevisionPage from "../pages/RevisionPage";
import TypingPracticePage from "../pages/TypingPracticePage";
import TypingReportPage from "../pages/TypingReportPage";

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

        <Route path="/support" element={<SupportPage />} />

        <Route path="/search/questions" element={<QuestionSearchPage />} />

        <Route path="/module/:moduleId" element={<WeeksPage />} />

        <Route path="/module/:moduleId/week/:weekId" element={<AssessmentPage />}/>

        <Route path="/module/:moduleId/roadmap" element={<RoadmapPage />}/>

        <Route path="/revision" element={<RevisionPage />} />

        {/* Typing practice — new top-level feature */}
        <Route path="/typing" element={<TypingPracticePage />} />

        {/* Typing progress report — printable charts, reads from local session log */}
        <Route path="/typing/report" element={<TypingReportPage />} />
      </Routes>
    </BrowserRouter>
  );
}
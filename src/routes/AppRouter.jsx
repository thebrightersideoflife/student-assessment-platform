import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "../components/Header";
import HomePage from "../pages/HomePage";
import ModulesPage from "../pages/ModulesPage";
import WeeksPage from "../pages/WeeksPage";
import AssessmentPage from "../pages/AssessmentPage";
import GamesPage from "../pages/GamesPage";
import StudyGamesHubPage from "../pages/StudyGamesHubPage";
import RoadmapPage from "../pages/RoadmapPage";
import ResourcesPage from "../pages/ResourcesPage";
import ProgressPage from "../pages/ProgressPage";
import SupportPage from "../pages/SupportPage";
import QuestionSearchPage from "../pages/QuestionSearchPage";
import RevisionPage from "../pages/RevisionPage";
import FlashcardsPage from "../pages/FlashcardsPage";
import WeaknessQuizPage from "../pages/WeaknessQuizPage";
import TypingPracticePage from "../pages/TypingPracticePage";
import TypingReportPage from "../pages/TypingReportPage";
import CompetitionLandingPage from "../pages/CompetitionLandingPage";

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

        <Route path="/games" element={<StudyGamesHubPage />} />
        <Route path="/games/:moduleId" element={<GamesPage />} />
        <Route path="/games/:moduleId/:weekId" element={<GamesPage />} />

        {/* Deprecated/Redirect legacy path if needed, but for now just add the new ones */}
        <Route path="/module/:moduleId/week/:weekId/games" element={<GamesPage />}/>

        <Route path="/module/:moduleId/roadmap" element={<RoadmapPage />}/>

        <Route path="/revision" element={<RevisionPage />} />

        <Route path="/flashcards" element={<FlashcardsPage />} />

        <Route path="/weakness-quiz" element={<WeaknessQuizPage />} />

        {/* Typing practice — new top-level feature */}
        <Route path="/typing" element={<TypingPracticePage />} />

        {/* Typing progress report — printable charts, reads from local session log */}
        <Route path="/typing/report" element={<TypingReportPage />} />

        {/* Competition mode — landing page with unlock/practice gating.
            Scoped to a specific module+difficulty via URL params so it's
            shareable/bookmarkable and survives a refresh. */}
        <Route path="/typing/competition/:moduleId/:mode" element={<CompetitionLandingPage />} />
        <Route path="/typing/competition" element={<CompetitionLandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { modules } from "../data/modules";
import { weeks as weekRegistry } from "../data/weeks";
import HeroSection from "../components/home/HeroSection";
import TypingPracticeSection from "../components/home/TypingPracticeSection";
import PodcastSection from "../components/home/PodcastSection";
import VideoSection from "../components/home/VideoSection";
import FeaturedModulesSection from "../components/home/FeaturedModulesSection";
import FlashcardSection from "../components/home/FlashcardSection";
import GamesSection from "../components/home/GamesSection";
import OfflineSection from "../components/home/OfflineSection";
import CallToActionSection from "../components/home/CallToActionSection";
import ScrollReveal from "../components/ScrollReveal";
import "../assets/styles/home.css";

// Helper: derive week count from canonical registry
const getWeekCount = (moduleId) => {
  const w = weekRegistry[moduleId];
  return Array.isArray(w) ? w.length : 7; // fallback to 7 for older modules
};

/* ── HomePage ─────────────────────────────────────────────── */

export default function HomePage() {
  const { theme } = useContext(ThemeContext);
  const totalWeeks = modules.reduce((sum, m) => sum + getWeekCount(m.id), 0);

  return (
    <div style={{ overflowX: "hidden" }}>
      <HeroSection theme={theme} totalWeeks={totalWeeks} />
      <TypingPracticeSection theme={theme} />
      <PodcastSection theme={theme} />
      <VideoSection />

      <FeaturedModulesSection modules={modules} totalWeeks={totalWeeks} />
      <FlashcardSection theme={theme} />
      <GamesSection theme={theme} />
      <OfflineSection theme={theme} />
      <CallToActionSection theme={theme} />

      {/* ════════════════════════════════════════════════════
          FOOTER
          ════════════════════════════════════════════════════ */}
      <footer style={{
        width: "100%",
        background: "transparent",
        padding: "28px 20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "var(--text-secondary)",
        fontSize: "14px",
      }}>
        <span style={{ fontWeight: 700, marginRight: "8px", color: theme === "light" ? "var(--sunset-orange)" : "var(--vibrant-cyan)" }}>
          Student Assessment Platform
        </span>
        <span>© {new Date().getFullYear()} All rights reserved</span>
      </footer>
    </div>
  );
}
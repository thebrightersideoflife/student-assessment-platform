import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { modules } from "../data/modules";
import { weeks as weekRegistry } from "../data/weeks";
import HeroSection from "../components/home/HeroSection";
import TypingPracticeSection from "../components/home/TypingPracticeSection";
import PodcastSection from "../components/home/PodcastSection";
import FeaturedModulesSection from "../components/home/FeaturedModulesSection";
import OfflineSection from "../components/home/OfflineSection";
import CallToActionSection from "../components/home/CallToActionSection";
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

      {/* ════════════════════════════════════════════════════
          VIDEO SECTION
          ════════════════════════════════════════════════════ */}
      <section style={{
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "56px 40px 72px",
        position: "relative", zIndex: 1,
      }}>
        <div className="video-grid">
          {/* Video 1 — 16:9 responsive wrapper */}
          <div style={{
            position: "relative",
            paddingTop: "56.25%",
            width: "100%",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 32px 80px rgba(0,0,0,0.35)",
          }}>
            <iframe
              src="https://www.youtube.com/embed/QW6y-F4Pr3Q"
              title="Student Assessment Platform — Introduction"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{
                position: "absolute",
                top: 0, left: 0,
                width: "100%", height: "100%",
                border: "none",
              }}
            />
          </div>

          {/* Video 2 — 16:9 responsive wrapper */}
          <div style={{
            position: "relative",
            paddingTop: "56.25%",
            width: "100%",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 32px 80px rgba(0,0,0,0.35)",
          }}>
            <iframe
              src="https://www.youtube.com/embed/qo7SuzQMi8w"
              title="Student Assessment Platform — Walkthrough"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{
                position: "absolute",
                top: 0, left: 0,
                width: "100%", height: "100%",
                border: "none",
              }}
            />
          </div>
        </div>
      </section>

      <FeaturedModulesSection modules={modules} totalWeeks={totalWeeks} />
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
import { Link } from "react-router-dom";
import ScrollReveal from "../ScrollReveal";

export default function GamesSection({ theme }) {
  const accent = "var(--game-accent)";
  const buttonGradient = theme === "light"
    ? `linear-gradient(90deg, var(--sunset-orange), var(--golden-amber))`
    : `linear-gradient(90deg, #00BFFF, #2A5CA7)`;

  return (
    <section
      style={{
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "60px 40px 24px",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div className="home-split-grid">
        {/* Left Side: Content */}
        <ScrollReveal direction="left">
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(var(--game-accent-rgb), 0.12)",
                border: "1px solid rgba(var(--game-accent-rgb), 0.18)",
                borderRadius: "999px",
                padding: "6px 16px",
                width: "fit-content",
              }}
            >
              <div
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: accent,
                  boxShadow: `0 0 6px ${accent}`,
                  animation: "heroPulse 2s ease-in-out infinite",
                }}
              />
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: accent,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Learn Through Play
              </span>
            </div>

            <h2
              style={{
                fontSize: "clamp(1.75rem, 3vw, 2.4rem)",
                fontWeight: 800,
                lineHeight: 1.25,
                letterSpacing: "-0.03em",
                margin: 0,
                color: "var(--text-primary)",
              }}
            >
              Reinforce your knowledge with
              <span
                style={{
                  display: "block",
                  background: theme === "light"
                    ? "linear-gradient(90deg, var(--sunset-orange), var(--golden-amber))"
                    : "linear-gradient(90deg, var(--vibrant-cyan), var(--cornflower-blue))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  paddingBottom: "4px",
                }}
              >
                interactive study games
              </span>
            </h2>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                fontSize: "17px",
                lineHeight: "1.75",
                color: "var(--text-secondary)",
              }}
            >
              <p style={{ margin: 0 }}>
                Turn platform assessments into engaging puzzles. From crosswords to word searches, every game is dynamically generated from our comprehensive question bank.
              </p>
              <p style={{ margin: 0 }}>
                It's not just a break—it's a high-retention study session that helps you memorize key terms and concepts without the fatigue of traditional drilling.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "8px" }}>
              {[
                "Auto-generated Crosswords from any module",
                "Dynamic Word Searches for term recognition",
                "Instant feedback and completion timers"
              ].map((feature, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "15px", color: "var(--text-secondary)" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {feature}
                </div>
              ))}
            </div>

            <Link
              to="/games"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "fit-content",
                padding: "12px 24px",
                borderRadius: "999px",
                background: buttonGradient,
                color: theme === "light" ? "black" : "white",
                fontSize: "15px",
                fontWeight: 700,
                textDecoration: "none",
                boxShadow: `0 14px 30px rgba(var(--game-accent-rgb), 0.25)`,
                marginTop: "4px",
              }}
            >
              Go to Games Hub
            </Link>
          </div>
        </ScrollReveal>

        {/* Right Side: Image */}
        <ScrollReveal direction="right" delay={200}>
          <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div className="home-image-orb home-image-orb--games" style={{
                background: `radial-gradient(circle, rgba(var(--game-accent-rgb), 0.15) 0%, transparent 70%)`
            }} />
            <div className="home-image-frame home-image-frame--games">
              <img
                src="/images/StudyGamesHub.png"
                alt="Study Games Hub preview"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentElement.style.background = `
                    linear-gradient(135deg,
                      rgba(var(--bg-card-rgb),0.95),
                      rgba(var(--game-accent-rgb), 0.08)
                    )
                  `;
                  const placeholder = document.createElement("div");
                  placeholder.className = "home-image-placeholder";
                  placeholder.innerHTML = `
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none"
                      stroke="rgba(var(--game-accent-rgb), 0.45)" stroke-width="1.5"
                      stroke-linecap="round" stroke-linejoin="round">
                      <path d="M6 9l6 6 6-6" />
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                    </svg>
                    <span>Games Hub</span>
                  `;
                  e.target.parentElement.appendChild(placeholder);
                }}
              />
              <div
                className="home-image-shimmer"
                style={{
                  background: `linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 50%, rgba(var(--game-accent-rgb), 0.04) 100%)`,
                }}
              />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

import { Link } from "react-router-dom";
import ScrollReveal from "../ScrollReveal";

export default function FlashcardSection({ theme }) {
  const accent = "var(--fc-purple)";
  const buttonGradient = theme === "light"
    ? `linear-gradient(90deg, var(--fc-purple), var(--fc-pink))`
    : `linear-gradient(90deg, #9333ea, #db2777)`;

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
        {/* Left Side: Image - Following patterns from other sections */}
        <ScrollReveal direction="left">
          <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div className="home-image-orb home-image-orb--flashcards" />
            <div className="home-image-frame home-image-frame--flashcards">
              <img
                src="/images/Flashcards.png"
                alt="Flashcards experience preview"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentElement.style.background = `
                    linear-gradient(135deg,
                      rgba(var(--bg-card-rgb),0.95),
                      rgba(168, 85, 247, 0.08)
                    )
                  `;
                  const placeholder = document.createElement("div");
                  placeholder.className = "home-image-placeholder";
                  placeholder.innerHTML = `
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none"
                      stroke="rgba(168, 85, 247, 0.45)" stroke-width="1.5"
                      stroke-linecap="round" stroke-linejoin="round">
                      <rect x="3" y="4" width="18" height="16" rx="2" />
                      <path d="M7 8h10" />
                      <path d="M7 12h10" />
                      <path d="M7 16h6" />
                    </svg>
                    <span>Flashcards</span>
                  `;
                  e.target.parentElement.appendChild(placeholder);
                }}
              />
              <div
                className="home-image-shimmer"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 50%, rgba(168, 85, 247, 0.04) 100%)",
                }}
              />
            </div>
          </div>
        </ScrollReveal>

        {/* Right Side: Content */}
        <ScrollReveal direction="right" delay={200}>
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(168, 85, 247, 0.12)",
                border: "1px solid rgba(168, 85, 247, 0.18)",
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
                Active Recall
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
              Master your course with
              <span
                style={{
                  display: "block",
                  background: "linear-gradient(90deg, #A855F7, #EC4899)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  paddingBottom: "4px",
                }}
              >
                smart digital flashcards
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
                Flip through questions, test your knowledge, and reveal answers instantly. Our new flashcards feature is designed to help you build long-term memory through active recall.
              </p>
              <p style={{ margin: 0 }}>
                Filter by module or question type to focus on exactly what you need to master next.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "8px" }}>
              {[
                "Personalized study sessions by module",
                "Filter by Multiple Choice, Fill-in-Blank, or Open-ended"
              ].map((feature, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "15px", color: "var(--text-secondary)" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {feature}
                </div>
              ))}
            </div>

            <Link
              to="/flashcards"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "fit-content",
                padding: "12px 24px",
                borderRadius: "999px",
                background: buttonGradient,
                color: "white",
                fontSize: "15px",
                fontWeight: 700,
                textDecoration: "none",
                boxShadow: "0 14px 30px rgba(168, 85, 247, 0.25)",
                marginTop: "4px",
              }}
            >
              Start studying
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

import { Link } from "react-router-dom";

export default function TypingPracticeSection({ theme }) {
  const accent = theme === "light" ? "var(--royal-blue)" : "var(--vibrant-cyan)";
  const buttonGradient = theme === "light"
    ? `linear-gradient(90deg, ${accent}, var(--vibrant-cyan))`
    : `linear-gradient(90deg, rgb(36, 78, 141), rgba(64,179,255,1))`;

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
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: theme === "light" ? "rgba(42,92,167,0.12)" : "rgba(0,191,255,0.12)",
              border: theme === "light" ? "1px solid rgba(42,92,167,0.18)" : "1px solid rgba(0,191,255,0.18)",
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
              Typing Practice
            </span>
          </div>

          <h2
            style={{
              fontSize: "clamp(1.75rem, 3vw, 2.4rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              margin: 0,
              color: "var(--text-primary)",
            }}
          >
            Build fluency with a
            <span
              style={{
                display: "block",
                background: "linear-gradient(90deg, var(--lush-lime), var(--vibrant-cyan))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              calmer, smarter revision loop
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
              Search for the module you want, choose a duration, and type your way through the questions, model answers, and explanations — all in one focused session.
            </p>
            <p style={{ margin: 0 }}>
              It is a fast way to revise while building confidence, accuracy, and speed without leaving the course content behind.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "8px" }}>
            {[
              "Search modules instantly by name, topic, or code",
              "Practice with your chosen difficulty and timing",
              "Turn revision into a repeatable, low-friction habit",
            ].map((feature, idx) => (
              <div key={idx} style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "15px", color: "var(--text-secondary)" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--lush-lime)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {feature}
              </div>
            ))}
          </div>

          <Link
            to="/typing"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "fit-content",
              padding: "12px 18px",
              borderRadius: "999px",
              background: buttonGradient,
              color: "white",
              fontSize: "15px",
              fontWeight: 700,
              textDecoration: "none",
              boxShadow: "0 14px 30px rgba(0,0,0,0.15)",
              marginTop: "4px",
            }}
          >
            Start typing
          </Link>
        </div>

        <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div className="home-image-orb home-image-orb--typing" />
          <div className="home-image-frame home-image-frame--typing">
            <img
              src="/images/TypingPractice.png"
              alt="Typing practice experience preview"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.parentElement.style.background = `
                  linear-gradient(135deg,
                    rgba(var(--bg-card-rgb),0.95),
                    rgba(42,92,167,0.08)
                  )
                `;
                const placeholder = document.createElement("div");
                placeholder.className = "home-image-placeholder";
                placeholder.innerHTML = `
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none"
                    stroke="rgba(42,92,167,0.45)" stroke-width="1.5"
                    stroke-linecap="round" stroke-linejoin="round">
                    <rect x="2" y="6" width="20" height="12" rx="2" />
                    <path d="M6 10h4" />
                    <path d="M6 13h8" />
                  </svg>
                  <span>Typing Practice</span>
                `;
                e.target.parentElement.appendChild(placeholder);
              }}
            />
            <div
              className="home-image-shimmer"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 50%, rgba(42,92,167,0.04) 100%)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

import ScrollReveal from "../ScrollReveal";

export default function StudyGamesHero() {
  // Using semantic game accent colors defined in theme
  return (
    <section
      className="games-hero-section"
      style={{
        position: "relative",
        padding: "44px 24px 34px",
        maxWidth: "940px",
        margin: "0 auto 16px",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(135deg, rgba(var(--game-accent-rgb), 0.16), rgba(var(--game-accent-rgb), 0.04) 45%, transparent 100%)`,
          borderRadius: "32px",
          filter: "blur(10px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <ScrollReveal direction="bottom" duration={700}>
        <div
          className="games-hero-card"
          style={{
            position: "relative",
            zIndex: 1,
            padding: "32px 36px",
            borderRadius: "28px",
            border: "1px solid rgba(var(--border-color-rgb), 0.35)",
            background: "rgba(var(--bg-card-rgb), 0.78)",
            backdropFilter: "blur(18px) saturate(150%)",
            WebkitBackdropFilter: "blur(18px) saturate(150%)",
            boxShadow: "0 18px 50px rgba(0,0,0,0.08)",
            display: "flex",
            alignItems: "center",
            gap: "40px",
          }}
        >
          {/* Left Side: Image */}
          <ScrollReveal direction="left" delay={200} distance="40px">
            <div style={{ flex: "0 0 240px", display: "flex", justifyContent: "center" }} className="hero-image-container">
              <img
                src="/images/StudyGamesHub.png"
                alt="Study Games Illustration"
                style={{
                  width: "100%",
                  height: "auto",
                  maxWidth: "240px",
                  borderRadius: "16px",
                  objectFit: "contain",
                }}
              />
            </div>
          </ScrollReveal>

          {/* Right Side: Content */}
          <ScrollReveal direction="right" delay={350} distance="40px">
            <div style={{ flex: 1, textAlign: "left" }} className="hero-content-container">
              <h1
                style={{
                  margin: "0 0 14px",
                  fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  color: "var(--text-primary)",
                  lineHeight: 1.15,
                }}
              >
                Reinforce your knowledge through <span style={{ color: "var(--game-accent)" }}>game play</span>
              </h1>

              <p style={{ margin: "0 0 10px", fontSize: "17px", color: "var(--text-primary)", lineHeight: 1.7 }}>
                Learn the fun way with auto-generated games. Crosswords, hangman, word search, matching, and more.
              </p>
              <p style={{ margin: "0", fontSize: "16px", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                Pick a module below to generate a new set of challenges and put your knowledge to the test.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </ScrollReveal>

      <style>{`
        @media (max-width: 820px) {
          .games-hero-card {
            flex-direction: column !important;
            text-align: center !important;
            padding: 30px 24px 26px !important;
            gap: 24px !important;
          }
          .hero-content-container {
            text-align: center !important;
          }
          .hero-image-container {
            flex: 0 0 auto !important;
          }
        }
      `}</style>
    </section>
  );
}

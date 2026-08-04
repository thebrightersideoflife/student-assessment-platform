export default function TypingPracticeHero({ accentColor, accentRgb }) {
  return (
    <section
      className="typing-hero-section"
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
          background: `linear-gradient(135deg, rgba(${accentRgb}, 0.16), rgba(${accentRgb}, 0.04) 45%, transparent 100%)`,
          borderRadius: "32px",
          filter: "blur(10px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        className="typing-hero-card"
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
        <div style={{ flex: "0 0 240px", display: "flex", justifyContent: "center" }} className="hero-image-container">
          <img
            src="/images/TypingPractice.png"
            alt="Typing Practice Illustration"
            style={{
              width: "100%",
              height: "auto",
              maxWidth: "240px",
              borderRadius: "16px",
              objectFit: "contain",
            }}
          />
        </div>

        {/* Right Side: Content */}
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
            Sharpen your speed and <span style={{ color: accentColor }}>lock in the essentials</span>
          </h1>

          <p style={{ margin: "0 0 10px", fontSize: "17px", color: "var(--text-primary)", lineHeight: 1.7 }}>
            Practice typing the question, then the model answer, then the explanation — all as one flowing revision loop.
          </p>
          <p style={{ margin: "0", fontSize: "16px", color: "var(--text-secondary)", lineHeight: 1.7 }}>
            Search below for the exact module you want, then jump straight into a focused typing session.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .typing-hero-card {
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

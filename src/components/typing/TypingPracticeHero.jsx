export default function TypingPracticeHero({ accentColor, accentRgb }) {
  return (
    <section
      style={{
        position: "relative",
        padding: "44px 24px 34px",
        maxWidth: "940px",
        margin: "0 auto 16px",
        textAlign: "center",
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
        style={{
          position: "relative",
          zIndex: 1,
          padding: "30px 24px 26px",
          borderRadius: "28px",
          border: "1px solid rgba(var(--border-color-rgb), 0.35)",
          background: "rgba(var(--bg-card-rgb), 0.78)",
          backdropFilter: "blur(18px) saturate(150%)",
          WebkitBackdropFilter: "blur(18px) saturate(150%)",
          boxShadow: "0 18px 50px rgba(0,0,0,0.08)",
        }}
      >
        <h1
          style={{
            margin: "0 0 14px",
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: "var(--text-primary)",
            lineHeight: 1.12,
          }}
        >
          Sharpen your speed and <span style={{ color: accentColor }}>lock in the essentials</span>
        </h1>

        <p style={{ margin: "0 auto 8px", maxWidth: "690px", fontSize: "17px", color: "var(--text-primary)", lineHeight: 1.7 }}>
          Practice typing the question, then the model answer, then the explanation — all as one flowing revision loop.
        </p>
        <p style={{ margin: "0 auto", maxWidth: "560px", fontSize: "16px", color: "var(--text-secondary)", lineHeight: 1.7 }}>
          Search below for the exact module you want, then jump straight into a focused typing session.
        </p>
      </div>
    </section>
  );
}
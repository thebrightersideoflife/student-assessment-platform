import React from "react";
import { Settings, RefreshCw, ChevronRight } from "lucide-react";
import ScrollReveal from "../ScrollReveal";

export default function FlashcardsHero({ onOpenSettings, onShuffle, cardsCount, currentIndex, accentRgb }) {
  const purpleAccent = "var(--fc-purple)";

  return (
    <section
      className="fc-hero-section"
      style={{
        position: "relative",
        padding: "44px 24px 20px",
        maxWidth: "1000px",
        margin: "0 auto",
      }}
    >
      {/* Background Glow */}
      <div
        style={{
          position: "absolute",
          inset: "0 0 20px 0",
          background: `linear-gradient(135deg, rgba(${accentRgb}, 0.16), rgba(${accentRgb}, 0.04) 45%, transparent 100%)`,
          borderRadius: "32px",
          filter: "blur(10px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <ScrollReveal direction="bottom" duration={700}>
        <div
          className="fc-hero-card"
          style={{
            position: "relative",
            zIndex: 1,
            borderRadius: "28px",
            border: "1px solid rgba(var(--border-color-rgb), 0.35)",
            background: "rgba(var(--bg-card-rgb), 0.78)",
            backdropFilter: "blur(20px) saturate(160%)",
            WebkitBackdropFilter: "blur(20px) saturate(160%)",
            boxShadow: "0 18px 50px rgba(0,0,0,0.08)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Main Content Area */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "40px",
            padding: "36px 40px"
          }} className="fc-hero-main">
            {/* Left Side: Image */}
            <ScrollReveal direction="left" delay={200} distance="40px">
              <div style={{ flex: "0 0 200px", display: "flex", justifyContent: "center" }} className="fc-hero-image-container">
                <img
                  src="/images/Flashcards.png"
                  alt="Flashcards Illustration"
                  style={{
                    width: "100%",
                    height: "auto",
                    maxWidth: "200px",
                    borderRadius: "16px",
                    objectFit: "contain",
                  }}
                />
              </div>
            </ScrollReveal>

            {/* Right Side: Content */}
            <ScrollReveal direction="right" delay={350} distance="40px">
              <div style={{ flex: 1, textAlign: "left" }} className="fc-hero-content">
                <h1
                  style={{
                    margin: "0 0 14px",
                    fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
                    fontWeight: 800,
                    letterSpacing: "-0.03em",
                    color: "var(--text-primary)",
                    lineHeight: 1.15,
                  }}
                >
                  Master your course with <span style={{ color: purpleAccent }}>smart digital flashcards</span>
                </h1>

                <p style={{ margin: "0 0 10px", fontSize: "17px", color: "var(--text-primary)", lineHeight: 1.7 }}>
                  Flip through questions, test your knowledge, and reveal answers instantly. Build long-term memory through active recall.
                </p>
                <p style={{ margin: "0", fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                  Configure your study session below by selecting specific modules and question types.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </ScrollReveal>

      {/* Control Area: Placed under the card */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "40px",
        marginTop: "48px",
        position: "relative",
        zIndex: 20
      }}>
        <ScrollReveal direction="bottom" delay={500} distance="20px">
          <button
            className="fc-settings-btn-inline"
            onClick={onOpenSettings}
            style={{
              background: "rgba(var(--bg-secondary-rgb), 0.6)",
              border: "1px solid rgba(var(--border-color-rgb), 0.4)",
              color: "var(--text-primary)",
              padding: "10px 24px",
              borderRadius: "14px",
              fontSize: "14px",
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              transition: "all 0.2s"
            }}
          >
            <Settings size={18} />
            Settings
          </button>
        </ScrollReveal>

        <ScrollReveal direction="bottom" delay={600} distance="20px">
          <div style={{
            fontSize: "14px",
            fontWeight: 700,
            color: "var(--text-secondary)",
            background: "rgba(var(--bg-secondary-rgb), 0.5)",
            padding: "8px 16px",
            borderRadius: "10px",
            border: "1px solid rgba(var(--border-color-rgb), 0.2)",
            minWidth: "120px",
            textAlign: "center"
          }}>
            {cardsCount > 0 ? `Card ${currentIndex + 1} of ${cardsCount}` : "No cards"}
          </div>
        </ScrollReveal>

        <ScrollReveal direction="bottom" delay={700} distance="20px">
          <button
            className="fc-shuffle-btn-inline"
            onClick={onShuffle}
            style={{
              background: "rgba(var(--bg-secondary-rgb), 0.6)",
              border: "1px solid rgba(var(--border-color-rgb), 0.4)",
              color: "var(--text-primary)",
              padding: "10px 24px",
              borderRadius: "14px",
              fontSize: "14px",
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              transition: "all 0.2s"
            }}
          >
            <RefreshCw size={18} />
            Shuffle Pool
          </button>
        </ScrollReveal>
      </div>

      <style>{`
        .fc-settings-btn-inline:hover, .fc-shuffle-btn-inline:hover {
          background: var(--bg-secondary) !important;
          border-color: var(--accent-primary) !important;
          color: var(--accent-primary) !important;
          transform: translateY(-1px);
        }
        @media (max-width: 820px) {
          .fc-hero-main {
            flex-direction: column !important;
            text-align: center !important;
            gap: 24px !important;
            padding: 30px 24px 20px !important;
          }
          .fc-hero-content {
            text-align: center !important;
          }
          .fc-hero-image-container {
            flex: 0 0 auto !important;
          }
          .fc-hero-card div[style*="justify-content: space-between"] {
            flex-direction: column !important;
            gap: 20px !important;
            padding: 24px !important;
          }
          .fc-hero-card div[style*="display: flex; gap: 16px"] {
            width: 100% !important;
          }
          .fc-hero-card div[style*="display: flex; gap: 16px"] button {
            flex: 1 !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </section>
  );
}

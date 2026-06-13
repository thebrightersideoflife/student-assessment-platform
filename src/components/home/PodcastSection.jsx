import { useState, useRef } from "react";

/**
 * PodcastPlayButton
 * Toggles play/pause on a single shared Audio instance,
 * preventing overlapping playback on repeated clicks.
 */
function PodcastPlayButton() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/audio/ListenBeforeYouStart.mp3");
      audioRef.current.addEventListener("ended", () => setIsPlaying(false));
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <button
      onClick={togglePlay}
      style={{
        width: "48px",
        height: "48px",
        borderRadius: "999px",
        border: "2px solid var(--golden-amber)",
        background: "rgba(244,169,0,0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "all 0.3s ease",
        color: "var(--golden-amber)",
        flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "var(--golden-amber)";
        e.currentTarget.style.color = "var(--bg-primary)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(244,169,0,0.1)";
        e.currentTarget.style.color = "var(--golden-amber)";
      }}
      aria-label={isPlaying ? "Pause podcast introduction" : "Play podcast introduction"}
    >
      {isPlaying ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <rect x="6" y="5" width="4" height="14" />
          <rect x="14" y="5" width="4" height="14" />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
      )}
    </button>
  );
}

/**
 * PodcastSection
 * "Listen before you start" — audio learning intro with
 * responsive image frame and feature list.
 */
export default function PodcastSection({ theme }) {
  return (
    <section style={{
      maxWidth: "1280px",
      margin: "0 auto",
      padding: "60px 40px 80px",
      position: "relative", zIndex: 1,
    }}>
      <div className="home-split-grid">
        {/* LEFT — Text content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Eyebrow */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: theme === "light" ? "rgba(244,169,0,1)" : "rgba(244,169,0,0.08)",
            border: theme === "light" ? "none" : `1px solid rgba(244,169,0,0.2)`,
            borderRadius: "999px",
            padding: "6px 16px",
            width: "fit-content",
          }}>
            <div style={{
              width: "6px", height: "6px", borderRadius: "50%",
              background: "var(--golden-amber)",
              boxShadow: `0 0 6px var(--golden-amber)`,
              animation: "heroPulse 2s ease-in-out infinite",
            }} />
            <span style={{
              fontSize: "14px", fontWeight: 600, color: theme === "light" ? "white" : "var(--golden-amber)",
              letterSpacing: "0.08em", textTransform: "uppercase",
            }}>
              Audio Learning
            </span>
          </div>

          {/* Headline with Play/Pause Button */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
            <h2 style={{
              fontSize: "clamp(1.75rem, 3vw, 2.4rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              margin: 0,
              color: "var(--text-primary)",
            }}>
              Podcast{" "}
              <span style={{
                background: "linear-gradient(90deg, var(--golden-amber), var(--vibrant-cyan))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Walkthrough
              </span>
            </h2>
            <PodcastPlayButton />
          </div>

          {/* Body copy */}
          <div style={{
            display: "flex", flexDirection: "column", gap: "16px",
            fontSize: "17px", lineHeight: "1.75",
            color: "var(--text-secondary)",
          }}>
            <p style={{ margin: 0 }}>
              Every week is accompanied by a carefully crafted podcast that summarizes the key concepts and topics you'll encounter in that week's assessment. Listen during your commute, workout, or while relaxing — get ahead of the material before you dive into the practice questions.
            </p>
            <p style={{ margin: 0 }}>
              Our podcasts are designed to give you the confidence and context you need to approach each assessment prepared and ready. Think of it as your personal study companion.
            </p>
          </div>

          {/* Features list */}
          <div style={{
            display: "flex", flexDirection: "column", gap: "12px",
            marginTop: "8px",
          }}>
            {[
              "Summarized key concepts for each week",
              "Clear explanations of challenging topics",
              "Perfect for pre-assessment preparation"
            ].map((feature, idx) => (
              <div key={idx} style={{
                display: "flex", alignItems: "center", gap: "12px",
                fontSize: "15px", color: "var(--text-secondary)",
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="var(--lush-lime)" strokeWidth="2" strokeLinecap="round"
                  strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                {feature}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Image */}
        <div style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          {/* Glowing orb behind image */}
          <div className="home-image-orb home-image-orb--podcast" />

          {/* Image frame */}
          <div className="home-image-frame home-image-frame--podcast">
            <img
              src="/images/Listen_Before_You_Start.png"
              alt="Listen Before You Start"
              onError={e => {
                e.target.style.display = "none";
                e.target.parentElement.style.background = `
                  linear-gradient(135deg,
                    rgba(var(--bg-card-rgb),0.9),
                    rgba(244,169,0,0.06)
                  )
                `;
                const placeholder = document.createElement("div");
                placeholder.className = "home-image-placeholder";
                placeholder.innerHTML = `
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none"
                    stroke="rgba(244,169,0,0.5)" stroke-width="1.5"
                    stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="1"/>
                    <path d="M12 8a4 4 0 0 1 4 4"/>
                    <path d="M12 4a8 8 0 0 1 8 8"/>
                  </svg>
                  <span>Listen &amp; Learn</span>
                `;
                e.target.parentElement.appendChild(placeholder);
              }}
            />

            {/* Shimmer overlay */}
            <div className="home-image-shimmer" style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 50%, rgba(244,169,0,0.03) 100%)",
            }} />
          </div>
        </div>
      </div>
    </section>
  );
}
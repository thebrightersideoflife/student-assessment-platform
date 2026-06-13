/**
 * OfflineSection
 * "Study anywhere, anytime" — offline access info with
 * responsive image frame (with fallback) and feature list.
 */
export default function OfflineSection({ theme }) {
  return (
    <section style={{
      maxWidth: "1280px",
      margin: "0 auto",
      padding: "60px 40px 80px",
      position: "relative", zIndex: 1,
    }}>
      <div className="home-split-grid">
        {/* LEFT — Image */}
        <div style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          {/* Glowing orb behind image */}
          <div className="home-image-orb home-image-orb--offline" />

          {/* Image frame with fallback */}
          <div className="home-image-frame home-image-frame--offline">
            <img
              src="/images/OfflineFunctionality.png"
              alt="Offline Functionality"
              onError={e => {
                e.target.style.display = "none";
                const placeholder = document.createElement("div");
                placeholder.className = "home-image-placeholder";
                placeholder.innerHTML = `
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none"
                    stroke="var(--lush-lime)" stroke-width="1.5" stroke-linecap="round"
                    stroke-linejoin="round" style="opacity:0.7;">
                    <path d="M12 2c-5.33 0-10 1.79-10 4v12c0 2.21 4.67 4 10 4s10-1.79 10-4V6c0-2.21-4.67-4-10-4z"/>
                    <path d="M2 6c0 2.21 4.67 4 10 4s10-1.79 10-4"/>
                    <path d="M2 12c0 2.21 4.67 4 10 4s10-1.79 10-4"/>
                  </svg>
                  <span style="font-size:16px;font-weight:600;color:var(--text-primary);letter-spacing:0.05em;text-transform:uppercase;">
                    Download &amp; Learn
                  </span>
                `;
                e.target.parentElement.appendChild(placeholder);
              }}
            />

            {/* Shimmer overlay */}
            <div className="home-image-shimmer" style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 50%, rgba(118,209,61,0.03) 100%)",
            }} />
          </div>
        </div>

        {/* RIGHT — Text content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Eyebrow */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: theme === "light" ? "rgba(118,209,61,1)" : "rgba(118,209,61,0.08)",
            border: theme === "light" ? "none" : `1px solid rgba(118,209,61,0.2)`,
            borderRadius: "999px",
            padding: "6px 16px",
            width: "fit-content",
          }}>
            <div style={{
              width: "6px", height: "6px", borderRadius: "50%",
              background: "var(--lush-lime)",
              boxShadow: `0 0 6px var(--lush-lime)`,
              animation: "heroPulse 2s ease-in-out infinite",
            }} />
            <span style={{
              fontSize: "14px", fontWeight: 600, color: theme === "light" ? "white" : "var(--lush-lime)",
              letterSpacing: "0.08em", textTransform: "uppercase",
            }}>
              Offline Ready
            </span>
          </div>

          {/* Headline */}
          <h2 style={{
            fontSize: "clamp(1.75rem, 3vw, 2.4rem)",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            margin: 0,
            color: "var(--text-primary)",
          }}>
            Study anywhere,{" "}
            <span style={{
              background: "linear-gradient(90deg, var(--lush-lime), var(--vibrant-cyan))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              anytime
            </span>
          </h2>

          {/* Body copy */}
          <div style={{
            display: "flex", flexDirection: "column", gap: "16px",
            fontSize: "17px", lineHeight: "1.75",
            color: "var(--text-secondary)",
          }}>
            <p style={{ margin: 0 }}>
              This platform is designed to work offline, so you can study and test your knowledge even without an internet connection. Whether you're on the go, traveling, or in areas with unreliable internet, you've got full access to all modules, weeks, questions, and assessments.
            </p>
            <p style={{ margin: 0 }}>
              <strong style={{ color: "var(--text-primary)" }}>Exception:</strong> Videos and podcasts require an internet connection and won't be available offline. When you reconnect, simply refresh the page to access the latest updates and new content.
            </p>
          </div>

          {/* Features list */}
          <div style={{
            display: "flex", flexDirection: "column", gap: "12px",
            marginTop: "8px",
          }}>
            {[
              "Full access to all modules and assessments offline",
              "Progress saved and synced when you reconnect",
              "Videos and podcasts require internet connection"
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
      </div>
    </section>
  );
}
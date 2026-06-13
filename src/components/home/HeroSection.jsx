import { useNavigate } from "react-router-dom";
import { ArrowRightIcon, CheckCircleIcon } from "../moduleMeta";

/**
 * HeroSection
 * Top hero with mesh background, responsive image frame,
 * floating stat badge, headline, body copy, and CTAs.
 */
export default function HeroSection({ theme, totalWeeks }) {
  const navigate = useNavigate();

  return (
    <section style={{
      position: "relative",
      minHeight: "80vh",
      display: "flex",
      alignItems: "center",
      overflow: "hidden",
      padding: "0",
    }}>

      {/* Dark mesh background — Bolt-inspired */}
      <div style={{
        position: "absolute", inset: 0,
        background: `
          radial-gradient(ellipse 70% 80% at 65% 50%, rgba(0,191,255,0.07) 0%, transparent 60%),
          radial-gradient(ellipse 50% 60% at 20% 30%, rgba(244,169,0,0.05) 0%, transparent 55%),
          radial-gradient(ellipse 60% 50% at 80% 80%, rgba(118,209,61,0.04) 0%, transparent 50%)
        `,
        zIndex: 0,
      }} />

      {/* Diagonal separator line — subtle */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(105deg, rgba(var(--bg-primary-rgb),0) 48%, rgba(var(--border-color-rgb),0.08) 50%, rgba(var(--bg-primary-rgb),0) 52%)",
        zIndex: 0,
        pointerEvents: "none",
      }} />

      {/* Content grid */}
      <div className="hero-grid">

        {/* LEFT — image */}
        <div style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>

          {/* Glowing orb behind image */}
          <div className="home-image-orb home-image-orb--hero" />

          {/* Image frame */}
          <div className="home-image-frame home-image-frame--hero">
            <img
              src="/images/Assessment_Stack.png"
              alt="Student Assessment Platform"
              onError={e => {
                e.target.style.display = "none";
                e.target.parentElement.style.background = `
                  linear-gradient(135deg,
                    rgba(var(--bg-card-rgb),0.9),
                    rgba(0,191,255,0.06)
                  )
                `;
                const placeholder = document.createElement("div");
                placeholder.className = "home-image-placeholder";
                placeholder.innerHTML = `
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none"
                    stroke="rgba(0,191,255,0.5)" stroke-width="1.5"
                    stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                  </svg>
                  <span>Practice. Progress. Perform.</span>
                `;
                e.target.parentElement.appendChild(placeholder);
              }}
            />

            {/* Shimmer overlay */}
            <div className="home-image-shimmer" style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 50%, rgba(0,191,255,0.03) 100%)",
            }} />
          </div>

          {/* Floating stat badge */}
          <div style={{
            position: "absolute", bottom: "16px", right: "0",
            background: "rgba(var(--bg-card-rgb), 0.9)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(var(--border-color-rgb), 0.4)",
            borderRadius: "12px",
            padding: "12px 18px",
            display: "flex", alignItems: "center", gap: "10px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
          }}>
            <span style={{ color: "var(--lush-lime)" }}><CheckCircleIcon /></span>
            <div>
              <div style={{ fontSize: "16px", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1 }}>
                {totalWeeks}+
              </div>
              <div style={{ fontSize: "11px", color: "var(--text-secondary)", marginTop: "2px" }}>
                Practice assessments
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — text */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

          {/* Eyebrow */}
          {(() => {
            const accentColor = theme === "light" ? "var(--sunset-orange)" : "var(--vibrant-cyan)";
            const accentRgb = theme === "light" ? "255,127,36" : "0,191,255";
            return (
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: theme === "light" ? "rgba(255,127,36,1)" : `rgba(${accentRgb},0.08)`,
                border: theme === "light" ? "none" : `1px solid rgba(${accentRgb},0.2)`,
                borderRadius: "999px",
                padding: "6px 16px",
                width: "fit-content",
              }}>
                <div style={{
                  width: "6px", height: "6px", borderRadius: "50%",
                  background: accentColor,
                  boxShadow: `0 0 6px ${accentColor}`,
                  animation: "heroPulse 2s ease-in-out infinite",
                }} />
                <span style={{
                  fontSize: "14px", fontWeight: 600, color: theme === "light" ? "white" : accentColor,
                  letterSpacing: "0.08em", textTransform: "uppercase",
                }}>
                  Built for Eduvos students
                </span>
              </div>
            );
          })()}

          {/* Headline */}
          <div>
            <h1 style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              margin: 0,
              color: "var(--text-primary)",
            }}>
              The practice{" "}
              <span style={{
                background: "linear-gradient(90deg, var(--vibrant-cyan), var(--lush-lime))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                you've been asking for
              </span>
              {" "}is finally here.
            </h1>
          </div>

          {/* Body copy */}
          <div style={{
            display: "flex", flexDirection: "column", gap: "18px",
            fontSize: "18px", lineHeight: "1.75",
            color: "var(--text-secondary)",
            maxWidth: "520px",
          }}>
            <p style={{ margin: 0 }}>
              We know how frustrating it's been to ask for past assessment papers and be told <em style={{ color: "var(--text-primary)", fontStyle: "normal" }}>"no."</em> Not because Eduvos doesn't care, but because their system currently has limits — papers repeat, and the risk of unfair advantage is real. But we also know what it feels like to want to prepare properly, to test yourself against something real, and to feel ready when the moment comes.
            </p>
            <p style={{ margin: 0 }}>
              That's why this resource exists. Every week, we release practice assessments designed to <em style={{ color: "var(--text-primary)", fontStyle: "normal" }}>mirror the challenge of the originals</em> — same intensity, same depth — without compromising the integrity of the exams themselves. Think of them as your training ground.
            </p>
              <p style={{ margin: 0, fontWeight: 600, color: "var(--text-primary)", fontSize: "18px" }}>
              Use it, abuse it, make it yours.
            </p>
          </div>

          {/* CTA buttons */}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "4px" }}>
            <button
              className="button solid"
              onClick={() => navigate("/modules")}
              style={{
                background: "var(--accent-primary)",
                padding: "14px 28px",
                fontSize: "18px",
                fontWeight: 600,
                borderRadius: "12px",
                display: "flex", alignItems: "center", gap: "8px",
              }}
            >
              Browse Modules <ArrowRightIcon size={16} />
            </button>
            <button
              className="button"
              onClick={() => navigate("/progress")}
              style={{ padding: "14px 24px", fontSize: "18px", borderRadius: "12px" }}
            >
              My Progress
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
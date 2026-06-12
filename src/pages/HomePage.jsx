import { useNavigate } from "react-router-dom";
import { useContext, useState, useRef } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { modules } from "../data/modules";
import { weeks as weekRegistry } from "../data/weeks";
import { MODULE_META, DEFAULT_META, ArrowRightIcon, CheckCircleIcon, GridIcon } from "../components/moduleMeta";
import FeaturedModulesCarousel from "../components/FeaturedModulesCarousel";

/* Module accent colours & icons */
// Helper: derive week count from canonical registry
const getWeekCount = (moduleId) => {
  const w = weekRegistry[moduleId];
  return Array.isArray(w) ? w.length : 7; // fallback to 7 for older modules
};

/* ── Sub-components ───────────────────────────────────────── */

function ModuleFeatureCard({ module, onClick }) {
  const meta = MODULE_META[module.id] || DEFAULT_META;
  const weekCount = getWeekCount(module.id);

  return (
    <div
      onClick={onClick}
      style={{
        background: "rgba(var(--bg-card-rgb), 0.65)",
        backdropFilter: "blur(16px) saturate(160%)",
        WebkitBackdropFilter: "blur(16px) saturate(160%)",
        borderRadius: "16px",
        padding: "28px 24px",
        cursor: "pointer",
        transition: "transform 0.22s cubic-bezier(0.4,0,0.2,1), background 0.2s ease, border-color 0.2s ease, box-shadow 0.22s ease",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.background = "rgba(var(--bg-card-rgb), 0.88)";
        e.currentTarget.style.boxShadow = `0 12px 40px rgba(${meta.accentRgb}, 0.12)`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.background = "rgba(var(--bg-card-rgb), 0.65)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Subtle corner glow */}
      <div style={{
        position: "absolute", top: 0, right: 0,
        width: "120px", height: "120px",
        background: `radial-gradient(circle at top right, rgba(${meta.accentRgb}, 0.08), transparent 70%)`,
        pointerEvents: "none",
      }} />

      {/* Icon chip */}
      <div style={{
        width: "48px", height: "48px",
        borderRadius: "12px",
        background: `rgba(${meta.accentRgb}, 0.12)`,
        border: `1px solid rgba(${meta.accentRgb}, 0.25)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: meta.accent,
      }}>
        {meta.icon}
      </div>

      {/* Text */}
      <div style={{ flex: 1 }}>
        <div style={{
          fontSize: "13px", fontWeight: 700, letterSpacing: "0.14em",
          textTransform: "uppercase", color: meta.accent, marginBottom: "6px",
          fontFamily: "inherit",
        }}>
          {module.id}
        </div>
        <h3 style={{
          margin: "0 0 8px", fontSize: "1.15rem", fontWeight: 700,
          color: "var(--text-primary)", lineHeight: 1.3,
        }}>
          {meta.label || module.name}
        </h3>
        <p style={{
          margin: 0, fontSize: "16px", color: "var(--text-secondary)",
          lineHeight: "1.6",
        }}>
          {module.description || `${weekCount} weekly practice assessment${weekCount !== 1 ? "s" : ""} covering ${meta.label || module.name}.`}
        </p>
      </div>

      {/* Footer */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
        paddingTop: "12px",
        borderTop: "1px solid rgba(var(--border-color-rgb), 0.3)",
      }}>
        <span style={{
          fontSize: "14px", color: "var(--text-secondary)",
          background: "rgba(var(--bg-secondary-rgb), 0.6)",
          border: "1px solid rgba(var(--border-color-rgb), 0.3)",
          borderRadius: "999px", padding: "3px 10px",
        }}>
          {weekCount} week{weekCount !== 1 ? "s" : ""}
        </span>
        <span style={{
          fontSize: "15px", fontWeight: 600, color: meta.accent,
          display: "flex", alignItems: "center", gap: "5px",
        }}>
          Start <ArrowRightIcon size={14} />
        </span>
      </div>
    </div>
  );
}

/* ── Podcast Play/Pause Button ───────────────────────────────── */

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

/* ── HomePage ─────────────────────────────────────────────── */

export default function HomePage() {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const totalWeeks = modules.reduce((sum, m) => sum + getWeekCount(m.id), 0);

  return (
    <div style={{ overflowX: "hidden" }}>

      {/* ════════════════════════════════════════════════════
          HERO — image left, text right, dark mesh background
          ════════════════════════════════════════════════════ */}
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
        <div style={{
          position: "relative", zIndex: 1,
          width: "100%", maxWidth: "1280px",
          margin: "0 auto",
          padding: "56px 40px 64px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "64px",
          alignItems: "center",
        }}
          className="hero-grid"
        >

          {/* LEFT — image */}
          <div style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>

            {/* Glowing orb behind image */}
            <div style={{
              position: "absolute",
              width: "380px", height: "380px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(0,191,255,0.12) 0%, transparent 70%)",
              filter: "blur(40px)",
              animation: "heroPulse 6s ease-in-out infinite",
            }} />

            {/* Image frame */}
            <div style={{
              position: "relative",
              width: "100%",
              maxWidth: "460px",
              borderRadius: "20px",
              overflow: "hidden",
              border: "1px solid rgba(var(--border-color-rgb), 0.3)",
              boxShadow: "0 24px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(0,191,255,0.08)",
              background: "rgba(var(--bg-card-rgb), 0.6)",
              backdropFilter: "blur(10px)",
              height: "520px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <img
                src="/images/Assessment_Stack.png"
                alt="Student Assessment Platform"
                style={{
                  width: "100%", height: "100%",
                  objectFit: "contain",
                  display: "block",
                }}
                onError={e => {
                  e.target.style.display = "none";
                  e.target.parentElement.style.background = `
                    linear-gradient(135deg,
                      rgba(var(--bg-card-rgb),0.9),
                      rgba(0,191,255,0.06)
                    )
                  `;
                  const placeholder = document.createElement("div");
                  placeholder.style.cssText = `
                    display:flex;flex-direction:column;align-items:center;
                    justify-content:center;gap:12px;padding:40px;text-align:center;
                  `;
                  placeholder.innerHTML = `
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none"
                      stroke="rgba(0,191,255,0.5)" stroke-width="1.5"
                      stroke-linecap="round" stroke-linejoin="round">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                      <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                    </svg>
                    <span style="font-size:13px;color:rgba(var(--text-secondary),0.6);font-weight:500;letter-spacing:0.1em;text-transform:uppercase;">
                      Practice. Progress. Perform.
                    </span>
                  `;
                  e.target.parentElement.appendChild(placeholder);
                }}
              />

              {/* Shimmer overlay */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 50%, rgba(0,191,255,0.03) 100%)",
                pointerEvents: "none",
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

      {/* ════════════════════════════════════════════════════
          PODCAST SECTION — Prepare with Audio
          ════════════════════════════════════════════════════ */}
      <section style={{
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "60px 40px 80px",
        position: "relative", zIndex: 1,
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "64px",
          alignItems: "center",
        }}>
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
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
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
            <div style={{
              position: "absolute",
              width: "340px", height: "340px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(244,169,0,0.15) 0%, transparent 70%)",
              filter: "blur(40px)",
              animation: "heroPulse 6s ease-in-out infinite",
            }} />

            {/* Image frame */}
            <div style={{
              position: "relative",
              width: "100%",
              maxWidth: "420px",
              borderRadius: "20px",
              overflow: "hidden",
              border: "1px solid rgba(var(--border-color-rgb), 0.3)",
              boxShadow: "0 24px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(244,169,0,0.08)",
              background: "rgba(var(--bg-card-rgb), 0.6)",
              backdropFilter: "blur(10px)",
              height: "480px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <img
                src="/images/Listen_Before_You_Start.png"
                alt="Listen Before You Start"
                style={{
                  width: "100%", height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
                onError={e => {
                  e.target.style.display = "none";
                  e.target.parentElement.style.background = `
                    linear-gradient(135deg,
                      rgba(var(--bg-card-rgb),0.9),
                      rgba(244,169,0,0.06)
                    )
                  `;
                  const placeholder = document.createElement("div");
                  placeholder.style.cssText = `
                    display:flex;flex-direction:column;align-items:center;
                    justify-content:center;gap:12px;padding:40px;text-align:center;
                  `;
                  placeholder.innerHTML = `
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none"
                      stroke="rgba(244,169,0,0.5)" stroke-width="1.5"
                      stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="1"/>
                      <path d="M12 8a4 4 0 0 1 4 4"/>
                      <path d="M12 4a8 8 0 0 1 8 8"/>
                    </svg>
                    <span style="font-size:13px;color:rgba(var(--text-secondary),0.6);font-weight:500;letter-spacing:0.1em;text-transform:uppercase;">
                      Listen & Learn
                    </span>
                  `;
                  e.target.parentElement.appendChild(placeholder);
                }}
              />

              {/* Shimmer overlay */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 50%, rgba(244,169,0,0.03) 100%)",
                pointerEvents: "none",
              }} />
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          VIDEO SECTION
          ════════════════════════════════════════════════════ */}
      <section style={{
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "56px 40px 72px",
        position: "relative", zIndex: 1,
      }}>
        {/* Two-column video grid */}
        <div className="video-grid" style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "24px",
        }}>
          {/* Video 1 — 16:9 responsive wrapper */}
          <div style={{
            position: "relative",
            paddingTop: "56.25%",
            width: "100%",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 32px 80px rgba(0,0,0,0.35)",
          }}>
            <iframe
              src="https://www.youtube.com/embed/QW6y-F4Pr3Q"
              title="Student Assessment Platform — Introduction"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{
                position: "absolute",
                top: 0, left: 0,
                width: "100%", height: "100%",
                border: "none",
              }}
            />
          </div>
          
          {/* Video 2 — 16:9 responsive wrapper */}
          <div style={{
            position: "relative",
            paddingTop: "56.25%",
            width: "100%",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 32px 80px rgba(0,0,0,0.35)",
          }}>
            <iframe
              src="https://www.youtube.com/embed/qo7SuzQMi8w"
              title="Student Assessment Platform — Walkthrough"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{
                position: "absolute",
                top: 0, left: 0,
                width: "100%", height: "100%",
                border: "none",
              }}
            />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          FEATURED MODULES
          ════════════════════════════════════════════════════ */}
      <section style={{
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "40px 40px 80px",
        position: "relative", zIndex: 1,
      }}>

        {/* Section header */}
        <div style={{
          display: "flex", alignItems: "flex-end",
          justifyContent: "space-between",
          marginBottom: "32px",
          gap: "16px",
          flexWrap: "wrap",
        }}>
          <div>
            <div style={{
              fontSize: "13px", fontWeight: 700, letterSpacing: "0.18em",
              textTransform: "uppercase", color: "var(--accent-primary)",
              marginBottom: "8px",
            }}>
              Available now
            </div>
            <h2 style={{
              margin: 0, fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
              fontWeight: 700, letterSpacing: "-0.02em",
              color: "var(--text-primary)",
            }}>
              Featured Modules
            </h2>
            <p style={{
              margin: "6px 0 0", fontSize: "17px",
              color: "var(--text-secondary)",
            }}>
              Weekly practice assessments across {modules.length} IT discipline{modules.length !== 1 ? "s" : ""} ({totalWeeks} weeks total).
            </p>
          </div>

          <button
            className="button"
            onClick={() => navigate("/modules")}
            style={{
              display: "flex", alignItems: "center", gap: "8px",
              padding: "11px 20px", fontSize: "14px", fontWeight: 600,
              flexShrink: 0,
            }}
          >
            <GridIcon />
            See all modules
          </button>
        </div>

        {/* Animated Carousel */}
        <FeaturedModulesCarousel modules={modules} />
      </section>

      {/* ════════════════════════════════════════════════════
          OFFLINE ACCESS & FLEXIBILITY
          ════════════════════════════════════════════════════ */}
      <section style={{
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "60px 40px 80px",
        position: "relative", zIndex: 1,
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "64px",
          alignItems: "center",
        }}>
          {/* LEFT — Image */}
          <div style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            {/* Glowing orb behind image */}
            <div style={{
              position: "absolute",
              width: "340px", height: "340px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(118,209,61,0.15) 0%, transparent 70%)",
              filter: "blur(40px)",
              animation: "heroPulse 6s ease-in-out infinite",
            }} />

            {/* Image with fallback placeholder */}
            <div style={{
              position: "relative",
              width: "100%",
              maxWidth: "400px",
              borderRadius: "20px",
              overflow: "hidden",
              border: "1px solid rgba(var(--border-color-rgb), 0.3)",
              boxShadow: "0 24px 80px rgba(0,0,0,0.35)",
              background: "linear-gradient(135deg, rgba(118,209,61,0.08), rgba(var(--bg-card-rgb),0.6))",
              height: "420px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <img
                src="/images/OfflineFunctionality.png"
                alt="Offline Functionality"
                style={{
                  width: "100%", height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
                onError={e => {
                  e.target.style.display = "none";
                  const placeholder = document.createElement("div");
                  placeholder.style.cssText = `
                    text-align:center;display:flex;flex-direction:column;
                    align-items:center;gap:20px;
                  `;
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
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 50%, rgba(118,209,61,0.03) 100%)",
                pointerEvents: "none",
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

      {/* ════════════════════════════════════════════════════
          FOOTER
          ════════════════════════════════════════════════════ */}
      <footer style={{
        width: "100%",
        background: "transparent",
        padding: "28px 20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "var(--text-secondary)",
        fontSize: "14px",
      }}>
        <span style={{ fontWeight: 700, marginRight: "8px", color: theme === "light" ? "var(--sunset-orange)" : "var(--vibrant-cyan)" }}>
          Student Assessment Platform
        </span>
        <span>© {new Date().getFullYear()} All rights reserved</span>
      </footer>

      {/* Animation keyframes */}
      <style>{`
        @keyframes heroPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
            padding: 56px 24px 48px !important;
          }
        }
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
            padding: 56px 24px 48px !important;
          }
          .video-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .hero-grid {
            padding: 56px 20px 44px !important;
          }
        }
      `}</style>
    </div>
  );
}
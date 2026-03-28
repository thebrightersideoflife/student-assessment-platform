import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { modules } from "../data/modules";

/* ── Icon set ─────────────────────────────────────────────── */
const ArrowRightIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);
const GridIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
    <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
  </svg>
);
const ShieldIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);
const DatabaseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3"/>
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
  </svg>
);
const CodeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"/>
    <polyline points="8 6 2 12 8 18"/>
  </svg>
);
const CheckCircleIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

/* Module accent colours & icons */
const MODULE_META = {
  ITNSA: { icon: <ShieldIcon />,   accent: "var(--vibrant-cyan)",  accentRgb: "0,191,255",  label: "Network Security" },
  ITDSA: { icon: <DatabaseIcon />, accent: "var(--golden-amber)",  accentRgb: "244,169,0",  label: "Database Systems" },
  ITJVA: { icon: <CodeIcon />,     accent: "var(--lush-lime)",     accentRgb: "118,209,61", label: "Java Programming" },
};
const DEFAULT_META = { icon: <CodeIcon />, accent: "var(--accent-primary)", accentRgb: "42,92,167", label: "" };

/* ── Sub-components ───────────────────────────────────────── */

function ModuleFeatureCard({ module, onClick }) {
  const meta = MODULE_META[module.id] || DEFAULT_META;

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
          {module.description || `7 weekly practice assessments covering ${meta.label || module.name}.`}
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
          7 weeks
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

/* ── HomePage ─────────────────────────────────────────────── */

export default function HomePage() {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const featured = modules.slice(0, 3);

  return (
    <div style={{ overflowX: "hidden" }}>

      {/* ════════════════════════════════════════════════════
          HERO — image left, text right, dark mesh background
          ════════════════════════════════════════════════════ */}
      <section style={{
        position: "relative",
        minHeight: "92vh",
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
          padding: "80px 40px 80px",
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
                  /* Fallback: show a typographic placeholder */
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
                  {modules.length * 7}+
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
                  background: `rgba(${accentRgb},0.08)`,
                  border: `1px solid rgba(${accentRgb},0.2)`,
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
                    fontSize: "14px", fontWeight: 600, color: accentColor,
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

        {/* Bottom fade into page */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: "120px",
          background: "linear-gradient(to bottom, transparent, var(--bg-primary))",
          pointerEvents: "none", zIndex: 1,
        }} />
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
              Weekly practice assessments across {modules.length} IT disciplines.
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

        {/* Module cards grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
        }}>
          {featured.map(module => (
            <ModuleFeatureCard
              key={module.id}
              module={module}
              onClick={() => navigate(`/module/${module.id}`)}
            />
          ))}
        </div>

        {/* See more indicator */}
        {modules.length > 3 && (
          <div style={{
            marginTop: "28px",
            textAlign: "center",
          }}>
            <button
              className="button"
              onClick={() => navigate("/modules")}
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "11px 24px", fontSize: "14px",
              }}
            >
              + {modules.length - 3} more module{modules.length - 3 !== 1 ? "s" : ""} available
              <ArrowRightIcon size={14} />
            </button>
          </div>
        )}
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
        <span>All rights reserved</span>
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
            padding: 80px 24px 60px !important;
          }
        }
        @media (max-width: 480px) {
          .hero-grid {
            padding: 70px 20px 50px !important;
          }
        }
      `}</style>
    </div>
  );
}
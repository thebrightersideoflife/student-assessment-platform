import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

/* ── Icons ───────────────────────────────────────────────── */

const WhatsAppIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
  </svg>
);

const CoffeeIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 8h1a4 4 0 0 1 0 8h-1"/>
    <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/>
    <line x1="6" y1="2" x2="6" y2="4"/>
    <line x1="10" y1="2" x2="10" y2="4"/>
    <line x1="14" y1="2" x2="14" y2="4"/>
  </svg>
);

const EditIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);

const LightbulbIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="9" y1="18" x2="15" y2="18"/>
    <line x1="10" y1="22" x2="14" y2="22"/>
    <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/>
  </svg>
);

const ShieldIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const HeartIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

/* ── Config ───────────────────────────────────────────────── */

const PHONE_NUMBER = "27794482761";

const WA_MESSAGES = {
  monetary: encodeURIComponent(
    "Hi! I love your work and would like to support the project. This is how much I'm currently willing to contribute: R"
  ),
  correction: encodeURIComponent(
    "Hi! I found some errors in your content. Here is the info:\n\n"
  ),
  idea: encodeURIComponent(
    "Hi! I was thinking about an idea that could improve the platform:\n\n"
  ),
};

const buildWaLink = (type) =>
  `https://wa.me/${PHONE_NUMBER}?text=${WA_MESSAGES[type]}`;

/* ── Support Card Component ───────────────────────────────── */

function SupportCard({ type, icon, accentRgb, accentColor, eyebrow, title, description, buttonLabel }) {
  const handleClick = () => {
    window.open(buildWaLink(type), "_blank", "noopener,noreferrer");
  };

  return (
    <div
      style={{
        background: "rgba(var(--bg-card-rgb), 0.65)",
        backdropFilter: "blur(16px) saturate(160%)",
        WebkitBackdropFilter: "blur(16px) saturate(160%)",
        border: "1px solid rgba(var(--border-color-rgb), 0.4)",
        borderRadius: "18px",
        padding: "32px 28px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        position: "relative",
        overflow: "hidden",
        transition: "transform 0.22s cubic-bezier(0.4,0,0.2,1), box-shadow 0.22s ease, border-color 0.22s ease",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = `0 16px 48px rgba(${accentRgb}, 0.14)`;
        e.currentTarget.style.borderColor = `rgba(${accentRgb}, 0.35)`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.borderColor = "rgba(var(--border-color-rgb), 0.4)";
      }}
    >
      {/* Corner glow */}
      <div style={{
        position: "absolute", top: 0, right: 0,
        width: "160px", height: "160px",
        background: `radial-gradient(circle at top right, rgba(${accentRgb}, 0.09), transparent 70%)`,
        pointerEvents: "none",
      }} />

      {/* Icon chip */}
      <div style={{
        width: "52px", height: "52px",
        borderRadius: "14px",
        background: `rgba(${accentRgb}, 0.12)`,
        border: `1px solid rgba(${accentRgb}, 0.25)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: accentColor,
        flexShrink: 0,
      }}>
        {icon}
      </div>

      {/* Text */}
      <div style={{ flex: 1 }}>
        <div style={{
          fontSize: "11px", fontWeight: 700, letterSpacing: "0.16em",
          textTransform: "uppercase", color: accentColor, marginBottom: "6px",
        }}>
          {eyebrow}
        </div>
        <h3 style={{
          margin: "0 0 10px", fontSize: "1.15rem", fontWeight: 700,
          color: "var(--text-primary)", lineHeight: 1.3,
        }}>
          {title}
        </h3>
        <p style={{
          margin: 0, fontSize: "15px", color: "var(--text-secondary)",
          lineHeight: "1.65",
        }}>
          {description}
        </p>
      </div>

      {/* CTA */}
      <button
        onClick={handleClick}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "9px",
          padding: "13px 20px",
          borderRadius: "12px",
          border: "none",
          background: `rgba(${accentRgb}, 0.14)`,
          color: accentColor,
          fontSize: "15px",
          fontWeight: 600,
          cursor: "pointer",
          transition: "background 0.18s ease, transform 0.15s ease",
          width: "100%",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = `rgba(${accentRgb}, 0.24)`;
          e.currentTarget.style.transform = "translateY(-1px)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = `rgba(${accentRgb}, 0.14)`;
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        <WhatsAppIcon size={18} />
        {buttonLabel}
      </button>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────── */

export default function SupportPage() {
  const { theme } = useContext(ThemeContext);

  const accentPrimary = theme === "light" ? "42,92,167" : "244,169,0";
  const accentPrimaryColor = theme === "light" ? "var(--royal-blue)" : "var(--golden-amber)";

  return (
    <div style={{ overflowX: "hidden" }}>

      {/* ════════════════════════════════════════════════════
          HERO
          ════════════════════════════════════════════════════ */}
      <section style={{
        position: "relative",
        padding: "42px 40px 64px",
        maxWidth: "860px",
        margin: "0 auto",
        textAlign: "center",
      }}>
        {/* Ambient glow */}
        <div style={{
          position: "absolute", top: "0", left: "50%",
          transform: "translateX(-50%)",
          width: "600px", height: "320px",
          background: `radial-gradient(ellipse 70% 60% at 50% 10%, rgba(${accentPrimary}, 0.10), transparent 80%)`,
          pointerEvents: "none", zIndex: 0,
        }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          {/* Eyebrow */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "rgba(var(--bg-card-rgb), 0.7)",
            border: "1px solid rgba(var(--border-color-rgb), 0.4)",
            borderRadius: "999px",
            padding: "6px 16px",
            marginBottom: "28px",
            fontSize: "13px", fontWeight: 600,
            color: accentPrimaryColor,
            letterSpacing: "0.06em",
          }}>
            <HeartIcon size={13} />
            Support The Brighter Side
          </div>

          <h1 style={{
            margin: "0 0 20px",
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: "var(--text-primary)",
            lineHeight: 1.15,
          }}>
            Help Keep This Resource{" "}
            <span style={{ color: accentPrimaryColor }}>Alive & Growing</span>
          </h1>

          <p style={{
            margin: "0 auto 16px",
            maxWidth: "790px",
            fontSize: "17px",
            color: "var(--text-primary)",
            lineHeight: 1.7,
          }}>            
            "The Brighter Side" believes students deserve a fair shot at preparing properly. To that end, we create (and constantly update) each week's practice assessment so it mirrors the originals, and while we're not compensated for it, we're committed to keeping it going.
          </p>

          <p style={{
            margin: "0 auto",
            maxWidth: "620px",
            fontSize: "17px",
            color: "var(--text-secondary)",
            lineHeight: 1.7,
          }}>
            If it's helped you feel
            more confident, sharpened your skills, or eased the stress of preparation —
            consider giving back. Even a small gesture goes a long way.
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          SUPPORT CARDS
          ════════════════════════════════════════════════════ */}
      <section style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "0 40px 80px",
        position: "relative", zIndex: 1,
      }}>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
        }}
          className="support-cards-grid"
        >
          <SupportCard
            type="monetary"
            icon={<CoffeeIcon />}
            accentRgb="244,169,0"
            accentColor="var(--golden-amber)"
            eyebrow="Monetary Support"
            title="Buy Me a Coffee"
            description="Put a smile on our faces. Your support directly helps us dedicate more time to refining questions, explanations, and the overall student experience."
            buttonLabel="Buy Me a Coffee"
          />

          <SupportCard
            type="correction"
            icon={<EditIcon />}
            accentRgb="0,191,255"
            accentColor="var(--vibrant-cyan)"
            eyebrow="Content Quality"
            title="Report a Correction"
            description="Spotted a mistake? That's incredibly valuable — your feedback directly improves the accuracy of questions and explanations for every student."
            buttonLabel="Report a Correction"
          />

          <SupportCard
            type="idea"
            icon={<LightbulbIcon />}
            accentRgb="118,209,61"
            accentColor="var(--lush-lime)"
            eyebrow="Feature Ideas"
            title="Suggest an Improvement"
            description="Got a new feature idea or a better way to explain something? I'd genuinely love to hear it. Your perspective shapes where this platform goes next."
            buttonLabel="Suggest an Idea"
          />
        </div>

        {/* Footer note */}
        <p style={{
          textAlign: "center",
          marginTop: "36px",
          fontSize: "14px",
          color: "var(--text-secondary)",
          opacity: 0.7,
        }}>
          Every message helps improve the quality of questions, explanations, and student experience.
        </p>
      </section>

      {/* ════════════════════════════════════════════════════
          SECURITY DISCLAIMER
          ════════════════════════════════════════════════════ */}
      <section style={{
        maxWidth: "680px",
        margin: "0 auto",
        padding: "0 40px 80px",
        position: "relative", zIndex: 1,
      }}>
        <div style={{
          background: "rgba(var(--bg-card-rgb), 0.5)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(var(--border-color-rgb), 0.35)",
          borderRadius: "14px",
          padding: "20px 24px",
          display: "flex",
          alignItems: "flex-start",
          gap: "14px",
        }}>
          <div style={{
            color: "var(--text-secondary)",
            flexShrink: 0,
            marginTop: "2px",
          }}>
            <ShieldIcon size={16} />
          </div>
          <p style={{
            margin: 0,
            fontSize: "13.5px",
            color: "var(--text-secondary)",
            lineHeight: "1.65",
          }}>
            <strong style={{ color: "var(--text-primary)", fontWeight: 600 }}>Your safety matters.</strong>{" "}
            We will never ask for your password or card details. All communication regarding
            support happens securely and directly via WhatsApp. No third-party processors involved.
          </p>
        </div>
      </section>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .support-cards-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 480px) {
          section {
            padding-left: 20px !important;
            padding-right: 20px !important;
          }
        }
      `}</style>
    </div>
  );
}
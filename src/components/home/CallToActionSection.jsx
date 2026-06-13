import { useNavigate } from "react-router-dom";
import { ArrowRightIcon } from "../moduleMeta";

/**
 * CallToActionSection
 * Closing section — a fanned collage of platform screenshots
 * with a centered "Get Started" CTA. On hover, the cards blur
 * and dim slightly so focus shifts to the button.
 */
export default function CallToActionSection({ theme }) {
  const navigate = useNavigate();

  const cards = [
    {
      src: "/images/Assessment_Cover_DBSystems.png",
      alt: "Database Systems weekly assessment cover",
      className: "cta-card cta-card--1",
    },
    {
      src: "/images/Progress_Report.png",
      alt: "Student progress report",
      className: "cta-card cta-card--2",
    },
    {
      src: "/images/Certificate_Passed.png",
      alt: "Assessment passed certificate",
      className: "cta-card cta-card--3",
    },
    {
      src: "/images/Assessment_Cover_NetworkSecurity.png",
      alt: "Network Security weekly assessment cover",
      className: "cta-card cta-card--4",
    },
  ];

  return (
    <section style={{
      maxWidth: "1280px",
      margin: "0 auto",
      padding: "40px 40px 100px",
      position: "relative", zIndex: 1,
    }}>
      <div className="cta-collage">

        {/* Glow behind the fan */}
        <div className="cta-glow" />

        {/* Fanned cards */}
        <div className="cta-cards">
          {cards.map((card) => (
            <div className={card.className} key={card.src}>
              <img
                src={card.src}
                alt={card.alt}
                onError={e => {
                  e.target.style.display = "none";
                  e.target.parentElement.style.background =
                    "linear-gradient(135deg, rgba(var(--bg-card-rgb),0.9), rgba(0,191,255,0.08))";
                }}
              />
            </div>
          ))}
        </div>

        {/* Overlay + CTA */}
        <div className="cta-overlay">
          <div className="cta-overlay-content">
            <span className="cta-eyebrow" style={{
              color: theme === "light" ? "var(--sunset-orange)" : "var(--vibrant-cyan)",
            }}>
              Ready when you are
            </span>
            <h2 className="cta-heading">
              Your next assessment is one click away
            </h2>
            <p className="cta-subtext">
              Pick a module, start with Week 1, and track your progress as you go.
            </p>
            <button
              className="button solid cta-button"
              onClick={() => navigate("/modules")}
              style={{
                marginTop: "8px",
                padding: "16px 36px",
                fontSize: "18px",
                fontWeight: 700,
                borderRadius: "14px",
                display: "flex", alignItems: "center", gap: "10px",
              }}
            >
              Get Started <ArrowRightIcon size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Styles for the collage */}
      <style>{`
        .cta-collage {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 520px;
          border-radius: 24px;
          overflow: hidden;
          isolation: isolate;
          padding: 60px 0 90px;
        }

        .cta-glow {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 70% at 50% 50%, rgba(0,191,255,0.08) 0%, transparent 70%),
            radial-gradient(ellipse 40% 50% at 75% 30%, rgba(244,169,0,0.06) 0%, transparent 70%);
          z-index: 0;
        }

        .cta-cards {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1;
          transition: filter 0.4s ease, opacity 0.4s ease;
          /* Inset slightly so blur doesn't create a hard edge against
             the collage boundary */
          padding: 40px;
        }

        .cta-collage:hover .cta-cards {
          filter: blur(6px);
          opacity: 0.45;
        }

        .cta-card {
          position: absolute;
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid rgba(var(--border-color-rgb), 0.4);
          box-shadow: 0 16px 40px rgba(0,0,0,0.3);
          background: rgba(var(--bg-card-rgb), 0.6);
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }

        .cta-card img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Wide assessment covers */
        .cta-card--1,
        .cta-card--4 {
          width: 340px;
          aspect-ratio: 1126 / 727;
        }

        /* Near-square report cards */
        .cta-card--2,
        .cta-card--3 {
          width: 230px;
          aspect-ratio: 1 / 1.1;
        }

        /* Fanned arrangement */
        .cta-card--1 {
          transform: translate(-230px, 10px) rotate(-9deg);
          z-index: 1;
        }
        .cta-card--2 {
          transform: translate(70px, -70px) rotate(6deg);
          z-index: 2;
        }
        .cta-card--3 {
          transform: translate(-60px, 60px) rotate(-4deg);
          z-index: 3;
        }
        .cta-card--4 {
          transform: translate(250px, 60px) rotate(8deg);
          z-index: 1;
        }

        .cta-collage:hover .cta-card--1 {
          transform: translate(-260px, 0px) rotate(-12deg);
        }
        .cta-collage:hover .cta-card--2 {
          transform: translate(80px, -85px) rotate(8deg);
        }
        .cta-collage:hover .cta-card--3 {
          transform: translate(-70px, 75px) rotate(-6deg);
        }
        .cta-collage:hover .cta-card--4 {
          transform: translate(280px, 70px) rotate(11deg);
        }

        /* Overlay with the Get Started CTA */
        .cta-overlay {
          position: absolute;
          inset: 0;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .cta-collage:hover .cta-overlay,
        .cta-collage:focus-within .cta-overlay {
          opacity: 1;
          pointer-events: auto;
        }

        .cta-overlay-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 16px;
          align-items: center;
          padding: 60px 70px;
          max-width: 720px;
          background: rgba(var(--bg-primary-rgb), 0.55);
          backdrop-filter: blur(2px);
          -webkit-backdrop-filter: blur(2px);
          -webkit-mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 100%);
          mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 100%);
        }

        .cta-eyebrow {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .cta-heading {
          margin: 0;
          font-size: clamp(1.75rem, 4vw, 2.75rem);
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -0.03em;
          color: var(--text-primary);
          text-align: center;
          max-width: 600px;
          text-shadow: 0 2px 24px rgba(var(--bg-primary-rgb), 0.6);
        }

        .cta-subtext {
          margin: 0;
          font-size: 17px;
          font-weight: 500;
          color: var(--text-primary);
          opacity: 0.85;
          text-align: center;
          max-width: 440px;
          line-height: 1.6;
        }

        .cta-button {
          transform: translateY(8px);
          transition: transform 0.4s ease, filter 0.18s ease, background 0.18s ease;
        }

        .cta-collage:hover .cta-button,
        .cta-collage:focus-within .cta-button {
          transform: translateY(0);
        }

        /* ── Tablet ─────────────────────────────────────── */
        @media (max-width: 1024px) {
          .cta-collage {
            min-height: 460px;
          }
          .cta-card--1, .cta-card--4 {
            width: 260px;
          }
          .cta-card--2, .cta-card--3 {
            width: 180px;
          }
          .cta-card--1 { transform: translate(-150px, 10px) rotate(-9deg); }
          .cta-card--2 { transform: translate(50px, -60px) rotate(6deg); }
          .cta-card--3 { transform: translate(-40px, 70px) rotate(-4deg); }
          .cta-card--4 { transform: translate(170px, 50px) rotate(8deg); }
        }

        /* ── Mobile: collapse the fan, always show CTA ───── */
        @media (max-width: 768px) {
          .cta-collage {
            min-height: 380px;
            padding: 40px 0;
          }

          .cta-cards {
            filter: blur(4px);
            opacity: 0.35;
            padding: 24px;
          }

          .cta-card--1, .cta-card--4 {
            width: 170px;
          }
          .cta-card--2, .cta-card--3 {
            width: 120px;
          }

          .cta-card--1 { transform: translate(-90px, -30px) rotate(-8deg); }
          .cta-card--2 { transform: translate(40px, -70px) rotate(6deg); }
          .cta-card--3 { transform: translate(-30px, 70px) rotate(-4deg); }
          .cta-card--4 { transform: translate(95px, 50px) rotate(8deg); }

          /* CTA always visible on touch devices */
          .cta-overlay {
            opacity: 1;
            pointer-events: auto;
          }

          .cta-button {
            transform: translateY(0);
          }

          .cta-overlay-content {
            padding: 36px 24px;
            max-width: 100%;
          }

          .cta-subtext {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .cta-collage {
            min-height: 320px;
            border-radius: 16px;
          }

          .cta-card--1, .cta-card--4 {
            width: 130px;
          }
          .cta-card--2, .cta-card--3 {
            width: 95px;
          }

          .cta-card--1 { transform: translate(-65px, -25px) rotate(-8deg); }
          .cta-card--2 { transform: translate(30px, -60px) rotate(6deg); }
          .cta-card--3 { transform: translate(-25px, 60px) rotate(-4deg); }
          .cta-card--4 { transform: translate(70px, 40px) rotate(8deg); }

          .cta-button {
            padding: 14px 28px !important;
            font-size: 16px !important;
          }
        }
      `}</style>
    </section>
  );
}
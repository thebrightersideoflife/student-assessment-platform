import { useNavigate } from "react-router-dom";
import { GridIcon } from "../moduleMeta";
import FeaturedModulesCarousel from "../FeaturedModulesCarousel";

/**
 * FeaturedModulesSection
 * Section header + animated carousel of available modules.
 */
export default function FeaturedModulesSection({ modules, totalWeeks }) {
  const navigate = useNavigate();

  return (
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
  );
}
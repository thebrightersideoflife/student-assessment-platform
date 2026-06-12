import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { MODULE_META, DEFAULT_META } from "./moduleMeta";
import { weeks as weekRegistry } from "../data/weeks";

/**
 * FeaturedModulesCarousel
 * 
 * Animated dual-carousel component with:
 * - Top row sliding left
 * - Bottom row sliding right (opposite direction)
 * - Fade edges effect
 * - ~4 cards visible at once
 * - Theme-aware card design
 * - Hover border highlight
 * - Click navigation to first week
 */

export default function FeaturedModulesCarousel({ modules }) {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const [hoveredModule, setHoveredModule] = useState(null);

  // Split modules into top and bottom rows (alternating)
  const topModules = modules.filter((_, idx) => idx % 2 === 0);
  const bottomModules = modules.filter((_, idx) => idx % 2 === 1);

  // Create infinite scroll by duplicating the arrays
  const topDuplicated = [...topModules, ...topModules];
  const bottomDuplicated = [...bottomModules, ...bottomModules];

  const handleCardClick = (module) => {
    // Check if module has weeks
    const moduleWeeks = weekRegistry[module.id];
    if (moduleWeeks && moduleWeeks.length > 0) {
      // Navigate to the first week of the module
      navigate(`/module/${module.id}/week/1`);
    } else {
      // Navigate to roadmap for modules without weeks
      navigate(`/module/${module.id}/roadmap`);
    }
  };

  return (
    <div style={{
      position: "relative",
      width: "100%",
      overflow: "hidden",
      paddingBottom: "20px",
    }}>
      {/* CSS animations */}
      <style>{`
        @keyframes slideLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 12px)); }
        }

        @keyframes slideRight {
          0% { transform: translateX(calc(-50% - 12px)); }
          100% { transform: translateX(0); }
        }

        .carousel-container {
          animation-duration: 80s;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        .carousel-top {
          animation-name: slideLeft;
        }

        .carousel-bottom {
          animation-name: slideRight;
        }
      `}</style>

      {/* Top Carousel - slides left */}
      <div
        style={{
          position: "relative",
          marginBottom: "30px",
          overflow: "hidden",
        }}
      >
        {/* Fade gradient left */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "120px",
            background: `linear-gradient(to right, var(--bg-primary), transparent)`,
            zIndex: 10,
            pointerEvents: "none",
          }}
        />

        {/* Fade gradient right */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "120px",
            background: `linear-gradient(to left, var(--bg-primary), transparent)`,
            zIndex: 10,
            pointerEvents: "none",
          }}
        />

        {/* Carousel content */}
        <div
          className="carousel-container carousel-top"
          style={{
            display: "flex",
            gap: "24px",
            width: "fit-content",
            paddingLeft: "20px",
            paddingRight: "20px",
          }}
        >
          {topDuplicated.map((module, idx) => (
            <CarouselCard
              key={`top-${idx}`}
              module={module}
              onClick={() => handleCardClick(module)}
              isHovered={hoveredModule === module.id}
              onHover={(id) => setHoveredModule(id)}
              theme={theme}
            />
          ))}
        </div>
      </div>

      {/* Bottom Carousel - slides right */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Fade gradient left */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "120px",
            background: `linear-gradient(to right, var(--bg-primary), transparent)`,
            zIndex: 10,
            pointerEvents: "none",
          }}
        />

        {/* Fade gradient right */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "120px",
            background: `linear-gradient(to left, var(--bg-primary), transparent)`,
            zIndex: 10,
            pointerEvents: "none",
          }}
        />

        {/* Carousel content */}
        <div
          className="carousel-container carousel-bottom"
          style={{
            display: "flex",
            gap: "24px",
            width: "fit-content",
            paddingLeft: "20px",
            paddingRight: "20px",
          }}
        >
          {bottomDuplicated.map((module, idx) => (
            <CarouselCard
              key={`bottom-${idx}`}
              module={module}
              onClick={() => handleCardClick(module)}
              isHovered={hoveredModule === module.id}
              onHover={(id) => setHoveredModule(id)}
              theme={theme}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Individual carousel card component
 */
function CarouselCard({
  module,
  onClick,
  isHovered,
  onHover,
  theme,
}) {
  const meta = MODULE_META[module.id] || DEFAULT_META;
  const moduleWeeks = weekRegistry[module.id];
  const firstWeek = moduleWeeks && moduleWeeks.length > 0 ? moduleWeeks[0] : null;

  return (
    <div
      style={{
        flexShrink: 0,
        width: "240px",
        cursor: "pointer",
      }}
      onMouseEnter={() => onHover(module.id)}
      onMouseLeave={() => onHover(null)}
      onClick={onClick}
    >
      {/* Card - Icon and Module Code on top right, Week below */}
      <div
        style={{
          background: "rgba(var(--bg-card-rgb), 0.65)",
          backdropFilter: "blur(16px) saturate(160%)",
          WebkitBackdropFilter: "blur(16px) saturate(160%)",
          borderRadius: "16px",
          padding: "24px",
          border: `2px solid ${
            isHovered
              ? meta.accent
              : `rgba(var(--border-color-rgb), 0.2)`
          }`,
          transition: "all 0.3s ease",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          position: "relative",
          overflow: "visible",
          minHeight: "260px",
        }}
      >
        {/* Subtle corner glow */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "120px",
            height: "120px",
            background: `radial-gradient(circle at top right, rgba(${meta.accentRgb}, 0.08), transparent 70%)`,
            pointerEvents: "none",
          }}
        />

        {/* Top section: Icon (top right) and Module Code */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "12px",
          }}
        >
          {/* Module Code / Heading */}
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: meta.accent,
                fontFamily: "inherit",
              }}
            >
              {module.id}
            </div>
          </div>

          {/* Icon on top right */}
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: `rgba(${meta.accentRgb}, 0.12)`,
              border: `1px solid rgba(${meta.accentRgb}, 0.25)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: meta.accent,
              flexShrink: 0,
            }}
          >
            {meta.icon}
          </div>
        </div>

        {/* Center placeholder image */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            minHeight: "60px",
            opacity: 0.6,
          }}
        >
          <svg
            width="50"
            height="50"
            viewBox="0 0 24 24"
            fill="none"
            stroke={meta.accent}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ opacity: 0.5 }}
          >
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c3 3 9 3 12 0v-5" />
          </svg>
        </div>

        {/* Week indicator */}
        {firstWeek && (
          <div
            style={{
              fontSize: "14px",
              fontWeight: 600,
              color: meta.accent,
              background: `rgba(${meta.accentRgb}, 0.08)`,
              border: `1px solid rgba(${meta.accentRgb}, 0.2)`,
              borderRadius: "8px",
              padding: "8px 12px",
              width: "fit-content",
              marginTop: "auto",
            }}
          >
            {firstWeek.name}
          </div>
        )}
      </div>

      {/* Below card: Full title and description */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <h3
          style={{
            margin: 0,
            fontSize: "16px",
            fontWeight: 700,
            color: "var(--text-primary)",
            lineHeight: 1.3,
          }}
        >
          {meta.label || module.name}
        </h3>
        <p
          style={{
            margin: 0,
            fontSize: "14px",
            color: "var(--text-secondary)",
            lineHeight: "1.5",
          }}
        >
          {module.description}
        </p>
      </div>
    </div>
  );
}

import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { modules } from "../data/modules";
import { weeks as weekRegistry } from "../data/weeks";
import { questions } from "../data/questions";
import { extractGameTerms } from "../utils/gameUtils";
import { MODULE_META, DEFAULT_META } from "../components/moduleMeta";
import ScrollReveal from "../components/ScrollReveal";
import StudyGamesHero from "../components/games/StudyGamesHero";

export default function StudyGamesHubPage() {
  const navigate = useNavigate();
  const [moduleQuery, setModuleQuery] = useState("");

  const allActiveModules = useMemo(() => {
    return modules.filter(mod => {
      const allWeeks = weekRegistry[mod.id] || [];
      return allWeeks.some(w => {
          const q = questions[mod.id]?.[w.id] || [];
          return extractGameTerms(q).length >= 5;
      });
    });
  }, []);

  const filteredModules = useMemo(() => {
    const query = moduleQuery.trim().toLowerCase();
    if (!query) return allActiveModules;

    return allActiveModules.filter(mod => {
      const haystack = `${mod.id} ${mod.name} ${mod.description || ""}`.toLowerCase();
      return haystack.includes(query);
    });
  }, [allActiveModules, moduleQuery]);

  return (
    <div className="container" style={{ paddingBottom: '80px', overflowX: 'hidden', maxWidth: '1100px' }}>
      <StudyGamesHero />

      {/* Search Bar - Same design as Typing Practice */}
      <div style={{ maxWidth: "800px", margin: "0 auto 40px", padding: "0 10px" }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "16px 18px",
          borderRadius: "20px",
          background: "linear-gradient(135deg, rgba(var(--bg-card-rgb), 0.94), rgba(var(--bg-secondary-rgb), 0.82))",
          border: "1px solid rgba(var(--game-accent-rgb), 0.2)",
          boxShadow: "0 16px 40px rgba(0,0,0,0.08)",
          backdropFilter: "blur(14px) saturate(150%)",
          WebkitBackdropFilter: "blur(14px) saturate(150%)",
        }}>
          <div style={{
            width: "46px",
            height: "46px",
            borderRadius: "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            background: "rgba(var(--game-accent-rgb), 0.12)",
            color: "var(--game-accent)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3)",
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <input
              type="text"
              value={moduleQuery}
              onChange={(e) => setModuleQuery(e.target.value)}
              placeholder="Search games by module name, code, or topic"
              style={{
                width: "100%",
                border: "none",
                outline: "none",
                background: "transparent",
                color: "var(--text-primary)",
                fontSize: "15px",
                fontWeight: 600,
                fontFamily: "Inter, system-ui, sans-serif",
                padding: 0,
              }}
            />
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", marginTop: "10px", flexWrap: "wrap" }}>
          <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
            {moduleQuery.trim()
              ? `Found ${filteredModules.length} match${filteredModules.length === 1 ? "" : "es"}`
              : `Browse all ${allActiveModules.length} modules with available games`}
          </span>
          <span style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--game-accent)" }}>
            {moduleQuery.trim() ? "Filtered view" : "Quick search"}
          </span>
        </div>
      </div>

      {filteredModules.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '20px',
          padding: '0 10px'
        }}>
          {filteredModules.map((mod, index) => {
          const meta = MODULE_META[mod.id] || DEFAULT_META;
          return (
            <ScrollReveal key={mod.id} direction="bottom" delay={index * 50}>
              <div
                onClick={() => navigate(`/games/${mod.id}`)}
                style={{
                  background: 'rgba(var(--bg-card-rgb), 0.65)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(var(--border-color-rgb), 0.4)',
                  borderRadius: '18px',
                  padding: '32px 28px',
                  cursor: 'pointer',
                  transition: 'transform 0.22s cubic-bezier(0.4,0,0.2,1), border-color 0.22s, box-shadow 0.22s',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = `rgba(${meta.accentRgb}, 0.4)`;
                  e.currentTarget.style.boxShadow = `0 16px 48px rgba(${meta.accentRgb}, 0.14)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(var(--border-color-rgb), 0.4)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Accent glow */}
                <div style={{
                    position: 'absolute', top: 0, right: 0,
                    width: '160px', height: '160px',
                    background: `radial-gradient(circle at top right, rgba(${meta.accentRgb}, 0.09), transparent 70%)`,
                    pointerEvents: 'none'
                }} />

                <div style={{
                  width: '52px', height: '52px', borderRadius: '14px',
                  background: `rgba(${meta.accentRgb}, 0.12)`,
                  border: `1px solid rgba(${meta.accentRgb}, 0.25)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: meta.accent, flexShrink: 0
                }}>
                  {meta.icon}
                </div>

                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: '0 0 10px', fontSize: '1.15rem', fontWeight: 700 }}>{mod.name}</h3>
                  <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.65' }}>
                    {mod.description}
                  </p>
                </div>

                <div style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  fontSize: '13px', fontWeight: 700, color: meta.accent
                }}>
                  Start Playing
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
      ) : (
        <div style={{
          padding: "60px 20px",
          borderRadius: "24px",
          border: "1px dashed rgba(var(--border-color-rgb), 0.45)",
          background: "rgba(var(--bg-card-rgb), 0.4)",
          textAlign: "center",
          maxWidth: "600px",
          margin: "0 auto"
        }}>
          <div style={{
            width: "64px", height: "64px", borderRadius: "20px",
            background: "rgba(var(--game-accent-rgb), 0.1)",
            color: "var(--game-accent)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 20px"
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
          </div>
          <h3 style={{ margin: "0 0 8px" }}>No games found</h3>
          <p style={{ color: "var(--text-secondary)", margin: 0 }}>
            We couldn't find any modules matching "<strong>{moduleQuery}</strong>". Try a different search term or browse all available games.
          </p>
          <button
            onClick={() => setModuleQuery("")}
            style={{
              marginTop: "24px",
              padding: "10px 20px",
              borderRadius: "12px",
              background: "var(--game-accent)",
              color: "white",
              border: "none",
              fontWeight: 700,
              cursor: "pointer"
            }}
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
}

// src/pages/StudyGamesHubPage.jsx
import { useNavigate } from "react-router-dom";
import { modules } from "../data/modules";
import { weeks as weekRegistry } from "../data/weeks";
import { questions } from "../data/questions";
import { extractGameTerms } from "../utils/gameUtils";
import { MODULE_META, DEFAULT_META } from "../components/moduleMeta";
import ScrollReveal from "../components/ScrollReveal";
import StudyGamesHero from "../components/games/StudyGamesHero";

export default function StudyGamesHubPage() {
  const navigate = useNavigate();

  const activeModules = modules.filter(mod => {
    const allWeeks = weekRegistry[mod.id] || [];
    return allWeeks.some(w => {
        const q = questions[mod.id]?.[w.id] || [];
        return extractGameTerms(q).length >= 5;
    });
  });

  return (
    <div className="container" style={{ paddingBottom: '80px', overflowX: 'hidden', maxWidth: '1100px' }}>
      <StudyGamesHero />

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '20px',
        padding: '0 10px'
      }}>
        {activeModules.map((mod, index) => {
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
    </div>
  );
}

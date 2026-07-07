import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Zap } from "lucide-react";
import { MODULE_META, DEFAULT_META } from "./moduleMeta";
import { weeks as weekRegistry } from "../data/weeks";
import { TYPING_MODE_IDS, getCompetitionUnlockState } from "../utils/typingStorage";

/* ── Keyboard icon ──────────────────────────────────────────── */

function KeyboardIcon({ size = 22 }) {
  return (
    <svg
      width={size} height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <line x1="6"  y1="10" x2="6"  y2="10" strokeWidth="2.5" />
      <line x1="9"  y1="10" x2="9"  y2="10" strokeWidth="2.5" />
      <line x1="12" y1="10" x2="12" y2="10" strokeWidth="2.5" />
      <line x1="15" y1="10" x2="15" y2="10" strokeWidth="2.5" />
      <line x1="18" y1="10" x2="18" y2="10" strokeWidth="2.5" />
      <line x1="6"  y1="13" x2="6"  y2="13" strokeWidth="2.5" />
      <line x1="9"  y1="13" x2="9"  y2="13" strokeWidth="2.5" />
      <line x1="12" y1="13" x2="12" y2="13" strokeWidth="2.5" />
      <line x1="15" y1="13" x2="15" y2="13" strokeWidth="2.5" />
      <line x1="18" y1="13" x2="18" y2="13" strokeWidth="2.5" />
      <line x1="8"  y1="16" x2="16" y2="16" strokeWidth="2" />
    </svg>
  );
}

/* ── Individual module card ─────────────────────────────────── */

function ModuleCard({ module, loading, onSelect }) {
  const navigate     = useNavigate();
  const meta        = MODULE_META[module.id] || DEFAULT_META;
  const moduleWeeks = weekRegistry[module.id] ?? [];
  const [hovered, setHovered] = useState(false);

  // Competition unlocks per (module, difficulty), not per module alone —
  // check every difficulty and surface the CTA if ANY of them has crossed
  // the threshold. Picks the difficulty with the most attempts recorded as
  // the one to route into if there's a choice, so the CTA lands on the
  // ghosts with the most history behind them.
  const unlockedModes = TYPING_MODE_IDS
    .map((m) => ({ mode: m, state: getCompetitionUnlockState(module.id, m) }))
    .filter((entry) => entry.state.unlocked)
    .sort((a, b) => b.state.attemptsRecorded - a.state.attemptsRecorded);
  const competeMode = unlockedModes[0]?.mode ?? null;

  return (
    <div
      style={{
        background:           "rgba(var(--bg-card-rgb), 0.65)",
        backdropFilter:       "blur(16px) saturate(160%)",
        WebkitBackdropFilter: "blur(16px) saturate(160%)",
        border:               hovered
                                ? `1px solid rgba(${meta.accentRgb}, 0.4)`
                                : "1px solid rgba(var(--border-color-rgb), 0.4)",
        borderRadius:  "18px",
        padding:       "32px 28px",
        display:       "flex",
        flexDirection: "column",
        gap:           "20px",
        position:      "relative",
        overflow:      "hidden",
        cursor:        loading ? "not-allowed" : "pointer",
        opacity:       loading ? 0.6 : 1,
        transform:     hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow:     hovered ? `0 16px 48px rgba(${meta.accentRgb}, 0.14)` : "none",
        transition:    "transform 0.22s cubic-bezier(0.4,0,0.2,1), box-shadow 0.22s ease, border-color 0.22s ease",
      }}
      onMouseEnter={() => !loading && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => !loading && onSelect(module)}
    >
      {/* Corner glow */}
      <div style={{
        position:      "absolute",
        top: 0, right: 0,
        width:         "160px",
        height:        "160px",
        background:    `radial-gradient(circle at top right, rgba(${meta.accentRgb}, 0.09), transparent 70%)`,
        pointerEvents: "none",
      }} />

      {/* Icon chip */}
      <div style={{
        width:          "52px",
        height:         "52px",
        borderRadius:   "14px",
        background:     `rgba(${meta.accentRgb}, 0.12)`,
        border:         `1px solid rgba(${meta.accentRgb}, 0.25)`,
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        color:          meta.accent,
        flexShrink:     0,
      }}>
        <KeyboardIcon size={22} />
      </div>

      {/* Text block */}
      <div style={{ flex: 1 }}>
        <div style={{
          fontSize:      "11px",
          fontWeight:    700,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color:         meta.accent,
          marginBottom:  "6px",
        }}>
          {module.id}
        </div>
        <h3 style={{
          margin:     "0 0 10px",
          fontSize:   "1.15rem",
          fontWeight: 700,
          color:      "var(--text-primary)",
          lineHeight: 1.3,
        }}>
          {meta.label || module.name}
        </h3>
        <p style={{
          margin:     0,
          fontSize:   "15px",
          color:      "var(--text-secondary)",
          lineHeight: "1.65",
        }}>
          {module.description}
        </p>
      </div>

      {/* Week count + Compete CTA */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
        <span style={{
          fontSize:      "13px",
          fontWeight:    600,
          color:         meta.accent,
          background:    `rgba(${meta.accentRgb}, 0.08)`,
          border:        `1px solid rgba(${meta.accentRgb}, 0.2)`,
          borderRadius:  "8px",
          padding:       "5px 11px",
        }}>
          {moduleWeeks.length} week{moduleWeeks.length !== 1 ? "s" : ""}
        </span>
        {competeMode && (
          <button
            type="button"
            className="compete-spark-btn"
            onClick={(e) => {
              // Stop the card's own onClick (which navigates to the module
              // overview) from also firing — this button has its own,
              // more specific destination.
              e.stopPropagation();
              navigate(`/typing/competition/${module.id}/${competeMode}`);
            }}
          >
            <Zap size={13} strokeWidth={2.5} className="compete-spark-icon" />
            Compete
          </button>
        )}
      </div>
    </div>
  );
}

/* ── Grid ───────────────────────────────────────────────────── */

export default function TypingModuleGrid({ modules, loading, onSelect }) {
  const available = modules.filter(mod => {
    const w = weekRegistry[mod.id];
    return w && w.length > 0;
  });

  return (
    <>
      {available.length > 0 ? (
        <div
          className="typing-module-grid"
          style={{
            display:             "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap:                 "20px",
          }}
        >
          {available.map(mod => (
            <ModuleCard
              key={mod.id}
              module={mod}
              loading={loading}
              onSelect={onSelect}
            />
          ))}
        </div>
      ) : (
        <div
          style={{
            padding: "28px",
            borderRadius: "20px",
            border: "1px dashed rgba(var(--border-color-rgb), 0.45)",
            background: "rgba(var(--bg-card-rgb), 0.6)",
            textAlign: "center",
            color: "var(--text-secondary)",
          }}
        >
          No modules match that search yet. Try a different term or clear the filter.
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .typing-module-grid {
            grid-template-columns: 1fr !important;
          }
        }

        /* ── Compete button — minimal card surface, thin electric border
           that continuously travels around it rather than a solid color
           block. Cyan → amber, both already in the palette, so it reads
           as "electric" without introducing a new hue. ──────────────── */
        @property --spark-angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }

        .compete-spark-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 13px;
          border-radius: 9px;
          border: none;
          background: var(--bg-card);
          color: var(--text-primary);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.02em;
          cursor: pointer;
          isolation: isolate;
          transition: transform 0.16s ease;
        }
        .compete-spark-btn:hover { transform: translateY(-1px); }

        .compete-spark-btn::before {
          content: "";
          position: absolute;
          inset: -1px;
          z-index: -1;
          border-radius: inherit;
          padding: 1.4px;
          background: conic-gradient(
            from var(--spark-angle),
            transparent 0%,
            var(--vibrant-cyan) 10%,
            transparent 24%,
            transparent 76%,
            var(--golden-amber) 90%,
            transparent 100%
          );
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          animation: compete-spark-spin 2.6s linear infinite;
        }
        .compete-spark-btn:hover::before { filter: brightness(1.4); }

        .compete-spark-icon { color: var(--vibrant-cyan); flex-shrink: 0; }

        @keyframes compete-spark-spin {
          to { --spark-angle: 360deg; }
        }
      `}</style>
    </>
  );
}
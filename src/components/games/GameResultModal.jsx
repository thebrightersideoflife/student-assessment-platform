// src/components/games/GameResultModal.jsx
import { useRef, useEffect } from "react";
import { X, Zap, Flame, TrendingUp, Clock, MousePointer2 } from "lucide-react";

const STAT_ICONS = {
    zap: <Zap size={16} />,
    flame: <Flame size={16} />,
    trend: <TrendingUp size={16} />,
    clock: <Clock size={16} />,
    target: <MousePointer2 size={16} />
};

export default function GameResultModal({
  open,
  onClose,
  title,
  subtitle,
  score,
  maxScore,
  stats = [],
  primaryAction,
  secondaryAction,
  accentColor = "var(--lush-lime)",
  accentRgb = "118, 209, 61",
  icon = "🏆"
}) {
  const cardRef = useRef(null);

  const percentage = maxScore ? Math.max(0, Math.round((score / maxScore) * 100)) : null;

  useEffect(() => {
    if (!open) return;
    cardRef.current?.focus();
    const onKey = (e) => { if (e.key === "Escape") onClose?.(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="grm-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onClose?.(); }}
      style={{ "--grm-accent": accentColor, "--grm-accent-rgb": accentRgb }}
    >
      <div
        ref={cardRef}
        className="grm-card"
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
      >
        <button className="grm-close" onClick={onClose} aria-label="Close">
          <X size={18} strokeWidth={2.5} />
        </button>

        <div className="grm-main-layout">
          <div className="grm-info-section">
            <div className="grm-hero">
                <div className="grm-hero-glow" />
                <div className="grm-hero-icon">{icon}</div>
            </div>
            <h2 className="grm-title">{title}</h2>
            <p className="grm-subtitle">{subtitle}</p>
          </div>

          <div className="grm-divider" />

          <div className="grm-data-section">
            {score !== undefined && (
                <div className="grm-score-container">
                    <div className="grm-score-row" style={{ marginBottom: '8px' }}>
                        <div className="grm-score-label">Final Accuracy</div>
                        <div className="grm-score-value">
                            {percentage !== null ? `${percentage}%` : score}
                        </div>
                    </div>
                    {maxScore !== undefined && (
                        <div style={{
                            fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)',
                            opacity: 0.8, letterSpacing: '0.05em', textAlign: 'center'
                        }}>
                            POINTS EARNED: <span style={{ color: 'var(--text-primary)' }}>{score}</span> / {maxScore}
                        </div>
                    )}
                </div>
            )}

            {stats.length > 0 && (
              <div className="grm-stats" style={{ gridTemplateColumns: `repeat(${stats.length}, 1fr)` }}>
                {stats.map((s, i) => (
                  <div className="grm-stat" key={i}>
                    <span className="grm-stat-icon" style={{ color: accentColor }}>
                        {STAT_ICONS[s.icon] || STAT_ICONS.zap}
                    </span>
                    <span className="grm-stat-value">{s.value}</span>
                    <span className="grm-stat-label">{s.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grm-actions">
          {secondaryAction && (
            <button className="grm-btn grm-btn-secondary" onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </button>
          )}
          {primaryAction && (
            <button className="grm-btn grm-btn-primary" onClick={primaryAction.onClick}>
              {primaryAction.label}
            </button>
          )}
        </div>
      </div>

      <style>{`
        .grm-overlay {
          position: fixed; inset: 0; z-index: 1200;
          background: rgba(0, 0, 0, 0.45);
          backdrop-filter: blur(8px);
          display: flex; align-items: center; justify-content: center;
          padding: 20px;
          animation: grm-overlay-fade 0.25s ease;
        }
        @keyframes grm-overlay-fade { from { opacity: 0; } to { opacity: 1; } }

        .grm-card {
          position: relative;
          width: 100%; max-width: 680px;
          background: var(--bg-card);
          border: 1px solid rgba(var(--grm-accent-rgb), 0.4);
          border-radius: 32px;
          padding: 40px;
          box-shadow: 0 24px 60px rgba(0,0,0,0.3), 0 0 40px rgba(var(--grm-accent-rgb), 0.15);
          animation: grm-card-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .grm-main-layout {
          display: flex;
          align-items: stretch;
          gap: 40px;
          margin-bottom: 10px;
        }

        .grm-info-section {
          flex: 1.2;
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: left;
        }

        .grm-divider {
          width: 1px;
          align-self: stretch;
          background: linear-gradient(to bottom, transparent, rgba(var(--border-color-rgb), 0.4), transparent);
        }

        .grm-data-section {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        @keyframes grm-card-in {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .grm-close {
          position: absolute; top: 20px; right: 20px;
          width: 32px; height: 32px; border-radius: 10px;
          border: none; background: transparent; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          color: var(--text-secondary); opacity: 0.6;
          transition: all 0.2s ease;
        }
        .grm-close:hover { opacity: 1; background: rgba(var(--border-color-rgb), 0.3); transform: rotate(90deg); }

        .grm-hero {
          position: relative; height: 90px;
          display: flex; align-items: center; justify-content: flex-start;
          margin-bottom: 20px;
        }
        .grm-hero-glow {
          position: absolute; width: 120px; height: 120px; left: -15px;
          background: radial-gradient(circle, rgba(var(--grm-accent-rgb), 0.3) 0%, transparent 72%);
          filter: blur(18px);
          animation: grm-glow-pulse 2s ease-in-out infinite;
        }
        @keyframes grm-glow-pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50%       { transform: scale(1.1); opacity: 1; }
        }
        .grm-hero-icon {
          position: relative; font-size: 64px; line-height: 1;
          filter: drop-shadow(0 0 20px rgba(var(--grm-accent-rgb), 0.45));
          animation: grm-icon-bounce 1.8s ease-in-out infinite;
        }
        @keyframes grm-icon-bounce {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          20%       { transform: translateY(-8px) rotate(-3deg); }
          40%       { transform: translateY(0) rotate(0deg); }
          60%       { transform: translateY(-4px) rotate(3deg); }
          80%       { transform: translateY(0) rotate(-1deg); }
        }

        .grm-title {
          margin: 0 0 8px; font-size: 32px; font-weight: 800; color: var(--text-primary);
          letter-spacing: -0.02em; line-height: 1.1;
        }
        .grm-subtitle {
          margin: 0; font-size: 15px; color: var(--text-secondary); line-height: 1.6;
        }

        .grm-score-container {
            margin-bottom: 24px;
        }
        .grm-score-row {
            background: rgba(var(--grm-accent-rgb), 0.1);
            border: 1px solid rgba(var(--grm-accent-rgb), 0.3);
            border-radius: 20px; padding: 24px 20px;
            text-align: center;
        }
        .grm-score-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: var(--text-secondary); margin-bottom: 6px; }
        .grm-score-value { font-size: 48px; font-weight: 900; color: var(--text-primary); line-height: 1; letter-spacing: -0.02em; }

        .grm-stats {
          display: grid; gap: 12px;
          padding-top: 24px; border-top: 1px solid rgba(var(--border-color-rgb), 0.3);
        }
        .grm-stat { display: flex; flex-direction: column; gap: 4px; align-items: center; }
        .grm-stat-icon { display: flex; align-items: center; justify-content: center; opacity: 0.8; }
        .grm-stat-value { font-size: 18px; font-weight: 800; color: var(--text-primary); line-height: 1.1; }
        .grm-stat-label { font-size: 9px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.08em; }

        .grm-actions { display: flex; gap: 12px; margin-top: 20px; border-top: 1px solid rgba(var(--border-color-rgb), 0.2); padding-top: 24px; }

        @media (max-width: 640px) {
          .grm-card { padding: 32px 24px; }
          .grm-main-layout { flex-direction: column; gap: 32px; text-align: center; }
          .grm-info-section { text-align: center; align-items: center; }
          .grm-hero { justify-content: center; }
          .grm-hero-glow { left: 50%; margin-left: -60px; }
          .grm-divider { height: 1px; width: 100%; background: linear-gradient(to right, transparent, rgba(var(--border-color-rgb), 0.4), transparent); }
          .grm-title { font-size: 26px; }
          .grm-actions { flex-direction: column-reverse; }
        }
        .grm-btn {
          flex: 1; padding: 14px 20px; border-radius: 14px;
          font-size: 15px; font-weight: 800; cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          border: none;
        }
        .grm-btn:hover { transform: translateY(-2px); filter: brightness(1.1); }
        .grm-btn:active { transform: translateY(0); }

        .grm-btn-primary { background: var(--grm-accent); color: white; }
        .grm-btn-secondary { background: rgba(var(--bg-secondary-rgb), 0.7); border: 1px solid rgba(var(--border-color-rgb), 0.4); color: var(--text-primary); }
        .grm-btn-secondary:hover { background: rgba(var(--bg-secondary-rgb), 1); }

        @media (prefers-reduced-motion: reduce) {
          .grm-overlay, .grm-card, .grm-hero-glow, .grm-hero-icon, .grm-btn { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

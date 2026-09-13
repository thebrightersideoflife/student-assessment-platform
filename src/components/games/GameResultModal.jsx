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
  stats = [],
  primaryAction,
  secondaryAction,
  accentColor = "var(--lush-lime)",
  accentRgb = "118, 209, 61",
  icon = "🏆"
}) {
  const cardRef = useRef(null);

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

        <div className="grm-hero">
            <div className="grm-hero-glow" />
            <div className="grm-hero-icon">{icon}</div>
        </div>

        <h2 className="grm-title">{title}</h2>
        <p className="grm-subtitle">{subtitle}</p>

        {score !== undefined && (
            <div className="grm-score-row">
                <div className="grm-score-label">Final Score</div>
                <div className="grm-score-value">{score}</div>
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
          width: 100%; max-width: 420px;
          background: var(--bg-card);
          border: 1px solid rgba(var(--grm-accent-rgb), 0.4);
          border-radius: 28px;
          padding: 40px 32px 32px;
          box-shadow: 0 24px 60px rgba(0,0,0,0.3), 0 0 40px rgba(var(--grm-accent-rgb), 0.15);
          animation: grm-card-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          text-align: center;
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
          position: relative; height: 110px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 12px;
        }
        .grm-hero-glow {
          position: absolute; width: 140px; height: 140px;
          background: radial-gradient(circle, rgba(var(--grm-accent-rgb), 0.3) 0%, transparent 72%);
          filter: blur(18px);
          animation: grm-glow-pulse 2s ease-in-out infinite;
        }
        @keyframes grm-glow-pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50%       { transform: scale(1.1); opacity: 1; }
        }
        .grm-hero-icon {
          position: relative; font-size: 72px; line-height: 1;
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
          margin: 0 0 8px; font-size: 28px; font-weight: 800; color: var(--text-primary);
          letter-spacing: -0.02em;
        }
        .grm-subtitle {
          margin: 0 0 28px; font-size: 15px; color: var(--text-secondary); line-height: 1.6;
        }

        .grm-score-row {
            background: rgba(var(--grm-accent-rgb), 0.1);
            border: 1px solid rgba(var(--grm-accent-rgb), 0.3);
            border-radius: 20px; padding: 20px; margin-bottom: 28px;
        }
        .grm-score-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: var(--text-secondary); margin-bottom: 6px; }
        .grm-score-value { font-size: 42px; font-weight: 900; color: var(--text-primary); line-height: 1; letter-spacing: -0.02em; }

        .grm-stats {
          display: grid; gap: 16px;
          padding-top: 24px; border-top: 1px solid rgba(var(--border-color-rgb), 0.45);
        }
        .grm-stat { display: flex; flex-direction: column; gap: 5px; align-items: center; }
        .grm-stat-icon { display: flex; align-items: center; justify-content: center; margin-bottom: 2px; }
        .grm-stat-value { font-size: 20px; font-weight: 800; color: var(--text-primary); line-height: 1.1; }
        .grm-stat-label { font-size: 10px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.08em; }

        .grm-actions { display: flex; gap: 12px; margin-top: 30px; }
        .grm-btn {
          flex: 1; padding: 14px 20px; border-radius: 14px;
          font-size: 15px; font-weight: 800; cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          border: none;
        }
        .grm-btn:hover { transform: translateY(-2px); filter: brightness(1.1); }
        .grm-btn:active { transform: translateY(0); }

        .grm-btn-primary { background: var(--grm-accent); color: white; box-shadow: 0 8px 20px rgba(var(--grm-accent-rgb), 0.3); }
        .grm-btn-secondary { background: rgba(var(--bg-secondary-rgb), 0.7); border: 1px solid rgba(var(--border-color-rgb), 0.4); color: var(--text-primary); }
        .grm-btn-secondary:hover { background: rgba(var(--bg-secondary-rgb), 1); }

        @media (prefers-reduced-motion: reduce) {
          .grm-overlay, .grm-card, .grm-hero-glow, .grm-hero-icon, .grm-btn { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

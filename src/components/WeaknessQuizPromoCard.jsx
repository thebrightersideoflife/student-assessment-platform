import { Sparkles, Target, ArrowRight } from "lucide-react";

export default function WeaknessQuizPromoCard({ onClick, notice, ctaLabel = "Open weakness quiz" }) {
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
      style={{
        position: "relative",
        overflow: "hidden",
        marginBottom: "24px",
        borderRadius: "20px",
        border: "1px solid rgba(var(--border-color-rgb), 0.35)",
        background: "linear-gradient(135deg, rgba(var(--bg-card-rgb), 0.92), rgba(var(--bg-secondary-rgb), 0.78))",
        boxShadow: "0 16px 42px rgba(0, 0, 0, 0.16)",
        backdropFilter: "blur(16px) saturate(160%)",
        WebkitBackdropFilter: "blur(16px) saturate(160%)",
        padding: "20px 22px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "16px",
        flexWrap: "wrap",
        cursor: "pointer",
        transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow = "0 22px 56px rgba(0, 0, 0, 0.24)";
        e.currentTarget.style.borderColor = "rgba(var(--accent-primary-rgb), 0.35)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 16px 42px rgba(0, 0, 0, 0.16)";
        e.currentTarget.style.borderColor = "rgba(var(--border-color-rgb), 0.35)";
      }}
    >
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(120deg, rgba(255,255,255,0.12), rgba(255,255,255,0) 42%, rgba(255,255,255,0.08))",
        pointerEvents: "none",
      }} />

      <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
        <div style={{
          width: "46px",
          height: "46px",
          borderRadius: "14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))",
          boxShadow: "0 10px 24px rgba(90, 120, 255, 0.24)",
          color: "white",
          flexShrink: 0,
        }}>
          <Target size={21} strokeWidth={2.2} />
        </div>

        <div>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "4px 10px",
            borderRadius: "999px",
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "var(--poppy-red)",
            background: "rgba(255,64,64,0.10)",
            border: "1px solid rgba(255,64,64,0.25)",
            marginBottom: "7px",
            boxShadow: "0 0 0 1px rgba(255,255,255,0.10) inset",
          }}>
            <Sparkles size={12} />
            New feature
          </div>
          <div style={{ fontWeight: 800, fontSize: "15px", color: "var(--text-primary)", marginBottom: "3px" }}>
            Weakness quiz
          </div>
          <div style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.5 }}>
            Build a randomized quiz from your weak tags and selected modules, with scenario context included.
          </div>
        </div>
      </div>

      <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
        <span style={{
          fontSize: "13px",
          fontWeight: 700,
          color: "var(--accent-primary)",
          whiteSpace: "nowrap",
        }}>
          {ctaLabel}
        </span>
        <div style={{
          width: "34px",
          height: "34px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(var(--bg-secondary-rgb), 0.75)",
          border: "1px solid rgba(var(--border-color-rgb), 0.4)",
          color: "var(--text-primary)",
        }}>
          <ArrowRight size={16} />
        </div>
      </div>

      {notice && (
        <div style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          marginTop: "10px",
          padding: "8px 10px",
          borderRadius: "10px",
          border: "1px solid rgba(244,169,0,0.28)",
          background: "rgba(244,169,0,0.09)",
          color: "var(--golden-amber)",
          fontSize: "12px",
          lineHeight: 1.5,
        }}>
          {notice}
        </div>
      )}
    </div>
  );
}

export default function TypingModuleSearchBar({ value, onChange, totalModules, visibleModules, accentColor }) {
  return (
    <div style={{ marginBottom: "24px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "16px 18px",
          borderRadius: "20px",
          background: "linear-gradient(135deg, rgba(var(--bg-card-rgb), 0.94), rgba(var(--bg-secondary-rgb), 0.82))",
          border: `1px solid rgba(${accentColor === "var(--royal-blue)" ? "42,92,167" : "244,169,0"}, 0.2)`,
          boxShadow: "0 16px 40px rgba(0,0,0,0.08)",
          backdropFilter: "blur(14px) saturate(150%)",
          WebkitBackdropFilter: "blur(14px) saturate(150%)",
        }}
      >
        <div
          style={{
            width: "46px",
            height: "46px",
            borderRadius: "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            background: `rgba(${accentColor === "var(--royal-blue)" ? "42,92,167" : "244,169,0"}, 0.12)`,
            color: accentColor,
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3)",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </div>

        <div style={{ flex: 1 }}>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search by module, topic, or code"
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
          {value.trim()
            ? `Showing ${visibleModules} of ${totalModules} module${totalModules === 1 ? "" : "s"}`
            : `Browse ${totalModules} module${totalModules === 1 ? "" : "s"} ready for typing practice`}
        </span>
        <span style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: accentColor }}>
          {value.trim() ? "Filtered view" : "Quick find"}
        </span>
      </div>
    </div>
  );
}

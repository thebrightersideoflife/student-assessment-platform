// src/components/typing/TypingModuleSelectStep.jsx
//
// The module-select step of the typing practice flow: search bar, progress
// report CTA, the "coming soon" upload teaser card, and the module grid.
// Pulled out of TypingPracticePage because it's the chunkiest step render
// (pure JSX + a couple of derived values) and has an obvious name/purpose.

import TypingModuleSearchBar from "./TypingModuleSearchBar";
import TypingModuleGrid from "../TypingModuleGrid";

export default function TypingModuleSelectStep({
  loadingModule,
  moduleQuery,
  onModuleQueryChange,
  availableModules,
  filteredModules,
  accentColor,
  hasMadeFirstAttempt,
  onViewProgressReport,
  onSelectModule,
}) {
  return (
    <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 40px 80px", position: "relative", zIndex: 1 }}>
      {loadingModule && (
        <p style={{ color: "var(--text-secondary)", marginBottom: "16px", fontSize: "14px", textAlign: "center" }}>
          Loading module questions…
        </p>
      )}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "20px", marginBottom: "20px", flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: "280px" }}>
          <TypingModuleSearchBar
            value={moduleQuery}
            onChange={onModuleQueryChange}
            totalModules={availableModules.length}
            visibleModules={filteredModules.length}
            accentColor={accentColor}
          />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", marginBottom: "10px", flexWrap: "wrap" }}>
            <div style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
              Your progress report becomes available after your first typing attempt.
            </div>
            <button
              type="button"
              className="button"
              onClick={onViewProgressReport}
              disabled={!hasMadeFirstAttempt}
              style={{
                padding: "10px 16px",
                fontSize: "14px",
                opacity: hasMadeFirstAttempt ? 1 : 0.6,
              }}
            >
              {hasMadeFirstAttempt ? "View progress report" : "Progress report"}
            </button>
          </div>
        </div>
        <div style={{
          width: "min(360px, 100%)",
          padding: "18px 20px",
          borderRadius: "18px",
          background: "linear-gradient(135deg, rgba(42,92,167,0.16), rgba(244,169,0,0.16))",
          border: "1px solid rgba(42,92,167,0.24)",
          boxShadow: "0 18px 45px rgba(0,0,0,0.08)",
          color: "var(--text-primary)",
          fontSize: "15px",
          lineHeight: 1.7,
          position: "relative",
          overflow: "hidden",
          alignSelf: "flex-start",
        }}>
          <div style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(circle at top right, rgba(255,255,255,0.35), transparent 42%)",
            pointerEvents: "none",
          }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ fontSize: "12px", fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: accentColor, marginBottom: "6px" }}>
              Coming soon
            </div>
            <div style={{ fontSize: "16px", fontWeight: 700, marginBottom: "6px" }}>
              Want to type your own content? In just a little:
            </div>
            <div>
              You’ll be able to upload your custom PDF or text and turn your own material into a personalised typing challenge.
            </div>
          </div>
        </div>
      </div>
      <TypingModuleGrid modules={filteredModules} loading={loadingModule} onSelect={onSelectModule} />
    </section>
  );
}
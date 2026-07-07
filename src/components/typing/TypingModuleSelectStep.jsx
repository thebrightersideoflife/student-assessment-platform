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
  accentRgb,
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
            accentRgb={accentRgb}
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
      </div>
      <TypingModuleGrid modules={filteredModules} loading={loadingModule} onSelect={onSelectModule} />
    </section>
  );
}
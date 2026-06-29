// src/components/typing/TypingSetup.jsx
// Duration gate + difficulty mode selection for the typing practice feature.
//
// Flow inside this component:
//   1. User picks a duration (preset or custom)
//   2. User picks a difficulty mode (Beginner / Intermediate / Normal)
//   3. onSelect({ label, seconds, mode }) fires — page proceeds to the test
//
// Mode definitions live in typingExtractor.js (TYPING_MODES) so the labels,
// descriptions, and IDs are defined exactly once. The actual text transformation
// (applyMode) also lives there and is called in TypingPracticePage before the
// passages reach TypingTest — nothing in this file touches the text itself.

import { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { TYPING_MODES } from "../../utils/typingExtractor";

const DURATION_OPTIONS = [
  { label: "30 sec", seconds: 30 },
  { label: "45 sec", seconds: 45 },
  { label: "60 sec", seconds: 60 },
];

// ── ModuleSelectCard (unchanged) ──────────────────────────────────────────────

export function ModuleSelectCard({ module, onClick, loading }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      disabled={loading}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display:              "block",
        width:                "100%",
        textAlign:            "left",
        background:           hovered
          ? "rgba(var(--bg-card-rgb), 0.92)"
          : "rgba(var(--bg-card-rgb), 0.72)",
        border:               hovered
          ? "1px solid rgba(var(--border-color-rgb), 0.8)"
          : "1px solid rgba(var(--border-color-rgb), 0.4)",
        borderRadius:         "14px",
        backdropFilter:       "blur(12px) saturate(160%)",
        WebkitBackdropFilter: "blur(12px) saturate(160%)",
        padding:              "20px 24px",
        cursor:               loading ? "wait" : "pointer",
        transition:           "all 0.18s ease",
        transform:            hovered && !loading ? "translateY(-2px)" : "translateY(0)",
        boxShadow:            hovered ? "0 8px 24px rgba(0,0,0,0.12)" : "0 2px 8px rgba(0,0,0,0.06)",
        marginBottom:         "12px",
        opacity:              loading ? 0.6 : 1,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        <div style={{
          width:        "10px",
          height:       "10px",
          borderRadius: "50%",
          background:   "var(--accent-primary)",
          flexShrink:   0,
          opacity:      hovered ? 1 : 0.5,
          transition:   "opacity 0.18s ease",
        }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: "16px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "4px", letterSpacing: "-0.01em" }}>
            {module.name}
          </div>
          <div style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.5 }}>
            {module.description}
          </div>
        </div>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          style={{
            color:      hovered ? "var(--accent-primary)" : "var(--text-secondary)",
            flexShrink: 0,
            transition: "all 0.18s ease",
            transform:  hovered ? "translateX(3px)" : "translateX(0)",
          }}
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </div>
    </button>
  );
}

// ── Mode card ─────────────────────────────────────────────────────────────────

function ModeCard({ mode, selected, onSelect, accentColor, accentRgb }) {
  const [hovered, setHovered] = useState(false);
  const active = selected || hovered;

  return (
    <button
      onClick={() => onSelect(mode.id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display:              "block",
        width:                "100%",
        textAlign:            "left",
        padding:              "18px 20px",
        borderRadius:         "12px",
        border:               selected
          ? `1px solid rgba(${accentRgb}, 0.6)`
          : hovered
            ? "1px solid rgba(var(--border-color-rgb), 0.7)"
            : "1px solid rgba(var(--border-color-rgb), 0.35)",
        background:           selected
          ? `rgba(${accentRgb}, 0.08)`
          : hovered
            ? "rgba(var(--bg-card-rgb), 0.88)"
            : "rgba(var(--bg-card-rgb), 0.55)",
        backdropFilter:       "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        cursor:               "pointer",
        transition:           "all 0.18s ease",
        transform:            active ? "translateY(-1px)" : "translateY(0)",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
        {/* Selection dot */}
        <div style={{
          width:        "16px",
          height:       "16px",
          borderRadius: "50%",
          border:       selected
            ? `2px solid ${accentColor}`
            : "2px solid rgba(var(--border-color-rgb), 0.5)",
          background:   selected ? accentColor : "transparent",
          flexShrink:   0,
          marginTop:    "3px",
          transition:   "all 0.18s ease",
          display:      "flex",
          alignItems:   "center",
          justifyContent: "center",
        }}>
          {selected && (
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "white" }} />
          )}
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "4px" }}>
            <span style={{
              fontSize:   "15px",
              fontWeight: 700,
              color:      selected ? accentColor : "var(--text-primary)",
              transition: "color 0.18s ease",
            }}>
              {mode.label}
            </span>
            <span style={{
              fontSize:      "11px",
              fontWeight:    600,
              letterSpacing: "0.05em",
              color:         "var(--text-secondary)",
            }}>
              {mode.description}
            </span>
          </div>
          <p style={{
            fontSize:   "13px",
            color:      "var(--text-secondary)",
            margin:     0,
            lineHeight: 1.55,
          }}>
            {mode.detail}
          </p>
        </div>
      </div>
    </button>
  );
}

// ── DurationSelect ────────────────────────────────────────────────────────────
// Two-panel: duration first, then mode.
// onSelect({ label, seconds, mode }) — mode is the TYPING_MODES id string.

export function DurationSelect({ moduleName, onSelect, onBack }) {
  const { theme } = useContext(ThemeContext);

  const accentRgb   = theme === "light" ? "42,92,167"        : "244,169,0";
  const accentColor = theme === "light" ? "var(--royal-blue)" : "var(--golden-amber)";

  // Duration state
  const [customSeconds, setCustomSeconds] = useState("");
  const [customError,   setCustomError]   = useState("");
  const [inputFocused,  setInputFocused]  = useState(false);
  const [pendingDuration, setPendingDuration] = useState(null); // { label, seconds }

  // Mode state — "beginner" is default
  const [selectedMode, setSelectedMode] = useState("beginner");

  // ── Step management ───────────────────────────────────────────────────────
  // "duration" → pick time, then "mode" → pick difficulty, then fire onSelect
  const [subStep, setSubStep] = useState("duration");

  const handlePresetClick = (opt) => {
    setPendingDuration(opt);
    setSubStep("mode");
  };

  const handleCustomSubmit = () => {
    const val = parseInt(customSeconds, 10);
    if (!customSeconds.trim() || isNaN(val) || val < 10) {
      setCustomError("Minimum is 10 seconds.");
      return;
    }
    if (val > 3600) {
      setCustomError("Maximum is 3600 seconds (1 hour).");
      return;
    }
    setCustomError("");
    const minutes = Math.floor(val / 60);
    const secs    = val % 60;
    const label   = minutes > 0
      ? secs > 0 ? `${minutes}m ${secs}s` : `${minutes} min`
      : `${val}s`;
    setPendingDuration({ label, seconds: val });
    setSubStep("mode");
  };

  const handleConfirm = () => {
    if (!pendingDuration) return;
    onSelect({ ...pendingDuration, mode: selectedMode });
  };

  // ── Shared back link ──────────────────────────────────────────────────────
  const BackLink = ({ onClick, label }) => (
    <button
      onClick={onClick}
      style={{
        background: "none", border: "none", cursor: "pointer",
        color: "var(--text-secondary)", fontSize: "13px",
        display: "flex", alignItems: "center", gap: "6px",
        margin: "0 auto 40px", padding: 0,
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="15 18 9 12 15 6" />
      </svg>
      {label}
    </button>
  );

  return (
    <div style={{ maxWidth: "520px", margin: "0 auto", textAlign: "center" }}>

      {/* ── Sub-step: Duration ── */}
      {subStep === "duration" && (
        <>
          <BackLink onClick={onBack} label="Change module" />

          <div style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: accentColor, marginBottom: "10px" }}>
            {moduleName}
          </div>

          <h2 style={{ margin: "0 0 10px", fontSize: "26px", fontWeight: 800, color: "var(--text-primary)" }}>
            How long do you want to type?
          </h2>
          <p style={{ margin: "0 0 36px", color: "var(--text-secondary)", fontSize: "15px", lineHeight: 1.6 }}>
            Once you start, the timer counts down. There's no pausing.
          </p>

          {/* Preset buttons */}
          <div style={{ display: "flex", gap: "14px", justifyContent: "center" }}>
            {DURATION_OPTIONS.map((opt) => (
              <button
                key={opt.seconds}
                onClick={() => handlePresetClick(opt)}
                className="button solid"
                style={{ padding: "18px 28px", fontSize: "17px", fontWeight: 700, borderRadius: "12px", minWidth: "90px" }}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px", margin: "28px 0 20px" }}>
            <div style={{ flex: 1, height: "1px", background: "rgba(var(--border-color-rgb), 0.35)" }} />
            <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-secondary)", opacity: 0.6 }}>
              or custom seconds
            </span>
            <div style={{ flex: 1, height: "1px", background: "rgba(var(--border-color-rgb), 0.35)" }} />
          </div>

          {/* Custom input */}
          <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
            <input
              type="number"
              min="10" max="3600"
              placeholder="e.g. 90"
              value={customSeconds}
              onChange={e => { setCustomSeconds(e.target.value); setCustomError(""); }}
              onKeyDown={e => e.key === "Enter" && handleCustomSubmit()}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              style={{
                width: "120px", padding: "14px 16px", fontSize: "16px", fontWeight: 600,
                borderRadius: "12px",
                border: customError
                  ? "1px solid rgba(255,80,80,0.7)"
                  : inputFocused
                    ? `1px solid rgba(${accentRgb}, 0.6)`
                    : "1px solid rgba(var(--border-color-rgb), 0.5)",
                background: "rgba(var(--bg-card-rgb), 0.7)",
                backdropFilter: "blur(12px)",
                color: "var(--text-primary)", outline: "none",
                transition: "border-color 0.18s ease",
                textAlign: "center",
                appearance: "textfield", MozAppearance: "textfield", WebkitAppearance: "none",
              }}
            />
            <button
              onClick={handleCustomSubmit}
              style={{
                padding: "14px 24px", fontSize: "15px", fontWeight: 700, borderRadius: "12px",
                border: `1px solid rgba(${accentRgb}, 0.35)`,
                background: `rgba(${accentRgb}, 0.10)`,
                color: accentColor, cursor: "pointer", transition: "background 0.18s ease",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = `rgba(${accentRgb}, 0.22)`; }}
              onMouseLeave={e => { e.currentTarget.style.background = `rgba(${accentRgb}, 0.10)`; }}
            >
              Go
            </button>
          </div>

          {customError && (
            <p style={{ marginTop: "10px", fontSize: "13px", color: "rgba(255,80,80,0.9)", lineHeight: 1.5 }}>
              {customError}
            </p>
          )}
        </>
      )}

      {/* ── Sub-step: Mode ── */}
      {subStep === "mode" && (
        <>
          <BackLink onClick={() => setSubStep("duration")} label="Change duration" />

          <div style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: accentColor, marginBottom: "10px" }}>
            {moduleName} · {pendingDuration?.label}
          </div>

          <h2 style={{ margin: "0 0 10px", fontSize: "26px", fontWeight: 800, color: "var(--text-primary)" }}>
            Choose a difficulty
          </h2>
          <p style={{ margin: "0 0 28px", color: "var(--text-secondary)", fontSize: "15px", lineHeight: 1.6 }}>
            This changes what text you'll actually type — not just the UI.
          </p>

          {/* Mode cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", textAlign: "left", marginBottom: "28px" }}>
            {TYPING_MODES.map((mode) => (
              <ModeCard
                key={mode.id}
                mode={mode}
                selected={selectedMode === mode.id}
                onSelect={setSelectedMode}
                accentColor={accentColor}
                accentRgb={accentRgb}
              />
            ))}
          </div>

          {/* Confirm */}
          <button
            onClick={handleConfirm}
            className="button solid"
            style={{ padding: "16px 48px", fontSize: "16px", fontWeight: 700, borderRadius: "12px" }}
          >
            Start typing
          </button>
        </>
      )}
    </div>
  );
}
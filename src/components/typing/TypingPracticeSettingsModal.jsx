import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { TYPING_MODES } from "../../utils/typingExtractor";

const DURATION_OPTIONS = [
  { label: "30 sec", seconds: 30 },
  { label: "45 sec", seconds: 45 },
  { label: "60 sec", seconds: 60 },
];

export default function TypingPracticeSettingsModal({
  initialTab = "goal",
  goalWpmByMode,
  dailyGoalTime,
  selectedDuration,
  selectedMode,
  onSave,
  onClose,
}) {
  const { theme } = useContext(ThemeContext);
  const accentRgb = theme === "light" ? "42,92,167" : "244,169,0";
  const accentColor = theme === "light" ? "var(--royal-blue)" : "var(--golden-amber)";

  const [tab, setTab] = useState(initialTab);
  const [mode, setMode] = useState(selectedMode || "beginner");
  const [goalWpm, setGoalWpm] = useState(
    goalWpmByMode?.[mode] != null ? String(goalWpmByMode[mode]) : ""
  );
  const [goalTime, setGoalTime] = useState(dailyGoalTime ? String(dailyGoalTime) : "15");
  const [durationSeconds, setDurationSeconds] = useState(selectedDuration?.seconds || 60);
  const [customSecs, setCustomSecs] = useState("");
  const [customError, setCustomError] = useState("");

  useEffect(() => {
    setGoalWpm(goalWpmByMode?.[mode] != null ? String(goalWpmByMode[mode]) : "");
  }, [mode, goalWpmByMode]);

  const handleSave = () => {
    const wpm = parseInt(goalWpm, 10);
    const time = parseInt(goalTime, 10);

    let finalSeconds = durationSeconds;
    if (customSecs.trim()) {
      const cv = parseInt(customSecs, 10);
      if (isNaN(cv) || cv < 10) {
        setCustomError("Minimum is 10 seconds.");
        setTab("duration");
        return;
      }
      if (cv > 3600) {
        setCustomError("Maximum is 3600 seconds.");
        setTab("duration");
        return;
      }
      finalSeconds = cv;
    }

    const minutes = Math.floor(finalSeconds / 60);
    const secs = finalSeconds % 60;
    const durationLabel = minutes > 0 ? (secs > 0 ? `${minutes}m ${secs}s` : `${minutes} min`) : `${finalSeconds}s`;

    onSave({
      goalWpm: !isNaN(wpm) && wpm >= 10 ? wpm : null,
      goalTime: !isNaN(time) && time >= 1 ? time : 15,
      mode,
      duration: { label: durationLabel, seconds: finalSeconds, mode },
    });
  };

  const tabs = [
    { id: "goal", label: "Daily Goals" },
    { id: "difficulty", label: "Difficulty" },
    { id: "duration", label: "Duration" },
  ];

  const inputStyle = {
    width: "100%",
    padding: "12px 14px",
    fontSize: "16px",
    fontWeight: 600,
    borderRadius: "10px",
    border: `1px solid rgba(${accentRgb}, 0.35)`,
    background: "rgba(var(--bg-card-rgb), 0.7)",
    color: "var(--text-primary)",
    outline: "none",
    boxSizing: "border-box",
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.45)",
        backdropFilter: "blur(4px)",
      }}
      onClick={onClose}
    >
      <div
        className="card"
        style={{ padding: "28px 32px", maxWidth: "440px", width: "calc(100% - 32px)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: "flex",
            gap: "4px",
            marginBottom: "24px",
            background: "rgba(var(--bg-secondary-rgb), 0.6)",
            borderRadius: "10px",
            padding: "4px",
          }}
        >
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                flex: 1,
                padding: "8px 6px",
                border: "none",
                borderRadius: "7px",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: 700,
                transition: "all 0.15s ease",
                background: tab === t.id ? `rgba(${accentRgb}, 0.15)` : "transparent",
                color: tab === t.id ? accentColor : "var(--text-secondary)",
                boxShadow: tab === t.id ? `inset 0 0 0 1px rgba(${accentRgb}, 0.35)` : "none",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "goal" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "var(--text-secondary)", marginBottom: "8px" }}>
                Words Per Minute (WPM) goal
              </label>
              <input
                type="number"
                min="10"
                max="300"
                placeholder="e.g. 60"
                value={goalWpm}
                onChange={(e) => setGoalWpm(e.target.value)}
                autoFocus
                style={inputStyle}
              />
              <p style={{ margin: "6px 0 0", fontSize: "12px", color: "var(--text-secondary)" }}>
                Target WPM to hit each session. Shows a progress bar on results.
              </p>
            </div>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "var(--text-secondary)", marginBottom: "8px" }}>
                Daily goal — Typing time (minutes)
              </label>
              <input
                type="number"
                min="1"
                max="120"
                placeholder="15"
                value={goalTime}
                onChange={(e) => setGoalTime(e.target.value)}
                style={inputStyle}
              />
              <p style={{ margin: "6px 0 0", fontSize: "12px", color: "var(--text-secondary)" }}>
                How long you want to type today. Default: 15 minutes. Tracked across sessions.
              </p>
            </div>
          </div>
        )}

        {tab === "difficulty" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {TYPING_MODES.map((m) => {
              const sel = mode === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id)}
                  style={{
                    textAlign: "left",
                    padding: "14px 16px",
                    borderRadius: "10px",
                    border: sel ? `1px solid rgba(${accentRgb}, 0.6)` : "1px solid rgba(var(--border-color-rgb), 0.35)",
                    background: sel ? `rgba(${accentRgb}, 0.08)` : "rgba(var(--bg-card-rgb), 0.55)",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div
                      style={{
                        width: 14,
                        height: 14,
                        borderRadius: "50%",
                        flexShrink: 0,
                        border: sel ? `2px solid ${accentColor}` : "2px solid rgba(var(--border-color-rgb), 0.5)",
                        background: sel ? accentColor : "transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {sel && <div style={{ width: 5, height: 5, borderRadius: "50%", background: "white" }} />}
                    </div>
                    <div>
                      <span style={{ fontSize: "14px", fontWeight: 700, color: sel ? accentColor : "var(--text-primary)" }}>
                        {m.label}
                      </span>
                      <span style={{ fontSize: "11px", color: "var(--text-secondary)", marginLeft: "8px" }}>
                        {m.description}
                      </span>
                    </div>
                  </div>
                  <p style={{ margin: "6px 0 0 24px", fontSize: "12px", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                    {m.detail}
                  </p>
                </button>
              );
            })}
          </div>
        )}

        {tab === "duration" && (
          <div>
            <div style={{ display: "flex", gap: "10px", marginBottom: "16px", justifyContent: "center" }}>
              {DURATION_OPTIONS.map((opt) => (
                <button
                  key={opt.seconds}
                  onClick={() => {
                    setDurationSeconds(opt.seconds);
                    setCustomSecs("");
                    setCustomError("");
                  }}
                  style={{
                    padding: "14px 20px",
                    fontSize: "16px",
                    fontWeight: 700,
                    borderRadius: "10px",
                    border: durationSeconds === opt.seconds && !customSecs ? `1px solid rgba(${accentRgb}, 0.6)` : "1px solid rgba(var(--border-color-rgb), 0.4)",
                    background: durationSeconds === opt.seconds && !customSecs ? `rgba(${accentRgb}, 0.12)` : "rgba(var(--bg-card-rgb), 0.55)",
                    color: durationSeconds === opt.seconds && !customSecs ? accentColor : "var(--text-primary)",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "16px 0" }}>
              <div style={{ flex: 1, height: "1px", background: "rgba(var(--border-color-rgb), 0.3)" }} />
              <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-secondary)", opacity: 0.6 }}>or custom</span>
              <div style={{ flex: 1, height: "1px", background: "rgba(var(--border-color-rgb), 0.3)" }} />
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <input
                type="number"
                min="10"
                max="3600"
                placeholder="seconds, e.g. 90"
                value={customSecs}
                onChange={(e) => {
                  setCustomSecs(e.target.value);
                  setCustomError("");
                }}
                style={{ ...inputStyle, flex: 1 }}
              />
            </div>
            {customError && <p style={{ marginTop: "8px", fontSize: "12px", color: "rgba(255,80,80,0.9)" }}>{customError}</p>}
          </div>
        )}

        <div style={{ display: "flex", gap: "10px", marginTop: "24px" }}>
          <button className="button solid" style={{ flex: 1, justifyContent: "center", padding: "11px" }} onClick={handleSave}>
            Apply
          </button>
          <button className="button" style={{ flex: 1, justifyContent: "center", padding: "11px" }} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
